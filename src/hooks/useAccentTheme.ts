"use client";

import { useState, useEffect } from "react";

import { getInitialAccent } from "@/lib/accent-theme";

import type { AccentTheme } from "@/types";

/**
 * Syncs accent theme from localStorage and blueport-accent-change events.
 * Use in Hero, Navbar and any component that needs current accent for styling.
 */
export function useAccentTheme(): AccentTheme {
  const [accent, setAccent] = useState<AccentTheme>("blue");

  useEffect(() => {
    setAccent(getInitialAccent());
    const onAccentChange = (e: CustomEvent<AccentTheme>) => setAccent(e.detail);
    window.addEventListener("blueport-accent-change", onAccentChange as EventListener);
    return () => window.removeEventListener("blueport-accent-change", onAccentChange as EventListener);
  }, []);

  return accent;
}
