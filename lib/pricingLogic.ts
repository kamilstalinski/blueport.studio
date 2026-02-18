import type {
  ProjectType,
  WebsiteScope,
  StoreScope,
  TimelineOption,
  FeatureId,
  PriceResult,
} from "@/types/calculator";

const FEATURE_MODIFIERS: Record<FeatureId, { min: number; max: number }> = {
  "custom-ui": { min: 800, max: 1500 },
  seo: { min: 500, max: 500 },
  multilingual: { min: 800, max: 800 },
  blog: { min: 400, max: 600 },
  "online-payments": { min: 600, max: 1000 },
  booking: { min: 1200, max: 1800 },
  automation: { min: 1000, max: 1000 },
  performance: { min: 300, max: 500 },
};

function clamp(min: number, max: number, absoluteMax: number = 15000): [number, number] {
  const low = Math.max(2500, min);
  const high = Math.min(absoluteMax, max);
  return [low, high];
}

function applyTimelinePremium(min: number, max: number, timeline: TimelineOption): [number, number] {
  if (timeline !== "1-2-weeks") return [min, max];
  const factor = 1.15;
  return [Math.round(min * factor), Math.round(max * factor)];
}

export function calculatePrice(
  projectType: ProjectType,
  websiteScope: WebsiteScope | null,
  storeScope: StoreScope | null,
  features: FeatureId[],
  timeline: TimelineOption
): PriceResult {
  let minPrice = 0;
  let maxPrice = 0;
  let recommendedPackage: PriceResult["recommendedPackage"] = "Standard";
  let timelineWeeks = "4–6 tygodni";

  if (projectType === "company-website") {
    if (websiteScope === "3-5-pages") {
      minPrice = 2500;
      maxPrice = 3000;
      recommendedPackage = "Standard";
    } else if (websiteScope === "5-10-pages") {
      minPrice = 3000;
      maxPrice = 4000;
      recommendedPackage = "Standard";
    } else {
      minPrice = 3500;
      maxPrice = 5000;
      recommendedPackage = "PRO";
    }
    timelineWeeks = "2–4 tygodnie";
  } else if (projectType === "online-store") {
    if (storeScope === "up-to-20") {
      minPrice = 4000;
      maxPrice = 5500;
      recommendedPackage = "Standard";
    } else if (storeScope === "20-100") {
      minPrice = 6000;
      maxPrice = 9000;
      recommendedPackage = "PRO";
    } else {
      minPrice = 7500;
      maxPrice = 11000;
      recommendedPackage = "PRO";
    }
    timelineWeeks = "4–6 tygodni";
  } else if (projectType === "dedicated-app") {
    minPrice = 6000;
    maxPrice = 9000;
    recommendedPackage = "Premium";
    timelineWeeks = "6–10 tygodni";
  } else {
    minPrice = 3500;
    maxPrice = 5500;
    recommendedPackage = "PRO";
    timelineWeeks = "3–5 tygodni";
  }

  for (const id of features) {
    const mod = FEATURE_MODIFIERS[id];
    if (mod) {
      minPrice += mod.min;
      maxPrice += mod.max;
    }
  }

  [minPrice, maxPrice] = applyTimelinePremium(minPrice, maxPrice, timeline);

  const absoluteMax = projectType === "dedicated-app" && features.length >= 4 ? 18000 : 15000;
  [minPrice, maxPrice] = clamp(minPrice, maxPrice, absoluteMax);

  if (minPrice >= 7000 || maxPrice >= 9000) {
    recommendedPackage = "PRO";
  }
  if (projectType === "dedicated-app" || (minPrice >= 10000 && features.length >= 3)) {
    recommendedPackage = "Premium";
  }

  if (timeline === "1-2-weeks") {
    timelineWeeks = "1–2 tygodnie (priorytet)";
  } else if (timeline === "2-4-weeks") {
    timelineWeeks = "2–4 tygodnie";
  }

  return {
    minPrice,
    maxPrice,
    estimatedTimeline: timelineWeeks,
    recommendedPackage,
  };
}
