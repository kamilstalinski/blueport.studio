"use client";

import { motion } from "framer-motion";
import type { useCalculator } from "@/hooks/useCalculator";
import type { ProjectFeature } from "@/types/calculator.types";

type CalculatorProps = ReturnType<typeof useCalculator>;

const FEATURES: Array<{
  id: ProjectFeature;
  label: string;
  desc: string;
  price: string;
}> = [
  {
    id: "seo",
    label: "SEO on-page",
    desc: "Optymalizacja dla Google",
    price: "+500 zł",
  },
  {
    id: "copywriting",
    label: "Copywriting",
    desc: "Teksty sprzedażowe",
    price: "+800 zł",
  },
  {
    id: "animations",
    label: "Animacje premium",
    desc: "Framer Motion",
    price: "+600 zł",
  },
  {
    id: "cms",
    label: "Panel CMS",
    desc: "Samodzielna edycja treści",
    price: "+400 zł",
  },
  {
    id: "integrations",
    label: "Integracje zewnętrzne",
    desc: "CRM, API, formularze",
    price: "+700 zł",
  },
  {
    id: "hosting",
    label: "Hosting i domena",
    desc: "Konfiguracja serwera",
    price: "+300 zł",
  },
];

export function Step2Features({ calculator }: { calculator: CalculatorProps }) {
  const { state, toggleFeature } = calculator;

  return (
    <div className="step">
      <h2 className="step-title">Dodatkowe funkcje</h2>
      <p className="step-desc">Opcjonalnie. Możesz pominąć.</p>

      <div className="step-features">
        {FEATURES.map((f) => {
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
