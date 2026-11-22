/** The bp arrow: a 14px line arrow that nudges right when its link is hovered (bp.css). */
export function Arrow() {
  return (
    <svg className="bp-arrow" viewBox="0 0 14 14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M1 7h11M8 3l4 4-4 4" />
    </svg>
  );
}

export function Lock() {
  return (
    <svg viewBox="0 0 14 14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.3">
      <rect x="2.5" y="6" width="9" height="6.5" />
      <path d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6" />
    </svg>
  );
}
