# Logika kalkulatora BluePort Studio

Pełny opis stanu, danych, silnika wyceny, podsumowania i walidacji. Bez odniesień do JSX/CSS — tylko logika i typy.

---

## 1. Stan (CalculatorState)

Stan kalkulatora jest trzymany w React (useReducer) i w kontekście `CalculatorContext`.

| Pole | Typ | Domyślnie | Opis |
|------|-----|-----------|------|
| `projectType` | `ProjectType \| null` | `null` | Wybrany typ projektu |
| `scopeUnit` | `"pages" \| "products"` | `"pages"` | Jednostka zakresu (ustawiana przy wyborze typu) |
| `scopeCount` | `number` | `0` | Liczba podstron lub produktów |
| `features` | `string[]` | `[]` | Identyfikatory wybranych funkcji |
| `languageCount` | `number` | `1` | Liczba języków (1 = tylko PL) |
| `integrations` | `string[]` | `[]` | Identyfikatory wybranych integracji |
| `urgency` | `"standard" \| "express"` | `"standard"` | Termin realizacji |
| `projectPriority` | `ProjectPriority \| null` | `null` | Priorytet klienta (opcjonalny) |
| `name` | `string` | `""` | Imię / nazwa |
| `email` | `string` | `""` | E-mail |
| `phone` | `string` | `""` | Telefon |

**ProjectType:** `"wordpress-standard"` \| `"wordpress-pro"` \| `"woocommerce-start"` \| `"woocommerce-pro"` \| `"nextjs"` \| `null`

**ProjectPriority:** `"speed"` \| `"price"` \| `"quality"` \| `"feature"` \| `null`

---

## 2. Reducer (akcje)

Akcje wysyłane do reducera i efekt na stan:

| Akcja | Payload | Efekt |
|-------|---------|--------|
| `SET_PROJECT_TYPE` | `ProjectType` (non-null) | Ustawia `projectType`. `scopeUnit` = `"products"` dla woocommerce-*, w przeciwnym razie `"pages"`. Zeruje `scopeCount` i `features`. |
| `SET_SCOPE_COUNT` | `number` | Ustawia `scopeCount`. |
| `SET_FEATURES` | `string[]` | Ustawia `features`. |
| `SET_LANGUAGE_COUNT` | `number` | Ustawia `languageCount`. |
| `SET_INTEGRATIONS` | `string[]` | Ustawia `integrations`. |
| `SET_URGENCY` | `Urgency` | Ustawia `urgency`. |
| `SET_PROJECT_PRIORITY` | `ProjectPriority` | Ustawia `projectPriority`. |
| `SET_NAME` | `string` | Ustawia `name`. |
| `SET_EMAIL` | `string` | Ustawia `email`. |
| `SET_PHONE` | `string` | Ustawia `phone`. |
| `RESET` | — | Przywraca cały stan do wartości początkowych. |

Numer kroku (1–6) jest trzymany osobno i zapisywany w `sessionStorage` pod kluczem `"calculator_step"`.

---

## 3. Dane i opcje (calculatorOptions.ts)

### 3.1 Typ projektu (PROJECT_TYPE_OPTIONS)

Tablica kart dla kroku 1. Każdy element: `{ id, title, subtitle, includes: string[], techNote?: string }`.

- **wordpress-standard** — Strona firmowa Standard, 5 podstron w cenie, WordPress.
- **wordpress-pro** — Strona firmowa PRO, 10 podstron, projekt UI wliczony.
- **woocommerce-start** — Sklep do 20 produktów, płatności, kurierzy.
- **woocommerce-pro** — Sklep rozbudowany, filtry, warianty, hurtownia, UI.
- **nextjs** — Projekt dedykowany, kod od zera; `techNote`: "Realizowane w Next.js / React".

### 3.2 Zakres (SCOPE)

- **SCOPE_PRESETS_PAGES** = [1, 3, 5, 10, 15, 20]
- **SCOPE_PRESETS_PRODUCTS** = [10, 20, 50, 100, 200, 500]

Etykiety (w UI): dla stron — "Ile podstron ma mieć strona?", dla produktów — "Ile produktów będzie w sklepie?".

### 3.3 Funkcje (FEATURES_BY_TYPE, Feature)

