import { Resend } from "resend";
import { NextResponse } from "next/server";
import type { ContactFormData } from "@/types/contact.types";

const resend = new Resend(process.env.RESEND_API_KEY);

const PROJECT_TYPE_LABELS: Record<ContactFormData["projectType"], string> = {
  wordpress: "Strona WordPress",
  nextjs: "Aplikacja / Next.js",
  other: "Inne / nie wiem jeszcze",
};

/**
 * Email design system (inline styles only).
 * Keep it consistent with the calculator (leads) integration.
 */
const EMAIL_DS = {
  bg: "#00020f",
  surface: "#050a1e",
  surfaceAlt: "#080d28",
  border: "rgba(255, 255, 255, 0.1)",
  textPrimary: "#ffffff",
  textSecondary: "rgba(255, 255, 255, 0.75)",
  primary: "#3b82f6",
  primaryHover: "#60a5fa",
  primarySubtle: "rgba(59, 130, 246, 0.12)",
  muted: "#94a3b8",
  cardRadius: "16px",
  buttonRadius: "14px",
  space: { 2: "16px", 3: "24px", 4: "32px", 5: "40px", 6: "48px" },
} as const;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactFormData>;

    if (!body?.name || !body?.email || !body?.message || !body?.projectType) {
      return NextResponse.json({ error: "Brakuje wymaganych pól" }, { status: 400 });
    }

    if (!isValidEmail(body.email)) {
      return NextResponse.json({ error: "Nieprawidłowy format email" }, { status: 400 });
    }

    const contactData = body as ContactFormData;
    const projectLabel = PROJECT_TYPE_LABELS[contactData.projectType] ?? contactData.projectType;

    const ownerEmail = process.env.OWNER_EMAIL ?? process.env.NOTIFICATION_EMAIL;
    const resendFrom = process.env.RESEND_FROM;

    if (!ownerEmail || !resendFrom) {
      return NextResponse.json(
        { error: "Brak wymaganych zmiennych środowiskowych" },
        { status: 500 }
      );
    }

    const [ownerResult, clientResult] = await Promise.allSettled([
      sendOwnerNotification(contactData, projectLabel, ownerEmail, resendFrom),
      sendClientConfirmation(contactData, resendFrom),
    ]);

    const ownerRejected = ownerResult.status === "rejected" ? ownerResult.reason : null;
    const clientRejected = clientResult.status === "rejected" ? clientResult.reason : null;

    if (ownerRejected || clientRejected) {
      console.error("Contact email error:", {
        owner: ownerRejected,
        client: clientRejected,
      });
      return NextResponse.json({ error: "Błąd wysyłki wiadomości" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function sendOwnerNotification(
  data: ContactFormData,
  projectLabel: string,
  ownerEmail: string,
  resendFrom: string
): Promise<void> {
  await resend.emails.send({
    from: resendFrom,
    to: ownerEmail,
    replyTo: data.email,
    subject: `[Blueport] Nowe zapytanie od ${data.name}`,
    html: ownerEmailHtml(data, projectLabel),
  });
}

async function sendClientConfirmation(data: ContactFormData, resendFrom: string): Promise<void> {
  await resend.emails.send({
    from: resendFrom,
    to: data.email,
    subject: "Otrzymałem Twoją wiadomość — Blueport Studio",
    html: clientEmailHtml(data),
  });
}

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function ownerEmailHtml(data: ContactFormData, projectLabel: string): string {
  const d = EMAIL_DS;
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeProject = escapeHtml(projectLabel);
  const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br/>");

  const wrapperStyle =
    "max-width:580px;margin:" +
    d.space[5] +
    " auto;background:" +
    d.surface +
    ";border-radius:" +
    d.cardRadius +
    ";overflow:hidden;border:1px solid " +
    d.border +
    ";box-shadow:0 4px 24px rgba(0,0,0,0.4);";
  const headerStyle =
    "background:" +
    d.surface +
    ";padding:" +
    d.space[4] +
    ";border-bottom:1px solid " +
    d.border +
    ";display:flex;align-items:center;gap:" +
    d.space[2] +
    ";";
  const bodyStyle = "padding:" + d.space[4] + ";";
  const messageBoxStyle =
    "background:" +
    d.primarySubtle +
    ";border:1px solid " +
    d.border +
    ";border-radius:12px;padding:16px 20px;";
  const buttonStyle =
    "display:inline-block;background:" +
    d.primary +
    ";color:" +
    d.textPrimary +
    ";padding:14px 28px;border-radius:" +
    d.buttonRadius +
    ";text-decoration:none;font-weight:700;font-size:14px;";
  const footerStyle =
    "background:" +
    d.surfaceAlt +
    ";padding:" +
    d.space[3] +
    " " +
    d.space[4] +
    ";border-top:1px solid " +
    d.border +
    ";";

  return `
  <!DOCTYPE html>
  <html lang="pl">
  <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
  <body style="margin:0;padding:0;background:${d.bg};font-family:Inter,system-ui,sans-serif;">
    <div style="${wrapperStyle}">
      <div style="${headerStyle}">
        <img src="https://blueport.studio/images/logo-email.png" alt="Blueport Studio" width="70" height="70" style="display:block;width:70px;height:70px;object-fit:contain;" />
        <div>
          <p style="margin:0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${d.textSecondary};">
            BLUEPORT STUDIO
          </p>
          <h1 style="margin:8px 0 0;font-size:20px;font-weight:700;color:${d.textPrimary};">
            Nowe zapytanie kontaktowe
          </h1>
        </div>
      </div>

      <div style="${bodyStyle}">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid ${d.border};width:120px;">
              <span style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${d.textSecondary};">Imię</span>
            </td>
            <td style="padding:10px 0;border-bottom:1px solid ${d.border};">
              <span style="font-size:15px;color:${d.textPrimary};font-weight:600;">${safeName}</span>
            </td>
          </tr>

          <tr>
            <td style="padding:10px 0;border-bottom:1px solid ${d.border};">
              <span style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${d.textSecondary};">Email</span>
            </td>
            <td style="padding:10px 0;border-bottom:1px solid ${d.border};">
              <a href="mailto:${safeEmail}" style="font-size:15px;color:${d.primary};text-decoration:none;">${safeEmail}</a>
            </td>
          </tr>

          <tr>
            <td style="padding:10px 0;border-bottom:1px solid ${d.border};">
              <span style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${d.textSecondary};">Projekt</span>
            </td>
            <td style="padding:10px 0;border-bottom:1px solid ${d.border};">
              <span style="font-size:15px;color:${d.textPrimary};">${safeProject}</span>
            </td>
          </tr>
        </table>

        <div style="margin-top:24px;">
          <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${d.textSecondary};">Wiadomość</p>
          <div style="${messageBoxStyle}">
            <p style="margin:0;font-size:15px;line-height:1.7;color:${d.textPrimary};opacity:0.9;">${safeMessage}</p>
          </div>
        </div>

        <div style="margin-top:28px;text-align:center;">
          <a
            href="mailto:${safeEmail}?subject=Re: Zapytanie o projekt — Blueport Studio"
            style="${buttonStyle}"
          >
            Odpowiedz na wiadomość
          </a>
        </div>
      </div>

      <div style="${footerStyle}">
        <p style="margin:0;font-size:12px;color:${d.muted};text-align:center;">
          Blueport Studio · blueport.studio
        </p>
      </div>

    </div>
  </body>
  </html>
  `;
}

function clientEmailHtml(data: ContactFormData): string {
  const d = EMAIL_DS;
  const safeName = escapeHtml(data.name);
  const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br/>");

  const wrapperStyle =
    "max-width:580px;margin:" +
    d.space[5] +
    " auto;background:" +
    d.surface +
    ";border-radius:" +
    d.cardRadius +
    ";overflow:hidden;border:1px solid " +
    d.border +
    ";box-shadow:0 4px 24px rgba(0,0,0,0.4);";
  const headerStyle =
    "background:" +
    d.surface +
    ";padding:" +
    d.space[4] +
    ";border-bottom:1px solid " +
    d.border +
    ";text-align:center;";
  const bodyStyle = "padding:" + d.space[4] + ";";
  const noteStyle =
    "background:" +
    d.primarySubtle +
    ";border-left:3px solid " +
    d.primary +
    ";border-radius:12px;padding:16px 20px;margin-bottom:24px;";
  const footerStyle =
    "background:" +
    d.surfaceAlt +
    ";padding:" +
    d.space[3] +
    " " +
    d.space[4] +
    ";border-top:1px solid " +
    d.border +
    ";";

  return `
  <!DOCTYPE html>
  <html lang="pl">
  <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
  <body style="margin:0;padding:0;background:${d.bg};font-family:Inter,system-ui,sans-serif;">
    <div style="${wrapperStyle}">
      <div style="${headerStyle}">
        <img src="https://blueport.studio/images/logo-email.png" alt="Blueport Studio" width="70" height="70" style="display:block;width:70px;height:70px;object-fit:contain;margin:0 auto 12px auto;" />
        <p style="margin:0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${d.textSecondary};">
          BLUEPORT STUDIO
        </p>
        <h1 style="margin:10px 0 0;font-size:22px;font-weight:700;color:${d.textPrimary};line-height:1.3;">
          Cześć ${safeName}, otrzymałem Twoją wiadomość!
        </h1>
      </div>

      <div style="${bodyStyle}">
        <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:${d.textSecondary};">
          Dziękuję za kontakt. Odezwę się do Ciebie w ciągu <strong style="color:${d.textPrimary};">24–48 godzin</strong>
          w dni robocze.
        </p>

        <div style="${noteStyle}">
          <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:${d.muted};">
            Twoja wiadomość
          </p>
          <p style="margin:0;font-size:14px;line-height:1.6;color:${d.textPrimary};opacity:0.9;">
            ${safeMessage}
          </p>
        </div>

        <p style="margin:0;font-size:15px;line-height:1.7;color:${d.textSecondary};">
          Jeśli masz dodatkowe pytania, możesz śmiało odpisać na tego maila
          lub skontaktować się bezpośrednio:
          <a href="mailto:kontakt@blueport.studio" style="color:${d.primary};text-decoration:none;font-weight:600;">
            kontakt@blueport.studio
          </a>
        </p>
      </div>

      <div style="${footerStyle}">
        <p style="margin:0;font-size:13px;color:${d.muted};text-align:center;">
          Kamil · Blueport Studio ·
          <a href="https://blueport.studio" style="color:${d.primary};text-decoration:none;">blueport.studio</a>
        </p>
      </div>
    </div>
  </body>
  </html>
  `;
}
