"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ease } from "@/constants/animations";

type CalculatorProgressProps = {
  current: number;
  total: number;
  labels: string[];
};

export function CalculatorProgress({
  current,
  total,
  labels,
}: CalculatorProgressProps) {
  return (
    <div className="calc-progress">
      <div className="calc-progress-track">
        <motion.div
          className="calc-progress-fill"
          animate={{ width: `${((current + 1) / total) * 100}%` }}
          transition={{ duration: 0.5, ease: ease.smooth }}
        />
      </div>

      <div className="calc-progress-steps">
        {labels.map((label, i) => (
          <div
            key={label}
            className={cn(
              "calc-progress-step",
              i < current && "done",
              i === current && "active"
            )}
          >
            <motion.div
              className="calc-step-dot"
              animate={{
                background:
                  i <= current ? "var(--color-primary)" : "rgba(255,255,255,0.1)",
                scale: i === current ? 1.15 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {i < current ? "✓" : i + 1}
            </motion.div>
            <span className="calc-step-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
