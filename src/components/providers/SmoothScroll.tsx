"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import type { SmoothScrollProps } from "@/types";

export function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.06,
        duration: 1.4,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 0.85,
      }}
    >
      {children}
    </ReactLenis>
  );
}
