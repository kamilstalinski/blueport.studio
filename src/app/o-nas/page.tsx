import { getTranslations } from "@/lib/messages";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import SpotlightCard from "@/components/SpotlightCard";
import { ProcesHome } from "@/components/sections/ProcesHome";
import { CTA } from "@/components/sections/CTA";

function asStringArray(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw;
  if (raw && typeof raw === "object") return Object.values(raw) as string[];
  return [];
}

export default function ONasPage() {
  const tDlaczego = getTranslations("oNas.dlaczego");
  const tPodejscie = getTranslations("oNas.podejscie");
  const tTech = getTranslations("oNas.technologie");
  const tDlaKogo = getTranslations("oNas.dlaKogo");
  const tLokalnosc = getTranslations("oNas.lokalnosc");

  return (
    <>
      <Hero contentKey="oNas.hero" />

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

      <Section id="jak-pracujemy">
        <h2 className="heading-2 text-white text-center">{tPodejscie("title")}</h2>
        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
          {([1, 2, 3] as const).map((i) => (
            <SpotlightCard
              key={i}
              className="custom-spotlight-card rounded-2xl overflow-hidden h-full"
              spotlightColor="rgba(0, 229, 160, 0.2)"
            >
              <div className="glass-card rounded-2xl p-8 h-full flex flex-col">
                <h3 className="heading-3 text-white">{tPodejscie(`${i}.title`)}</h3>
                <p className="mt-3 text-white/70 leading-relaxed flex-1">
                  {tPodejscie(`${i}.text`)}
                </p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </Section>

      <ProcesHome contentKey="oNas.proces" stepCount={4} />

      <Section id="technologie">
        <h2 className="heading-2 text-white text-center">{tTech("title")}</h2>
        <p className="mt-6 mx-auto max-w-2xl text-center text-white/80 leading-relaxed">
          {tTech("text")}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-8 opacity-60">
          {asStringArray(tTech.raw("techs")).map((tech) => (
            <span key={String(tech)} className="text-lg font-medium text-white/80">
              {String(tech)}
            </span>
          ))}
        </div>
      </Section>

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
                    {String(item)}
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
                    {String(item)}
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>
        </div>
      </Section>

      <Section id="lokalnosc" className="text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="heading-2 text-white">{tLokalnosc("title")}</h2>
          <p className="mt-6 text-white/80 leading-relaxed">
            {tLokalnosc("text")}
          </p>
        </div>
      </Section>

      <CTA contentKey="oNas.cta" />
    </>
  );
}
