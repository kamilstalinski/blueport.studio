import { describe, expect, it } from "vitest";
import { buildSummary } from "@/components/calculator/logic/summary";

const contact = { name: "", email: "", phone: "" };

describe("buildSummary", () => {
  it("returns an empty summary without a package", () => {
    expect(buildSummary({ packageId: null, features: [], timeline: "standard", projectPriority: null, ...contact })).toEqual({
      packageName: "",
      total: 0,
      label: "od 0 zł",
      base: 0,
      featuresTotal: 0,
      breakdown: [],
      estimatedTimeline: "",
      qualificationTags: [],
      projectDescription: "",
    });
  });

  it("describes an express premium lead with its priority", () => {
    expect(buildSummary({ packageId: "projekt-dedykowany", features: ["crm", "headless-cms"], timeline: "express", projectPriority: "quality", ...contact })).toEqual({
      packageName: "Dedykowany [Next.js / React]",
      total: 11800,
      label: "od 11 800 zł",
      base: 6500,
      featuresTotal: 2550,
      breakdown: [
        { label: "Pakiet bazowy — Dedykowany [Next.js / React]", price: 6500 },
        { label: "CRM", price: 650 },
        { label: "Headless CMS", price: 1900 },
        { label: "Tryb realizacji — Ekspresowo", price: 2750 },
      ],
      estimatedTimeline: "7 dni roboczych",
      qualificationTags: ["lead-premium", "crm-interest", "headless-interest", "urgent", "budget-flexible", "high-value"],
      projectDescription: "Dedykowany [Next.js / React], dodatki: CRM, Headless CMS, tryb: Ekspresowo, wycena: od 11 800 zł. Priorytet klienta: Najwyższa jakość.",
    });
  });

  // Current behaviour, recorded on purpose: a feature the package does not offer is excluded from the
  // total but still listed in the breakdown, tags and description. Plan B recomputes the summary server-side.
  it("lists an unavailable feature in the breakdown while leaving the total unchanged", () => {
    expect(buildSummary({ packageId: "strona-start", features: ["erp"], timeline: "standard", projectPriority: null, ...contact })).toEqual({
      packageName: "Strona start [WordPress]",
      total: 2500,
      label: "od 2500 zł",
      base: 2500,
      featuresTotal: 0,
      breakdown: [
        { label: "Pakiet bazowy — Strona start [WordPress]", price: 2500 },
        { label: "ERP", price: 1850 },
      ],
      estimatedTimeline: "od 7 dni roboczych",
      qualificationTags: ["enterprise-integration"],
      projectDescription: "Strona start [WordPress], dodatki: ERP, tryb: Standardowo, wycena: od 2500 zł. Priorytet klienta: nie podano.",
    });
  });
});
