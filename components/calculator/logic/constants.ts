/**
 * Pricing and calculator configuration.
 * No hardcoded values in components – all numbers live here.
 */

import type { ProjectType } from "../types";

export const BASE_PRICES: Record<ProjectType, number> = {
  wordpress: 2900,
  woocommerce: 4900,
  next: 6000,
} as const;

/** Cost per additional page (beyond base scope). */
export const COST_PER_PAGE = 120;

/** Express urgency: add 15–25% (we use 20% for both min and max). */
export const EXPRESS_PREMIUM_MIN = 1.15;
export const EXPRESS_PREMIUM_MAX = 1.25;

/** Fixed cost per feature (featureId -> { min, max } PLN). */
export const FEATURE_COSTS: Record<string, { min: number; max: number }> = {
  "custom-ui": { min: 800, max: 1500 },
  seo: { min: 500, max: 500 },
  multilingual: { min: 800, max: 800 },
  blog: { min: 400, max: 600 },
  "online-payments": { min: 600, max: 1000 },
  booking: { min: 1200, max: 1800 },
  automation: { min: 1000, max: 1000 },
  performance: { min: 300, max: 500 },
};

/** SEO advanced add-on (when seo boolean is true). */
export const SEO_ADVANCED_COST = { min: 500, max: 800 };

/** Blog add-on (when blog boolean is true). */
export const BLOG_COST = { min: 400, max: 600 };

/** Integration cost per item (PLN). */
export const INTEGRATION_COST_PER_ITEM = { min: 300, max: 600 };

export const ABSOLUTE_MIN_PRICE = 2500;
export const ABSOLUTE_MAX_PRICE = 20000;
