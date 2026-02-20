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

export type ProjectPriority = "speed" | "price" | "quality" | "feature" | null;

export interface CalculatorState {
  projectType: ProjectType;
  scopeUnit: ScopeUnit;
  scopeCount: number;
  features: string[];
  languageCount: number;
  integrations: string[];
  urgency: Urgency;
  projectPriority: ProjectPriority;
  name: string;
  email: string;
  phone: string;
}

export interface PriceEstimate {
  minPrice: number;
  maxPrice: number;
}

export interface EstimateResult {
  min: number;
  max: number;
}

export interface PriceBreakdownItem {
  label: string;
  min: number;
  max: number;
}

/** Alias for summary breakdown items. */
export type BreakdownItem = PriceBreakdownItem;

export interface SummaryResult {
  projectDescription: string;
  estimate: PriceEstimate;
  breakdown: BreakdownItem[];
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
  | { type: "SET_PROJECT_PRIORITY"; payload: ProjectPriority }
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PHONE"; payload: string }
  | { type: "SET_STEP"; payload: StepIndex }
  | { type: "RESET" };

/** Payload passed to onSubmit. */
export interface CalculatorSubmitPayload {
  name: string;
  email: string;
  phone: string;
  projectType: ProjectType;
  scopeUnit: ScopeUnit;
  scopeCount: number;
  features: string[];
  languageCount: number;
  integrations: string[];
  urgency: Urgency;
  projectPriority: ProjectPriority;
  estimateMin: number;
  estimateMax: number;
  estimatedTimeline: string;
  qualificationTags: string[];
  projectDescription: string;
  breakdown: BreakdownItem[];
}

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
