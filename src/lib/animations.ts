"use client";

import { useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { EASE_OUT_EXPO, DURATION_REVEAL, STAGGER_STEP } from "@/constants";

export function useReducedMotionPref() {
  return useReducedMotion() ?? false;
}

/** Single canonical duration and stagger for all section/card reveals. */
const duration = DURATION_REVEAL;
const stagger = STAGGER_STEP;
const ease = EASE_OUT_EXPO;

/** Standard fade + move up (y: 12px) — cards, paragraphs, CTAs. */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease },
  },
};

/** Stronger fade + move up (y: 16px) — headings, hero-style blocks. */
export const fadeInUpStrong: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease },
  },
};

/** Fade + slide from left (x: -12px) — list items, sidebar content. */
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration * 0.875, ease },
  },
};

/** Fade only — minimal motion. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration, ease },
  },
};

/** Container that staggers children with standard step and delay. */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.12,
    },
  },
};

/** Alias for fadeInUp (kept for compatibility). */
export const slideInUp: Variants = fadeInUp;

/** Default transition object for inline motion (e.g. Calculator steps). */
export const defaultTransition = {
  duration,
  ease,
};

/** Viewport options: animate once when 15% visible, small margin. */
export const viewportOnce = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -80px 0px",
} as const;

export { duration, stagger };
