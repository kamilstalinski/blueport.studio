"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { SubpageHeroProps } from "@/types";

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
  return (
    <section
      className={cn(
        "relative text-center",
        firstOnPage ? "pt-navbar-hero section-padding-bottom" : "section-padding"
      )}
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

      <Container variant="wide" noPadding={!firstOnPage} className="relative z-10">
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
