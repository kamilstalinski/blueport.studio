import { expect, test } from "@playwright/test";

const DOMAINS = ["dobreprecle.pl", "spavalnia.pl", "vilmart.pl", "dowytrenowania.pl", "abcmosty.pl", "afterthesin.com"];

test("the domain marquee loops the six client domains", async ({ page }) => {
  await page.goto("/");
  const spans = page.locator(".marq span");

  await expect(spans).toHaveCount(12);
  await expect(spans).toHaveText([...DOMAINS, ...DOMAINS]);
  await expect(page.locator(".marq")).toHaveAttribute("aria-hidden", "true");
  expect(await page.locator(".marq-track").evaluate((el) => getComputedStyle(el).animationName)).toBe("kafel-marquee");
});

test.describe("reduced motion marquee", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("stands still", async ({ page }) => {
    await page.goto("/");
    expect(await page.locator(".marq-track").evaluate((el) => getComputedStyle(el).animationName)).toBe("none");
  });
});
