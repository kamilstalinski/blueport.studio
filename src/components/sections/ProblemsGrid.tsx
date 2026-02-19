"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { IconBox } from "@/components/ui/IconBox";
import SpotlightCard from "@/components/SpotlightCard";
import {
  staggerContainer,
  fadeInUp,
  viewportOnce,
  useReducedMotionPref,
} from "@/lib/animations";

const CARDS = [
  { key: "noSite" as const, emoji: "🌐" as const, title: "Brak strony", desc: "Twoja firma nie ma wizytówki online. Klienci szukają w internecie i Ciebie nie znajdują." },
  { key: "outdated" as const, emoji: "⏱️" as const, title: "Przestarzała strona", desc: "Strona wygląda na nieaktualną, wolno się ładuje i nie działa dobrze na telefonie." },
  { key: "noSeo" as const, emoji: "🔍" as const, title: "Brak widoczności w Google", desc: "Strona istnieje, ale nikt jej nie odwiedza. Brak podstawowego SEO i struktury." },
  { key: "noShop" as const, emoji: "🛒" as const, title: "Brak sprzedaży online", desc: "Chcesz sprzedawać w internecie, ale nie masz sklepu ani prostego sposobu na zamówienia." },
] as const;

export function ProblemsGrid() {
  const reduceMotion = useReducedMotionPref();
  const initial = reduceMotion ? "visible" : "hidden";

  return (
    <Section id="problemy">
      <div className="grid lg:grid-cols-12 lg:items-start" style={{ gap: "var(--grid-gap)" }}>
        <motion.div
          className="lg:col-span-5"
          initial={initial}
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl mb-10">
            Częste problemy małych firm
          </h2>
          <p className="max-w-prose text-white/70 leading-relaxed">
            Rozpoznajesz któryś? Pomagamy je rozwiązać.
          </p>
        </motion.div>
        <motion.ul
          className="grid sm:grid-cols-2 lg:col-span-7 lg:items-stretch" style={{ gap: "var(--grid-gap)" }}
          initial={initial}
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
            {CARDS.map(({ key, emoji, title, desc }) => (
              <motion.li key={key} variants={fadeInUp} className="flex min-h-0">
                <SpotlightCard className="custom-spotlight-card flex h-full w-full min-w-0">
                  <article className="card flex h-full min-h-0 flex-col rounded-xl card-padding">
                    <IconBox emoji={emoji} />
                    <h3 className="mt-5 shrink-0 heading-3 text-white">
                      {title}
                    </h3>
                    <p className="mt-1 min-h-0 flex-1 body-small text-white/70 leading-relaxed">
                      {desc}
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
