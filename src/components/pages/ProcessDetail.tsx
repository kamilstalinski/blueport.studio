import { Check } from "@/components/ui/Marks";
import { PROCESS_DETAILS, PROCESS_STEPS } from "@/constants/process";

/** The five home steps on the process rule: timing, description and what happens inside each one. */
export function ProcessDetail() {
  return (
    <ol className="process-detail bp-steps bp-steps--detail">
      {PROCESS_STEPS.map((step, index) => (
        <li key={step.title}>
          <span className="bp-day bp-mono">{step.when.replace("-", "–")}</span>
          <div className="bp-what">
            <h2>{step.title}</h2>
            <p>{step.text}</p>
            <ul className="bp-ticks">
              {PROCESS_DETAILS[index].map((bullet) => (
                <li key={bullet}>
                  <Check />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
