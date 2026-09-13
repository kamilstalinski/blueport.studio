import type { MarkRect, ModularMark } from "@/types";

const MARK_CELL = 100;
const MARK_GAP = 16;
export const MARK_RADIUS = 9;

/** "Róg": three square modules and a small accent module in the open corner. */
export const ROG_MARK: ModularMark = {
  cols: 2,
  rows: 2,
  modules: [
    { x: 0, y: 0, w: 1, h: 1, tone: "t1" },
    { x: 0, y: 1, w: 1, h: 1, tone: "t1" },
    { x: 1, y: 1, w: 1, h: 1, tone: "t1" },
    { x: 1.5, y: 0, w: 0.5, h: 0.5, tone: "t2" },
  ],
};

export function markRects(mark: ModularMark): MarkRect[] {
  return mark.modules.map(({ x, y, w, h, tone }) => ({
    x: x * MARK_CELL + MARK_GAP / 2,
    y: y * MARK_CELL + MARK_GAP / 2,
    width: w * MARK_CELL - MARK_GAP,
    height: h * MARK_CELL - MARK_GAP,
    tone,
  }));
}

export function markViewBox(mark: ModularMark): string {
  return `0 0 ${mark.cols * MARK_CELL} ${mark.rows * MARK_CELL}`;
}
