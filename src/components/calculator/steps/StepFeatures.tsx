"use client";

import { cn } from "@/lib/utils";
import { IconBox } from "@/components/ui/IconBox";
import { FEATURES_BY_TYPE, LANGUAGE_OPTIONS, INTEGRATION_OPTIONS as INTEGRATION_OPTIONS_DATA } from "../logic/calculatorOptions";
import type { ProjectType, StepFeaturesProps } from "@/types";
import { CALC_CARD_BASE, CALC_CARD_UNSELECTED, CALC_CARD_SELECTED } from "../calculatorStyles";

export type { StepFeaturesProps } from "@/types";

const FEATURE_EMOJI: Record<string, string> = {
  "custom-ui-upgrade": "🎨",
  "seo-advanced": "🔍",
  multilingual: "🌐",
  blog: "📄",
  booking: "📅",
  automation: "⚙️",
  performance: "📊",
  "product-filters": "🔎",
  "product-variants": "📐",
  "abandoned-cart": "🛒",
  "loyalty-program": "⭐",
  "wholesaler-feed": "📦",
  "headless-cms": "📦",
  "online-payments": "💳",
};

const INTEGRATION_EMOJI: Record<string, string> = {
  crm: "📦",
  mail: "✉️",
  analytics: "📊",
  social: "🔗",
  maps: "📍",
  chat: "💬",
  pos: "🖵",
  erp: "📋",
  other: "🔌",
};

function toggleInList(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

function getVisibleFeatureIds(projectType: ProjectType | null, languageCount: number): string[] {
  if (!projectType) return [];
  const features = FEATURES_BY_TYPE[projectType] ?? [];
  return features
    .map((f) => f.id)
    .filter((id) => id !== "multilingual" || languageCount <= 1);
}

export function StepFeatures({
  projectType,
  features,
  languageCount,
  integrations,
  onFeaturesChange,
  onLanguageCountChange,
  onIntegrationsChange,
}: StepFeaturesProps) {
  const featureIds = getVisibleFeatureIds(projectType, languageCount);
  const isWoo = projectType === "woocommerce-start" || projectType === "woocommerce-pro";
  const integrationOptions = INTEGRATION_OPTIONS_DATA.filter((i) => !i.woocommerceOnly || isWoo);

  return (
    <div data-step="features" className="space-y-8">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        Funkcje i dodatki
      </h2>
      <p className="text-muted-foreground">
        Zaznacz wszystko, co ma być w projekcie. Możesz wybrać wiele opcji.
      </p>

      {featureIds.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label="Funkcje">
          {featureIds.map((id) => {
            const feature = FEATURES_BY_TYPE[projectType!]?.find((f) => f.id === id);
            const emoji = FEATURE_EMOJI[id] ?? "📦";
            const isChecked = features.includes(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => onFeaturesChange(toggleInList(features, id))}
                className={cn(
                  CALC_CARD_BASE,
                  "flex items-start gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.99]",
                  isChecked ? CALC_CARD_SELECTED : CALC_CARD_UNSELECTED
                )}
                aria-pressed={isChecked}
              >
                <IconBox emoji={emoji} className="shrink-0" />
                <span className="flex-1">
                  <span className="block font-medium">
                    {feature?.label ?? id}
                  </span>
                  {feature?.description && (
                    <span className="mt-0.5 block text-sm text-muted-foreground">
                      {feature.description}
                    </span>
                  )}
                </span>
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-medium",
                    isChecked
                      ? "border-primary bg-primary/20 text-primary"
                      : "border-white/30 bg-transparent"
                  )}
                >
                  {isChecked ? "✓" : ""}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <div>
        <h3 className="mb-3 text-lg font-medium text-foreground">Liczba języków</h3>
        <div className="flex flex-wrap gap-3" role="group" aria-label="Liczba języków">
          {LANGUAGE_OPTIONS.map(({ value, label }) => {
            const isSelected = languageCount === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => onLanguageCountChange(value)}
                className={cn(
                  CALC_CARD_BASE,
                  "font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.99]",
                  isSelected ? CALC_CARD_SELECTED : CALC_CARD_UNSELECTED
                )}
                aria-pressed={isSelected}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-medium text-foreground">Integracje (opcjonalnie)</h3>
        <div className="flex flex-wrap gap-3">
          {integrationOptions.map(({ id, label }) => {
            const emoji = INTEGRATION_EMOJI[id] ?? "🔌";
            const isChecked = integrations.includes(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() =>
                  onIntegrationsChange(toggleInList(integrations, id))
                }
                className={cn(
                  CALC_CARD_BASE,
                  "flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  isChecked ? CALC_CARD_SELECTED : CALC_CARD_UNSELECTED
                )}
                aria-pressed={isChecked}
              >
                <IconBox emoji={emoji} className="shrink-0" />
                <span className="font-medium">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
