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

/** The full case study narrative under the screenshot. */
export function CaseStudyStory({ study }: CaseStudyStoryProps) {
  const stack = study.stack.split(",").map((item) => item.trim()).filter(Boolean);

  return (
    <section className="sec band" aria-label="Przebieg projektu">
      <div className="shell">
        <InView className="reveal">
          <dl className="cs-facts">
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
                <ul className="stack-tags">
                  {stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </InView>

        <div className="cs-story">
          {BLOCKS.map((block, index) => (
            <InView key={block.key} className="reveal" lag={index % 2 === 0 ? 0 : 1}>
              <article className="cs-block">
                <h2 className="cs-label">{block.label}</h2>
                <p className="body">{study[block.key]}</p>
              </article>
            </InView>
          ))}
        </div>

        <InView className="reveal">
          <div className="px-note cs-results">
            <h2 className="d3">Wyniki</h2>
            <p className="body">{study.results}</p>
          </div>
        </InView>

        <InView className="reveal">
          <figure className="cs-lessons">
            <h2 className="cs-label">Wnioski</h2>
            <blockquote>
              <p>{study.lessons}</p>
            </blockquote>
          </figure>
        </InView>
      </div>
    </section>
  );
}
