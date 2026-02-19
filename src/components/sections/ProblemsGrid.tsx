"use client";

import { useTranslations } from "@/lib/messages";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import {
  ExclamationTriangleIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import SpotlightCard from "@/components/SpotlightCard";
import {
  staggerContainer,
  fadeInUp,
  viewportOnce,
  useReducedMotionPref,
} from "@/lib/animations";

const CARDS = [
  { key: "noSite" as const, icon: ExclamationTriangleIcon },
  { key: "outdated" as const, icon: ClockIcon },
  { key: "noSeo" as const, icon: MagnifyingGlassIcon },
  { key: "noShop" as const, icon: ShoppingCartIcon },
] as const;

export function ProblemsGrid() {
  const t = useTranslations("Home.problemCards");
  const reduceMotion = useReducedMotionPref();
  const initial = reduceMotion ? "visible" : "hidden";

  return (
    <Section id="problemy">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        <motion.div
          className="lg:col-span-5"
          initial={initial}
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl mb-10">
            {t("title")}
          </h2>
          <p className="max-w-prose text-white/70 leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>
        <motion.ul
          className="grid gap-8 sm:grid-cols-2 lg:col-span-7 lg:items-stretch"
          initial={initial}
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
            {CARDS.map(({ key, icon: Icon }) => (
              <motion.li key={key} variants={fadeInUp} className="flex min-h-0">
                <SpotlightCard className="custom-spotlight-card flex h-full w-full min-w-0" spotlightColor="rgba(0, 229, 160, 0.2)">
                  <article className="glass-card flex h-full min-h-0 flex-col rounded-xl p-6">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-8 w-8 text-primary" strokeWidth={2} aria-hidden />
                    </span>
                    <h3 className="mt-5 shrink-0 heading-3 text-white">
                      {t(`${key}.title`)}
                    </h3>
                    <p className="mt-1 min-h-0 flex-1 body-small text-white/70 leading-relaxed">
                      {t(`${key}.desc`)}
                    </p>
                  </article>
                </SpotlightCard>
              </motion.li>
            ))}
          </motion.ul>
      </div>
    </Section>
  );
}
