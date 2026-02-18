"use client";

import { motion } from "framer-motion";

const TOTAL_STEPS = 5;

interface ProgressBarProps {
  currentStep: number;
}

export function ProgressBar({ currentStep }: ProgressBarProps) {
  const progress = (currentStep / TOTAL_STEPS) * 100;

  return (
    <div className="fixed left-0 right-0 top-0 z-40 h-1 bg-surface-alt" aria-hidden>
      <motion.div
        className="h-full bg-accent-orange"
        initial={false}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </div>
  );
}
