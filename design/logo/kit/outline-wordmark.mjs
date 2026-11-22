// Outlines "blueport" (Host Grotesk 600) and "studio" (Host Grotesk 400) into wordmark.json for build_kit.py.
// Host Grotesk is SIL OFL (Fontsource). Run from a folder that has the two packages installed:
//   npm i opentype.js@1.3.4 @fontsource/host-grotesk@5 && node <this file> <path to node_modules> <out json>
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const [, , modules, out] = process.argv;
const require = createRequire(path.join(modules, "noop.js"));
const opentype = require("opentype.js");
const files = path.join(modules, "@fontsource/host-grotesk/files");
const load = (w) => {
  const b = fs.readFileSync(path.join(files, `host-grotesk-latin-${w}-normal.woff`));
  return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
};

const SIZE = 100; // units per em in the output
const round = (d) => d.replace(/-?\d+\.\d+/g, (m) => String(+(+m).toFixed(2)));

function word(font, text, track, x0 = 0) {
  let pen = x0;
  const parts = [];
  const glyphs = font.stringToGlyphs(text);
  glyphs.forEach((g, i) => {
    parts.push(g.getPath(pen, 0, SIZE).toPathData(2));
    pen += (g.advanceWidth * SIZE) / font.unitsPerEm + track * SIZE;
    if (i < glyphs.length - 1) pen += (font.getKerningValue(g, glyphs[i + 1]) * SIZE) / font.unitsPerEm;
  });
  return { d: round(parts.join("")), width: +(pen - x0 - track * SIZE).toFixed(2) };
}

const bold = load(600);
const regular = load(400);

/* ink bounds of a word set with a given tracking (side bearings excluded) */
function ink(font, text, track) {
  let pen = 0;
  const path = new opentype.Path();
  const glyphs = font.stringToGlyphs(text);
  glyphs.forEach((g, i) => {
    path.extend(g.getPath(pen, 0, SIZE));
    pen += (g.advanceWidth * SIZE) / font.unitsPerEm + track * SIZE;
    if (i < glyphs.length - 1) pen += (font.getKerningValue(g, glyphs[i + 1]) * SIZE) / font.unitsPerEm;
  });
  return path.getBoundingBox();
}

/* "studio" is tracked out so its ink runs exactly from the left edge of the b to the right edge of the t */
const BP_TRACK = -0.02;
const bpInk = ink(bold, "blueport", BP_TRACK);
const st0 = ink(regular, "studio", 0);
const ST_TRACK = (bpInk.x2 - bpInk.x1 - (st0.x2 - st0.x1)) / (5 * SIZE);
const stInk = ink(regular, "studio", ST_TRACK);
const metrics = (f) => ({
  xHeight: +((f.tables.os2.sxHeight / f.unitsPerEm) * SIZE).toFixed(2),
  ascender: +((f.tables.os2.sTypoAscender / f.unitsPerEm) * SIZE).toFixed(2),
  descender: +((f.tables.os2.sTypoDescender / f.unitsPerEm) * SIZE).toFixed(2),
});
const data = {
  size: SIZE,
  // both words start with their ink at x = 0, so the two lines share a left and a right edge
  blueport: { ...word(bold, "blueport", BP_TRACK, -bpInk.x1), ...metrics(bold), inkWidth: +(bpInk.x2 - bpInk.x1).toFixed(2) },
  studio: { ...word(regular, "studio", ST_TRACK, -stInk.x1), ...metrics(regular), track: +ST_TRACK.toFixed(4), inkWidth: +(stInk.x2 - stInk.x1).toFixed(2) },
  // the one-line lockup keeps "studio" at its normal spacing
  studioLine: { ...word(regular, "studio", -0.01), ...metrics(regular) },
  space: +((regular.charToGlyph(" ").advanceWidth / regular.unitsPerEm) * SIZE).toFixed(2),
};
fs.writeFileSync(out, JSON.stringify(data, null, 1));
console.log("wrote", out, data.blueport.width, data.studio.width, data.blueport.xHeight);
