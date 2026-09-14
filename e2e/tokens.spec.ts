import { expect, test } from "@playwright/test";

test("pages use the Boja tokens and Kafel fonts", async ({ page }) => {
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

  expect(styles.background).toBe("rgb(8, 25, 42)");
  expect(styles.bodyFont).toMatch(/Schibsted/);
  // Next.js's CSS pipeline (Lightning CSS) lowercases hex color literals when
  // serving the stylesheet, even though the source in src/styles/kafel.css
  // uses the spec's verbatim uppercase #FF6A2B. Compare case-insensitively.
  expect(styles.accentToken.toLowerCase()).toBe("#ff6a2b");
  expect(styles.legacyPrimary.toLowerCase()).toBe("#ff6a2b");
  expect(styles.dataAccent).toBeNull();
  expect(styles.isDark).toBe(true);
});
