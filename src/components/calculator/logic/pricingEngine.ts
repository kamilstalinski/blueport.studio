import type { CalculatorState, PriceEstimate } from "../types";
import {
  BASE_PRICES,
  COST_PER_PAGE,
  EXPRESS_PREMIUM_MIN,
  EXPRESS_PREMIUM_MAX,
  FEATURE_COSTS,
  SEO_ADVANCED_COST,
  BLOG_COST,
  INTEGRATION_COST_PER_ITEM,
  ABSOLUTE_MIN_PRICE,
  ABSOLUTE_MAX_PRICE,
} from "./constants";

function clamp(min: number, max: number): [number, number] {
  const low = Math.max(ABSOLUTE_MIN_PRICE, min);
  const high = Math.min(ABSOLUTE_MAX_PRICE, max);
  return [low, high];
}

export function computePrice(state: CalculatorState): PriceEstimate {
  const { projectType, pagesCount, features, seo, blog, integrations, urgency } = state;

  if (!projectType) {
    return { minPrice: 0, maxPrice: 0 };
  }

  let minPrice = BASE_PRICES[projectType];
  let maxPrice = BASE_PRICES[projectType];

  if (pagesCount > 0) {
    const pageCostMin = pagesCount * COST_PER_PAGE * 0.8;
    const pageCostMax = pagesCount * COST_PER_PAGE * 1.2;
    minPrice += pageCostMin;
    maxPrice += pageCostMax;
  }

  for (const id of features) {
    const cost = FEATURE_COSTS[id];
    if (cost) {
      minPrice += cost.min;
      maxPrice += cost.max;
    }
  }

  if (seo) {
    minPrice += SEO_ADVANCED_COST.min;
    maxPrice += SEO_ADVANCED_COST.max;
  }

  if (blog) {
    minPrice += BLOG_COST.min;
    maxPrice += BLOG_COST.max;
  }

  const integrationCount = integrations.length;
  if (integrationCount > 0) {
    minPrice += integrationCount * INTEGRATION_COST_PER_ITEM.min;
    maxPrice += integrationCount * INTEGRATION_COST_PER_ITEM.max;
  }

  if (urgency === "express") {
    minPrice *= EXPRESS_PREMIUM_MIN;
    maxPrice *= EXPRESS_PREMIUM_MAX;
  }

  minPrice = Math.round(minPrice);
  maxPrice = Math.round(maxPrice);

  const [min, max] = clamp(minPrice, maxPrice);
  return { minPrice: min, maxPrice: max };
}
