"use client";

import { useTranslations } from "@/lib/messages";
import { motion } from "framer-motion";
import { Wallet, Clock, Headphones, Zap, MessageCircle, Search, TrendingUp, Send, Phone, FileText, ChevronRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import SpotlightCard from "@/components/SpotlightCard";
import { viewportOnce, useReducedMotionPref } from "@/lib/animations";

const DEFAULT_KEYS = ["price", "time", "support"] as const;
const ICON_MAP: Record<string, typeof Wallet> = {
  price: Wallet,
  time: Clock,
  support: Headphones,
  fast: Zap,
  leads: MessageCircle,
  seo: Search,
  conversion: TrendingUp,
  send: Send,
  contact: Phone,
  quote: FileText,
};

type DlaczegoMyProps = {
  contentKey?: "Home.dlaczegoMy" | "proces.dlaczego" | "realizacjeEfekty" | "kalkulator.coDalej";
  itemKeys?: readonly string[];
};

const easeSmooth = [0.25, 0.46, 0.45, 0.94] as const;

const headingVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeSmooth } },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.06, ease: easeSmooth } },
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: easeSmooth } },
};

export function DlaczegoMy({ contentKey = "Home.dlaczegoMy", itemKeys }: DlaczegoMyProps) {
  const t = useTranslations(contentKey);
  const reduceMotion = useReducedMotionPref();
  const initial = reduceMotion ? "visible" : "hidden";
  const keys = (itemKeys ?? DEFAULT_KEYS) as string[];

  return (
    <Section id={contentKey === "proces.dlaczego" ? "dlaczego-proces" : contentKey === "realizacjeEfekty" ? "efekty" : contentKey === "kalkulator.coDalej" ? "co-dalej" : "dlaczego-my"} className="overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="heading-2 text-white text-center"
          initial={initial}
          whileInView="visible"
          viewport={viewportOnce}
          variants={headingVariants}
        >
          {t("title")}
        </motion.h2>
        <motion.p
          className="text-white/60 text-center mt-4 max-w-2xl mx-auto"
          initial={initial}
          whileInView="visible"
          viewport={viewportOnce}
          variants={subtitleVariants}
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          className="mt-14 flex flex-col sm:grid sm:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-4 sm:gap-2 md:gap-4 sm:max-w-5xl sm:mx-auto"
          role="list"
          initial={initial}
          whileInView="visible"
          viewport={viewportOnce}
          variants={listVariants}
        >
          {keys.flatMap((key, index) => {
            const Icon = ICON_MAP[key] ?? Wallet;
            const card = (
              <SpotlightCard
                key={key}
                className="custom-spotlight-card rounded-2xl overflow-hidden h-full min-w-0 w-full"
                spotlightColor="rgba(0, 229, 160, 0.2)"
              >
                <motion.div
                  variants={itemVariants}
                  initial={initial}
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="glass-card rounded-2xl flex flex-col items-center text-center gap-4 p-6 md:p-8 transition-colors hover:bg-white/[0.12] h-full min-h-full"
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white"
                    aria-hidden
                  >
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1 flex flex-col">
                    <h3 className="heading-3 text-white">
                      {t(`items.${key}`)}
                    </h3>
                    <p className="text-white/60 body-small mt-1">
                      {t(`itemsDesc.${key}`)}
                    </p>
                  </div>
                </motion.div>
              </SpotlightCard>
            );
            if (index === 0) return [card];
            return [
              <span
                key={`arrow-${key}`}
                className="hidden sm:flex items-center justify-center px-1 md:px-2 text-white/30"
                aria-hidden
              >
                <ChevronRight className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2} />
              </span>,
              card,
            ];
          })}
        </motion.div>
      </div>
    </Section>
  );
}
