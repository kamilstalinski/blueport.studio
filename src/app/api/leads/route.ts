import { supabase } from "@/lib/supabase";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { PACKAGES, FEATURES } from "@/constants/pricing";
import type { PackageId, FeatureId, TimelineId } from "@/constants/pricing";
import { LOGO_BASE64 } from "@/lib/emailAssets";

const resend = new Resend(process.env.RESEND_API_KEY);

/** Domena do assetów w mailach — zawsze publiczny URL (nie localhost), żeby logo się ładowało. */
const EMAIL_ASSETS_BASE =
  process.env.EMAIL_LOGO_BASE_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://blueport.studio";

/** Logo w mailach: PNG ma lepsze wsparcie (Gmail, Outlook). SVG: ustaw EMAIL_LOGO_URL na pełny URL do PNG. */
function getEmailLogoUrl(): string {
  if (process.env.EMAIL_LOGO_URL) return process.env.EMAIL_LOGO_URL;
  return EMAIL_ASSETS_BASE + "/logov3.svg";
}

/** Design system — kolory i spacing dla szablonów email (inline, bez CSS variables). */
const EMAIL_DS = {
  baseUrl: EMAIL_ASSETS_BASE,
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      packageId,
      features,
      timeline,
      projectPriority,
      total,
      base,
      featuresTotal,
      label,
      estimatedTimeline,
      qualificationTags,
      projectDescription,
      breakdown,
    }: {
      name: string;
      email: string;
      phone?: string;
      packageId: PackageId;
      features: FeatureId[];
      timeline: TimelineId;
      projectPriority?: string;
      total: number;
      base: number;
      featuresTotal: number;
      label: string;
      estimatedTimeline: string;
      qualificationTags: string[];
      projectDescription: string;
      breakdown: { label: string; price: number }[];
    } = body;

    // Walidacja
    if (!name || !email || !packageId) {
      return NextResponse.json({ error: "Brakuje wymaganych pól" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Nieprawidłowy format email" }, { status: 400 });
    }

    // Zapis do Supabase
    const { data: lead, error: dbError } = await supabase
      .from("leads")
      .insert({
        name,
        email,
        phone: phone || null,
        package_id: packageId,
        features: features || [],
        timeline,
        project_priority: projectPriority || null,
        total,
        base_price: base,
        features_total: featuresTotal,
        price_label: label,
        estimated_timeline: estimatedTimeline,
        qualification_tags: qualificationTags || [],
        project_description: projectDescription || null,
        status: "new",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json({ error: "Błąd zapisu" }, { status: 500 });
    }

    // Mail do klienta
    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: email,
      subject: `Twoja wycena — ${PACKAGES[packageId].name}`,
      html: clientEmailHtml({
        name,
        packageId,
        total,
        label,
        estimatedTimeline,
        breakdown,
      }),
    });

    // Powiadomienie dla Ciebie
    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: process.env.NOTIFICATION_EMAIL!,
      subject: `🔔 Nowy lead: ${name} — ${PACKAGES[packageId].name}`,
      html: notificationEmailHtml({
        name,
        email,
        phone,
        packageId,
        features,
        timeline,
        projectPriority,
        total,
        label,
        estimatedTimeline,
        qualificationTags,
      }),
    });

    return NextResponse.json({ success: true, id: lead.id });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}

// ─── Helpers ──────────────────────────────────────────────

function formatPrice(price: number): string {
  return price.toLocaleString("pl-PL") + " zł";
}

function formatTimeline(timeline: TimelineId): string {
  const labels: Record<TimelineId, string> = {
    express: "⚡ Ekspresowo",
    standard: "Standardowo",
    relaxed: "🗓 Elastycznie",
  };
  return labels[timeline];
}

function formatPriority(priority?: string): string {
  const labels: Record<string, string> = {
    speed: "⚡ Szybka realizacja",
    price: "💰 Optymalna cena",
    quality: "✨ Najwyższa jakość",
    feature: "🔧 Konkretna funkcjonalność",
  };
  return priority ? (labels[priority] ?? priority) : "—";
}

// ─── Mail do klienta ──────────────────────────────────────

