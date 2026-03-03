"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import type { useCalculator } from "@/hooks/useCalculator";
import { FEATURES, getFeaturesForPackage } from "@/constants/pricing";
import type { FeatureId, PackageId } from "@/constants/pricing";
import { cn } from "@/lib/utils";

type CalculatorProps = ReturnType<typeof useCalculator>;

export function Step2Features({ calculator }: { calculator: CalculatorProps }) {
  const { state, toggleFeature } = calculator;

  const featureOptions = useMemo(() => {
    const packageId = state.projectType;
    if (!packageId) return [];
    const ids = getFeaturesForPackage(packageId);
    return ids.map((id): { id: FeatureId; label: string; desc: string; price: string } => ({
      id,
      label: FEATURES[id].label,
      desc: FEATURES[id].description,
      price: `+${FEATURES[id].price.toLocaleString("pl-PL")} zł`,
    }));
  }, [state.projectType]);

  return (
    <div className="step">
      <h2 className="step-title">Dodatkowe funkcje</h2>
      <p className="step-desc">Opcjonalnie. Możesz pominąć.</p>

      <div className="step-features">
        {featureOptions.map((f) => {
          const isSelected = state.features.includes(f.id);
          return (
            <motion.button
              key={f.id}
              type="button"
              onClick={() => toggleFeature(f.id)}
              whileTap={{ scale: 0.99 }}
              className={cn("feature-row", isSelected && "selected")}
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
