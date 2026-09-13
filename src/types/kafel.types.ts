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

export type CraneRun = { x: number; y: number; w: number };

export type TrailRect = { left: number; top: number; right: number; bottom: number };

export type TrailGrid = { cols: number; rows: number; blocked: Uint8Array };

export type TrailCell = { x: number; y: number; life: number; accent: boolean };

export type BuildStage = 0 | 1 | 2 | 3;

export type BuildFrame = { at: number; stage: BuildStage; wiresOn: number; barsOn: number };

export type BuildCycle = BuildFrame & { site: number };
