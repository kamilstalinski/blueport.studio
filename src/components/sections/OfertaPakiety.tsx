"use client";

import Link from "next/link";
import { useTranslations } from "@/lib/messages";
import { motion } from "framer-motion";
import { Zap, ShoppingCart, Code2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import SpotlightCard from "@/components/SpotlightCard";
import {
  fadeInUp,
  viewportOnce,
  useReducedMotionPref,
} from "@/lib/animations";

const CARDS = [
  { key: "strony" as const, icon: Zap },
  { key: "sklepy" as const, icon: ShoppingCart },
  { key: "dedykowane" as const, icon: Code2 },
] as const;

type OfertaPakietyProps = {
  /** Gradient od góry (domyślnie true). Na stronie głównej ustaw false, żeby go nie było. */
  topGradient?: boolean;
};

export function OfertaPakiety({ topGradient = true }: OfertaPakietyProps) {
  const t = useTranslations("Home.ofertaPakiety");
  const reduceMotion = useReducedMotionPref();
  const initial = reduceMotion ? "visible" : "hidden";

  return (
    <Section id="oferta-pakiety" topGradient={topGradient} className="!py-28">
      <motion.h2
        className="heading-2 text-white mb-10"
        initial={initial}
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeInUp}
      >
        {t("title")}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {CARDS.map(({ key, icon: Icon }, index) => {
          const isFirst = index === 0;
          const title = t(`${key}.title`);
          const desc = key === "dedykowane" ? t("dedykowane.desc") : t(`${key}.desc`);
          const price = key === "strony" ? t("strony.standardPrice") : key === "sklepy" ? t("sklepy.startPrice") : t("dedykowane.price");
          const cta = key === "dedykowane" ? t("dedykowane.cta") : t(`${key}.cta`);

          return (
            <SpotlightCard
              key={key}
              className={`custom-spotlight-card rounded-2xl overflow-hidden h-full ${isFirst ? "oferta-package-featured scale-[1.03] z-10" : ""}`}
              spotlightColor="rgba(0, 229, 160, 0.2)"
            >
              <motion.article
                initial={initial}
                whileInView="visible"
                viewport={viewportOnce}
                variants={fadeInUp}
                className={`glass-card rounded-2xl flex flex-col h-full transition-all duration-300 relative ${isFirst ? "p-10" : "p-8"}`}
              >
                {isFirst && (
                  <span
                    className="absolute top-4 right-4 body-small font-semibold px-3 py-1 rounded-full bg-primary text-black border-0"
                    aria-hidden
                  >
                    Najczęściej wybierane
                  </span>
                )}
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[rgba(0,229,160,0.12)] text-primary">
                  <Icon className="h-8 w-8" strokeWidth={2} aria-hidden />
                </span>
                <h3 className="heading-3 mt-6 text-white">{title}</h3>
                <p className="mt-3 body-standard text-white/60 leading-relaxed">{desc}</p>
                <div className="mt-6 flex-1">
                  <p className="heading-3 font-bold text-white mt-1">
                    {price}
                  </p>
                </div>
                <Link href="/kalkulator" className="mt-8 inline-block">
                  <Button variant={isFirst ? "primary" : "secondary"}>{cta}</Button>
                </Link>
              </motion.article>
            </SpotlightCard>
          );
        })}
      </div>

      <p className="body-small text-white/50 mt-10 text-center">
        Nie wiesz, który pakiet wybrać?{" "}
        <Link href="/kalkulator" className="text-[#00b8d9] hover:text-primary hover:underline decoration-primary">
          Sprawdź koszt w kalkulatorze.
        </Link>
      </p>
    </Section>
  );
}
