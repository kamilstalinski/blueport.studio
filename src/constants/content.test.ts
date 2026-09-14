import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { HOME_TIERS, PACKAGES } from "@/constants/pricing";
import { PROCESS_STEPS, TALLY } from "@/constants/process";
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
