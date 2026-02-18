"use client";

import { cn } from "@/lib/utils";
import {
  Palette,
  Search,
  Languages,
  FileText,
  CreditCard,
  Calendar,
  Workflow,
  Gauge,
  Mail,
  BarChart3,
  Share2,
  Box,
} from "lucide-react";
import { FEATURE_COSTS } from "../logic/constants";
import { CALC_CARD_BASE, CALC_CARD_UNSELECTED, CALC_CARD_SELECTED } from "../calculatorStyles";

const FEATURE_IDS = Object.keys(FEATURE_COSTS) as string[];

type LucideIconProps = { className?: string; strokeWidth?: number };

const FEATURE_META: Record<
  string,
  { label: string; description: string; icon: React.ComponentType<LucideIconProps> }
> = {
  "custom-ui": {
    label: "Indywidualny design UI",
    description: "Unikalny wygląd i dopasowanie do marki",
    icon: Palette,
  },
  seo: {
    label: "Optymalizacja SEO",
    description: "Lepsza widoczność w wyszukiwarkach",
    icon: Search,
  },
  multilingual: {
    label: "Wielojęzyczność",
    description: "Wersje językowe strony",
    icon: Languages,
  },
  blog: {
    label: "Sekcja blog",
    description: "Aktualności i artykuły",
    icon: FileText,
  },
  "online-payments": {
    label: "Płatności online",
    description: "Integracja z bramkami płatności",
    icon: CreditCard,
  },
  booking: {
    label: "System rezerwacji",
    description: "Rezerwacje / terminy online",
    icon: Calendar,
  },
  automation: {
    label: "Zaawansowana automatyzacja",
    description: "Procesy i powiadomienia",
    icon: Workflow,
  },
  performance: {
    label: "Optymalizacja wydajności",
    description: "Szybsze ładowanie i cache",
    icon: Gauge,
  },
};

const INTEGRATION_OPTIONS: { id: string; label: string; icon: React.ComponentType<LucideIconProps> }[] = [
  { id: "crm", label: "CRM", icon: Box },
  { id: "mail", label: "Newsletter / Mail", icon: Mail },
  { id: "analytics", label: "Analityka", icon: BarChart3 },
  { id: "social", label: "Social media", icon: Share2 },
  { id: "other", label: "Inne", icon: Box },
];

function toggleInList(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

export interface StepFeaturesProps {
  features: string[];
  seo: boolean;
  blog: boolean;
  integrations: string[];
  onFeaturesChange: (value: string[]) => void;
  onSeoChange: (value: boolean) => void;
  onBlogChange: (value: boolean) => void;
  onIntegrationsChange: (value: string[]) => void;
}

export function StepFeatures({
  features,
  seo,
  blog,
  integrations,
  onFeaturesChange,
  onSeoChange,
  onBlogChange,
  onIntegrationsChange,
}: StepFeaturesProps) {
  return (
    <div data-step="features" className="space-y-8">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        Funkcje i dodatki
      </h2>
      <p className="text-muted-foreground">
        Zaznacz wszystko, co ma być w projekcie. Możesz wybrać wiele opcji.
      </p>

      <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label="Funkcje">
        {FEATURE_IDS.map((id) => {
          const meta = FEATURE_META[id];
          const Icon = meta?.icon ?? Box;
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
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                  isChecked ? "bg-primary/20 text-primary" : "bg-white/10 text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5" strokeWidth={2} />
              </span>
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

      <div>
        <h3 className="mb-3 text-lg font-medium text-foreground">Dodatki</h3>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onSeoChange(!seo)}
            className={cn(
              CALC_CARD_BASE,
              "flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              seo ? CALC_CARD_SELECTED : CALC_CARD_UNSELECTED
            )}
            aria-pressed={seo}
          >
            <Search className="h-5 w-5 shrink-0" strokeWidth={2} />
            <span className="font-medium">SEO zaawansowane</span>
          </button>
          <button
            type="button"
            onClick={() => onBlogChange(!blog)}
            className={cn(
              CALC_CARD_BASE,
              "flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              blog ? CALC_CARD_SELECTED : CALC_CARD_UNSELECTED
            )}
            aria-pressed={blog}
          >
            <FileText className="h-5 w-5 shrink-0" strokeWidth={2} />
            <span className="font-medium">Blog</span>
          </button>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-medium text-foreground">Integracje (opcjonalnie)</h3>
        <div className="flex flex-wrap gap-3">
          {INTEGRATION_OPTIONS.map(({ id, label, icon: Icon }) => {
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
                <Icon className="h-5 w-5 shrink-0" strokeWidth={2} />
                <span className="font-medium">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