function clientEmailHtml(data: {
  name: string;
  packageId: PackageId;
  total: number;
  label: string;
  estimatedTimeline: string;
  breakdown: { label: string; price: number }[];
}): string {
  const d = EMAIL_DS;
  const logoUrl = getEmailLogoUrl();
  const notifEmail = process.env.NOTIFICATION_EMAIL ?? "";

  const breakdownRows = data.breakdown
    .map(
      (item) =>
        '<tr><td style="padding:12px 0;font-size:14px;color:' +
        d.textPrimary +
        ";border-bottom:1px solid " +
        d.border +
        ';">' +
        item.label +
        '</td><td style="padding:12px 0;font-size:14px;color:' +
        d.textPrimary +
        ";text-align:right;border-bottom:1px solid " +
        d.border +
        ';">' +
        formatPrice(item.price) +
        "</td></tr>"
    )
    .join("");

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
    ";text-align:center;border-bottom:1px solid " +
    d.border +
    ";";
  const bodyStyle = "padding:" + d.space[4] + ";";
  const cardStyle =
    "background:" +
    d.primarySubtle +
    ";border:1px solid " +
    d.border +
    ";border-radius:" +
    d.cardRadius +
    ";padding:" +
    d.space[3] +
    ";margin-bottom:" +
    d.space[3] +
    ";";
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

  return [
    '<!DOCTYPE html><html lang="pl">',
    '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>',
    '<body style="margin:0;padding:0;background:' +
      d.bg +
      ';font-family:Inter,system-ui,sans-serif;">',
    '<div style="' + wrapperStyle + '">',
    '<div style="' + headerStyle + '">',
    '<img src="' +
      LOGO_BASE64 +
      '" alt="BluePort Studio" width="70" height="70" style="display:block;width:70px;height:70px;object-fit:contain;margin:0 auto;" />',
    '<p style="margin:' +
      d.space[2] +
      " 0 0;color:" +
      d.textSecondary +
      ';font-size:14px;">Twoja wycena jest gotowa</p>',
    "</div>",
    '<div style="' + bodyStyle + '">',
    '<p style="margin:0 0 ' +
      d.space[3] +
      ";font-size:16px;color:" +
      d.textPrimary +
      ';line-height:1.6;">Cześć <strong>' +
      data.name +
      "</strong>,<br><br>dziękuję za wypełnienie kalkulatora. Poniżej znajdziesz szczegółową wycenę Twojego projektu.</p>",
    '<div style="' + cardStyle + '">',
    '<p style="margin:0 0 4px;font-size:0.65rem;color:' +
      d.muted +
      ';text-transform:uppercase;letter-spacing:0.18em;">Wybrany pakiet</p>',
    '<p style="margin:0 0 ' +
      d.space[2] +
      ";font-size:17px;font-weight:600;color:" +
      d.textPrimary +
      ';">' +
      PACKAGES[data.packageId].name +
      "</p>",
    '<table style="width:100%;border-collapse:collapse;margin-bottom:' +
      d.space[2] +
      ';">' +
      breakdownRows +
      "</table>",
    '<div style="display:flex;justify-content:space-between;align-items:center;padding-top:' +
      d.space[2] +
      ';"><span style="font-size:15px;font-weight:600;color:' +
      d.textPrimary +
      ';">Razem</span><span style="font-size:28px;font-weight:700;color:' +
      d.primary +
      ';">' +
      formatPrice(data.total) +
      "</span></div>",
    '<div style="margin-top:' +
      d.space[2] +
      ";padding-top:" +
      d.space[2] +
      ";border-top:1px solid " +
      d.border +
      ';"><p style="margin:0 0 4px;font-size:0.65rem;color:' +
      d.muted +
      ';text-transform:uppercase;">Czas realizacji</p><p style="margin:0;font-size:16px;font-weight:600;color:' +
      d.textPrimary +
      ';">' +
      data.estimatedTimeline +
      "</p></div>",
    "</div>",
    '<p style="margin:0 0 ' +
      d.space[2] +
      ";font-size:14px;color:" +
      d.textSecondary +
      ';line-height:1.6;">To wycena orientacyjna. Skontaktuję się z Tobą w ciągu <strong style="color:' +
      d.textPrimary +
      ';">24 godzin roboczych</strong>, żeby omówić szczegóły.</p>',
    '<p style="margin:0;font-size:14px;color:' +
      d.textSecondary +
      ';">Pytania? <a href="mailto:' +
      notifEmail +
      '" style="color:' +
      d.primary +
      ';text-decoration:none;font-weight:500;">' +
      notifEmail +
      "</a></p>",
    "</div>",
    '<div style="' +
      footerStyle +
      '"><p style="margin:0;font-size:12px;color:' +
      d.muted +
      ';text-align:center;">BluePort Studio · Szczecin · Wiadomość wysłana automatycznie</p></div>',
    "</div></body></html>",
  ].join("");
}

