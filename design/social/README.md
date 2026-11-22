# blueport studio: social media

Edit texts in `content.json`, then `python3 build.py` (or `python3 build.py opinia` for matching files only). PNGs land in `out/`.
Rendering uses the project's Playwright with Chrome and waits for Host Grotesk and Martian Mono, so it needs internet for Google Fonts.
New screenshots for case posts go to `assets/work/` (webp/png, top of the page is shown).

| File | Where | Note |
|---|---|---|
| `avatar-1080.png` | profile picture on Instagram, Facebook, LinkedIn (company page and personal) | the mark sits inside the circle crop |
| `facebook-cover-1640x624.png` | Facebook page cover | text stays inside the middle 1200 px, phones crop the sides |
| `linkedin-company-cover-1128x191.png` | LinkedIn company page banner | text on the right, the page logo covers the lower left |
| `linkedin-personal-cover-1584x396.png` | personal LinkedIn banner | text on the right, the profile photo covers the left third |
| `highlight-*.png` | Instagram story highlight covers | upload as a story, then pick it as the highlight cover |
| `ig-post-*.png` | Instagram feed, 4:5 (1080×1350) | headline, case, quote, package |
| `ig-karuzela-1…5.png` | Instagram carousel | cover, three before/after slides, CTA |
| `ig-story-*.png` | Instagram / Facebook stories, 9:16 | top 200 px and bottom 260 px stay free for the app's bars |
| `li-post-*.png` | LinkedIn feed, 1:1 (1200×1200) | case and quote; work on Facebook too |
| `li-link.png` | link preview, 1200×627 | also fits as a Facebook link image or the site's og:image |
