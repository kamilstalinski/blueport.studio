import { expect, test } from "@playwright/test";

test.describe("navbar on desktop", () => {
  test.skip(({ isMobile }) => isMobile, "desktop layout only");

  test("shows five words, the CTA and marks the current section", async ({ page }) => {
    await page.goto("/realizacje");
    const nav = page.getByRole("navigation", { name: "Główna nawigacja" });

    await expect(nav.getByRole("link")).toHaveText(["Oferta", "Realizacje", "Proces", "O nas", "Kontakt"]);
    await expect(nav.getByRole("link", { name: "Realizacje" })).toHaveAttribute("aria-current", "page");
    await expect(page.getByRole("banner").getByRole("link", { name: "Umów rozmowę" })).toHaveAttribute("href", "/kontakt");
    await expect(page.getByRole("banner").getByRole("link", { name: "blueport.studio, strona główna" })).toHaveAttribute("href", "/");
  });

  test("Oferta opens the offer panel on hover and on focus, and Escape closes it", async ({ page }) => {
    await page.goto("/o-nas");
    const nav = page.getByRole("navigation", { name: "Główna nawigacja" });
    const shop = nav.getByRole("link", { name: /^Sklep internetowy od 4\s900\szł/ });
    await expect(shop).toBeHidden();

    await nav.getByRole("link", { name: "Oferta" }).hover();
    await expect(shop).toBeVisible();
    await expect(shop).toHaveAttribute("href", "/oferta/sklepy-internetowe");
    await expect(nav.getByRole("link", { name: "Cennik", exact: true })).toHaveAttribute("href", "/cennik");
    await expect(nav.getByRole("link", { name: /Umów rozmowę/ })).toHaveAttribute("href", "/kontakt");
    await expect(nav.locator(".bp-mega img")).toHaveCount(0);
    await nav.getByRole("link", { name: "Kontakt" }).hover();
    await expect(shop).toBeHidden();

    await nav.getByRole("link", { name: "Oferta" }).focus();
    await expect(shop).toBeVisible();
    await page.keyboard.press("Tab");
    await expect(nav.getByRole("link", { name: /^Strona www od 2\s500\szł/ })).toHaveAttribute("href", "/oferta/strony-www");
    await expect(nav.getByRole("link", { name: /^Strona www od 2\s500\szł/ })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(shop).toBeHidden();
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
    const links = page.locator("#bp-sheet");
    await expect(links).toBeHidden();

    await page.getByRole("button", { name: "Otwórz menu" }).click();
    await expect(links).toBeVisible();
    await expect(page.getByRole("button", { name: "Zamknij menu" })).toHaveAttribute("aria-expanded", "true");

    await links.getByRole("link", { name: "Cennik" }).focus();
    await page.keyboard.press("Escape");
    await expect(links).toBeHidden();
    await expect(page.getByRole("button", { name: "Otwórz menu" })).toBeFocused();
  });
});

test("footer links every section and the legal pages", async ({ page }) => {
  await page.goto("/");
  const footer = page.getByRole("contentinfo");

  for (const [name, href] of [
    ["Cennik", "/cennik"],
    ["Oferta", "/oferta"],
    ["Realizacje", "/realizacje"],
    ["Proces", "/proces"],
    ["O nas", "/o-nas"],
    ["Kontakt", "/kontakt"],
    ["FAQ", "/faq"],
    ["Polityka prywatności", "/polityka-prywatnosci"],
    ["Regulamin", "/regulamin"],
  ] as const) {
    await expect(footer.getByRole("link", { name, exact: true })).toHaveAttribute("href", href);
  }
  await expect(footer.getByRole("link", { name: "Usługi", exact: true })).toHaveCount(0);
  await expect(footer.getByRole("link", { name: "kontakt@blueport.studio" })).toHaveAttribute("href", "mailto:kontakt@blueport.studio");
  await expect(footer).toContainText(`© ${new Date().getFullYear()} Blueport Studio`);
});
