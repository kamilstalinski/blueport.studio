export type Cell = readonly [x: number, y: number];

export type StackCells = {
  top: Cell[];
  bottom: Cell[];
  width: number;
  height: number;
};

export type MarkTone = "t1" | "t2";

export type MarkModule = { x: number; y: number; w: number; h: number; tone: MarkTone };

export type ModularMark = { cols: number; rows: number; modules: readonly MarkModule[] };

export type MarkRect = { x: number; y: number; width: number; height: number; tone: MarkTone };
