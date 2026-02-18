"use client";

import { useEffect, useState } from "react";
import { getInitialTheme, getStoredTheme, type Theme } from "./theme";

/** Aktualny motyw; aktualizuje się przy przełączeniu (ThemeToggle) i przy zmianie w innej karcie. */
export function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(getInitialTheme());
    const onChange = (e: Event) => setTheme((e as CustomEvent<Theme>).detail);
    const onStorage = () => setTheme(getStoredTheme() ?? getInitialTheme());
    window.addEventListener("blueport-theme-change", onChange);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("blueport-theme-change", onChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return theme;
}
