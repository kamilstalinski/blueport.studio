export type Cell = readonly [x: number, y: number];

export type StackCells = {
  top: Cell[];
  bottom: Cell[];
  width: number;
  height: number;
};
