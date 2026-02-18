"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCalculatorStore } from "@/store/calculatorStore";
import { calculatePrice } from "@/lib/pricingLogic";
import type {
  ProjectType,
  WebsiteScope,
  StoreScope,
  TimelineOption,
  FeatureId,
  CalculatorStep,
  SubmittedLead,
} from "@/types/calculator";
import { ProgressBar } from "./ProgressBar";
import { StepWrapper } from "./StepWrapper";
import { ResultScreen } from "./ResultScreen";
import { Step1ProjectType } from "./steps/Step1ProjectType";
import { Step2Scope } from "./steps/Step2Scope";
import { Step3Features } from "./steps/Step3Features";
import { Step4Timeline } from "./steps/Step4Timeline";
import { Step5Contact, type ContactFormValues } from "./steps/Step5Contact";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const STEP_TITLES: Record<CalculatorStep, string> = {
  1: "Czego potrzebujesz?",
  2: "Zakres",
  3: "Design i funkcje",
  4: "Termin",
  5: "Kontakt",
};

async function submitLead(payload: SubmittedLead): Promise<void> {
  if (process.env.NODE_ENV === "development") {
    console.log("[Calculator Lead]", JSON.stringify(payload, null, 2));
  }
  await new Promise((r) => setTimeout(r, 800));
}

export function CalculatorForm() {
  const {
    step,
    formData,
    result,
    isSubmitted,
    setStep,
    setFormData,
    setResult,
    setSubmitted,
  } = useCalculatorStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const canGoNext =
    (step === 1 && formData.projectType) ||
    (step === 2 &&
      (formData.projectType === "dedicated-app" ||
        (formData.projectType === "company-website" && formData.websiteScope) ||
        (formData.projectType === "online-store" && formData.storeScope) ||
        (formData.projectType === "redesign" && formData.websiteScope))) ||
    (step === 3 && true) ||
    (step === 4 && formData.timeline);

  const handleNext = () => {
    if (step < 5) setStep((step + 1) as CalculatorStep);
  };

  const handleBack = () => {
    if (step > 1) setStep((step - 1) as CalculatorStep);
  };

  const handleContactSubmit = async (data: ContactFormValues) => {
    if (
      !formData.projectType ||
      !formData.timeline
    ) return;
    setIsSubmitting(true);
    setSubmitError(null);
    const websiteScope =
      formData.projectType === "company-website" || formData.projectType === "redesign"
        ? formData.websiteScope
        : null;
    const storeScope =
      formData.projectType === "online-store" ? formData.storeScope : null;
    const priceResult = calculatePrice(
      formData.projectType,
      websiteScope,
      storeScope,
      formData.features,
      formData.timeline
    );
    setFormData({
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone ?? "",
      description: data.description ?? "",
    });
    const lead: SubmittedLead = {
      formData: { ...formData, ...data, phone: data.phone ?? "", description: data.description ?? "" },
      result: priceResult,
      submittedAt: new Date().toISOString(),
    };
    try {
      await submitLead(lead);
      setResult(priceResult);
      setSubmitted(true);
    } catch {
      setSubmitError("Wysyłanie nie powiodło się. Spróbuj ponownie.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (result && isSubmitted) {
    return (
      <div className="pt-12">
        <ProgressBar currentStep={5} />
        <Container className="pt-16 pb-24">
          <div className="mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-accent-orange/30 bg-accent-orange-subtle/30 p-4 text-center text-sm text-foreground"
            >
              Dziękujemy! Wycena została zapisana. Skontaktujemy się wkrótce.
            </motion.div>
            <ResultScreen result={result} />
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-12">
      <ProgressBar currentStep={step} />
      <Container className="pt-16 pb-32">
        <div className="mx-auto max-w-2xl">
          <AnimatePresence mode="wait">
            <StepWrapper step={step}>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {STEP_TITLES[step]}
              </h1>
              <div className="mt-8">
                {step === 1 && (
                  <Step1ProjectType
                    value={formData.projectType}
                    onChange={(v) => setFormData({ projectType: v })}
                  />
                )}
                {step === 2 && formData.projectType && (
                  <Step2Scope
                    projectType={formData.projectType}
                    websiteScope={formData.websiteScope}
                    storeScope={formData.storeScope}
                    onWebsiteScope={(v) => setFormData({ websiteScope: v })}
                    onStoreScope={(v) => setFormData({ storeScope: v })}
                  />
                )}
                {step === 3 && (
                  <Step3Features
                    selected={formData.features}
                    onToggle={(id) => {
                      const next = formData.features.includes(id)
                        ? formData.features.filter((f) => f !== id)
                        : [...formData.features, id];
                      setFormData({ features: next });
                    }}
                  />
                )}
                {step === 4 && (
                  <Step4Timeline
                    value={formData.timeline}
                    onChange={(v) => setFormData({ timeline: v })}
                  />
                )}
                {step === 5 && (
                  <>
                    {submitError && (
                      <p className="mb-4 text-sm text-accent-orange">{submitError}</p>
                    )}
                    <Step5Contact
                      defaultValues={{
                      name: formData.name,
                      company: formData.company,
                      email: formData.email,
                      phone: formData.phone,
                      description: formData.description,
                    }}
                    onSubmit={handleContactSubmit}
                    isSubmitting={isSubmitting}
                    />
                  </>
                )}
              </div>
            </StepWrapper>
          </AnimatePresence>

          {step < 5 && (
            <div className="mt-10 border-t border-border/80 bg-background/50 px-4 py-4 backdrop-blur-sm sm:px-6">
              <div className="flex items-center justify-between gap-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleBack}
                  className={step === 1 ? "invisible" : ""}
                >
                  Wstecz
                </Button>
                {step === 5 ? null : (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!canGoNext}
                  >
                    Dalej
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
