export type ProjectType =
  | "company-website"
  | "online-store"
  | "dedicated-app"
  | "redesign";

export type WebsiteScope =
  | "3-5-pages"
  | "5-10-pages"
  | "10-plus-pages";

export type StoreScope =
  | "up-to-20"
  | "20-100"
  | "100-plus";

export type TimelineOption =
  | "no-rush"
  | "2-4-weeks"
  | "1-2-weeks";

export type CalculatorStep = 1 | 2 | 3 | 4 | 5;

export const FEATURE_IDS = [
  "custom-ui",
  "seo",
  "multilingual",
  "blog",
  "online-payments",
  "booking",
  "automation",
  "performance",
] as const;

export type FeatureId = (typeof FEATURE_IDS)[number];

export interface CalculatorFormData {
  projectType: ProjectType | null;
  websiteScope: WebsiteScope | null;
  storeScope: StoreScope | null;
  features: FeatureId[];
  timeline: TimelineOption | null;
  name: string;
  company: string;
  email: string;
  phone: string;
  description: string;
}

export interface PriceResult {
  minPrice: number;
  maxPrice: number;
  estimatedTimeline: string;
  recommendedPackage: "Standard" | "PRO" | "Premium";
}

export interface SubmittedLead {
  formData: CalculatorFormData;
  result: PriceResult;
  submittedAt: string;
}
