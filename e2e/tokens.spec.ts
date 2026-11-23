import { expect, test } from "@playwright/test";

test("pages use the Kobalt / Grafit / Sygnał tokens and Kafel fonts", async ({ page }) => {
  await page.goto("/");

  const styles = await page.evaluate(() => {
    const root = document.documentElement;
    const body = getComputedStyle(document.body);
    return {
      background: body.backgroundColor,
      bodyFont: body.fontFamily,
      accentToken: getComputedStyle(root).getPropertyValue("--cobalt").trim(),
      legacyPrimary: getComputedStyle(root).getPropertyValue("--color-primary").trim(),
      dataAccent: root.getAttribute("data-accent"),
      isDark: root.classList.contains("dark"),
    };
  });

  expect(styles.background).toBe("rgb(10, 15, 23)");
  // next/font/local names the family after the variable ("schibstedGrotesk")
  expect(styles.bodyFont).toMatch(/schibsted\s?grotesk/i);
  // Next.js's CSS pipeline (Lightning CSS) lowercases hex color literals when
  // serving the stylesheet, even though the source in src/styles/kafel.css
  // uses the brand kit's uppercase #FF5A1F. Compare case-insensitively.
  expect(styles.accentToken.toLowerCase()).toBe("#ff5a1f");
  expect(styles.legacyPrimary.toLowerCase()).toBe("#ff5a1f");
  expect(styles.dataAccent).toBeNull();
  expect(styles.isDark).toBe(true);
});
