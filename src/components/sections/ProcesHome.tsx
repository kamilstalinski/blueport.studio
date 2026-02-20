"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { IconBox } from "@/components/ui/IconBox";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";
import { useGlassBlurStyle } from "@/lib/useGlassBlurStyle";
import type { ProcesHomeProps } from "@/types";

const STEP_ICONS_5 = ["📋", "💬", "🛠", "✅", "🚀"] as const;
const STEP_ICONS_4 = ["📋", "💬", "🛠", "🚀"] as const;

const TEXTS = {
  "Home.proces": {
    badge: "Proces",
    title: "Proces",
    subtitle: "Krok po kroku z nami",
    timeline: "Całość zwykle trwa 1–2 tygodnie.",
    stepTitles: { "1": "Wypełniasz formularz", "2": "Ustalamy szczegóły", "3": "Tworzymy stronę", "4": "Wysyłamy do akceptacji", "5": "Publikujemy i szkolimy" } as Record<string, string>,
    steps: { "1": "Krótko opisujesz, czego potrzebujesz.", "2": "Doprecyzowujemy zakres i cenę.", "3": "Projektujemy i budujemy wszystko od A do Z.", "4": "Masz wgląd i możliwość poprawek.", "5": "Strona trafia online. Pokazujemy, jak nią zarządzać." } as Record<string, string>,
    outro: "Prosto i konkretnie.",
    cta: "Szczegóły procesu",
  },
  "oNas.proces": {
    badge: "Proces",
    title: "Jak wygląda współpraca?",
    subtitle: "",
    timeline: "Całość zwykle trwa 1–2 tygodnie.",
    stepTitles: { "1": "Kalkulator", "2": "Doprecyzowanie", "3": "Realizacja", "4": "Wdrożenie" } as Record<string, string>,
    steps: { "1": "Wypełniasz kalkulator i określasz zakres.", "2": "Kontaktujemy się i ustalamy szczegóły.", "3": "Projekt i development strony.", "4": "Publikacja i wsparcie." } as Record<string, string>,
    outro: "",
    cta: "Zobacz pełny proces",
  },
} as const;

export function ProcesHome({ contentKey = "Home.proces", stepCount = 5, cardVariant = "default" }: ProcesHomeProps) {
  const glassBlurSm = useGlassBlurStyle("sm");
  const content = TEXTS[contentKey];

  const totalSteps = stepCount;
  const stepLabels = Array.from({ length: totalSteps }, (_, i) => String(i + 1)) as ("1" | "2" | "3" | "4" | "5")[];
  const icons = stepCount === 4 ? STEP_ICONS_4 : STEP_ICONS_5;
  const use2x2Grid = stepCount === 4 && cardVariant === "subpage";

  const row1Steps = stepLabels.slice(0, 3);
  const row2Steps = stepLabels.slice(3);

  return (
    <section id="proces" className="section-process relative section-padding-block">
      <ScrollReveal variant="fadeUp" className="container-narrow section-intro text-center">
        <p className="section-eyebrow">
          {content.badge}
        </p>
        <h2 className="heading-2 text-foreground mt-0">
          {content.title}
          {content.subtitle ? (
            <span className="text-white/50"> {content.subtitle}</span>
          ) : null}
        </h2>
        {content.timeline && (
          <p className="section-sub">
            {content.timeline}
          </p>
        )}
      </ScrollReveal>

      <div className="container relative z-10">
        <div className={cn("process-grid", use2x2Grid && "process-grid-2x2")}>
          {use2x2Grid ? (
            stepLabels.map((label, index) => (
              <div key={label} className={cn("process-step", "card-subpage", "process-step-2x2")} style={glassBlurSm}>
                <div className="step-number step-number-2x2">{index + 1}</div>
                <div className="step-content">
                  <IconBox emoji={icons[index]} className="mb-4" />
                  <h3>{content.stepTitles[label]}</h3>
                  <p>{content.steps[label]}</p>
                </div>
              </div>
            ))
          ) : (
            <>
              {row1Steps.map((label, index) => (
                <div key={label} className={cn("process-step", cardVariant === "subpage" && "card-subpage")} style={glassBlurSm}>
                  <div className="step-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="step-content">
                    <IconBox emoji={icons[index]} className="mb-4" />
                    <h3>{content.stepTitles[label]}</h3>
                    <p>{content.steps[label]}</p>
                  </div>
                </div>
              ))}

              {row2Steps.length > 0 && (
                <div className="process-step-row-2">
                  {row2Steps.map((label, index) => (
                    <div key={label} className={cn("process-step", cardVariant === "subpage" && "card-subpage")} style={glassBlurSm}>
                      <div className="step-number">
                        {String(3 + index + 1).padStart(2, "0")}
                      </div>
                      <div className="step-content">
                        <IconBox emoji={icons[3 + index]} className="mb-4" />
                        <h3>{content.stepTitles[label]}</h3>
                        <p>{content.steps[label]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <div className="process-cta">
          {content.outro && (
            <p className="body-lead font-medium text-foreground/70 leading-relaxed mb-4">
              {content.outro}
            </p>
          )}
          <Link href="/proces">
            <Button variant="secondary" className="min-h-[3rem] px-8 py-3 body-standard font-medium">
              {content.cta} →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