Każda funkcja: `{ id, label, description, minCost, maxCost }`.

Dostępne funkcje i zakresy kosztów (PLN):

| id | label | minCost | maxCost | Typy |
|----|--------|---------|---------|------|
| custom-ui-upgrade | Projekt graficzny UI (upgrade) | 900 | 1600 | wordpress-standard |
| seo-advanced | SEO zaawansowane | 550 | 900 | wszystkie |
| blog | Moduł bloga / aktualności | 350 | 600 | wszystkie |
| booking | System rezerwacji online | 1200 | 2000 | wordpress-*, nextjs |
| automation | Automatyzacja i CRM | 1100 | 1900 | wordpress-pro, woocommerce-pro, nextjs |
| performance | Optymalizacja wydajności | 350 | 650 | wszystkie |
| product-filters | Zaawansowane filtry produktów | 700 | 1300 | woocommerce-* |
| product-variants | Warianty produktów | 600 | 1100 | woocommerce-* |
| abandoned-cart | Odzyskiwanie porzuconych koszyków | 500 | 900 | woocommerce-* |
| loyalty-program | Program lojalnościowy | 1100 | 1900 | woocommerce-pro |
| wholesaler-feed | Integracja z hurtownią (XML/API) | 1400 | 2500 | woocommerce-pro |
| headless-cms | CMS headless (Sanity / Contentful) | 1400 | 2400 | nextjs |
| online-payments | Płatności online | 600 | 1100 | nextjs |

Mapowanie typ → lista id funkcji:

- **wordpress-standard:** custom-ui-upgrade, seo-advanced, blog, booking, performance
- **wordpress-pro:** seo-advanced, blog, booking, automation, performance
- **woocommerce-start:** seo-advanced, blog, product-filters, product-variants, abandoned-cart, performance
- **woocommerce-pro:** seo-advanced, blog, product-filters, product-variants, abandoned-cart, loyalty-program, wholesaler-feed, automation, performance
- **nextjs:** seo-advanced, blog, booking, automation, performance, headless-cms, online-payments

Pomocnicze: `getFeatureCost(id)`, `getFeatureLabel(id)`.

### 3.4 Języki (LANGUAGE_OPTIONS)

`[ { value: 1, label: "1 język (polski)" }, … 2, 3, 4 ]`.  
Etykieta sekcji w UI: "W ilu językach ma działać strona?".

### 3.5 Integracje (INTEGRATION_OPTIONS)

Każda: `{ id, label, description, minCost, maxCost, woocommerceOnly? }`.

| id | label | minCost | maxCost | woocommerceOnly |
|----|--------|---------|---------|-----------------|
| crm | CRM (HubSpot, Pipedrive) | 450 | 850 | — |
| mail | E-mail marketing (Mailchimp, Brevo) | 280 | 550 | — |
| analytics | Analityka (GA4, GTM, Hotjar) | 220 | 420 | — |
| social | Social / Meta Pixel | 250 | 450 | — |
| maps | Mapa Google | 250 | 450 | — |
| chat | Chat (LiveChat, Tidio) | 350 | 650 | — |
| pos | Kasa / system POS | 800 | 1500 | tak |
| erp | ERP / Subiekt / system magazynowy | 1200 | 2500 | tak |
| other | Inna integracja | 450 | 950 | — |

`pos` i `erp` pokazywane tylko dla projectType woocommerce-start / woocommerce-pro.

### 3.6 Priorytet (PRIORITY_OPTIONS)

Krok 5, nad polami kontaktowymi. Opcjonalne.

- speed — Szybka realizacja
- price — Optymalna cena
- quality — Najwyższa jakość
- feature — Konkretna funkcjonalność

Etykieta: "Co jest dla Ciebie najważniejsze?".

---

## 4. Silnik wyceny (pricingEngine.ts + constants.ts)

### 4.1 Stałe

**Ceny bazowe (BASE_PRICES)** — dla każdego typu min/max (PLN):

- wordpress-standard: 2500 / 2500  
- wordpress-pro: 2500 / 2500  
- woocommerce-start: 3500 / 3500  
- woocommerce-pro: 3500 / 3500  
- nextjs: 4500 / 4500  

