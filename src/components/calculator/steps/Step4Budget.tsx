"use client";

import { motion } from "framer-motion";
import type { useCalculator } from "@/hooks/useCalculator";
import type { BudgetRange } from "@/types/calculator.types";

type CalculatorProps = ReturnType<typeof useCalculator>;

const OPTIONS: Array<{ id: BudgetRange; label: string }> = [
  { id: "under3k", label: "Do 3 000 zł" },
  { id: "3k-6k", label: "3 000 – 6 000 zł" },
  { id: "6k-12k", label: "6 000 – 12 000 zł" },
  { id: "above12k", label: "Powyżej 12 000 zł" },
];

export function Step4Budget({ calculator }: { calculator: CalculatorProps }) {
  const { state, setBudget } = calculator;

  return (
    <div className="step">
      <h2 className="step-title">Orientacyjny budżet</h2>
      <p className="step-desc">Pomoże nam dobrać najlepsze rozwiązanie.</p>

      <div className="step-options step-options--2col">
        {OPTIONS.map((opt) => (
          <motion.button
            key={opt.id}
            type="button"
            onClick={() => setBudget(opt.id)}
            whileTap={{ scale: 0.99 }}
            className={`option-card ${state.budget === opt.id ? "selected" : ""}`}
          >
            <div className="option-title">{opt.label}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
