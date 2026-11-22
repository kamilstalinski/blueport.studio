import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AboutStatement } from "@/components/pages/AboutStatement";
import { PageHead } from "@/components/pages/PageHead";
import { CtaBand } from "@/components/sections/home/CtaBand";
import { Arrow, Lock } from "@/components/ui/Arrow";
import { ABOUT_CLIENTS, ABOUT_NOT_FOR, ABOUT_STORY, ABOUT_TECHS } from "@/constants/about";
import { WORK_SITES, type WorkSlug } from "@/constants/work";

export const metadata: Metadata = {
  title: "O nas: studio webowe ze Szczecina",
  description: "Kamil i Rafał ze Szczecina. Strony WordPress i sklepy WooCommerce dla małych firm z całej Polski. Cenę i termin ustalamy przed startem prac.",
  alternates: { canonical: "https://blueport.studio/o-nas" },
  openGraph: { url: "https://blueport.studio/o-nas" },
};

const site = (slug: WorkSlug) => WORK_SITES.find((entry) => entry.slug === slug)!;

export default function ONasPage() {
  return (
    <>
      <PageHead
        title="Studio ze Szczecina, które podaje cenę przed rozmową."
        lede="Blueport to Kamil i Rafał. Robimy strony i sklepy dla małych firm: gabinetów, warsztatów, sklepów i zespołów muzycznych. Ponad 10 wdrożeń w całej Polsce."
      />

      <section className="bp-sec bp-sec--tight" aria-labelledby="about-story-title">
        <div className="bp-shell bp-grid">
          <div className="bp-sec-head">
            <h2 id="about-story-title">Dlaczego zaczynamy od ceny</h2>
          </div>
          <div className="bp-sec-body bp-about-split">
            <div className="bp-prose">
              {ABOUT_STORY.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Link href="/kalkulator" className="bp-win bp-about-shot">
              <span className="bp-win-bar">
                <Lock />
                <span className="bp-url bp-mono">blueport.studio/kalkulator</span>
              </span>
              <span className="bp-about-shot-pane">
                <Image src="/proces/kalkulator.png" alt="Kalkulator wyceny z wybranym pakietem Strona Pro" width={1200} height={900} sizes="(max-width: 1023px) 100vw, 460px" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <AboutStatement />

      <section className="bp-sec" aria-labelledby="about-tech-title">
        <div className="bp-shell bp-grid">
          <div className="bp-sec-head">
            <h2 id="about-tech-title">WordPress, a gdy to za mało, Next.js</h2>
            <p>
              Strony firmowe robimy na WordPressie, sklepy na WooCommerce. Panel jest popularny, więc łatwo znaleźć kogoś, kto pomoże przy stronie także bez nas.
            </p>
          </div>
          <div className="bp-sec-body">
            <ul className="bp-techs">
              {ABOUT_TECHS.map((tech) => (
                <li key={tech.name}>
                  <span className="bp-tech-tile">
                    <Image src={tech.icon} alt="" width={40} height={40} unoptimized />
                  </span>
                  <b>{tech.name}</b>
                  <span>{tech.use}</span>
                  <span className="bp-tech-sites">
                    {tech.sites.map((slug) => (
                      <Link key={slug} href={`/realizacje/${slug}`} className="bp-tech-site">
                        <span className="bp-tech-site-pane">
                          <Image src={site(slug).image} alt="" width={1200} height={1057} sizes="(max-width: 640px) 50vw, 200px" />
                        </span>
                        <span className="bp-mono">{site(slug).domain}</span>
                      </Link>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
            <p className="bp-mono bp-meta-line">Nazwy i logotypy produktów należą do ich właścicieli.</p>
          </div>
        </div>
      </section>

      <section className="bp-sec" aria-labelledby="about-for-title">
        <div className="bp-shell bp-grid">
          <div className="bp-sec-head">
            <h2 id="about-for-title">Dla kogo pracujemy</h2>
            <p>Jesteśmy ze Szczecina, a klientów mamy też w Warszawie i Poznaniu. Z firmami ze Szczecina spotykamy się na miejscu, z resztą rozmawiamy przez wideo.</p>
          </div>
          <div className="bp-sec-body">
            <ul className="bp-peek">
              {ABOUT_CLIENTS.map((client) => {
                const work = site(client.site);
                return (
                  <li key={client.site}>
                    <Link href={`/realizacje/${client.site}`}>
                      <span className="bp-peek-trade">{client.trade}</span>
                      <span className="bp-peek-client">
                        {work.name}
                        <span className="bp-mono">{work.kind}</span>
                      </span>
                      <span className="bp-peek-shot" aria-hidden="true">
                        <Image src={work.image} alt="" width={1200} height={1057} sizes="280px" />
                      </span>
                      <Arrow />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="bp-notfor">
              <h3>Z kim nie pracujemy</h3>
              <ul>
                {ABOUT_NOT_FOR.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
