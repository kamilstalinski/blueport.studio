// Renders out/html/*.html to PNG after the web fonts have loaded. Usage: node render.mjs <jobs.json>
import fs from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(new URL("../../package.json", import.meta.url));
const { chromium } = require("@playwright/test");
const jobs = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const browser = await chromium.launch({ channel: "chrome" });
for (const j of jobs) {
  const page = await browser.newPage({ viewport: { width: j.w, height: j.h } });
  await page.goto("file://" + j.html, { waitUntil: "networkidle" });
  await page.evaluate(() => Promise.all(['400 40px "Host Grotesk"', '500 40px "Host Grotesk"', '40px "Martian Mono"'].map((f) => document.fonts.load(f))));
  await page.evaluate(() => document.fonts.ready);
  const ok = await page.evaluate(() => document.fonts.check('500 40px "Host Grotesk"') && document.fonts.check('40px "Martian Mono"'));
  if (!ok) throw new Error("fonts missing in " + j.html);
  await page.screenshot({ path: j.png });
  await page.close();
  console.log(j.png.split("/").slice(-2).join("/"), `${j.w}×${j.h}`);
}
await browser.close();
