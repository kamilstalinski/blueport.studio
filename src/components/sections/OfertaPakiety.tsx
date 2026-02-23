"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IconBox } from "@/components/ui/IconBox";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SpotlightCard } from "@/components/SpotlightCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { springs } from "@/constants/animations";
import { cn } from "@/lib/utils";
import { useGlassBlurStyle } from "@/lib/useGlassBlurStyle";
import type { OfertaPakietyProps } from "@/types";
import { PACKAGES } from "@/constants/pricing";
import type { PackageId } from "@/constants/pricing";

const PACKAGE_ORDER: PackageId[] = ["wordpress", "woocommerce", "nextjs"];

const PACKAGE_EMOJI: Record<PackageId, string> = {
  wordpress: "⚡",
  woocommerce: "🛒",
  nextjs: "💻",
};

const PACKAGE_INCLUDES: Record<PackageId, string[]> = {
  wordpress: [
    "Projekt graficzny UI",
    "Responsywność (mobile-first)",
    "Podstawowe SEO on-page",
    "Szkolenie z edycji (1h)",
    "30 dni wsparcia po wdrożeniu",
  ],
  woocommerce: [
    "Projekt graficzny UI",
    "Konfiguracja płatności (Przelewy24, BLIK)",
    "Import produktów (do 50 szt.)",
    "SEO on-page dla sklepu",
    "Szkolenie z obsługi WooCommerce (2h)",
  ],
  nextjs: [
    "Architektura techniczna",
    "Integracje API / CRM",
    "Wycena indywidualna",
    "Dedykowany opiekun projektu",
    "SLA i dokumentacja",
  ],
};

export function OfertaPakiety({ topGradient = true, cardVariant = "default" }: OfertaPakietyProps) {
  const glassBlurStyle = useGlassBlurStyle();
  const { ref, animate } = useScrollAnimation();
  const { variants: v } = useMotionSafe();

  return (
    <Section id="oferta-pakiety" className="section-packages" topGradient={topGradient} tight noWrapper>
      <ScrollReveal variant="fadeUp" className={cn("container-narrow section-intro", topGradient && "relative z-10")}>
        <h2 className="heading-2 text-white mb-0">
          Jasne pakiety. Konkretne efekty.
        </h2>
      </ScrollReveal>

      <div className="container relative z-10">
        <motion.div
          ref={ref}
          variants={v.stagger}
          initial="hidden"
          animate={animate}
          className="grid grid-cols-1 md:grid-cols-3 items-stretch"
          style={{ gap: "var(--grid-gap)" }}
        >
          {PACKAGE_ORDER.map((packageId) => {
            const pkg = PACKAGES[packageId];
            const title = `${pkg.name} (${pkg.tech})`;
            const price = `od ${pkg.basePrice.toLocaleString("pl-PL")} zł`;
            const isMiddle = !!pkg.tag;
            const cta = "Sprawdź wycenę";

            return (
              <motion.div key={packageId} variants={v.scaleIn} className={isMiddle ? "overflow-visible" : undefined}>
                <motion.div
                  whileHover={isMiddle ? undefined : { y: -3, transition: springs.smooth }}
                  whileTap={isMiddle ? undefined : { scale: 0.992, transition: springs.stiff }}
                >
                  <SpotlightCard
                    className={`custom-spotlight-card rounded-2xl h-full oferta-package-card ${isMiddle ? "oferta-package-featured" : ""}`}
                  >
                    <article
                  className={cn(
                    "card rounded-2xl flex flex-col h-full relative card-padding",
                    isMiddle && "card-featured",
                    cardVariant === "subpage" && "card-subpage",
                  )}
                  style={glassBlurStyle}
                >
                  <div className="flex flex-col h-full">
                    {pkg.tag && (
                      <span
                        className="absolute top-4 right-4 body-small font-semibold px-3 py-1 rounded-full bg-primary text-primary-foreground border-0"
                        aria-hidden
                      >
                        {pkg.tag}
                      </span>
                    )}
                    <IconBox emoji={PACKAGE_EMOJI[packageId]} />
                    <h3 className="heading-3 mt-6 text-white">{title}</h3>
                    <p className="mt-3 body-standard text-white/60 leading-relaxed">{pkg.description}</p>
                    <div className="mt-6 flex-1">
                      <p className="heading-3 font-bold text-white mt-1">{price}</p>
                      <p className="body-small text-white/50 mt-1">{pkg.deliveryDays} dni realizacji</p>
                      {cardVariant === "subpage" && PACKAGE_INCLUDES[packageId] && (
                        <div
                          className="mt-4 pt-4 border-t flex flex-col gap-1"
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--color-text-secondary)",
                            paddingTop: 4,
                            borderTopColor: "var(--color-border)",
                          }}
                        >
                          <span className="font-semibold text-white/70" style={{ fontSize: "0.75rem" }}>
                            Co zawiera:
                          </span>
                          {PACKAGE_INCLUDES[packageId].map((item, i) => (
                            <div key={i} className="flex gap-2 items-start" style={{ padding: "4px 0" }}>
                              <span className="shrink-0 text-primary" aria-hidden>✓</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <Link href="/kalkulator" className="mt-8 inline-block">
                      <Button
                        variant={isMiddle ? "primary" : "ghost"}
                        className={!isMiddle ? "!text-white/80 hover:!bg-white/10 hover:!text-white focus-visible:!ring-white/30" : undefined}
                      >
                        {cta}
                      </Button>
                    </Link>
                  </div>
                </article>
              </SpotlightCard>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        <p className="body-small text-white/50 mt-10 text-center">
          Nie wiesz, który pakiet wybrać?{" "}
          <Link href="/kalkulator" className="text-accent-2 hover:text-primary hover:underline decoration-primary">
            Sprawdź koszt w kalkulatorze.
          </Link>
        </p>
      </div>
    </Section>
  );
}
