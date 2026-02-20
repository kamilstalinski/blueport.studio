"use client";

import { cn } from "@/lib/utils";
import type { StepBudgetProps, Urgency } from "@/types";
import { CALC_CARD_BASE, CALC_CARD_UNSELECTED, CALC_CARD_SELECTED } from "../calculatorStyles";

export type { StepBudgetProps } from "@/types";

/** Step 4 — Integracje + pilność (urgency only; budget removed). */
const URGENCY_OPTIONS: { value: Urgency; label: string }[] = [
  { value: "standard", label: "Standard (4–6 tygodni)" },
  { value: "express", label: "Ekspres (2–3 tygodnie, +20–30%)" },
];

export function StepBudget({
  urgency,
  onUrgencyChange,
}: StepBudgetProps) {
  return (
    <div data-step="budget" className="space-y-8">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        Termin realizacji
      </h2>
      <p className="text-muted-foreground">
        Wybierz preferowany termin realizacji.
      </p>

      <div>
        <h3 className="mb-3 text-lg font-medium text-foreground">Termin realizacji</h3>
        <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label="Termin">
          {URGENCY_OPTIONS.map((opt) => {
            const isSelected = urgency === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onUrgencyChange(opt.value)}
                className={cn(
                  CALC_CARD_BASE,
                  "font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  isSelected ? CALC_CARD_SELECTED : CALC_CARD_UNSELECTED
                )}
                aria-pressed={isSelected}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
