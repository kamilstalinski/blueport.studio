"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { useCalculator } from "@/hooks/useCalculator";
import type { ProjectFeature } from "@/types/calculator.types";
import {
  PACKAGES,
  FEATURES,
  TIMELINE_MULTIPLIERS,
  type PackageId,
  type FeatureId,
  type TimelineId,
} from "@/constants/pricing";

type CalculatorProps = ReturnType<typeof useCalculator>;

function getTypeLabel(id: PackageId): string {
  const pkg = PACKAGES[id];
  return `${pkg.name} (${pkg.tech})`;
}

function getFeatureLabel(id: ProjectFeature): string {
  return FEATURES[id as FeatureId].label;
}

function getFeaturePrice(id: ProjectFeature): number {
  return FEATURES[id as FeatureId].price;
}

function getTimelineLabel(id: TimelineId): string {
  const t = TIMELINE_MULTIPLIERS[id];
  return id === "express"
    ? `Ekspresowo (do 7 dni)`
    : id === "relaxed"
      ? "Elastycznie (4+ tygodnie)"
      : "Standardowo (2–3 tygodnie)";
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
          <p className="calc-summary-label">// Twoja wycena</p>

          <motion.div
            key={priceSummary.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
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
            {state.timeline && state.timeline !== "standard" && (
              <div className="breakdown-row breakdown-row--accent">
                <span>
                  {state.timeline === "express"
                    ? "Ekspresowa realizacja"
                    : "Rabat elastyczny"}
                </span>
                <span>
                  {state.timeline === "express" ? "+30%" : "-5%"}
                </span>
              </div>
            )}
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
                  {getTypeLabel(state.projectType as PackageId)}
                </motion.span>
              )}
              {state.timeline && (
                <motion.span
                  key="timeline"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="choice-chip"
                >
                  {getTimelineLabel(state.timeline as TimelineId)}
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
