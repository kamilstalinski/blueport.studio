import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/contact/ContactForm";
import { PageHead } from "@/components/pages/PageHead";
import { Arrow } from "@/components/ui/Arrow";
import { InView } from "@/components/ui/InView";

export const metadata: Metadata = {
  title: "Kontakt: strony internetowe Szczecin",
  description:
    "Napisz przez formularz, na kontakt@blueport.studio albo zadzwoń: +48 534 287 233. Studio stron internetowych ze Szczecina, odpowiedź w 24 h w dni robocze.",
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
        title="Napisz, jakiej strony internetowej potrzebujesz."
        lede="Jesteśmy ze Szczecina i pracujemy z firmami z całej Polski. Odpowiadamy w ciągu 24 godzin w dni robocze, a konsultacja jest bezpłatna."
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
            <div className="bp-after">
              <h3>Co dzieje się po wysłaniu</h3>
              <ol>
                <li>Kamil albo Rafał odpisuje w ciągu 24 godzin w dni robocze.</li>
                <li>Umawiamy krótką rozmowę i doprecyzowujemy zakres.</li>
                <li>Dostajesz umowę z zakresem i datą publikacji.</li>
              </ol>
            </div>
            <div className="bp-note">
              <h3>Wolisz najpierw policzyć zakres?</h3>
              <p>Kalkulator pokaże wstępną wycenę w 60 sekund, bez podawania danych kontaktowych.</p>
              <div className="bp-rows-act">
                <Link className="bp-row-act bp-row-act--primary" href="/kalkulator">
                  Wyceń stronę <Arrow />
                </Link>
              </div>
            </div>
          </InView>
        </div>
      </section>
    </>
  );
}
