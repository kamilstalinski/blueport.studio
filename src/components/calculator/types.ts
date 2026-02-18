/**
 * Calculator state and flow types.
 * Used by context, pricing engine, and steps.
 */

export type ProjectType = "wordpress" | "woocommerce" | "next";

export type Urgency = "standard" | "express";

export type StepIndex = 1 | 2 | 3 | 4 | 5 | 6;

export interface CalculatorState {
  projectType: ProjectType | null;
  pagesCount: number;
  features: string[];
  seo: boolean;
  blog: boolean;
  integrations: string[];
  urgency: Urgency;
  budgetRange: string;
  name: string;
  email: string;
  phone: string;
}

export interface PriceEstimate {
  minPrice: number;
  maxPrice: number;
}

export interface PriceBreakdownItem {
  label: string;
  min: number;
  max: number;
}

export interface SummaryResult {
  projectDescription: string;
  estimate: PriceEstimate;
  breakdown: PriceBreakdownItem[];
  estimatedTimeline: string;
}

export type CalculatorAction =
  | { type: "SET_PROJECT_TYPE"; payload: ProjectType }
  | { type: "SET_PAGES_COUNT"; payload: number }
  | { type: "SET_FEATURES"; payload: string[] }
  | { type: "SET_SEO"; payload: boolean }
  | { type: "SET_BLOG"; payload: boolean }
  | { type: "SET_INTEGRATIONS"; payload: string[] }
  | { type: "SET_URGENCY"; payload: Urgency }
  | { type: "SET_BUDGET_RANGE"; payload: string }
  | { type: "SET_CONTACT"; payload: { name?: string; email?: string; phone?: string } }
  | { type: "SET_STEP"; payload: StepIndex }
  | { type: "RESET" };
