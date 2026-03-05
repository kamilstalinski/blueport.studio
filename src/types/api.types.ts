import type React from "react";
import type { PackageId, FeatureId, TimelineId } from "@/constants/pricing";

export type { PackageId, FeatureId, TimelineId };

/** @deprecated Legacy 6-step flow used PackageId; use that instead. Kept for pricingEngine/constants/calculatorOptions. */
export type LegacyProjectType =
  | "wordpress-standard"
  | "wordpress-pro"
  | "woocommerce-start"
  | "woocommerce-pro"
  | "nextjs"
  | null;

/** @deprecated Legacy estimate range. New flow uses single total from calculatePrice. */
export interface EstimateResult {
  min: number;
  max: number;
}

/** @deprecated Legacy timeline. New flow uses TimelineId (express | standard | relaxed). */
export type Urgency = "standard" | "express";

export type StepIndex = 1 | 2 | 3 | 4 | 5 | 6;

export type ProjectPriority = "speed" | "price" | "quality" | "feature" | null;

export interface CalculatorState {
  packageId: PackageId | null;
  features: FeatureId[];
  timeline: TimelineId;
  projectPriority: ProjectPriority;
  name: string;
  email: string;
  phone: string;
}

export interface PriceEstimate {
  minPrice: number;
  maxPrice: number;
}

export interface BreakdownItem {
  label: string;
  price: number;
}

export interface SummaryResult {
  packageName: string;
  total: number;
  label: string;
  base: number;
  featuresTotal: number;
  breakdown: BreakdownItem[];
  estimatedTimeline: string;
  qualificationTags: string[];
  projectDescription: string;
}

export type CalculatorAction =
  | { type: "SET_PACKAGE_ID"; payload: PackageId }
  | { type: "SET_FEATURES"; payload: FeatureId[] }
  | { type: "SET_TIMELINE"; payload: TimelineId }
  | { type: "SET_PROJECT_PRIORITY"; payload: ProjectPriority }
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PHONE"; payload: string }
  | { type: "RESET" };

/** Payload passed to onSubmit and API /api/leads. */
export interface CalculatorSubmitPayload {
  name: string;
  email: string;
  phone: string;
  packageId: PackageId;
  features: FeatureId[];
  timeline: TimelineId;
  projectPriority: ProjectPriority;
  total: number;
  base: number;
  featuresTotal: number;
  label: string;
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
  getSubmitPayload: () => CalculatorSubmitPayload | null;
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
