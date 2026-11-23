# Nowe teksty pod SEO na podstronach (bez wzmianek o cenach)

Data: 2026-11-23 · Gałąź: feat/new-work-hero-wires

## Intencja

Właściciel chce, żeby blueport.studio było lepiej widoczne w Google, a później w odpowiedziach AI. Teksty na wszystkich podstronach treściowych mają zostać przepisane według aktualnych praktyk SEO copywritingu (research poniżej). Nowe teksty **nie mówią o cenach**: nie podają kwot i nie odsyłają do cennika. Strony z cenami zostają bez zmian.

## Decyzje właściciela

1. **Wariant A, czyli bez kwot w tekstach.** Z przepisywanych tekstów i z meta (title, description, OG, Twitter) znikają kwoty („od 2 500 zł”) oraz odesłania do cennika. Bez zmian zostają: strona `/cennik`, `/kalkulator`, `/wycena`, sekcja pakietów na stronie głównej (`HomePricing` i `TierCard`) oraz sam kalkulator.
2. **Szczecin + Polska.** Strona główna, `/o-nas` i `/kontakt` celują we frazy z miastem Szczecin. `/realizacje`, `/proces`, `/faq` i case studies celują we frazy ogólnopolskie (bez miasta).
3. **Pełna przeróbka.** Przepisujemy title, description, H1–H3, akapity, teksty na przyciskach i linkach, alty obrazków i opisy realizacji. To nie jest tylko poprawka meta.

## Cele

- Każda podstrona w zakresie ma jedną główną frazę z mapy fraz (poniżej). Fraza pojawia się w title, H1, pierwszym akapicie i w jednym lub dwóch H2. Odmieniamy ją naturalnie, bez powtarzania na siłę.
- Title każdej strony jest unikalny i ma do 60 znaków (razem z dopiskiem „ | Blueport Studio” z szablonu). Układ: usługa, miasto (tam, gdzie celujemy w Szczecin), wyróżnik.
- Description ma 140–160 znaków. Dodaje coś, czego nie ma w tytule, i kończy się zachętą do działania.
- Nagłówki opisują treść sekcji albo są prawdziwymi pytaniami klienta. Bez gier słownych.
- FAQ i `/proces` mają układ „najpierw odpowiedź”: pod nagłówkiem-pytaniem pierwsze 1–2 zdania odpowiadają wprost, dopiero potem idzie rozwinięcie.
- Teksty są konkretne i weryfikowalne: liczby zamiast przymiotników, dowody z realizacji i opinii.

## Czego nie robimy

- Nie tworzymy nowych podstron (osobnych stron usług czy miast).
- Nie zmieniamy stron `/cennik`, `/kalkulator`, `/wycena`, `/regulamin` ani `/polityka-prywatnosci`.
- Nie zmieniamy navbaru ani stopki. Linki „Cennik” i „Kalkulator” zostają, bo to nawigacja, a nie tekst podstrony.
- Nie zmieniamy sekcji pakietów na stronie głównej (`HomePricing`, `TierCard`) ani komponentów cennika.
- Nie zmieniamy cytatów z opinii klientów (`testimonials.ts`). To słowa klientów.
- Nie zmieniamy layoutu, stylów ani struktury komponentów. Zmieniamy tylko teksty, z wyjątkiem usunięcia pytania o cenę z listy FAQ (patrz niżej).
- Nie zmieniamy danych w JSON-LD poza tymi, które powtarzają zmieniane teksty (FAQ, opisy).

## Czego trzeba unikać, nawet jeśli technicznie zadziała

- Wymyślonych faktów: klientów, liczb, nagród, cytatów, wyników SEO klientów. Dozwolone są tylko fakty z `PRODUCT.md` i z istniejących stałych (realizacje, opinie, 10+ wdrożeń, 1–2 tygodnie do publikacji od akceptacji projektu, odpowiedź do 24 h w dni robocze, Szczecin plus praca zdalna, Kamil i Rafał).
- Upychania fraz: ta sama fraza w każdym akapicie, listy miast, sztuczne „strony internetowe Szczecin” w środku zdania.
- Typowych manier tekstów z AI: „to nie X, to Y”, „bez X, bez Y, bez Z”, puste przymiotniki („kompleksowe”, „innowacyjne”, „profesjonalne”).
- Kwot, słowa „cennik” i porównań cen w tekstach z zakresu (patrz kontrola na końcu).
- Tekstów dłuższych niż sekcje to zmieszczą. Długość akapitów ma zostać zbliżona do obecnej, bo layout jest dopasowany do tekstu.

## Ograniczenia

