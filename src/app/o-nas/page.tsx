import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import SpotlightCard from "@/components/SpotlightCard";
import { ProcesHome } from "@/components/sections/ProcesHome";
import { CTA } from "@/components/sections/CTA";

const PODEJSCIE = [
  { title: "Konkret zamiast chaosu", text: "Nie sprzedajemy marketingowych haseł. Projektujemy strony, które mają jasno określony cel." },
  { title: "Jasna wycena", text: "Znasz koszt przed startem. Bez ukrytych opłat i niespodzianek." },
  { title: "Małe studio = pełna odpowiedzialność", text: "Masz bezpośredni kontakt i realną osobę odpowiedzialną za projekt." },
];

const TECHS = ["WordPress", "WooCommerce", "Next.js"];

const DLA_KOGO_YES = ["Mikro i małe firmy", "Firmy usługowe", "Lokalne biznesy", "Sklepy wchodzące online"];
const DLA_KOGO_NO = ["Duże korporacje", "Projekty enterprise", "Agencje szukające podwykonawcy do masowej produkcji"];

export default function ONasPage() {
  return (
    <>
      <Hero contentKey="oNas.hero" />

      <Section id="dlaczego-blueport" topGradient>
        <div className="grid gap-8 md:grid-cols-2 md:gap-20 md:items-start">
          <h2 className="heading-2 text-white">Po co powstał Blueport?</h2>
          <div className="space-y-6 text-white/80 leading-[1.75] max-w-none">
            <p>Większość małych firm ma stronę, która nie działa. Jest przestarzała, wolna albo po prostu nie sprzedaje.</p>
            <p>Blueport powstał po to, żeby to zmienić.</p>
            <p>Tworzymy strony, które są proste, szybkie i nastawione na efekt biznesowy — nie na efekt wizualny dla samego efektu.</p>
          </div>
        </div>
      </Section>

      <Section id="jak-pracujemy">
        <h2 className="heading-2 text-white text-center">Jak pracujemy?</h2>
        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
          {PODEJSCIE.map((item, i) => (
            <SpotlightCard
              key={i}
              className="custom-spotlight-card rounded-2xl h-full"
            >
              <div className="glass-card card-subpage rounded-2xl p-8 h-full flex flex-col">
                <h3 className="heading-3 text-white">{item.title}</h3>
                <p className="mt-3 text-white/70 leading-relaxed flex-1">
                  {item.text}
                </p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </Section>

      <ProcesHome contentKey="oNas.proces" stepCount={4} cardVariant="subpage" />

      <Section id="technologie">
        <h2 className="heading-2 text-white text-center">Technologia dopasowana do celu</h2>
        <p className="mt-6 mx-auto max-w-2xl text-center text-white/80 leading-relaxed">
          Nie przywiązujemy się do jednej technologii. Dobieramy rozwiązanie do potrzeb biznesowych — od WordPressa, przez WooCommerce, po dedykowane projekty w Next.js.
        </p>
        <div className="tech-tags mt-6 flex flex-wrap justify-center gap-3">
          {TECHS.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
      </Section>

      <Section id="dla-kogo">
        <div className="dla-kogo-grid mx-auto grid max-w-[960px] gap-8 md:grid-cols-2">
          <div className="dla-kogo-card-yes rounded-2xl border border-[var(--color-accent-border)] bg-primary-subtle p-8">
            <h3 className="mb-4 text-[0.95rem] font-bold text-primary">Dla kogo jesteśmy</h3>
            <ul className="dla-kogo-list-yes mt-6 space-y-3">
              {DLA_KOGO_YES.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-white/80">
                  <span className="dla-kogo-arrow-yes shrink-0" aria-hidden>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="dla-kogo-card-no rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8">
            <h3 className="mb-4 text-[0.95rem] font-bold text-white/60">Dla kogo nie jesteśmy</h3>
            <ul className="dla-kogo-list-no mt-6 space-y-3">
              {DLA_KOGO_NO.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-white/80">
                  <span className="dla-kogo-arrow-no shrink-0" aria-hidden>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="lokalnosc" className="text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="heading-2 text-white">Pracujemy lokalnie i zdalnie</h2>
          <p className="mt-6 text-white/80 leading-relaxed">
            Jesteśmy ze Szczecina, ale realizujemy projekty w całej Polsce. Spotkanie? Online lub na żywo.
          </p>
          <div className="location-tags mt-4 flex flex-wrap justify-center gap-4 text-[0.75rem] text-white/40">
            <span>📍 Szczecin</span>
            <span>🌐 Cała Polska</span>
          </div>
        </div>
      </Section>

      <CTA contentKey="oNas.cta" />
    </>
  );
}
