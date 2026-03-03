import type { PackageId, FeatureId, TimelineId } from "@/constants/pricing";

/** Package id or null (no selection). Derived from pricing PACKAGES. */
export type ProjectType = PackageId | null;

/** Feature id. Same as FeatureId from pricing; alias for domain use. */
export type ProjectFeature = FeatureId;

/** Timeline id or null. Derived from pricing TIMELINE_MULTIPLIERS. */
export type Timeline = TimelineId | null;

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