- Głos marki z `PRODUCT.md`: prosto, konkretnie, po polsku, liczby zamiast przymiotników. Zwracamy się do klienta na „Ty”, jak dziś.
- Odbiorcy: właściciele małych firm bez wiedzy technicznej, głównie na telefonach.
- Nie mamy danych o liczbie wyszukiwań (brak Planera Słów Kluczowych i Search Console). Frazy dobieramy z wiedzy o polskim rynku usług webowych.
- Testy przypinają dokładne teksty, więc trzeba je zaktualizować razem z treścią: `e2e/hero.spec.ts` (H1 strony głównej), `e2e/home.spec.ts` (H2 w CtaBand), `e2e/subpages.spec.ts` (H1 i H2 na `/realizacje`, `/faq`, `/proces`, `/kontakt`, `/o-nas` oraz kroki procesu) i `src/constants/content.test.ts` (opisy w `WORK_SITES`). Zrzuty wizualne (`e2e/__screenshots__`) generuje się od nowa na CI, tak jak w commicie f54e01a.

## Rozważone podejścia

1. **Pełna przeróbka (wybrana):** mapa fraz, potem nowe meta, nagłówki, treść, alty i opisy realizacji na wszystkich podstronach z zakresu. Daje największy efekt w Google i spełnia prośbę, żeby przepisać teksty na każdej podstronie. Koszt: duży diff, aktualizacja testów i zrzutów, a teksty z commita 62340bc w dużej części znikają.
2. **Tylko warstwa SEO:** title, description, H1/H2, pierwszy akapit i FAQ. Reszta tekstu zostaje. Mniejszy diff, ale środek stron nie byłby pisany pod frazy. Odrzucona, bo właściciel chce przepisać całość.
3. **Nowe strony usług i miast:** odrzucone, bo to dodawanie stron, a nie przepisywanie istniejących.

## Research: zasady, według których piszemy

Źródła są w historii rozmowy. Najważniejsze z nich to wytyczne Google o treściach „people-first” z aktualizacją z października 2026 oraz przewodniki Search Engine Land i BrightLocal.

- Ocena przydatności treści jest od 2024 roku częścią głównego rankingu Google. Liczy się treść pisana dla ludzi, konkret i doświadczenie (E-E-A-T, gdzie najważniejsze jest zaufanie). Masowe ogólniki i upychanie fraz szkodzą.
- Jedna strona odpowiada jednej intencji. Fraza trafia do title, H1, pierwszego akapitu i H2. Google przepisuje tytuły, które są ogólnikowe albo powtarzają się na kilku stronach.
- Description nie wpływa na pozycję, ale wpływa na to, czy ktoś kliknie.
- AI Overviews najczęściej cytują strony, które już są w top 10, i fragmenty z początku tekstu. Dlatego odpowiedź idzie pierwsza, w samodzielnych akapitach po 2–4 zdania.
- Frazy lokalne działają w parze z lokalnymi dowodami: firmy ze Szczecina wśród klientów, spotkania na miejscu.
- Google rozumie polską odmianę słów, więc frazy odmieniamy naturalnie.

## Mapa fraz (propozycja, do dopracowania przez wykonawcę)

| Strona | Fraza główna | Frazy poboczne | Kierunek title |
|---|---|---|---|
| `/` (domyślne meta w `layout.tsx` oraz hero) | strony internetowe Szczecin | tworzenie stron internetowych Szczecin, strony internetowe dla firm, strona WordPress dla firmy, sklep WooCommerce | „Strony internetowe Szczecin dla małych firm” |
| `/o-nas` | studio webowe Szczecin | projektowanie stron internetowych Szczecin, WordPress i Next.js | „Studio webowe ze Szczecina: Kamil i Rafał” |
| `/kontakt` | kontakt (marka) + strona internetowa Szczecin | bezpłatna konsultacja, wycena strony internetowej | „Kontakt: studio stron internetowych, Szczecin” |
| `/realizacje` | realizacje stron internetowych | przykłady stron dla małych firm, portfolio WordPress, sklepy WooCommerce | „Realizacje: strony i sklepy dla małych firm” (dziś jest blisko, więc dopracować) |
| `/realizacje/[slug]` | rodzaj strony + branża klienta (np. „strona dla fizjoterapeutki”, „sklep WooCommerce dla marki odzieżowej”) | technologia, funkcje z case study | „<Klient>: <rodzaj strony> dla <branża>” |
| `/proces` | jak powstaje strona internetowa | ile trwa zrobienie strony, etapy tworzenia strony | „Jak powstaje strona internetowa: 5 etapów” |
| `/faq` | pytania o stronę internetową dla firmy | ile trwa stworzenie strony, hosting i domena, edycja WordPress | „FAQ: czas, umowa, hosting i edycja strony” |

Z tablicy `keywords` w `layout.tsx` usuwamy „ile kosztuje strona internetowa”. Google i tak ignoruje ten tag, więc nie warto go dalej rozbudowywać.

## Zakres plików

**Meta:** `src/app/layout.tsx` (default title, description, openGraph, twitter, alt obrazka OG) oraz `metadata` w `src/app/{o-nas,realizacje,proces,kontakt,faq}/page.tsx` i w `src/app/realizacje/[slug]/page.tsx` (miejsce, z którego biorą się `seo.title` i `seo.description` dla każdego case study).

