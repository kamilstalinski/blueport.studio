"""Assemble index.html from src.html (inline logo and icons)."""
ARROW = '<svg class="arrow" viewBox="0 0 14 14" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 7h11M8 3l4 4-4 4"/></svg>'
LOCK = '<svg viewBox="0 0 14 14" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="2.5" y="6" width="9" height="6.5"/><path d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6"/></svg>'
html = open("src.html").read().replace("%%LOGO%%", open("logo.inc").read()).replace("%%ARROW%%", ARROW).replace("%%LOCK%%", LOCK)
open("index.html", "w").write(html); print("ok", len(html))
