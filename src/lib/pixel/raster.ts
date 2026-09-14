import { PX_DIGITS, PX_GLYPHS, type GlyphChar, type NumberChar, type TileDigit } from "@/lib/pixel/glyphs";
import type { Cell, NumberCells, StackCells } from "@/types";

const INK = "X";
const GAP = 1;
/** glyph rows 0-6 carry the letter body; rows 7-8 are the descender */
const ROWS_WITHOUT_DESCENDER = 7;
const STACK_LINE_OFFSET = 10;
const STACK_HEIGHT = 17;
const TILE_SIZE = 9;
const NUMBER_HEIGHT = 7;
const TILE_DIGIT_OFFSET = { x: 2, y: 1 } as const;
const TILE_CORNER = new Set(["7,0", "8,0", "8,1"]);

function isGlyphChar(char: string): char is GlyphChar {
  return Object.hasOwn(PX_GLYPHS, char);
}

function glyph(char: string): readonly string[] {
  if (!isGlyphChar(char)) throw new Error(`No pixel glyph for "${char}"`);
  return PX_GLYPHS[char];
}

export function rowsToCells(rows: readonly string[], ox = 0, oy = 0): Cell[] {
  const cells: Cell[] = [];
  rows.forEach((row, y) => {
    [...row].forEach((value, x) => {
      if (value === INK) cells.push([x + ox, y + oy]);
    });
  });
  return cells;
}

export function cellsToPath(cells: readonly Cell[]): string {
  return cells.map(([x, y]) => `M${x} ${y}h1v1h-1z`).join("");
}

export function wordCells(text: string): { cells: Cell[]; width: number } {
  const cells: Cell[] = [];
  let col = 0;
  for (const char of text) {
    const rows = glyph(char);
    cells.push(...rowsToCells(rows, col, 0));
    col += rows[0].length + GAP;
  }
  return { cells, width: col - GAP };
}

/** Second line is tracked out so both lines start and end together; leftover pixels go to the middle gaps. */
export function stackCells(top: string, bottom: string): StackCells {
  const { cells: topCells, width } = wordCells(top);
  const glyphs = [...bottom].map(glyph);
  const gaps = glyphs.length - 1;
  if (gaps < 1) throw new Error("The second line needs at least two characters");

  const inked = glyphs.reduce((sum, rows) => sum + rows[0].length, 0);
  const spare = width - inked;
  const base = Math.floor(spare / gaps);
  const extra = spare - base * gaps;
  const firstWideGap = Math.floor((gaps - extra) / 2);

  const bottomCells: Cell[] = [];
  let col = 0;
  glyphs.forEach((rows, index) => {
    bottomCells.push(...rowsToCells(rows.slice(0, ROWS_WITHOUT_DESCENDER), col, STACK_LINE_OFFSET));
    const isWideGap = index >= firstWideGap && index < firstWideGap + extra;
    col += rows[0].length + base + (isWideGap ? 1 : 0);
  });

  return { top: topCells, bottom: bottomCells, width, height: STACK_HEIGHT };
}

export function tileRows(digit: TileDigit): string[] {
  const knocked = new Set(
    rowsToCells(PX_DIGITS[digit], TILE_DIGIT_OFFSET.x, TILE_DIGIT_OFFSET.y).map(([x, y]) => `${x},${y}`),
  );
  return Array.from({ length: TILE_SIZE }, (_, y) =>
    Array.from({ length: TILE_SIZE }, (_, x) => {
      const key = `${x},${y}`;
      return TILE_CORNER.has(key) || knocked.has(key) ? "." : INK;
    }).join(""),
  );
}

function isNumberChar(char: string): char is NumberChar {
  return Object.hasOwn(PX_DIGITS, char);
}

/** Pixel numerals: digits go to the ink layer, symbols (+, -, h) to the accent layer. */
export function numberCells(text: string): NumberCells {
  const ink: Cell[] = [];
  const accent: Cell[] = [];
  let col = 0;
  for (const char of text) {
    if (!isNumberChar(char)) throw new Error(`No pixel numeral for "${char}"`);
    const rows = PX_DIGITS[char];
    const layer = /[0-9]/.test(char) ? ink : accent;
    layer.push(...rowsToCells(rows, col, 0));
    col += rows[0].length + GAP;
  }
  return { ink, accent, width: Math.max(0, col - GAP), height: NUMBER_HEIGHT };
}