**Strony wliczone w bazę (BASE_PAGES_INCLUDED):**

- wordpress-standard: 5  
- wordpress-pro: 10  
- nextjs: 0  
- woocommerce-*: 0 (nie dotyczy)

**Produkty wliczone w bazę (BASE_PRODUCTS_INCLUDED):**

- woocommerce-start: 20  
- woocommerce-pro: 50  

**Ograniczenia:**  
`ABSOLUTE_MIN_PRICE = 2500`, `ABSOLUTE_MAX_PRICE = 28000` (PLN).

### 4.2 Koszt zakresu (strony)

Dla `scopeUnit === "pages"`: liczba **dodatkowych** podstron = `max(0, scopeCount - BASE_PAGES_INCLUDED[projectType])`.

Progi (za każdą dodatkową stronę, PLN):

- 1–5 extra: min +220, max +300  
- 6–15 extra: min +170, max +240  
- 16+ extra: min +120, max +180  

### 4.3 Koszt zakresu (produkty)

Dla `scopeUnit === "products"`: liczba **dodatkowych** produktów = `max(0, scopeCount - BASE_PRODUCTS_INCLUDED[projectType])`.

Progi (za każdy dodatkowy produkt, PLN):

- 1–30 extra: min +70, max +100  
- 31–100 extra: min +50, max +75  
- 101+ extra: min +30, max +50  

### 4.4 Kolejność w computePrice(state)

1. **Baza** — min/max z BASE_PRICES[projectType].  
2. **Zakres** — jeśli pages: koszt extra podstron; jeśli products: koszt extra produktów (tylko dla woocommerce-*).  
3. **Funkcje** — dla każdego id z `state.features` dodaj min/max z getFeatureCost(id).  
4. **Języki** — languageCount 1 → 0; 2 → +700 / +1200; 3 → +1400 / +2200; ≥4 → +2000 / +3200 (PLN).  
5. **Integracje** — dla każdego id z `state.integrations` dodaj min/max z INTEGRATION_OPTIONS.  
6. **Tryb express** — min = ceil(min × 1.20), max = ceil(max × 1.30).  
7. **Zaokrąglenie** — min/max do pełnych 100 zł: `round(x/100)*100`.  
8. **Clamp** — min = max(2500, min(min, 28000)), max = max(2500, min(max, 28000)).  

Wynik: `EstimateResult = { min: number, max: number }`.  
Dla `projectType === null` zwracane jest `{ min: 0, max: 0 }`.

---

## 5. Podsumowanie (summary.ts)

### 5.1 Szacowany czas (estimateTimeline)

Zależy tylko od `projectType` i `urgency`. Bez wpływu zakresu, funkcji i integracji.

- **Express:**  
  - wordpress-standard / wordpress-pro → "ok. 1 tydzień"  
  - woocommerce-start / woocommerce-pro → "ok. 1–2 tygodnie"  
  - nextjs → "ok. 2 tygodnie"  
- **Standard:**  
  - wordpress-standard / wordpress-pro → "1–2 tygodnie"  
  - woocommerce-start / woocommerce-pro → "ok. 2 tygodnie"  
  - nextjs → "2–4 tygodnie"  

### 5.2 Opis projektu (formatProjectDescription)

Składany string w formie:

`"[Nazwa pakietu], [scopeCount] [podstron/produktów], [lista nazw features lub 'bez dodatków'], [n] [język/języki], [n] [integracje], tryb [standard/ekspres]."`

Jeśli ustawiony `projectPriority` — na końcu: `" Priorytet klienta: [label]."`

Nazwa pakietu z PROJECT_TYPE_OPTIONS (pole `title`). Dla nextjs w opisie używana jest etykieta "Projekt dedykowany".

### 5.3 Breakdown (getPriceBreakdown)

Lista pozycji `{ label, min, max }` w kolejności:

