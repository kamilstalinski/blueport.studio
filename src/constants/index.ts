/**
 * Shared constants — magic numbers and curves used in 2+ places.
 * Animation easings for Framer Motion (cubic-bezier as [x1, y1, x2, y2]).
 */

/** Expo ease-out — Hero, motion. Used with duration 0.5–0.8. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Smooth ease — DlaczegoMy, ProblemRozwiazanie. */
export const EASE_SMOOTH = [0.25, 0.46, 0.45, 0.94] as const;
