import { PROCESS_STEPS } from "@/constants/process";

export function ProcessSection() {
  return (
    <section className="bp-sec" id="proces" aria-labelledby="proces-h">
      <div className="bp-shell bp-grid">
        <div className="bp-sec-head">
          <h2 id="proces-h">Od zapytania do startu</h2>
          <p>Pięć kroków. Cenę i termin ustalamy, zanim cokolwiek zaczniemy.</p>
        </div>
        <ol className="bp-sec-body bp-steps">
          {PROCESS_STEPS.map((step) => (
            <li key={step.title}>
              <span className="bp-day bp-mono">{step.when.replace("-", "–")}</span>
              <div className="bp-what">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
