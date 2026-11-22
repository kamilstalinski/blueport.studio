"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { PROCESS_PARTS, PROCESS_STEPS } from "@/constants/process";

const STEPS = PROCESS_STEPS.map((step, index) => ({ ...step, when: step.when.replace("-", "–"), ...PROCESS_PARTS[index] }));
/* the first three steps are counted in days (0–10), so only their bars carry day ticks */
const DAY_STEPS = 3;

function stateOf(index: number, active: number): "done" | "now" | "next" {
  if (index < active) return "done";
  return index === active ? "now" : "next";
}

/** /proces: a sticky day ruler whose segments are as long as the steps they stand for, over one row per step (you, we, what you get). */
export function ProcessDetail() {
  const [active, setActive] = useState(0);
  const rows = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    /* a step is current while it crosses the band just above the middle of the screen */
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(rows.current.indexOf(entry.target as HTMLLIElement));
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const row of rows.current) if (row) observer.observe(row);
    return () => observer.disconnect();
  }, []);

  const current = STEPS[active];

  return (
    <div className="bp-proc">
      <nav className="bp-ruler" aria-label="Etapy współpracy">
        <ol style={{ gridTemplateColumns: STEPS.map((step) => `${step.span}fr`).join(" ") }}>
          {STEPS.map((step, index) => (
            <li key={step.title}>
              <a
                href={`#krok-${step.digit}`}
                className="bp-ruler-seg"
                data-state={stateOf(index, active)}
                aria-current={index === active ? "step" : undefined}
              >
                <span className="bp-ruler-when bp-mono">{step.when}</span>
                <span className="sr-only">: {step.title}</span>
                <span className="bp-ruler-bar" data-days={index < DAY_STEPS ? "" : undefined} style={{ "--span": step.span } as CSSProperties} />
              </a>
            </li>
          ))}
        </ol>
        <p className="bp-ruler-now bp-mono" aria-hidden="true">
          {current.when} · {current.title}
        </p>
      </nav>

      <ol className="process-detail bp-proc-steps">
        {STEPS.map((step, index) => (
          <li
            key={step.title}
            id={`krok-${step.digit}`}
            ref={(node) => {
              rows.current[index] = node;
            }}
            data-state={stateOf(index, active)}
            style={{ "--span": step.span } as CSSProperties}
          >
            <div className="bp-proc-head">
              <span className="bp-day bp-mono">{step.when}</span>
              <h2>{step.title}</h2>
            </div>
            <dl className="bp-proc-roles">
              <div>
                <dt className="bp-mono">Ty</dt>
                <dd>{step.you}</dd>
              </div>
              <div>
                <dt className="bp-mono">My</dt>
                <dd>{step.we}</dd>
              </div>
              <div className="bp-proc-get" data-key={step.key ? "" : undefined}>
                <dt className="bp-mono">Dostajesz</dt>
                <dd>{step.get}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>
    </div>
  );
}
