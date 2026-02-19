import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { OfertaPakiety } from "@/components/sections/OfertaPakiety";
import { Section } from "@/components/ui/Section";
import { FAQSection } from "@/components/sections/FAQSection";
import { KalkulatorSection } from "@/components/sections/KalkulatorSection";
import { CTA } from "@/components/sections/CTA";

export default function UslugiPage() {
  return (
    <>
      <Hero contentKey="uslugi.hero" />
      <OfertaPakiety cardVariant="subpage" />

      <Section id="porownanie-pakietow" noWrapper>
        <div className="container-narrow mb-10">
          <p className="section-eyebrow">// Porównanie</p>
          <h2 className="heading-2 text-white mb-0">Który pakiet dla Ciebie?</h2>
        </div>
        <div className="container overflow-x-auto">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Funkcja</th>
                <th>WordPress</th>
                <th>WooCommerce</th>
                <th>Next.js</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Czas realizacji</td>
                <td>5-7 dni</td>
                <td>7-14 dni</td>
                <td>14-30 dni</td>
              </tr>
              <tr>
                <td>CMS do edycji</td>
                <td className="check">✓</td>
                <td className="check">✓</td>
                <td>Opcjonalnie</td>
              </tr>
              <tr>
                <td>Sklep online</td>
                <td>—</td>
                <td className="check">✓</td>
                <td className="check">✓</td>
              </tr>
              <tr>
                <td>Własna logika</td>
                <td>—</td>
                <td>Częściowo</td>
                <td className="check">✓</td>
              </tr>
              <tr>
                <td>SEO on-page</td>
                <td className="check">✓</td>
                <td className="check">✓</td>
                <td className="check">✓</td>
              </tr>
              <tr>
                <td>Wsparcie po</td>
                <td>30 dni</td>
                <td>30 dni</td>
                <td>Indywidualnie</td>
              </tr>
            </tbody>
          </table>
        </div>
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
