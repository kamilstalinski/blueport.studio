"""Assemble index.html from src.html: inline the client's on-dark lockup (design/logo/kit) as %%LOGO%%."""
import re
svg = open("../logo/kit/svg/lockup-horizontal-on-dark.svg").read()
inner = re.search(r"<g.*</g>", svg, re.S).group(0)
inner = inner.replace('fill="#FF5A1F"', 'class="bl-accent"')
inner = re.sub(r'fill="#EEF1F5"', 'class="bl-mark"', inner)
vb = re.search(r'viewBox="([^"]+)"', svg).group(1)
logo = f'<svg class="brand-svg" viewBox="{vb}" aria-hidden="true" focusable="false">{inner}</svg>'
html = open("src.html").read().replace("%%LOGO%%", logo)
open("index.html", "w").write(html)
print("index.html", len(html))
