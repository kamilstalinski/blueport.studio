"use client";

import { motion } from "framer-motion";
import type { useCalculator } from "@/hooks/useCalculator";
import type { ProjectType } from "@/types/calculator.types";

type CalculatorProps = ReturnType<typeof useCalculator>;

const OPTIONS: Array<{
  id: ProjectType;
  title: string;
  desc: string;
  price: string;
  tag: string | null;
}> = [
  {
    id: "wordpress",
    title: "Strona firmowa",
    desc: "WordPress. Do 5 podstron, SEO, formularz kontaktowy.",
    price: "od 2 500 zł",
    tag: null,
  },
  {
    id: "woocommerce",
    title: "Sklep internetowy",
    desc: "WooCommerce. Płatności, kurierzy, panel zamówień.",
    price: "od 4 000 zł",
    tag: "Najpopularniejszy",
  },
  {
    id: "nextjs",
    title: "Projekt dedykowany",
    desc: "Next.js / React. Własna logika, bez szablonów.",
    price: "od 6 000 zł",
    tag: null,
  },
];

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
