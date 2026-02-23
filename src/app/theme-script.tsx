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
  var ak = 'blueport-accent';
  var valid = ['blue','violet','amber','cyan'];
  var accent = localStorage.getItem(ak);
  document.documentElement.setAttribute('data-accent', valid.indexOf(accent) !== -1 ? accent : 'blue');
})();
`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
