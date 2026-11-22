import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const DOMAINS = ["uniqueideasfoundation.pl", "polaquagroup.eu", "dobreprecle.pl", "spavalnia.pl", "vilmart.pl", "dowytrenowania.pl", "abcmosty.pl", "afterthesin.com"];
/* Polaqua serves plain http until it moves to polaquagroup.com */
const HREFS: Record<string, string> = { "polaquagroup.eu": "http://polaquagroup.eu" };

test("the client domains link out to the eight live sites", async ({ page }) => {
  await page.goto("/");
  const links = page.locator(".bp-domains a");
  await expect(links).toHaveText(DOMAINS);
  for (const [index, domain] of DOMAINS.entries()) {
    await expect(links.nth(index)).toHaveAttribute("href", HREFS[domain] ?? `https://${domain}`);
    await expect(links.nth(index)).toHaveAttribute("rel", "noopener noreferrer");
  }
});

const section = (page: import("@playwright/test").Page, heading: string) =>
  page.locator("section", { has: page.getByRole("heading", { name: heading, exact: true }) });

test("the work list swaps the browser window to the chosen site", async ({ page }) => {
  await page.goto("/");
  const works = section(page, "Trzy ostatnie realizacje");
  await works.scrollIntoViewIfNeeded();

  const items = works.locator(".bp-work-item");
  await expect(items.locator("h3")).toHaveText(["Unique Ideas Foundation", "Polaqua Group", "Dobre Precle"]);
  await expect(items.first()).toHaveAttribute("aria-pressed", "true");
  await expect(works.locator("#work-uniqueideas")).toBeVisible();

  await items.nth(1).click();
  await expect(items.nth(1)).toHaveAttribute("aria-pressed", "true");
  await expect(works.locator("#work-polaqua")).toHaveAttribute("href", "/realizacje/polaqua");
  await expect(works.locator("#work-uniqueideas")).toHaveAttribute("inert", "");
  await expect(works.getByRole("link", { name: "Wszystkie realizacje" })).toHaveAttribute("href", "/realizacje");
});

test("the plan section argues with a traced page plan", async ({ page }) => {
  await page.goto("/");
  const plan = section(page, "Większość stron dla małych firm powstaje bez planu. Potem nie sprzedaje.");
  await plan.scrollIntoViewIfNeeded();

  await expect(plan.locator(".bp-fixes s")).toHaveText(["Nie widać Cię w Google", "Strona ładuje się wieki", "Nikt się nie kontaktuje"]);
  await expect(plan.locator(".bp-fixes b")).toHaveText([
    "Struktura i treść pisane pod wyszukiwanie lokalne",
    "Optymalizacja szybkości przed publikacją",
    "Formularz i ścieżka kontaktu w centrum układu",
  ]);
  await expect(plan.getByRole("img", { name: /Schemat strony/ })).toBeVisible();
  // the transition can land on a float residue such as 1.4e-11px, so compare with a tolerance
  await expect.poll(() => plan.locator(".bp-route").evaluate((el) => Math.abs(parseFloat(getComputedStyle(el).strokeDashoffset)))).toBeLessThan(0.5);
});

test("pricing shows three packages from the price list and the dedicated project", async ({ page }) => {
  await page.goto("/");
  const pricing = section(page, "Trzy pakiety. Cena znana przed startem.");
  await pricing.scrollIntoViewIfNeeded();

  const plans = pricing.locator("article.bp-plan-col");
  await expect(plans.locator("h3")).toHaveText(["Strona start", "Strona Pro", "Sklep online"]);
  await expect(plans.locator(".bp-price")).toHaveText([/^od2\s500\szł$/, /^od3\s900\szł$/, /^od4\s900\szł$/]);
  await expect(plans.locator(".bp-days")).toHaveText(["od 7 dni roboczych", "od 14 dni roboczych", "od 21 dni roboczych"]);
  await expect(pricing.locator(".bp-is-top .bp-pick")).toHaveText("Najczęściej wybierany");
  await expect(pricing.locator(".bp-custom")).toContainText("Projekt dedykowany");
  await expect(pricing.getByRole("link", { name: /Otwórz kalkulator/ })).toHaveAttribute("href", "/kalkulator");
});

test("the process lists five steps with their days", async ({ page }) => {
  await page.goto("/");
  const process = section(page, "Od zapytania do startu");
  await expect(process.locator(".bp-steps h3")).toHaveText([
    "Wypełniasz kalkulator",
    "Doprecyzowujemy",
    "Projekt i wdrożenie",
    "Testy i poprawki",
    "Publikacja i szkolenie",
  ]);
  await expect(process.locator(".bp-day")).toHaveText(["Dzień 0", "Dzień 1", "Dzień 2–10", "Przed startem", "Start"]);
});

test("testimonials quote three named clients over the three facts", async ({ page }) => {
  await page.goto("/");
  const quotes = section(page, "Opinie klientów");
  await expect(quotes.locator("blockquote")).toHaveCount(3);
  await expect(quotes.locator("figcaption b")).toHaveText(["Kamil Głogowski", "Igor Romanowski", "Andrzej Szymko"]);
  await expect(quotes.locator(".bp-facts b")).toHaveText(["10+", "1–2", "24 h"]);
});

test("the close repeats the calculator and consultation links", async ({ page }) => {
  await page.goto("/");
  const close = page.locator("section.bp-close");
  await expect(close.getByRole("heading", { level: 2 })).toHaveText("Sprawdź, ile kosztuje Twoja strona.");
  await expect(close.getByRole("link", { name: "Sprawdź koszt" })).toHaveAttribute("href", "/kalkulator");
  await expect(close.getByRole("link", { name: "Umów konsultację" })).toHaveAttribute("href", "/kontakt");
});

test("the home page follows the section order and nothing else", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("main h2")).toHaveText([
    "Trzy ostatnie realizacje",
    "Większość stron dla małych firm powstaje bez planu. Potem nie sprzedaje.",
    "Trzy pakiety. Cena znana przed startem.",
    "Od zapytania do startu",
    "Opinie klientów",
    "Sprawdź, ile kosztuje Twoja strona.",
  ]);
});

test("the whole home page has no axe violations", async ({ page }) => {
  await page.goto("/");
  // generous wait: CI renders the Grainient in software, which slows the hero timers (see hero.spec.ts)
  await expect(page.locator("section#hero .bp-pane")).toHaveAttribute("data-stage", "3", { timeout: 20000 });
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
