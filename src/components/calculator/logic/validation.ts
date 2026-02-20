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
 * Step 1: project type is required – cannot skip.
 */
export function validateStep1(state: CalculatorState): StepValidationResult {
  if (!state.projectType) {
    return { valid: false, error: "Wybierz rodzaj projektu." };
  }
  return { valid: true };
}

/**
 * Step 2: scope (pages count) – must be >= 0; for wordpress/next we expect at least 1.
 */
export function validateStep2(state: CalculatorState): StepValidationResult {
  if (state.projectType && state.pagesCount < 0) {
    return { valid: false, error: "Liczba podstron musi być nieujemna." };
  }
  return { valid: true };
}

/**
 * Step 3: features – optional; no hard requirement.
 */
export function validateStep3(_state: CalculatorState): StepValidationResult {
  return { valid: true };
}

/**
 * Step 4: budget & urgency – urgency is always set; budgetRange can be optional.
 */
export function validateStep4(_state: CalculatorState): StepValidationResult {
  return { valid: true };
}

/**
 * Step 5: contact – name, email required; email must be valid. Cannot submit without contact.
 */
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

const VALIDATORS: Record<StepIndex, (s: CalculatorState) => StepValidationResult> = {
  1: validateStep1,
  2: validateStep2,
  3: validateStep3,
  4: validateStep4,
  5: validateStep5,
  6: () => ({ valid: true }),
};

/**
 * Validate current step before moving forward.
 */
export function validateStep(step: StepIndex, state: CalculatorState): StepValidationResult {
  const validator = VALIDATORS[step];
  return validator ? validator(state) : { valid: true };
}

/**
 * Can submit only when project type is set and contact step is valid.
 */
export function canSubmit(state: CalculatorState): boolean {
  if (!state.projectType) return false;
  return validateStep5(state).valid;
}
