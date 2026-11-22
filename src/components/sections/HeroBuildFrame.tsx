"use client";

import Image from "next/image";

import { Lock } from "@/components/ui/Arrow";
import { HERO_WORK } from "@/constants/work";
import { useBuildCycle } from "@/hooks/useBuildCycle";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type WireKind = "outline" | "cta" | "bar" | "bar-dim";
type Wire = { x: number; y: number; w: number; h: number; kind: WireKind };

/* A 400×330 page skeleton: nav, hero block, three cards, footer. Bars are the content layer. */
const WIRES: readonly Wire[] = [
  { x: 16, y: 14, w: 56, h: 10, kind: "outline" },
  { x: 262, y: 14, w: 30, h: 10, kind: "outline" },
  { x: 300, y: 14, w: 30, h: 10, kind: "outline" },
  { x: 340, y: 12, w: 44, h: 14, kind: "cta" },
  { x: 16, y: 44, w: 220, h: 120, kind: "outline" },
  { x: 248, y: 44, w: 136, h: 120, kind: "outline" },
  { x: 32, y: 66, w: 160, h: 14, kind: "bar" },
  { x: 32, y: 90, w: 120, h: 9, kind: "bar-dim" },
  { x: 32, y: 130, w: 70, h: 16, kind: "cta" },
  { x: 16, y: 178, w: 116, h: 84, kind: "outline" },
  { x: 142, y: 178, w: 116, h: 84, kind: "outline" },
  { x: 268, y: 178, w: 116, h: 84, kind: "outline" },
  { x: 28, y: 196, w: 70, h: 8, kind: "bar-dim" },
  { x: 154, y: 196, w: 70, h: 8, kind: "bar-dim" },
  { x: 280, y: 196, w: 70, h: 8, kind: "bar-dim" },
  { x: 16, y: 276, w: 368, h: 40, kind: "outline" },
];
const isBar = (wire: Wire): boolean => wire.kind === "bar" || wire.kind === "bar-dim";
const STRUCTURE = WIRES.filter((wire) => !isBar(wire));
const BARS = WIRES.filter(isBar);
const WIRE_CLASS: Record<WireKind, string> = {
  outline: "bp-bw",
  cta: "bp-bw bp-bw-cta",
  bar: "bp-bw bp-bw-bar",
  "bar-dim": "bp-bw bp-bw-bar bp-bw-dim",
};
const STEPS = ["Siatka", "Układ", "Treść", "Start"] as const;
const PLACEHOLDER_DOMAIN = "nowa-strona.pl";

/** The hero's moment: a page builds on the construction dots, then a real client site wipes in; five sites in turn. */
export function HeroBuildFrame() {
  const isStill = usePrefersReducedMotion();
  const cycle = useBuildCycle({
    wireCount: STRUCTURE.length,
    barCount: BARS.length,
    siteCount: HERO_WORK.length,
    isStill,
  });
  const site = HERO_WORK[cycle.site];
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
            {STRUCTURE.map((wire, index) => (
              <rect
                key={`${wire.x}-${wire.y}`}
                className={cn(WIRE_CLASS[wire.kind], index < cycle.wiresOn && "bp-in")}
                x={wire.x}
                y={wire.y}
                width={wire.w}
                height={wire.h}
              />
            ))}
            {BARS.map((wire, index) => (
              <rect
                key={`${wire.x}-${wire.y}`}
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
