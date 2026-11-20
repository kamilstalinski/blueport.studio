import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { WORK_SITES } from "@/constants/work";

describe("sitemap", () => {
  it("lists the static routes, then every case study", () => {
    expect(sitemap().map(({ url, priority, changeFrequency }) => ({ url, priority, changeFrequency }))).toEqual([
      { url: "https://blueport.studio", priority: 1.0, changeFrequency: "weekly" },
      { url: "https://blueport.studio/cennik", priority: 0.9, changeFrequency: "monthly" },
      { url: "https://blueport.studio/realizacje", priority: 0.85, changeFrequency: "weekly" },
      { url: "https://blueport.studio/kontakt", priority: 0.8, changeFrequency: "yearly" },
      { url: "https://blueport.studio/o-nas", priority: 0.75, changeFrequency: "monthly" },
      { url: "https://blueport.studio/proces", priority: 0.75, changeFrequency: "monthly" },
      { url: "https://blueport.studio/faq", priority: 0.7, changeFrequency: "monthly" },
      { url: "https://blueport.studio/wycena", priority: 0.7, changeFrequency: "monthly" },
      ...WORK_SITES.map(({ slug }) => ({ url: `https://blueport.studio/realizacje/${slug}`, priority: 0.7, changeFrequency: "monthly" })),
    ]);
  });

  it("has one entry per case study", () => {
    expect(WORK_SITES).toHaveLength(6);
  });
});

describe("robots", () => {
  it("blocks the noindex calculator URL, legal pages and the API", () => {
    expect(robots()).toEqual({
      rules: [{ userAgent: "*", allow: "/", disallow: ["/kalkulator", "/polityka-prywatnosci", "/regulamin", "/api/"] }],
      sitemap: "https://blueport.studio/sitemap.xml",
    });
  });
});
