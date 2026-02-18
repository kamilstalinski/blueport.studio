"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ProjectType } from "@/types/calculator";

const OPTIONS: { value: ProjectType; label: string }[] = [
  { value: "company-website", label: "Strona firmowa" },
  { value: "online-store", label: "Sklep internetowy" },
  { value: "dedicated-app", label: "Dedykowana aplikacja (Next.js)" },
  { value: "redesign", label: "Redesign strony" },
];

interface Step1ProjectTypeProps {
  value: ProjectType | null;
  onChange: (value: ProjectType) => void;
}

export function Step1ProjectType({ value, onChange }: Step1ProjectTypeProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Wybierz rodzaj projektu, który Cię interesuje.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {OPTIONS.map((opt) => (
          <motion.button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "rounded-xl border-2 px-5 py-4 text-left text-base font-medium transition-colors",
              value === opt.value
                ? "border-accent-orange bg-accent-orange-subtle text-accent-orange"
                : "border-border bg-surface-alt text-foreground hover:border-white/25 hover:bg-surface"
            )}
          >
            {opt.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
