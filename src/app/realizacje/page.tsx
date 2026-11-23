import type { Metadata } from "next";

import { PageHead } from "@/components/pages/PageHead";
import { CtaBand } from "@/components/sections/home/CtaBand";
import { QuotesSection } from "@/components/sections/home/QuotesSection";
import { ScrollingFrame } from "@/components/sections/home/ScrollingFrame";
import { InView } from "@/components/ui/InView";
import { WORK_SITES } from "@/constants/work";

export const metadata: Metadata = {
  title: "Realizacje stron internetowych dla firm",
  description:
    "Osiem stron i sklepów internetowych dla małych firm: gabinet fizjoterapii, sklep streetwear, szkółka drzew i inne. Zobacz, jak je zaprojektowaliśmy.",
  alternates: { canonical: "https://blueport.studio/realizacje" },
  openGraph: { url: "https://blueport.studio/realizacje" },
};

export default function RealizacjePage() {
  return (
    <>
      <PageHead
        title="Realizacje stron internetowych dla małych firm"
        lede="Osiem stron i sklepów, które możemy pokazać. Najedź kursorem na dowolną, żeby przewinąć ją w całości bez wchodzenia na stronę klienta."
      />
      <section className="bp-sec bp-sec--tight" aria-label="Realizacje">
        <div className="bp-shell">
          <div className="bp-wall">
            {WORK_SITES.map((site) => (
              <InView key={site.slug} className="reveal">
                <ScrollingFrame href={`/realizacje/${site.slug}`} domain={site.domain} kind={site.kind} name={site.name} page={site.page} />
              </InView>
            ))}
          </div>
        </div>
      </section>
      <QuotesSection />
      <CtaBand />
    </>
  );
}
