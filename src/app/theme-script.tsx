/**
 * Inline script: runs before first paint to prevent flash of wrong theme.
 * Must be in <head> or immediately after <html>. No React, no hydration delay.
 */
export function ThemeInitScript() {
  const script = `
(function() {
  var k = 'blueport-theme';
  var stored = localStorage.getItem(k);
  var theme = (stored === 'light' || stored === 'dark') ? stored : 'dark';
  if (theme === 'dark') document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
})();
`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
