"use client";

import { cn } from "@/lib/utils";
import type { ProjectType, StepProjectTypeProps } from "@/types";
import { PROJECT_TYPE_OPTIONS } from "../logic/calculatorOptions";
import { CALC_CARD_BASE, CALC_CARD_UNSELECTED, CALC_CARD_SELECTED } from "../calculatorStyles";

export type { StepProjectTypeProps } from "@/types";

export function StepProjectType({ value, onChange }: StepProjectTypeProps) {
  return (
    <div data-step="project-type" className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        Czego potrzebujesz?
      </h2>
      <p className="text-muted-foreground">
        Wybierz rodzaj projektu, który najlepiej opisuje Twoje potrzeby.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="group" aria-label="Rodzaj projektu">
        {PROJECT_TYPE_OPTIONS.map((opt) => {
          const isSelected = value === opt.id;
          const label = `${opt.title} — ${opt.subtitle}`;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={cn(
                CALC_CARD_BASE,
                "font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
                isSelected ? CALC_CARD_SELECTED : CALC_CARD_UNSELECTED
              )}
              aria-pressed={isSelected}
              aria-required
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
