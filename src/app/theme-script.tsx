/**
 * Inline script: sets fixed theme before first paint (dark + blue accent).
 * No localStorage, no user choice.
 */
export function ThemeInitScript() {
  const script = `
(function() {
  document.documentElement.classList.add('dark');
  document.documentElement.setAttribute('data-accent', 'blue');
})();
`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
