"use client";

import GradualBlur from "@/components/effects/GradualBlur";

/** Gradual blur at top of viewport, under navbar (z-index below Navbar). */
export function GradualBlurTop() {
  return (
    <GradualBlur
      target="page"
      position="top"
      height="7rem"
      strength={1}
      divCount={6}
      curve="bezier"
      exponential
      opacity={1}
      zIndex={-25}
    />
  );
}