// ─── Powiadomienie dla Ciebie ─────────────────────────────

function notificationEmailHtml(data: {
  name: string;
  email: string;
  phone?: string;
  packageId: PackageId;
  features: FeatureId[];
  timeline: TimelineId;
  projectPriority?: string;
  total: number;
  label: string;
  estimatedTimeline: string;
  qualificationTags: string[];
}): string {
  const d = EMAIL_DS;
  const logoUrl = getEmailLogoUrl();

  const tags =
    data.qualificationTags
      .map(
        (t) =>
          '<span style="display:inline-block;background:' +
          d.primarySubtle +
          ";color:" +
          d.primary +
          ";padding:6px 12px;border-radius:20px;font-size:12px;margin:2px;border:1px solid " +
          d.border +
          ';">' +
          t +
          "</span>"
      )
      .join("") || '<p style="color:' + d.muted + ';font-size:13px;margin:0;">Brak tagów</p>';

  const featuresList = data.features.length
    ? data.features.map((f) => FEATURES[f].label).join(", ")
    : "—";

  const row = (label: string, value: string) =>
    '<tr><td style="padding:12px 0;font-size:14px;color:' +
    d.textSecondary +
    ";width:42%;border-bottom:1px solid " +
    d.border +
    ';">' +
    label +
    '</td><td style="padding:12px 0;font-size:14px;color:' +
    d.textPrimary +
    ";font-weight:500;border-bottom:1px solid " +
    d.border +
    ';">' +
    value +
    "</td></tr>";

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
    d.space[3] +
    " " +
    d.space[4] +
    ";border-bottom:1px solid " +
    d.border +
    ";display:flex;align-items:center;gap:" +
    d.space[2] +
    ";";

  return [
    '<!DOCTYPE html><html lang="pl">',
    '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>',
    '<body style="margin:0;padding:0;background:' +
      d.bg +
      ';font-family:Inter,system-ui,sans-serif;">',
    '<div style="' + wrapperStyle + '">',
    '<div style="' + headerStyle + '">',
    '<img src="' +
      LOGO_BASE64 +
      '" alt="BluePort Studio" width="70" height="70" style="display:block;width:70px;height:70px;object-fit:contain;margin:0 auto;" />',
    '<div><h1 style="margin:0;color:' +
      d.textPrimary +
      ';font-size:18px;font-weight:600;">Nowy lead z kalkulatora</h1>',
    '<p style="margin:4px 0 0;color:' +
      d.muted +
      ';font-size:13px;">' +
      new Date().toLocaleString("pl-PL") +
      "</p></div>",
    "</div>",
    '<div style="padding:' + d.space[3] + " " + d.space[4] + ';">' + tags + "</div>",
    '<div style="padding:' + d.space[2] + " " + d.space[4] + " " + d.space[4] + ';">',
    '<table style="width:100%;border-collapse:collapse;">',
    row("Imię i nazwisko", data.name),
    row(
      "Email",
      '<a href="mailto:' +
        data.email +
        '" style="color:' +
        d.primary +
        ';text-decoration:none;">' +
        data.email +
        "</a>"
    ),
    row("Telefon", data.phone || "—"),
    row("Pakiet", PACKAGES[data.packageId].name),
    row("Dodatki", featuresList),
    row("Tryb realizacji", formatTimeline(data.timeline)),
    row("Priorytet klienta", formatPriority(data.projectPriority)),
    row(
      "Wycena",
      '<span style="color:' +
        d.primary +
        ';font-weight:700;font-size:16px;">' +
        formatPrice(data.total) +
        "</span>"
    ),
    row("Czas realizacji", data.estimatedTimeline),
    "</table>",
    '<div style="margin-top:' +
      d.space[3] +
      ';"><a href="mailto:' +
      data.email +
      '?subject=Twoja wycena — BluePort Studio" style="display:inline-block;background:' +
      d.primary +
      ";color:" +
      d.textPrimary +
      ";padding:14px " +
      d.space[3] +
      ";min-height:48px;line-height:20px;border-radius:" +
      d.buttonRadius +
      ';text-decoration:none;font-weight:600;font-size:14px;">Odpowiedz klientowi</a></div>',
    "</div></div></body></html>",
  ].join("");
}
