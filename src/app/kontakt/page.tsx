import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { CTA } from "@/components/sections/CTA";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt — Blueport Studio Szczecin",
  description:
    "Skontaktuj się z nami. Studio webowe Szczecin — odpiszemy w ciągu 24h. Bezpłatna konsultacja i wycena projektu.",
  alternates: { canonical: "https://blueport.studio/kontakt" },
  openGraph: { url: "https://blueport.studio/kontakt" },
};

export default function KontaktPage() {
  return (
    <>
      <Hero contentKey="kontakt.hero" />

      <Section id="formularz-kontaktowy" topGradient>
        <div className="contact-layout">
          <div className="contact-form-col">
            <GlassCard className="contact-form-card">
              <h2 className="text-xl font-semibold tracking-tight text-foreground mb-6">
                Formularz kontaktowy
              </h2>
              <ContactForm />
            </GlassCard>
          </div>

          <div className="contact-info-col">
            <div className="contact-info">
              <h3>Wolisz pisać bezpośrednio?</h3>
              <p>Odpowiadamy w ciągu 24h w dni robocze.</p>

              <div className="contact-item">
                <span className="contact-label">Email</span>
                <a href="mailto:kontakt@blueport.studio">kontakt@blueport.studio</a>
              </div>

              <div className="contact-item">
                <span className="contact-label">Telefon</span>
                <a href="tel:+48534287233">+48 534 287 233</a>
              </div>

              <div className="contact-item">
                <span className="contact-label">Lokalizacja</span>
                <span className="text-[0.85rem] text-white/75">Szczecin + praca zdalna</span>
              </div>

              <div className="contact-note">
                <p>Preferujesz szybką wycenę?</p>
                <Link href="/kalkulator" className="btn-outline-sm">
                  Sprawdź koszt w 60 sek →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-kalkulator-link-wrap">
          <Link href="/kalkulator">Kalkulator wyceny — szacunkowy koszt w kilka minut</Link>
        </div>
      </Section>

      <CTA />
    </>
  );
}
