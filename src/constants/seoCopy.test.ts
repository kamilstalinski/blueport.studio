import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/** Content pages carry no price wording (spec: docs/superpowers/specs/2026-11-23-seo-copy-design.md). /cennik, the calculator and the package cards are out of scope. */
const SCOPED_FILES = [
  "src/app/layout.tsx",
  "src/lib/jsonLd.ts",
  "src/app/o-nas/page.tsx",
  "src/app/realizacje/page.tsx",
  "src/app/realizacje/[slug]/page.tsx",
  "src/app/proces/page.tsx",
  "src/app/kontakt/page.tsx",
  "src/app/faq/page.tsx",
  "src/components/sections/HeroHome.tsx",
  "src/components/sections/home/CtaBand.tsx",
  "src/components/sections/home/HomeOffer.tsx",
  "src/components/sections/home/ProcessSection.tsx",
  "src/components/sections/home/PlanSection.tsx",
  "src/components/sections/home/WorkWall.tsx",
  "src/components/sections/home/LiveDomains.tsx",
  "src/components/sections/home/QuotesSection.tsx",
  "src/components/pages/AboutStatement.tsx",
  "src/components/pages/ProcessDetail.tsx",
  "src/components/pages/ProcessAround.tsx",
  "src/components/pages/CaseStudyStory.tsx",
  "src/components/pages/FaqList.tsx",
  "src/components/pages/PageHead.tsx",
  "src/constants/about.ts",
  "src/constants/process.ts",
  "src/constants/faq.ts",
  "src/constants/caseStudies.ts",
  "src/constants/work.ts",
  "src/constants/contact.ts",
];

// the contract illustration on /proces is a picture and keeps its figure; the LocalBusiness schema keeps priceRange
const ALLOWED = ["3 900 zł netto", 'priceRange: "2500–28000 zł"'];

// "zł" as a standalone word ("złoża", "znalazł" pass); \b would not work, JS treats ł as a non-word character
const PRICE_WORDING = /(?<![a-ząćęłńóśźż])zł(?![a-ząćęłńóśźż])|cennik|ile kosztuj|\bkoszt|START_PRICE|basePrice|formatPrice/i;

describe("content pages without price wording", () => {
  it.each(SCOPED_FILES)("%s", (file) => {
    let source = readFileSync(join(process.cwd(), file), "utf8");
    for (const allowed of ALLOWED) source = source.replaceAll(allowed, "");
    const lines = source.split("\n").filter((line) => !line.trimStart().startsWith("import "));
    const hits = lines.filter((line) => PRICE_WORDING.test(line));
    expect(hits).toEqual([]);
  });
});
