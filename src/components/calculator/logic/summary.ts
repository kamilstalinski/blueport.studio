/**
 * Summary generation: project description, estimate, breakdown, timeline, qualification tags.
 * Pure functions – no UI. Single source of truth: @/constants/pricing.
 */

import type { SummaryInput, SummaryResult, BreakdownItem } from "@/types";
import type { PackageId, FeatureId, TimelineId } from "@/constants/pricing";
import { calculatePrice, PACKAGES, FEATURES, TIMELINE_MULTIPLIERS } from "@/constants/pricing";

const PRIORITY_LABELS: Record<NonNullable<SummaryInput["projectPriority"]>, string> = {
  speed: "Szybka realizacja",
  price: "Optymalna cena",
  quality: "Najwyższa jakość",
  feature: "Konkretna funkcjonalność",
};

function estimatedTimeline(packageId: PackageId, timeline: TimelineId): string {
  if (timeline === "express") {
    return TIMELINE_MULTIPLIERS.express.days;
  }
  if (timeline === "relaxed") {
    return TIMELINE_MULTIPLIERS.relaxed.days;
  }
  return PACKAGES[packageId].deliveryLabel;
}

function getQualificationTags(
  packageId: PackageId,
  features: FeatureId[],
  timeline: TimelineId,
  projectPriority: SummaryInput["projectPriority"],
  total: number
): string[] {
  const tags: string[] = [];

  if (packageId === "projekt-dedykowany") tags.push("lead-premium");
  if (packageId === "sklep-online") tags.push("lead-ecommerce");

  if (features.includes("wholesaler-feed")) tags.push("wholesaler");
  if (features.includes("erp")) tags.push("enterprise-integration");
  if (features.includes("crm")) tags.push("crm-interest");
  if (features.includes("mail-automation")) tags.push("automation-interest");
  if (features.includes("headless-cms")) tags.push("headless-interest");
  if (features.includes("language-version")) tags.push("multilingual");

  if (timeline === "express") tags.push("urgent");
  if (timeline === "relaxed") tags.push("flexible-timeline");

  if (projectPriority === "quality") tags.push("budget-flexible");
  if (projectPriority === "price") tags.push("price-sensitive");
  if (projectPriority === "speed") tags.push("time-sensitive");
  if (projectPriority === "feature") tags.push("technical-buyer");

  if (total > 8000) tags.push("high-value");
  if (total > 15000) tags.push("high-value-xl");

  return tags;
}

function formatProjectDescription(
  packageName: string,
  featureLabels: string[],
  timelineLabel: string,
  priceLabel: string,
  projectPriority: SummaryInput["projectPriority"]
): string {
  const addons = featureLabels.length > 0 ? featureLabels.join(", ") : "brak";
  const priorityLabel = projectPriority
    ? PRIORITY_LABELS[projectPriority]
    : "nie podano";
  return `${packageName}, dodatki: ${addons}, tryb: ${timelineLabel}, wycena: ${priceLabel}. Priorytet klienta: ${priorityLabel}.`;
}

/**
 * Full summary from state. Uses calculatePrice and pricing constants only.
 */
export function buildSummary(state: SummaryInput): SummaryResult {
  const { packageId, features, timeline, projectPriority } = state;

  if (!packageId) {
    return {
      packageName: "",
      total: 0,
      label: "od 0 zł",
      base: 0,
      featuresTotal: 0,
      breakdown: [],
      estimatedTimeline: "",
      qualificationTags: [],
      projectDescription: "",
    };
  }

  const result = calculatePrice(packageId, features, timeline);
  const packageName = PACKAGES[packageId].name;
  const timelineLabel = TIMELINE_MULTIPLIERS[timeline].label;

  const breakdown: BreakdownItem[] = [
    { label: `Pakiet bazowy — ${packageName}`, price: result.base },
  ];

  for (const id of features) {
    if (id in FEATURES) {
      breakdown.push({
        label: FEATURES[id].label,
        price: FEATURES[id].price,
      });
    }
  }

  if (timeline !== "standard") {
    const timelineDiff = result.total - (result.base + result.featuresTotal);
    breakdown.push({
      label: `Tryb realizacji — ${TIMELINE_MULTIPLIERS[timeline].label}`,
      price: Math.round(timelineDiff),
    });
  }

  const estimatedTimelineStr = estimatedTimeline(packageId, timeline);
  const qualificationTags = getQualificationTags(
    packageId,
    features,
    timeline,
    projectPriority,
    result.total
  );
  const featureLabels = features
    .filter((id): id is FeatureId => id in FEATURES)
    .map((id) => FEATURES[id].label);
  const projectDescription = formatProjectDescription(
    packageName,
    featureLabels,
    timelineLabel,
    result.label,
    projectPriority
  );

  return {
    packageName,
    total: result.total,
    label: result.label,
    base: result.base,
    featuresTotal: result.featuresTotal,
    breakdown,
    estimatedTimeline: estimatedTimelineStr,
    qualificationTags,
    projectDescription,
  };
}
