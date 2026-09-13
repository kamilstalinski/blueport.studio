import { expect, test } from "@playwright/test";

test.describe("navbar on desktop", () => {
  test.skip(({ isMobile }) => isMobile, "desktop layout only");

  test("shows four links, the CTA and marks the current section", async ({ page }) => {
    await page.goto("/realizacje");
    const nav = page.getByRole("navigation", { name: "Główna nawigacja" });

    await expect(nav.getByRole("link")).toHaveText(["Realizacje", "Cennik", "Proces", "Kontakt"]);
    await expect(nav.getByRole("link", { name: "Realizacje" })).toHaveAttribute("aria-current", "page");
    await expect(page.getByRole("banner").getByRole("link", { name: "Sprawdź koszt" })).toHaveAttribute("href", "/kalkulator");
    await expect(page.getByRole("banner").getByRole("link", { name: "blueport.studio, strona główna" })).toHaveAttribute("href", "/");
  });

  test("stays pinned to the top while scrolling", async ({ page }) => {
    await page.goto("/");
    await page.mouse.wheel(0, 1600);
    await expect.poll(async () => (await page.getByRole("banner").boundingBox())?.y).toBe(0);
  });
});

test.describe("navbar on mobile", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile layout only");

  test("burger opens the link list and Escape closes it", async ({ page }) => {
    await page.goto("/");
    const links = page.locator("#nav-links");
    await expect(links).toBeHidden();

    await page.getByRole("button", { name: "Otwórz menu" }).click();
    await expect(links).toBeVisible();
    await expect(page.getByRole("button", { name: "Zamknij menu" })).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("Escape");
    await expect(links).toBeHidden();
  });
});
