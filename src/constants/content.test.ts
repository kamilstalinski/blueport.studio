import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ABOUT_CLIENTS, ABOUT_NOT_FOR, ABOUT_STORY, ABOUT_TECHS } from "@/constants/about";
import { CASE_STUDIES, isWorkSlug } from "@/constants/caseStudies";
import { HOME_TIERS, PACKAGES, PRICE_TABLE_HEADS, PRICE_TABLE_ROWS } from "@/constants/pricing";
import { PROCESS_CHAPTERS, PROCESS_STEPS, TALLY } from "@/constants/process";
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
    for (const site of WORK_SITES) {
      expect(site.desc.length).toBeGreaterThan(0);
      expect(site.desc.split(/(?<=\.)\s/).length).toBeLessThanOrEqual(2);
      expect(site.desc).not.toMatch(/zł/);
    }
  });
});

describe("CASE_STUDIES seo", () => {
  it("gives every study a title that fits 60 chars with the layout suffix and a 140-160 char description", () => {
    for (const study of Object.values(CASE_STUDIES)) {
      expect(study.seo.title.length, study.seo.title).toBeLessThanOrEqual(42);
      expect(study.seo.description.length, study.seo.description).toBeGreaterThanOrEqual(140);
      expect(study.seo.description.length, study.seo.description).toBeLessThanOrEqual(160);
    }
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

describe("PROCESS_CHAPTERS", () => {
  it("tells the process in four chapters, one visual each, from the first message to launch", () => {
    expect(PROCESS_CHAPTERS.map((chapter) => chapter.when)).toEqual(["Dzień 0", "Dzień 1", "Dni 2–10", "Start"]);
    expect(new Set(PROCESS_CHAPTERS.map((chapter) => chapter.visual)).size).toBe(4);
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
  it("ties every tool and every trade to a real client site", () => {
    expect(ABOUT_STORY).toHaveLength(3);
    expect(ABOUT_TECHS.map((tech) => tech.name)).toEqual(["WordPress", "WooCommerce", "Next.js"]);
    const slugs: readonly string[] = WORK_SITES.map((site) => site.slug);
    for (const tech of ABOUT_TECHS) {
      expect(inPublic(tech.icon)).toBe(true);
      for (const slug of tech.sites) expect(slugs).toContain(slug);
    }
    for (const client of ABOUT_CLIENTS) expect(slugs).toContain(client.site);
    expect(ABOUT_NOT_FOR).toHaveLength(2);
  });
});
