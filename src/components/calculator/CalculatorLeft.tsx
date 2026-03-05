"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { useCalculator } from "@/hooks/useCalculator";
import { ease } from "@/constants/animations";
import { CalculatorProgress } from "./CalculatorProgress";
import { Step1Type } from "./steps/Step1Type";
import { Step2Features } from "./steps/Step2Features";
import { Step4Budget } from "./steps/Step4Budget";
import { Step5Contact } from "./steps/Step5Contact";

type CalculatorProps = ReturnType<typeof useCalculator>;

const STEPS = [
  Step1Type,
  Step2Features,
  Step4Budget,
  Step5Contact,
];

const STEP_LABELS = [
  "Typ projektu",
  "Funkcje",
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToTop = () => {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const id = window.setTimeout(scrollToTop, 150);
    return () => window.clearTimeout(id);
  }, [state.step]);

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
        ease: ease.smooth,
      },
    },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? -32 : 32,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: ease.sharp,
      },
    }),
  };

  return (
    <div ref={scrollContainerRef} className="calc-left" style={{ position: "relative" }}>
      <div ref={topRef} aria-hidden className="absolute top-0 left-0 w-px h-px pointer-events-none" />
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
          disabled={!canGoNext || state.isSubmitting || state.isSubmitted}
          whileHover={canGoNext && !state.isSubmitted ? { scale: 1.025 } : {}}
          whileTap={canGoNext && !state.isSubmitted ? { scale: 0.975 } : {}}
          className="calc-btn calc-btn--primary"
          style={{ marginLeft: "auto" }}
        >
          {state.isSubmitted && isLastStep
            ? "Wysłano ✓"
            : state.isSubmitting
              ? "Wysyłam..."
              : isLastStep
                ? "Wyślij zapytanie →"
                : "Dalej →"}
        </motion.button>
      </div>
    </div>
  );
}
