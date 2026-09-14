import type { PackageId, FeatureId, TimelineId } from "@/constants/pricing";

export type { PackageId, FeatureId, TimelineId };

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
