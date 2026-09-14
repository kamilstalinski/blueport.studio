import { describe, expect, it } from "vitest";
import { addAmbient, addPointer, createTrailGrid, isOpenCell, stepTrail, TRAIL_LIFE_MS } from "@/lib/hero/cursorTrail";

const sequence = (...values: number[]): (() => number) => {
  let index = 0;
  return () => values[index++ % values.length];
};

describe("createTrailGrid", () => {
  it("blocks the padded area around copy and leaves the rest open", () => {
    const grid = createTrailGrid(320, 160, [{ left: 64, top: 64, right: 96, bottom: 80 }]);
    expect(grid.cols).toBe(20);
    expect(grid.rows).toBe(10);
    expect(isOpenCell(grid, 3, 3)).toBe(false);
    expect(isOpenCell(grid, 6, 5)).toBe(false);
    expect(isOpenCell(grid, 7, 3)).toBe(true);
    expect(isOpenCell(grid, 2, 3)).toBe(true);
    expect(isOpenCell(grid, 20, 0)).toBe(false);
  });
});

describe("addPointer", () => {
  const grid = createTrailGrid(320, 160, []);

  it("lights the accent cell under the pointer", () => {
    expect(addPointer([], grid, 40, 20, sequence(0.9))).toEqual([{ x: 2, y: 1, life: 1, accent: true }]);
  });

  it("adds a fading neighbour when the coin lands", () => {
    expect(addPointer([], grid, 40, 20, sequence(0.1, 0.1, 0.9))).toEqual([
      { x: 2, y: 1, life: 1, accent: true },
      { x: 1, y: 2, life: 0.7, accent: false },
    ]);
  });

  it("refreshes an existing cell instead of stacking a duplicate", () => {
    const cells = [{ x: 2, y: 1, life: 0.2, accent: true }];
    expect(addPointer(cells, grid, 40, 20, sequence(0.9))).toEqual([{ x: 2, y: 1, life: 1, accent: true }]);
  });

  it("ignores a pointer over copy", () => {
    const covered = createTrailGrid(320, 160, [{ left: 0, top: 0, right: 320, bottom: 160 }]);
    expect(addPointer([], covered, 40, 20, sequence(0.9))).toEqual([]);
  });
});

describe("addAmbient", () => {
  it("sparks a dim cell somewhere open", () => {
    const grid = createTrailGrid(320, 160, []);
    expect(addAmbient([], grid, sequence(0.5, 0.5, 0.9))).toEqual([{ x: 10, y: 5, life: 0.6, accent: false }]);
  });
});

describe("stepTrail", () => {
  it("fades cells over TRAIL_LIFE_MS and drops the spent ones", () => {
    const cells = [
      { x: 0, y: 0, life: 1, accent: true },
      { x: 1, y: 0, life: 0.2, accent: false },
    ];
    expect(stepTrail(cells, TRAIL_LIFE_MS / 2)).toEqual([{ x: 0, y: 0, life: 0.5, accent: true }]);
  });
});
