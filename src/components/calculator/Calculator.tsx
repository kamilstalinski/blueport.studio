"use client";

import Link from "next/link";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { PixelIcon } from "@/components/brand/PixelIcon";
import { useCalculator } from "@/hooks/useCalculator";

import { CalculatorLeft } from "./CalculatorLeft";
import { CalculatorRight } from "./CalculatorRight";

export function Calculator() {
  const calculator = useCalculator();

  return (
    <div className="calc-shell">
      <header className="calc-header">
        <h1 className="sr-only">Kalkulator wyceny</h1>
        <Link href="/" className="brand calc-logo" aria-label="blueport.studio, strona główna">
          <BrandLogo size="nav" />
        </Link>
        <Link href="/" className="calc-back">
          <PixelIcon name="arrow-left" /> Wróć na stronę
        </Link>
      </header>

      <main id="main-content" className="calc-main">
        <CalculatorLeft calculator={calculator} />
        <CalculatorRight calculator={calculator} />
      </main>
    </div>
  );
}
