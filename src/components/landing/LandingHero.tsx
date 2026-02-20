"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IconBox } from "@/components/ui/IconBox";

const TRUST_BULLETS = [
  { emoji: "⚡" as const, label: "Szybka realizacja" },
  { emoji: "💳" as const, label: "Jasna wycena" },
  { emoji: "🔒" as const, label: "Wsparcie po wdrożeniu" },
] as const;

export function LandingHero() {
  return (
    <section className="bg-transparent section-padding">
      <Container noPadding>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              Nowoczesne strony internetowe dla małych firm.
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Szybka realizacja. Jasna wycena. Bez ukrytych kosztów.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/kalkulator">
                <Button>Sprawdź koszt w 60 sekund</Button>
              </Link>
              <Link href="/kontakt">
                <Button variant="secondary">Umów darmową konsultację</Button>
              </Link>
            </div>
          </div>
          <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-surface-alt" />
        </div>
        <ul className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 border-t border-border pt-12">
          {TRUST_BULLETS.map(({ emoji, label }) => (
            <li key={label} className="flex items-center gap-3">
              <IconBox emoji={emoji} />
              <span className="text-muted-foreground">{label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
