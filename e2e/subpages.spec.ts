import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

/** Scroll through every visible reveal, then wait for all of them to rest before measuring. */
async function settle(page: Page) {
  // Every route is wrapped by app/template.tsx in a 0.35s opacity fade-in. Pages with at
  // least one .reveal element happen to outlast it while scrolling, but a page with none
  // (e.g. the legal pages) can run axe mid-fade and get a false color-contrast violation.
  await page.waitForFunction(() => {
    const wrap = document.querySelector("main")?.firstElementChild as HTMLElement | null;
    return !wrap || getComputedStyle(wrap).opacity === "1";
  });
  for (const block of await page.locator("main .reveal:visible").all()) {
    await block.scrollIntoViewIfNeeded();
  }
  await expect(page.locator("main .reveal:visible:not([data-in])")).toHaveCount(0);
  await page.waitForFunction(() =>
    [...document.querySelectorAll("main .reveal")]
      .filter((el) => el.checkVisibility())
      .every((el) => {
        const style = getComputedStyle(el);
        return style.opacity === "1" && style.transform === "none";
      })
  );
}

async function expectNoAxeViolations(page: Page) {
  await settle(page);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
}

test("the subpage stylesheets are loaded", async ({ page }) => {
  await page.goto("/kontakt");
  const sheets = await page.evaluate(() => [...document.styleSheets].flatMap((sheet) => [...sheet.cssRules].map((rule) => rule.cssText)).join("\n"));
  expect(sheets).toContain(".page-head");
  expect(sheets).toContain("kafel-px-blink");
});

test("realizacje shows all six sites as scrolling frames and ends with the CTA band", async ({ page }) => {
  await page.goto("/realizacje");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Dziesięć wdrożeń. Sześć, które możemy pokazać.");
  await expect(page.locator(".page-head .lede")).toHaveText("Najedź kursorem na dowolną, żeby przewinąć ją w całości. Bez wchodzenia na stronę klienta.");

  const frames = page.locator("main a.frame");
  await expect(frames).toHaveCount(6);
  await expect(frames.nth(0)).toHaveAttribute("href", "/realizacje/dobreprecle");
  await expect(frames.nth(5)).toHaveAttribute("href", "/realizacje/afterthesin");
  await expect(page.locator("main .wall")).toHaveCount(2);
  await expect(page.locator("main section.cta-band")).toHaveCount(1);
  await expect(page.getByText("Efekty")).toHaveCount(0);

  await expectNoAxeViolations(page);
});

test("a case study opens with the spec header and screenshot, then the full story", async ({ page }) => {
  await page.goto("/realizacje/vilmart");

  await expect(page.getByRole("link", { name: "Wszystkie realizacje" })).toHaveAttribute("href", "/realizacje");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Vilmart Water Service");
  await expect(page.locator(".page-head .lede")).toHaveText("Strona WordPress dla specjalisty od uzdatniania wody. Formularz doboru urządzenia jako główne narzędzie leadowe.");
  await expect(page.locator(".page-head .meta")).toHaveText("vilmart.pl");
  await expect(page.locator(".cs-shot img")).toHaveAttribute("alt", "Strona Vilmart Water Service");

  for (const label of ["Kontekst biznesowy", "Wyzwanie", "Strategia", "Wdrożenie", "Wyniki", "Wnioski"]) {
    await expect(page.getByRole("heading", { level: 2, name: label })).toBeVisible();
  }
  await expect(page.locator(".cs-facts")).toContainText("Klient");
  await expect(page.locator("main section.cta-band")).toHaveCount(1);

  const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(jsonLd.some((text) => text.includes('"BreadcrumbList"'))).toBe(true);

  await expectNoAxeViolations(page);
});

test("case study metadata uses the study title", async ({ page }) => {
  await page.goto("/realizacje/abcmosty");
  await expect(page).toHaveTitle(/ABC Mosty — Realizacja Blueport Studio/);
});

test("an unknown case study is a 404", async ({ page }) => {
  const response = await page.goto("/realizacje/nie-ma-takiej");
  expect(response?.status()).toBe(404);
});

