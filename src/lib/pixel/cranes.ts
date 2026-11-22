import type { CraneRun } from "@/types";

/* Sampled from the 700×700 Łasztownia cranes drawing (crop x 35–668, y 133–546, ground bar
   excluded) at ~5 px per cell: a cell is ink when half its source pixels are dark. */
const CRANE_ROWS = [
  "................................................................................................................................",
  "...............................XXXX.............................................................................................",
  "..............................XXXXXXXXXXX.......................................................................................",
  "..............................X.XXX....XXX......................................................................................",
  ".............................XX.XXXX...XXX......................................................................................",
  ".............................X.XX..XX.XXXX......................................................................................",
  "............................XX.X....XXX.XXX.....................................................................................",
  "...........................XX.XX....XXX.XXX.........................................XX..........................................",
  "...........................XXXX....XXXXXXXXX....................................XXXXXXXXXXXX....................................",
  "..........................XX.XX....XXXXXXXXX................................XXXXXXX.X...XXXXXXXXXX..............................",
  "..........................X..X....XXX..XXXXX..............................XXXXXXXX..X...XX....XXXXXXXX..........................",
  ".........................XX.XX....XXX...XXXXX.............................XXXXXXXXXXX...XX.....X....XXXX........................",
  ".........................XXXX....XXXX....XXXX.............................XX.XXXXXXXXXXXXXX...XX....XX.XX.......................",
  "........................XXXXX....XXX......XXXX....................XXXXXXXXXXXXXXXXXXX..XXXXXXXXXX...X...XXX.....................",
  "........................X.XX....XXXX.......XXX.............XXXXXXXXXXXXXX.XXXX.XXX..XXXXXXXXXXXXXXXXX....XXXX...................",
  ".......................XX.XX...XXXXX.......XXX...........XXXX....XX....X..XXXX..XXXX..XXXXXXXXXXXXXXXXX.XX.XXX..................",
  "......................XX.XX....XX.XX........XXX........XXX.XX....XX....X..XXXX..XXXXX....XXXX......X.XXXX....XXX................",
  "......................XXXX....XXXXX..........XX......XXX...XX....XX....XXXXXXXXXXXXXX......XXXXX..XX...XXX..XX.XXX..............",
  ".....................XXXXX....XXXXX...........XX...XXXXX...XXXXXXXXXXXXXXXXXXXXXXXX.X.........XXXXXX....XXXXXX..XXX.............",
  ".....................XX.X....XXX.XX...........XX.XXXX..XX.XXXXXXXXXXXXXXX.XXXXXX....X...........XXXXX.....XXX....X..............",
  "....................XX.XX....XXXXXX...........XXXXXX...XXXXXX..XXXXXXXXXXXXX........X.............XXXXXXXXXXXX..XX..............",
  "....................XX.X....XXXXXX............XXX.XX..XXXX..X......XXXXXX.XX........X.............XX....XXXXXXXXX...............",
  "...................XXXXX....XXXXXX............XX...XXXXX....XX..XXXXX.....XX........X.............XXXXXXXXXXXXXXX...............",
  "...................X.XX....XXXX.XX............XXX..XXX......XXXXXX........XX........X.............XXXXXXX.....XXX...............",
  "..................XX.XX...XXXX..XX............XXXXXXXXXXXXXXXXX...........XX........X............XXX..........XXXX..............",
  ".................XX.XX....XXXX..X.............X.XXXXXXXXX....XX...........XX........X............XXXX.........XXXXX.............",
  ".................XX.XX...XX.XXXXX.............X.XXX..........XX...........XX........X............XXXX........XXX.XX.............",
  "................XX.XX....X.XX.XXX.............XXXXX..........XXX..........XX........X............X.XX........XX..XX.............",
  "................XXXX....XX.X..XX..............XXX.XX.........XXX..........XX........X............X.XX........XX..X..............",
  "...............XX.XX....X.XX.XXX..............XXX..X.........XXXX.........XX........X............X..X.......XXX..X..............",
  "...............X..X....XX.XXXXXX..............X.XX.XX........XXXX.........XX........X............XXXX.......XXXXXX..............",
  "..............XX.XX....X.XXXX.XX..............X.XX..XX.......XX.X.........XX........X...........XXXXX.......XXX.XX..............",
  "..............X.XX....XX.XXX..X...............X..XX..X........X.XX........XX........X...........XXX.X......XXX..XX..............",
  ".............XXXXX...XXXXXX...X...............X...X..XX.......XXXX........XX........X...........XXX.XX.....XXX..X...............",
  "............XX.XX....XX.XXXXXXX...............X...XX..XX......X.XXX.......XX........X...........XXX.XX.....XXXXXX...............",
  "............X..X....XX..X...XXX...............X....XX.XX......X.XXX.......XXX.......X...........X.XXXX....XXXXXXX...............",
  "...........XX.XX....XX.XX...XX................X....XX..XX.....XXXXX........XX.......X...........X.XXXX....XXXX.XX...............",
  "...........X..X....XX..X...XXX................X.....XX..X.....XXX.XX........XX......X...........X..XXX....XXX..X................",
  "..........XX.XX....X..XX..XXXX................X.....XXX.XX....XXX..X.......XX.......X..........XXXXXXX...XX.X.XXX...............",
  "..........XXXX....XX..XX.XX.XX................X....XXXXXXXX...XXX..XX......XX.......X..........XXXXXXX...XXXXXXXXXX.............",
  ".........XXXXX...XX..XX.XX..X.................X....XX.XXXXX...XX..XXX...............X..........XXXX..XX..XXXX.XX..X.............",
  ".........X..X....XX..XXXX...X.................X....X...XXXXX..XXXXXXX...............X..........X..XX.XX.XXXX..X...X.............",
  "........XX.XX...XX...XXX...XX................XX....XX..XXX.XX.XXXXX.XX..............X..........X...XXXX.XXXXXXXXXXX.............",
  "........X.XX....X...XXX....XX................XX....XXXXXXXX.X..X.XX..X..............X..........X....XXX.XXXXXXXXXXX.............",
  ".......XX.XX...XXXXXXXXXXXXX................XX......XXXXXXXXXX.XXX...XX.............X.........XX....XXXXXXXX.XXX................",
  ".......XXXXXXXXXXXXXXXXXXXXX................XX.........XXXXXXXXXXX...XX.............X.........XX..XXXXXXXX.XX..XX...............",
  ".......XX..XXXXXXXXX......XX.................XX.......XX..X.XXXXXXX...X.............X.........XXXXX...XXX...XXX.XX..............",
  ".......XXX.XXXXXXXXX......XX.........................XXX..XXXXXXXXXXXXXX............X.........XXXXXXXXXXX.....XX.XX.............",
  ".......XXXXX..XX.XXXXX....X........................XXXXX..XX..X.X..XXXXX...........XX.........X...XXXXXX.......XX.XXX...........",
  ".......XXXX....X.XXXXXXXXXX.......................XXX..XXXX...X.XXXX...XX.........XX..........X..XXXXXXX........XXXXXX..........",
  "......XXX.XX...XXXXX..XXXXX.....................XXXXXXXXXXXXXXXXXXXXXXXXX.........XX..........XXXXX..XXX.XXXXXXXXXXXXXXXX.......",
  ".....XXX...XX...XXXXXXXXXX.....................XXXXXXXXXXXXXXXXXXXXXXXXXX..........XX........XXXXXXXXXXXXXXXX........XXXX.......",
  ".....XXXX...X..XXXXXX....X.....................XXXXX.........XXXXXXXXXXXX...........X.........XXX......X.XXXXX.......XXXX.......",
  "....XXXXXXXXXXXXXXXXX...XX.....................XX.XXX......XXX..XXXXXXXX.......................XX.....XXXXX..XX....XXX..X.......",
  "...XXXXXXXXXXXXXXXXXX...XX.....................XX...XX....XXX...XXXX.XX.........................XXXXXXXXXXX...XXX.XX....X.......",
  "...XX..X....XXX...XXXX..XX.....................XX....XXX.XX.....XXXX.XX........................XXXXXXXX..XX....XXXX.....X.......",
  "...XX..X...XX.XX..XXXXXXXXXXX..................XX.....XXXX......X..X.XX........................XX.XX..X..XX....XXXX.....X.......",
  "...XX..X..XX..XX..XXXX.XX..XX..................XX.....XXXX......X..X.XX........................XX..XXXX..XX...XXX.XXX...X.......",
  "...XX..X..X....XX.XXXX.XX...X..................XX...XXX..XXX....X..X.XX........................XX...XXX..XX.XXX.....XX..X.......",
  "...XX..XXXX....XX.XXXXXX....X..................XX..XXX.....XX...X..X.XX........................XX....XX..XXXXX.......XXXX.......",
  "...XX..XXX......XXXXXXXX....X..................XX.XX........XX..X..X.XX........................XX.....X..XXXXXXXXXXXXXXXX.......",
  "...XX..XX.......XXXXXXXX....X..................XXXX..........XXXXXXX.XX........................XXXXXXXXXXXXXXXXXXXXXXXXXX.......",
  "...XX.XX.........XXXXXXX....X..................XXXXXXXXXXXXXXXXXXXXXXXX........................XXXXXXXXXXXX.........X...X.......",
  "...XXXXX.........XXX.XXXXXXXX.....................XX.XX.........XX.XX................................XX..X..........XX..X.......",
  "...XXXXXX........XXX.XXX..........................X..XXXXXXXXXXXXX.XX................................XX..XXXXXXXXXXXXXXXX.......",
  "...XXXXXXXXXXXXXXXXXXXX...........................X..XX.........XX.XX................................X...X..........X..XX.......",
  ".......XXXXX.XXXX.XX..X...........................X..XX.........XX.XX................................X..XX..........X..XX.......",
  ".......XXXX..XXXXXXX..X...........................XXXXX.........XX.XX...............................XXXXXX..........X..XX.......",
  ".......XXXXXXXXXXXXXXXX...........................XXXXXXXXXXXXXXXXXXX.............................XXXXXXXXXXXXXXXXXXXXXX........",
  ".......XXX..XX....XX..XX.............................XXXX......XXX...............................XX.XX..XXX.......XXX..X........",
  ".......XXX..XX...XXX..XX.............................XXXX.....XXXX...............................X..X...XXX.......XXX..XX.......",
  ".......X.XX.XX...XXXX..X............................XX.XX....XX..X..............................XX..X...X.XX.....XX.X..XX.......",
  "......XX..XXX...XX.XX..XX...........................XX.XX....XX..X..............................XX.XX..XX..XX....X..XX..X.......",
  "......XX..XXX..XX..XX..XX...........................X.XXXX..XX...XX.............................X..XX..XX...X...XX...X..XX......",
  "......X....XX..X....X...X...........................X.XX.X..X....XX.............................X..XX..X....XX.XX....X..XX......",
  "......X....XX.XX....X...X..........................XX.XX.XXXX....XX............................XX..X...X.....XXX.....XX..X......",
  ".....XX....XXXXX....XX..XX.........................XXXXXXXXXXXXXXXX............................XX..X...XXXXXXXXXXXXXXXX..XX.....",
  ".....XXXXXXXXXXXXXXXXX..XX.........................X.XX..XXXX.....X............................X..XX..XX....XXXXXX....X...X.....",
  ".....X.....XXXXX....XX...X.........................X.XX.XX..XX....XX...........................X..XX..XX....XX..XX....XX..X.....",
  "....XX....XX...XX....X...X........................XX.X.XX....XX...XX..........................XX..XX..X....XX....XXX...X..XX....",
  "....XX...XXX....XX...X...XX.......................XXXXXX......XX...X..........................XX..X...X..XXX.......XX..X...X....",
  "....X..XXXX......XX..XX...X.......................X.XXX........XX..X..........................X...X..XX.XXX.........XX.XX..XX...",
  "....X.XX..X.......XX.XX...X.......................X.XX.........XXX.X..........................X..XX..XXXX............XXXX..XX...",
  "...XXXX...X........XXXX...XX.....................XXXX...........XX.XX........................XX..XX..XXX..............XXX...X...",
] as const;

