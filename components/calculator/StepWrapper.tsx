"use client";

import { motion } from "framer-motion";

interface StepWrapperProps {
  step: number;
  children: React.ReactNode;
}

export function StepWrapper({ step, children }: StepWrapperProps) {
  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="min-h-[40vh]"
    >
      {children}
    </motion.div>
  );
}
