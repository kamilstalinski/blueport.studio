"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";

export function ProcesIntro() {
  const t = useTranslations("proces");
  return (
    <Section id="proces-intro" topGradient className="text-center pb-8 md:pb-10">
      <p className="body-lead mx-auto max-w-2xl text-foreground/85">
        {t("intro")}
      </p>
    </Section>
  );
}
