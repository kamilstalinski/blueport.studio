import { describe, expect, it } from "vitest";
import {
  BUBBLE_ROWS,
  bitsPath,
  mirrorRows,
  PLUS_ROWS,
  TETRO_COLS,
  TETRO_FALLING,
  TETRO_REST,
  TETRO_ROWS,
  TETRO_TONES,
  tetroPath,
} from "@/lib/pixel/deco";

describe("bitsPath", () => {
  it("draws one square per inked cell", () => {
    expect(bitsPath(["X.", ".X"], 10)).toBe("M0 0h10v10h-10zM10 10h10v10h-10z");
  });

  it("insets each square by half the gap", () => {
    expect(bitsPath(["X"], 10, 2)).toBe("M1 1h8v8h-8z");
  });

  it("draws the plus power-up from its 5×5 sprite", () => {
    expect(bitsPath(PLUS_ROWS, 6).startsWith("M12 0h6v6h-6z")).toBe(true);
  });
});

describe("mirrorRows", () => {
  it("flips every row horizontally", () => {
    expect(mirrorRows(["XX..", ".X.X"])).toEqual(["..XX", "X.X."]);
    expect(mirrorRows(BUBBLE_ROWS)).toHaveLength(BUBBLE_ROWS.length);
  });
});

describe("tetromino stack", () => {
  const all = [...TETRO_REST.flat(), ...TETRO_FALLING];

  it("uses four-cell pieces inside the 9×8 board without overlaps", () => {
    for (const piece of [...TETRO_REST, TETRO_FALLING]) expect(piece).toHaveLength(4);
    for (const [x, y] of all) {
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThan(TETRO_COLS);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThan(TETRO_ROWS);
    }
    expect(new Set(all.map(([x, y]) => `${x},${y}`)).size).toBe(all.length);
    expect(TETRO_TONES).toHaveLength(TETRO_REST.length);
  });

  it("draws cells 26px apart with a 3px gap", () => {
    expect(tetroPath([[0, 0]])).toBe("M1.5 1.5h23v23h-23z");
  });
});
