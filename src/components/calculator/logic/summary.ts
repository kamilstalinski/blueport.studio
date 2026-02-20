/**
 * Summary generation: project description, estimate, breakdown, timeline, qualification tags.
 * Pure functions – no UI.
 */

import type {
  CalculatorState,
  SummaryResult,
  PriceBreakdownItem,
  ProjectType,
  EstimateResult,
} from "@/types";
import { computePrice } from "./pricingEngine";
import {
  BASE_PRICES,
  getPagesCostRange,
  getExtraPagesCount,
  getProductsCostRange,
  getExtraProductsCount,
} from "./constants";
import { getFeatureCost, getFeatureLabel, INTEGRATION_OPTIONS, PROJECT_TYPE_OPTIONS, PRIORITY_OPTIONS } from "./calculatorOptions";

const PAGE_PROJECT_TYPES = ["wordpress-standard", "wordpress-pro", "nextjs"] as const;
const PRODUCT_PROJECT_TYPES = ["woocommerce-start", "woocommerce-pro"] as const;

function projectTypeLabel(type: NonNullable<ProjectType>): string {
  const opt = PROJECT_TYPE_OPTIONS.find((o) => o.id === type);
  return opt?.title ?? String(type);
}

/**
 * Estimated timeline from state (fixed per type + urgency).
 */
export function estimateTimeline(state: CalculatorState): string {
  const type = state.projectType;
  const express = state.urgency === "express";

  if (!type) return "–";

  if (express) {
    if (type === "wordpress-standard" || type === "wordpress-pro") return "ok. 1 tydzień";
    if (type === "woocommerce-start" || type === "woocommerce-pro") return "ok. 1–2 tygodnie";
    return "ok. 2 tygodnie";
  }

  if (type === "wordpress-standard" || type === "wordpress-pro") return "1–2 tygodnie";
  if (type === "woocommerce-start" || type === "woocommerce-pro") return "ok. 2 tygodnie";
  return "2–4 tygodnie";
}

/**
 * Returns a short, formatted project description from state.
 * Format: "[Nazwa pakietu], [scopeCount] [podstron/produktów], [features], [n] [język/języki], [n] [integracje], tryb [standard/ekspres]. Priorytet klienta: [label]."
 */
export function formatProjectDescription(state: CalculatorState): string {
  const parts: string[] = [];

  if (!state.projectType) return "Brak opisu";

  parts.push(projectTypeLabel(state.projectType));

  if (state.scopeUnit === "pages" && state.scopeCount > 0) {
    parts.push(`${state.scopeCount} ${state.scopeCount === 1 ? "podstrona" : "podstron"}`);
  } else if (state.scopeUnit === "products" && state.scopeCount > 0) {
    parts.push(`${state.scopeCount} ${state.scopeCount === 1 ? "produkt" : "produktów"}`);
  }

  if (state.features.length > 0) {
    const featureLabels = state.features.map((id) => getFeatureLabel(id));
    parts.push(featureLabels.join(", "));
  } else {
    parts.push("bez dodatków");
  }

  const langCount = state.languageCount;
  parts.push(langCount === 1 ? "1 język" : `${langCount} ${langCount < 5 ? "języki" : "języków"}`);

  const intCount = state.integrations.length;
  parts.push(intCount === 0 ? "0 integracji" : intCount === 1 ? "1 integracja" : `${intCount} integracje`);

  parts.push(state.urgency === "express" ? "tryb ekspres" : "tryb standard");

  let result = parts.join(", ") + ".";
  if (state.projectPriority) {
    const priorityLabel = PRIORITY_OPTIONS.find((o) => o.value === state.projectPriority)?.label;
    if (priorityLabel) result += ` Priorytet klienta: ${priorityLabel}.`;
  }
  return result;
}

/**
 * Returns price estimate from current state (PriceEstimate shape for API compat).
 */
export function getPriceEstimate(state: CalculatorState): { minPrice: number; maxPrice: number } {
  const result = computePrice(state);
  return { minPrice: result.min, maxPrice: result.max };
}

/** Alias for estimateTimeline (used by buildSummary). */
export function getEstimatedTimeline(state: CalculatorState): string {
  return estimateTimeline(state);
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
export function getQualificationTags(state: CalculatorState, estimate: EstimateResult): string[] {
  const { projectType, scopeUnit, scopeCount, features, languageCount, integrations, urgency, projectPriority } = state;
  const tags: string[] = [];

  if (projectType === "nextjs") tags.push("lead-premium");
  if (projectType === "woocommerce-pro") tags.push("lead-premium");
  if (scopeUnit === "products" && scopeCount > 50) tags.push("large-catalog");
  if (scopeUnit === "pages" && scopeCount > 15) tags.push("large-scope");
  if (features.includes("automation")) tags.push("automation-interest");
  if (features.includes("booking")) tags.push("booking-interest");
  if (features.includes("wholesaler-feed")) tags.push("wholesaler");
  if (languageCount >= 3) tags.push("multilingual-heavy");
  if (integrations.length >= 3) tags.push("integration-heavy");
  if (integrations.includes("erp") || integrations.includes("pos")) tags.push("enterprise-integration");
  if (urgency === "express") tags.push("urgent");
  if (projectPriority === "quality") tags.push("budget-flexible");
  if (projectPriority === "price") tags.push("price-sensitive");
  if (projectPriority === "speed") tags.push("time-sensitive");
  if (projectPriority === "feature") tags.push("technical-buyer");
  if (estimate.min > 10000) tags.push("high-value");
  if (estimate.min > 18000) tags.push("high-value-xl");
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
  const qualificationTags = getQualificationTags(state, priceResult);

  return {
    projectDescription,
    estimate,
    breakdown,
    estimatedTimeline,
    qualificationTags,
  };
}