export const CRANE_GRID = { cols: CRANE_ROWS[0].length, rows: CRANE_ROWS.length } as const;

type Box = { x0: number; x1: number; y0: number; y1: number };
/** anchor: joint cells that also stay drawn on the body, so a tilted head never splits from its tower */
type CraneHead = { pivot: readonly [x: number, y: number]; boxes: readonly Box[]; anchor: Box };

/** Boom, jib and hook of each crane; a cell belongs to the first head whose boxes hold it. */
export const CRANE_HEADS: readonly CraneHead[] = [
  { pivot: [16, 44], boxes: [{ x0: 0, x1: 45, y0: 0, y1: 43 }, { x0: 44, x1: 47, y0: 13, y1: 19 }, { x0: 44, x1: 46, y0: 20, y1: 46 }], anchor: { x0: 0, x1: 30, y0: 40, y1: 43 } },
  { pivot: [50, 22], boxes: [{ x0: 47, x1: 76, y0: 8, y1: 25 }, { x0: 74, x1: 77, y0: 26, y1: 39 }], anchor: { x0: 46, x1: 64, y0: 21, y1: 25 } },
  { pivot: [110, 28], boxes: [{ x0: 77, x1: 122, y0: 0, y1: 30 }, { x0: 82, x1: 85, y0: 31, y1: 52 }], anchor: { x0: 92, x1: 120, y0: 26, y1: 30 } },
];

