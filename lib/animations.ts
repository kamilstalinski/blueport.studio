"use client";

import { useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

export function useReducedMotionPref() {
  return useReducedMotion() ?? false;
}

/* Brand: subtle, professional. 300ms, translateY 12px, ease-out. No dramatic motion. */
const easeOut = [0, 0, 0.2, 1];
const duration = 0.3;
const stagger = 0.08;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: easeOut }
  }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration, ease: easeOut }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.1
    }
  }
};

export const slideInUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: easeOut }
  }
};

export const defaultTransition = {
  duration,
  ease: easeOut
};

export const viewportOnce = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -80px 0px"
} as const;

export { duration, stagger };
