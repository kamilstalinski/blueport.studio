# Oferta zamiast kalkulatora — design

Data: 2026-11-23 · Status: do akceptacji

## Intencja

Blueport przestaje być „studiem stron z kalkulatorem”. Oferta rozszerza się o **wdrożenia AI** i **reklamy Meta/Google Ads**. Odwiedzający ma zamiast samodzielnego liczenia ceny **umówić rozmowę / napisać** — cena „od” zostaje widoczna, ale w tle. Kalkulator znika w całości.

## Cele

- Nowa strona `/oferta` (hub) + 4 podstrony usług: `/oferta/strony-www`, `/oferta/sklepy-internetowe`, `/oferta/reklamy-meta-google`, `/oferta/wdrozenia-ai` (slugi: decyzja buildera, byle po polsku i opisowe).
- Każda usługa: własny H1, meta, wpis w sitemapie — pod frazy wyszukiwania.
- Jedna akcja wszędzie: **Umów rozmowę** → `/kontakt` z wybranym tematem (`?temat=<usługa>`).
- Usunięcie kalkulatora i wszystkich odwołań do niego.

## Non-goals

- `/cennik` **zostaje** (tabela pakietów, `AddonPicker`); usuwamy z niego tylko odwołania do kalkulatora i linkujemy go z `/oferta`.
- Brak pakietów łączonych (www + reklamy + AI) i abonamentów — na razie.
- Bez nowych case studies dla AI i Ads (nie istnieją).

## Anti-goals (porażka, nawet jeśli działa)

- Zmyślone liczby, klienci, efekty („+300% leadów”) — zakazane przez PRODUCT.md.
- Karty z samym „więcej” albo „konkurencyjne ceny” (wzorzec słabych agencji z researchu).
- Ten sam generyczny proces i ten sam case study doklejony pod każdą usługę.
- Wiele różnych CTA (quiz, e-book, newsletter) obok rozmowy.
- Nowy świat wizualny: strona ma wyglądać jak reszta serwisu, nie jak doklejony landing.

## Research (skrót)

10 stron agencji (7 PL, 3 US). Wszystkie: hub + podstrona na usługę. Karta w hubie krótka (problem, 3 punkty, cena „od”, link). Najlepsze grupują usługi wg efektu („więcej klientów” / „mniej ręcznej pracy”), AI sprzedają jako „jeden proces na start”, mają jedną akcję i formularz z wybraną usługą, a na dole podstrony „reszta oferty”.

## Podejścia

| | Opis | Za | Przeciw |
|---|---|---|---|
| **A. Hub + 4 podstrony (wybrane)** | `/oferta` + szablon podstrony zasilany danymi | Każda usługa ma URL i H1; jeden komponent | Najwięcej copy |
| B. Jedna długa strona | `/oferta` z kotwicami | Najszybsze | Słabe SEO, AI/Ads giną pod www |
| C. Etapami | Najpierw hub + AI + Ads | Szybciej nowe usługi | Dwa wdrożenia tego samego |

Wybór właściciela: **A**.

## Kierunek wizualny

Rozszerzenie istniejącego świata (Impeccable: incumbent world, brak DESIGN.md — dziedziczymy z kodu): Tusz, pionowe linie siatki Grafit (`bp-rails`), radius 0, akcje jako hairline rows (`bp-row-act`), Geist Mono tylko dla danych (ceny, dni), Sygnał tylko na akcji głównej. Referencja: payloadcms.com.

Z taste-skill bierzemy reguły, nie kit: jedna sekcja = jeden ekran (1440×900), żadnych podpisów pod obrazami, prawdziwe ikony narzędzi faktycznie używanych (Meta, Google Ads, dostawca AI) w ich kolorach, najwyżej jeden nieruchomy diagram na stronę, hover micro-motion, jeden „moment” na stronę. **Nie** kopiujemy `system.css`/starter i nie robimy jasnego tła ani zdjęć stockowych (konflikt z marką — marka wygrywa).

**Teza:** usługi to jedna ścieżka klienta, ta sama co w `PlanSection`: *reklama przyprowadza → strona/sklep zamienia w zapytanie → AI obsługuje zapytanie*.

## Hub `/oferta`

1. **Hero** — H1 nazywa kategorię i odbiorcę (np. „Strony, sklepy, reklamy i AI dla małych firm”), lede, jeden twardy fakt (odpowiedź w 24 h), akcje: *Umów rozmowę* (Sygnał), *Zobacz realizacje*. Prawa strona: ciemne okno przeglądarki z prawdziwą realizacją, przez które biegnie hairline-ścieżka: reklama → strona → formularz → AI. **Moment strony:** ścieżka rysuje się raz po załadowaniu (jak `bp-plan-draw`), potem stoi; pod reduced motion od razu narysowana.
2. **Więcej klientów** — 3 kolumny siatki: Strona www, Sklep, Reklamy Meta/Google. Każda: problem (1 zdanie), 3 rzeczy w zakresie, linia mono „od X zł · Y”, row link do podstrony.
3. **Mniej ręcznej pracy** — Wdrożenia AI, „jeden proces na start”. Nieruchomy diagram: zapytanie z formularza → AI → 3 tory (odpowiedź mailem, wpis do CRM/arkusza, powiadomienie). 2–3 scenariusze opisowe (bez liczb efektów). Row link.
4. **Realizacje** — istniejący `WorkWall`.
5. **Proces** — istniejący `ProcessSection`, krok 1 = „Rozmowa 30 min” zamiast kalkulatora.
6. **FAQ + CTA** — `FaqTeaser` (pytania o ofertę) + `CtaBand` przepisany na rozmowę. Link do `/cennik` w sekcji 2 lub FAQ.

