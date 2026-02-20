"use client";

import { cn } from "@/lib/utils";
import { IconBox } from "@/components/ui/IconBox";
import { FEATURES_BY_PROJECT_TYPE } from "../logic/constants";
import type { ProjectType, StepFeaturesProps } from "@/types";
import { CALC_CARD_BASE, CALC_CARD_UNSELECTED, CALC_CARD_SELECTED } from "../calculatorStyles";

export type { StepFeaturesProps } from "@/types";

const FEATURE_META: Record<
  string,
  { label: string; description: string; emoji: string }
> = {
  "custom-ui": {
    label: "Projekt graficzny UI na zamówienie",
    description: "Unikalny wygląd i dopasowanie do marki",
    emoji: "🎨",
  },
  "seo-advanced": {
    label: "SEO zaawansowane",
    description: "Meta, schema, sitemap, GSC",
    emoji: "🔍",
  },
  multilingual: {
    label: "Wielojęzyczność",
    description: "WPML lub i18n",
    emoji: "🌐",
  },
  blog: {
    label: "Moduł bloga",
    description: "Aktualności i artykuły",
    emoji: "📄",
  },
  "online-payments": {
    label: "Płatności online",
    description: "Przelewy24, Stripe",
    emoji: "💳",
  },
  booking: {
    label: "System rezerwacji online",
    description: "Rezerwacje / terminy",
    emoji: "📅",
  },
  automation: {
    label: "Automatyzacja",
    description: "Formularze, maile, CRM webhooks",
    emoji: "⚙️",
  },
  performance: {
    label: "Optymalizacja wydajności",
    description: "Core Web Vitals",
    emoji: "📊",
  },
  "headless-cms": {
    label: "CMS headless",
    description: "Sanity / Contentful",
    emoji: "📦",
  },
  "product-filters": {
    label: "Zaawansowane filtry produktów",
    description: "Filtrowanie katalogu",
    emoji: "🔎",
  },
  "abandoned-cart": {
    label: "Odzyskiwanie porzuconych koszyków",
    description: "E-maile, przypomnienia",
    emoji: "🛒",
  },
  "loyalty-program": {
    label: "Program lojalnościowy",
    description: "Punkty, nagrody",
    emoji: "⭐",
  },
};

const INTEGRATION_OPTIONS: { id: string; label: string; emoji: string }[] = [
  { id: "crm", label: "CRM (HubSpot, Pipedrive, Salesforce)", emoji: "📦" },
  { id: "mail", label: "Newsletter / Mail (Mailchimp, Brevo)", emoji: "✉️" },
  { id: "analytics", label: "Analityka (GA4, GTM, Hotjar)", emoji: "📊" },
  { id: "social", label: "Social (Meta Pixel, LinkedIn)", emoji: "🔗" },
  { id: "maps", label: "Mapa Google / lokalizacja", emoji: "📍" },
  { id: "chat", label: "Chat / Messenger (LiveChat, Tidio)", emoji: "💬" },
  { id: "other", label: "Inna integracja", emoji: "🔌" },
];

function toggleInList(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

function getVisibleFeatureIds(projectType: ProjectType | null): string[] {
  if (!projectType) return [];
  return FEATURES_BY_PROJECT_TYPE[projectType] ?? [];
}

export function StepFeatures({
  projectType,
  features,
  integrations,
  onFeaturesChange,
  onIntegrationsChange,
}: StepFeaturesProps) {
  const featureIds = getVisibleFeatureIds(projectType);

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
            const meta = FEATURE_META[id];
            const emoji = meta?.emoji ?? "📦";
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
                    {meta?.label ?? id}
                  </span>
                  {meta?.description && (
                    <span className="mt-0.5 block text-sm text-muted-foreground">
                      {meta.description}
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
        <h3 className="mb-3 text-lg font-medium text-foreground">Integracje (opcjonalnie)</h3>
        <div className="flex flex-wrap gap-3">
          {INTEGRATION_OPTIONS.map(({ id, label, emoji }) => {
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
