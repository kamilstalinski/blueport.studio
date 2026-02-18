# BluePort Studio — Mapowanie tras i sekcji (IA → kod)

Każda trasa i sekcja z dokumentu IA zmapowana na pliki w projekcie.

---

## Sitemap → routes (App Router)

| Trasa IA | Plik | Opis |
|----------|------|------|
| `/` | `app/page.tsx` | Home |
| `/uslugi` | `app/uslugi/page.tsx` | Usługi (szczegóły) |
| `/realizacje` | `app/realizacje/page.tsx` | Case studies (lista) |
| `/realizacje/[slug]` | `app/realizacje/[slug]/page.tsx` | Pojedyncza realizacja |
| `/proces` | `app/proces/page.tsx` | Proces (szczegóły) |
| `/o-nas` | `app/o-nas/page.tsx` | O nas |
| `/kontakt` | `app/kontakt/page.tsx` | Kontakt |
| `/polityka-prywatnosci` | `app/polityka-prywatnosci/page.tsx` | Polityka prywatności |
| `/regulamin` | `app/regulamin/page.tsx` | Regulamin |

**Redirecty (next.config.mjs):** `/oferta` → `/uslugi`, `/oferta/strony` → `/uslugi#strony-biznesowe`, `/oferta/sklepy` → `/uslugi#sklepy-internetowe`.

---

## Home (`app/page.tsx`) — 7 sekcji

| # | Sekcja IA | Komponent | Plik | CTA |
|---|-----------|-----------|------|-----|
| 1 | Hero | Hero | `sections/Hero.tsx` | Primary: Kontakt. Secondary: Realizacje. |
| 2 | Core value proposition | ValueProposition | `sections/ValueProposition.tsx` | — |
| 3 | Services overview | ServicesOverview | `sections/ServicesOverview.tsx` | „Zobacz usługi” → /uslugi |
| 4 | Selected case studies | CaseStudiesPreview | `sections/CaseStudiesPreview.tsx` | „Wszystkie realizacje” → /realizacje |
| 5 | Process overview | ProcessOverview | `sections/ProcessOverview.tsx` | „Jak pracujemy” → /proces |
| 6 | Authority & trust | Testimonials | `sections/Testimonials.tsx` | — |
| 7 | Final CTA | CTA | `sections/CTA.tsx` | „Skontaktuj się” → /kontakt |

---

## Usługi (`app/uslugi/page.tsx`)

| # | Sekcja IA | Zawartość |
|---|-----------|-----------|
| 1 | Hero | Filozofia usług, H1 |
| 2 | Service 1 | Strony biznesowe — zakres, use cases, idealny klient, rezultaty |
| 3 | Service 2 | Sklepy internetowe — jw. |
| 4 | Service 3 | Landing page — jw. |
| 5 | Technical stack | Performance, frameworki, SEO, skalowalność |
| 6 | FAQ | Obiekcje (czas, zakres, stack) |
| 7 | CTA | Konsultacja → /kontakt |

---

## Realizacje lista (`app/realizacje/page.tsx`)

| # | Sekcja IA | Zawartość |
|---|-----------|-----------|
| 1 | Hero | Nagłówek wynikowy (np. „Wyniki, nie obietnice”) |
| 2 | Case study cards | Siatka: Klient, Problem, Rozwiązanie, Wynik |
| 3 | CTA | „Opowiedz o projekcie” → /kontakt |

---

## Realizacja pojedyncza (`app/realizacje/[slug]/page.tsx`)

| # | Blok IA | Zawartość |
|---|---------|-----------|
| 1 | Business context | Kto, branża, punkt wyjścia |
| 2 | Challenge | Co trzeba było zmienić |
| 3 | Strategy | Podejście i priorytety |
| 4 | Implementation | Co zbudowano |
| 5 | Technical stack | Frameworki, wydajność, SEO |
| 6 | Results | Metryki |
| 7 | Lessons learned | Krótki wnioski |
| 8 | CTA | Kontakt / „Podobny projekt?” |

---

## Proces (`app/proces/page.tsx`)

| # | Krok IA | Deliverables | Timeline |
|---|---------|---------------|----------|
| 1 | Discovery | Brief, cele, KPIs, audyt treści | 1–2 tyg. |
| 2 | Architecture & UX | Sitemap, wireframe’y, kluczowe flow | 1–2 tyg. |
| 3 | Development | Front-end, CMS/integracje, wydajność | 2–6 tyg. |
| 4 | Testing & optimization | QA, Core Web Vitals, SEO | ~1 tyg. |
| 5 | Launch & support | Wdrożenie, DNS, przekazanie, wsparcie | — |

+ sekcja CTA → /kontakt

---

## O nas (`app/o-nas/page.tsx`)

| # | Sekcja IA | Zawartość |
|---|-----------|-----------|
| 1 | Mission | Jedno zdanie misji |
| 2 | Philosophy | Jak pracujemy |
| 3 | Technical mindset | Dlaczego wydajność i struktura |
| 4 | Why we don’t do fluff | Bez hype’u |
| 5 | CTA | Kontakt |

---

## Kontakt (`app/kontakt/page.tsx`)

| # | Element IA | Zawartość |
|---|------------|-----------|
| 1 | Headline | Krótkie uspokajające (np. „Zacznijmy od rozmowy”) |
| 2 | Intro | Co dalej (np. odpowiedź w 24h) |
| 3 | Form | Imię, email, wiadomość |
| 4 | Response time | np. „Odpowiadamy w 24h” |
| 5 | Opcjonalnie | Link do kalendarza |

---

## Linkowanie wewnętrzne (Navbar / Footer)

**Navbar:**  
Home, Usługi (/uslugi), Realizacje (/realizacje), Proces (/proces), O nas (/o-nas), Kontakt (/kontakt).

**Footer:**  
BluePort Studio, tagline, mail kontakt@blueport.studio, linki: Polityka prywatności (/polityka-prywatnosci), Regulamin (/regulamin).

---

## Pliki sekcji (components/sections)

| Sekcja | Użycie |
|--------|--------|
| Hero | Home |
| ValueProposition | Home |
| ServicesOverview | Home (3 karty + CTA do /uslugi) |
| CaseStudiesPreview | Home (2–3 projekty + CTA do /realizacje) |
| ProcessOverview | Home (4 kroki + CTA do /proces) |
| Testimonials | Home |
| CTA | Home, Usługi, Proces, O nas, Realizacje (lista) |

Sekcje stron pełnych (Usługi, Proces, O nas, Realizacje, Kontakt) mogą być złożone z komponentów z `components/sections/` lub bloków zdefiniowanych w `app/*/page.tsx`.
