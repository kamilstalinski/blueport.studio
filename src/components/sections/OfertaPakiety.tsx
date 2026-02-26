"use client";

import { useState } from "react";
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

/** W sekcji pakiety: jedna karta WordPress ze switchem START/PRO + pozostałe pakiety */
const SECTION_PACKAGE_ORDER: (PackageId | "wordpress-merge")[] = [
  "wordpress-merge",
  "sklep-online",
  "projekt-dedykowany",
];

const PACKAGE_EMOJI: Record<PackageId, string> = {
  "strona-start": "⚡",
  "strona-pro": "✨",
  "sklep-online": "🛒",
  "projekt-dedykowany": "💻",
};

type WordPressVariant = "strona-start" | "strona-pro";

export function OfertaPakiety({ topGradient = true, cardVariant = "default" }: OfertaPakietyProps) {
  const glassBlurStyle = useGlassBlurStyle();
  const { ref, animate } = useScrollAnimation();
  const { variants: v } = useMotionSafe();
  const [wordPressVariant, setWordPressVariant] = useState<WordPressVariant>("strona-pro");

  const renderPackageCard = (packageId: PackageId, index: number) => {
    const pkg = PACKAGES[packageId];
    const title = `${pkg.name} (${pkg.tech})`;
    const price = `od ${pkg.basePrice.toLocaleString("pl-PL")} zł`;
    const isFeatured = !!pkg.tag;
    const cta = "Sprawdź wycenę";

    return (
      <motion.div key={packageId} variants={v.scaleIn} className="h-full min-h-0">
        <motion.div
          className="h-full"
          whileHover={isFeatured ? undefined : { y: -3, transition: springs.smooth }}
          whileTap={isFeatured ? undefined : { scale: 0.992, transition: springs.stiff }}
        >
          <SpotlightCard
            className={cn(
              "custom-spotlight-card rounded-2xl h-full oferta-package-card",
              isFeatured && "oferta-package-featured",
            )}
          >
            <article
              className={cn(
                "card rounded-2xl flex flex-col h-full relative card-padding",
                isFeatured && "card-featured",
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
                  <p className="body-small text-white/50 mt-1">{pkg.deliveryLabel}</p>
                  {cardVariant === "subpage" && pkg.coZawiera?.length ? (
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
                      {pkg.coZawiera.map((item, i) => (
                        <div key={i} className="flex gap-2 items-start" style={{ padding: "4px 0" }}>
                          <span className="shrink-0 text-primary" aria-hidden>✓</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
                <Link href="/kalkulator" className="mt-8 inline-block">
                  <Button
                    variant={isFeatured ? "primary" : "ghost"}
                    className={
                      !isFeatured ? "!text-white/80 hover:!bg-white/10 hover:!text-white focus-visible:!ring-white/30" : undefined
                    }
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
  };

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
          {SECTION_PACKAGE_ORDER.map((item, index) => {
            if (item === "wordpress-merge") {
              const pkg = PACKAGES[wordPressVariant];
              const title = `${pkg.name} (${pkg.tech})`;
              const price = `od ${pkg.basePrice.toLocaleString("pl-PL")} zł`;
              const isPro = wordPressVariant === "strona-pro";
              const cta = "Sprawdź wycenę";

              return (
                <motion.div key="wordpress-merge" variants={v.scaleIn} className="h-full min-h-0">
                  <motion.div
                    className="h-full"
                    whileHover={{ y: -3, transition: springs.smooth }}
                    whileTap={{ scale: 0.992, transition: springs.stiff }}
                  >
                    <SpotlightCard className="custom-spotlight-card rounded-2xl h-full oferta-package-card oferta-package-featured">
                      <article
                        className={cn(
                          "card rounded-2xl flex flex-col h-full relative card-padding card-featured",
                          cardVariant === "subpage" && "card-subpage",
                        )}
                        style={glassBlurStyle}
                      >
                        <div className="flex flex-col h-full">
                          {isPro && (
                            <span
                              className="absolute top-4 right-4 body-small font-semibold px-3 py-1 rounded-full bg-primary text-primary-foreground border-0"
                              aria-hidden
                            >
                              Najczęściej wybierane
                            </span>
                          )}
                          {/* Toggle START / PRO — track + thumb, etykiety po bokach */}
                          <div
                            className="flex items-center gap-3 w-fit"
                            role="group"
                            aria-label="Wersja pakietu WordPress"
                          >
                            <button
                              type="button"
                              onClick={() => setWordPressVariant("strona-start")}
                              className={cn(
                                "body-small font-medium transition-colors cursor-pointer",
                                wordPressVariant === "strona-start"
                                  ? "text-white"
                                  : "text-white/50 hover:text-white/80",
                              )}
                            >
                              START
                            </button>
                            <button
                              type="button"
                              role="switch"
                              aria-checked={isPro}
                              aria-label={isPro ? "Pakiet PRO (wyłącz dla START)" : "Pakiet START (włącz dla PRO)"}
                              onClick={() => setWordPressVariant(isPro ? "strona-start" : "strona-pro")}
                              className={cn(
                                "package-toggle relative inline-flex shrink-0 rounded-full transition-colors duration-200 ease-out",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                                "h-7 w-12 cursor-pointer",
                                isPro
                                  ? "bg-[var(--color-primary-subtle)]"
                                  : "bg-white/15",
                              )}
                              style={{
                                transition: "background-color 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                              }}
                            >
                              <span
                                className={cn(
                                  "package-toggle-thumb absolute top-1 rounded-full transition-all duration-200 ease-out",
                                  "h-5 w-5",
                                  isPro
                                    ? "left-6 bg-[var(--color-primary)] shadow-[0_0_0_0_var(--color-primary-glow)] hover:shadow-[0_0_12px_2px_var(--color-primary-glow)] focus-visible:shadow-[0_0_14px_4px_var(--color-primary-glow)] active:shadow-[0_0_18px_6px_var(--color-primary-glow)]"
                                    : "left-[4px] bg-white/95 text-white shadow-[0_0_0_0_rgba(255,255,255,0.15)] hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.2)] focus-visible:shadow-[0_0_12px_4px_rgba(255,255,255,0.25)] active:shadow-[0_0_14px_6px_rgba(255,255,255,0.3)]",
                                )}
                                style={{
                                  transition: "left 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, background-color 0.25s ease",
                                }}
                                aria-hidden
                              />
                            </button>
                            <button
                              type="button"
                              onClick={() => setWordPressVariant("strona-pro")}
                              className={cn(
                                "body-small font-medium transition-colors cursor-pointer",
                                wordPressVariant === "strona-pro"
                                  ? "text-white"
                                  : "text-white/50 hover:text-white/80",
                              )}
                            >
                              PRO
                            </button>
                          </div>
                          <IconBox emoji={PACKAGE_EMOJI[wordPressVariant]} />
                          <h3 className="heading-3 mt-6 text-white">{title}</h3>
                          <p className="mt-3 body-standard text-white/60 leading-relaxed">
                            {isPro
                              ? "Indywidualnie zaprojektowana strona dopasowana do Twojej marki i klientów."
                              : pkg.description}
                          </p>
                          <div className="mt-6 flex-1">
                            <p className="heading-3 font-bold text-white mt-1">{price}</p>
                            <p className="body-small text-white/50 mt-1">{pkg.deliveryLabel}</p>
                            {isPro && (
                              <p className="body-small text-white/55 mt-2" style={{ fontSize: "0.8rem" }}>
                                Większa elastyczność i bardziej dopracowany wygląd niż w wersji Start
                              </p>
                            )}
                            {cardVariant === "subpage" && pkg.coZawiera?.length ? (
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
                                {pkg.coZawiera.map((itemRow, i) => (
                                  <div key={i} className="flex gap-2 items-start" style={{ padding: "4px 0" }}>
                                    <span className="shrink-0 text-primary" aria-hidden>✓</span>
                                    <span>{itemRow}</span>
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>
                          <Link href="/kalkulator" className="mt-8 inline-block">
                            <Button variant="primary">{cta}</Button>
                          </Link>
                        </div>
                      </article>
                    </SpotlightCard>
                  </motion.div>
                </motion.div>
              );
            }
            return renderPackageCard(item, index);
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
