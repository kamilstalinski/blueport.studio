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

for (const route of ROUTES) {
  test(`${route} matches its baseline`, async ({ page }) => {
    await page.clock.setFixedTime(new Date("2026-09-14T10:00:00Z"));
    await page.goto(route, { waitUntil: "networkidle" });
    /* Chromium's full-page (beyond-viewport) capture occasionally mis-renders the fixed
       skip-link and any sticky, blurred header: the skip-link paints at its in-flow position
       instead of off-screen, pushing the rest of the page down, and a sticky header can
       double-paint. Both only matter mid-scroll, which a full-page screenshot never represents
       anyway, so pin them to a single deterministic rendering for the shot.
       #hero's own contents are additionally hidden (not just relying on the `canvas` mask below):
       the box that Playwright's mask overlays onto was observed to shift by a few pixels between
       two screenshots of the same settled page, leaking real (and non-deterministic) pixels at
       its edge. Painting the section itself as a flat colour removes any content there to leak. */
    await page.addStyleTag({
      content:
        ".skip-link { display: none !important; } .nav, .calc-header { position: static !important; } #hero > * { visibility: hidden !important; } #hero { background: #ff00ff !important; }",
    });
    await settle(page);
    await expect(page).toHaveScreenshot(snapshotName(route), {
      fullPage: true,
      animations: "disabled",
      caret: "hide",
      /* #hero (the canvas's containing section) is masked too: the canvas's own bounding box was
         seen to jitter by a couple of pixels between otherwise-identical screenshots, leaking a
         thin sliver of diff at the mask's edge. The section's box is layout-driven and stable. */
      mask: [page.locator("canvas"), page.locator("#hero")],
      maxDiffPixelRatio: 0.001,
    });
  });
}
