import { describe, expect, it } from "vitest";

import { buildTimeline } from "@/lib/hero/buildTimeline";

describe("buildTimeline", () => {
  const { frames, cycleMs } = buildTimeline(11, 5);

  it("starts blank on the grid stage", () => {
    expect(frames[0]).toEqual({ at: 0, stage: 0, wiresOn: 0, barsOn: 0 });
  });

  it("draws the layout one wire every 110ms after 900ms", () => {
    expect(frames[1]).toEqual({ at: 900, stage: 1, wiresOn: 1, barsOn: 0 });
    expect(frames[11]).toEqual({ at: 2000, stage: 1, wiresOn: 11, barsOn: 0 });
  });

  it("adds content bars, then reveals the real site at 3760ms", () => {
    expect(frames[12]).toEqual({ at: 2460, stage: 2, wiresOn: 11, barsOn: 1 });
    expect(frames.at(-1)).toEqual({ at: 3760, stage: 3, wiresOn: 11, barsOn: 5 });
    expect(frames).toHaveLength(18);
  });

  it("holds the finished site for 3600ms before the next cycle", () => {
    expect(cycleMs).toBe(7360);
  });
});
