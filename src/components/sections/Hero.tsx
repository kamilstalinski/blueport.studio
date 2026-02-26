"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";

import { useMotionSafe } from "@/hooks/useMotionSafe";

import { useGlassBlurStyle } from "@/lib/useGlassBlurStyle";

import type { HeroContentKey } from "@/types";

const ColorBends = dynamic(() => import("@/components/ColorBends").then((m) => m.default), {
  ssr: false,
});

/** Kolory z globals.css (--color-primary, --color-accent-2); używane w ColorBends */
const HERO_BENDS_ACCENT_2 = "#00b8d9" as const;
const HERO_BENDS_PRIMARY = "#3b82f6" as const;

const HERO_NOISE_SVG = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)"/></svg>'
)}`;

const HERO_TEXTS: Record<
  HeroContentKey,
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
  "Home.hero": {
    title: "Strony internetowe, które zdobywają klientów.",
    subtitle:
      "Projektujemy szybkie strony i sklepy online w 1–2 tygodnie. Jasna wycena. Bez chaosu.",
    ctaPrimary: "Sprawdź koszt w 60 sekund",
    ctaSecondary: "Umów bezpłatną konsultację",
    ctaPrimaryHref: "#kalkulator",
    ctaSecondaryHref: "/kontakt",
    stats: "Realizacje w całej Polsce",
  },
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

export function Hero({ contentKey = "Home.hero" }: { contentKey?: HeroContentKey }) {
  const content = HERO_TEXTS[contentKey];
  const isHome = contentKey === "Home.hero";
  const glassBlurLg = useGlassBlurStyle("lg");
  const { variants: v } = useMotionSafe();
  const heroBendsColors = [HERO_BENDS_PRIMARY, HERO_BENDS_ACCENT_2];

  const primaryHref = isHome ? "#kalkulator" : content.ctaPrimaryHref;
  const secondaryHref = isHome ? "/kontakt" : content.ctaSecondaryHref;
  const showSecondary = isHome || !!content.ctaSecondary;
  const showStats = isHome ? true : !!content.stats;

  /* Non-home hero: ten sam wizualnie co strona główna (ColorBends, overlay, gradient), jedna kolumna wyśrodkowana, bez kart */
  if (!isHome) {
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
          className="relative z-10 grid grid-cols-1 items-center justify-items-center text-center min-h-[55vh] md:min-h-[60vh] pt-[calc(var(--navbar-height)+2rem)] pb-16 pointer-events-none"
        >
          <div className="flex flex-col items-center max-w-2xl space-y-6 pointer-events-auto">
            {showStats && content.stats && (
              <div
                className="hero-badge font-body inline-flex items-center gap-2 w-fit rounded-full py-1.5 px-3.5 text-[0.72rem] text-white/70 border border-white/20"
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
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <CtaLink href={primaryHref} className="w-full md:w-auto block">
                <button
                  type="button"
                  className="hero-cta-primary font-body inline-flex items-center justify-center gap-2 rounded-[10px] border-none cursor-pointer w-full md:w-auto"
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
                <CtaLink href={secondaryHref} className="w-full md:w-auto block">
                  <button
                    type="button"
                    className="hero-cta-ghost font-body rounded-[10px] cursor-pointer w-full md:w-auto inline-flex items-center justify-center"
                    style={{
                      background: "transparent",
                      color: "var(--color-text-secondary)",
                      fontWeight: 400,
                      fontSize: "0.88rem",
                      padding: "14px 20px",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    {content.ctaSecondary}
                  </button>
                </CtaLink>
              )}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  /* Home hero — full redesign */
  const title = content.title;
  const lastWord = "klientów.";
  const titleBefore = title.endsWith(lastWord)
    ? title.slice(0, title.length - lastWord.length).trim()
    : title;
  const titleHighlight = title.endsWith(lastWord) ? lastWord : null;

  return (
    <section
      id="hero"
      className="relative min-h-[82vh] md:min-h-screen overflow-hidden"
      style={{ background: "var(--color-hero-fade)" }}
    >
      {/* 1. ColorBends — tło z design systemu (śledzenie myszy), opacity tylko na tło */}
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
      {/* 2. Overlay — przyciemnienie tła (mocniejsze na stronie głównej) */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/55" aria-hidden />
      {/* 3. Noise overlay */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("${HERO_NOISE_SVG}")`,
          backgroundSize: "200px 200px",
        }}
        aria-hidden
      />
      {/* 4. Gradient na dole hero (z-[1] — poniżej treści z-10) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-72"
        style={{ background: `linear-gradient(to top, var(--color-hero-fade), transparent)` }}
        aria-hidden
      />

      {/* Zawartość w kontenerze z design systemu (pointer-events-none, żeby mysz trafiała w ColorBends) */}
      <Container
        variant="wide"
        className="relative z-10 flex flex-col justify-center min-h-[82vh] md:min-h-screen pt-[calc(var(--navbar-height)+2rem)] pb-16 md:pb-24 pointer-events-none"
      >
        {/* Left column — tekst; z-10 żeby karty były pod spodem */}
        <div className="relative z-10 flex flex-col justify-center max-w-[560px] w-full">
          <motion.div
            variants={v.staggerHero}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center max-w-[560px] w-full"
          >
            {/* Badge */}
            <motion.div
              variants={v.fadeIn}
              className="hero-badge font-body inline-flex items-center gap-2 w-fit mb-6 rounded-full py-1.5 px-3.5 text-[0.72rem] text-white/70 border border-white/20"
              style={{ background: "var(--color-hero-badge-bg)" }}
            >
              <span className="badge-dot w-[7px] h-[7px] rounded-full shrink-0" aria-hidden />
              {content.stats}
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={v.fadeUp}
              className="font-heading text-white font-extrabold leading-[1.08] tracking-tight max-w-[560px] text-[clamp(2rem,8vw,2.8rem)] md:text-[clamp(2.6rem,5.5vw,4rem)]"
              style={{ letterSpacing: "-0.03em" }}
            >
              {titleBefore.startsWith("Strony internetowe") ? (
                <>
                  <span className="whitespace-nowrap">Strony internetowe</span>
                  {titleBefore.slice(18)}
                </>
              ) : (
                titleBefore
              )}
              {titleHighlight && (
                <span
                  className="inline-block bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary) 25%, var(--color-accent-2) 75%, var(--color-accent-2) 100%)",
                    backgroundSize: "220% 100%",
                    backgroundPosition: "0% 50%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {" "}
                  {titleHighlight}
                </span>
              )}
            </motion.h1>

            {/* Subheadline — czyste fade */}
            <motion.p
              variants={v.fadeIn}
              className="font-body body-lead mt-5 mb-9 max-w-[420px] leading-[1.7] text-muted-foreground"
              style={{
                fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
                color: "var(--color-text-secondary)",
              }}
            >
              {content.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={v.fadeUp}
              className="flex flex-wrap items-center gap-3 w-full md:w-auto pointer-events-auto mt-8"
            >
              <CtaLink href={primaryHref} className="w-full md:w-auto block">
                <button
                  type="button"
                  className="hero-cta-primary font-body inline-flex items-center justify-center gap-2 rounded-[10px] border-none cursor-pointer w-full md:w-auto"
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
              <span className="w-full md:w-auto block">
                <CtaLink href={secondaryHref} className="w-full md:w-auto block">
                  <button
                    type="button"
                    className="hero-cta-ghost font-body rounded-[10px] cursor-pointer w-full md:w-auto inline-flex items-center justify-center"
                    style={{
                      background: "transparent",
                      color: "var(--color-text-secondary)",
                      fontWeight: 400,
                      fontSize: "0.88rem",
                      padding: "14px 20px",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    {content.ctaSecondary}
                  </button>
                </CtaLink>
              </span>
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={v.fadeUp}
              className="social-proof font-body flex flex-col md:flex-row items-center gap-3 md:gap-5 mt-6 md:mt-8 flex-nowrap justify-center md:justify-start overflow-visible"
            >
              <div className="sp-item shrink-0 flex flex-col items-center md:items-start text-center md:text-left">
                <strong className="block text-[0.8rem] md:text-[0.95rem] font-bold text-white font-heading">
                  47+
                </strong>
                <span className="body-small text-[0.6rem] md:text-[0.65rem] text-white/40 uppercase tracking-widest">
                  zrealizowanych projektów
                </span>
              </div>
              <div
                className="sp-divider w-8 md:w-px h-px md:h-8 bg-white/10 shrink-0"
                aria-hidden
              />
              <div className="sp-item shrink-0 flex flex-col items-center md:items-start text-center md:text-left">
                <strong className="block text-[0.8rem] md:text-[0.95rem] font-bold text-white font-heading">
                  1–2 tyg.
                </strong>
                <span className="body-small text-[0.6rem] md:text-[0.65rem] text-white/40 uppercase tracking-widest">
                  średni czas realizacji
                </span>
              </div>
              <div
                className="sp-divider w-8 md:w-px h-px md:h-8 bg-white/10 shrink-0"
                aria-hidden
              />
              <div className="sp-item shrink-0 flex flex-col items-center md:items-start text-center md:text-left">
                <strong className="block text-[0.8rem] md:text-[0.95rem] font-bold text-white font-heading">
                  5.0 ★
                </strong>
                <span className="body-small text-[0.6rem] md:text-[0.65rem] text-white/40 uppercase tracking-widest">
                  średnia ocena klientów
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Karty — absolute, right-8 = padding od prawej; z-0 żeby były pod lewą kolumną */}
        <div className="absolute right-8 top-1/2 hidden md:block pointer-events-none w-[520px] h-[560px] -translate-y-1/2 z-0">
          <motion.div
            className="relative h-full w-full"
            variants={v.stagger}
            initial="hidden"
            animate="visible"
          >
            {/* Card 1 — Gotowe w 8 dni */}
            <motion.div
              variants={v.fadeIn}
              className="hero-card absolute left-0 top-[60px] w-[320px] rounded-2xl p-0 overflow-hidden"
              style={glassBlurLg}
              aria-hidden
            >
              <div className="flex items-center gap-1.5 px-2.5 py-2 border-b border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-status-red)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-status-amber)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/40" />
              </div>
              <div className="relative h-[140px] bg-gradient-to-br from-white/10 to-white/5">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                  <span className="font-heading text-white font-bold text-[0.85rem]">
                    Gotowe w 8 dni
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="font-body text-[0.65rem] text-white/50 uppercase tracking-wider mb-2">
                  Realizacja
                </p>
                <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-white/40" style={{ width: "78%" }} />
                </div>
              </div>
            </motion.div>

            {/* Card 2 — Klient B2B */}
            <motion.div
              variants={v.fadeIn}
              className="hero-card absolute right-0 top-5 w-[230px] rounded-2xl p-4"
              style={glassBlurLg}
              aria-hidden
            >
              <p className="font-body text-[0.65rem] text-white/50">Strona firmowa</p>
              <p className="font-heading text-[0.9rem] font-bold text-white mt-0.5">Klient B2B</p>
              <p className="font-body text-white/60 text-[0.72rem] mt-1 flex items-center gap-1">
                <span aria-hidden>✓</span> Wdrożono
              </p>
              <div className="my-3 h-px bg-white/10" />
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/20 shrink-0" aria-hidden />
                <span className="font-body text-[0.65rem] text-white/60">Klient zadowolony</span>
                <span className="text-white/50 text-[0.65rem]">★★★★★</span>
              </div>
            </motion.div>

            {/* Card 3 — Ruch organiczny +340% */}
            <motion.div
              variants={v.fadeIn}
              className="hero-card absolute right-0 bottom-10 w-[280px] rounded-2xl p-4"
              style={glassBlurLg}
              aria-hidden
            >
              <div className="flex items-center gap-1.5 px-2 py-1.5 border-b border-white/10 mb-3">
                <span className="w-2 h-2 rounded-full bg-[var(--color-status-red)]" />
                <span className="w-2 h-2 rounded-full bg-[var(--color-status-amber)]" />
                <span className="w-2 h-2 rounded-full bg-white/40" />
              </div>
              <p className="font-body text-sm text-white/90 flex items-center gap-2 flex-wrap">
                Ruch organiczny
                <span
                  className="font-heading inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-white/80 text-xs font-semibold"
                  style={{ background: "var(--color-border)" }}
                >
                  +340% ↑
                </span>
              </p>
              <div className="mt-3 flex items-end justify-between gap-1 h-14">
                {[
                  { h: 28, o: 0.5 },
                  { h: 36, o: 0.6 },
                  { h: 44, o: 0.8 },
                  { h: 52, o: 0.9 },
                  { h: 56, o: 1 },
                ].map(({ h, o }, i) => (
                  <div
                    key={i}
                    className="flex-1 min-w-0 rounded-t bg-white/40"
                    style={{
                      height: h,
                      opacity: o,
                      transformOrigin: "bottom",
                    }}
                  />
                ))}
              </div>
              <div className="mt-1.5 flex justify-between text-[0.55rem] text-white/45">
                <span>Sty</span>
                <span>Lut</span>
                <span>Mar</span>
                <span>Kwi</span>
                <span>Maj</span>
              </div>
              <p className="font-body mt-2 text-[0.55rem] text-white/40 italic">
                Źródło: Google Search Console
              </p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
