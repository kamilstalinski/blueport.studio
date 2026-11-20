import { describe, expect, it } from "vitest";
import { calculatePrice, getFeaturesForPackage, type FeatureId, type PackageId, type TimelineId } from "@/constants/pricing";

describe("getFeaturesForPackage", () => {
  it("offers only the universal add-ons to strona-start", () => {
    expect(getFeaturesForPackage("strona-start")).toEqual(["seo-advanced", "copywriting", "blog", "language-version", "performance-upgrade"]);
  });

  it("offers every shop add-on to sklep-online", () => {
    expect(getFeaturesForPackage("sklep-online")).toEqual([
      "seo-advanced", "copywriting", "blog", "language-version",
      "product-filters", "product-variants", "abandoned-cart", "loyalty-program", "wholesaler-feed",
      "crm", "mail-automation", "integrations-api", "erp", "performance-upgrade",
    ]);
  });
});

describe("calculatePrice", () => {
  const cases: Array<[string, PackageId, FeatureId[], TimelineId, { base: number; featuresTotal: number; total: number; label: string }]> = [
    ["bare package", "strona-start", [], "standard", { base: 2500, featuresTotal: 0, total: 2500, label: "od 2500 zł" }],
    ["rounds to the nearest 100", "strona-pro", ["crm"], "standard", { base: 3900, featuresTotal: 650, total: 4600, label: "od 4600 zł" }],
    ["ignores a feature the package does not offer", "strona-start", ["erp"], "standard", { base: 2500, featuresTotal: 0, total: 2500, label: "od 2500 zł" }],
    ["clamps to the 2500 minimum", "strona-start", [], "relaxed", { base: 2500, featuresTotal: 0, total: 2500, label: "od 2500 zł" }],
    ["sums every shop add-on", "sklep-online", getFeaturesForPackage("sklep-online"), "standard", { base: 4900, featuresTotal: 13100, total: 18000, label: "od 18 000 zł" }],
    ["applies the express multiplier", "projekt-dedykowany", getFeaturesForPackage("projekt-dedykowany"), "express", { base: 6500, featuresTotal: 9800, total: 21200, label: "od 21 200 zł" }],
  ];

  it.each(cases)("%s", (_name, packageId, features, timeline, expected) => {
    expect(calculatePrice(packageId, features, timeline)).toEqual(expected);
  });
});
