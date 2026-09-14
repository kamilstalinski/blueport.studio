import { describe, expect, it } from "vitest";
import { pixelField } from "@/lib/pixel/pixelField";

const AREA = { width: 1200, height: 800 };
const origin = (d: string): [number, number] => {
  const match = /^M(-?[\d.]+) (-?[\d.]+)/.exec(d);
  expect(match).not.toBeNull();
  return [Number(match?.[1]), Number(match?.[2])];
};

describe("pixelField", () => {
  it("is stable for the same seed", () => {
    expect(pixelField({ ...AREA, keepOut: [] })).toEqual(pixelField({ ...AREA, keepOut: [] }));
  });

  it("stays at or under one sprite per 9000px²", () => {
    const pixels = pixelField({ ...AREA, keepOut: [] });
    expect(pixels.length).toBeGreaterThan(0);
    expect(pixels.length).toBeLessThanOrEqual(Math.round((AREA.width * AREA.height) / 9000));
  });

  it("never starts a sprite on or near copy", () => {
    const copy = { left: 100, top: 100, right: 700, bottom: 260 };
    for (const pixel of pixelField({ ...AREA, keepOut: [copy] })) {
      const [x, y] = origin(pixel.d);
      const inside = x > copy.left - 16 && x < copy.right + 16 && y > copy.top - 16 && y < copy.bottom + 16;
      expect(inside).toBe(false);
    }
  });

  it("thins out toward the bottom of the section", () => {
    const pixels = pixelField({ ...AREA, keepOut: [] });
    const top = pixels.filter((pixel) => origin(pixel.d)[1] < AREA.height / 2).length;
    expect(top).toBeGreaterThan(pixels.length - top);
  });

  it("uses only the three field tones", () => {
    for (const pixel of pixelField({ ...AREA, keepOut: [] })) expect(["a", "b", "c"]).toContain(pixel.tone);
  });
});