/** Tilt of each animation frame, in degrees: a ping-pong swing. */
export const HEAD_FRAMES = [0, 1.5, 3, 4, 3, 1.5, 0, -1.5, -3, -4, -3, -1.5] as const;

const ink = (x: number, y: number): boolean => CRANE_ROWS[y]?.[x] === "X";

const inBox = (b: Box, x: number, y: number): boolean => x >= b.x0 && x <= b.x1 && y >= b.y0 && y <= b.y1;

const headOf = (x: number, y: number): number => CRANE_HEADS.findIndex((head) => head.boxes.some((b) => inBox(b, x, y)));

const onBody = (x: number, y: number): boolean => {
  const head = headOf(x, y);
  return head === -1 || inBox(CRANE_HEADS[head].anchor, x, y);
};

function toRuns(cells: Set<number>): CraneRun[] {
  const { cols, rows } = CRANE_GRID;
  const runs: CraneRun[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (!cells.has(y * cols + x)) continue;
      let w = 1;
      while (x + w < cols && cells.has(y * cols + x + w)) w++;
      runs.push({ x, y, w });
      x += w;
    }
  }
  return runs;
}

/** Every inked cell, or only the static body (heads cut out, their anchors kept). */
export function craneRuns(part: "all" | "body" = "all"): CraneRun[] {
  const cells = new Set<number>();
  CRANE_ROWS.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      if (ink(x, y) && (part === "all" || onBody(x, y))) cells.add(y * CRANE_GRID.cols + x);
    }
  });
  return toRuns(cells);
}

/** A head tilted about its pivot, re-rasterised so the frame stays on the cell grid:
    each target cell samples the nearest source cell (no holes, no anti-aliasing). */
export function headRuns(head: number, degrees: number): CraneRun[] {
  const { cols, rows } = CRANE_GRID;
  const [px, py] = CRANE_HEADS[head].pivot;
  const cos = Math.cos((degrees * Math.PI) / 180);
  const sin = Math.sin((degrees * Math.PI) / 180);
  const cells = new Set<number>();
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const dx = x - px;
      const dy = y - py;
      const sx = Math.round(px + dx * cos + dy * sin);
      const sy = Math.round(py - dx * sin + dy * cos);
      if (ink(sx, sy) && headOf(sx, sy) === head) cells.add(y * cols + x);
    }
  }
  return toRuns(cells);
}
