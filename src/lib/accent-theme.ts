/**
 * Accent/palette theme. Persisted in localStorage, applied via data-accent on <html>.
 */

import type { AccentTheme } from "@/types";
export type { AccentTheme } from "@/types";

const STORAGE_KEY = "blueport-accent";

const VALID_ACCENTS: AccentTheme[] = [
  "blue",
  "violet",
  "amber",
  "cyan",
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
  document.documentElement.style.setProperty(
    "transition",
    "background-color 0.5s ease, color 0.3s ease",
  );
  document.documentElement.setAttribute("data-accent", accent);
  localStorage.setItem(STORAGE_KEY, accent);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("blueport-accent-change", { detail: accent }));
  }
  setTimeout(() => {
    document.documentElement.style.removeProperty("transition");
  }, 600);
}

export function cycleAccent(current: AccentTheme): AccentTheme {
  const currentIndex = VALID_ACCENTS.indexOf(current);
  const next = VALID_ACCENTS[(currentIndex + 1) % VALID_ACCENTS.length];
  applyAccent(next);
  return next;
}
