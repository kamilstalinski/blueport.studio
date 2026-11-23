// Captures a client site for the portfolio and reads its real first-screen layout for the hero build.
//
//   node scripts/capture-work.mjs <slug> <url> [--image public/work/<file>.webp] [--page | --stitch] [--og]
//
// Writes the first screen (1200×1057, what the hero pane and the work windows show) as WebP, with --page
// also the full page at 820 px wide for /realizacje (--stitch instead scrolls screen by screen and joins
// the screens, for sites whose pinned, scroll-driven sections come out blank in one full-page shot),
// with --og the 1200×630 share image, and prints wire candidates in the hero's 400×330 viewBox (page px / 3; the pane shows the top 990 px). Curate them into src/constants/heroWires.ts.
// Cookie banners are hidden with CSS, never accepted. Uses Playwright's bundled Chromium: the branded
// Chrome refuses plain-http sites.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const require = createRequire(path.join(root, "package.json"));
const { chromium } = require("@playwright/test");

const [slug, url, ...rest] = process.argv.slice(2);
if (!slug || !url) {
  console.error("usage: node scripts/capture-work.mjs <slug> <url> [--image public/work/<file>.webp] [--page | --stitch] [--og]");
  process.exit(1);
}
const flag = (name) => rest.includes(name);
const opt = (name) => (rest.includes(name) ? rest[rest.indexOf(name) + 1] : undefined);
const imageOut = path.join(root, opt("--image") ?? `public/work/${slug}.webp`);
const pageOut = path.join(root, `public/work/page-${slug}.webp`);
const ogOut = path.join(root, `public/og/og-realizacje-${slug}.png`);

const HIDE_OVERLAYS = `
  [id*="cookie" i], [class*="cookie" i], [id*="consent" i], [class*="consent" i], [class*="gdpr" i],
  #CybotCookiebotDialog, .cmplz-cookiebanner, #onetrust-banner-sdk, [aria-label*="cookie" i] { display: none !important; }
  html, body { overflow: visible !important; }`;

const browser = await chromium.launch();

async function open(width, height) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(url, { waitUntil: "load", timeout: 60000 });
  await page.addStyleTag({ content: HIDE_OVERLAYS });
  // walk the page once so lazy images and scroll reveals settle, then return to the top
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(2500);
  return page;
}

/* one or more PNG screens stacked top to bottom, scaled to targetWidth, encoded as WebP by the browser */
async function toWebp(pngs, outFile, targetWidth) {
  const page = await browser.newPage();
  const b64 = await page.evaluate(
    async ({ srcs, targetWidth }) => {
      const imgs = await Promise.all(srcs.map(async (src) => { const img = new Image(); img.src = src; await img.decode(); return img; }));
      const k = targetWidth ? targetWidth / imgs[0].width : 1;
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(imgs[0].width * k);
      canvas.height = imgs.reduce((sum, img) => sum + Math.round(img.height * k), 0);
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingQuality = "high";
      let y = 0;
      for (const img of imgs) {
        const h = Math.round(img.height * k);
        ctx.drawImage(img, 0, y, canvas.width, h);
        y += h;
      }
      return canvas.toDataURL("image/webp", 0.84).split(",")[1];
    },
    { srcs: [pngs].flat().map((png) => `data:image/png;base64,${png.toString("base64")}`), targetWidth }
  );
  await page.close();
  fs.writeFileSync(outFile, Buffer.from(b64, "base64"));
  return outFile;
}

