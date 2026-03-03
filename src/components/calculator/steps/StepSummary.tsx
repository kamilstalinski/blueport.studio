"use client";

import { CALC_GLASS_CARD } from "../calculatorStyles";
import { cn } from "@/lib/utils";
import type { StepSummaryProps } from "@/types";

export function StepSummary({ summary }: StepSummaryProps) {
  return (
    <div data-step="summary" className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        Podsumowanie wyceny
      </h2>
      <p className="text-muted-foreground">
        Sprawdź zebrane informacje. Po wysłaniu skontaktujemy się z doprecyzowaniem oferty.
      </p>

      <div className={cn(CALC_GLASS_CARD, "p-6 md:p-8")}>
        <p className="mb-4 text-sm text-muted-foreground">
          {summary.projectDescription}
        </p>
        <p className="mb-1 text-sm font-medium text-foreground/90">
          Szacowany czas realizacji
        </p>
        <p className="mb-6 text-foreground">
          {summary.estimatedTimeline}
        </p>

        <div className="border-t border-border pt-6">
          <p className="mb-1 text-sm font-medium text-foreground/90">
            Szacowana wycena
          </p>
          <p className="text-3xl font-bold tracking-tight text-foreground">
            {summary.estimate.minPrice === summary.estimate.maxPrice
              ? `${summary.estimate.minPrice.toLocaleString("pl-PL")} zł`
              : `${summary.estimate.minPrice.toLocaleString("pl-PL")} – ${summary.estimate.maxPrice.toLocaleString("pl-PL")} zł`}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            To orientacyjna wycena. Finalna cena ustalana jest po rozmowie.
          </p>
        </div>

        {summary.breakdown.length > 0 && (
          <ul className="mt-6 space-y-2 border-t border-border pt-6">
            {summary.breakdown.map((item, i) => (
              <li
                key={i}
                className="flex flex-wrap items-center justify-between gap-2 text-sm"
              >
                <span className="text-foreground">{item.label}</span>
                <span className="text-foreground">
                  {item.min === item.max
                    ? `${item.min.toLocaleString("pl-PL")} zł`
                    : `${item.min.toLocaleString("pl-PL")} – ${item.max.toLocaleString("pl-PL")} zł`}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
