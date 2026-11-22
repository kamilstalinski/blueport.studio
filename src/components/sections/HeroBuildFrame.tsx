"use client";

import Image from "next/image";

import { Lock } from "@/components/ui/Arrow";
import { HERO_WIRES, type Wire, type WireKind } from "@/constants/heroWires";
import { HERO_WORK } from "@/constants/work";
import { useBuildCycle } from "@/hooks/useBuildCycle";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const isBar = (wire: Wire): boolean => wire.kind === "bar" || wire.kind === "bar-dim";
/* each hero site splits into its structure (drawn first) and its content bars */
const LAYOUTS = HERO_WORK.map((site) => {
  const wires = HERO_WIRES[site.slug] ?? [];
  return { structure: wires.filter((wire) => !isBar(wire)), bars: wires.filter(isBar) };
});
const COUNTS = LAYOUTS.map((layout) => ({ wireCount: layout.structure.length, barCount: layout.bars.length }));
const WIRE_CLASS: Record<WireKind, string> = {
  outline: "bp-bw",
  cta: "bp-bw bp-bw-cta",
  bar: "bp-bw bp-bw-bar",
  "bar-dim": "bp-bw bp-bw-bar bp-bw-dim",
};
const STEPS = ["Siatka", "Układ", "Treść", "Start"] as const;
const PLACEHOLDER_DOMAIN = "nowa-strona.pl";

/** The hero's moment: each client site's real layout builds on the construction dots, then the site itself wipes in; five sites in turn. */
export function HeroBuildFrame() {
  const isStill = usePrefersReducedMotion();
  const cycle = useBuildCycle({ counts: COUNTS, isStill });
  const site = HERO_WORK[cycle.site];
  const { structure, bars } = LAYOUTS[cycle.site];
  const isLive = cycle.stage === 3;

  return (
    <div className="bp-build" aria-hidden="true">
      <div className="bp-win">
        <div className="bp-win-bar">
          <Lock />
          <span className="bp-url bp-mono" translate="no">{isLive ? site.domain : PLACEHOLDER_DOMAIN}</span>
        </div>
        <div className="bp-pane" data-stage={cycle.stage}>
          <Image
            className="bp-shot"
            src={site.image}
            alt=""
            fill
            sizes="(max-width: 1023px) 100vw, 640px"
            priority={cycle.site === 0}
          />
          <div className="bp-cover" />
          <svg className="bp-wire" viewBox="0 0 400 330" shapeRendering="crispEdges">
            {structure.map((wire, index) => (
              <rect
                key={`${site.slug}-${wire.x}-${wire.y}-${wire.w}`}
                className={cn(WIRE_CLASS[wire.kind], index < cycle.wiresOn && "bp-in")}
                x={wire.x}
                y={wire.y}
                width={wire.w}
                height={wire.h}
              />
            ))}
            {bars.map((wire, index) => (
              <rect
                key={`${site.slug}-${wire.x}-${wire.y}-${wire.w}`}
                className={cn(WIRE_CLASS[wire.kind], index < cycle.barsOn && "bp-in")}
                x={wire.x}
                y={wire.y}
                width={wire.w}
                height={wire.h}
              />
            ))}
          </svg>
        </div>
      </div>
      <ol className="bp-build-steps">
        {STEPS.map((label, index) => (
          <li key={label} className={cn(index <= cycle.stage && "bp-on")}>
            <span className="bp-mono">{index + 1}</span>
            {label}
          </li>
        ))}
      </ol>
    </div>
  );
}
