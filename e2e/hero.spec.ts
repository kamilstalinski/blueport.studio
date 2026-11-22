import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("home hero carries the offer, the price and the two actions", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator("section#hero");

  await expect(hero.getByRole("heading", { level: 1 })).toHaveText(/^Strony internetowe dla małych firm, od 2\s500\szł$/);
  await expect(hero.getByText("Cenę znasz przed startem", { exact: false })).toBeVisible();
  await expect(hero.getByRole("link", { name: /Sprawdź koszt/ })).toHaveAttribute("href", "/kalkulator");
  await expect(hero.getByRole("link", { name: "Umów konsultację" })).toHaveAttribute("href", "/kontakt");
});

/* the build timeline reaches stage 3 at 3760ms after hydration (src/lib/hero/buildTimeline.ts) */
const STAGE_3_TIMEOUT_MS = 8000;

test("the hero builds a page on the grid and reveals a real client site", async ({ page }) => {
  await page.goto("/");
  const pane = page.locator("section#hero .bp-pane");
  const url = page.locator("section#hero .bp-url");

  await expect(url).toHaveText("nowa-strona.pl");
  await expect(pane).toHaveAttribute("data-stage", "3", { timeout: STAGE_3_TIMEOUT_MS });
  await expect(url).toHaveText("dobreprecle.pl");
  await expect(page.locator("section#hero .bp-build-steps li.bp-on")).toHaveCount(4);
});

test.describe("reduced motion build", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("shows the finished site straight away", async ({ page }) => {
    await page.goto("/");
    /* well under the ~3760ms the animated cycle needs, so "instant" stays distinct from "animated" */
    await expect(page.locator("section#hero .bp-pane")).toHaveAttribute("data-stage", "3", { timeout: 3000 });
    await expect(page.locator("section#hero .bp-bw.bp-in")).toHaveCount(16);
  });
});

test("the mobile menu opens, lists the pages and closes on Escape", async ({ page, isMobile }) => {
  test.skip(!isMobile, "the menu button only shows below 1024px");
  await page.goto("/");
  const button = page.getByRole("button", { name: "Otwórz menu" });
  await button.click();
  const sheet = page.locator("#bp-sheet");
  await expect(sheet).toBeVisible();
  await expect(sheet.getByRole("link")).toHaveText(["Realizacje", "Cennik", "Proces", "Kontakt"]);
  await page.keyboard.press("Escape");
  await expect(sheet).toBeHidden();
  await expect(page.getByRole("button", { name: "Otwórz menu" })).toBeFocused();
});

test("home hero, header and footer have no axe violations", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("section#hero .bp-pane")).toHaveAttribute("data-stage", "3", { timeout: STAGE_3_TIMEOUT_MS });

  const results = await new AxeBuilder({ page })
    .include("header.bp-top")
    .include("section#hero")
    .include("footer#site-footer")
    .analyze();

  expect(results.violations).toEqual([]);
});
