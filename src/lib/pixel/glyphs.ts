/** 5×9 pixel face, 7×7 and 9×9 icons, 5×7 digits. Copied from public/_redesign/index.html. */
export const PX_GLYPHS = {
  b: ["X....", "X....", "XXXX.", "X...X", "X...X", "X...X", "XXXX.", ".....", "....."],
  l: ["X.", "X.", "X.", "X.", "X.", "X.", ".X", "..", ".."],
  u: [".....", ".....", "X...X", "X...X", "X...X", "X..XX", ".XX.X", ".....", "....."],
  e: [".....", ".....", ".XXX.", "X...X", "XXXXX", "X....", ".XXXX", ".....", "....."],
  p: [".....", ".....", "XXXX.", "X...X", "X...X", "X...X", "XXXX.", "X....", "X...."],
  o: [".....", ".....", ".XXX.", "X...X", "X...X", "X...X", ".XXX.", ".....", "....."],
  r: ["....", "....", "X.XX", "XX..", "X...", "X...", "X...", "....", "...."],
  t: ["....", ".X..", "XXX.", ".X..", ".X..", ".X..", "..XX", "....", "...."],
  s: [".....", ".....", ".XXXX", "X....", ".XXX.", "....X", "XXXX.", ".....", "....."],
  d: ["....X", "....X", ".XXXX", "X...X", "X...X", "X...X", ".XXXX", ".....", "....."],
  i: ["X.", "..", "X.", "X.", "X.", "X.", ".X", "..", ".."],
} as const;

export const PX_ICONS = {
  "arrow-right": ["...X...", "....X..", ".....X.", "XXXXXXX", ".....X.", "....X..", "...X..."],
  lock: ["..XXX..", ".X...X.", ".X...X.", "XXXXXXX", "XXX.XXX", "XXX.XXX", "XXXXXXX"],
  list: [".........", "XXXXXXXXX", ".........", ".........", "XXXXXXXXX", ".........", ".........", "XXXXXXXXX", "........."],
} as const;

export const PX_DIGITS = {
  "1": ["..X..", ".XX..", "..X..", "..X..", "..X..", "..X..", ".XXX."],
  "2": [".XXX.", "X...X", "....X", "...X.", "..X..", ".X...", "XXXXX"],
  "3": ["XXXX.", "....X", "....X", ".XXX.", "....X", "....X", "XXXX."],
  "4": ["...X.", "..XX.", ".X.X.", "X..X.", "XXXXX", "...X.", "...X."],
} as const;

export type GlyphChar = keyof typeof PX_GLYPHS;
export type PixelIconName = keyof typeof PX_ICONS;
export type TileDigit = keyof typeof PX_DIGITS;
