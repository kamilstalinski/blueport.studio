/** Small line marks for lists and tables, drawn like the bp arrow. */
export function Check() {
  return (
    <svg className="bp-mark" viewBox="0 0 14 14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M2 7.5 5.5 11 12 3.5" />
    </svg>
  );
}

export function Dash() {
  return (
    <svg className="bp-mark" viewBox="0 0 14 14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 7h8" />
    </svg>
  );
}

export function Plus() {
  return (
    <svg className="bp-mark bp-plus" viewBox="0 0 14 14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M1 7h12M7 1v12" />
    </svg>
  );
}
