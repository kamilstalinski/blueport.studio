import type { Metadata } from "next";
import Link from "next/link";

import { PageHead } from "@/components/pages/PageHead";
import { CtaBand } from "@/components/sections/home/CtaBand";
import { Arrow } from "@/components/ui/Arrow";
import { InView } from "@/components/ui/InView";
import { Check, Dash } from "@/components/ui/Marks";
import { ABOUT_APPROACH, ABOUT_FOR, ABOUT_NOT_FOR, ABOUT_STORY, ABOUT_TECHS } from "@/constants/about";

export const metadata: Metadata = {
  title: "O nas — Kim jesteśmy",
  description: "Blueport Studio to studio webowe ze Szczecina. Poznaj nas, nasze wartości i sposób pracy.",
  alternates: { canonical: "https://blueport.studio/o-nas" },
  openGraph: { url: "https://blueport.studio/o-nas" },
};

const STAGGER_MARGIN = "0px 0px -25% 0px";

export default function ONasPage() {
  return (
    <>
      <PageHead
        title="Tworzymy strony, które sprzedają. Bez chaosu."
        lede="Blueport to małe studio z konkretnym podejściem. Jasna wycena. Jasny proces. Realne efekty."
      />

      <section className="bp-sec bp-sec--tight" aria-labelledby="about-story-title">
        <div className="bp-shell bp-grid">
          <div className="bp-sec-head">
            <h2 id="about-story-title">Po co powstał Blueport?</h2>
          </div>
          <InView className="reveal bp-sec-body bp-prose">
            {ABOUT_STORY.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </InView>
        </div>
      </section>

      <section className="bp-sec" aria-labelledby="about-approach-title">
        <div className="bp-shell bp-grid">
          <div className="bp-sec-head">
            <h2 id="about-approach-title">Jak pracujemy?</h2>
            <div className="bp-rows-act">
              <Link className="bp-row-act" href="/proces">
                Zobacz pełny proces <Arrow />
              </Link>
            </div>
          </div>
          <InView className="bp-sec-body bp-cards about-cards bp-stagger" margin={STAGGER_MARGIN} threshold={0}>
            {ABOUT_APPROACH.map((item, index) => (
              <article key={item.title} className="bp-card">
                <span className="bp-mono">{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </InView>
        </div>
      </section>

      <section className="bp-sec" aria-labelledby="about-tech-title">
        <div className="bp-shell bp-grid">
          <div className="bp-sec-head">
            <h2 id="about-tech-title">Technologia dopasowana do celu</h2>
          </div>
          <InView className="reveal bp-sec-body bp-prose">
            <p>
              Nie przywiązujemy się do jednej technologii. Dobieramy rozwiązanie do potrzeb biznesowych — od WordPressa, przez WooCommerce, po dedykowane projekty w Next.js.
            </p>
            <ul className="bp-tags">
              {ABOUT_TECHS.map((tech) => (
                <li key={tech} className="bp-mono">
                  {tech}
                </li>
              ))}
            </ul>
          </InView>
        </div>
      </section>

      <section className="bp-sec" aria-label="Dla kogo">
        <div className="bp-shell bp-grid">
          <div className="bp-sec-head" />
          <div className="bp-sec-body bp-fit">
            <InView className="reveal bp-fit-col">
              <h2>Dla kogo jesteśmy</h2>
              <ul className="bp-ticks">
                {ABOUT_FOR.map((item) => (
                  <li key={item}>
                    <Check />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </InView>
            <InView className="reveal bp-fit-col bp-fit-col--no" lag={1}>
              <h2>Dla kogo nie jesteśmy</h2>
              <ul className="bp-ticks">
                {ABOUT_NOT_FOR.map((item) => (
                  <li key={item}>
                    <Dash />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </InView>
          </div>
        </div>
      </section>

      <section className="bp-sec" aria-labelledby="about-local-title">
        <div className="bp-shell bp-grid">
          <div className="bp-sec-head">
            <h2 id="about-local-title">Pracujemy lokalnie i zdalnie</h2>
          </div>
          <InView className="reveal bp-sec-body bp-prose">
            <p>Jesteśmy ze Szczecina, ale realizujemy projekty w całej Polsce. Spotkanie? Online lub na żywo.</p>
            <p className="bp-mono bp-meta-line">Szczecin · Cała Polska</p>
          </InView>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
