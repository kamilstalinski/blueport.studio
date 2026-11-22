import { InView } from "@/components/ui/InView";
import type { CaseStudy } from "@/types";

const BLOCKS = [
  { key: "context", label: "Kontekst biznesowy" },
  { key: "challenge", label: "Wyzwanie" },
  { key: "strategy", label: "Strategia" },
  { key: "implementation", label: "Wdrożenie" },
] as const satisfies readonly { key: keyof CaseStudy; label: string }[];

interface CaseStudyStoryProps {
  study: CaseStudy;
}

/** The case study under the screenshot: facts, the four story rows on the grid, results and lessons. */
export function CaseStudyStory({ study }: CaseStudyStoryProps) {
  const stack = study.stack.split(",").map((item) => item.trim()).filter(Boolean);

  return (
    <section className="bp-sec bp-sec--tight" aria-label="Przebieg projektu">
      <div className="bp-shell">
        <dl className="cs-facts bp-facts bp-facts--dl">
          <div>
            <dt>Klient</dt>
            <dd>{study.client}</dd>
          </div>
          <div>
            <dt>Branża</dt>
            <dd>{study.industry}</dd>
          </div>
          <div>
            <dt>Technologie</dt>
            <dd>
              <ul className="bp-tags">
                {stack.map((item) => (
                  <li key={item} className="bp-mono">
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        <div className="bp-story">
          {BLOCKS.map((block) => (
            <InView key={block.key} className="reveal">
              <article className="bp-story-row">
                <h2>{block.label}</h2>
                <p>{study[block.key]}</p>
              </article>
            </InView>
          ))}
          <InView className="reveal">
            <article className="bp-story-row bp-story-row--result">
              <h2>Wyniki</h2>
              <p>{study.results}</p>
            </article>
          </InView>
          <InView className="reveal">
            <figure className="bp-story-row bp-story-row--quote">
              <h2>Wnioski</h2>
              <blockquote>
                <p>{study.lessons}</p>
              </blockquote>
            </figure>
          </InView>
        </div>
      </div>
    </section>
  );
}
