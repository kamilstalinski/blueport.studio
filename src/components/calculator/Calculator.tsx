"use client";

import { useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalculatorProvider, useCalculator } from "./context/CalculatorContext";
import type { StepIndex, SummaryResult } from "./types";
import { CalculatorProgressBar } from "./CalculatorProgressBar";
import { StepProjectType } from "./steps/StepProjectType";
import { StepScope } from "./steps/StepScope";
import { StepFeatures } from "./steps/StepFeatures";
import { StepBudget } from "./steps/StepBudget";
import { StepContact } from "./steps/StepContact";
import { StepSummary } from "./steps/StepSummary";
import { Button } from "@/components/ui/Button";

export interface CalculatorProps {
  /** Called when user submits from summary (step 6). Receives summary and contact. */
  onSubmit?: (payload: {
    summary: SummaryResult;
    name: string;
    email: string;
    phone: string;
  }) => void;
  children?: never;
}

const stepVariants = {
  enter: { opacity: 0, x: 12 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -12 },
};

const transition = { duration: 0.28, ease: "easeInOut" };

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

  const validation = useMemo(() => validateStep(step), [validateStep, step]);
  const price = useMemo(() => getPrice(), [getPrice, state]);

  const handleNext = useCallback(() => {
    if (!canGoNext(step)) return;
    if (step < 6) setStep((step + 1) as StepIndex);
  }, [step, setStep, canGoNext]);

  const handleBack = useCallback(() => {
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
    });
    reset();
  }, [
    canSubmit,
    getSummary,
    state.name,
    state.email,
    state.phone,
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
            pagesCount={state.pagesCount}
            onChange={(v) => updateState({ pagesCount: v })}
            projectType={state.projectType}
          />
        );
      case 3:
        return (
          <StepFeatures
            features={state.features}
            seo={state.seo}
            blog={state.blog}
            integrations={state.integrations}
            onFeaturesChange={(v) => updateState({ features: v })}
            onSeoChange={(v) => updateState({ seo: v })}
            onBlogChange={(v) => updateState({ blog: v })}
            onIntegrationsChange={(v) => updateState({ integrations: v })}
          />
        );
      case 4:
        return (
          <StepBudget
            urgency={state.urgency}
            budgetRange={state.budgetRange}
            onUrgencyChange={(v) => updateState({ urgency: v })}
            onBudgetRangeChange={(v) => updateState({ budgetRange: v })}
          />
        );
      case 5:
        return (
          <StepContact
            name={state.name}
            email={state.email}
            phone={state.phone}
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
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
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
