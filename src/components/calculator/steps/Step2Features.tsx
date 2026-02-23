"use client";

import { motion } from "framer-motion";
import type { useCalculator } from "@/hooks/useCalculator";
import type { ProjectFeature } from "@/types/calculator.types";
import { FEATURES } from "@/constants/pricing";
import type { FeatureId } from "@/constants/pricing";

const FEATURE_OPTIONS = (Object.keys(FEATURES) as FeatureId[]).map((id) => ({
  id: id as ProjectFeature,
  label: FEATURES[id].label,
  desc: FEATURES[id].description,
  price: `+${FEATURES[id].price.toLocaleString("pl-PL")} zł`,
}));

type CalculatorProps = ReturnType<typeof useCalculator>;

export function Step2Features({ calculator }: { calculator: CalculatorProps }) {
  const { state, toggleFeature } = calculator;

  return (
    <div className="step">
      <h2 className="step-title">Dodatkowe funkcje</h2>
      <p className="step-desc">Opcjonalnie. Możesz pominąć.</p>

      <div className="step-features">
        {FEATURE_OPTIONS.map((f) => {
          const isSelected = state.features.includes(f.id);
          return (
            <motion.button
              key={f.id}
              type="button"
              onClick={() => toggleFeature(f.id)}
              whileTap={{ scale: 0.99 }}
              className={`feature-row ${isSelected ? "selected" : ""}`}
            >
              <div className="feature-check">
                {isSelected ? "✓" : ""}
              </div>
              <div className="feature-info">
                <span className="feature-label">{f.label}</span>
                <span className="feature-desc">{f.desc}</span>
              </div>
              <span className="feature-price">{f.price}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
