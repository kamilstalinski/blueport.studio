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
