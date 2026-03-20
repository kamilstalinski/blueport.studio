"use client";

import { m } from "framer-motion";
import { duration, ease } from "@/constants/animations";
import { cn } from "@/lib/utils";
import type { CalculatorProgressBarProps, StepIndex } from "@/types";

export type { CalculatorProgressBarProps } from "@/types";

const TOTAL_STEPS = 6;

export function CalculatorProgressBar({
  currentStep,
  className,
}: CalculatorProgressBarProps) {
  const progressPercent = (currentStep / TOTAL_STEPS) * 100;

  return (
    <div
      className={cn("relative w-full min-w-0 pb-6", className)}
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={TOTAL_STEPS}
      aria-label={`Krok ${currentStep} z ${TOTAL_STEPS}`}
    >
      {/* Progress bar spans the full width */}
      <div className="mb-6 h-1 w-full overflow-hidden rounded-none bg-white/15">
        <m.div
          className="h-full rounded-none bg-primary"
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: duration.slow, ease: ease.spring }}
        />
      </div>

      {/* Steps 1–6 are centered; connector lines are always visible */}
      <div className="flex justify-center overflow-x-auto px-1">
        <div className="flex items-center min-w-0">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => {
            const stepNum = (i + 1) as StepIndex;
            const isActive = currentStep === stepNum;
            const isPast = currentStep > stepNum;
            const isLast = i === TOTAL_STEPS - 1;
            return (
              <div key={stepNum} className="flex items-center shrink-0">
                <div
                  className={cn(
                    "flex shrink-0 items-center justify-center rounded-full font-medium transition-all duration-300",
                    "h-7 w-7 text-xs sm:h-9 sm:w-9 sm:text-sm",
                    isActive &&
                      "bg-primary text-black ring-2 ring-primary/50 ring-offset-2 ring-offset-[var(--color-bg,transparent)]",
                    isPast && "bg-primary text-black",
                    !isActive && !isPast && "border border-white/25 bg-white/15 text-muted-foreground"
                  )}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isPast ? (
                    <span className="text-xs sm:text-sm leading-none" aria-hidden>✓</span>
                  ) : (
                    stepNum
                  )}
                </div>
                {!isLast && (
                  <div
                    className={cn(
                      "h-px shrink-0 mx-0.5 sm:mx-1",
                      "w-4 sm:w-8 md:w-12",
                      "bg-white/30",
                      isPast && "bg-primary/70"
                    )}
                    aria-hidden
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
