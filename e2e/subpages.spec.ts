import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

/** Scroll through every visible reveal, then wait for all of them to rest before measuring. */
async function settle(page: Page) {
  for (const block of await page.locator("main .reveal:visible").all()) {
    await block.scrollIntoViewIfNeeded();
  }
  await expect(page.locator("main .reveal:visible:not([data-in])")).toHaveCount(0);
  await page.waitForFunction(() =>
    [...document.querySelectorAll("main .reveal")]
      .filter((el) => el.checkVisibility())
      .every((el) => {
        const style = getComputedStyle(el);
        return style.opacity === "1" && style.transform === "none";
      })
  );
}

async function expectNoAxeViolations(page: Page) {
  await settle(page);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
}

test("the subpage stylesheets are loaded", async ({ page }) => {
  await page.goto("/kontakt");
  const sheets = await page.evaluate(() => [...document.styleSheets].flatMap((sheet) => [...sheet.cssRules].map((rule) => rule.cssText)).join("\n"));
  expect(sheets).toContain(".page-head");
  expect(sheets).toContain("kafel-px-blink");
});
