import type { CraneRun } from "@/types";

export const CRANE_GRID = { cols: 128, rows: 59 } as const;

type Point = readonly [x: number, y: number];

/* The cranes were traced in the pixel coordinates of a 700×700 reference drawing
   of the Łasztownia cranes, then mapped onto the cell grid. */
const GROUND_Y = 548;
const toCol = (x: number): number => 4 + (x - 35) * 0.163;
const toRow = (y: number): number => (y - 135) * 0.1415;

export function craneRuns(): CraneRun[] {
  const { cols, rows } = CRANE_GRID;
  const grid = Array.from({ length: rows }, () => new Uint8Array(cols));

  const put = (x: number, y: number): void => {
    if (x >= 0 && x < cols && y >= 0 && y < rows) grid[y][x] = 1;
  };

  const cellLine = (fromX: number, fromY: number, toX: number, toY: number): void => {
    let x = Math.round(fromX);
    let y = Math.round(fromY);
    const endX = Math.round(toX);
    const endY = Math.round(toY);
    const dx = Math.abs(endX - x);
    const dy = -Math.abs(endY - y);
    const stepX = x < endX ? 1 : -1;
    const stepY = y < endY ? 1 : -1;
    let error = dx + dy;
    for (;;) {
      put(x, y);
      if (x === endX && y === endY) break;
      const doubled = 2 * error;
      if (doubled >= dy) { error += dy; x += stepX; }
      if (doubled <= dx) { error += dx; y += stepY; }
    }
  };

  const line = (x0: number, y0: number, x1: number, y1: number): void =>
    cellLine(toCol(x0), toRow(y0), toCol(x1), toRow(y1));

  const box = (x0: number, y0: number, x1: number, y1: number, withCross: boolean): void => {
    line(x0, y0, x1, y0);
    line(x1, y0, x1, y1);
    line(x1, y1, x0, y1);
    line(x0, y1, x0, y0);
    if (withCross) {
      line(x0, y0, x1, y1);
      line(x1, y0, x0, y1);
    }
  };

  const along = (from: Point, to: Point, t: number): Point => [from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t];

  /* two chords joined by rungs, optionally with zigzag diagonals */
  const truss = (a0: Point, a1: Point, b0: Point, b1: Point, rungs: number, zigzag: boolean): void => {
    line(...a0, ...a1);
    line(...b0, ...b1);
    for (let i = 0; i <= rungs; i++) {
      const t = i / rungs;
      line(...along(a0, a1, t), ...along(b0, b1, t));
      if (zigzag && i < rungs) line(...along(a0, a1, t), ...along(b0, b1, (i + 1) / rungs));
    }
  };

  const hook = (x: number, fromY: number, toY: number): void => {
    line(x, fromY, x, toY);
    const cx = Math.round(toCol(x));
    const cy = Math.round(toRow(toY));
    put(cx, cy + 1);
    put(cx - 1, cy + 2);
    put(cx - 2, cy + 2);
    put(cx - 3, cy + 1);
  };

  /* splayed legs, a waist bar and one tall cross */
  const portal = (leftFoot: number, rightFoot: number, leftTop: number, rightTop: number, top: number): void => {
    const waist = (top + GROUND_Y) / 2;
    const leftWaist = (leftFoot + leftTop) / 2;
    const rightWaist = (rightFoot + rightTop) / 2;
    line(leftFoot, GROUND_Y, leftTop, top);
    line(rightFoot, GROUND_Y, rightTop, top);
    line(leftTop, top, rightTop, top);
    line(leftWaist, waist, rightWaist, waist);
    line(leftTop, top, rightFoot - 4, GROUND_Y);
    line(rightTop, top, leftFoot + 4, GROUND_Y);
  };

  // crane 1: tall luffing boom with a short knuckle jib
  portal(60, 170, 95, 140, 455);
  box(55, 395, 125, 450, true);
  box(125, 408, 175, 450, false);
  truss([72, 395], [190, 140], [128, 395], [232, 150], 6, true);
  truss([190, 140], [258, 228], [232, 150], [272, 222], 2, false);
  hook(264, 228, 345);

  // crane 2: leaning A-frame tower, jib rising to the right
  portal(285, 372, 305, 352, 460);
  box(270, 380, 345, 440, true);
  box(345, 395, 385, 440, false);
  box(290, 325, 312, 352, false);
  truss([270, 245], [300, 380], [320, 215], [380, 385], 3, true);
  truss([268, 228], [438, 180], [276, 252], [442, 204], 5, true);
  hook(405, 196, 315);

  // crane 3: arched boom reaching back over crane 2, narrow tower
  portal(500, 652, 528, 612, 460);
  box(560, 380, 632, 440, true);
  box(505, 400, 560, 440, false);
  truss([515, 385], [522, 228], [560, 385], [600, 245], 3, true);
  line(600, 245, 590, 385);
  truss([405, 178], [468, 166], [412, 200], [470, 190], 1, true);
  truss([468, 166], [565, 188], [470, 190], [550, 212], 3, true);
  truss([565, 188], [605, 238], [550, 212], [585, 248], 1, true);
  hook(450, 196, 375);

  const runs: CraneRun[] = [];
  grid.forEach((row, y) => {
    let x = 0;
    while (x < cols) {
      if (!row[x]) { x++; continue; }
      let end = x;
      while (end + 1 < cols && row[end + 1]) end++;
      runs.push({ x, y, w: end - x + 1 });
      x = end + 1;
    }
  });
  return runs;
}
