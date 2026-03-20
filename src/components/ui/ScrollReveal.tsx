"use client";

import { m } from "framer-motion";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import type { ScrollRevealProps } from "@/types/ui.types";

export function ScrollReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  className,
}: ScrollRevealProps) {
  const { variants } = useMotionSafe();

  return (
    <m.div
      variants={variants[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </m.div>
  );
}
