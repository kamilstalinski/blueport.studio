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

const workWall = (page: import("@playwright/test").Page) =>
  page.locator("section", { has: page.getByRole("heading", { name: "Trzy kolejne, które możemy pokazać." }) });

test("the work wall links three client sites and reveals on scroll", async ({ page }) => {
  await page.goto("/");
  const section = workWall(page);
  await section.scrollIntoViewIfNeeded();

  const frames = section.locator("a.frame");
  await expect(frames).toHaveCount(3);
  await expect(frames.nth(0)).toHaveAttribute("href", "/realizacje/dowytrenowania");
  await expect(frames.nth(1)).toHaveAttribute("href", "/realizacje/abcmosty");
  await expect(frames.nth(2)).toHaveAttribute("href", "/realizacje/afterthesin");
  await expect(section.getByRole("link", { name: "Wszystkie realizacje" })).toHaveAttribute("href", "/realizacje");
  await expect(section.locator(".reveal").first()).toHaveAttribute("data-in", "");
});

test("the soft pixel field never covers the section heading", async ({ page }) => {
  await page.goto("/");
  const section = workWall(page);
  await section.scrollIntoViewIfNeeded();
  await expect.poll(() => section.locator("svg.px-field path").count()).toBeGreaterThan(0);

  const hits = await section.evaluate((root) => {
    const heading = root.querySelector("h2")?.getBoundingClientRect();
    if (!heading) return -1;
    return [...root.querySelectorAll("svg.px-field path")].filter((path) => {
      const box = path.getBoundingClientRect();
      return box.right > heading.left && box.left < heading.right && box.bottom > heading.top && box.top < heading.bottom;
    }).length;
  });
  expect(hits).toBe(0);
});

test.describe("full-page preview on hover", () => {
  test.skip(({ isMobile }) => isMobile, "hover scrolling is a fine-pointer interaction");

  test("scrolls the client's page inside the frame", async ({ page }) => {
    await page.goto("/");
    const frame = workWall(page).locator("a.frame").first();
    await frame.scrollIntoViewIfNeeded();
    await expect.poll(() => frame.evaluate((el) => parseFloat(getComputedStyle(el).getPropertyValue("--shift")))).toBeLessThan(0);

    await frame.hover();
    await expect
      .poll(() => frame.locator(".pane img").evaluate((img) => new DOMMatrix(getComputedStyle(img).transform).m42))
      .toBeLessThan(-20);
  });
});

const planSection = (page: import("@playwright/test").Page) =>
  page.locator("section", {
    has: page.getByRole("heading", { name: "Większość stron dla małych firm powstaje bez planu. Potem nie sprzedaje." }),
  });

test("the structure section argues with a traced page plan", async ({ page }) => {
  await page.goto("/");
  const section = planSection(page);
  await section.scrollIntoViewIfNeeded();

  await expect(section.getByText("Wygląda dobrze na prezentacji i nic nie robi przez kolejne trzy lata.")).toBeVisible();
  await expect(section.locator(".swap .now")).toHaveText([
    "Struktura i treść pisane pod wyszukiwanie lokalne",
    "Optymalizacja szybkości przed publikacją",
    "Formularz i ścieżka kontaktu w centrum układu",
  ]);
  await expect(section.getByRole("img", { name: /Schemat strony/ })).toBeVisible();
  await expect(section.getByText("Ścieżka od pierwszego ekranu do formularza. Projektujemy ją, zanim powstanie pierwszy piksel.")).toBeVisible();

  await expect.poll(() => section.locator(".plan .route").evaluate((el) => getComputedStyle(el).strokeDashoffset)).toBe("0px");
  await expect(section.locator(".px-deco--tetro")).toHaveAttribute("aria-hidden", "true");
  await expect.poll(() => section.locator(".deco-drop").evaluate((el) => getComputedStyle(el).transform)).toBe("none");
});

test("pricing shows three packages from the price list and the dedicated project", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("section", { has: page.getByRole("heading", { name: "Trzy pakiety. Cena znana przed startem." }) });
  await section.scrollIntoViewIfNeeded();

  await expect(section.getByText("Poniżej ceny bazowe. Dokładną kwotę pod Twój zakres policzysz w kalkulatorze.")).toBeVisible();
  const tiers = section.locator("article.tier");
  await expect(tiers).toHaveCount(3);
  await expect(tiers.locator("h3")).toHaveText(["Strona start", "Strona Pro", "Sklep online"]);
  await expect(tiers.locator(".price")).toHaveText([/^od 2\s500 zł$/, /^od 3\s900 zł$/, /^od 4\s900 zł$/]);
  await expect(tiers.locator(".when")).toHaveText(["od 7 dni roboczych", "od 14 dni roboczych", "od 21 dni roboczych"]);
  await expect(section.locator("article.tier.featured .tier-tag")).toHaveText("Najczęściej wybierany");
  for (const link of await tiers.getByRole("link", { name: "Sprawdź koszt" }).all()) {
    await expect(link).toHaveAttribute("href", "/kalkulator");
  }

  const dedicated = section.locator(".tier-wide");
  await expect(dedicated.getByRole("heading", { name: "Projekt dedykowany" })).toBeVisible();
  await expect(dedicated).toContainText(/Od 6\s500 zł, od 30 dni roboczych\./);
  await expect(dedicated.getByRole("link", { name: "Umów konsultację" })).toHaveAttribute("href", "/kontakt");
  await expect(section.locator(".px-deco--stairs")).toHaveAttribute("aria-hidden", "true");
});
