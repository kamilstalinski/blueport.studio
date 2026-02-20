"use client";

import { motion } from "framer-motion";
import { IconBox } from "@/components/ui/IconBox";
import { SpotlightCard } from "@/components/SpotlightCard";
import { Button } from "@/components/ui/Button";
import { viewportOnce, useReducedMotionPref } from "@/lib/animations";
import { useGlassBlurStyle } from "@/lib/useGlassBlurStyle";
import { EASE_SMOOTH } from "@/constants";

const PROBLEMS: { key: string; emoji: string; label: string }[] = [
  { key: "seo", emoji: "🔍", label: "brak widoczności w Google" },
  { key: "look", emoji: "🎨", label: "przestarzały wygląd" },
  { key: "mobile", emoji: "📱", label: "brak wersji mobilnej" },
  { key: "sales", emoji: "🛒", label: "brak sprzedaży online" },
];

const SOLUTIONS: { key: string; emoji: string; label: string }[] = [
  { key: "fast", emoji: "⚡", label: "szybkie ładowanie" },
  { key: "intuitive", emoji: "👆", label: "intuicyjna struktura" },
  { key: "seo", emoji: "🔍", label: "optymalizacja SEO" },
  { key: "system", emoji: "👥", label: "system pozyskiwania klientów" },
];

const headingVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_SMOOTH } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_SMOOTH } },
};

export function ProblemRozwiazanie() {
  const reduceMotion = useReducedMotionPref();
  const initial = reduceMotion ? "visible" : "hidden";
  const glassBlurStyle = useGlassBlurStyle();

  return (
    <section id="problem-rozwiazanie" className="relative section-padding-block">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-72"
        style={{ background: 'linear-gradient(to bottom, var(--color-hero-fade), transparent)' }}
        aria-hidden
      />
      <div className="container-narrow section-intro relative z-[1]">
        <motion.h2
          className="text-4xl md:text-5xl font-semibold text-foreground text-center mb-4"
          initial={initial}
          whileInView="visible"
          viewport={viewportOnce}
          variants={headingVariants}
        >
          Twoja strona nie sprzedaje?
        </motion.h2>
      </div>
      <div className="container relative z-[1]">
        <div className="grid md:grid-cols-2 items-stretch" style={{ gap: "var(--grid-gap)" }}>
          {/* Lewa kolumna – Najczęstsze problemy */}
          <SpotlightCard
            className="custom-spotlight-card rounded-2xl h-full"
          >
            {/* Inline blur wymusza efekt — CSS bywa nadpisywany w buildzie */}
            <div className="card h-full rounded-[15px] card-padding" style={glassBlurStyle}>
              <motion.div
                className="h-full"
                initial={initial}
                whileInView="visible"
                viewport={viewportOnce}
                variants={cardVariants}
              >
                <h3 className="heading-3 text-white mb-6">
                  Najczęstsze problemy
                </h3>
                <div className="grid grid-cols-[auto_1fr] items-center" style={{ gap: "var(--element-gap)" }}>
                  {PROBLEMS.map(({ key, emoji, label }) => (
                    <div key={key} className="contents">
                      <IconBox emoji={emoji} />
                      <p className="text-foreground/80 min-w-0">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </SpotlightCard>

          {/* Prawa kolumna – Jak to rozwiązujemy */}
          <SpotlightCard
            className="custom-spotlight-card rounded-2xl h-full"
          >
            <div className="card h-full rounded-[15px] card-padding" style={glassBlurStyle}>
              <motion.div
                className="h-full"
                initial={initial}
                whileInView="visible"
                viewport={viewportOnce}
                variants={cardVariants}
              >
                <h3 className="heading-3 text-white mb-6">
                  Jak to rozwiązujemy
                </h3>
                <div className="grid grid-cols-[auto_1fr] items-center" style={{ gap: "var(--element-gap)" }}>
                  {SOLUTIONS.map(({ key, emoji, label }) => (
                    <div key={key} className="contents">
                      <IconBox emoji={emoji} />
                      <p className="text-foreground/80 min-w-0 flex items-center gap-2">
                        <span className="text-primary shrink-0" aria-hidden>✓</span>
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </SpotlightCard>
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={initial}
          whileInView="visible"
          viewport={viewportOnce}
          variants={cardVariants}
        >
          <a href="#kalkulator">
            <Button variant="primary">Sprawdź koszt rozwiązania</Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
