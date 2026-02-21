"use client";

import { cn } from "@/lib/utils";
import type { StepBudgetProps, Urgency } from "@/types";
import { CALC_CARD_BASE, CALC_CARD_UNSELECTED, CALC_CARD_SELECTED } from "../calculatorStyles";
import { estimateTimeline } from "../logic/summary";

export type { StepBudgetProps } from "@/types";

export function StepBudget({
  state,
  urgency,
  onUrgencyChange,
}: StepBudgetProps) {
  const standardTimeline = estimateTimeline({ ...state, urgency: "standard" });
  const expressTimeline = estimateTimeline({ ...state, urgency: "express" });
  const urgencyOptions: { value: Urgency; label: string }[] = [
    { value: "standard", label: `Standard (${standardTimeline})` },
    { value: "express", label: `Ekspres (${expressTimeline}, +20–30%)` },
  ];

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
          {urgencyOptions.map((opt) => {
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