test("cennik shows the tiers, the comparison table from the price list and the CTA band", async ({ page }) => {
  await page.goto("/cennik");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Ceny, które widzisz przed podpisaniem umowy.");
  await expect(page.locator(".page-head .lede").getByRole("link", { name: "kalkulatorze" })).toHaveAttribute("href", "/kalkulator");
  await expect(page.locator("main article.tier")).toHaveCount(3);

  const table = page.getByRole("table");
  await expect(table.getByRole("columnheader")).toHaveText(["Zakres", "Start", "Pro", "Sklep"]);
  await expect(table.getByRole("row").nth(1)).toContainText("2 500 zł");
  await expect(table.getByRole("row").nth(1)).toContainText("4 900 zł");
  await expect(table.getByRole("row").nth(2)).toContainText("od 14 dni roboczych");
  await expect(table.getByRole("row").nth(4).getByRole("img", { name: "Nie" })).toHaveCount(1);
  await expect(table.getByRole("row").nth(4).getByRole("img", { name: "Tak" })).toHaveCount(2);
  await expect(page.getByText("Ceny netto. Hosting i domena rozliczane bezpośrednio u dostawcy, bez naszej marży.")).toBeVisible();
  await expect(page.locator("main section.cta-band")).toHaveCount(1);

  await expectNoAxeViolations(page);
});

test("faq is a keyboard-friendly accordion with JSON-LD", async ({ page }) => {
  await page.goto("/faq");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Najczęściej zadawane pytania");
  const rows = page.locator("details.faq-row");
  await expect(rows).toHaveCount(6);
  await expect(rows.first().locator("summary")).toHaveText("Ile kosztuje strona internetowa?");
  await expect(rows.first()).not.toHaveAttribute("open", "");

  await rows.first().locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(rows.first()).toHaveAttribute("open", "");
  await expect(rows.first().getByText("Proste strony firmowe zaczynają się od 2 500 zł.", { exact: false })).toBeVisible();

  const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(jsonLd.some((text) => text.includes('"FAQPage"'))).toBe(true);
  await expect(page.locator("main section.cta-band")).toHaveCount(1);

  await expectNoAxeViolations(page);
});

test("proces expands the five home steps", async ({ page }) => {
  await page.goto("/proces");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Proces współpracy");
  const steps = page.locator("ol.process-detail > li");
  await expect(steps).toHaveCount(5);
  await expect(steps.nth(0).getByRole("heading", { level: 2 })).toHaveText("Wypełniasz kalkulator");
  await expect(steps.nth(0)).toContainText("Dzień 0");
  await expect(steps.nth(0).locator("li")).toHaveText(["wybierasz typ strony", "określasz funkcje", "otrzymujesz szacunkowy koszt"]);
  await expect(page.getByText("Całość zwykle trwa 1–2 tygodnie.")).toBeVisible();
  await expect(page.locator("main section.cta-band")).toHaveCount(1);

  await expectNoAxeViolations(page);
});

for (const legacy of ["/uslugi", "/oferta", "/oferta/strony", "/oferta/sklepy"]) {
  test(`${legacy} redirects permanently to /cennik`, async ({ request }) => {
    const response = await request.get(legacy, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers()["location"]).toMatch(/^(https?:\/\/[^/]+)?\/cennik$/);
  });
}

