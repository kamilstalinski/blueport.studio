import Link from "next/link";

import { PixelField } from "@/components/deco/PixelField";
import { ScrollingFrame } from "@/components/sections/home/ScrollingFrame";
import { InView } from "@/components/ui/InView";
import { WORK_SITES } from "@/constants/work";

const WALL_SITES = WORK_SITES.slice(3);

export function WorkWall() {
  return (
    <section className="sec px-host" aria-labelledby="work-wall-title">
      <PixelField />
      <div className="shell">
        <div className="wall-head">
          <InView className="reveal">
            <h2 id="work-wall-title" className="d2" data-keep-out>
              Trzy kolejne, które możemy pokazać.
            </h2>
          </InView>
          <InView className="reveal">
            <Link href="/realizacje" className="link" data-keep-out>
              Wszystkie realizacje
            </Link>
          </InView>
        </div>
        <div className="wall">
          {WALL_SITES.map((site) => (
            <InView key={site.slug} className="reveal">
              <ScrollingFrame href={`/realizacje/${site.slug}`} domain={site.domain} name={site.name} page={site.page} />
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
