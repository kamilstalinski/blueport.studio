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

test("realizacje shows all six sites as scrolling frames and ends with the CTA band", async ({ page }) => {
  await page.goto("/realizacje");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Dziesięć wdrożeń. Sześć, które możemy pokazać.");
  await expect(page.locator(".page-head .lede")).toHaveText("Najedź kursorem na dowolną, żeby przewinąć ją w całości. Bez wchodzenia na stronę klienta.");

  const frames = page.locator("main a.frame");
  await expect(frames).toHaveCount(6);
  await expect(frames.nth(0)).toHaveAttribute("href", "/realizacje/dobreprecle");
  await expect(frames.nth(5)).toHaveAttribute("href", "/realizacje/afterthesin");
  await expect(page.locator("main .wall")).toHaveCount(2);
  await expect(page.locator("main section.cta-band")).toHaveCount(1);
  await expect(page.getByText("Efekty")).toHaveCount(0);

  await expectNoAxeViolations(page);
});

test("a case study opens with the spec header and screenshot, then the full story", async ({ page }) => {
  await page.goto("/realizacje/vilmart");

  await expect(page.getByRole("link", { name: "Wszystkie realizacje" })).toHaveAttribute("href", "/realizacje");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Vilmart Water Service");
  await expect(page.locator(".page-head .lede")).toHaveText("Strona WordPress dla specjalisty od uzdatniania wody. Formularz doboru urządzenia jako główne narzędzie leadowe.");
  await expect(page.locator(".page-head .meta")).toHaveText("vilmart.pl");
  await expect(page.locator(".cs-shot img")).toHaveAttribute("alt", "Strona Vilmart Water Service");

  for (const label of ["Kontekst biznesowy", "Wyzwanie", "Strategia", "Wdrożenie", "Wyniki", "Wnioski"]) {
    await expect(page.getByRole("heading", { level: 2, name: label })).toBeVisible();
  }
  await expect(page.locator(".cs-facts")).toContainText("Klient");
  await expect(page.locator("main section.cta-band")).toHaveCount(1);

  const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(jsonLd.some((text) => text.includes('"BreadcrumbList"'))).toBe(true);

  await expectNoAxeViolations(page);
});

test("case study metadata uses the study title", async ({ page }) => {
  await page.goto("/realizacje/abcmosty");
  await expect(page).toHaveTitle(/ABC Mosty — Realizacja Blueport Studio/);
});

test("an unknown case study is a 404", async ({ page }) => {
  const response = await page.goto("/realizacje/nie-ma-takiej");
  expect(response?.status()).toBe(404);
});

test("cennik shows the tiers, the comparison table from the price list and the CTA band", async ({ page }) => {
  await page.goto("/cennik");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Ceny, które widzisz przed podpisaniem umowy.");
  await expect(page.locator(".page-head .lede").getByRole("link", { name: "kalkulatorze" })).toHaveAttribute("href", "/kalkulator");
  await expect(page.locator("main article.tier")).toHaveCount(3);

  const table = page.getByRole("table");
  await expect(table.getByRole("columnheader")).toHaveText(["Zakres", "Start", "Pro", "Sklep"]);
  await expect(table.getByRole("row").nth(1)).toContainText("2 500 zł");
  await expect(table.getByRole("row").nth(1)).toContainText("4 900 zł");
  await expect(table.getByRole("row").nth(2)).toContainText("od 14 dni roboczych");
  await expect(table.getByRole("row").nth(4).getByRole("img", { name: "Nie" })).toHaveCount(1);
  await expect(table.getByRole("row").nth(4).getByRole("img", { name: "Tak" })).toHaveCount(2);
  await expect(page.getByText("Ceny netto. Hosting i domena rozliczane bezpośrednio u dostawcy, bez naszej marży.")).toBeVisible();
  await expect(page.locator("main section.cta-band")).toHaveCount(1);

  await expectNoAxeViolations(page);
});
