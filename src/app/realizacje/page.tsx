import type { Metadata } from "next";

import { PageHead } from "@/components/pages/PageHead";
import { CtaBand } from "@/components/sections/home/CtaBand";
import { ScrollingFrame } from "@/components/sections/home/ScrollingFrame";
import { InView } from "@/components/ui/InView";
import { WORK_SITES } from "@/constants/work";

export const metadata: Metadata = {
  title: "Realizacje — Portfolio Blueport Studio",
  description:
    "Zobacz nasze realizacje — strony firmowe, sklepy internetowe i aplikacje webowe. Projekty dla firm z Szczecina i całej Polski.",
  alternates: { canonical: "https://blueport.studio/realizacje" },
  openGraph: { url: "https://blueport.studio/realizacje" },
};

const WALLS = [WORK_SITES.slice(0, 3), WORK_SITES.slice(3)] as const;

export default function RealizacjePage() {
  return (
    <>
      <PageHead
        title="Dziesięć wdrożeń. Sześć, które możemy pokazać."
        titleWidth="23ch"
        lede="Najedź kursorem na dowolną, żeby przewinąć ją w całości. Bez wchodzenia na stronę klienta."
      />
      <section className="page-body" aria-label="Realizacje">
        <div className="shell">
          {WALLS.map((wall, index) => (
            <div key={index} className="wall work-walls">
              {wall.map((site) => (
                <InView key={site.slug} className="reveal">
                  <ScrollingFrame href={`/realizacje/${site.slug}`} domain={site.domain} name={site.name} page={site.page} />
                </InView>
              ))}
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
