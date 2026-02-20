/**
 * Shared constants — magic numbers and curves used in 2+ places.
 * Single canonical easing for all animations (brand: subtle, professional).
 */

/** Canonical ease-out (expo) — all motion: Hero, sections, cards, buttons. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** CSS transition string (same curve) — buttons, interactive elements. */
export const TRANSITION_SPRING_CSS = "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)";

/** Standard reveal duration (s) — section enter animations. */
export const DURATION_REVEAL = 0.4;

/** Stagger step (s) between children in list/grid reveals. */
export const STAGGER_STEP = 0.06;
