/**
 * Summary generation: project description, estimate, breakdown.
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
  FEATURE_COSTS,
  INTEGRATION_COSTS,
} from "./constants";

const PAGE_PROJECT_TYPES = ["wordpress-standard", "wordpress-pro", "nextjs"] as const;
const PRODUCT_PROJECT_TYPES = ["woocommerce-start", "woocommerce-pro"] as const;

const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  "wordpress-standard": "Strona firmowa Standard",
  "wordpress-pro": "Strona firmowa PRO",
  "woocommerce-start": "Sklep WooCommerce Start",
  "woocommerce-pro": "Sklep WooCommerce PRO",
  nextjs: "Projekt dedykowany Next.js",
};

const FEATURE_LABELS_PL: Record<string, string> = {
  "custom-ui": "Projekt graficzny UI na zamówienie",
  "seo-advanced": "SEO zaawansowane",
  multilingual: "Wielojęzyczność",
  blog: "Moduł bloga",
  "online-payments": "Płatności online",
  booking: "System rezerwacji online",
  automation: "Automatyzacja (formularze, maile, CRM)",
  performance: "Optymalizacja wydajności",
  "headless-cms": "CMS headless (Sanity / Contentful)",
  "product-filters": "Zaawansowane filtry produktów",
  "abandoned-cart": "Odzyskiwanie porzuconych koszyków",
  "loyalty-program": "Program lojalnościowy / punkty",
};

function projectTypeLabel(type: ProjectType): string {
  return PROJECT_TYPE_LABELS[type] ?? type;
}

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
    state.pagesCount > 0
  ) {
    parts.push(`ok. ${state.pagesCount} podstron`);
  }
  if (
    state.projectType &&
    PRODUCT_PROJECT_TYPES.includes(state.projectType as (typeof PRODUCT_PROJECT_TYPES)[number]) &&
    state.productCount > 0
  ) {
    parts.push(`ok. ${state.productCount} produktów`);
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
 * Returns price estimate from current state.
 */
export function getPriceEstimate(state: CalculatorState) {
  return computePrice(state);
}

/**
 * Returns estimated timeline string from state.
 */
export function getEstimatedTimeline(state: CalculatorState): string {
  const { projectType, urgency } = state;
  if (!projectType) return "–";

  if (urgency === "express") {
    if (projectType === "wordpress-standard" || projectType === "woocommerce-start")
      return "1–2 tygodnie";
    if (projectType === "wordpress-pro" || projectType === "woocommerce-pro")
      return "2–3 tygodnie";
    if (projectType === "nextjs") return "3–4 tygodnie";
  }

  if (projectType === "wordpress-standard") return "2–3 tygodnie";
  if (projectType === "wordpress-pro" || projectType === "woocommerce-start")
    return "3–4 tygodnie";
  if (projectType === "woocommerce-pro" || projectType === "nextjs") return "4–7 tygodni";

  return "–";
}

/**
 * Returns a simple breakdown (base + modifiers) for display.
 */
export function getPriceBreakdown(state: CalculatorState): PriceBreakdownItem[] {
  const { projectType, pagesCount, productCount, features, integrations, urgency } = state;
  const breakdown: PriceBreakdownItem[] = [];

  if (!projectType) return breakdown;

  const base = BASE_PRICES[projectType];
  breakdown.push({
    label: `Pakiet bazowy: ${projectTypeLabel(projectType)}`,
    min: base.min,
    max: base.max,
  });

  if (PAGE_PROJECT_TYPES.includes(projectType as (typeof PAGE_PROJECT_TYPES)[number])) {
    const extraPages = getExtraPagesCount(pagesCount);
    if (extraPages > 0) {
      const range = getPagesCostRange(extraPages);
      breakdown.push({
        label: `Dodatkowe podstrony (${extraPages} szt.)`,
        min: range.min,
        max: range.max,
      });
    }
  }

  if (PRODUCT_PROJECT_TYPES.includes(projectType as (typeof PRODUCT_PROJECT_TYPES)[number])) {
    const extraProducts = getExtraProductsCount(productCount);
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
    const cost = FEATURE_COSTS[id];
    if (cost) {
      breakdown.push({
        label: FEATURE_LABELS_PL[id] ?? id,
        min: cost.min,
        max: cost.max,
      });
    }
  }

  if (integrations.length > 0) {
    let intMin = 0;
    let intMax = 0;
    for (const id of integrations) {
      const integrationCost = INTEGRATION_COSTS[id];
      if (integrationCost) {
        intMin += integrationCost.min;
        intMax += integrationCost.max;
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
      label: "Dopłata tryb ekspres (+20–30%)",
      min: 0,
      max: 0,
    });
  }

  return breakdown;
}

/**
 * Full summary: description + estimate + breakdown + timeline.
 */
export function buildSummary(state: CalculatorState): SummaryResult {
  const estimate = getPriceEstimate(state);
  const breakdown = getPriceBreakdown(state);
  const projectDescription = formatProjectDescription(state);
  const estimatedTimeline = getEstimatedTimeline(state);

  return {
    projectDescription,
    estimate,
    breakdown,
    estimatedTimeline,
  };
}
