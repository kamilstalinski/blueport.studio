"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type {
  CalculatorState,
  CalculatorAction,
  CalculatorContextValue,
  StepIndex,
  CalculatorSubmitPayload,
} from "@/types";
import { buildSummary } from "../logic/summary";
import { validateStep as validateStepFn, canGoNext as canGoNextFn, canSubmit as canSubmitFn } from "../logic/validation";

const initialState: CalculatorState = {
  packageId: null,
  features: [],
  timeline: "standard",
  projectPriority: null,
  name: "",
  email: "",
  phone: "",
};

function reducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case "SET_PACKAGE_ID": {
      return {
        ...state,
        packageId: action.payload,
        features: [],
      };
    }
    case "SET_FEATURES":
      return { ...state, features: action.payload };
    case "SET_TIMELINE":
      return { ...state, timeline: action.payload };
    case "SET_PROJECT_PRIORITY":
      return { ...state, projectPriority: action.payload };
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PHONE":
      return { ...state, phone: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const CalculatorContext = createContext<CalculatorContextValue | null>(null);

const STEP_KEY = "calculator_step";

function stepReducer(_current: StepIndex, next: StepIndex): StepIndex {
  return next;
}

export function CalculatorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [step, setStepState] = useReducer(stepReducer, 1 as StepIndex);

  const setStep = useCallback((s: StepIndex) => {
    setStepState(s);
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem(STEP_KEY, String(s));
      } catch {
        // ignore
      }
    }
  }, []);

  const updateState = useCallback((payload: Partial<CalculatorState>) => {
    if (payload.packageId !== undefined && payload.packageId !== null)
      dispatch({ type: "SET_PACKAGE_ID", payload: payload.packageId });
    if (payload.features !== undefined) dispatch({ type: "SET_FEATURES", payload: payload.features });
    if (payload.timeline !== undefined) dispatch({ type: "SET_TIMELINE", payload: payload.timeline });
    if (payload.projectPriority !== undefined) dispatch({ type: "SET_PROJECT_PRIORITY", payload: payload.projectPriority });
    if (payload.name !== undefined) dispatch({ type: "SET_NAME", payload: payload.name });
    if (payload.email !== undefined) dispatch({ type: "SET_EMAIL", payload: payload.email });
    if (payload.phone !== undefined) dispatch({ type: "SET_PHONE", payload: payload.phone });
  }, []);

  const getSummary = useCallback(() => buildSummary(state), [state]);

  const getPrice = useCallback(() => {
    const summary = buildSummary(state);
    return { minPrice: summary.total, maxPrice: summary.total };
  }, [state]);

  const getSubmitPayload = useCallback((): CalculatorSubmitPayload | null => {
    if (!canSubmitFn(state) || !state.packageId) return null;
    const summary = buildSummary(state);
    return {
      name: state.name,
      email: state.email,
      phone: state.phone,
      packageId: state.packageId,
      features: state.features,
      timeline: state.timeline,
      projectPriority: state.projectPriority,
      total: summary.total,
      base: summary.base,
      featuresTotal: summary.featuresTotal,
      label: summary.label,
      estimatedTimeline: summary.estimatedTimeline,
      qualificationTags: summary.qualificationTags,
      projectDescription: summary.projectDescription,
      breakdown: summary.breakdown,
    };
  }, [state]);

  const validateStep = useCallback(
    (s: StepIndex) => validateStepFn(s, state),
    [state]
  );

  const canGoNext = useCallback(
    (s: StepIndex) => canGoNextFn(s, state),
    [state]
  );

  const canSubmitFlag = useMemo(() => canSubmitFn(state), [state]);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
    setStep(1);
  }, [setStep]);

  const value: CalculatorContextValue = useMemo(
    () => ({
      state,
      step,
      dispatch,
      setStep,
      updateState,
      getPrice,
      getSummary,
      getSubmitPayload,
      validateStep,
      canGoNext,
      canSubmit: canSubmitFlag,
      reset,
    }),
    [
      state,
      step,
      setStep,
      updateState,
      getPrice,
      getSummary,
      getSubmitPayload,
      validateStep,
      canGoNext,
      canSubmitFlag,
      reset,
    ]
  );

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const calculatorContext = useContext(CalculatorContext);
  if (!calculatorContext) {
    throw new Error("useCalculator must be used within CalculatorProvider");
  }
  return calculatorContext;
}
