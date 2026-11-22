"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Lock } from "@/components/ui/Arrow";
import { PROCESS_CHAPTERS, type ProcessChapter } from "@/constants/process";

/** What each chapter produces, shown in the one frame (live) or under its step (at rest). */
function ChapterVisual({ kind, decorative = false }: { kind: ProcessChapter["visual"]; decorative?: boolean }) {
  const alt = (text: string) => (decorative ? "" : text);
  switch (kind) {
    case "calculator":
      return (
        <Image
          className="bp-pc-shot"
          src="/proces/kalkulator.png"
          width={1200}
          height={900}
          sizes="(max-width: 1023px) 100vw, 620px"
          alt={alt("Kalkulator wyceny z wybranym pakietem Strona Pro: od 3900 zł")}
        />
      );
    case "contract":
      return (
        <div className="bp-pc-lit">
          <div className="bp-win bp-pc-doc" role={decorative ? undefined : "img"} aria-label={decorative ? undefined : "Umowa z wpisaną ceną 3 900 zł netto i datą publikacji"}>
            <p className="bp-pc-doc-title">Umowa o wykonanie strony internetowej</p>
            <dl aria-hidden="true">
              <div><dt>Pakiet</dt><dd>Strona Pro, WordPress</dd></div>
              <div><dt>Zakres</dt><dd>do 10 podstron, projekt od zera</dd></div>
              <div className="bp-pc-doc-key"><dt>Cena</dt><dd>3 900 zł netto</dd></div>
              <div className="bp-pc-doc-key"><dt>Publikacja</dt><dd>9 grudnia 2026</dd></div>
              <div><dt>Wsparcie po starcie</dt><dd>30 dni</dd></div>
            </dl>
            <div className="bp-pc-doc-sign" aria-hidden="true"><span>Zamawiający</span><span>Wykonawca</span></div>
          </div>
        </div>
      );
    case "site":
      return (
        <div className="bp-win bp-pc-site">
          <div className="bp-win-bar">
            <Lock />
            <span className="bp-url bp-mono" translate="no">polaquagroup.eu</span>
          </div>
          <Image src="/work/polaqua.webp" width={1200} height={1057} sizes="(max-width: 1023px) 100vw, 620px" alt={alt("Strona Polaqua Group na komputerze")} />
        </div>
      );
    case "phone":
      return (
        <div className="bp-pc-lit">
          <div className="bp-pc-phone">
            <span className="bp-pc-phone-url bp-mono" translate="no">dobreprecle.pl</span>
            <Image src="/work/page-dobreprecle.webp" width={820} height={2803} sizes="240px" alt={alt("Strona Dobre Precle na telefonie")} />
          </div>
        </div>
      );
  }
}

/** /proces: one section that holds on screen for a screen of scroll while its four chapters open in turn
 *  and the frame beside them shows what each one produces (taste-skill pinned-chapters, ported to React).
 *  Live only from 1024px wide and 640px tall without reduced motion; otherwise every chapter stands with its visual. */
export function ProcessDetail() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    let frame = 0;
    const read = () => {
      frame = 0;
      const box = section.getBoundingClientRect();
      const travel = box.height - innerHeight;
      if (travel <= 0) return;
      const progress = Math.min(0.999, Math.max(0, -box.top / travel));
      setActive(Math.floor(progress * PROCESS_CHAPTERS.length));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={root} className="bp-pc" aria-labelledby="pc-h">
      <div className="bp-shell bp-pc-grid">
        <div className="bp-pc-head">
          <h2 id="pc-h">Cztery kroki do publikacji</h2>
          <p className="bp-pc-lead">Od akceptacji projektu do publikacji mija zwykle 1–2 tygodnie.</p>
        </div>
        <ol className="process-detail bp-pc-steps">
            {PROCESS_CHAPTERS.map((chapter, index) => (
              <li key={chapter.title} className="bp-pc-step" data-on={index === active ? "" : undefined}>
                <span className="bp-mono">{chapter.when}</span>
                <h3>{chapter.title}</h3>
                <p>
                  <span>{chapter.text}</span>
                </p>
                <figure className="bp-pc-visual">
                  <ChapterVisual kind={chapter.visual} />
                </figure>
              </li>
            ))}
        </ol>
        <div className="bp-pc-frame" aria-hidden="true">
          {PROCESS_CHAPTERS.map((chapter, index) => (
            <div key={chapter.visual} className="bp-pc-slide" data-on={index === active ? "" : undefined} data-past={index < active ? "" : undefined}>
              <ChapterVisual kind={chapter.visual} decorative />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
