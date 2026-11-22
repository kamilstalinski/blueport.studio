import { describe, expect, it } from "vitest";
import { craneRuns, CRANE_GRID, CRANE_HEADS, HEAD_FRAMES, headRuns } from "@/lib/pixel/cranes";

const cells = craneRuns().flatMap((run) => Array.from({ length: run.w }, (_, i) => ({ x: run.x + i, y: run.y })));

describe("craneRuns", () => {
  it("stays inside the grid", () => {
    expect(cells.length).toBeGreaterThan(0);
    for (const cell of cells) {
      expect(cell.x).toBeGreaterThanOrEqual(0);
      expect(cell.x).toBeLessThan(CRANE_GRID.cols);
      expect(cell.y).toBeGreaterThanOrEqual(0);
      expect(cell.y).toBeLessThan(CRANE_GRID.rows);
    }
  });

  it("stands three portals on the ground row", () => {
    const ground = cells.filter((cell) => cell.y === CRANE_GRID.rows - 1).map((cell) => cell.x);
    expect(ground.some((x) => x >= 3 && x <= 28)).toBe(true);
    expect(ground.some((x) => x >= 45 && x <= 70)).toBe(true);
    expect(ground.some((x) => x >= 90 && x <= 125)).toBe(true);
  });

  it("raises the luffing boom to the top of the grid", () => {
    expect(Math.min(...cells.map((cell) => cell.y))).toBeLessThanOrEqual(2);
  });

  it("draws every cell either on the body or in an untilted head", () => {
    const key = (run: { x: number; y: number; w: number }) => Array.from({ length: run.w }, (_, i) => `${run.x + i},${run.y}`);
    const drawn = new Set([craneRuns("body"), ...CRANE_HEADS.map((_, head) => headRuns(head, 0))].flat().flatMap(key));
    expect(drawn).toEqual(new Set(craneRuns().flatMap(key)));
  });

  it("keeps every tilt frame inside the grid and non-empty", () => {
    for (const head of CRANE_HEADS.keys()) {
      for (const degrees of HEAD_FRAMES) {
        const runs = headRuns(head, degrees);
        expect(runs.length).toBeGreaterThan(0);
        for (const run of runs) expect(run.x + run.w).toBeLessThanOrEqual(CRANE_GRID.cols);
      }
    }
  });
});
