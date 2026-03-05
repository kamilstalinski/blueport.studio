import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { PACKAGES, FEATURES } from '@/constants/pricing'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

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
    } = body

    if (!name || !email || !packageId) {
      return NextResponse.json(
        { error: 'Brakuje wymaganych pól' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Nieprawidłowy format email' },
        { status: 400 }
      )
    }

    const { data: lead, error: dbError } = await supabase
      .from('leads')
      .insert({
        name,
        email,
        phone: phone || null,
        package_id: packageId,
        features: features || [],
        timeline: timeline ?? 'standard',
        project_priority: projectPriority || null,
        total: total ?? 0,
        base_price: base ?? 0,
        features_total: featuresTotal ?? 0,
        price_label: label ?? null,
        estimated_timeline: estimatedTimeline ?? null,
        qualification_tags: qualificationTags || [],
        project_description: projectDescription || null,
        status: 'new',
      })
      .select()
      .single()

    if (dbError) {
      console.error('Supabase error:', dbError)
      return NextResponse.json(
        { error: 'Błąd zapisu' },
        { status: 500 }
      )
    }

    const packageName = formatPackageName(packageId)

    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: email,
      subject: `Twoja wycena — ${packageName}`,
      html: clientEmailHtml({
        name,
        packageName,
        label,
        total: total ?? 0,
        estimatedTimeline: estimatedTimeline ?? '',
      }),
    })

    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: process.env.NOTIFICATION_EMAIL!,
      subject: `🔔 Nowy lead: ${name} — ${packageName}`,
      html: notificationEmailHtml({
        name,
        email,
        phone,
        packageId,
        packageName,
        features: features || [],
        timeline: timeline ?? 'standard',
        projectPriority,
        total: total ?? 0,
        label: label ?? '',
        estimatedTimeline: estimatedTimeline ?? '',
        qualificationTags: qualificationTags || [],
        projectDescription: projectDescription ?? null,
        breakdown: Array.isArray(breakdown) ? breakdown : [],
      }),
    })

    return NextResponse.json({ success: true, id: lead.id })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Błąd serwera' },
      { status: 500 }
    )
  }
}

function formatPackageName(id: string): string {
  if (id in PACKAGES) return (PACKAGES as Record<string, { name: string }>)[id].name
  return id
}

function formatPrice(price: number): string {
  return price.toLocaleString('pl-PL') + ' zł'
}

function formatFeatureLabels(features: string[]): string {
  if (!features.length) return 'Brak dodatków'
  return features
    .map((f) => (f in FEATURES ? (FEATURES as Record<string, { label: string }>)[f].label : f))
    .join(', ')
}

function formatPriority(priority: string | undefined): string {
  const labels: Record<string, string> = {
    speed: '⚡ Szybka realizacja',
    price: '💰 Optymalna cena',
    quality: '✨ Najwyższa jakość',
    feature: '🔧 Konkretna funkcjonalność',
  }
  return priority ? (labels[priority] ?? priority) : '—'
}

