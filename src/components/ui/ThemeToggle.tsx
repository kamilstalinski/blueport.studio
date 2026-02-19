"use client";

import { useEffect, useState } from "react";
import {
  getInitialTheme,
  toggleTheme,
  type Theme
} from "@/lib/theme";
import { cn } from "@/lib/utils";

type ThemeToggleVariant = "default" | "dark";

export function ThemeToggle({ variant = "default" }: { variant?: ThemeToggleVariant }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const isDark = variant === "dark";

  useEffect(() => {
    setMounted(true);
    setTheme(getInitialTheme());
  }, []);

  const handleToggle = () => {
    const next = toggleTheme(theme);
    setTheme(next);
  };

  if (!mounted) {
    return (
      <span
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-button",
          isDark ? "border border-white/25 bg-white/10" : "border border-border bg-surface"
        )}
        aria-hidden
      >
        <span className={cn("h-4 w-4 rounded-full", isDark ? "bg-white/30" : "bg-surface-alt")} />
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={theme === "dark" ? "Włącz tryb jasny" : "Włącz tryb ciemny"}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-button transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        isDark
          ? "border border-white/25 bg-white/10 text-white hover:bg-white/20 focus:ring-white/50 focus:ring-offset-2"
          : "border border-border bg-surface text-text-primary hover:bg-surface-alt focus:ring-primary focus:ring-offset-bg"
      )}
    >
      {theme === "dark" ? (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}
