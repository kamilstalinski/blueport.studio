"use client";

import { motion } from "framer-motion";
import type { useCalculator } from "@/hooks/useCalculator";
import type { ProjectType } from "@/types/calculator.types";
import { PACKAGES } from "@/constants/pricing";

type CalculatorProps = ReturnType<typeof useCalculator>;

const OPTIONS = Object.values(PACKAGES).map((pkg) => ({
  id: pkg.id as ProjectType,
  title: pkg.name,
  desc: pkg.description,
  price: `od ${pkg.basePrice.toLocaleString("pl-PL")} zł`,
  tag: pkg.tag,
}));

export function Step1Type({ calculator }: { calculator: CalculatorProps }) {
  const { state, setProjectType } = calculator;

  return (
    <div className="step">
      <h2 className="step-title">Czego potrzebujesz?</h2>
      <p className="step-desc">Wybierz typ projektu.</p>

      <div className="step-options">
        {OPTIONS.map((opt) => (
          <motion.button
            key={opt.id}
            type="button"
            onClick={() => setProjectType(opt.id)}
            whileTap={{ scale: 0.99 }}
            className={`option-card ${state.projectType === opt.id ? "selected" : ""}`}
          >
            {opt.tag && <span className="option-tag">{opt.tag}</span>}
            <div className="option-title">{opt.title}</div>
            <div className="option-desc">{opt.desc}</div>
            <div className="option-price">{opt.price}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
