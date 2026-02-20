import type { CalculatorState, EstimateResult } from "@/types";
import {
  BASE_PRICES,
  getPagesCostRange,
  getExtraPagesCount,
  getProductsCostRange,
  getExtraProductsCount,
  EXPRESS_PREMIUM_MIN,
  EXPRESS_PREMIUM_MAX,
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

function clamp(min: number, max: number): [number, number] {
  const clampedMin = Math.max(ABSOLUTE_MIN_PRICE, min);
  const clampedMax = Math.min(ABSOLUTE_MAX_PRICE, max);
  return [clampedMin, clampedMax];
}

function roundToHundred(n: number): number {
  return Math.round(n / 100) * 100;
}

/** Midpoint (PLN) for budget range; "unknown" or "" → null. */
function budgetRangeMidpoint(budgetRange: string): number | null {
  if (!budgetRange || budgetRange === "unknown") return null;
  const map: Record<string, number> = {
    "do-3k": 3000,
    "3k-5k": 4000,
    "5k-8k": 6500,
    "8k-14k": 11000,
    "14k-25k": 19500,
    "25k-plus": 28000,
  };
  return map[budgetRange] ?? null;
}

export function computePrice(state: CalculatorState): EstimateResult {
  const { projectType, scopeUnit, scopeCount, features, languageCount, integrations, urgency, budgetRange } = state;

  if (!projectType) {
    return { min: 0, max: 0, budgetFit: null };
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
    minPrice *= EXPRESS_PREMIUM_MIN;
    maxPrice *= EXPRESS_PREMIUM_MAX;
  }

  minPrice = roundToHundred(minPrice);
  maxPrice = roundToHundred(maxPrice);

  const [min, max] = clamp(minPrice, maxPrice);

  let budgetFit: EstimateResult["budgetFit"] = null;
  const midpoint = budgetRangeMidpoint(budgetRange);
  if (midpoint != null) {
    if (max < midpoint * 0.8) budgetFit = "below";
    else if (min > midpoint * 1.2) budgetFit = "above";
    else budgetFit = "within";
  }

  return { min, max, budgetFit };
}
