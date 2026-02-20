import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { CTA } from "@/components/sections/CTA";

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
              <form action="#" method="post">
                <div className="contact-field">
                  <label htmlFor="contact-name" className="contact-label">
                    Imię
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Imię"
                  />
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-email" className="contact-label">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-type" className="contact-label">
                    Typ projektu
                  </label>
                  <select id="contact-type" name="projectType">
                    <option value="">—</option>
                    <option value="strona">Strona firmowa</option>
                    <option value="sklep">Sklep internetowy</option>
                    <option value="inne">Inne</option>
                  </select>
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-budget" className="contact-label">
                    Budżet
                  </label>
                  <input
                    id="contact-budget"
                    type="text"
                    name="budget"
                    placeholder="Budżet"
                  />
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-message" className="contact-label">
                    Wiadomość
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Wiadomość"
                  />
                </div>
                <button type="submit" className="contact-submit">
                  Wyślij zapytanie
                </button>
              </form>
            </GlassCard>
          </div>

          <div className="contact-info-col">
            <div className="contact-info">
              <h3>Wolisz pisać bezpośrednio?</h3>
              <p>Odpowiadamy w ciągu 24h w dni robocze.</p>

              <div className="contact-item">
                <span className="contact-label">Email</span>
                <a href="mailto:kontakt@blueport.studio">
                  kontakt@blueport.studio
                </a>
              </div>

              <div className="contact-item">
                <span className="contact-label">Telefon</span>
                <a href="tel:+48123456789">+48 123 456 789</a>
              </div>

              <div className="contact-item">
                <span className="contact-label">Lokalizacja</span>
                <span className="text-[0.85rem] text-white/75">
                  Szczecin + praca zdalna
                </span>
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

        <hr className="contact-divider" />
        <div className="contact-kalkulator-link-wrap">
          <Link href="/kalkulator">
            Kalkulator wyceny — szacunkowy koszt w kilka minut
          </Link>
        </div>
      </Section>

      <CTA />
    </>
  );
}
