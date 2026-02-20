/**
 * Accent/palette theme. Persisted in localStorage, applied via data-accent on <html>.
 */

import type { AccentTheme } from "@/types";
export type { AccentTheme } from "@/types";

const STORAGE_KEY = "blueport-accent";

const VALID_ACCENTS: AccentTheme[] = [
  "blue",
  "mint",
  "violet",
  "amber",
  "cyan",
  "rose",
];

function isValidAccent(storedValue: string | null): storedValue is AccentTheme {
  return storedValue !== null && VALID_ACCENTS.includes(storedValue as AccentTheme);
}

export function getStoredAccent(): AccentTheme | null {
  if (typeof window === "undefined") return null;
  const storedValue = localStorage.getItem(STORAGE_KEY);
  return isValidAccent(storedValue) ? storedValue : null;
}

export function getInitialAccent(): AccentTheme {
  const stored = getStoredAccent();
  return stored ?? "blue";
}

export function applyAccent(accent: AccentTheme): void {
  document.documentElement.setAttribute("data-accent", accent);
  localStorage.setItem(STORAGE_KEY, accent);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("blueport-accent-change", { detail: accent }));
  }
}

export function cycleAccent(current: AccentTheme): AccentTheme {
  const currentIndex = VALID_ACCENTS.indexOf(current);
  const next = VALID_ACCENTS[(currentIndex + 1) % VALID_ACCENTS.length];
  applyAccent(next);
  return next;
}
