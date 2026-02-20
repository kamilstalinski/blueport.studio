import type React from "react";

export type ProjectType =
  | "wordpress-standard"
  | "wordpress-pro"
  | "woocommerce-start"
  | "woocommerce-pro"
  | "nextjs"
  | null;

export type ScopeUnit = "pages" | "products";

export type Urgency = "standard" | "express";

export type StepIndex = 1 | 2 | 3 | 4 | 5 | 6;

export interface CalculatorState {
  projectType: ProjectType;
  scopeUnit: ScopeUnit;
  scopeCount: number;
  features: string[];
  languageCount: number;
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

export type BudgetFit = "below" | "within" | "above" | null;

export interface EstimateResult {
  min: number;
  max: number;
  budgetFit: BudgetFit;
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
  qualificationTags: string[];
}

export type CalculatorAction =
  | { type: "SET_PROJECT_TYPE"; payload: NonNullable<ProjectType> }
  | { type: "SET_SCOPE_COUNT"; payload: number }
  | { type: "SET_FEATURES"; payload: string[] }
  | { type: "SET_LANGUAGE_COUNT"; payload: number }
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
