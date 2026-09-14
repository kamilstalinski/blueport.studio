import type { Cell } from "@/types";

const INK = "X";

export function bitsPath(rows: readonly string[], cell: number, gap = 0): string {
  const size = cell - gap;
  const parts: string[] = [];
  rows.forEach((row, y) => {
    [...row].forEach((value, x) => {
      if (value === INK) parts.push(`M${x * cell + gap / 2} ${y * cell + gap / 2}h${size}v${size}h-${size}z`);
    });
  });
  return parts.join("");
}

export function mirrorRows(rows: readonly string[]): string[] {
  return rows.map((row) => [...row].reverse().join(""));
}

/* Building blocks for the structure section: a settled stack and one piece that lands on arrival. */
export const TETRO_CELL = 26;
export const TETRO_GAP = 3;
export const TETRO_COLS = 9;
export const TETRO_ROWS = 8;

export const TETRO_REST: readonly (readonly Cell[])[] = [
  [[0, 7], [1, 7], [2, 7], [3, 7]],
  [[4, 6], [5, 6], [4, 7], [5, 7]],
  [[6, 7], [7, 7], [8, 7], [8, 6]],
  [[1, 6], [2, 6], [3, 6], [2, 5]],
  [[6, 6], [7, 6], [7, 5], [8, 5]],
  [[0, 4], [0, 5], [0, 6], [1, 4]],
];
export const TETRO_TONES: readonly number[] = [0.09, 0.06, 0.08, 0.05, 0.07, 0.06];
export const TETRO_FALLING: readonly Cell[] = [[4, 4], [5, 4], [5, 5], [6, 5]];

export function tetroPath(cells: readonly Cell[]): string {
  const size = TETRO_CELL - TETRO_GAP;
  return cells
    .map(([x, y]) => `M${x * TETRO_CELL + TETRO_GAP / 2} ${y * TETRO_CELL + TETRO_GAP / 2}h${size}v${size}h-${size}z`)
    .join("");
}

/* Voices: a pixel speech bubble, 16×10 cells. */
export const BUBBLE_ROWS: readonly string[] = [
  "..XXXXXXXXXXXX..",
  ".X............X.",
  "X..............X",
  "X..XXXXX.XXX...X",
  "X..............X",
  "X..XXXXXXX.....X",
  ".X............X.",
  "..XX.XXXXXXXXX..",
  "...X.X..........",
  "...XX...........",
];

/* Power-up around the call to action. */
export const PLUS_ROWS: readonly string[] = ["..X..", "..X..", "XXXXX", "..X..", "..X.."];