**Treść:**
- Strona główna: `HeroHome` / `HeroCopy` (H1 i lead; użyty jest ten, który faktycznie renderuje się w `HeroHome`), `LiveDomains`, `WorkWall`, `PlanSection`, `ProcessSection`, `QuotesSection` (tylko nagłówek i lead, bez cytatów), `FaqTeaser` (tytuł), `CtaBand`.
- Podstrony: `PageHead` (title i lede przekazywane z każdej strony), `AboutStatement`, `ProcessDetail`, `ProcessAround`, `CaseStudyStory`, `FaqList`, aside na `/kontakt`, sekcje na `/o-nas`.
- Stałe: `src/constants/{about,process,faq,caseStudies,work,contact}.ts`.

## Jak traktujemy wzmianki o cenie (decyzje autora, do korekty)

- **Przyciski prowadzące do kalkulatora zostają**, bo kalkulator to główna ścieżka konwersji w `PRODUCT.md`. Zmieniamy tylko ich teksty na takie, które nie mówią o koszcie, np. „Policz zakres” albo „Wyceń stronę w 60 s”. Ostateczne brzmienie wybiera wykonawca, byle bez słów „koszt”, „cena” i „cennik”.
- **`CtaBand`** dostaje nowe H2 bez „ile kosztuje”, np. o tym, że zakres i termin ustalimy w 60 sekund. Treść dobiera wykonawca.
- **FAQ:** pytanie `price` („Ile kosztuje strona internetowa?”) wypada z listy na `/faq` i z JSON-LD. Wpis w `faq.ts` zostaje, jeśli korzysta z niego `/cennik`; jeśli nie, wykonawca go usuwa. „Ile poprawek jest w cenie?” zmienia się na pytanie o rundy poprawek. Z odpowiedzi o materiałach wypada kwota dodatku.
- **Fakt, że cena i termin są w umowie,** może zostać jako sygnał zaufania, wspomniany raz na stronę i bez kwoty. Nie budujemy już wokół niego nagłówków, np. „Dlaczego zaczynamy od ceny” i „Studio, które podaje cenę przed rozmową” dostają nowy temat.
- **`/proces`:** krok „Wypełniasz kalkulator” zostaje, bo opisuje proces. Krok „Ustalamy cenę i datę publikacji” zmienia się na „Ustalamy zakres i datę publikacji”. Kwoty znikają z altów i `aria-label` ilustracji w `ProcessDetail`. Sama ilustracja umowy z kwotą to grafika, więc zostaje.
- **`ABOUT_NOT_FOR`:** pozycja „Projekty z budżetem poniżej 2 500 zł” dostaje nowe sformułowanie bez kwoty albo wypada.
- **Wyjątek od reguły „bez cen”:** „ceny” jako coś, co klient sam zmienia w panelu (np. „zmieniasz teksty, zdjęcia i ceny”), to opis funkcji strony klienta i może zostać.

## Rozstrzygnięcia po recenzji (decyzje autora, do korekty)

- **`CtaBand` jest wspólny dla wielu stron, także dla `/cennik`.** Nowy tekst bez kwot pojawi się więc również na `/cennik`. Nie dodajemy propsów tylko po to, żeby `/cennik` zachował stare brzmienie. To jedyna zmiana widoczna na `/cennik`.
- **H1 case studies zostaje nazwą klienta** (`site.name` jest też używane w kartach i aria-labelach). Frazę z mapy umieszczamy w title, description, lede i H2 każdego case study. Punkt 1 kontroli końcowej nie dotyczy więc `/realizacje/[slug]`. Przy okazji poprawiamy podwójną markę w tytule: dziś jest `… — Realizacja Blueport Studio | Blueport Studio`, a ma zostać tylko dopisek z szablonu.
- **JSON-LD `LocalBusiness` w `src/lib/jsonLd.ts`:** z `description` usuwamy kwoty (ten opis czyta Google i AI). `priceRange` zostaje, bo to pole schema, a nie tekst na stronie.

## Co zostawiamy wykonawcy

- Dokładne brzmienie wszystkich tekstów, zgodnie z zasadami i mapą fraz powyżej.
- Frazy dla każdego case study, na podstawie jego treści.
- Czy pierwsze 1–2 zdania każdej sekcji `/proces` trzeba przeformułować, żeby odpowiedź szła pierwsza.
- Czy przy pełnej przeróbce `content.test.ts` ma nadal przypinać dokładne opisy `WORK_SITES`, czy wystarczy test, że opisy istnieją.

## Kontrola na koniec (definicja „gotowe”)

1. Na każdej stronie z zakresu jest dokładnie jeden H1 i zawiera on frazę główną z mapy (odmienioną).
2. Title mają do 60 znaków z dopiskiem marki i są unikalne. Description mają 140–160 znaków.
3. `grep -rniE "zł|cennik|ile kosztuje|koszt" ` na plikach treści z zakresu nie zwraca trafień w tekstach dla użytkownika. Wyjątki: ceny w panelu klienta, nazwy plików i ścieżki.
4. `npm run lint`, testy vitest i e2e przechodzą po aktualizacji oczekiwanych tekstów. Zrzuty wizualne do wygenerowania na CI.
5. Strony z zakresu przeczytane w przeglądarce na szerokości telefonu: tekst mieści się w layoucie bez łamania.
