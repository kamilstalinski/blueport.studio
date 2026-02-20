"use client";

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
      {/* Pasek postępu na całą szerokość */}
      <div className="mb-6 h-1 w-full overflow-hidden rounded-none bg-white/15">
        <div
          className="h-full rounded-none bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Kroki 1–6 wyśrodkowane */}
      <div className="flex justify-center">
        <div className="flex items-center">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => {
            const stepNum = (i + 1) as StepIndex;
            const isActive = currentStep === stepNum;
            const isPast = currentStep > stepNum;
            const isLast = i === TOTAL_STEPS - 1;
            return (
              <div key={stepNum} className="flex items-center">
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-all duration-300",
                    isActive &&
                      "bg-primary text-black ring-2 ring-primary/50 ring-offset-2 ring-offset-[var(--color-bg,transparent)]",
                    isPast && "bg-primary text-black",
                    !isActive && !isPast && "border border-white/25 bg-white/15 text-muted-foreground"
                  )}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isPast ? (
                    <span className="text-sm leading-none" aria-hidden>✓</span>
                  ) : (
                    stepNum
                  )}
                </div>
                {!isLast && (
                  <div
                    className={cn(
                      "w-8 sm:w-12 h-px shrink-0 mx-0.5",
                      isPast ? "bg-primary/60" : "bg-border"
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
