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
  type TimelineId,
} from "@/constants/pricing";
import { buildSummary } from "@/components/calculator/logic/summary";

const TOTAL_STEPS = 4;

export type UseCalculatorReturn = {
  state: CalculatorState;
  priceSummary: PriceSummary;
  canGoNext: boolean;
  totalSteps: number;
  goNext: () => void;
  goPrev: () => void;
  setProjectType: (type: ProjectType) => void;
  toggleFeature: (feature: ProjectFeature) => void;
  setBudget: (budget: BudgetRange) => void;
  setContact: (field: keyof ContactData, value: string) => void;
  handleSubmit: () => Promise<void>;
};

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

export function useCalculator(): UseCalculatorReturn {
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
        return state.budget !== null;
      case 3:
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
    const packageId = state.projectType;
    const features = state.features;
    const timeline: TimelineId = state.timeline ?? "standard";
    const result = calculatePrice(packageId, features, timeline);
    const timelineMultiplier = TIMELINE_MULTIPLIERS[timeline].multiplier;
    return {
      ...result,
      timelineMultiplier,
    };
  }, [state.projectType, state.features]);

  const handleSubmit = useCallback(async () => {
    if (!state.projectType) return;
    setState((s) => ({ ...s, isSubmitting: true, error: null }));
    try {
      const timeline: TimelineId = state.timeline ?? "standard";
      const summary = buildSummary({
        packageId: state.projectType,
        features: state.features,
        timeline,
        projectPriority: null,
        name: state.contact.name,
        email: state.contact.email,
        phone: state.contact.phone,
      });
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: state.contact.name,
          email: state.contact.email,
          phone: state.contact.phone,
          packageId: state.projectType,
          features: state.features,
          timeline,
          projectPriority: null,
          total: summary.total,
          base: summary.base,
          featuresTotal: summary.featuresTotal,
          label: summary.label,
          estimatedTimeline: summary.estimatedTimeline,
          qualificationTags: summary.qualificationTags,
          projectDescription: summary.projectDescription,
          breakdown: summary.breakdown,
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
  }, [state]);

  return {
    state,
    priceSummary,
    canGoNext,
    totalSteps: TOTAL_STEPS,
    goNext,
    goPrev,
    setProjectType,
    toggleFeature,
    setBudget,
    setContact,
    handleSubmit,
  };
}
