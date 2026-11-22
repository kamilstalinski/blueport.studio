import { describe, expect, it } from "vitest";
import { PANORAMA_GRID, panoramaRuns, windowCells } from "@/lib/pixel/panorama";

describe("panoramaRuns", () => {
  it("decodes every row to the full grid width (the module throws otherwise)", () => {
    expect(PANORAMA_GRID).toEqual({ cols: 512, rows: 141 });
  });

  it("puts the museum flagpole on the top row and fills the bottom row edge to edge", () => {
    const lit = panoramaRuns("X");
    const shade = panoramaRuns("o");
    expect(lit.filter((run) => run.y === 0)).toEqual([{ x: 113, y: 0, w: 1 }]);
    const bottom = [...lit, ...shade].filter((run) => run.y === PANORAMA_GRID.rows - 1);
    expect(bottom.reduce((sum, run) => sum + run.w, 0)).toBe(PANORAMA_GRID.cols);
  });
});

describe("windowCells", () => {
  it("lights a sparse, stable set of windows inside the buildings, in all four groups", () => {
    const windows = windowCells();
    expect(windows.length).toBeGreaterThan(40);
    expect(windows.length).toBeLessThan(120);
    expect(new Set(windows.map((cell) => cell.group))).toEqual(new Set([0, 1, 2, 3]));
    const shade = new Set(panoramaRuns("o").flatMap((run) => Array.from({ length: run.w }, (_, i) => `${run.x + i},${run.y}`)));
    for (const cell of windows) expect(shade.has(`${cell.x},${cell.y}`)).toBe(true);
  });
});
