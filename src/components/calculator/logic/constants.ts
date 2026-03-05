/**
 * Pricing constants and scope cost helpers for the calculator engine.
 * Feature and integration costs come from calculatorOptions.
 */

import type { LegacyProjectType } from "@/types";

export type NonNullableProjectType = NonNullable<LegacyProjectType>;

/** Base prices (min/max) per project type. */
export const BASE_PRICES: Record<NonNullableProjectType, { min: number; max: number }> = {
  "wordpress-standard": { min: 2500, max: 2500 },
  "wordpress-pro": { min: 3500, max: 3500 },
  "woocommerce-start": { min: 3500, max: 3500 },
  "woocommerce-pro": { min: 4500, max: 4500 },
  nextjs: { min: 4500, max: 4500 },
};

/** Base pages included in package (extra above this is charged). */
export const BASE_PAGES_INCLUDED: Record<NonNullableProjectType, number> = {
  "wordpress-standard": 5,
  "wordpress-pro": 10,
  "woocommerce-start": 0,
  "woocommerce-pro": 0,
  nextjs: 0,
};

/** Base products included (extra above this is charged). */
export const BASE_PRODUCTS_INCLUDED: Record<"woocommerce-start" | "woocommerce-pro", number> = {
  "woocommerce-start": 20,
  "woocommerce-pro": 50,
};

/** Per-page cost for extra pages (above included). Tiered. */
export function getPagesCostRange(extraPages: number): { min: number; max: number } {
  if (extraPages <= 0) return { min: 0, max: 0 };
  let min = 0,
    max = 0;
  let n = extraPages;
  if (n > 15) {
    const slice = n - 15;
    min += slice * 120;
    max += slice * 180;
    n = 15;
  }
  if (n > 5) {
    const slice = n - 5;
    min += slice * 170;
    max += slice * 240;
    n = 5;
  }
  if (n > 0) {
    min += n * 220;
    max += n * 300;
  }
  return { min, max };
}

/** Extra pages above base (for page-based projects). */
export function getExtraPagesCount(
  scopeCount: number,
  projectType: NonNullableProjectType
): number {
  const included = BASE_PAGES_INCLUDED[projectType];
  return Math.max(0, scopeCount - included);
}

/** Per-product cost for extra products (above included). Tiered. */
export function getProductsCostRange(extraProducts: number): { min: number; max: number } {
  if (extraProducts <= 0) return { min: 0, max: 0 };
  let min = 0,
    max = 0;
  let n = extraProducts;
  if (n > 100) {
    const slice = n - 100;
    min += slice * 30;
    max += slice * 50;
    n = 100;
  }
  if (n > 30) {
    const slice = n - 30;
    min += slice * 50;
    max += slice * 75;
    n = 30;
  }
  if (n > 0) {
    min += n * 70;
    max += n * 100;
  }
  return { min, max };
}

/** Extra products above base (for product-based projects). */
export function getExtraProductsCount(
  scopeCount: number,
  projectType: "woocommerce-start" | "woocommerce-pro"
): number {
  const included = BASE_PRODUCTS_INCLUDED[projectType];
  return Math.max(0, scopeCount - included);
}

export const ABSOLUTE_MIN_PRICE = 2500;
export const ABSOLUTE_MAX_PRICE = 28000;
