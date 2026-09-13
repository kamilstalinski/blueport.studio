import type { TrailCell, TrailGrid, TrailRect } from "@/types";

export const TRAIL_CELL = 16;
export const TRAIL_LIFE_MS = 900;

const KEEP_OUT_PADDING = 16;
const NEIGHBOUR_CHANCE = 0.5;
const NEIGHBOUR_LIFE = 0.7;
const AMBIENT_LIFE = 0.6;
const AMBIENT_ACCENT_CHANCE = 0.2;

export function createTrailGrid(width: number, height: number, keepOut: readonly TrailRect[]): TrailGrid {
  const cols = Math.ceil(width / TRAIL_CELL);
  const rows = Math.ceil(height / TRAIL_CELL);
  const blocked = new Uint8Array(cols * rows);
  for (const rect of keepOut) {
    const x0 = Math.max(0, Math.floor((rect.left - KEEP_OUT_PADDING) / TRAIL_CELL));
    const x1 = Math.min(cols, Math.ceil((rect.right + KEEP_OUT_PADDING) / TRAIL_CELL));
    const y0 = Math.max(0, Math.floor((rect.top - KEEP_OUT_PADDING) / TRAIL_CELL));
    const y1 = Math.min(rows, Math.ceil((rect.bottom + KEEP_OUT_PADDING) / TRAIL_CELL));
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) blocked[y * cols + x] = 1;
    }
  }
  return { cols, rows, blocked };
}

export function isOpenCell(grid: TrailGrid, x: number, y: number): boolean {
  return x >= 0 && y >= 0 && x < grid.cols && y < grid.rows && grid.blocked[y * grid.cols + x] === 0;
}

function withCell(cells: readonly TrailCell[], next: TrailCell): TrailCell[] {
  return [...cells.filter((cell) => cell.x !== next.x || cell.y !== next.y), next];
}

export function addPointer(
  cells: readonly TrailCell[],
  grid: TrailGrid,
  px: number,
  py: number,
  random: () => number,
): TrailCell[] {
  const x = Math.floor(px / TRAIL_CELL);
  const y = Math.floor(py / TRAIL_CELL);
  if (!isOpenCell(grid, x, y)) return [...cells];

  let next = withCell(cells, { x, y, life: 1, accent: true });
  if (random() < NEIGHBOUR_CHANCE) {
    const nx = x + (random() < 0.5 ? -1 : 1);
    const ny = y + (random() < 0.5 ? -1 : 1);
    if (isOpenCell(grid, nx, ny)) next = withCell(next, { x: nx, y: ny, life: NEIGHBOUR_LIFE, accent: false });
  }
  return next;
}

export function addAmbient(cells: readonly TrailCell[], grid: TrailGrid, random: () => number): TrailCell[] {
  const x = Math.floor(random() * grid.cols);
  const y = Math.floor(random() * grid.rows);
  if (!isOpenCell(grid, x, y)) return [...cells];
  return withCell(cells, { x, y, life: AMBIENT_LIFE, accent: random() < AMBIENT_ACCENT_CHANCE });
}

export function stepTrail(cells: readonly TrailCell[], elapsedMs: number): TrailCell[] {
  const decay = elapsedMs / TRAIL_LIFE_MS;
  return cells.map((cell) => ({ ...cell, life: cell.life - decay })).filter((cell) => cell.life > 0);
}