test.describe("kontakt form", () => {
  test("shows the spec layout and direct contact details", async ({ page }) => {
    await page.goto("/kontakt");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Napisz, co chcesz zbudować.");
    await expect(page.getByLabel("Czego potrzebujesz?").locator("option")).toHaveText(["Strona firmowa", "Sklep internetowy", "Projekt dedykowany", "Jeszcze nie wiem"]);
    await expect(page.locator("main").getByRole("link", { name: "kontakt@blueport.studio" })).toHaveAttribute("href", "mailto:kontakt@blueport.studio");
    await expect(page.locator("main").getByRole("link", { name: "+48 534 287 233" })).toHaveAttribute("href", "tel:+48534287233");
    await expect(page.locator(".contact-aside").getByRole("link", { name: "Sprawdź koszt" })).toHaveAttribute("href", "/kalkulator");
    await expect(page.locator("main section.cta-band")).toHaveCount(0);

    await expectNoAxeViolations(page);
  });

  test("validates in place and focuses the first broken field", async ({ page }) => {
    let posted = false;
    await page.route("**/api/contact", (route) => {
      posted = true;
      return route.fulfill({ json: { success: true } });
    });
    await page.goto("/kontakt");

    await page.getByLabel("Adres e-mail").fill("anna@firma");
    await page.getByRole("button", { name: "Wyślij zapytanie" }).click();

    // The error state must already be in the DOM at the moment focus lands, not after.
    await page.waitForFunction(
      () => document.activeElement?.getAttribute("aria-invalid") === "true" && !!document.getElementById("contact-name-error")
    );

    await expect(page.getByText("Podaj imię, żebyśmy wiedzieli jak się zwracać.")).toBeVisible();
    await expect(page.getByText("Ten adres e-mail wygląda na niepełny.")).toBeVisible();
    await expect(page.getByText("Napisz choć jedno zdanie o projekcie.")).toBeVisible();
    await expect(page.getByLabel("Imię")).toBeFocused();
    await expect(page.getByLabel("Imię")).toHaveAttribute("aria-invalid", "true");

    await page.getByLabel("Imię").fill("Anna");
    await expect(page.getByText("Podaj imię, żebyśmy wiedzieli jak się zwracać.")).toHaveCount(0);
    expect(posted).toBe(false);
  });

  test("sends the topic and shows the success note", async ({ page }) => {
    let body: unknown = null;
    await page.route("**/api/contact", async (route) => {
      body = route.request().postDataJSON();
      await new Promise((resolve) => setTimeout(resolve, 300));
      await route.fulfill({ json: { success: true } });
    });
    await page.goto("/kontakt");

    await page.getByLabel("Imię").fill("Anna");
    await page.getByLabel("Adres e-mail").fill("anna@firma.pl");
    await page.getByLabel("Czego potrzebujesz?").selectOption({ label: "Sklep internetowy" });
    await page.getByLabel("Wiadomość").fill("Sklep z ceramiką, około 40 produktów.");
    await page.getByRole("button", { name: "Wyślij zapytanie" }).click();

    await expect(page.getByRole("button", { name: /Wysyłamy/ })).toHaveAttribute("aria-disabled", "true");
    await expect(page.getByRole("heading", { name: "Zapytanie wysłane" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Zapytanie wysłane" })).toBeFocused();
    await expect(page.getByText("anna@firma.pl")).toBeVisible();
    expect(body).toEqual({ name: "Anna", email: "anna@firma.pl", message: "Sklep z ceramiką, około 40 produktów.", topic: "sklep" });
  });

  test("keeps the form and explains a server failure", async ({ page }) => {
    await page.route("**/api/contact", (route) => route.fulfill({ status: 500, json: { error: "Błąd wysyłki wiadomości" } }));
    await page.goto("/kontakt");

    await page.getByLabel("Imię").fill("Anna");
    await page.getByLabel("Adres e-mail").fill("anna@firma.pl");
    await page.getByLabel("Wiadomość").fill("Sklep z ceramiką, około 40 produktów.");
    await page.getByRole("button", { name: "Wyślij zapytanie" }).click();

    await expect(page.getByRole("status")).toHaveText("Coś poszło nie tak. Napisz bezpośrednio na kontakt@blueport.studio");
    await expect(page.getByRole("button", { name: "Wyślij zapytanie" })).toBeEnabled();
  });
});

test("o nas keeps the story, approach, technologies and audience", async ({ page }) => {
  await page.goto("/o-nas");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Tworzymy strony, które sprzedają. Bez chaosu.");
  for (const heading of ["Po co powstał Blueport?", "Jak pracujemy?", "Technologia dopasowana do celu", "Dla kogo jesteśmy", "Dla kogo nie jesteśmy", "Pracujemy lokalnie i zdalnie"]) {
    await expect(page.getByRole("heading", { name: heading })).toBeVisible();
  }
  await expect(page.locator(".about-cards article")).toHaveCount(3);
  await expect(page.getByRole("link", { name: "Zobacz pełny proces" })).toHaveAttribute("href", "/proces");
  await expect(page.locator("main section.cta-band")).toHaveCount(1);

  await expectNoAxeViolations(page);
});

for (const [route, title, sections] of [
  ["/polityka-prywatnosci", "Polityka prywatności", 11],
  ["/regulamin", "Regulamin", 12],
] as const) {
  test(`${route} uses the Kafel legal layout`, async ({ page }) => {
    await page.goto(route);

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
    await expect(page.locator("article.legal > section")).toHaveCount(sections);
    await expect(page.locator("article.legal [class]")).toHaveCount(0);
    expect(await page.locator("article.legal h2").first().evaluate((el) => getComputedStyle(el).fontFamily)).toMatch(/Bricolage/);
    await expect(page.locator("main section.cta-band")).toHaveCount(0);

    await expectNoAxeViolations(page);
  });
}
