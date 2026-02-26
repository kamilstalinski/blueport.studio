"use client";

import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import type { CTAProps } from "@/types";

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
            <Link href="/kontakt" className="w-full sm:w-auto order-1 sm:order-1">
              <span className="inline-block w-full sm:w-auto">
                <Button
                  variant="primary"
                  className="!rounded-[10px] !px-7 !py-3.5 font-bold !min-h-0 w-full"
                  style={{ background: "var(--color-primary)", color: "var(--color-on-primary)" }}
                >
                  Umów konsultację
                </Button>
              </span>
            </Link>
            <Link href="/kalkulator" className="w-full sm:w-auto order-2 sm:order-2">
              <span className="inline-block w-full sm:w-auto">
                <Button
                  variant="secondary"
                  className="!rounded-[10px] !px-7 !py-3.5 font-semibold !min-h-0 w-full border-white/30 hover:bg-white/20"
                >
                  Sprawdź wycenę
                </Button>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
