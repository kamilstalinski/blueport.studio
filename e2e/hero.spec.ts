import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("home hero carries the Budowa copy, CTAs and the crane quay", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator("section#hero");

  await expect(hero.getByRole("heading", { level: 1 })).toHaveText("Strony internetowe, które sprzedają.");
  await expect(hero.getByText("Tak powstaje każda nasza strona: siatka, układ, treść i start. Obok na przykładzie prawdziwej realizacji.")).toBeVisible();
  await expect(hero.getByRole("link", { name: "Sprawdź koszt" })).toHaveAttribute("href", "/kalkulator");
  await expect(hero.getByRole("link", { name: "Umów konsultację" })).toHaveAttribute("href", "/kontakt");

  const heroBox = await hero.boundingBox();
  const quayBox = await hero.locator(".hero-quay").boundingBox();
  expect(quayBox?.width).toBe(heroBox?.width);
  expect(Math.round((quayBox?.y ?? 0) + (quayBox?.height ?? 0))).toBe(Math.round((heroBox?.y ?? 0) + (heroBox?.height ?? 0)));
  await expect(hero.locator("svg.hero-cranes")).toBeVisible();
});

const paintedPixels = (page: import("@playwright/test").Page) =>
  page.evaluate(() => {
    const canvas = document.querySelector<HTMLCanvasElement>("section#hero canvas.hero-cursor");
    const context = canvas?.getContext("2d");
    if (!canvas || !context || canvas.width === 0) return 0;
    const data = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let painted = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] > 0) painted++;
    return painted;
  });

test.describe("Kursor field", () => {
  test.skip(({ isMobile }) => isMobile, "pointer trail is a desktop interaction");

  test("paints accent cells where the pointer moves outside the copy", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator("section#hero");
    const box = await hero.boundingBox();
    if (!box) throw new Error("hero has no box");

    const y = box.y + box.height - 40;
    await page.mouse.move(box.x + 40, y);
    for (let step = 1; step <= 12; step++) await page.mouse.move(box.x + 40 + step * 20, y);

    await expect.poll(() => paintedPixels(page)).toBeGreaterThan(0);
  });
});

test.describe("reduced motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("keeps the Kursor field blank", async ({ page }) => {
    await page.goto("/");
    const box = await page.locator("section#hero").boundingBox();
    if (!box) throw new Error("hero has no box");
    await page.mouse.move(box.x + 60, box.y + box.height - 40);
    await page.mouse.move(box.x + 200, box.y + box.height - 40);
    await page.waitForTimeout(400);
    expect(await paintedPixels(page)).toBe(0);
  });
});

test("Budowa builds the page and reveals a real client site", async ({ page }) => {
  await page.goto("/");
  const pane = page.locator("section#hero .bd-pane");
  const chrome = page.locator("section#hero .bd-frame .chrome");

  await expect(chrome).toContainText("nowa-strona.pl");
  await expect(pane).toHaveAttribute("data-stage", "3", { timeout: 6000 });
  await expect(chrome).toContainText("dobreprecle.pl");
  await expect(page.locator("section#hero .bd-steps li.on")).toHaveCount(4);
});

test.describe("reduced motion Budowa", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("shows the finished site straight away", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("section#hero .bd-pane")).toHaveAttribute("data-stage", "3", { timeout: 1500 });
    await expect(page.locator("section#hero .bw.in")).toHaveCount(16);
  });
});

test("home hero, navbar and footer have no axe violations", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("section#hero .bd-pane")).toHaveAttribute("data-stage", "3", { timeout: 6000 });

  const results = await new AxeBuilder({ page })
    .include("header.nav")
    .include("section#hero")
    .include("footer#site-footer")
    .analyze();

  expect(results.violations).toEqual([]);
});
