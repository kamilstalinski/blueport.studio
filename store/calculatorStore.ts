import { create } from "zustand";
import type { CalculatorFormData, PriceResult, CalculatorStep } from "@/types/calculator";

interface CalculatorState {
  step: CalculatorStep;
  formData: CalculatorFormData;
  result: PriceResult | null;
  isSubmitted: boolean;
  setStep: (step: CalculatorStep) => void;
  setFormData: (data: Partial<CalculatorFormData>) => void;
  setResult: (result: PriceResult | null) => void;
  setSubmitted: (value: boolean) => void;
  reset: () => void;
}

const initialFormData: CalculatorFormData = {
  projectType: null,
  websiteScope: null,
  storeScope: null,
  features: [],
  timeline: null,
  name: "",
  company: "",
  email: "",
  phone: "",
  description: "",
};

export const useCalculatorStore = create<CalculatorState>((set) => ({
  step: 1,
  formData: initialFormData,
  result: null,
  isSubmitted: false,
  setStep: (step) => set({ step }),
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  setResult: (result) => set({ result }),
  setSubmitted: (isSubmitted) => set({ isSubmitted }),
  reset: () =>
    set({
      step: 1,
      formData: initialFormData,
      result: null,
      isSubmitted: false,
    }),
}));
