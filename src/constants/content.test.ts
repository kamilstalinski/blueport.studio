import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ABOUT_APPROACH, ABOUT_FOR, ABOUT_NOT_FOR, ABOUT_STORY, ABOUT_TECHS } from "@/constants/about";
import { CASE_STUDIES, isWorkSlug } from "@/constants/caseStudies";
import { HOME_TIERS, PACKAGES, PRICE_TABLE_HEADS, PRICE_TABLE_ROWS } from "@/constants/pricing";
import { PROCESS_DETAILS, PROCESS_STEPS, TALLY } from "@/constants/process";
import { TESTIMONIALS } from "@/constants/testimonials";
import { HERO_WORK, WORK_SITES } from "@/constants/work";

const inPublic = (src: string): boolean => existsSync(join(process.cwd(), "public", src));

describe("WORK_SITES", () => {
  it("lists the six client sites in the spec order and feeds the hero the first five", () => {
    expect(WORK_SITES.map((site) => site.slug)).toEqual(["dobreprecle", "spavalnia", "vilmart", "dowytrenowania", "abcmosty", "afterthesin"]);
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

  it("carries the spec's one-sentence description for every site", () => {
    expect(WORK_SITES.map((site) => site.desc)).toEqual([
      "Strona Next.js dla sieci punktów z tradycyjnymi preclami. Menu, lokalizacje, integracja z social media.",
      "Sklep internetowy dla marki streetwearowej. Ciemny design oddający klimat marki, sprawna ścieżka zakupowa, integracja z WooCommerce.",
      "Strona WordPress dla specjalisty od uzdatniania wody. Formularz doboru urządzenia jako główne narzędzie leadowe.",
      "Strona WordPress + WooCommerce dla magistra fizjoterapii i trenerki medycznej. Sklep z poradnikami i kursami, SEO lokalne.",
      "Wizytówka WordPress dla rodzinnej szkółki drzew i krzewów ozdobnych. Nowa obecność online, wzrost zapytań B2B.",
      "Strona WordPress dla poznańskiego zespołu dark wave. Klimatyczny design, kalendarz koncertów, integracja z teledyskami.",
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

describe("PROCESS_DETAILS", () => {
  it("adds three legacy bullets to each of the five steps", () => {
    expect(PROCESS_DETAILS).toHaveLength(PROCESS_STEPS.length);
    expect(PROCESS_DETAILS[0]).toEqual(["wybierasz typ strony", "określasz funkcje", "otrzymujesz szacunkowy koszt"]);
    expect(PROCESS_DETAILS[4]).toEqual(["konfiguracja serwera", "podpięcie domeny", "szkolenie z obsługi"]);
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
  it("keeps the legacy O nas content", () => {
    expect(ABOUT_STORY).toHaveLength(3);
    expect(ABOUT_APPROACH.map((item) => item.title)).toEqual(["Konkret zamiast chaosu", "Jasna wycena", "Małe studio = pełna odpowiedzialność"]);
    expect(ABOUT_TECHS).toEqual(["WordPress", "WooCommerce", "Next.js"]);
    expect(ABOUT_FOR).toHaveLength(4);
    expect(ABOUT_NOT_FOR).toHaveLength(3);
  });
});
