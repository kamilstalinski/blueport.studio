"use client";

import { useState, useCallback, useMemo } from "react";
import type {
  CalculatorState,
  ContactData,
  PriceSummary,
  ProjectFeature,
  ProjectType,
  Timeline,
  BudgetRange,
} from "@/types/calculator.types";

// ─── Cennik bazowy (eksport dla CalculatorRight breakdown) ─────────────────
export const BASE_PRICES: Record<NonNullable<ProjectType>, number> = {
  wordpress: 2500,
  woocommerce: 4000,
  nextjs: 6000,
};

export const FEATURE_PRICES: Record<ProjectFeature, number> = {
  seo: 500,
  copywriting: 800,
  animations: 600,
  cms: 400,
  integrations: 700,
  hosting: 300,
};

const TIMELINE_MULTIPLIERS: Record<NonNullable<Timeline>, number> = {
  express: 1.3, // +30% za ekspresowe
  standard: 1.0,
  relaxed: 0.95, // -5% za elastyczny termin
};

// ─── Hook ────────────────────────────────────────────────────
const TOTAL_STEPS = 5;

const initialState: CalculatorState = {
  step: 0,
  direction: 1,
  projectType: null,
  features: [],
  timeline: null,
  budget: null,
  contact: { name: "", email: "", phone: "", message: "" },
  isSubmitting: false,
  isSubmitted: false,
  error: null,
};

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>(initialState);

  const goNext = useCallback(() => {
    setState((s) => ({
      ...s,
      step: Math.min(s.step + 1, TOTAL_STEPS - 1),
      direction: 1,
    }));
  }, []);

  const goPrev = useCallback(() => {
    setState((s) => ({
      ...s,
      step: Math.max(s.step - 1, 0),
      direction: -1,
    }));
  }, []);

  const setProjectType = useCallback((type: ProjectType) => {
    setState((s) => ({ ...s, projectType: type }));
  }, []);

  const toggleFeature = useCallback((feature: ProjectFeature) => {
    setState((s) => ({
      ...s,
      features: s.features.includes(feature)
        ? s.features.filter((f) => f !== feature)
        : [...s.features, feature],
    }));
  }, []);

  const setTimeline = useCallback((timeline: Timeline) => {
    setState((s) => ({ ...s, timeline }));
  }, []);

  const setBudget = useCallback((budget: BudgetRange) => {
    setState((s) => ({ ...s, budget }));
  }, []);

  const setContact = useCallback((field: keyof ContactData, value: string) => {
    setState((s) => ({
      ...s,
      contact: { ...s.contact, [field]: value },
    }));
  }, []);

  const canGoNext = useMemo((): boolean => {
    switch (state.step) {
      case 0:
        return state.projectType !== null;
      case 1:
        return true;
      case 2:
        return state.timeline !== null;
      case 3:
        return state.budget !== null;
      case 4:
        return (
          state.contact.name.trim().length > 1 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.contact.email)
        );
      default:
        return false;
    }
  }, [state]);

  const priceSummary = useMemo((): PriceSummary => {
    const base = state.projectType ? BASE_PRICES[state.projectType] : 0;
    const featuresTotal = state.features.reduce(
      (sum, f) => sum + FEATURE_PRICES[f],
      0
    );
    const multiplier = state.timeline
      ? TIMELINE_MULTIPLIERS[state.timeline]
      : 1.0;

    const subtotal = base + featuresTotal;
    const total = Math.round((subtotal * multiplier) / 100) * 100;

    const label =
      total === 0
        ? "Wybierz opcje"
        : state.timeline === "express"
          ? `od ${total.toLocaleString("pl-PL")} zł`
          : `${total.toLocaleString("pl-PL")} – ${(total * 1.15).toLocaleString("pl-PL")} zł`;

    return {
      base,
      featuresTotal,
      timelineMultiplier: multiplier,
      total,
      label,
    };
  }, [state.projectType, state.features, state.timeline]);

  const handleSubmit = useCallback(async () => {
    setState((s) => ({ ...s, isSubmitting: true, error: null }));
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...state.contact,
          projectType: state.projectType,
          features: state.features,
          timeline: state.timeline,
          budget: state.budget,
          estimatedPrice: priceSummary.label,
        }),
      });
      if (!response.ok) throw new Error("Błąd wysyłania");
      setState((s) => ({ ...s, isSubmitting: false, isSubmitted: true }));
    } catch {
      setState((s) => ({
        ...s,
        isSubmitting: false,
        error:
          "Coś poszło nie tak. Napisz bezpośrednio na kontakt@blueport.studio",
      }));
    }
  }, [state, priceSummary.label]);

  return {
    state,
    priceSummary,
    canGoNext,
    totalSteps: TOTAL_STEPS,
    goNext,
    goPrev,
    setProjectType,
    toggleFeature,
    setTimeline,
    setBudget,
    setContact,
    handleSubmit,
  };
}
