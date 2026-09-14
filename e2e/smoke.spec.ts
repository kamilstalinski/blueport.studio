import { expect, test } from "@playwright/test";

const ROUTES = ["/", "/realizacje", "/cennik", "/proces", "/kontakt", "/uslugi", "/o-nas", "/faq", "/kalkulator"];

for (const route of ROUTES) {
  test(`${route} renders without page errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    const response = await page.goto(route);

    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator("body")).toBeVisible();
    expect(errors).toEqual([]);
  });
}
