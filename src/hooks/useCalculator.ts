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
import {
  calculatePrice,
  TIMELINE_MULTIPLIERS,
  type PackageId,
  type FeatureId,
  type TimelineId,
} from "@/constants/pricing";

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
    if (!state.projectType) {
      return {
        base: 0,
        featuresTotal: 0,
        timelineMultiplier: 1.0,
        total: 0,
        label: "Wybierz opcje",
      };
    }
    const packageId = state.projectType as PackageId;
    const features = state.features as FeatureId[];
    const timeline: TimelineId = state.timeline ?? "standard";
    const result = calculatePrice(packageId, features, timeline);
    const timelineMultiplier = TIMELINE_MULTIPLIERS[timeline].multiplier;
    return {
      ...result,
      timelineMultiplier,
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
