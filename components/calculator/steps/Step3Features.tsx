"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { FeatureId } from "@/types/calculator";
import { FEATURE_IDS } from "@/types/calculator";

const FEATURE_LABELS: Record<FeatureId, string> = {
  "custom-ui": "Indywidualny design UI",
  seo: "Optymalizacja SEO",
  multilingual: "Wielojęzyczność",
  blog: "Sekcja blog",
  "online-payments": "Płatności online",
  booking: "System rezerwacji",
  automation: "Zaawansowana automatyzacja",
  performance: "Optymalizacja wydajności",
};

interface Step3FeaturesProps {
  selected: FeatureId[];
  onToggle: (id: FeatureId) => void;
}

export function Step3Features({ selected, onToggle }: Step3FeaturesProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Zaznacz wszystko, co ma być w projekcie (można wiele).
      </p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {FEATURE_IDS.map((id) => {
          const isChecked = selected.includes(id);
          return (
            <motion.li
              key={id}
              whileTap={{ scale: 0.99 }}
              className="flex"
            >
              <button
                type="button"
                onClick={() => onToggle(id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-colors",
                  isChecked
                    ? "border-accent-orange bg-accent-orange-subtle text-foreground"
                    : "border-border bg-surface-alt text-foreground hover:border-white/25 hover:bg-surface"
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 text-xs",
                    isChecked
                      ? "border-accent-orange bg-accent-orange text-accent-orange-foreground"
                      : "border-border bg-transparent"
                  )}
                >
                  {isChecked ? "✓" : ""}
                </span>
                {FEATURE_LABELS[id]}
              </button>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
