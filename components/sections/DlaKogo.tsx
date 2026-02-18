"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  User,
  Briefcase,
  MapPin,
  Store,
  Building2,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import SpotlightCard from "@/components/SpotlightCard";
import {
  fadeInUp,
  staggerContainer,
  viewportOnce,
  useReducedMotionPref,
} from "@/lib/animations";

const ITEMS: { key: "one" | "services" | "local" | "stores" | "b2b"; icon: typeof User }[] = [
  { key: "one", icon: User },
  { key: "services", icon: Briefcase },
  { key: "local", icon: MapPin },
  { key: "stores", icon: Store },
  { key: "b2b", icon: Building2 },
];

export function DlaKogo() {
  const t = useTranslations("Home.dlaKogo");
  const reduceMotion = useReducedMotionPref();
  const initial = reduceMotion ? "visible" : "hidden";

  return (
    <Section
      id="dla-kogo"
      className="dla-kogo-section relative py-28 md:py-36"
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
            {t("title")}
          </h2>
          <p className="mt-4 body-lead text-foreground/80 max-w-2xl mx-auto md:text-lg">
            Specjalizujemy się w firmach, które chcą rosnąć online.
          </p>
          <p className="mt-6 body-standard text-foreground/60 leading-relaxed max-w-xl mx-auto">
            {t("outro")}
          </p>
        </motion.div>

        {/* Jedna szklana lista – "Tworzymy strony dla:" + 5 punktów */}
        <SpotlightCard
          className="custom-spotlight-card rounded-2xl overflow-hidden"
          spotlightColor="rgba(0, 229, 160, 0.2)"
        >
          <motion.div
            initial={initial}
            animate="visible"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="glass-card rounded-2xl overflow-hidden"
          >
            <div className="border-b border-white/10 px-6 py-4 md:px-8 md:py-5">
            <p className="body-lead font-medium text-foreground">
              {t("intro")}
            </p>
          </div>
          <ul className="divide-y divide-white/10">
            {ITEMS.map(({ key, icon: Icon }) => (
              <motion.li
                key={key}
                variants={fadeInUp}
                className="flex items-center gap-5 px-6 py-5 md:px-8 md:py-6 transition-colors hover:bg-white/[0.06]"
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent-orange"
                  aria-hidden
                >
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </span>
                <p className="body-lead text-foreground font-medium">
                  {t(`items.${key}`)}
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