1. "Pakiet bazowy — [nazwa pakietu]"  
2. "Dodatkowe podstrony ([n] szt.)" — gdy scopeUnit === "pages" i extra > 0  
3. "Konfiguracja produktów ([n] szt.)" — gdy scopeUnit === "products" i extra > 0  
4. Po jednej linii na każdą wybraną funkcję (label z getFeatureLabel)  
5. "Wielojęzyczność — [n] języki" — gdy languageCount > 1  
6. "Integracje ([n] szt.)" — jedna linia łączna, gdy integrations.length > 0  
7. "Tryb ekspres (+20–30%)" — gdy urgency === "express" (min/max w breakdownu = 0, koszt już w estimate)  

### 5.4 Tagi kwalifikacji (getQualificationTags)

Zwracana tablica stringów do CRM/leadów. Zasady:

- **Typ:** nextjs → "lead-premium"; woocommerce-pro → "lead-premium"  
- **Zakres:** scopeUnit === "products" i scopeCount > 50 → "large-catalog"; scopeUnit === "pages" i scopeCount > 15 → "large-scope"  
- **Funkcje:** automation → "automation-interest"; booking → "booking-interest"; wholesaler-feed → "wholesaler"  
- **Języki:** languageCount ≥ 3 → "multilingual-heavy"  
- **Integracje:** integrations.length ≥ 3 → "integration-heavy"; erp lub pos → "enterprise-integration"  
- **Pilność:** urgency === "express" → "urgent"  
- **Priorytet:** quality → "budget-flexible"; price → "price-sensitive"; speed → "time-sensitive"; feature → "technical-buyer"  
- **Wartość:** estimate.min > 10000 → "high-value"; estimate.min > 18000 → "high-value-xl"  

### 5.5 buildSummary(state)

Zwraca `SummaryResult`:

- `projectDescription` — formatProjectDescription(state)  
- `estimate` — { minPrice, maxPrice } z computePrice (zgodne z UI)  
- `breakdown` — getPriceBreakdown(state)  
- `estimatedTimeline` — estimateTimeline(state)  
- `qualificationTags` — getQualificationTags(state, result computePrice)  

---

## 6. Walidacja (validation.ts)

- **Krok 1:** canGoNext tylko gdy `projectType !== null`. Komunikat: "Wybierz rodzaj projektu."  
- **Kroki 2, 3, 4, 5:** canGoNext zawsze true (brak blokady).  
- **Krok 6:** brak walidacji.  

**canSubmit:**  
`projectType !== null` oraz walidacja kroku 5 (kontakt):  
- name niepusty (po trim),  
- email niepusty i zgodny z regexem `^[^\s@]+@[^\s@]+\.[^\s@]+$`.  

Priorytet (projectPriority) jest opcjonalny — nie wpływa na canGoNext ani canSubmit.

---

## 7. Payload onSubmit (CalculatorSubmitPayload)

Po wysłaniu formularza wywoływane jest `onSubmit(payload)` z jednym obiektem:

- **Kontakt:** name, email, phone  
- **Stan kalkulatora:** projectType, scopeUnit, scopeCount, features, languageCount, integrations, urgency, projectPriority  
- **Wycena:** estimateMin, estimateMax (z summary.estimate), estimatedTimeline  
- **Kwalifikacja:** qualificationTags  
- **Opis:** projectDescription, breakdown  

Nie ma w payloadzie osobnego obiektu `summary` — wszystkie pola są spłaszczone.

---

## 8. Przepływ danych (skrót)

1. Użytkownik wybiera typ projektu → SET_PROJECT_TYPE → ustawiane scopeUnit, zerowane scopeCount i features.  
2. Użytkownik podaje zakres (strony lub produkty) → SET_SCOPE_COUNT.  
3. Użytkownik zaznacza funkcje i liczbę języków → SET_FEATURES, SET_LANGUAGE_COUNT.  
4. Użytkownik zaznacza integracje i pilność → SET_INTEGRATIONS, SET_URGENCY.  
5. Użytkownik podaje priorytet (opcjonalnie) i dane kontaktowe → SET_PROJECT_PRIORITY, SET_NAME, SET_EMAIL, SET_PHONE.  
6. Na kroku 6 wyświetlane jest podsumowanie (buildSummary). Po kliknięciu "Wyślij" — walidacja canSubmit, potem onSubmit(fullPayload) i reset (RESET + step 1).  

W trakcie kroków 1–5 kontekst udostępnia `getPrice()` (minPrice/maxPrice) do podglądu wyceny na żywo.
