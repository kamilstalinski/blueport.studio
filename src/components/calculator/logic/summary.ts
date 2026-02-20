/**
 * Summary generation: project description, estimate, breakdown, timeline, qualification tags.
 * Pure functions – no UI.
 */

import type {
  CalculatorState,
  SummaryResult,
  PriceBreakdownItem,
  ProjectType,
} from "@/types";
import { computePrice } from "./pricingEngine";
import {
  BASE_PRICES,
  getPagesCostRange,
  getExtraPagesCount,
  getProductsCostRange,
  getExtraProductsCount,
} from "./constants";
import { getFeatureCost, getFeatureLabel, INTEGRATION_OPTIONS, PROJECT_TYPE_OPTIONS } from "./calculatorOptions";

const PAGE_PROJECT_TYPES = ["wordpress-standard", "wordpress-pro", "nextjs"] as const;
const PRODUCT_PROJECT_TYPES = ["woocommerce-start", "woocommerce-pro"] as const;

function projectTypeLabel(type: NonNullable<ProjectType>): string {
  const opt = PROJECT_TYPE_OPTIONS.find((o) => o.id === type);
  return opt?.title ?? String(type);
}

/** Timeline matrix [projectType][urgency] */
const TIMELINE_MATRIX: Record<NonNullable<ProjectType>, Record<"standard" | "express", string>> = {
  "wordpress-standard": { standard: "2–3 tygodnie", express: "1–2 tygodnie" },
  "wordpress-pro": { standard: "3–5 tygodni", express: "2–3 tygodnie" },
  "woocommerce-start": { standard: "3–4 tygodnie", express: "2–3 tygodnie" },
  "woocommerce-pro": { standard: "5–8 tygodni", express: "3–5 tygodni" },
  nextjs: { standard: "6–10 tygodni", express: "4–6 tygodni" },
};

/**
 * Returns a short, formatted project description from state.
 */
export function formatProjectDescription(state: CalculatorState): string {
  const parts: string[] = [];

  if (state.projectType) {
    parts.push(projectTypeLabel(state.projectType));
  }
  if (
    state.projectType &&
    PAGE_PROJECT_TYPES.includes(state.projectType as (typeof PAGE_PROJECT_TYPES)[number]) &&
    state.scopeUnit === "pages" &&
    state.scopeCount > 0
  ) {
    parts.push(`ok. ${state.scopeCount} podstron`);
  }
  if (
    state.projectType &&
    PRODUCT_PROJECT_TYPES.includes(state.projectType as (typeof PRODUCT_PROJECT_TYPES)[number]) &&
    state.scopeUnit === "products" &&
    state.scopeCount > 0
  ) {
    parts.push(`ok. ${state.scopeCount} produktów`);
  }
  if (state.features.length > 0) {
    parts.push(`funkcje: ${state.features.join(", ")}`);
  }
  if (state.integrations.length > 0) {
    parts.push(`integracje: ${state.integrations.length}`);
  }
  if (state.urgency === "express") {
    parts.push("tryb ekspres");
  }

  return parts.length > 0 ? parts.join(" · ") : "Brak opisu";
}

/**
 * Returns price estimate from current state (PriceEstimate shape for API compat).
 */
export function getPriceEstimate(state: CalculatorState): { minPrice: number; maxPrice: number } {
  const result = computePrice(state);
  return { minPrice: result.min, maxPrice: result.max };
}

/**
 * Returns estimated timeline string from state.
 */
export function getEstimatedTimeline(state: CalculatorState): string {
  const { projectType, urgency } = state;
  if (!projectType) return "–";
  const row = TIMELINE_MATRIX[projectType];
  return row?.[urgency] ?? "–";
}

/**
 * Returns a simple breakdown (base + modifiers) for display.
 */
