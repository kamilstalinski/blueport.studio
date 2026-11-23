import { describe, expect, it } from "vitest";
import { isWorkSlug } from "@/constants/caseStudies";
import { PACKAGES } from "@/constants/pricing";
import { getService, priceLabel, SERVICES } from "@/constants/services";
import { isContactTopic } from "@/lib/contactValidation";

describe("SERVICES", () => {
  it("has four unique slugs in hub order", () => expect(SERVICES.map((s) => s.slug)).toEqual(["strony-www", "sklepy-internetowe", "reklamy-meta-google", "wdrozenia-ai"]));
  it("maps every service to a valid contact topic", () => expect(SERVICES.every((s) => isContactTopic(s.topic))).toBe(true));
  it("takes www and shop prices from the packages", () => {
    expect(getService("strony-www")!.priceFrom).toBe(PACKAGES["strona-start"].basePrice);
    expect(getService("sklepy-internetowe")!.priceFrom).toBe(PACKAGES["sklep-online"].basePrice);
  });
  it("puts the dedicated project on the www page", () => expect(getService("strony-www")!.packages).toContain("projekt-dedykowany"));
  it("groups AI apart", () => expect(SERVICES.filter((s) => s.group === "automatyzacja").map((s) => s.slug)).toEqual(["wdrozenia-ai"]));
  it("proves www and shop with real work only", () => {
    for (const s of SERVICES.filter((x) => x.proof.kind === "work")) expect((s.proof as { slugs: readonly string[] }).slugs.every(isWorkSlug)).toBe(true);
  });
  it("keeps 3–5 FAQ per service", () => expect(SERVICES.every((s) => s.faq.length >= 3 && s.faq.length <= 5)).toBe(true));
  it("labels a missing price without a number", () => expect(priceLabel({ ...SERVICES[3], priceFrom: null })).toBe("Wycena po rozmowie"));
  it("formats a monthly price", () => expect(priceLabel({ ...SERVICES[2], priceFrom: 900, priceUnit: "/ mies." })).toBe("od 900 zł / mies."));
  it("returns undefined for an unknown slug", () => expect(getService("xyz")).toBeUndefined());
  // e2e checks the rendered page metas; this catches it at the source
  it("keeps price wording out of the metas", () => {
    for (const s of SERVICES) expect(`${s.metaTitle} ${s.metaDescription}`).not.toMatch(/zł|cennik|koszt/i);
  });
});
