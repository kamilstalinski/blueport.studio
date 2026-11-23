const OUTCOMES = ["Odpowiedź mailem", "Wpis do CRM lub arkusza", "Powiadomienie dla Ciebie"] as const;

/** The page's one still diagram: an enquiry from the form goes to AI, which hands it on three ways. Real text, so it
 *  reads without the picture; the wires are drawn in CSS and hidden from assistive tech. */
export function OfferAiDiagram() {
  return (
    <figure className="bp-offer-ai" aria-label="Przykładowy proces: zapytanie z formularza trafia do AI, które odpisuje mailem, zapisuje je w CRM lub arkuszu i wysyła Ci powiadomienie.">
      <p className="bp-offer-ai-node">Zapytanie z formularza</p>
      <span className="bp-offer-ai-wire" aria-hidden="true" />
      <p className="bp-offer-ai-node bp-offer-ai-core">AI</p>
      <span className="bp-offer-ai-wire" aria-hidden="true" />
      <ul className="bp-offer-ai-out">
        {OUTCOMES.map((outcome) => (
          <li key={outcome} className="bp-offer-ai-node">
            {outcome}
          </li>
        ))}
      </ul>
    </figure>
  );
}
