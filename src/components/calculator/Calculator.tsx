"use client";

import { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { ease, duration } from "@/constants/animations";

import { CalculatorProvider, useCalculator } from "./context/CalculatorContext";
import { CalculatorProgressBar } from "./CalculatorProgressBar";
import { StepBudget } from "./steps/StepBudget";
import { StepContact } from "./steps/StepContact";
import { StepFeatures } from "./steps/StepFeatures";
import { StepProjectType } from "./steps/StepProjectType";
import { StepScope } from "./steps/StepScope";
import { StepSummary } from "./steps/StepSummary";

import type { CalculatorProps, StepIndex } from "@/types";

const stepVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: duration.slow, ease: ease.spring },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -48 : 48,
    opacity: 0,
    transition: { duration: duration.base, ease: ease.sharp },
  }),
};

export type { CalculatorProps } from "@/types";

function CalculatorInner({ onSubmit }: CalculatorProps) {
  const {
    state,
    step,
    setStep,
    updateState,
    getSummary,
    getPrice,
    validateStep,
    canGoNext,
    canSubmit,
    reset,
  } = useCalculator();

  const [direction, setDirection] = useState(1);
  const validation = useMemo(() => validateStep(step), [validateStep, step]);
  const price = useMemo(() => getPrice(), [getPrice, state]);

  const handleNext = useCallback(() => {
    if (!canGoNext(step)) return;
    setDirection(1);
    if (step < 6) setStep((step + 1) as StepIndex);
  }, [step, setStep, canGoNext]);

  const handleBack = useCallback(() => {
    setDirection(-1);
    if (step > 1) setStep((step - 1) as StepIndex);
  }, [step, setStep]);

  const handleSubmit = useCallback(() => {
    if (!canSubmit) return;
    const summary = getSummary();
    onSubmit?.({
      summary,
      name: state.name,
      email: state.email,
      phone: state.phone,
      projectPriority: state.projectPriority,
      qualificationTags: summary.qualificationTags,
    });
    reset();
  }, [
    canSubmit,
    getSummary,
    state.name,
    state.email,
    state.phone,
    state.projectPriority,
    onSubmit,
    reset,
  ]);

  const currentStepContent = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <StepProjectType
            value={state.projectType}
            onChange={(v) => updateState({ projectType: v })}
          />
        );
      case 2:
        return (
          <StepScope
            pagesCount={state.scopeUnit === "pages" ? state.scopeCount : 0}
            productCount={state.scopeUnit === "products" ? state.scopeCount : 0}
            onPagesCountChange={(v) => updateState({ scopeCount: v })}
            onProductCountChange={(v) => updateState({ scopeCount: v })}
            projectType={state.projectType}
          />
        );
      case 3:
        return (
          <StepFeatures
            projectType={state.projectType}
            features={state.features}
            languageCount={state.languageCount}
            integrations={state.integrations}
            onFeaturesChange={(v) => updateState({ features: v })}
            onLanguageCountChange={(v) => updateState({ languageCount: v })}
            onIntegrationsChange={(v) => updateState({ integrations: v })}
          />
        );
      case 4:
        return (
          <StepBudget
            urgency={state.urgency}
            onUrgencyChange={(v) => updateState({ urgency: v })}
          />
        );
      case 5:
        return (
          <StepContact
            projectPriority={state.projectPriority}
            name={state.name}
            email={state.email}
            phone={state.phone}
            onProjectPriorityChange={(v) => updateState({ projectPriority: v })}
            onNameChange={(v) => updateState({ name: v })}
            onEmailChange={(v) => updateState({ email: v })}
            onPhoneChange={(v) => updateState({ phone: v })}
            error={validation.valid ? undefined : validation.error}
          />
        );
      case 6:
        return <StepSummary summary={getSummary()} />;
      default:
        return null;
    }
  }, [step, state, updateState, validation.valid, validation.error, getSummary]);

  const showLivePrice =
    state.projectType &&
    (price.minPrice > 0 || price.maxPrice > 0) &&
    step < 6;

  return (
    <>
      {/* Pasek i numery na pełną szerokość karty (bez paddingu) */}
      <CalculatorProgressBar currentStep={step} />

      <div className="p-4 sm:p-6 md:p-8">
        <div
          data-calculator
          data-step={step}
          className="relative"
        >
          <div
            className="min-h-[320px] mt-6"
            style={{ minHeight: "20rem" }}
          >
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={step}
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                {currentStepContent}
              </motion.div>
            </AnimatePresence>
          </div>

          <nav
            className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6"
            aria-label="Nawigacja kalkulatora"
          >
        <div className={step === 1 ? "invisible" : ""}>
          <Button
            type="button"
            variant="ghost"
            onClick={handleBack}
            data-calculator-back
          >
            Wstecz
          </Button>
        </div>
        <div className="flex items-center gap-4">
          {showLivePrice && (
            <span className="text-right text-sm text-muted-foreground" aria-live="polite">
              Szacunek: {price.minPrice.toLocaleString("pl-PL")} – {price.maxPrice.toLocaleString("pl-PL")} zł
            </span>
          )}
          {step < 6 && (
            <Button
              type="button"
              variant="primary"
              onClick={handleNext}
              disabled={!canGoNext(step)}
              data-calculator-next
            >
              Dalej
            </Button>
          )}
          {step === 6 && (
            <Button
              type="button"
              variant="primary"
              onClick={handleSubmit}
              disabled={!canSubmit}
              data-calculator-submit
            >
              Wyślij wycenę
            </Button>
          )}
        </div>
      </nav>
        </div>
      </div>
    </>
  );
}

export function Calculator(props: CalculatorProps) {
  return (
    <CalculatorProvider>
      <CalculatorInner {...props} />
    </CalculatorProvider>
  );
}
