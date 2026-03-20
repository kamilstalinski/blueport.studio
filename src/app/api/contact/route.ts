import { Resend } from "resend";
import { NextResponse } from "next/server";
import type { ContactFormData } from "@/types/contact.types";

const resend = new Resend(process.env.RESEND_API_KEY);

const PROJECT_TYPE_LABELS: Record<ContactFormData["projectType"], string> = {
  wordpress: "Strona WordPress",
  nextjs: "Aplikacja / Next.js",
  other: "Inne / nie wiem jeszcze",
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactFormData>;

    if (
      !body?.name ||
      !body?.email ||
      !body?.message ||
      !body?.projectType
    ) {
      return NextResponse.json(
        { error: "Brakuje wymaganych pól" },
        { status: 400 }
      );
    }

    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { error: "Nieprawidłowy format email" },
        { status: 400 }
      );
    }

    const contactData = body as ContactFormData;
    const projectLabel =
      PROJECT_TYPE_LABELS[contactData.projectType] ?? contactData.projectType;

    const ownerEmail =
      process.env.OWNER_EMAIL ?? process.env.NOTIFICATION_EMAIL;
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

    const ownerRejected =
      ownerResult.status === "rejected" ? ownerResult.reason : null;
    const clientRejected =
      clientResult.status === "rejected" ? clientResult.reason : null;

    if (ownerRejected || clientRejected) {
      console.error("Contact email error:", {
        owner: ownerRejected,
        client: clientRejected,
      });
      return NextResponse.json(
        { error: "Błąd wysyłki wiadomości" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Błąd serwera" },
      { status: 500 }
    );
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

async function sendClientConfirmation(
  data: ContactFormData,
  resendFrom: string
): Promise<void> {
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
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeProject = escapeHtml(projectLabel);
  const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br/>");

  return `
  <!DOCTYPE html>
  <html lang="pl">
  <head><meta charset="UTF-8"></head>
  <body style="margin:0;padding:0;background:#050d0a;font-family:system-ui,sans-serif;">
    <div style="max-width:560px;margin:40px auto;background:#0d1a14;border:1px solid rgba(0,229,160,0.15);border-radius:12px;overflow:hidden;">

      <div style="background:rgba(0,229,160,0.08);border-bottom:1px solid rgba(0,229,160,0.12);padding:24px 32px;">
        <p style="margin:0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#00e5a0;">
          BLUEPORT STUDIO
        </p>
        <h1 style="margin:8px 0 0;font-size:20px;font-weight:700;color:#ffffff;">
          Nowe zapytanie kontaktowe
        </h1>
      </div>

      <div style="padding:32px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);width:120px;">
              <span style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.35);">Imię</span>
            </td>
            <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
              <span style="font-size:15px;color:#ffffff;font-weight:600;">${safeName}</span>
            </td>
          </tr>

          <tr>
            <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
              <span style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.35);">Email</span>
            </td>
            <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
              <a href="mailto:${safeEmail}" style="font-size:15px;color:#00e5a0;text-decoration:none;">${safeEmail}</a>
            </td>
          </tr>

          <tr>
            <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
              <span style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.35);">Projekt</span>
            </td>
            <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
              <span style="font-size:15px;color:#ffffff;">${safeProject}</span>
            </td>
          </tr>
        </table>

        <div style="margin-top:24px;">
          <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.35);">Wiadomość</p>
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:16px 20px;">
            <p style="margin:0;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.8);">${safeMessage}</p>
          </div>
        </div>

        <div style="margin-top:28px;text-align:center;">
          <a href="mailto:${safeEmail}?subject=Re: Zapytanie o projekt — Blueport Studio"
             style="display:inline-block;background:#00e5a0;color:#050d0a;font-size:14px;font-weight:700;padding:12px 28px;border-radius:8px;text-decoration:none;">
            Odpowiedz na wiadomość
          </a>
        </div>
      </div>

      <div style="padding:16px 32px;border-top:1px solid rgba(255,255,255,0.06);">
        <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.2);text-align:center;">
          Blueport Studio · blueport.studio
        </p>
      </div>

    </div>
  </body>
  </html>
  `;
}

function clientEmailHtml(data: ContactFormData): string {
  const safeName = escapeHtml(data.name);
  const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br/>");

  return `
  <!DOCTYPE html>
  <html lang="pl">
  <head><meta charset="UTF-8"></head>
  <body style="margin:0;padding:0;background:#f8f8f6;font-family:system-ui,sans-serif;">
    <div style="max-width:560px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

      <div style="background:#050d0a;padding:32px;">
        <p style="margin:0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#00e5a0;">
          BLUEPORT STUDIO
        </p>
        <h1 style="margin:10px 0 0;font-size:22px;font-weight:700;color:#ffffff;line-height:1.3;">
          Cześć ${safeName}, otrzymałem Twoją wiadomość!
        </h1>
      </div>

      <div style="padding:32px;">
        <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#374151;">
          Dziękuję za kontakt. Odezwę się do Ciebie w ciągu <strong>24–48 godzin</strong>
          w dni robocze.
        </p>

        <div style="background:#f8f9fa;border-left:3px solid #00e5a0;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:24px;">
          <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#6b7280;">
            Twoja wiadomość
          </p>
          <p style="margin:0;font-size:14px;line-height:1.6;color:#374151;">
            ${safeMessage}
          </p>
        </div>

        <p style="margin:0;font-size:15px;line-height:1.7;color:#374151;">
          Jeśli masz dodatkowe pytania, możesz śmiało odpisać na tego maila
          lub skontaktować się bezpośrednio:
          <a href="mailto:kontakt@blueport.studio" style="color:#059669;text-decoration:none;font-weight:600;">
            kontakt@blueport.studio
          </a>
        </p>
      </div>

      <div style="background:#050d0a;padding:20px 32px;">
        <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.5);text-align:center;">
          Kamil · Blueport Studio ·
          <a href="https://blueport.studio" style="color:#00e5a0;text-decoration:none;">blueport.studio</a>
        </p>
      </div>

    </div>
  </body>
  </html>
  `;
}

