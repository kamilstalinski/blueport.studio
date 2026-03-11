"use client";

import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import type { CTAProps } from "@/types";

const linkButtonBase =
  "font-body inline-flex items-center justify-center rounded-[14px] min-h-12 px-6 py-3 font-medium transition-all duration-200 ease-out border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg w-full md:w-auto";
const linkButtonPrimary =
  "bg-primary text-primary-foreground font-bold shadow-[0_0_20px_var(--color-primary-glow)] hover:bg-primary-hover hover:shadow-[0_0_24px_var(--color-primary-glow-hover)] focus-visible:ring-primary";
const linkButtonSecondary =
  "border-white/20 bg-transparent text-foreground font-semibold backdrop-blur-sm hover:bg-white/15 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] focus-visible:ring-white/30";

export function CTA({ contentKey: _contentKey = "Home.cta" }: CTAProps) {
  const title = "Gotowy na nową stronę?";
  const subtitle = "Umów bezpłatną konsultację i sprawdź, jak możemy pomóc Twojej firmie.";

  return (
    <Section id="cta" className="text-center" noWrapper>
      <div className="container-narrow">
        <div>
          <h2 className="heading-2 text-white mb-10">
            {title}
          </h2>
          <p className="body-lead mx-auto max-w-prose text-white/70">
            {subtitle}
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xl mx-auto">
            <Link
              href="/kontakt"
              className={cn(linkButtonBase, linkButtonPrimary, "w-full sm:w-auto")}
            >
              Umów konsultację
            </Link>
            <Link
              href="/kalkulator"
              className={cn(linkButtonBase, linkButtonSecondary, "w-full sm:w-auto")}
            >
              Sprawdź wycenę
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
