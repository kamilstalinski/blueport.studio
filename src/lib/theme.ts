/**
 * Theme: Light / Dark (class-based).
 * Priority: 1) Saved preference  2) Dark default.
 * Used by inline script (no flash) and ThemeToggle.
 */

import type { Theme } from "@/types";
export type { Theme } from "@/types";

const STORAGE_KEY = "blueport-theme";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  const storedValue = localStorage.getItem(STORAGE_KEY);
  if (storedValue === "light" || storedValue === "dark") return storedValue;
  return null;
}

export function getInitialTheme(): Theme {
  const stored = getStoredTheme();
  if (stored) return stored;
  return getSystemTheme();
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  localStorage.setItem(STORAGE_KEY, theme);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("blueport-theme-change", { detail: theme }));
  }
}

export function toggleTheme(current: Theme): Theme {
  const next: Theme = current === "light" ? "dark" : "light";
  applyTheme(next);
  return next;
}
