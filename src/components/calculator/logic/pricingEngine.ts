import type { CalculatorState, PriceEstimate } from "@/types";
import {
  BASE_PRICES,
  getPagesCostRange,
  getExtraPagesCount,
  getProductsCostRange,
  getExtraProductsCount,
  EXPRESS_PREMIUM_MIN,
  EXPRESS_PREMIUM_MAX,
  FEATURE_COSTS,
  INTEGRATION_COSTS,
  ABSOLUTE_MIN_PRICE,
  ABSOLUTE_MAX_PRICE,
} from "./constants";

const PAGE_PROJECT_TYPES = ["wordpress-standard", "wordpress-pro", "nextjs"] as const;
const PRODUCT_PROJECT_TYPES = ["woocommerce-start", "woocommerce-pro"] as const;

function clamp(min: number, max: number): [number, number] {
  const clampedMin = Math.max(ABSOLUTE_MIN_PRICE, min);
  const clampedMax = Math.min(ABSOLUTE_MAX_PRICE, max);
  return [clampedMin, clampedMax];
}

function roundToHundred(n: number): number {
  return Math.round(n / 100) * 100;
}

export function computePrice(state: CalculatorState): PriceEstimate {
  const { projectType, pagesCount, productCount, features, integrations, urgency } = state;

  if (!projectType) {
    return { minPrice: 0, maxPrice: 0 };
  }

  const base = BASE_PRICES[projectType];
  let minPrice = base.min;
  let maxPrice = base.max;

  if (PAGE_PROJECT_TYPES.includes(projectType as (typeof PAGE_PROJECT_TYPES)[number])) {
    const extraPages = getExtraPagesCount(pagesCount);
    const pageRange = getPagesCostRange(extraPages);
    minPrice += pageRange.min;
    maxPrice += pageRange.max;
  }

  if (PRODUCT_PROJECT_TYPES.includes(projectType as (typeof PRODUCT_PROJECT_TYPES)[number])) {
    const extraProducts = getExtraProductsCount(productCount);
    const productRange = getProductsCostRange(extraProducts);
    minPrice += productRange.min;
    maxPrice += productRange.max;
  }

  for (const id of features) {
    const cost = FEATURE_COSTS[id];
    if (cost) {
      minPrice += cost.min;
      maxPrice += cost.max;
    }
  }

  for (const id of integrations) {
    const cost = INTEGRATION_COSTS[id];
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
  return { minPrice: min, maxPrice: max };
}
