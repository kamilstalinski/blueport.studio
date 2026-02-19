"use client";

import { motion } from "framer-motion";
import { IconBox } from "@/components/ui/IconBox";
import { Section } from "@/components/ui/Section";
import SpotlightCard from "@/components/SpotlightCard";
import {
  fadeInUp,
  staggerContainer,
  viewportOnce,
  useReducedMotionPref,
} from "@/lib/animations";

const ITEMS: { key: "one" | "services" | "local" | "stores" | "b2b"; emoji: string; label: string }[] = [
  { key: "one", emoji: "👤", label: "jednoosobowych działalności" },
  { key: "services", emoji: "💼", label: "firm usługowych" },
  { key: "local", emoji: "📍", label: "lokalnych biznesów" },
  { key: "stores", emoji: "🏪", label: "sklepów stacjonarnych wchodzących online" },
  { key: "b2b", emoji: "🏢", label: "firm B2B i B2C" },
];

export function DlaKogo() {
  const reduceMotion = useReducedMotionPref();
  const initial = reduceMotion ? "visible" : "hidden";

  return (
    <Section
      id="dla-kogo"
      className="dla-kogo-section relative"
    >
      <div className="max-w-4xl mx-auto">
        {/* Nagłówek – wycentrowany */}
        <motion.div
          initial={initial}
          animate="visible"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="heading-2 text-foreground">
            Dla mikro i małych firm.
          </h2>
          <p className="mt-4 body-lead text-foreground/80 max-w-2xl mx-auto md:text-lg">
            Specjalizujemy się w firmach, które chcą rosnąć online.
          </p>
          <p className="mt-6 body-standard text-foreground/60 leading-relaxed max-w-xl mx-auto">
            Jeśli nie masz strony lub Twoja obecna nie przynosi efektów — pomożemy to zmienić.
          </p>
        </motion.div>

        {/* Jedna szklana lista – "Tworzymy strony dla:" + 5 punktów */}
        <SpotlightCard
          className="custom-spotlight-card rounded-2xl"
        >
          <motion.div
            initial={initial}
            animate="visible"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="glass-card rounded-2xl"
          >
            <div className="border-b border-white/10 card-padding-inline" style={{ paddingBlock: "var(--space-2)" }}>
            <p className="body-lead font-medium text-foreground">
              Tworzymy strony dla:
            </p>
          </div>
          <ul className="divide-y divide-white/10">
            {ITEMS.map(({ key, emoji, label }) => (
              <motion.li
                key={key}
                variants={fadeInUp}
                className="flex items-center card-padding-inline transition-colors hover:bg-white/[0.06]"
            style={{ paddingBlock: "var(--space-3)", gap: "var(--element-gap)" }}
              >
                <IconBox emoji={emoji} />
                <p className="body-lead text-foreground font-medium">
                  {label}
                </p>
              </motion.li>
            ))}
          </ul>
          </motion.div>
        </SpotlightCard>
      </div>
    </Section>
  );
}
