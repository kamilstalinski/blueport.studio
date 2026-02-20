"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import type { ScrollRevealProps } from "@/types/ui.types";

export function ScrollReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  className,
}: ScrollRevealProps) {
  const { ref, animate } = useScrollAnimation();
  const { variants } = useMotionSafe();

  return (
    <motion.div
      ref={ref}
      variants={variants[variant]}
      initial="hidden"
      animate={animate}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
