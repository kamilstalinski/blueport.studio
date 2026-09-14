import { describe, expect, it } from "vitest";

import { countAt } from "@/lib/countUp";

describe("countAt", () => {
  it("starts at zero and lands exactly on the target", () => {
    expect(countAt(10, 0, 900)).toBe(0);
    expect(countAt(10, 900, 900)).toBe(10);
    expect(countAt(10, 5000, 900)).toBe(10);
  });

  it("eases out: most of the distance is covered by half time", () => {
    expect(countAt(24, 450, 900)).toBe(21);
  });
});