## Szablon podstrony `/oferta/[usluga]`

Jeden komponent, dane w `src/constants/` (np. `services.ts`), statyczne generowanie dla 4 slugów.

1. **Hero** — H1 = usługa + dla kogo, fakt, *Umów rozmowę: <usługa>*.
2. **Dla kogo / nie dla kogo** — dwie kolumny (wzorzec był→jest z `PlanSection`).
3. **Zakres i warunki** — wiersze `dl` jak `ProcessAround`; mono: cena „od”, czas, co klient dostarcza.
4. **Dowód** — www/sklep: prawdziwa realizacja z `caseStudies`; AI/Ads: scenariusze + ikony narzędzi. Nigdy wymyślone wyniki.
5. **FAQ** — 3–5 pytań specyficznych dla usługi (AI: dane, kontrola człowieka, koszty API; Ads: budżet reklamowy osobno od obsługi, minimalny okres).
6. **Kontakt** — `ContactForm` z wybranym tematem + wiersze „reszta oferty” (3 pozostałe usługi).

## Zmiany poza nowymi stronami

- Usunąć: `src/app/kalkulator`, `src/app/wycena`, `src/components/calculator`, `src/hooks/useCalculator`, `src/styles/calculator.css`, `/api/leads` (jeśli nic poza kalkulatorem go nie używa — builder sprawdza), `public/proces/kalkulator.png` jeśli nieużywany.
- 301: `/kalkulator` i `/wycena` → `/oferta` (`next.config` `redirects`); `/kalkulator?pakiet=` też → `/oferta`.
- Wszystkie linki do kalkulatora (hero, `CtaBand`, `TierCard`, `HomePricing`, `Navbar` mega-menu, `/kontakt`, `/o-nas`, `/cennik`, FAQ, `process.ts`) → *Umów rozmowę* (`/kontakt`) albo `/oferta`; Navbar dostaje pozycję „Oferta”.
- `CONTACT_TOPICS` + walidacja + testy: dodać `reklamy` i `ai`; formularz czyta temat z query.
- Sitemap, robots, `seo-routes.test.ts`: `/oferta` + 4 podstrony; usunąć `/wycena`, `/kalkulator`.
- Polityka prywatności: usunąć akapity o kalkulatorze.
- `PRODUCT.md`: nowy cel (rozmowa), pozycjonowanie, usługi, zasada 3 („jedna ścieżka: rozmowa”). Surface brief strony głównej: akcja główna = Umów rozmowę.
- `seoCopy.test.ts`: `/oferta` traktujemy jak `/cennik` (ceny „od” dozwolone) — wyjątek trzeba dopisać.
- Baseline'y wizualne regenerowane na CI (jak dotąd).

## Decyzje właściciela (po builder check)

- **Wydanie: wszystko naraz, po dostarczeniu faktów.** Kalkulator znika dopiero, gdy `/oferta` i 4 podstrony są kompletne. Budowa może iść wcześniej; copy AI/Ads czeka na dane.
- **Projekt dedykowany** = najwyższy stopień na `/oferta/strony-www`; temat `dedykowany` w formularzu zostaje. Karta „Strona www” w hubie pokazuje cenę od najtańszego pakietu.
- **Strona główna:** podmiana linków kalkulatora + jedna nowa, krótka sekcja „Oferta” (4 usługi jako row linki do podstron). H1, meta i `PlanSection` bez zmian.

## Otwarte — fakty od właściciela (blokują wydanie)

- Kwoty „od” i format dla AI (np. za proces) i Ads (np. miesięcznie + budżet reklamowy osobno).
- Narzędzia faktycznie używane: Meta Ads, Google Ads, dostawca AI / automatyzacji (ikony, FAQ).
- Ads: minimalny okres współpracy, jak rozliczany budżet reklamowy.
- AI: kto płaci koszty API, jak traktowane są dane klientów.

## Decyzje projektanta (do sprawdzenia przez właściciela)

- **AddonPicker na `/cennik`:** podsumowanie linkuje do `/kontakt?temat=<strona|sklep>` (pakiet → temat); wybranych dodatków nie przenosimy (to byłaby nowa funkcja formularza i API).
- **„Umów rozmowę” = istniejący formularz** (odpowiedź w 24 h), bez systemu rezerwacji. Krok 1 procesu: „Piszesz albo dzwonisz — odpowiadamy w 24 h, rozmowa ok. 30 min”.
- **Hero huba to ilustracja, nie realizacja:** okno rysowane w stylu `PlanSection` (schemat strony + ścieżka reklama → strona → formularz → AI), bez prawdziwego klienta — inaczej sugerowałoby, że ten klient ma od nas AI i reklamy.
- **Wyjątek od zakazu słów cenowych** (`seoCopy.test.ts`): `/oferta`, 4 podstrony i `services.ts`. Współdzielone komponenty (`CtaBand`, `ProcessSection`, `faq.ts`) zostają bez słów cenowych; link do `/cennik` i pytania o koszty (np. koszty API) żyją tylko w treściach usług, nie w plikach współdzielonych.

## Zostawione builderowi

Dokładne slugi, kolejność i treść FAQ (bez nowych faktów), podział na komponenty, nazwa query param, czy `/api/leads` usunąć czy zostawić martwy, kopia nagłówków zgodna z głosem marki (konkretnie, liczby zamiast przymiotników).
