/**
 * Summary generation: project description, estimate, breakdown.
 * Pure functions – no UI.
 */

import type { CalculatorState, SummaryResult, PriceBreakdownItem } from "../types";
import { computePrice } from "./pricingEngine";
import {
  BASE_PRICES,
  COST_PER_PAGE,
  FEATURE_COSTS,
  SEO_ADVANCED_COST,
  BLOG_COST,
  INTEGRATION_COST_PER_ITEM,
} from "./constants";

function projectTypeLabel(type: string): string {
  const map: Record<string, string> = {
    wordpress: "Strona firmowa (WordPress)",
    woocommerce: "Sklep internetowy (WooCommerce)",
    next: "Projekt dedykowany (Next.js)",
  };
  return map[type] ?? type;
}

/**
 * Returns a short, formatted project description from state.
 */
export function formatProjectDescription(state: CalculatorState): string {
  const parts: string[] = [];

  if (state.projectType) {
    parts.push(projectTypeLabel(state.projectType));
  }
  if (state.pagesCount > 0) {
    parts.push(`ok. ${state.pagesCount} podstron`);
  }
  if (state.features.length > 0) {
    parts.push(`funkcje: ${state.features.join(", ")}`);
  }
  if (state.seo) parts.push("SEO zaawansowane");
  if (state.blog) parts.push("blog");
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
 * Returns a simple breakdown (base + modifiers) for display.
 */
export function getPriceBreakdown(state: CalculatorState): PriceBreakdownItem[] {
  const { projectType, pagesCount, features, seo, blog, integrations, urgency } = state;
  const breakdown: PriceBreakdownItem[] = [];

  if (!projectType) return breakdown;

  const base = BASE_PRICES[projectType];
  breakdown.push({
    label: projectTypeLabel(projectType),
    min: base,
    max: base,
  });

  if (pagesCount > 0) {
    const min = Math.round(pagesCount * COST_PER_PAGE * 0.8);
    const max = Math.round(pagesCount * COST_PER_PAGE * 1.2);
    breakdown.push({ label: "Dodatkowe podstrony", min, max });
  }

  for (const id of features) {
    const cost = FEATURE_COSTS[id];
    if (cost) {
      breakdown.push({
        label: `Funkcja: ${id}`,
        min: cost.min,
        max: cost.max,
      });
    }
  }

  if (seo) {
    breakdown.push({
      label: "SEO zaawansowane",
      min: SEO_ADVANCED_COST.min,
      max: SEO_ADVANCED_COST.max,
    });
  }
  if (blog) {
    breakdown.push({
      label: "Blog",
      min: BLOG_COST.min,
      max: BLOG_COST.max,
    });
  }
  if (integrations.length > 0) {
    breakdown.push({
      label: "Integracje",
      min: integrations.length * INTEGRATION_COST_PER_ITEM.min,
      max: integrations.length * INTEGRATION_COST_PER_ITEM.max,
    });
  }
  if (urgency === "express") {
    breakdown.push({
      label: "Tryb ekspres (+15–25%)",
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
  const estimatedTimeline =
    state.urgency === "express" ? "2–3 tygodnie" : "4–6 tygodni";

  return {
    projectDescription,
    estimate,
    breakdown,
    estimatedTimeline,
  };
}
