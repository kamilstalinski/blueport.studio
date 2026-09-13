import type { BuildFrame } from "@/types";

export const BUILD_TIMING = {
  blank: 900,
  perWire: 110,
  afterWires: 350,
  perBar: 140,
  afterBars: 600,
  hold: 3600,
} as const;

export function buildTimeline(wireCount: number, barCount: number): { frames: BuildFrame[]; cycleMs: number } {
  const frames: BuildFrame[] = [{ at: 0, stage: 0, wiresOn: 0, barsOn: 0 }];
  let at = BUILD_TIMING.blank;

  for (let wire = 1; wire <= wireCount; wire++) {
    frames.push({ at, stage: 1, wiresOn: wire, barsOn: 0 });
    at += BUILD_TIMING.perWire;
  }
  at += BUILD_TIMING.afterWires;

  for (let bar = 1; bar <= barCount; bar++) {
    frames.push({ at, stage: 2, wiresOn: wireCount, barsOn: bar });
    at += BUILD_TIMING.perBar;
  }
  at += BUILD_TIMING.afterBars;

  frames.push({ at, stage: 3, wiresOn: wireCount, barsOn: barCount });
  return { frames, cycleMs: at + BUILD_TIMING.hold };
}
