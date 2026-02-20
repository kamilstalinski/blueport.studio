"use client";

import { motion } from "framer-motion";
import { IconBox } from "@/components/ui/IconBox";
import { Section } from "@/components/ui/Section";
import { SpotlightCard } from "@/components/SpotlightCard";
import { fadeInUp, viewportOnce, useReducedMotionPref } from "@/lib/animations";
import { useGlassBlurStyle } from "@/lib/useGlassBlurStyle";

const CARDS = [
  { emoji: "📋" as const, text: "50+ zrealizowanych projektów" },
  { emoji: "⏱️" as const, text: "Realizacja w 1–2 tygodnie" },
  { emoji: "📄" as const, text: "Jasna wycena przed startem" },
  { emoji: "📍" as const, text: "Lokalnie Szczecin / Cała Polska" },
] as const;

export function WhyBluePort() {
  const reduceMotion = useReducedMotionPref();
  const initial = reduceMotion ? "visible" : "hidden";
  const glassBlurStyle = useGlassBlurStyle();

  return (
    <Section id="dlaczego-blueport">
      <motion.h2
        className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4"
        initial={initial}
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeInUp}
      >
        Dlaczego BluePort?
      </motion.h2>
      <motion.p
        className="body-lead text-white/70 leading-relaxed max-w-2xl mb-12"
        initial={initial}
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeInUp}
      >
        Nie jesteśmy agencją z 10 handlowcami. Jesteśmy partnerem technologicznym dla małych firm.
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "var(--grid-gap)" }}>
        {CARDS.map(({ emoji, text }) => (
          <SpotlightCard
            key={text}
            className="custom-spotlight-card rounded-2xl h-full"
          >
            <div className="card rounded-2xl p-8 h-full" style={glassBlurStyle}>
              <motion.div
                className="h-full"
                initial={initial}
                whileInView="visible"
                viewport={viewportOnce}
                variants={fadeInUp}
              >
                <IconBox emoji={emoji} />
                <p className="mt-4 font-medium text-white">
                  {text}
                </p>
              </motion.div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </Section>
  );
}
