import { expect, test } from "@playwright/test";

const ROUTES = ["/", "/realizacje", "/realizacje/vilmart", "/cennik", "/proces", "/kontakt", "/o-nas", "/faq", "/kalkulator", "/wycena", "/polityka-prywatnosci", "/regulamin"];

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
