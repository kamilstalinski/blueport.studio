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
} from "@/types";
import { computePrice } from "../logic/pricingEngine";
import { buildSummary } from "../logic/summary";
import { validateStep as validateStepFn, canSubmit as canSubmitFn } from "../logic/validation";

const initialState: CalculatorState = {
  projectType: null,
  pagesCount: 0,
  productCount: 0,
  features: [],
  integrations: [],
  urgency: "standard",
  budgetRange: "",
  name: "",
  email: "",
  phone: "",
};

function reducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case "SET_PROJECT_TYPE":
      return { ...state, projectType: action.payload };
    case "SET_PAGES_COUNT":
      return { ...state, pagesCount: action.payload };
    case "SET_PRODUCT_COUNT":
      return { ...state, productCount: action.payload };
    case "SET_FEATURES":
      return { ...state, features: action.payload };
    case "SET_INTEGRATIONS":
      return { ...state, integrations: action.payload };
    case "SET_URGENCY":
      return { ...state, urgency: action.payload };
    case "SET_BUDGET_RANGE":
      return { ...state, budgetRange: action.payload };
    case "SET_CONTACT":
      return {
        ...state,
        ...(action.payload.name !== undefined && { name: action.payload.name }),
        ...(action.payload.email !== undefined && { email: action.payload.email }),
        ...(action.payload.phone !== undefined && { phone: action.payload.phone }),
      };
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
    if (payload.projectType !== undefined && payload.projectType !== null) dispatch({ type: "SET_PROJECT_TYPE", payload: payload.projectType });
    if (payload.pagesCount !== undefined) dispatch({ type: "SET_PAGES_COUNT", payload: payload.pagesCount });
    if (payload.productCount !== undefined) dispatch({ type: "SET_PRODUCT_COUNT", payload: payload.productCount });
    if (payload.features !== undefined) dispatch({ type: "SET_FEATURES", payload: payload.features });
    if (payload.integrations !== undefined) dispatch({ type: "SET_INTEGRATIONS", payload: payload.integrations });
    if (payload.urgency !== undefined) dispatch({ type: "SET_URGENCY", payload: payload.urgency });
    if (payload.budgetRange !== undefined) dispatch({ type: "SET_BUDGET_RANGE", payload: payload.budgetRange });
    if (payload.name !== undefined || payload.email !== undefined || payload.phone !== undefined) {
      dispatch({
        type: "SET_CONTACT",
        payload: {
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
        },
      });
    }
  }, []);

  const getPrice = useCallback(() => computePrice(state), [state]);
  const getSummary = useCallback(() => buildSummary(state), [state]);

  const validateStep = useCallback(
    (s: StepIndex) => validateStepFn(s, state),
    [state]
  );

  const canGoNext = useCallback(
    (s: StepIndex) => validateStepFn(s, state).valid,
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
