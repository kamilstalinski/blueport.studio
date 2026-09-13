"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

import { Container } from "@/components/ui/Container";

import type { HeroContentKey } from "@/types";

const ColorBends = dynamic(
  () => import("@/components/ColorBends").then((m) => m.default),
  { ssr: false }
);

/** Colors from globals.css (--color-primary, --color-accent-2); used in ColorBends */
const HERO_BENDS_ACCENT_2 = "#00b8d9" as const;
const HERO_BENDS_PRIMARY = "#3b82f6" as const;

const HERO_NOISE_SVG = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)"/></svg>'
)}`;

const HERO_TEXTS: Record<
  Exclude<HeroContentKey, "Home.hero">,
  {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaPrimaryHref: string;
    ctaSecondaryHref: string;
    stats: string;
  }
> = {
  "uslugi.hero": {
    title: "Nowoczesne strony i sklepy internetowe.",
    subtitle:
      "Projektujemy szybkie i skuteczne strony dla mikro i małych firm. Jasna wycena. Bez chaosu.",
    ctaPrimary: "Sprawdź koszt w 60 sekund",
    ctaSecondary: "Umów bezpłatną konsultację",
    ctaPrimaryHref: "/kalkulator",
    ctaSecondaryHref: "/kontakt",
    stats: "",
  },
  "realizacje.hero": {
    title: "Zobacz nasze realizacje.",
    subtitle: "Strony zaprojektowane pod realne wyniki.",
    ctaPrimary: "Sprawdź koszt swojej strony",
    ctaSecondary: "Umów bezpłatną konsultację",
    ctaPrimaryHref: "/kalkulator",
    ctaSecondaryHref: "/kontakt",
    stats: "",
  },
  "proces.hero": {
    title: "Proces współpracy",
    subtitle: "Prosto. Transparentnie. Bez chaosu.",
    ctaPrimary: "Rozpocznij wycenę",
    ctaSecondary: "Umów bezpłatną konsultację",
    ctaPrimaryHref: "/kalkulator",
    ctaSecondaryHref: "/kontakt",
    stats: "",
  },
  "kalkulator.hero": {
    title: "Sprawdź koszt realizacji w 60 sekund.",
    subtitle: "Wybierz zakres projektu i zobacz szacunkową wycenę.",
    ctaPrimary: "Przejdź do kalkulatora",
    ctaSecondary: "Umów bezpłatną konsultację",
    ctaPrimaryHref: "#kalkulator-form",
    ctaSecondaryHref: "/kontakt",
    stats: "",
  },
  "kontakt.hero": {
    title: "Porozmawiajmy o Twojej stronie.",
    subtitle: "Umów bezpłatną konsultację.",
    ctaPrimary: "Umów konsultację",
    ctaSecondary: "Sprawdź koszt w kalkulatorze",
    ctaPrimaryHref: "#formularz-kontaktowy",
    ctaSecondaryHref: "/kalkulator",
    stats: "",
  },
  "oNas.hero": {
    title: "Tworzymy strony, które sprzedają. Bez chaosu.",
    subtitle:
      "Blueport to małe studio z konkretnym podejściem. Jasna wycena. Jasny proces. Realne efekty.",
    ctaPrimary: "Bezpłatna wycena",
    ctaSecondary: "Zobacz proces",
    ctaPrimaryHref: "/kalkulator",
    ctaSecondaryHref: "/proces",
    stats: "",
  },
};

function CtaLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const cls = className ?? "";
  return href.startsWith("#") ? (
    <a href={href} className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function Hero({ contentKey }: { contentKey: Exclude<HeroContentKey, "Home.hero"> }) {
  const content = HERO_TEXTS[contentKey];
  const heroBendsColors = [HERO_BENDS_PRIMARY, HERO_BENDS_ACCENT_2];

  const primaryHref = content.ctaPrimaryHref;
  const secondaryHref = content.ctaSecondaryHref;
  const showSecondary = !!content.ctaSecondary;
  const showStats = !!content.stats;

  return (
    <section
      id="hero"
      className="relative min-h-[55vh] md:min-h-[60vh] overflow-hidden"
      style={{ background: "var(--color-hero-fade)" }}
    >
      <div className="absolute inset-0 z-0 opacity-90" aria-hidden>
        <ColorBends
          rotation={95}
          speed={0.2}
          colors={heroBendsColors}
          transparent
          autoRotate={0.35}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1.4}
          parallax={1.4}
          noise={0}
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/40" aria-hidden />
      <div
        className="absolute inset-0 z-[2] pointer-events-none opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("${HERO_NOISE_SVG}")`,
          backgroundSize: "200px 200px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-72"
        style={{ background: `linear-gradient(to top, var(--color-hero-fade), transparent)` }}
        aria-hidden
      />
      <Container
        variant="wide"
        className="relative z-10 grid grid-cols-1 items-center justify-items-center text-center min-h-[55vh] md:min-h-[60vh] pt-[calc(var(--navbar-height)+4rem)] pb-16 pointer-events-none"
      >
        <div className="flex flex-col items-center max-w-2xl space-y-6 pointer-events-auto">
          {showStats && content.stats && (
            <div
              className="hero-badge font-body inline-flex items-center gap-2 w-fit rounded-full py-1.5 px-3.5 text-[0.72rem] md:text-[0.75rem] text-white/70 border border-white/20"
              style={{ background: "var(--color-hero-badge-bg)" }}
            >
              <span className="badge-dot w-[7px] h-[7px] rounded-full shrink-0" aria-hidden />
              {content.stats}
            </div>
          )}
          <h1
            className="font-heading text-white font-extrabold leading-[1.08] tracking-tight text-[clamp(2rem,8vw,2.8rem)] md:text-[clamp(2.6rem,5.5vw,3.5rem)]"
            style={{ letterSpacing: "-0.03em" }}
          >
            {content.title}
          </h1>
          <p
            className="font-body body-lead max-w-xl mx-auto leading-[1.7]"
            style={{
              fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
              color: "var(--color-text-secondary)",
            }}
          >
            {content.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row flex-nowrap items-stretch sm:items-center justify-center gap-3 mt-8 w-full">
            <CtaLink href={primaryHref} className="w-full sm:w-auto inline-flex shrink-0">
              <button
                type="button"
                className="hero-cta-primary font-body inline-flex items-center justify-center gap-2 rounded-[10px] border-none cursor-pointer w-full sm:w-auto shrink-0"
                style={{
                  background: "var(--color-primary)",
                  color: "var(--color-on-primary)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  padding: "14px 28px",
                }}
              >
                {content.ctaPrimary}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path
                    d="M2 7h10M8 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </CtaLink>
            {showSecondary && (
              <CtaLink href={secondaryHref} className="w-full sm:w-auto inline-flex shrink-0">
                <button
                  type="button"
                  className="hero-cta-ghost font-body rounded-[10px] cursor-pointer w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    padding: "14px 28px",
                    boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.5)",
                  }}
                >
                  {content.ctaSecondary}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path
                      d="M2 7h10M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </CtaLink>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
