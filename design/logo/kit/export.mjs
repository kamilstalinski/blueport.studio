// Exports every svg/*.svg to png/<name>.png (transparent, 2400 px on the long side; symbols 1024) and pdf/<name>.pdf (vector, for print).
// Run after build_kit.py:  node export.mjs
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
const here = path.dirname(new URL(import.meta.url).pathname);
const require = createRequire(path.join(here, "../../../package.json"));
const { chromium } = require("@playwright/test");
for (const d of ["png", "pdf"]) fs.mkdirSync(path.join(here, d), { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage();
for (const file of fs.readdirSync(path.join(here, "svg")).filter((f) => f.endsWith(".svg")).sort()) {
  const name = file.replace(/\.svg$/, "");
  const svg = fs.readFileSync(path.join(here, "svg", file), "utf8");
  const [, w, h] = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/).map(Number);
  const long = /^(symbol|favicon|app-icon)/.test(name) ? 1024 : 2400;
  const k = long / Math.max(w, h);
  const W = Math.round(w * k), H = Math.round(h * k);
  const body = svg.replace(/width="[\d.]+" height="[\d.]+"/, `width="${W}" height="${H}"`);
  await page.setViewportSize({ width: W, height: H });
  await page.setContent(`<style>html,body{margin:0;background:transparent}svg{display:block}</style>${body}`);
  await page.screenshot({ path: path.join(here, "png", `${name}.png`), omitBackground: true });
  await page.setContent(`<style>@page{size:${w}px ${h}px;margin:0}html,body{margin:0}svg{display:block}</style>${svg}`);
  await page.pdf({ path: path.join(here, "pdf", `${name}.pdf`), width: `${w}px`, height: `${h}px`, printBackground: true, pageRanges: "1" });
  console.log(name, `${W}×${H}`);
}
await browser.close();
