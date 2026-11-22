"use client";

import Link from "next/link";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { Arrow } from "@/components/ui/Arrow";
import { useCalculator } from "@/hooks/useCalculator";

import { CalculatorLeft } from "./CalculatorLeft";
import { CalculatorRight } from "./CalculatorRight";

export function Calculator() {
  const calculator = useCalculator();

  return (
    <div className="calc-shell bp-scope">
      <header className="calc-header">
        <h1 className="sr-only">Kalkulator wyceny</h1>
        <Link href="/" className="bp-brand calc-logo" aria-label="blueport.studio, strona główna" translate="no">
          <BrandLogo size="footer" />
        </Link>
        <Link href="/" className="calc-back bp-mono">
          <Arrow /> Wróć na stronę
        </Link>
      </header>

      <main id="main-content" className="calc-main">
        <CalculatorLeft calculator={calculator} />
        <CalculatorRight calculator={calculator} />
      </main>
    </div>
  );
}
