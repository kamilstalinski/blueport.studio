"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const showAfterScrollY = 300;

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > showAfterScrollY);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleScrollToTop();
      }}
      onClick={(e) => {
        if (e.detail === 0) handleScrollToTop();
      }}
      aria-label="Przewiń do góry"
      style={{
        WebkitBackdropFilter: "blur(20px)",
        backdropFilter: "blur(20px)"
      }}
      className={cn(
        "nav-glass-btn fixed bottom-6 right-6 z-[130] flex h-12 w-12 items-center justify-center rounded-button border border-border/80 bg-white/40 text-foreground shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-all duration-300 dark:border-white/10 dark:shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:scale-110 hover:border-white/30 hover:bg-white/50 hover:text-foreground hover:shadow-[0_12px_40px_rgba(0,0,0,0.12),inset_0_1px_0_0_rgba(255,255,255,0.8)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.08)] active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  );
}
