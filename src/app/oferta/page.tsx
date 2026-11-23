import type { Metadata } from "next";

import { FaqTeaser } from "@/components/pages/FaqTeaser";
import { PageGrainient } from "@/components/sections/PageGrainient";
import { CtaBand } from "@/components/sections/home/CtaBand";
import { ProcessSection } from "@/components/sections/home/ProcessSection";
import { WorkWall } from "@/components/sections/home/WorkWall";
import { OfferGroup } from "@/components/sections/offer/OfferGroup";
import { OfferHero } from "@/components/sections/offer/OfferHero";

export const metadata: Metadata = {
  title: "Oferta: strony, sklepy, reklamy i AI",
  description:
    "Strony internetowe, sklepy WooCommerce, reklamy Meta i Google oraz wdrożenia AI dla małych firm ze Szczecina i całej Polski. Zobacz, co obejmuje każda usługa.",
  alternates: { canonical: "https://blueport.studio/oferta" },
  openGraph: { url: "https://blueport.studio/oferta" },
};

export default function OfferPage() {
  return (
    <div className="bp-home bp-scope">
      <PageGrainient />
      {/* the construction grid: four ruled columns the full height of the page */}
      <div className="bp-rails" aria-hidden="true">
        <div className="bp-shell">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      <OfferHero />
      <OfferGroup
        group="klienci"
        id="offer-klienci-h"
        title="Więcej klientów"
        lead="Strona i sklep zamieniają wizyty w zapytania i zamówienia. Reklamy w Meta i Google przyprowadzają na nie ludzi."
      />
      <OfferGroup
        group="automatyzacja"
        id="offer-ai-h"
        title="Mniej ręcznej pracy"
        lead="Na start oddajemy AI jeden proces, na przykład odpowiedzi na zapytania z formularza. Gdy działa, bierzemy następny."
      />
      <WorkWall />
      <ProcessSection />
      <FaqTeaser id="offer-faq-h" title="Pytania przed rozmową" keys={["contract", "time", "materials", "support"]} />
      <CtaBand onOfferPage />
    </div>
  );
}
