import { describe, expect, it } from "vitest";
import { craneRuns, CRANE_GRID } from "@/lib/pixel/cranes";

const cells = craneRuns().flatMap((run) => Array.from({ length: run.w }, (_, i) => ({ x: run.x + i, y: run.y })));

describe("craneRuns", () => {
  it("stays inside the 128×59 grid", () => {
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
    expect(ground.some((x) => x >= 8 && x <= 26)).toBe(true);
    expect(ground.some((x) => x >= 44 && x <= 59)).toBe(true);
    expect(ground.some((x) => x >= 79 && x <= 105)).toBe(true);
  });

  it("raises the luffing boom to the top of the grid", () => {
    expect(Math.min(...cells.map((cell) => cell.y))).toBeLessThanOrEqual(2);
  });
});
