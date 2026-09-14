import type { Metadata } from "next";

import { PixelIcon } from "@/components/brand/PixelIcon";
import { PageHead } from "@/components/pages/PageHead";
import { CtaBand } from "@/components/sections/home/CtaBand";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { InView } from "@/components/ui/InView";
import { ABOUT_APPROACH, ABOUT_FOR, ABOUT_NOT_FOR, ABOUT_STORY, ABOUT_TECHS } from "@/constants/about";

export const metadata: Metadata = {
  title: "O nas — Kim jesteśmy",
  description: "Blueport Studio to studio webowe z Szczecina. Poznaj nas, nasze wartości i sposób pracy.",
  alternates: { canonical: "https://blueport.studio/o-nas" },
  openGraph: { url: "https://blueport.studio/o-nas" },
};

const CARD_LAGS = [0, 1, 2] as const;

export default function ONasPage() {
  return (
    <>
      <PageHead
        title="Tworzymy strony, które sprzedają. Bez chaosu."
        titleWidth="20ch"
        lede="Blueport to małe studio z konkretnym podejściem. Jasna wycena. Jasny proces. Realne efekty."
      />

      <section className="page-body" aria-labelledby="about-story-title">
        <div className="shell about-split">
          <InView className="reveal">
            <h2 id="about-story-title" className="d2">
              Po co powstał Blueport?
            </h2>
          </InView>
          <InView className="reveal about-story" lag={1}>
            {ABOUT_STORY.map((paragraph) => (
              <p key={paragraph} className="body">
                {paragraph}
              </p>
            ))}
          </InView>
        </div>
      </section>

      <section className="sec band" aria-labelledby="about-approach-title">
        <div className="shell">
          <InView className="reveal about-head">
            <h2 id="about-approach-title" className="d2">
              Jak pracujemy?
            </h2>
            <ButtonLink href="/proces" variant="secondary" withArrow>
              Zobacz pełny proces
            </ButtonLink>
          </InView>
          <div className="about-cards">
            {ABOUT_APPROACH.map((item, index) => (
              <InView key={item.title} className="reveal" lag={CARD_LAGS[index]}>
                <article className="about-card">
                  <h3 className="d3">{item.title}</h3>
                  <p className="body">{item.text}</p>
                </article>
              </InView>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="about-tech-title">
        <div className="shell about-split">
          <InView className="reveal">
            <h2 id="about-tech-title" className="d2">
              Technologia dopasowana do celu
            </h2>
          </InView>
          <InView className="reveal" lag={1}>
            <p className="body">
              Nie przywiązujemy się do jednej technologii. Dobieramy rozwiązanie do potrzeb biznesowych — od WordPressa, przez WooCommerce, po dedykowane projekty w Next.js.
            </p>
            <ul className="stack-tags about-techs">
              {ABOUT_TECHS.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </InView>
        </div>
      </section>

      <section className="sec band" aria-label="Dla kogo">
        <div className="shell about-fit">
          <InView className="reveal">
            <div className="about-fit-col about-fit-yes">
              <h2 className="d3">Dla kogo jesteśmy</h2>
              <ul>
                {ABOUT_FOR.map((item) => (
                  <li key={item}>
                    <PixelIcon name="check" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </InView>
          <InView className="reveal" lag={1}>
            <div className="about-fit-col about-fit-no">
              <h2 className="d3">Dla kogo nie jesteśmy</h2>
              <ul>
                {ABOUT_NOT_FOR.map((item) => (
                  <li key={item}>
                    <PixelIcon name="minus" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </InView>
        </div>
      </section>

      <section className="sec" aria-labelledby="about-local-title">
        <div className="shell">
          <InView className="reveal about-local">
            <h2 id="about-local-title" className="d2">
              Pracujemy lokalnie i zdalnie
            </h2>
            <p className="body">Jesteśmy ze Szczecina, ale realizujemy projekty w całej Polsce. Spotkanie? Online lub na żywo.</p>
            <p className="meta">Szczecin · Cała Polska</p>
          </InView>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
