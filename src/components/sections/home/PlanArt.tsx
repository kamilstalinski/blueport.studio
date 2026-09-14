/* Page skeleton with the route to contact traced through it. */
export function PlanArt() {
  return (
    <svg
      className="plan"
      viewBox="0 0 430 330"
      fill="none"
      shapeRendering="crispEdges"
      role="img"
      aria-label="Schemat strony: nagłówek, sekcja główna, trzy bloki treści i formularz kontaktowy, połączone ścieżką do kontaktu."
    >
      <rect className="box" x="8" y="8" width="414" height="314" />
      <line className="hair" x1="8" y1="42" x2="422" y2="42" strokeWidth="1.2" />
      <rect className="bar" x="24" y="20" width="46" height="8" />
      <rect className="bar-dim" x="300" y="20" width="34" height="8" />
      <rect className="bar-dim" x="342" y="20" width="34" height="8" />
      <rect className="cta" x="384" y="18" width="22" height="12" />

      <rect className="fillbox" x="24" y="62" width="214" height="74" />
      <rect className="bar" x="38" y="78" width="150" height="9" />
      <rect className="bar-dim" x="38" y="94" width="118" height="7" />
      <rect className="cta" x="38" y="112" width="58" height="13" />
      <rect className="fillbox" x="250" y="62" width="156" height="74" />

      <rect className="fillbox" x="24" y="152" width="118" height="62" />
      <rect className="fillbox" x="156" y="152" width="118" height="62" />
      <rect className="fillbox" x="288" y="152" width="118" height="62" />

      <rect className="fillbox" x="24" y="230" width="382" height="72" />
      <rect className="bar" x="40" y="246" width="104" height="8" />
      <rect className="bar-dim" x="40" y="262" width="230" height="7" />
      <rect className="cta" x="40" y="279" width="66" height="13" />

      <path className="route" d="M67 118 L67 142 L83 142 L83 183 L215 183 L215 213 L73 213 L73 286" />
      <rect className="pin" x="67" y="280" width="12" height="12" />
    </svg>
  );
}
