import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { OfertaPakiety } from "@/components/sections/OfertaPakiety";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { FAQSection } from "@/components/sections/FAQSection";
import { KalkulatorSection } from "@/components/sections/KalkulatorSection";
import { CTA } from "@/components/sections/CTA";
import { PACKAGES } from "@/constants/pricing";

export const metadata: Metadata = {
  title: "Usługi — Strony i sklepy internetowe",
  description:
    "Tworzymy strony firmowe, sklepy WooCommerce i aplikacje webowe w Next.js. Sprawdź co możemy dla Ciebie zrobić.",
  alternates: { canonical: "https://blueport.studio/uslugi" },
  openGraph: { url: "https://blueport.studio/uslugi" },
};

export default function UslugiPage() {
  return (
    <>
      <Hero contentKey="uslugi.hero" />
      <OfertaPakiety cardVariant="subpage" />

      <Section id="porownanie-pakietow" noWrapper>
        <Container variant="narrow" className="mb-10">
          <p className="section-eyebrow">{"// Porównanie"}</p>
          <h2 className="heading-2 text-white mb-0">Który pakiet dla Ciebie?</h2>
        </Container>
        <Container className="overflow-x-auto">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Funkcja</th>
                <th className="compare-table-package">
                  Strona start
                  <span className="compare-table-package-tech">WordPress</span>
                </th>
                <th className="compare-table-package">
                  Strona Pro
                  <span className="compare-table-package-tech">WordPress</span>
                </th>
                <th className="compare-table-package">
                  Sklep online
                  <span className="compare-table-package-tech">WooCommerce</span>
                </th>
                <th className="compare-table-package">
                  Dedykowany
                  <span className="compare-table-package-tech">Next.js / React</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Czas realizacji (orientacyjnie)</td>
                <td>{PACKAGES["strona-start"].deliveryLabel}</td>
                <td>{PACKAGES["strona-pro"].deliveryLabel}</td>
                <td>{PACKAGES["sklep-online"].deliveryLabel}</td>
                <td>{PACKAGES["projekt-dedykowany"].deliveryLabel}</td>
              </tr>
              <tr>
                <td>CMS do edycji treści</td>
                <td className="check">✓</td>
                <td className="check">✓</td>
                <td className="check">✓</td>
                <td>Opcjonalnie (headless CMS)</td>
              </tr>
              <tr>
                <td>Sklep / e-commerce</td>
                <td>—</td>
                <td>—</td>
                <td className="check">✓</td>
                <td>Według zakresu (np. custom)</td>
              </tr>
              <tr>
                <td>Projekt i logika na miarę</td>
                <td>Szablon + personalizacja</td>
                <td>Projekt indywidualny (WP)</td>
                <td>Rozszerzenia Woo</td>
                <td className="check">✓</td>
              </tr>
              <tr>
                <td>SEO i widoczność</td>
                <td>Podstawowa + analityka</td>
                <td className="check">✓</td>
                <td>Podstawowa (sklep)</td>
                <td>Techniczna (performance)</td>
              </tr>
              <tr>
                <td>Wsparcie po wdrożeniu</td>
                <td>14 dni</td>
                <td>30 dni</td>
                <td>Ustalamy przy wycenie</td>
                <td>Ustalamy przy wycenie</td>
              </tr>
            </tbody>
          </table>
        </Container>
      </Section>

      <Section noWrapper>
        <div className="container-narrow text-center">
          <p className="text-sm text-muted-foreground">
            Jak wygląda współpraca?{" "}
            <Link href="/proces" className="text-primary hover:underline">
              Zobacz pełny proces →
            </Link>
          </p>
        </div>
      </Section>

      <FAQSection contentKey="uslugi.faq" faqKeys={["time", "contract", "hosting", "cms", "support"]} />
      <KalkulatorSection />
      <CTA />
    </>
  );
}
