import { expect, test, type Page } from "@playwright/test";

/* Pixel baselines guarding the refactor. Rendered only in the Playwright Linux image: `npm run test:visual`. */
const ROUTES = ["/", "/realizacje", "/realizacje/vilmart", "/cennik", "/proces", "/kontakt", "/o-nas", "/faq", "/kalkulator", "/wycena", "/polityka-prywatnosci", "/regulamin"];

test.skip(process.platform !== "linux", "Baselines are rendered in the Playwright Docker image: run `npm run test:visual`.");
test.use({ reducedMotion: "reduce" });

function snapshotName(route: string): string {
  return route === "/" ? "home.png" : `${route.slice(1).replaceAll("/", "-")}.png`;
}

/** Trigger every reveal, then wait until nothing on the page is still fading or loading. */
async function settle(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    /* Chromium's native `loading="lazy"` re-evaluates eligibility by current scroll position: an
       image scrolled past and then back out of view (as the loop below ends by resetting to the
       top) never fetches. Force every image to load immediately so `img.complete` can settle. */
    for (const img of document.images) img.loading = "eager";
    const frame = () => new Promise((resolve) => requestAnimationFrame(resolve));
    for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight / 2) {
      window.scrollTo(0, y);
      await frame();
    }
    window.scrollTo(0, 0);
    await frame();
  });
  await page.waitForFunction(() =>
    [...document.images].every((img) => img.complete) &&
    [...document.querySelectorAll<HTMLElement>("main, main *, .calc-shell, .calc-shell *")]
      .filter((el) => el.style.opacity !== "")
      .every((el) => getComputedStyle(el).opacity === "1")
  );
}

/* /kalkulator and /wycena render <Calculator> instead of the normal chrome: no `.nav`, its own
   sticky `.calc-header` instead (see ConditionalChrome's NO_CHROME_PATHS). */
const CALCULATOR_ROUTES = new Set(["/kalkulator", "/wycena"]);

for (const route of ROUTES) {
  test(`${route} matches its baseline`, async ({ page }) => {
    await page.clock.setFixedTime(new Date("2026-09-14T10:00:00Z"));
    await page.goto(route, { waitUntil: "networkidle" });

    /* Pin `.nav`/`.calc-header` to `position: static` and hide `.skip-link` for the screenshot:
       Chromium's full-page (beyond-viewport) capture intermittently mis-renders `position: fixed`
       and `position: sticky` elements — the skip-link (invisible until keyboard-focused) can paint
       at its in-flow position instead of off-screen, pushing the rest of the page down, and the
       sticky, `backdrop-filter`-blurred header can double-paint. Fix round 1 tried dropping both
       pins after moving to the amd64 image (matching CI) with `--workers=1`: 5 consecutive runs
       were clean, but a 6th run reproduced the skip-link mis-render on /regulamin (mobile) — so the
       bug is real and still possible, just rarer, not fixed by amd64/serial alone. Pins are back.
       Because a pin like this can just as easily hide a *real* future regression in either
       element's `position`, assert the assumption each pin relies on BEFORE the override touches
       it, so such a regression fails loudly here instead of always being silently masked. */
    if (CALCULATOR_ROUTES.has(route)) {
      const calcHeader = page.locator(".calc-header");
      await expect(calcHeader).toHaveCSS("position", "sticky");
      await expect(calcHeader).toHaveCSS("top", "0px");
    } else {
      const nav = page.locator(".nav");
      await expect(nav).toHaveCSS("position", "sticky");
      await expect(nav).toHaveCSS("top", "0px");
    }
    const skipLinkBox = await page.locator(".skip-link").boundingBox();
    expect(skipLinkBox, "skip-link should be in the DOM").not.toBeNull();
    expect(skipLinkBox!.y + skipLinkBox!.height, "skip-link should be off-screen (unfocused)").toBeLessThanOrEqual(0);

    /* HeroCursorField draws a pointer-driven "cursor trail" onto a <canvas> the size of the whole
       hero (`.hero-cursor { position: absolute; inset: 0; }`); it's a no-op under
       prefers-reduced-motion (which this spec sets), but is hidden outright anyway so a future
       change there can't reintroduce non-determinism. Deliberately not using Playwright's `mask`
       for this: `mask` paints an opaque box over the *locator's full bounding rect* in the output
       image regardless of DOM stacking, and because the canvas is exactly hero-sized it would
       blot out the h1/copy/CTAs/HeroBuildFrame/cranes that sit visually above it (z-index: 1 vs.
       the canvas's z-index: 0) — those need to stay pixel-covered by this baseline. Hiding the
       canvas via CSS instead makes it paint nothing, deterministically, while leaving the rest of
       the hero's real stacking (and pixels) untouched. */
    await page.addStyleTag({
      content:
        ".skip-link { display: none !important; } .nav, .calc-header { position: static !important; } #hero canvas { visibility: hidden !important; }",
    });
    await settle(page);
    await expect(page).toHaveScreenshot(snapshotName(route), {
      fullPage: true,
      animations: "disabled",
      caret: "hide",
      maxDiffPixelRatio: 0.001,
    });
  });
}
