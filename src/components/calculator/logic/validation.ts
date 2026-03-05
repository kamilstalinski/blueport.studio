/**
 * Validation for calculator steps and submit.
 * Email, required fields, step-specific rules.
 */

import type { CalculatorState, StepIndex, StepValidationResult } from "@/types";

export type { StepValidationResult } from "@/types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

/**
 * Step 1: package selection is required – cannot skip.
 */
export function validateStep1(state: CalculatorState): StepValidationResult {
  if (!state.packageId) {
    return { valid: false, error: "Wybierz pakiet." };
  }
  return { valid: true };
}

/**
 * Steps 2, 3, 4, 5, 6: no blocking validation.
 */
export function validateStep2(_state: CalculatorState): StepValidationResult {
  return { valid: true };
}
export function validateStep3(_state: CalculatorState): StepValidationResult {
  return { valid: true };
}
export function validateStep4(_state: CalculatorState): StepValidationResult {
  return { valid: true };
}
export function validateStep5(state: CalculatorState): StepValidationResult {
  const name = state.name?.trim() ?? "";
  const email = state.email?.trim() ?? "";

  if (!name) {
    return { valid: false, error: "Imię jest wymagane." };
  }
  if (!email) {
    return { valid: false, error: "Adres e-mail jest wymagany." };
  }
  if (!isValidEmail(email)) {
    return { valid: false, error: "Podaj prawidłowy adres e-mail." };
  }
  return { valid: true };
}
export function validateStep6(_state: CalculatorState): StepValidationResult {
  return { valid: true };
}

const VALIDATORS: Record<StepIndex, (s: CalculatorState) => StepValidationResult> = {
  1: validateStep1,
  2: validateStep2,
  3: validateStep3,
  4: validateStep4,
  5: validateStep5,
  6: validateStep6,
};

/**
 * Validate current step before moving forward.
 */
export function validateStep(step: StepIndex, state: CalculatorState): StepValidationResult {
  const validator = VALIDATORS[step];
  return validator ? validator(state) : { valid: true };
}

/**
 * Can proceed to next step. Step 1 requires packageId; others allow proceed.
 */
export function canGoNext(step: StepIndex, state: CalculatorState): boolean {
  if (step === 1) return state.packageId !== null;
  return true;
}

/**
 * Can submit only when package is set and contact step (name, email) is valid.
 */
export function canSubmit(state: CalculatorState): boolean {
  if (!state.packageId) return false;
  if (state.name.trim() === "") return false;
  return EMAIL_REGEX.test(state.email);
}
