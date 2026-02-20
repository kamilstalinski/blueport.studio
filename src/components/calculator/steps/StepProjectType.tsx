"use client";

import { cn } from "@/lib/utils";
import type { ProjectType, StepProjectTypeProps } from "@/types";
import { CALC_CARD_BASE, CALC_CARD_UNSELECTED, CALC_CARD_SELECTED } from "../calculatorStyles";

export type { StepProjectTypeProps } from "@/types";

const OPTIONS: { value: ProjectType; label: string }[] = [
  {
    value: "wordpress-standard",
    label: "Strona firmowa Standard — Do 5 podstron, WordPress, SEO basic",
  },
  {
    value: "wordpress-pro",
    label: "Strona firmowa PRO — Rozbudowana, UI na zamówienie, wydajność",
  },
  {
    value: "woocommerce-start",
    label: "Sklep WooCommerce Start — Do 20 produktów, płatności, dostawy",
  },
  {
    value: "woocommerce-pro",
    label: "Sklep WooCommerce PRO — Rozbudowane funkcje, optymalizacja sprzedaży",
  },
  {
    value: "nextjs",
    label: "Projekt dedykowany Next.js — Wysoka wydajność, kod na zamówienie",
  },
];

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
        {OPTIONS.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={cn(
                CALC_CARD_BASE,
                "font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] active:scale-[0.99]",
                isSelected ? CALC_CARD_SELECTED : CALC_CARD_UNSELECTED
              )}
              aria-pressed={isSelected}
              aria-required
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
