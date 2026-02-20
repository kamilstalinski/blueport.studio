"use client";

import { IconBox } from "@/components/ui/IconBox";
import { Section } from "@/components/ui/Section";
import { SpotlightCard } from "@/components/SpotlightCard";
import { useGlassBlurStyle } from "@/lib/useGlassBlurStyle";

const CARDS = [
  { emoji: "📋" as const, text: "50+ zrealizowanych projektów" },
  { emoji: "⏱️" as const, text: "Realizacja w 1–2 tygodnie" },
  { emoji: "📄" as const, text: "Jasna wycena przed startem" },
  { emoji: "📍" as const, text: "Lokalnie Szczecin / Cała Polska" },
] as const;

export function WhyBluePort() {
  const glassBlurStyle = useGlassBlurStyle();

  return (
    <Section id="dlaczego-blueport">
      <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
        Dlaczego BluePort?
      </h2>
      <p className="body-lead text-white/70 leading-relaxed max-w-2xl mb-12">
        Nie jesteśmy agencją z 10 handlowcami. Jesteśmy partnerem technologicznym dla małych firm.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "var(--grid-gap)" }}>
        {CARDS.map(({ emoji, text }) => (
          <SpotlightCard
            key={text}
            className="custom-spotlight-card rounded-2xl h-full"
          >
            <div className="card rounded-2xl p-8 h-full" style={glassBlurStyle}>
              <div className="h-full">
                <IconBox emoji={emoji} />
                <p className="mt-4 font-medium text-white">
                  {text}
                </p>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </Section>
  );
}
