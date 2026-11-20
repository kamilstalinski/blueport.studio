import { expect, test } from "@playwright/test";

const ROUTES = ["/", "/realizacje", "/realizacje/vilmart", "/cennik", "/proces", "/kontakt", "/o-nas", "/faq", "/kalkulator", "/wycena", "/polityka-prywatnosci", "/regulamin"];

/*
 * Dev builds print the full hydration warning; production builds throw minified React errors.
 * Verified against the installed react-dom 19.2.4 (node_modules/react-dom/cjs/react-dom-client.production.js):
 * #418 text/HTML mismatch, #419 Suspense-boundary hydration mismatch, #422/#423 recoverable hydration
 * error inside/outside a boundary, #424 root attribute mismatch. (#425 does not exist in this version;
 * #519/#520 are internal control-flow signals that are never surfaced to the page.)
 * In both dev and prod, React/Next report these through `window.reportError`, which Playwright surfaces
 * as a `pageerror` (see node_modules/next/dist/client/react-client-callbacks/on-recoverable-error.js) -
 * the `pageerror` listener below already catches every case unconditionally. The console listener stays
 * as a defense-in-depth fallback for browsers without `window.reportError`, where Next logs via
 * `console.error` instead.
 */
const HYDRATION_ERROR = /hydrat|Minified React error #(418|419|422|423|424)/i;

for (const route of ROUTES) {
  test(`${route} renders without page or hydration errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error" && HYDRATION_ERROR.test(message.text())) errors.push(message.text());
    });

    /* "networkidle" never fires on "/" and "/realizacje": their build/scroll animations keep
       re-requesting work screenshots forever, so nothing here waits for the network to go quiet -
       "load" (all initial resources fetched) is what "rendered" actually means for this test. */
    const response = await page.goto(route, { waitUntil: "load" });

    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator("body")).toBeVisible();
    expect(errors).toEqual([]);
  });
}
