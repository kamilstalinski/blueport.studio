"use client";

import { cn } from "@/lib/utils";
import type { ProjectType, StepScopeProps } from "@/types";
import { SCOPE_PRESETS_PAGES, SCOPE_PRESETS_PRODUCTS } from "../logic/calculatorOptions";
import { CALC_CARD_BASE, CALC_CARD_UNSELECTED, CALC_CARD_SELECTED } from "../calculatorStyles";

export type { StepScopeProps } from "@/types";

const PRODUCT_PROJECT_TYPES: ProjectType[] = ["woocommerce-start", "woocommerce-pro"];

function isProductScope(projectType: ProjectType | null): boolean {
  return projectType !== null && PRODUCT_PROJECT_TYPES.includes(projectType);
}

export function StepScope({
  pagesCount,
  productCount,
  onPagesCountChange,
  onProductCountChange,
  projectType,
}: StepScopeProps) {
  if (!projectType) return null;

  if (isProductScope(projectType)) {
    return (
      <div data-step="scope" className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Zakres projektu
        </h2>
        <p className="text-muted-foreground">
          Liczba produktów w sklepie. Możesz wybrać preset lub wpisać własną wartość.
        </p>
        <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-5" role="group" aria-label="Liczba produktów w sklepie">
          {SCOPE_PRESETS_PRODUCTS.map((value) => {
            const isSelected = productCount === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => onProductCountChange(value)}
                className={cn(
                  CALC_CARD_BASE,
                  "font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.99]",
                  isSelected ? CALC_CARD_SELECTED : CALC_CARD_UNSELECTED
                )}
                aria-pressed={isSelected}
              >
                {value}
              </button>
            );
          })}
        </div>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-foreground">Własna liczba produktów</span>
          <input
            type="number"
            min={0}
            max={2000}
            value={productCount || ""}
            onChange={(e) => {
              const parsedValue = parseInt(e.target.value, 10);
              onProductCountChange(Number.isNaN(parsedValue) ? 0 : Math.max(0, Math.min(2000, parsedValue)));
            }}
            placeholder="0"
            className="h-12 w-full max-w-[140px] rounded-xl border border-border bg-white/15 px-4 text-foreground placeholder:text-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Liczba produktów w sklepie"
          />
        </label>
      </div>
    );
  }

  return (
    <div data-step="scope" className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        Zakres projektu
      </h2>
      <p className="text-muted-foreground">
        Oszacuj liczbę podstron. Możesz wybrać preset lub wpisać własną wartość.
      </p>
      <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-5" role="group" aria-label="Liczba podstron">
        {SCOPE_PRESETS_PAGES.map((num) => {
          const isSelected = pagesCount === num;
          return (
            <button
              key={num}
              type="button"
              onClick={() => onPagesCountChange(num)}
              className={cn(
                CALC_CARD_BASE,
                "font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.99]",
                isSelected ? CALC_CARD_SELECTED : CALC_CARD_UNSELECTED
              )}
              aria-pressed={isSelected}
            >
              {num} {num === 1 ? "strona" : "stron"}
            </button>
          );
        })}
      </div>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-foreground">Własna liczba podstron</span>
        <input
          type="number"
          min={0}
          max={50}
          value={pagesCount || ""}
          onChange={(e) => {
            const parsedValue = parseInt(e.target.value, 10);
            onPagesCountChange(Number.isNaN(parsedValue) ? 0 : Math.max(0, Math.min(50, parsedValue)));
          }}
          placeholder="0"
          className="h-12 w-full max-w-[140px] rounded-xl border border-border bg-white/15 px-4 text-foreground placeholder:text-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Liczba podstron"
        />
      </label>
    </div>
  );
}
