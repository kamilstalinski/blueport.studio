"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Container } from "@/components/ui/Container";
import { useReducedMotionPref } from "@/lib/animations";

const ColorBends = dynamic(
  () => import("@/components/ColorBends").then((m) => m.default),
  { ssr: false },
);

const HERO_BENDS_COLORS = ["#00e5a0", "#00b8d9"];

const HERO_NOISE_SVG = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)"/></svg>'
)}`;

export type HeroContentKey =
  | "Home.hero"
  | "uslugi.hero"
  | "realizacje.hero"
  | "proces.hero"
  | "kalkulator.hero"
  | "kontakt.hero"
  | "oNas.hero";

const easeOutExpo = [0.16, 1, 0.3, 1];

export function Hero({ contentKey = "Home.hero" }: { contentKey?: HeroContentKey }) {
  const t = useTranslations(contentKey);
  const reduceMotion = useReducedMotionPref();
  const isHome = contentKey === "Home.hero";
  const primaryHref = isHome ? "#kalkulator" : t("ctaPrimaryHref");
  const secondaryHref = isHome ? "/kontakt" : t("ctaSecondaryHref");
  const showSecondary = isHome || !!t("ctaSecondary");
  const showStats = isHome ? true : !!t("stats");

  const CtaLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) =>
    href.startsWith("#") ? (
      <a href={href}>{children}</a>
    ) : (
      <Link href={href}>{children}</Link>
    );

  /* Non-home hero: ten sam wizualnie co strona główna (ColorBends, overlay, gradient), jedna kolumna wyśrodkowana, bez kart */
  if (!isHome) {
    return (
      <section
        id="hero"
        className="relative min-h-[55vh] md:min-h-[60vh] overflow-hidden"
        style={{ background: "transparent" }}
      >
        <div className="absolute inset-0 z-0 opacity-90" aria-hidden>
          <ColorBends
            rotation={95}
            speed={0.2}
            colors={HERO_BENDS_COLORS}
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
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-72"
          style={{ background: "linear-gradient(to top, #030B22, transparent)" }}
          aria-hidden
        />
        <Container className="relative z-10 grid grid-cols-1 items-center justify-items-center text-center min-h-[55vh] md:min-h-[60vh] pt-[calc(var(--navbar-height)+2rem)] pb-16 pointer-events-none">
          <div className="flex flex-col items-center max-w-2xl space-y-6 pointer-events-auto">
            {showStats && t("stats") && (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.05 }}
                className="hero-badge font-body inline-flex items-center gap-2 w-fit rounded-full py-1.5 px-3.5 text-[0.72rem] text-[#00e5a0] border border-[rgba(0,229,160,0.22)]"
                style={{ background: "rgba(0,229,160,0.08)" }}
              >
                <span
                  className="badge-dot w-[7px] h-[7px] rounded-full bg-[#00e5a0] shrink-0"
                  style={{ animation: reduceMotion ? "none" : "badgePulse 2s ease-in-out infinite" }}
                  aria-hidden
                />
                {t("stats")}
              </motion.div>
            )}
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 }}
              className="font-heading text-white font-extrabold leading-[1.08] tracking-tight text-[clamp(2rem,8vw,2.8rem)] md:text-[clamp(2.6rem,5.5vw,3.5rem)]"
              style={{ letterSpacing: "-0.03em" }}
            >
              {t("title")}
            </motion.h1>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.2 }}
              className="font-body body-lead max-w-xl mx-auto leading-[1.7]"
              style={{
                fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {t("subtitle")}
            </motion.p>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.35 }}
              className="flex flex-wrap items-center justify-center gap-3 pt-2 sm:gap-4 sm:pt-4"
            >
              <CtaLink href={primaryHref}>
                <button
                  type="button"
                  className="font-body rounded-[10px] px-[26px] py-3.5 text-[0.88rem] font-semibold text-black border-none cursor-pointer transition-all duration-200 hover:bg-[#00f0aa] hover:-translate-y-px hover:shadow-[0_8px_30px_rgba(0,229,160,0.30)] active:translate-y-0 w-full sm:w-auto"
                  style={{ background: "#00e5a0" }}
                >
                  {t("ctaPrimary")}
                </button>
              </CtaLink>
              {showSecondary && (
                <CtaLink href={secondaryHref}>
                  <button
                    type="button"
                    className="font-body rounded-[10px] px-[26px] py-3.5 text-[0.88rem] font-medium bg-transparent border border-white/15 cursor-pointer transition-all duration-200 hover:border-[rgba(0,229,160,0.4)] hover:text-[#00e5a0] hover:bg-[rgba(0,229,160,0.05)] w-full sm:w-auto"
                    style={{ color: "rgba(255,255,255,0.75)" }}
                  >
                    {t("ctaSecondary")}
                  </button>
                </CtaLink>
              )}
            </motion.div>
          </div>
        </Container>
      </section>
    );
  }

  /* Home hero — full redesign */
  const title = t("title") as string;
  const lastWord = "klientów.";
  const titleBefore = title.endsWith(lastWord)
    ? title.slice(0, title.length - lastWord.length).trim()
    : title;
  const titleHighlight = title.endsWith(lastWord) ? lastWord : null;

  return (
    <section
      id="hero"
      className="relative min-h-[82vh] md:min-h-screen overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* 1. ColorBends — tło z design systemu (śledzenie myszy), opacity tylko na tło */}
      <div className="absolute inset-0 z-0 opacity-90" aria-hidden>
        <ColorBends
          rotation={95}
          speed={0.2}
          colors={HERO_BENDS_COLORS}
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
      {/* 4. Gradient na dole hero (jak u góry sekcji „Twoja strona nie sprzedaje?”) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-72"
        style={{ background: "linear-gradient(to top, #030B22, transparent)" }}
        aria-hidden
      />

      {/* Zawartość w kontenerze z design systemu (pointer-events-none, żeby mysz trafiała w ColorBends) */}
      <Container className="relative z-10 flex flex-col justify-center min-h-[82vh] md:min-h-screen pt-[calc(var(--navbar-height)+2rem)] pb-16 md:pb-24 pointer-events-none">
        {/* Left column — tekst; z-10 żeby karty były pod spodem */}
        <div className="relative z-10 flex flex-col justify-center max-w-[560px] w-full">
        {/* Badge */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.05 }}
          className="hero-badge font-body inline-flex items-center gap-2 w-fit mb-6 rounded-full py-1.5 px-3.5 text-[0.72rem] text-[#00e5a0] border border-[rgba(0,229,160,0.22)]"
          style={{ background: "rgba(0,229,160,0.08)" }}
        >
          <span
            className="badge-dot w-[7px] h-[7px] rounded-full bg-[#00e5a0] shrink-0"
            style={{ animation: reduceMotion ? "none" : "badgePulse 2s ease-in-out infinite" }}
            aria-hidden
          />
          {t("stats")}
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.1 }}
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
                backgroundImage: "linear-gradient(90deg, #00e5a0, #00b8d9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {" "}
              {titleHighlight}
            </span>
          )}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.35 }}
          className="font-body body-lead mt-5 mb-9 max-w-[420px] leading-[1.7] text-muted-foreground"
          style={{
            fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          {t("subtitle")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.5 }}
          className="flex flex-col md:flex-row flex-wrap gap-3 w-full md:w-auto pointer-events-auto"
        >
          <CtaLink href={primaryHref}>
            <button
              type="button"
              className="font-body rounded-[10px] px-[26px] py-3.5 text-[0.88rem] font-semibold text-black border-none cursor-pointer transition-all duration-200 hover:bg-[#00f0aa] hover:-translate-y-px hover:shadow-[0_8px_30px_rgba(0,229,160,0.30)] active:translate-y-0 w-full md:w-auto"
              style={{ background: "#00e5a0" }}
            >
              {t("ctaPrimary")}
            </button>
          </CtaLink>
          <span className="w-full md:w-auto block">
            <CtaLink href={secondaryHref}>
            <button
              type="button"
              className="font-body rounded-[10px] px-[26px] py-3.5 text-[0.88rem] font-medium bg-transparent border border-white/15 cursor-pointer transition-all duration-200 hover:border-[rgba(0,229,160,0.4)] hover:text-[#00e5a0] hover:bg-[rgba(0,229,160,0.05)] w-full md:w-auto"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              {t("ctaSecondary")}
            </button>
          </CtaLink>
          </span>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.65 }}
          className="social-proof font-body flex flex-col md:flex-row items-center gap-3 md:gap-5 mt-6 md:mt-8 flex-nowrap justify-center md:justify-start overflow-visible"
        >
          <div className="sp-item shrink-0 flex flex-col items-center md:items-start text-center md:text-left">
            <strong className="block text-[0.8rem] md:text-[0.95rem] font-bold text-white font-heading">47+</strong>
            <span className="body-small text-[0.6rem] md:text-[0.65rem] text-white/40 uppercase tracking-widest">zrealizowanych projektów</span>
          </div>
          <div className="sp-divider w-8 md:w-px h-px md:h-8 bg-white/10 shrink-0" aria-hidden />
          <div className="sp-item shrink-0 flex flex-col items-center md:items-start text-center md:text-left">
            <strong className="block text-[0.8rem] md:text-[0.95rem] font-bold text-white font-heading">1–2 tyg.</strong>
            <span className="body-small text-[0.6rem] md:text-[0.65rem] text-white/40 uppercase tracking-widest">średni czas realizacji</span>
          </div>
          <div className="sp-divider w-8 md:w-px h-px md:h-8 bg-white/10 shrink-0" aria-hidden />
          <div className="sp-item shrink-0 flex flex-col items-center md:items-start text-center md:text-left">
            <strong className="block text-[0.8rem] md:text-[0.95rem] font-bold text-white font-heading">5.0 ★</strong>
            <span className="body-small text-[0.6rem] md:text-[0.65rem] text-white/40 uppercase tracking-widest">średnia ocena klientów</span>
          </div>
        </motion.div>
        </div>

        {/* Karty — absolute, right-8 = padding od prawej; z-0 żeby były pod lewą kolumną */}
        <div className="absolute right-8 top-1/2 hidden md:block pointer-events-none w-[520px] h-[560px] -translate-y-1/2 z-0">
        <div className="relative h-full w-full">
          {/* Card 1 — Gotowe w 8 dni */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.6 }}
            className="absolute left-0 top-[60px] w-[320px] rounded-2xl p-0 overflow-hidden border border-white/[0.09] shadow-[0_12px_32px_rgba(0,0,0,0.25)]"
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(16px) saturate(180%)",
              WebkitBackdropFilter: "blur(16px) saturate(180%)",
              animation: reduceMotion ? "none" : "floatA 5s ease-in-out infinite",
            }}
            aria-hidden
          >
            <div className="flex items-center gap-1.5 px-2.5 py-2 border-b border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5c5c]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#f5a623]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#00e5a0]" />
            </div>
            <div className="relative h-[140px] bg-gradient-to-br from-white/10 to-white/5">
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3"
              >
                <span className="font-heading text-white font-bold text-[0.85rem]">Gotowe w 8 dni</span>
              </div>
            </div>
            <div className="p-4">
              <p className="font-body text-[0.65rem] text-white/50 uppercase tracking-wider mb-2">Realizacja</p>
              <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full bg-[#00e5a0]" style={{ width: "78%" }} />
              </div>
            </div>
          </motion.div>

          {/* Card 2 — Klient B2B */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.8 }}
            className="absolute right-0 top-5 w-[230px] rounded-2xl p-4 border border-white/[0.09] shadow-[0_12px_32px_rgba(0,0,0,0.25)]"
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(16px) saturate(180%)",
              WebkitBackdropFilter: "blur(16px) saturate(180%)",
              animation: reduceMotion ? "none" : "floatB 6s ease-in-out 1s infinite",
            }}
            aria-hidden
          >
            <p className="font-body text-[0.65rem] text-white/50">Strona firmowa</p>
            <p className="font-heading text-[0.9rem] font-bold text-white mt-0.5">Klient B2B</p>
            <p className="font-body text-[#00e5a0] text-[0.72rem] mt-1 flex items-center gap-1">
              <span aria-hidden>✓</span> Wdrożono
            </p>
            <div className="my-3 h-px bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/20 shrink-0" aria-hidden />
              <span className="font-body text-[0.65rem] text-white/60">Klient zadowolony</span>
              <span className="text-[#00e5a0] text-[0.65rem]">★★★★★</span>
            </div>
          </motion.div>

          {/* Card 3 — Ruch organiczny +340% */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOutExpo, delay: 1 }}
            className="absolute right-0 bottom-10 w-[280px] rounded-2xl p-4 border border-white/[0.09] shadow-[0_12px_32px_rgba(0,0,0,0.25)]"
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(16px) saturate(180%)",
              WebkitBackdropFilter: "blur(16px) saturate(180%)",
              animation: reduceMotion ? "none" : "floatC 7s ease-in-out 2s infinite",
            }}
            aria-hidden
          >
            <div className="flex items-center gap-1.5 px-2 py-1.5 border-b border-white/10 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#ff5c5c]" />
              <span className="w-2 h-2 rounded-full bg-[#f5a623]" />
              <span className="w-2 h-2 rounded-full bg-[#00e5a0]" />
            </div>
            <p className="font-body text-sm text-white/90 flex items-center gap-2 flex-wrap">
              Ruch organiczny
              <span
                className="font-heading inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[#00e5a0] text-xs font-semibold"
                style={{ background: "rgba(0,229,160,0.15)" }}
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
                  className="flex-1 min-w-0 rounded-t bg-[#00e5a0]"
                  style={{
                    height: h,
                    opacity: o,
                    animation: reduceMotion ? "none" : "hero-bars 0.6s ease-out forwards",
                    animationDelay: `${0.2 + i * 0.08}s`,
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
            <p className="font-body mt-2 text-[0.55rem] text-white/40 italic">Źródło: Google Search Console</p>
          </motion.div>
        </div>
        </div>
      </Container>
    </section>
  );
}
