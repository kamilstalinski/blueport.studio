export type ProjectType = "wordpress" | "woocommerce" | "nextjs" | null;

export type ProjectFeature =
  | "seo"
  | "copywriting"
  | "animations"
  | "cms"
  | "integrations"
  | "hosting";

export type Timeline = "express" | "standard" | "relaxed" | null;

export type BudgetRange =
  | "under3k"
  | "3k-6k"
  | "6k-12k"
  | "above12k"
  | null;

export interface ContactData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface CalculatorState {
  step: number;
  direction: number; // 1 = dalej, -1 = wstecz (dla animacji)
  projectType: ProjectType;
  features: ProjectFeature[];
  timeline: Timeline;
  budget: BudgetRange;
  contact: ContactData;
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
}

export interface PriceSummary {
  base: number;
  featuresTotal: number;
  timelineMultiplier: number;
  total: number;
  label: string; // "od X zł" lub "X – Y zł"
}
