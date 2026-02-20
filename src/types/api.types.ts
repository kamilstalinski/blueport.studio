import type React from "react";

export type ProjectType =
  | "wordpress-standard"
  | "wordpress-pro"
  | "woocommerce-start"
  | "woocommerce-pro"
  | "nextjs";

export type Urgency = "standard" | "express";

export type StepIndex = 1 | 2 | 3 | 4 | 5 | 6;

export interface CalculatorState {
  projectType: ProjectType | null;
  pagesCount: number;
  productCount: number;
  features: string[];
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
  | { type: "SET_PRODUCT_COUNT"; payload: number }
  | { type: "SET_FEATURES"; payload: string[] }
  | { type: "SET_INTEGRATIONS"; payload: string[] }
  | { type: "SET_URGENCY"; payload: Urgency }
  | { type: "SET_BUDGET_RANGE"; payload: string }
  | { type: "SET_CONTACT"; payload: { name?: string; email?: string; phone?: string } }
  | { type: "SET_STEP"; payload: StepIndex }
  | { type: "RESET" };

export interface StepValidationResult {
  valid: boolean;
  error?: string;
}

export interface CalculatorContextValue {
  state: CalculatorState;
  step: StepIndex;
  dispatch: React.Dispatch<CalculatorAction>;
  setStep: (step: StepIndex) => void;
  updateState: (payload: Partial<CalculatorState>) => void;
  getPrice: () => PriceEstimate;
  getSummary: () => SummaryResult;
  validateStep: (step: StepIndex) => StepValidationResult;
  canGoNext: (step: StepIndex) => boolean;
  canSubmit: boolean;
  reset: () => void;
}

export type ClientTranslationFn = ((key: string) => string) & {
  raw: (key: string) => unknown;
};

export type ServerTranslationFn = ((key: string) => string) & {
  raw: (key: string) => unknown;
};

export interface CaseStudy {
  title: string;
  client: string;
  industry: string;
  context: string;
  challenge: string;
  strategy: string;
  implementation: string;
  stack: string;
  results: string;
  lessons: string;
}
