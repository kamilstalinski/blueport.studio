# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Owners of small local businesses from all over Poland (service firms, shops, practices, bands, workshops) who need a first or a replacement website. They decide mainly on price, delivery time and the studio's past work, usually without a technical background, often comparing two or three studios.

## Product Purpose

Blueport Studio is a web studio from Szczecin that sells four services to small businesses: websites (WordPress, or custom Next.js / React for advanced needs), online shops (WooCommerce), Meta and Google ads, and AI implementations. Success for the site: a visitor books a conversation ("Umów rozmowę", via /kontakt).

## Positioning

Price and timeline known up front: the "from" price of each service is shown before any conversation (or the page says plainly that the quote comes after the call), the conversation comes first, the final price and date are fixed before work starts, and publication follows 1–2 weeks after design approval. The services are one customer path: an ad brings the visitor, a page or shop turns the visit into an enquiry, AI handles the enquiry. Every site is planned around how its customer arrives and what they should do (contact), not around how it looks in a presentation.

## Operating Context

The visitor arrives from Google or a referral, compares packages and examples, and looks at the offer (/oferta and its four service pages) and books a conversation (/kontakt?temat=…). Process starts with the conversation: write or call (reply within 24 h, call of about 30 minutes), price and date fixed, design and build, testing on phones and tablets, publication with server, domain and training.

## Capabilities and Constraints

- Services (src/constants/services.ts, pages /oferta/strony-www, /oferta/sklepy-internetowe, /oferta/reklamy-meta-google, /oferta/wdrozenia-ai): websites, online shops, Meta and Google ads, AI implementations. Ads and AI have no "from" price or timeline yet; their pages say the quote comes after the conversation.
- Packages behind websites and shops: Strona start (WordPress, from 2 500 zł, from 7 working days), Strona Pro (WordPress, from 3 900 zł, from 14 working days), Sklep online (WooCommerce, from 4 900 zł, from 21 working days), Projekt dedykowany (Next.js / React, from 6 500 zł, from 30 working days).
- Replies within 24 h on working days. Works in Szczecin and remotely.
- The site itself is Next.js (App Router), Polish language.

## Brand Commitments

- Logo "Gniazdo": a bp ligature built from three primitives (stem, half ring, half disc), p's stem dropping into the ring slot b leaves open. Files and rules: design/logo/kit/ (GUIDELINES.md).
- Palette: Tusz #0A0F17, Grafit #1E2633, Kobalt #2F55D4, Sygnał #FF5A1F, Papier #EEF1F5; dark-first; Sygnał never sits on Kobalt.
- Binding visual reference for the website redesign (from the owner): payloadcms.com.
- Voice: plain, concrete, Polish; numbers instead of adjectives.

## Evidence on Hand

- Real client work with screenshots in public/work/: Dobre Precle, SPAVALNIA, Vilmart Water Services, Dowytrenowania, ABC Mosty, After the Sin (each with a case study page).
- Three client testimonials with names (Kamil Głogowski / Vilmart, Igor Romanowski / SPAVALNIA, Andrzej Szymko / After The Sin) as on the current site.
- Stats used on the current site: 10+ deployments, 1–2 weeks to publication, 24 h reply time.
- Ads and AI implementations: no prices, tools or case studies yet. Their pages show what is planned and say so; nothing about them may be presented as a past project.
- No team photographs, no client logos files, no press. Do not invent customers, figures or quotes.

## Product Principles

1. Price and time before persuasion: every service shows a "from" price and time, or says plainly that the quote comes after the conversation.
2. Show the work, not adjectives: real client sites carry the proof.
3. One path to contact: the conversation ("Umów rozmowę"), never a maze of options.
4. Plain Polish for non-technical owners.

## Accessibility & Inclusion

WCAG 2.2 AA contrast and keyboard access; the site must work fully on phones, where most small-business owners browse.
