"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Search, Palette, Smartphone, TrendingDown, Zap, MousePointer, Target, Users } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";
import { Button } from "@/components/ui/Button";
import { viewportOnce, useReducedMotionPref } from "@/lib/animations";

const PROBLEMS: { key: "seo" | "look" | "mobile" | "sales"; icon: typeof Search }[] = [
  { key: "seo", icon: Search },
  { key: "look", icon: Palette },
  { key: "mobile", icon: Smartphone },
  { key: "sales", icon: TrendingDown },
];

const SOLUTIONS: { key: "fast" | "intuitive" | "seo" | "system"; icon: typeof Zap }[] = [
  { key: "fast", icon: Zap },
  { key: "intuitive", icon: MousePointer },
  { key: "seo", icon: Search },
  { key: "system", icon: Users },
];

const headingVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export function ProblemRozwiazanie() {
  const t = useTranslations("Home.problemRozwiazanie");
  const reduceMotion = useReducedMotionPref();
  const initial = reduceMotion ? "visible" : "hidden";

  return (
    <section id="problem-rozwiazanie" className="relative py-20 md:py-32 lg:py-36">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-72"
        style={{ background: 'linear-gradient(to bottom, #030B22, transparent)' }}
        aria-hidden
      />
      <div className="max-w-6xl mx-auto px-6 relative z-[1]">
        <motion.h2
          className="text-4xl md:text-5xl font-semibold text-foreground text-center mb-4"
          initial={initial}
          whileInView="visible"
          viewport={viewportOnce}
          variants={headingVariants}
        >
          {t("title")}
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {/* Lewa kolumna – Najczęstsze problemy */}
          <SpotlightCard
            className="custom-spotlight-card rounded-2xl overflow-hidden h-full"
            spotlightColor="rgba(0, 229, 160, 0.2)"
          >
            <motion.div
              className="glass-card h-full bg-white/15 backdrop-blur-xl rounded-[15px] p-10 transition-all duration-300 hover:border-white/20"
              initial={initial}
              whileInView="visible"
              viewport={viewportOnce}
              variants={cardVariants}
            >
              <h3 className="heading-3 text-primary mb-6">
                {t("problemsTitle")}
              </h3>
              <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-5 items-center">
                {PROBLEMS.map(({ key, icon: Icon }) => (
                  <div key={key} className="contents">
                    <div
                      className="w-12 h-12 flex items-center justify-center shrink-0 rounded-xl bg-white/10 text-primary/80"
                      aria-hidden
                    >
                      <Icon className="w-8 h-8" strokeWidth={2} />
                    </div>
                    <p className="text-foreground/80 min-w-0">
                      {t(`problems.${key}`)}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </SpotlightCard>

          {/* Prawa kolumna – Jak to rozwiązujemy */}
          <SpotlightCard
            className="custom-spotlight-card rounded-2xl overflow-hidden h-full"
            spotlightColor="rgba(0, 229, 160, 0.2)"
          >
            <motion.div
              className="glass-card h-full rounded-[15px] p-10 transition-all duration-300 h-full"
              initial={initial}
              whileInView="visible"
              viewport={viewportOnce}
              variants={cardVariants}
            >
              <h3 className="heading-3 text-accent-orange mb-6">
                {t("solutionsTitle")}
              </h3>
              <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-5 items-center">
                {SOLUTIONS.map(({ key, icon: Icon }) => (
                  <div key={key} className="contents">
                    <div
                      className="w-12 h-12 flex items-center justify-center shrink-0 rounded-xl bg-accent-orange/10 text-accent-orange"
                      aria-hidden
                    >
                      <Icon className="w-8 h-8" strokeWidth={2} />
                    </div>
                    <p className="text-foreground/80 min-w-0">
                      {t(`solutions.${key}`)}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
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
            <Button variant="primary">{t("cta")}</Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
