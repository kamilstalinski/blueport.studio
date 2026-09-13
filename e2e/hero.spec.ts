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
