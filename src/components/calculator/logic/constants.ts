/**
 * Pricing and calculator configuration.
 * No hardcoded values in components – all numbers live here.
 */

import type { ProjectType } from "@/types";

export const BASE_PRICES: Record<ProjectType, { min: number; max: number }> = {
  "wordpress-standard": { min: 2400, max: 3000 },
  "wordpress-pro": { min: 3400, max: 5000 },
  "woocommerce-start": { min: 3800, max: 5200 },
  "woocommerce-pro": { min: 5800, max: 8500 },
  nextjs: { min: 5800, max: 9000 },
};

/** Per-page cost tiers (pages above base). Apply ±15% (min × 0.85, max × 1.15). */
export function getPagesCostRange(pagesAboveBase: number): { min: number; max: number } {
  if (pagesAboveBase <= 0) return { min: 0, max: 0 };
  let raw = 0;
  let n = pagesAboveBase;
  if (n > 20) {
    raw += (n - 20) * 150;
    n = 20;
  }
  if (n > 10) {
    raw += (n - 10) * 200;
    n = 10;
  }
  if (n > 5) {
    raw += (n - 5) * 250;
  }
  return { min: Math.round(raw * 0.85), max: Math.round(raw * 1.15) };
}

/** Pages 1–5 included in base; count only pages above 5 for extra cost. */
export function getExtraPagesCount(pagesCount: number): number {
  return Math.max(0, pagesCount - 5);
}

/** Per-product cost tiers (products above base). Apply ±15%. */
export function getProductsCostRange(productsAboveBase: number): { min: number; max: number } {
  if (productsAboveBase <= 0) return { min: 0, max: 0 };
  let raw = 0;
  let n = productsAboveBase;
  if (n > 100) {
    raw += (n - 100) * 40;
    n = 100;
  }
  if (n > 50) {
    raw += (n - 50) * 60;
    n = 50;
  }
  if (n > 20) {
    raw += (n - 20) * 80;
  }
  return { min: Math.round(raw * 0.85), max: Math.round(raw * 1.15) };
}

/** Products 1–20 included in base; count only products above 20 for extra cost. */
export function getExtraProductsCount(productCount: number): number {
  return Math.max(0, productCount - 20);
}

/** Express urgency: min × 1.20, max × 1.30 */
export const EXPRESS_PREMIUM_MIN = 1.2;
export const EXPRESS_PREMIUM_MAX = 1.3;

/** Feature costs (min–max PLN). */
export const FEATURE_COSTS: Record<string, { min: number; max: number }> = {
  "custom-ui": { min: 900, max: 1800 },
  "seo-advanced": { min: 600, max: 1000 },
  multilingual: { min: 900, max: 1500 },
  blog: { min: 400, max: 700 },
  "online-payments": { min: 700, max: 1200 },
  booking: { min: 1400, max: 2200 },
  automation: { min: 1200, max: 2000 },
  performance: { min: 400, max: 700 },
  "headless-cms": { min: 1500, max: 2500 },
  "product-filters": { min: 800, max: 1400 },
  "abandoned-cart": { min: 600, max: 1000 },
  "loyalty-program": { min: 1200, max: 2000 },
};

/** Which feature IDs to show per project type. */
export const FEATURES_BY_PROJECT_TYPE: Record<ProjectType, string[]> = {
  "wordpress-standard": [
    "custom-ui",
    "seo-advanced",
    "multilingual",
    "blog",
    "booking",
    "performance",
  ],
  "wordpress-pro": [
    "custom-ui",
    "seo-advanced",
    "multilingual",
    "blog",
    "booking",
    "automation",
    "performance",
  ],
  "woocommerce-start": [
    "seo-advanced",
    "blog",
    "online-payments",
    "performance",
    "product-filters",
    "abandoned-cart",
  ],
  "woocommerce-pro": [
    "seo-advanced",
    "blog",
    "online-payments",
    "automation",
    "performance",
    "product-filters",
    "abandoned-cart",
    "loyalty-program",
  ],
  nextjs: [
    "custom-ui",
    "seo-advanced",
    "multilingual",
    "blog",
    "booking",
    "automation",
    "performance",
    "headless-cms",
    "online-payments",
  ],
};

/** Integration cost per type (min–max PLN). */
export const INTEGRATION_COSTS: Record<string, { min: number; max: number }> = {
  crm: { min: 500, max: 900 },
  mail: { min: 300, max: 600 },
  analytics: { min: 250, max: 450 },
  social: { min: 300, max: 500 },
  maps: { min: 300, max: 500 },
  chat: { min: 400, max: 700 },
  other: { min: 500, max: 1000 },
};

export const ABSOLUTE_MIN_PRICE = 2400;
export const ABSOLUTE_MAX_PRICE = 28000;
