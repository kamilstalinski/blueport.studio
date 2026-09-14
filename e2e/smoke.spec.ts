import { expect, test } from "@playwright/test";

const ROUTES = ["/", "/realizacje", "/realizacje/vilmart", "/cennik", "/proces", "/kontakt", "/o-nas", "/faq", "/kalkulator", "/wycena", "/polityka-prywatnosci", "/regulamin"];

/* Dev builds print the full hydration warning; production builds throw minified React errors 418/423/425. */
const HYDRATION_ERROR = /hydrat|Minified React error #(418|423|425)/i;

for (const route of ROUTES) {
  test(`${route} renders without page or hydration errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error" && HYDRATION_ERROR.test(message.text())) errors.push(message.text());
    });

    const response = await page.goto(route, { waitUntil: "networkidle" });

    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator("body")).toBeVisible();
    expect(errors).toEqual([]);
  });
}
