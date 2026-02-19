"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export type SubpageHeroProps = {
  /** Optional small eyebrow text above the headline */
  eyebrow?: string;
  /** Main headline (H1) */
  title: string;
  /** Short supporting paragraph below headline */
  subtitle: string;
  /** Primary CTA label (default: Sprawdź wycenę) */
  primaryCtaLabel?: string;
  /** Primary CTA href (default: /kalkulator) */
  primaryCtaHref?: string;
  /** Secondary CTA label (default: Umów konsultację) */
  secondaryCtaLabel?: string;
  /** Secondary CTA href (default: /kontakt) */
  secondaryCtaHref?: string;
  /** First section on page – adds navbar padding */
  firstOnPage?: boolean;
};

export function SubpageHero({
  eyebrow,
  title,
  subtitle,
  primaryCtaLabel = "Sprawdź wycenę",
  primaryCtaHref = "/kalkulator",
  secondaryCtaLabel = "Umów konsultację",
  secondaryCtaHref = "/kontakt",
  firstOnPage = true,
}: SubpageHeroProps) {
  const sectionPadding = firstOnPage ? "pt-navbar-first pb-28" : "py-28";

  return (
    <section
      className={`relative ${sectionPadding} text-center`}
      aria-labelledby="subpage-hero-title"
    >
      {/* Subtle glass accent behind content */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        aria-hidden
      >
        <div
          className="h-[480px] w-full max-w-2xl rounded-3xl bg-white/15 backdrop-blur-xl border border-white/20"
          style={{ marginTop: "-2rem" }}
        />
      </div>

      <Container className="relative z-10">
        {eyebrow && (
          <p className="mb-3 body-small font-semibold uppercase tracking-wider text-white/50">
            {eyebrow}
          </p>
        )}
        <h1
          id="subpage-hero-title"
          className="heading-1 text-white"
        >
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl body-lead text-white/60 leading-relaxed">
          {subtitle}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href={primaryCtaHref}>
            <Button variant="primary">{primaryCtaLabel}</Button>
          </Link>
          <Link href={secondaryCtaHref}>
            <Button variant="secondary">{secondaryCtaLabel}</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
