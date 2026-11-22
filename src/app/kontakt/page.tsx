import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/contact/ContactForm";
import { PageHead } from "@/components/pages/PageHead";
import { Arrow } from "@/components/ui/Arrow";
import { InView } from "@/components/ui/InView";

export const metadata: Metadata = {
  title: "Kontakt — Blueport Studio Szczecin",
  description:
    "Skontaktuj się z nami. Studio webowe Szczecin — odpiszemy w ciągu 24h. Bezpłatna konsultacja i wycena projektu.",
  alternates: { canonical: "https://blueport.studio/kontakt" },
  openGraph: { url: "https://blueport.studio/kontakt" },
};

const DIRECT = [
  { term: "E-mail", value: <a href="mailto:kontakt@blueport.studio">kontakt@blueport.studio</a> },
  { term: "Telefon", value: <a href="tel:+48534287233">+48 534 287 233</a> },
  { term: "Gdzie jesteśmy", value: "Szczecin, pracujemy w całej Polsce" },
  { term: "Czas odpowiedzi", value: "do 24 godzin w dni robocze" },
] as const;

export default function KontaktPage() {
  return (
    <>
      <PageHead
        title="Napisz, co chcesz zbudować."
        lede="Odpowiadamy w ciągu 24 godzin w dni robocze. Konsultacja jest bezpłatna i nie zobowiązuje."
      />
      <section className="bp-sec bp-sec--tight bp-contact" aria-label="Formularz kontaktowy">
        <div className="bp-shell bp-grid">
          <InView className="reveal bp-contact-form">
            <ContactForm />
          </InView>
          <InView className="reveal contact-aside bp-contact-aside" lag={1}>
            <h2>Wolisz napisać bezpośrednio?</h2>
            <dl className="bp-dl">
              {DIRECT.map((item) => (
                <div key={item.term}>
                  <dt className="bp-mono">{item.term}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
            <div className="bp-note">
              <h3>Chcesz najpierw poznać cenę?</h3>
              <p>Kalkulator policzy widełki w 60 sekund, bez podawania danych kontaktowych.</p>
              <div className="bp-rows-act">
                <Link className="bp-row-act bp-row-act--primary" href="/kalkulator">
                  Sprawdź koszt <Arrow />
                </Link>
              </div>
            </div>
          </InView>
        </div>
      </section>
    </>
  );
}