export function getPriceBreakdown(state: CalculatorState): PriceBreakdownItem[] {
  const { projectType, scopeUnit, scopeCount, features, languageCount, integrations, urgency } = state;
  const breakdown: PriceBreakdownItem[] = [];

  if (!projectType) return breakdown;

  const base = BASE_PRICES[projectType];
  breakdown.push({
    label: `Pakiet bazowy — ${projectTypeLabel(projectType)}`,
    min: base.min,
    max: base.max,
  });

  if (scopeUnit === "pages" && PAGE_PROJECT_TYPES.includes(projectType as (typeof PAGE_PROJECT_TYPES)[number])) {
    const extraPages = getExtraPagesCount(scopeCount, projectType);
    if (extraPages > 0) {
      const range = getPagesCostRange(extraPages);
      breakdown.push({
        label: `Dodatkowe podstrony (${extraPages} szt.)`,
        min: range.min,
        max: range.max,
      });
    }
  }

  if (scopeUnit === "products" && PRODUCT_PROJECT_TYPES.includes(projectType as (typeof PRODUCT_PROJECT_TYPES)[number])) {
    const extraProducts = getExtraProductsCount(scopeCount, projectType as "woocommerce-start" | "woocommerce-pro");
    if (extraProducts > 0) {
      const range = getProductsCostRange(extraProducts);
      breakdown.push({
        label: `Konfiguracja produktów (${extraProducts} szt.)`,
        min: range.min,
        max: range.max,
      });
    }
  }

  for (const id of features) {
    const cost = getFeatureCost(id);
    if (cost) {
      breakdown.push({
        label: getFeatureLabel(id),
        min: cost.min,
        max: cost.max,
      });
    }
  }

  if (languageCount > 1) {
    const langCost = languageCount >= 4 ? { min: 2000, max: 3200 } : languageCount === 3 ? { min: 1400, max: 2200 } : { min: 700, max: 1200 };
    breakdown.push({
      label: `Wielojęzyczność — ${languageCount} języki`,
      min: langCost.min,
      max: langCost.max,
    });
  }

  if (integrations.length > 0) {
    const byId = new Map(INTEGRATION_OPTIONS.map((i) => [i.id, { min: i.minCost, max: i.maxCost }]));
    let intMin = 0;
    let intMax = 0;
    for (const id of integrations) {
      const c = byId.get(id);
      if (c) {
        intMin += c.min;
        intMax += c.max;
      }
    }
    breakdown.push({
      label: `Integracje (${integrations.length} szt.)`,
      min: intMin,
      max: intMax,
    });
  }

  if (urgency === "express") {
    breakdown.push({
      label: "Tryb ekspres (+20–30%)",
      min: 0,
      max: 0,
    });
  }

  return breakdown;
}

/**
 * Qualification tags for lead/CRM from state and estimate.
 */
export function getQualificationTags(state: CalculatorState, estimateMin: number): string[] {
  const tags: string[] = [];
  if (state.projectType === "nextjs") tags.push("lead-premium");
  if (state.projectType === "woocommerce-pro") tags.push("lead-premium");
  if (state.scopeUnit === "products" && state.scopeCount > 50) tags.push("large-catalog");
  if (state.languageCount >= 3) tags.push("multilingual-heavy");
  if (state.features.includes("automation")) tags.push("automation-interest");
  if (state.urgency === "express") tags.push("urgent");
  if (state.integrations.length >= 3) tags.push("integration-heavy");
  if (estimateMin > 12000) tags.push("high-value");
  return tags;
}

/**
 * Full summary: description + estimate + breakdown + timeline + qualificationTags.
 */
export function buildSummary(state: CalculatorState): SummaryResult {
  const priceResult = computePrice(state);
  const estimate = { minPrice: priceResult.min, maxPrice: priceResult.max };
  const breakdown = getPriceBreakdown(state);
  const projectDescription = formatProjectDescription(state);
  const estimatedTimeline = getEstimatedTimeline(state);
  const qualificationTags = getQualificationTags(state, priceResult.min);

  return {
    projectDescription,
    estimate,
    breakdown,
    estimatedTimeline,
    qualificationTags,
  };
}
