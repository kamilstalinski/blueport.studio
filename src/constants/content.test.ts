import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ABOUT_APPROACH, ABOUT_FOR, ABOUT_NOT_FOR, ABOUT_STORY, ABOUT_TECHS } from "@/constants/about";
import { CASE_STUDIES, isWorkSlug } from "@/constants/caseStudies";
import { HOME_TIERS, PACKAGES, PRICE_TABLE_HEADS, PRICE_TABLE_ROWS } from "@/constants/pricing";
import { PROCESS_PARTS, PROCESS_STEPS, TALLY } from "@/constants/process";
import { TESTIMONIALS } from "@/constants/testimonials";
import { HERO_WORK, WORK_SITES } from "@/constants/work";

const inPublic = (src: string): boolean => existsSync(join(process.cwd(), "public", src));

describe("WORK_SITES", () => {
  it("lists the eight client sites newest first and feeds the hero the first five", () => {
    expect(WORK_SITES.map((site) => site.slug)).toEqual(["uniqueideas", "polaqua", "dobreprecle", "spavalnia", "vilmart", "dowytrenowania", "abcmosty", "afterthesin"]);
    expect(HERO_WORK.map((site) => site.slug)).toEqual(WORK_SITES.slice(0, 5).map((site) => site.slug));
  });

  it("points at images that exist", () => {
    for (const site of WORK_SITES) {
      expect(inPublic(site.image)).toBe(true);
      expect(inPublic(site.page.src)).toBe(true);
      expect(site.page.width).toBe(820);
      expect(site.page.height).toBeGreaterThan(2000);
    }
  });

  it("carries a one- or two-sentence description for every site", () => {
    expect(WORK_SITES.map((site) => site.desc)).toEqual([
      "Strona fundacji, która organizuje salony dyskusyjne i sieć Polish Future Network. Zespół sam edytuje treści, a zgłoszenia do sieci trafiają do jednej bazy.",
      "Katalog hurtowni urządzeń do uzdatniania wody, podzielony na kategorie, po polsku i angielsku. Nowe produkty zespół dodaje sam.",
      "Strona sieci punktów z preclami: menu z alergenami, mapa lokalizacji i linki do mediów społecznościowych.",
      "Sklep WooCommerce marki streetwearowej. Ciemny projekt w stylu marki i krótka droga od produktu do płatności.",
      "Strona szczecińskiej firmy od uzdatniania wody. Zamiast zwykłego formularza kontaktu klient wypełnia formularz doboru urządzenia.",
      "Strona fizjoterapeutki i trenerki medycznej ze sklepem z poradnikami i kursami online.",
      "Pierwsza strona rodzinnej szkółki drzew, krzewów i choinek, działającej od 30 lat. Oferta w trzech grupach i lokalne SEO.",
      "Strona poznańskiego zespołu dark wave z kalendarzem koncertów, teledyskami i materiałami dla organizatorów.",
    ]);
  });
});

describe("HOME_TIERS", () => {
  it("maps three packages with one featured tier", () => {
    expect(HOME_TIERS).toHaveLength(3);
    for (const tier of HOME_TIERS) {
      expect(Object.hasOwn(PACKAGES, tier.packageId)).toBe(true);
      expect(tier.features).toHaveLength(5);
    }
    const featured = HOME_TIERS.filter((tier) => tier.featured);
    expect(featured).toHaveLength(1);
    expect(featured[0].tag).toBe("Najczęściej wybierany");
  });
});

describe("PROCESS_STEPS and TALLY", () => {
  it("numbers five steps and three figures", () => {
    expect(PROCESS_STEPS.map((step) => step.digit)).toEqual(["1", "2", "3", "4", "5"]);
    expect(TALLY.map((item) => `${item.prefix}${item.count}${item.suffix}`)).toEqual(["10+", "1-2", "24 h"]);
  });
});

describe("PROCESS_PARTS", () => {
  it("gives each of the five steps its roles, one outcome and a ruler span, with the contract as the key step", () => {
    expect(PROCESS_PARTS).toHaveLength(PROCESS_STEPS.length);
    expect(PROCESS_PARTS.filter((part) => part.key).map((part) => part.get)).toEqual(["Umowę z ceną i datą publikacji"]);
    expect(PROCESS_PARTS.slice(0, 3).reduce((days, part) => days + part.span, 0)).toBe(11); // days 0–10
  });
});

describe("TESTIMONIALS", () => {
  it("links every quote to a known site with an existing thumbnail", () => {
    const slugs = WORK_SITES.map((site) => site.slug);
    expect(TESTIMONIALS).toHaveLength(3);
    for (const testimonial of TESTIMONIALS) {
      expect(slugs).toContain(testimonial.slug);
      expect(inPublic(testimonial.thumb)).toBe(true);
    }
  });
});

describe("price table", () => {
  it("compares the three home tiers in the spec's column order", () => {
    expect(PRICE_TABLE_HEADS.map((head) => head.label)).toEqual(["Start", "Pro", "Sklep"]);
    expect(PRICE_TABLE_HEADS.map((head) => head.packageId)).toEqual(HOME_TIERS.map((tier) => tier.packageId));
  });

  it("lists the spec rows after price and delivery", () => {
    expect(PRICE_TABLE_ROWS.map((row) => row.name)).toEqual(["Liczba podstron", "Indywidualny projekt", "Płatności online", "Optymalizacja pod Google", "Wsparcie po starcie"]);
    expect(PRICE_TABLE_ROWS[1]).toEqual({ name: "Indywidualny projekt", note: "Bez gotowego szablonu.", cells: [false, true, true] });
  });
});

describe("CASE_STUDIES", () => {
  it("has one complete narrative per client site", () => {
    expect(Object.keys(CASE_STUDIES).sort()).toEqual(WORK_SITES.map((site) => site.slug).sort());
    for (const study of Object.values(CASE_STUDIES)) {
      for (const field of [study.title, study.client, study.industry, study.context, study.challenge, study.strategy, study.implementation, study.stack, study.results, study.lessons]) {
        expect(field.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("recognises only known slugs", () => {
    expect(isWorkSlug("vilmart")).toBe(true);
    expect(isWorkSlug("nie-ma")).toBe(false);
  });
});

describe("ABOUT copy", () => {
  it("keeps the O nas content shape", () => {
    expect(ABOUT_STORY).toHaveLength(3);
    expect(ABOUT_APPROACH.map((item) => item.title)).toEqual(["Cena przed rozmową", "Bezpośredni kontakt", "Strona, którą obsłużysz sam"]);
    expect(ABOUT_TECHS).toEqual(["WordPress", "WooCommerce", "Next.js"]);
    expect(ABOUT_FOR).toHaveLength(4);
    expect(ABOUT_NOT_FOR).toHaveLength(3);
  });
});
