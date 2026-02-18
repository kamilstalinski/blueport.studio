"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TimelineOption } from "@/types/calculator";

const OPTIONS: { value: TimelineOption; label: string }[] = [
  { value: "no-rush", label: "Bez pośpiechu" },
  { value: "2-4-weeks", label: "2–4 tygodnie" },
  { value: "1-2-weeks", label: "1–2 tygodnie (priorytet)" },
];

interface Step4TimelineProps {
  value: TimelineOption | null;
  onChange: (value: TimelineOption) => void;
}

export function Step4Timeline({ value, onChange }: Step4TimelineProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        W jakim czasie chcesz uruchomić projekt?
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
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
