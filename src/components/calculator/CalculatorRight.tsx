"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { useCalculator } from "@/hooks/useCalculator";
import { PACKAGES, FEATURES, type PackageId, type FeatureId } from "@/constants/pricing";
import { ease } from "@/constants/animations";

type CalculatorProps = ReturnType<typeof useCalculator>;

function getTypeLabel(id: PackageId): string {
  return PACKAGES[id].name;
}

function getFeatureLabel(id: FeatureId): string {
  return FEATURES[id]?.label ?? id;
}

function getFeaturePrice(id: FeatureId): number {
  return FEATURES[id]?.price ?? 0;
}

export function CalculatorRight({ calculator }: { calculator: CalculatorProps }) {
  const { state, priceSummary } = calculator;
  const hasAnyChoice = state.projectType !== null;

  return (
    <div className="calc-right">
      {!hasAnyChoice && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="calc-right-empty"
        >
          <p>
            Wypełnij formularz,
            <br />
            a cena pojawi się tutaj.
          </p>
        </motion.div>
      )}

      {hasAnyChoice && (
        <div className="calc-summary">
          <p className="calc-summary-label">{"// Twoja wycena"}</p>

          <motion.div
            key={priceSummary.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: ease.smooth }}
            className="calc-price"
          >
            {priceSummary.label}
          </motion.div>

          <div className="calc-price-breakdown">
            {state.projectType && (
              <div className="breakdown-row">
                <span>Baza</span>
                <span>{priceSummary.base.toLocaleString("pl-PL")} zł</span>
              </div>
            )}
            <AnimatePresence>
              {state.features.map((f) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="breakdown-row"
                >
                  <span>{getFeatureLabel(f)}</span>
                  <span>
                    +{getFeaturePrice(f).toLocaleString("pl-PL")} zł
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="calc-choices">
            <AnimatePresence>
              {state.projectType && (
                <motion.span
                  key="type"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="choice-chip choice-chip--primary"
                >
                  {getTypeLabel(state.projectType)}
                </motion.span>
              )}
              {state.features.map((f) => (
                <motion.span
                  key={f}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="choice-chip"
                >
                  {getFeatureLabel(f)}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

          <p className="calc-disclaimer">
            Orientacyjna wycena. Dokładną cenę ustalamy po krótkiej rozmowie.
          </p>
        </div>
      )}
    </div>
  );
}
