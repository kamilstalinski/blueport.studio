"use client";

import Link from "next/link";
import { useCalculator } from "@/hooks/useCalculator";
import { CalculatorLeft } from "./CalculatorLeft";
import { CalculatorRight } from "./CalculatorRight";

export function Calculator() {
  const calculator = useCalculator();

  return (
    <div className="calc-shell">
      <div className="calc-bg" aria-hidden>
        <div className="calc-blob calc-blob--left" />
        <div className="calc-blob calc-blob--right" />
      </div>

      <header className="calc-header">
        <Link href="/" className="calc-logo">
          <span className="calc-logo-mark">BP</span>
          <span className="calc-logo-text">blueport</span>
        </Link>
        <Link href="/" className="calc-back">
          ← Wróć na stronę
        </Link>
      </header>

      <main className="calc-main">
        <CalculatorLeft calculator={calculator} />
        <CalculatorRight calculator={calculator} />
      </main>
    </div>
  );
}
