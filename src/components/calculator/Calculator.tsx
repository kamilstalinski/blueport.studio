"use client";

import Link from "next/link";
import Image from "next/image";
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
          <Image
            src="/logov3.svg"
            alt="Blueport Studio — strona główna"
            width={70}
            height={70}
            className="h-10 w-auto object-contain md:h-12"
          />
        </Link>
        <Link href="/" className="calc-back">
          ← Wróć na stronę
        </Link>
      </header>

      <main id="main-content" className="calc-main">
        <CalculatorLeft calculator={calculator} />
        <CalculatorRight calculator={calculator} />
      </main>
    </div>
  );
}
