import { PixelTile } from "@/components/brand/PixelTile";
import { DecoProgress } from "@/components/deco/DecoProgress";
import { Tally } from "@/components/sections/home/Tally";
import { InView } from "@/components/ui/InView";
import { PROCESS_STEPS } from "@/constants/process";

const STEP_LAGS = [0, 1, 2, 3, 3] as const;

export function ProcessSection() {
  return (
    <section className="sec px-host" aria-labelledby="process-title">
      <DecoProgress />
      <div className="shell">
        <InView className="reveal">
          <h2 id="process-title" className="d2 process-title">
            Jak to wygląda od zapytania do startu.
          </h2>
        </InView>
        <ol className="steps">
          {PROCESS_STEPS.map((step, index) => (
            <li key={step.title}>
              <InView className="reveal step" lag={STEP_LAGS[index]}>
                <div className="dot" />
                <div className="mark">
                  <PixelTile digit={step.digit} />
                </div>
                <p className="when">{step.when}</p>
                <h3 className="d3">{step.title}</h3>
                <p>{step.text}</p>
              </InView>
            </li>
          ))}
        </ol>
        <Tally />
      </div>
    </section>
  );
}
