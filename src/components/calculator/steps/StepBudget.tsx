"use client";

import { cn } from "@/lib/utils";
import type { StepBudgetProps, Urgency } from "@/types";
import { BUDGET_RANGES } from "../logic/calculatorOptions";
import { CALC_CARD_BASE, CALC_CARD_UNSELECTED, CALC_CARD_SELECTED } from "../calculatorStyles";

export type { StepBudgetProps } from "@/types";

const URGENCY_OPTIONS: { value: Urgency; label: string }[] = [
  { value: "standard", label: "Standard (4–6 tygodni)" },
  { value: "express", label: "Ekspres (2–3 tygodnie, +20–30%)" },
];

export function StepBudget({
  urgency,
  budgetRange,
  onUrgencyChange,
  onBudgetRangeChange,
}: StepBudgetProps) {
  return (
    <div data-step="budget" className="space-y-8">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        Termin i budżet
      </h2>
      <p className="text-muted-foreground">
        Wybierz preferowany termin realizacji oraz orientacyjny przedział budżetowy.
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
                  "font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.99]",
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

      <div>
        <h3 className="mb-3 text-lg font-medium text-foreground">Orientacyjny budżet (opcjonalnie)</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" role="group" aria-label="Budżet">
          {BUDGET_RANGES.map((opt) => {
            const isSelected = budgetRange === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onBudgetRangeChange(opt.value)}
                className={cn(
                  CALC_CARD_BASE,
                  "font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.99]",
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
