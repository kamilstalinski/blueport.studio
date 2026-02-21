"use client";

import { motion } from "framer-motion";
import type { useCalculator } from "@/hooks/useCalculator";
import type { Timeline } from "@/types/calculator.types";

type CalculatorProps = ReturnType<typeof useCalculator>;

const OPTIONS: Array<{
  id: Timeline;
  label: string;
  desc: string;
  badge: string | null;
}> = [
  {
    id: "express",
    label: "Ekspresowo",
    desc: "Do 7 dni roboczych",
    badge: "+30%",
  },
  {
    id: "standard",
    label: "Standardowo",
    desc: "2–3 tygodnie",
    badge: null,
  },
  {
    id: "relaxed",
    label: "Elastycznie",
    desc: "4+ tygodnie",
    badge: "-5%",
  },
];

export function Step3Timeline({ calculator }: { calculator: CalculatorProps }) {
  const { state, setTimeline } = calculator;

  return (
    <div className="step">
      <h2 className="step-title">Kiedy potrzebujesz?</h2>
      <p className="step-desc">Termin wpływa na cenę.</p>

      <div className="step-options step-options--row">
        {OPTIONS.map((opt) => (
          <motion.button
            key={opt.id}
            type="button"
            onClick={() => setTimeline(opt.id)}
            whileTap={{ scale: 0.99 }}
            className={`option-card option-card--sm ${state.timeline === opt.id ? "selected" : ""}`}
          >
            <div className="option-title">{opt.label}</div>
            <div className="option-desc">{opt.desc}</div>
            {opt.badge && (
              <span
                className={`option-badge ${opt.badge.startsWith("-") ? "badge--green" : "badge--orange"}`}
              >
                {opt.badge}
              </span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
