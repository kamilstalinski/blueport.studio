"use client";

import { cn } from "@/lib/utils";
import type { ProjectType } from "../types";
import { CALC_CARD_BASE, CALC_CARD_UNSELECTED, CALC_CARD_SELECTED } from "../calculatorStyles";

const PRESET_PAGES = [5, 10, 15, 20, 30];

export interface StepScopeProps {
  pagesCount: number;
  onChange: (value: number) => void;
  projectType: ProjectType | null;
}

export function StepScope({ pagesCount, onChange, projectType }: StepScopeProps) {
  if (!projectType) return null;

  return (
    <div data-step="scope" className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        Zakres projektu
      </h2>
      <p className="text-muted-foreground">
        Oszacuj liczbę podstron. Możesz wybrać preset lub wpisać własną wartość.
      </p>
      <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-5" role="group" aria-label="Liczba podstron">
        {PRESET_PAGES.map((num) => {
          const isSelected = pagesCount === num;
          return (
            <button
              key={num}
              type="button"
              onClick={() => onChange(num)}
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
          max={100}
          value={pagesCount || ""}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            onChange(Number.isNaN(v) ? 0 : Math.max(0, Math.min(100, v)));
          }}
          placeholder="0"
          className="h-12 w-full max-w-[140px] rounded-xl border border-border bg-white/15 px-4 text-foreground placeholder:text-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Liczba podstron"
        />
      </label>
    </div>
  );
}
