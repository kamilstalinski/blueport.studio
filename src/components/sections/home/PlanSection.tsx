import { Arrow } from "@/components/ui/Arrow";
import { InView } from "@/components/ui/InView";

const FIXES = [
  { was: "Nie widać Cię w Google", now: "Struktura i treść pisane pod wyszukiwanie lokalne" },
  { was: "Strona ładuje się wieki", now: "Optymalizacja szybkości przed publikacją" },
  { was: "Nikt się nie kontaktuje", now: "Formularz i ścieżka kontaktu w centrum układu" },
] as const;

export function PlanSection() {
  return (
    <section className="bp-sec bp-plan" id="plan" aria-labelledby="plan-h">
      <div className="bp-shell bp-grid">
        <div className="bp-plan-copy">
          <h2 id="plan-h">Planujemy stronę, zanim ją zaprojektujemy</h2>
          <p className="bp-lead">
            Większość stron dla małych firm powstaje bez planu: dobrze wygląda na prezentacji, a przez trzy lata nie
            przynosi zapytań. Zaczynamy od pytania, kto ma trafić na stronę z Google i co ma na niej zrobić.
          </p>
          <ul className="bp-fixes">
            {FIXES.map((fix) => (
              <li key={fix.was}>
                <Arrow />
                <s>{fix.was}</s>
                <b>{fix.now}</b>
              </li>
            ))}
          </ul>
        </div>
        <figure className="bp-plan-art">
          {/* data-in (InView) draws the route once the plan is on screen */}
          <InView className="bp-plan-draw">
            <svg
              viewBox="0 0 430 330"
              fill="none"
              shapeRendering="crispEdges"
              role="img"
              aria-label="Schemat strony: nagłówek, sekcja główna, trzy bloki treści i formularz kontaktowy, połączone ścieżką od przycisku na pierwszym ekranie do formularza."
            >
              <rect className="bp-box" x="8" y="8" width="414" height="314" />
              <line className="bp-hair" x1="8" y1="42" x2="422" y2="42" />
              <rect className="bp-bar" x="24" y="20" width="46" height="8" />
              <rect className="bp-dim" x="300" y="20" width="34" height="8" />
              <rect className="bp-dim" x="342" y="20" width="34" height="8" />
              <rect className="bp-cta" x="384" y="18" width="22" height="12" />
              <rect className="bp-fill" x="24" y="62" width="214" height="74" />
              <rect className="bp-bar" x="38" y="78" width="150" height="9" />
              <rect className="bp-dim" x="38" y="94" width="118" height="7" />
              <rect className="bp-cta" x="38" y="112" width="58" height="13" />
              <rect className="bp-fill" x="250" y="62" width="156" height="74" />
              <rect className="bp-fill" x="24" y="152" width="118" height="62" />
              <rect className="bp-fill" x="156" y="152" width="118" height="62" />
              <rect className="bp-fill" x="288" y="152" width="118" height="62" />
              <rect className="bp-fill" x="24" y="230" width="382" height="72" />
              <rect className="bp-bar" x="40" y="246" width="104" height="8" />
              <rect className="bp-dim" x="40" y="262" width="230" height="7" />
              <rect className="bp-goal" x="40" y="279" width="66" height="13" />
              <path className="bp-route" d="M67 118 L67 142 L83 142 L83 183 L215 183 L215 213 L73 213 L73 286" />
              <rect className="bp-pin" x="67" y="280" width="12" height="12" />
            </svg>
          </InView>
          <figcaption>Ścieżka od pierwszego ekranu do formularza. Rysujemy ją przed projektem graficznym.</figcaption>
        </figure>
      </div>
    </section>
  );
}
