import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/ContactForm";
import { PageHead } from "@/components/pages/PageHead";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { InView } from "@/components/ui/InView";

export const metadata: Metadata = {
  title: "Kontakt — Blueport Studio Szczecin",
  description:
    "Skontaktuj się z nami. Studio webowe Szczecin — odpiszemy w ciągu 24h. Bezpłatna konsultacja i wycena projektu.",
  alternates: { canonical: "https://blueport.studio/kontakt" },
  openGraph: { url: "https://blueport.studio/kontakt" },
};

const DIRECT = [
  { term: "E-mail", value: <a className="link" href="mailto:kontakt@blueport.studio">kontakt@blueport.studio</a> },
  { term: "Telefon", value: <a className="link" href="tel:+48534287233">+48 534 287 233</a> },
  { term: "Gdzie jesteśmy", value: "Szczecin, pracujemy w całej Polsce" },
  { term: "Czas odpowiedzi", value: "do 24 godzin w dni robocze" },
] as const;

export default function KontaktPage() {
  return (
    <>
      <PageHead
        title="Napisz, co chcesz zbudować."
        titleWidth="20ch"
        lede="Odpowiadamy w ciągu 24 godzin w dni robocze. Konsultacja jest bezpłatna i nie zobowiązuje."
      />
      <section className="page-body" aria-label="Formularz kontaktowy">
        <div className="shell contact-grid">
          <InView className="reveal">
            <ContactForm />
          </InView>
          <InView className="reveal contact-aside" lag={1}>
            <h2 className="d3">Wolisz napisać bezpośrednio?</h2>
            <dl className="dl">
              {DIRECT.map((item) => (
                <div key={item.term}>
                  <dt>{item.term}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
            <div className="px-note contact-price">
              <h3 className="d3">Chcesz najpierw poznać cenę?</h3>
              <p className="body">Kalkulator policzy widełki w 60 sekund, bez podawania danych kontaktowych.</p>
              <ButtonLink href="/kalkulator" withArrow>
                Sprawdź koszt
              </ButtonLink>
            </div>
          </InView>
        </div>
      </section>
    </>
  );
}
