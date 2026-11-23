import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { SERVICES } from "../src/constants/services";

for (const [slug, topic] of [["strony-www", "strona"], ["sklepy-internetowe", "sklep"], ["reklamy-meta-google", "reklamy"], ["wdrozenia-ai", "ai"]]) {
  test(`${slug}: one h1, CTA with topic, three sibling links, topic preselected`, async ({ page }) => {
    await page.goto(`/oferta/${slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.locator("main").getByRole("link", { name: /Umów rozmowę/ }).first()).toHaveAttribute("href", `/kontakt?temat=${topic}`);
    await expect(page.locator("[data-rest] a")).toHaveCount(3);
    await expect(page.locator("#contact-topic")).toHaveValue(topic);
  });
}

test("unknown service is a 404", async ({ request }) => expect((await request.get("/oferta/xyz")).status()).toBe(404));

test("ads and AI show their from-prices with the unit", async ({ page }) => {
  for (const [slug, price] of [["reklamy-meta-google", /od 900\s?zł \/ mies\./], ["wdrozenia-ai", /od 2\s?500\s?zł za proces/]] as const) {
    await page.goto(`/oferta/${slug}`);
    await expect(page.locator("main")).toContainText(price);
    await expect(page.locator("main")).not.toContainText(/od (null|0) zł|Wycena po rozmowie/);
  }
});

test("www page lists the dedicated project", async ({ page }) => {
  await page.goto("/oferta/strony-www");
  await expect(page.locator("main")).toContainText("Dedykowany"); // PACKAGE_SHORT["projekt-dedykowany"]
});

test("old offer URLs redirect to the new pages", async ({ request }) => {
  for (const [from, to] of [["/oferta/strony", "/oferta/strony-www"], ["/oferta/sklepy", "/oferta/sklepy-internetowe"]]) {
    const res = await request.get(from, { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    expect(res.headers()["location"]).toMatch(new RegExp(`${to}$`));
  }
});

test("service pages do not scroll sideways at 390", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const slug of ["strony-www", "wdrozenia-ai"]) {
    await page.goto(`/oferta/${slug}`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  }
});

for (const slug of ["strony-www", "reklamy-meta-google"]) {
  test(`${slug} has no axe violations`, async ({ page }) => {
    await page.goto(`/oferta/${slug}`);
    // app/template.tsx fades every route in; axe mid-fade reports false contrast failures
    await page.waitForFunction(() => getComputedStyle(document.querySelector("main")!.firstElementChild!).opacity === "1");
    for (const block of await page.locator("main .reveal:visible").all()) await block.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
}

test("offer hub: one h1, four service links, contact action, price list link", async ({ page }) => {
  await page.goto("/oferta");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  for (const slug of ["strony-www", "sklepy-internetowe", "reklamy-meta-google", "wdrozenia-ai"])
    await expect(page.locator(`main a[href="/oferta/${slug}"]`).first()).toBeVisible();
  await expect(page.locator(".bp-hero, .page-head").getByRole("link", { name: "Umów rozmowę" })).toHaveAttribute("href", "/kontakt");
  await expect(page.locator('main a[href="/cennik"]').first()).toBeVisible();
});
test("offer hub hero path is fully drawn under reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/oferta");
  const path = page.locator("[data-offer-path]");
  await expect(path).toBeVisible();
  expect(await path.evaluate((el) => getComputedStyle(el).strokeDashoffset)).toMatch(/^0(px)?$/);
});
test("offer hub does not scroll sideways at 390", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/oferta");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});
test("offer hub has no axe violations", async ({ page }) => {
  await page.goto("/oferta");
  await page.waitForFunction(() => getComputedStyle(document.querySelector("main")!.firstElementChild!).opacity === "1");
  await page.waitForTimeout(1200);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test("offer hub AI section shows the AI scenarios", async ({ page }) => {
  const ai = SERVICES.find((service) => service.slug === "wdrozenia-ai")!;
  if (ai.proof.kind !== "scenarios") throw new Error("wdrozenia-ai has no scenarios");
  expect(ai.proof.items.length).toBeGreaterThanOrEqual(2);
  await page.goto("/oferta");
  const section = page.locator("section", { has: page.locator("#offer-ai-h") });
  // scoped to the term rows: "Zapytanie z formularza" is also a diagram node
  await expect(section.locator("dl dt")).toHaveText(ai.proof.items.map((item) => item.title));
});