function clientEmailHtml(data: {
  name: string
  packageName: string
  label: string
  total: number
  estimatedTimeline: string
}): string {
  return `
    <!DOCTYPE html>
    <html lang="pl">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;background:#f4f6f9;font-family:sans-serif;">
      <div style="max-width:580px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <div style="background:#1a1a2e;padding:32px;text-align:center;">
          <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">BluePort Studio</h1>
          <p style="margin:8px 0 0;color:#94a3b8;font-size:14px;">Twoja wycena jest gotowa</p>
        </div>
        <div style="padding:32px;">
          <p style="margin:0 0 24px;font-size:16px;color:#374151;">
            Cześć <strong>${data.name}</strong>,<br><br>
            dziękuję za wypełnienie kalkulatora. Poniżej znajdziesz szacunkową wycenę Twojego projektu.
          </p>
          <div style="background:#f8faff;border:1px solid #e2e8f0;border-radius:10px;padding:24px;margin-bottom:24px;">
            <p style="margin:0 0 6px;font-size:13px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Pakiet</p>
            <p style="margin:0 0 20px;font-size:17px;font-weight:600;color:#1a1a2e;">${data.packageName}</p>
            <p style="margin:0 0 6px;font-size:13px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Szacunkowy koszt</p>
            <p style="margin:0 0 20px;font-size:32px;font-weight:700;color:#3b82f6;">${data.label}</p>
            <p style="margin:0 0 6px;font-size:13px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Czas realizacji</p>
            <p style="margin:0;font-size:17px;font-weight:600;color:#1a1a2e;">${data.estimatedTimeline}</p>
          </div>
          <p style="margin:0 0 16px;font-size:14px;color:#64748b;line-height:1.6;">
            To wycena orientacyjna. Skontaktuję się z Tobą w ciągu <strong style="color:#374151;">24 godzin roboczych</strong>, żeby omówić szczegóły.
          </p>
          <p style="margin:0;font-size:14px;color:#64748b;">
            Pytania? <a href="mailto:${process.env.NOTIFICATION_EMAIL}" style="color:#3b82f6;">${process.env.NOTIFICATION_EMAIL}</a>
          </p>
        </div>
        <div style="background:#f8faff;padding:20px 32px;border-top:1px solid #e2e8f0;">
          <p style="margin:0;font-size:12px;color:#94a3b8;text-align:center;">BluePort Studio · Szczecin</p>
        </div>
      </div>
    </body>
    </html>
  `
}

function notificationEmailHtml(data: {
  name: string
  email: string
  phone?: string
  packageId: string
  packageName: string
  features: string[]
  timeline: string
  projectPriority?: string
  total: number
  label: string
  estimatedTimeline: string
  qualificationTags: string[]
  projectDescription: string | null
  breakdown: Array<{ label: string; price: number }>
}): string {
  const tagsHtml = data.qualificationTags
    .map((t) => `<span style="display:inline-block;background:#dbeafe;color:#1d4ed8;padding:3px 10px;border-radius:20px;font-size:12px;margin:2px;">${t}</span>`)
    .join('')
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px 8px 0;color:#64748b;font-size:14px;">${label}</td><td style="padding:8px 0;font-size:14px;color:#1a1a2e;">${value}</td></tr>`
  const breakdownRows = data.breakdown
    .map((b) => row(b.label, formatPrice(b.price)))
    .join('')

  return `
    <!DOCTYPE html>
    <html lang="pl">
    <head><meta charset="UTF-8"></head>
    <body style="margin:0;padding:0;font-family:sans-serif;background:#f4f6f9;">
      <div style="max-width:600px;margin:24px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
        <div style="background:#1a1a2e;padding:24px;color:#fff;">
          <h1 style="margin:0;font-size:18px;">Nowy lead — kalkulator</h1>
        </div>
        <div style="padding:24px;">
          <table style="width:100%;border-collapse:collapse;">${row('Imię', data.name)}${row('Email', data.email)}${row('Telefon', data.phone || '—')}${row('Pakiet', data.packageName)}${row('Dodatki', formatFeatureLabels(data.features))}${row('Tryb', data.timeline)}${row('Priorytet', formatPriority(data.projectPriority))}${row('Wycena', data.label)}${row('Czas realizacji', data.estimatedTimeline)}</table>
          ${data.projectDescription ? `<p style="margin:16px 0 0;padding:12px;background:#f8fafc;border-radius:8px;font-size:13px;color:#475569;">${data.projectDescription}</p>` : ''}
          ${breakdownRows ? `<table style="width:100%;margin-top:16px;border-collapse:collapse;">${breakdownRows}</table>` : ''}
          <div style="margin-top:16px;">${tagsHtml}</div>
        </div>
      </div>
    </body>
    </html>
  `
}
