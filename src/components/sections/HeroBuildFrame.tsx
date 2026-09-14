"use client";

import Image from "next/image";

import { PixelIcon } from "@/components/brand/PixelIcon";
import { PixelTile } from "@/components/brand/PixelTile";
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
  outline: "bw",
  cta: "bw bw-cta",
  bar: "bw bw-bar",
  "bar-dim": "bw bw-bar bw-dim",
};
const STEPS = [
  { digit: "1", label: "Siatka" },
  { digit: "2", label: "Układ" },
  { digit: "3", label: "Treść" },
  { digit: "4", label: "Start" },
] as const;
const PLACEHOLDER_DOMAIN = "nowa-strona.pl";

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

  /* No entrance animation on the frame: with the h1 sliding too, Chrome dropped both as LCP
     candidates in about half of the page loads. The build sequence is the frame's entrance. */
  return (
    <div>
      <div className="frame bd-frame">
        <div className="chrome">
          <PixelIcon name="lock" />
          <span>{isLive ? site.domain : PLACEHOLDER_DOMAIN}</span>
        </div>
        <div className="bd-pane" data-stage={cycle.stage}>
          <Image
            className="bd-shot"
            src={site.image}
            alt="Przykładowa realizacja"
            fill
            sizes="(max-width: 1000px) 100vw, 560px"
            priority={cycle.site === 0}
          />
          <div className="bd-cover" aria-hidden="true" />
          <svg className="bd-wire" viewBox="0 0 400 330" shapeRendering="crispEdges" aria-hidden="true">
            {STRUCTURE.map((wire, index) => (
              <rect
                key={`${wire.x}-${wire.y}`}
                className={cn(WIRE_CLASS[wire.kind], index < cycle.wiresOn && "in")}
                x={wire.x}
                y={wire.y}
                width={wire.w}
                height={wire.h}
              />
            ))}
            {BARS.map((wire, index) => (
              <rect
                key={`${wire.x}-${wire.y}`}
                className={cn(WIRE_CLASS[wire.kind], index < cycle.barsOn && "in")}
                x={wire.x}
                y={wire.y}
                width={wire.w}
                height={wire.h}
              />
            ))}
          </svg>
        </div>
      </div>
      <ol className="bd-steps" data-keep-out aria-hidden="true">
        {STEPS.map((step, index) => (
          <li key={step.label} className={cn(index <= cycle.stage && "on")}>
            <PixelTile digit={step.digit} scale={2} />
            <span>{step.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
