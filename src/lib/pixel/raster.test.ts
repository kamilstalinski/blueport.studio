import { describe, expect, it } from "vitest";
import { cellsToPath, numberCells, rowsToCells, stackCells, tileRows, wordCells } from "@/lib/pixel/raster";

describe("rowsToCells", () => {
  it("returns inked cells shifted by the offset", () => {
    expect(rowsToCells(["X.", ".X"], 3, 1)).toEqual([[3, 1], [4, 2]]);
  });
});

describe("cellsToPath", () => {
  it("draws one unit square per cell", () => {
    expect(cellsToPath([[1, 2]])).toBe("M1 2h1v1h-1z");
  });
});

describe("wordCells", () => {
  it("measures blueport at 42 columns", () => {
    expect(wordCells("blueport").width).toBe(42);
  });

  it("rejects a character without a glyph", () => {
    expect(() => wordCells("x")).toThrow('No pixel glyph for "x"');
  });
});

describe("stackCells", () => {
  const stack = stackCells("blueport", "studio");
  const xs = stack.bottom.map(([x]) => x);
  const ys = stack.bottom.map(([, y]) => y);

  it("tracks the second line out to the width of the first", () => {
    expect(Math.min(...xs)).toBe(0);
    expect(Math.max(...xs)).toBe(stack.width - 1);
  });

  it("places the second line below the descender", () => {
    expect(Math.min(...ys)).toBe(10);
    expect(Math.max(...ys)).toBe(16);
    expect(stack.height).toBe(17);
  });
});

describe("tileRows", () => {
  it("knocks the digit out of a 9×9 tile with the stepped corner", () => {
    const rows = tileRows("1");
    expect(rows).toHaveLength(9);
    expect(rows[0]).toBe("XXXXXXX..");
    expect(rows[1]).toBe("XXXX.XXX.");
  });
});

describe("numberCells", () => {
  it("draws digits in ink and symbols in the accent layer", () => {
    const cells = numberCells("10+");
    expect(cells.width).toBe(17);
    expect(cells.height).toBe(7);
    expect(Math.max(...cells.ink.map(([x]) => x))).toBeLessThanOrEqual(10);
    expect(Math.min(...cells.accent.map(([x]) => x))).toBe(12);
    expect(Math.max(...cells.accent.map(([x]) => x))).toBe(16);
  });

  it("keeps the space as an empty two-column gap", () => {
    expect(numberCells("24 h").width).toBe(20);
  });

  it("rejects a character without a numeral", () => {
    expect(() => numberCells("x")).toThrow('No pixel numeral for "x"');
  });
});