/* runs in the page: boxes of the first screen, grouped the way the hero draws them */
function readWires() {
  const H = 990, W = 1200, out = [];
  const shown = (el) => {
    const s = getComputedStyle(el);
    return s.display !== "none" && s.visibility !== "hidden" && Number(s.opacity) > 0.05;
  };
  const inView = (r) => r.width > 4 && r.height > 4 && r.top < H && r.bottom > 0 && r.left < W && r.right > 0;
  const add = (r, kind, tag) => inView(r) && out.push({ x: r.left, y: r.top, w: r.width, h: r.height, kind, tag });
  const lines = (el) => {
    const range = document.createRange();
    range.selectNodeContents(el);
    const rows = [];
    for (const r of range.getClientRects()) {
      if (r.width < 4) continue;
      const row = rows.find((q) => Math.abs(q.top - r.top) < r.height * 0.5);
      if (row) { row.left = Math.min(row.left, r.left); row.right = Math.max(row.right, r.right); row.bottom = Math.max(row.bottom, r.bottom); }
      else rows.push({ top: r.top, left: r.left, right: r.right, bottom: r.bottom });
    }
    return rows.map((q) => ({ left: q.left, top: q.top, width: q.right - q.left, height: q.bottom - q.top }));
  };
  const opaque = (c) => c && c !== "transparent" && !/rgba\([^)]*,\s*0\)$/.test(c);
  const header = document.querySelector("header, [role=banner], nav");

  if (header && shown(header)) {
    const logo = header.querySelector("img, svg");
    if (logo) add(logo.getBoundingClientRect(), "outline", "logo");
  }
  for (const a of document.querySelectorAll("a, button")) {
    if (!shown(a)) continue;
    const r = a.getBoundingClientRect(), s = getComputedStyle(a);
    const isButton = r.height >= 28 && r.height <= 90 && r.width >= 60 && r.width <= 420;
    if (isButton && opaque(s.backgroundColor)) add(r, "cta", "button");
    else if (isButton && parseFloat(s.borderTopWidth) >= 1 && opaque(s.borderTopColor)) add(r, "outline", "button-line");
    else if (header?.contains(a) && a.textContent.trim().length > 1 && r.height < 60) add(r, "outline", "nav");
  }
  for (const h of document.querySelectorAll("h1, h2")) if (shown(h)) for (const r of lines(h)) add(r, "bar", h.tagName.toLowerCase());
  for (const p of document.querySelectorAll("p, li, span")) {
    if (!shown(p) || p.closest("a, button, h1, h2, header, nav") || p.children.length > 2) continue;
    if (p.textContent.trim().length < 24) continue;
    for (const r of lines(p)) add(r, "bar-dim", p.tagName.toLowerCase());
  }
  for (const m of document.querySelectorAll("img, video, canvas, picture, svg")) {
    if (!shown(m) || header?.contains(m)) continue;
    const r = m.getBoundingClientRect(), area = r.width * r.height;
    if (area > 20000 && area < W * H * 0.6) add(r, "outline", "media");
  }
  return out;
}

const first = await open(1200, 1057);
const shot = await first.screenshot();
if (flag("--og")) await first.screenshot({ path: ogOut, clip: { x: 0, y: 0, width: 1200, height: 630 } });
await toWebp(shot, imageOut);
const wires = (await first.evaluate(readWires)).map((w) => ({
  x: Math.round(w.x / 3), y: Math.round(w.y / 3), w: Math.round(w.w / 3), h: Math.round(w.h / 3), kind: w.kind, tag: w.tag,
}));
await first.close();

if (flag("--page")) {
  const full = await open(1280, 900);
  await toWebp(await full.screenshot({ fullPage: true }), pageOut, 820);
  await full.close();
} else if (flag("--stitch")) {
  const full = await open(1280, 900);
  const screens = [];
  const height = await full.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 900) {
    await full.evaluate((top) => window.scrollTo(0, top), y);
    await full.waitForTimeout(1200);
    // the last screen stops at the page bottom: keep only the part below what the previous screen showed
    const overlap = y - (await full.evaluate(() => window.scrollY));
    screens.push(await full.screenshot(overlap > 0 ? { clip: { x: 0, y: overlap, width: 1280, height: 900 - overlap } } : {}));
  }
  await toWebp(screens, pageOut, 820);
  await full.close();
}
await browser.close();

console.log(JSON.stringify({ slug, image: path.relative(root, imageOut), page: flag("--page") || flag("--stitch") ? path.relative(root, pageOut) : null, wires }, null, 1));
