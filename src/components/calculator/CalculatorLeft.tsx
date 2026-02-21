"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { useCalculator } from "@/hooks/useCalculator";
import { CalculatorProgress } from "./CalculatorProgress";
import { Step1Type } from "./steps/Step1Type";
import { Step2Features } from "./steps/Step2Features";
import { Step3Timeline } from "./steps/Step3Timeline";
import { Step4Budget } from "./steps/Step4Budget";
import { Step5Contact } from "./steps/Step5Contact";

type CalculatorProps = ReturnType<typeof useCalculator>;

const STEPS = [
  Step1Type,
  Step2Features,
  Step3Timeline,
  Step4Budget,
  Step5Contact,
];

const STEP_LABELS = [
  "Typ projektu",
  "Funkcje",
  "Termin",
  "Budżet",
  "Kontakt",
];

export function CalculatorLeft({ calculator }: { calculator: CalculatorProps }) {
  const {
    state,
    canGoNext,
    totalSteps,
    goNext,
    goPrev,
    handleSubmit,
  } = calculator;
  const shouldReduceMotion = useReducedMotion();
  const StepComponent = STEPS[state.step];
  const isLastStep = state.step === totalSteps - 1;

  const slideVariants = {
    enter: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? 32 : -32,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? -32 : 32,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    }),
  };

  return (
    <div className="calc-left">
      <CalculatorProgress
        current={state.step}
        total={totalSteps}
        labels={STEP_LABELS}
      />

      <div className="calc-step-viewport">
        <AnimatePresence custom={state.direction} mode="wait">
          <motion.div
            key={state.step}
            custom={state.direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="calc-step-content"
          >
            <StepComponent calculator={calculator} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="calc-nav">
        {state.step > 0 && (
          <motion.button
            type="button"
            onClick={goPrev}
            whileTap={{ scale: 0.97 }}
            className="calc-btn calc-btn--ghost"
          >
            ← Wróć
          </motion.button>
        )}

        <motion.button
          type="button"
          onClick={isLastStep ? handleSubmit : goNext}
          disabled={!canGoNext || state.isSubmitting}
          whileHover={canGoNext ? { scale: 1.025 } : {}}
          whileTap={canGoNext ? { scale: 0.975 } : {}}
          className="calc-btn calc-btn--primary"
          style={{ marginLeft: "auto" }}
        >
          {state.isSubmitting
            ? "Wysyłam..."
            : isLastStep
              ? "Wyślij zapytanie →"
              : "Dalej →"}
        </motion.button>
      </div>
    </div>
  );
}
