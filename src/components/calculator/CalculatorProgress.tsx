"use client";

import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { PixelIcon } from "@/components/brand/PixelIcon";
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
        <m.div
          className="calc-progress-fill"
          animate={{ width: `${((current + 1) / total) * 100}%` }}
          transition={{ duration: 0.5, ease: ease.out }}
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
            <div className="calc-step-dot">
              {i < current ? <PixelIcon name="check" /> : i + 1}
            </div>
            <span className="calc-step-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
