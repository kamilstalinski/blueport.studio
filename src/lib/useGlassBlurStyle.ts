"use client";

import { useEffect, useState } from "react";
import type { GlassBlurVariant } from "@/types";

export type { GlassBlurVariant } from "@/types";

const FALLBACKS: Record<GlassBlurVariant, string> = {
  default: "28px",
  sm: "22px",
  lg: "32px",
  nav: "12px",
};

const VAR_NAMES: Record<GlassBlurVariant, string> = {
  default: "--glass-blur",
  sm: "--glass-blur-sm",
  lg: "--glass-blur-lg",
  nav: "--glass-blur-nav",
};

/**
 * Zwraca inline style z backdrop-filter (blur) odczytanym z CSS variable.
 * Wymusza blur na elementach glass — inline wygrywa z nadpisywanymi regułami CSS.
 */
export function useGlassBlurStyle(variant: GlassBlurVariant = "default"): React.CSSProperties {
  const varName = VAR_NAMES[variant];
  const fallback = FALLBACKS[variant];

  const [style, setStyle] = useState<React.CSSProperties>(() => ({
    backdropFilter: `blur(${fallback})`,
    WebkitBackdropFilter: `blur(${fallback})`,
  }));

  const update = () => {
    const value =
      typeof document !== "undefined"
        ? getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || fallback
        : fallback;
    const blurValue = `blur(${value})`;
    const fullValue = variant === "nav" ? `${blurValue} saturate(180%)` : blurValue;
    setStyle({
      backdropFilter: fullValue,
      WebkitBackdropFilter: fullValue,
    });
  };

  useEffect(() => {
    update();
    window.addEventListener("blueport-accent-change", update);
    return () => window.removeEventListener("blueport-accent-change", update);
  }, [variant]);

  return style;
}
