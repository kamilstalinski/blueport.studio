import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import SpotlightCard from "@/components/SpotlightCard";
import { ProcesHome } from "@/components/sections/ProcesHome";
import { CTA } from "@/components/sections/CTA";

type Props = { params: Promise<{ locale: string }> };

function asStringArray(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw;
  if (raw && typeof raw === "object") return Object.values(raw) as string[];
  return [];
}

export default async function ONasPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tDlaczego = await getTranslations("oNas.dlaczego");
  const tPodejscie = await getTranslations("oNas.podejscie");
  const tTech = await getTranslations("oNas.technologie");
  const tDlaKogo = await getTranslations("oNas.dlaKogo");
  const tLokalnosc = await getTranslations("oNas.lokalnosc");

  return (
    <>
      <Hero contentKey="oNas.hero" />

      {/* Section 2 — Dlaczego powstał Blueport */}
      <Section id="dlaczego-blueport" topGradient>
        <div className="grid gap-10 md:grid-cols-2 md:gap-12 md:items-start">
          <h2 className="heading-2 text-white">{tDlaczego("title")}</h2>
          <div className="space-y-6 text-white/80 leading-relaxed">
            <p>{tDlaczego("p1")}</p>
            <p>{tDlaczego("p2")}</p>
            <p>{tDlaczego("p3")}</p>
          </div>
        </div>
      </Section>

      {/* Section 3 — Nasze podejście (3 filary) */}
      <Section id="jak-pracujemy">
        <h2 className="heading-2 text-white text-center">{tPodejscie("title")}</h2>
        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
          {([1, 2, 3] as const).map((i) => (
            <SpotlightCard
              key={i}
              className="custom-spotlight-card rounded-2xl overflow-hidden h-full"
              spotlightColor="rgba(0, 229, 160, 0.2)"
            >
              <div className={`glass-card rounded-2xl p-8 h-full flex flex-col`}>
                <h3 className="heading-3 text-white">{tPodejscie(`${i}.title`)}</h3>
                <p className="mt-3 text-white/70 leading-relaxed flex-1">
                  {tPodejscie(`${i}.text`)}
                </p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </Section>

      {/* Section 4 — Jak wygląda współpraca (ProcesHome 4 kroki) */}
      <ProcesHome contentKey="oNas.proces" stepCount={4} />

      {/* Section 5 — Technologie */}
      <Section id="technologie">
        <h2 className="heading-2 text-white text-center">{tTech("title")}</h2>
        <p className="mt-6 mx-auto max-w-2xl text-center text-white/80 leading-relaxed">
          {tTech("text")}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-8 opacity-60">
          {asStringArray(tTech.raw("techs")).map((tech) => (
            <span key={tech} className="text-lg font-medium text-white/80">
              {tech}
            </span>
          ))}
        </div>
      </Section>

      {/* Section 6 — Dla kogo jesteśmy */}
      <Section id="dla-kogo">
        <div className="grid gap-8 md:grid-cols-2">
          <SpotlightCard
            className="custom-spotlight-card rounded-2xl overflow-hidden h-full"
            spotlightColor="rgba(0, 229, 160, 0.2)"
          >
            <div className="glass-card rounded-2xl p-8 h-full">
              <h3 className="heading-3 text-white">{tDlaKogo("titleYes")}</h3>
              <ul className="mt-6 space-y-3">
                {asStringArray(tDlaKogo.raw("bulletsYes")).map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-white/80">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>
          <SpotlightCard
            className="custom-spotlight-card rounded-2xl overflow-hidden h-full"
            spotlightColor="rgba(0, 229, 160, 0.2)"
          >
            <div className="glass-card rounded-2xl p-8 h-full">
              <h3 className="heading-3 text-white">{tDlaKogo("titleNo")}</h3>
              <ul className="mt-6 space-y-3">
                {asStringArray(tDlaKogo.raw("bulletsNo")).map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-white/80">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/60" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>
        </div>
      </Section>

      {/* Section 7 — Lokalność */}
      <Section id="lokalnosc" className="text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="heading-2 text-white">{tLokalnosc("title")}</h2>
          <p className="mt-6 text-white/80 leading-relaxed">
            {tLokalnosc("text")}
          </p>
        </div>
      </Section>

      {/* Section 8 — Final CTA */}
      <CTA contentKey="oNas.cta" />
    </>
  );
}
