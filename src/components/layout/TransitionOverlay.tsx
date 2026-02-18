"use client";

import { motion } from "framer-motion";

const COLUMN_COUNT = 5;
const STAGGER = 0.025;

const MINT = { r: 0, g: 229, b: 160 };
const CYAN = { r: 0, g: 184, b: 217 };
const GLASS_ALPHA = 0.72;

function lerpRgba(t: number): string {
  const r = Math.round(MINT.r + (CYAN.r - MINT.r) * t);
  const g = Math.round(MINT.g + (CYAN.g - MINT.g) * t);
  const b = Math.round(MINT.b + (CYAN.b - MINT.b) * t);
  return `rgba(${r},${g},${b},${GLASS_ALPHA})`;
}

const glassStyle = {
  WebkitBackdropFilter: "blur(6px)",
  backdropFilter: "blur(6px)",
} as const;

const ease = [0.76, 0, 0.24, 1] as const;

type TransitionOverlayProps = {
  phase: "in" | "out";
  reducedMotion: boolean;
  duration?: number;
};

export function TransitionOverlay({
  phase,
  reducedMotion,
  duration = 0.35,
}: TransitionOverlayProps) {
  if (reducedMotion) return null;

  const columns = Array.from({ length: COLUMN_COUNT }, (_, i) => ({
    i,
    color: lerpRgba(i / (COLUMN_COUNT - 1)),
  }));

  return (
    <div className="fixed inset-0 z-20 flex" aria-hidden>
      {columns.map(({ i, color }) => (
        <motion.div
          key={i}
          className="transition-glass-tile h-full flex-1 border-r border-white/10 last:border-r-0"
          initial={{ scaleY: phase === "in" ? 0 : 1 }}
          animate={{ scaleY: phase === "in" ? 1 : 0 }}
          transition={{
            duration,
            ease,
            delay: phase === "in"
              ? i * STAGGER
              : (COLUMN_COUNT - 1 - i) * STAGGER,
          }}
          style={{
            backgroundColor: color,
            transformOrigin: phase === "in" ? "top" : "bottom",
            ...glassStyle,
          }}
        />
      ))}
    </div>
  );
}
