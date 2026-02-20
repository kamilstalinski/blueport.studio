import type { CalculatorState, EstimateResult } from "@/types";
import {
  BASE_PRICES,
  getPagesCostRange,
  getExtraPagesCount,
  getProductsCostRange,
  getExtraProductsCount,
  ABSOLUTE_MIN_PRICE,
  ABSOLUTE_MAX_PRICE,
} from "./constants";
import { getFeatureCost } from "./calculatorOptions";
import { INTEGRATION_OPTIONS } from "./calculatorOptions";

const PAGE_PROJECT_TYPES = ["wordpress-standard", "wordpress-pro", "nextjs"] as const;
const PRODUCT_PROJECT_TYPES = ["woocommerce-start", "woocommerce-pro"] as const;

const LANGUAGE_COST: Record<number, { min: number; max: number }> = {
  1: { min: 0, max: 0 },
  2: { min: 700, max: 1200 },
  3: { min: 1400, max: 2200 },
  4: { min: 2000, max: 3200 },
};

function roundToHundred(n: number): number {
  return Math.round(n / 100) * 100;
}

function clampValue(n: number): number {
  return Math.max(ABSOLUTE_MIN_PRICE, Math.min(n, ABSOLUTE_MAX_PRICE));
}

export function computePrice(state: CalculatorState): EstimateResult {
  const { projectType, scopeUnit, scopeCount, features, languageCount, integrations, urgency } = state;

  if (!projectType) {
    return { min: 0, max: 0 };
  }

  const base = BASE_PRICES[projectType];
  let minPrice = base.min;
  let maxPrice = base.max;

  if (scopeUnit === "pages" && PAGE_PROJECT_TYPES.includes(projectType as (typeof PAGE_PROJECT_TYPES)[number])) {
    const extraPages = getExtraPagesCount(scopeCount, projectType);
    const range = getPagesCostRange(extraPages);
    minPrice += range.min;
    maxPrice += range.max;
  }

  if (scopeUnit === "products" && PRODUCT_PROJECT_TYPES.includes(projectType as (typeof PRODUCT_PROJECT_TYPES)[number])) {
    const extraProducts = getExtraProductsCount(scopeCount, projectType as "woocommerce-start" | "woocommerce-pro");
    const range = getProductsCostRange(extraProducts);
    minPrice += range.min;
    maxPrice += range.max;
  }

  for (const id of features) {
    const cost = getFeatureCost(id);
    if (cost) {
      minPrice += cost.min;
      maxPrice += cost.max;
    }
  }

  const langCost = LANGUAGE_COST[Math.min(languageCount, 4)] ?? LANGUAGE_COST[4];
  minPrice += langCost.min;
  maxPrice += langCost.max;

  const integrationCostById = new Map(INTEGRATION_OPTIONS.map((i) => [i.id, { min: i.minCost, max: i.maxCost }]));
  for (const id of integrations) {
    const cost = integrationCostById.get(id);
    if (cost) {
      minPrice += cost.min;
      maxPrice += cost.max;
    }
  }

  if (urgency === "express") {
    minPrice = Math.ceil(minPrice * 1.2);
    maxPrice = Math.ceil(maxPrice * 1.3);
  }

  minPrice = roundToHundred(minPrice);
  maxPrice = roundToHundred(maxPrice);

  const min = clampValue(minPrice);
  const max = clampValue(maxPrice);
  return { min, max };
}
