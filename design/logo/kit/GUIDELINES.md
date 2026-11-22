# blueport studio — zasady użycia logo

## 1. Znak

**Idea:** trzon „p” wpada dokładnie w szczelinę, którą zostawia „b”. To wtyczka i gniazdo, czyli port. „b” jest zbudowane z „rozciętego” o: lewa połowa to pierścień, prawa to pełny półdysk. Znak składa się z trzech prymitywów: trzonu, półpierścienia i półdysku, w proporcji grubości do promienia 0,379 (jak w referencji „oe”).

**Wersje:** lockup poziomy (podstawowy, „blueport” nad „studio”), lockup pionowy (znak nad napisem), lockup jednoliniowy (do bardzo wąskich, szerokich miejsc), sam znak, znak w małym kroju (16–48 px), wordmark dwuliniowy i jednoliniowy, favicon i ikony aplikacji. Każda wersja jest w kolorach: `color`, `on-dark`, `on-kobalt`, `black`, `white`.
**Pliki:** `svg/` to wektory (podstawa, do stron i aplikacji), `pdf/` to wektory do druku i dla drukarni, `png/` to rastry z przezroczystym tłem (2400 px, znaki 1024 px), `web/` to favicon i ikony aplikacji. `variants.html` pokazuje wszystkie wersje na właściwych tłach.
Geometria jest generowana skryptem `build_kit.py`, a PNG i PDF skryptem `export.mjs` (`python3 build_kit.py && node export.mjs`). Nie poprawiaj plików ręcznie, tylko zmieniaj parametry i generuj je od nowa.

## 2. Pole ochronne

Wokół logo trzymaj wolną przestrzeń równą **promieniowi pomarańczowego półdysku** (≈ 0,2 wysokości znaku) z każdej strony. Pole skaluje się razem z logo.

## 3. Rozmiar minimalny

| Wersja | Ekran | Druk |
|---|---|---|
| Lockup poziomy | 120 px szerokości | 30 mm |
| Lockup pionowy | 72 px szerokości | 18 mm |
| Znak | 24 px (`symbol-color.svg`) | 8 mm |
| Znak poniżej 24 px | 16–24 px: `symbol-small-color.svg` / `favicon.svg` (grubszy trzon) | 5 mm |

## 4. Kolor

| Nazwa | Rola | HEX | RGB | CMYK |
|---|---|---|---|---|
| Kobalt | marka, tła i światło strony (logo go nie używa) | `#2F55D4` | 47 85 212 | 78 60 0 17 |
| Grafit | druga powierzchnia (karty, sekcje na ciemnym) | `#1E2633` | 30 38 51 | 41 25 0 80 |
| Sygnał | jedyny akcent: półdysk, CTA, focus | `#FF5A1F` | 255 90 31 | 0 65 88 0 |
| Tusz | tekst, ciemne tło | `#0A0F17` | 10 15 23 | 57 35 0 91 |
| Papier | jasne tło | `#EEF1F5` | 238 241 245 | 3 2 0 4 |

Odpowiedniki Pantone dobierzemy z wzornikiem przed pierwszym drukiem.
Proporcje w layoucie: tusz/papier jako baza, kobalt ok. 30%, grafit ok. 15%, sygnał najwyżej 5–10%.

**Dozwolone pary logo / tło**

| Tło | Plik | Wygląd |
|---|---|---|
| Papier, biel | `*-color` | znak i „blueport” w Tuszu, pomarańczowy półdysk, „studio” w neutralnej szarości `#62666D` |
| Tusz, grafit | `*-on-dark` | znak i „blueport” w Papierze, pomarańczowy półdysk, „studio” `#8E9399` |
| Kobalt | `*-on-kobalt` | całość jasna, **bez pomarańczu** |
| Druk jednokolorowy | `*-black` / `*-white` | |

**Sygnał nigdy nie stoi na kobalcie.** Mają podobną jasność (kontrast 2,0:1) i obraz „wibruje”.

Kontrasty: jasny tekst na kobalcie 5,5:1 (AA). Sygnał na tuszu 6,2:1 (AA), więc przycisk CTA na ciemnym tle jest czytelny.
Wersje jasne (`on-dark`, `on-kobalt`, `white`) mają trzon cieńszy o 1 jednostkę. To korekta optyczna: jasne na ciemnym wygląda grubiej.

## 5. Typografia

- Wordmark to kontury kroju **Host Grotesk** (SIL OFL): „blueport” w grubości 600, „studio” w 400, przygaszone. Pliki są w `svg/`; nie przepisuj go klawiaturą, bo kontury mają ustawiony kerning i światło.
- Strona używa tego samego Host Grotesk do tekstów i Martian Mono do danych (ceny, dni, domeny).

## 6. Czego nie robić

Nie rozciągaj i nie ściskaj logo. Nie zmieniaj kolorów poza paletą. Nie kładź pomarańczu na kobalcie. Nie obracaj logo. Nie dodawaj cieni, obrysów, gradientów ani efektów. Nie przestawiaj i nie skaluj osobno części lockupu. Na zdjęciu umieszczaj logo tylko w spokojnym miejscu albo na kaflu w kolorze tuszu.

## 7. Uwagi do produkcji

- Kształty w SVG nachodzą na siebie jako osobne ścieżki. Na ekranie i w zwykłym druku to nie ma znaczenia, ale do ploterów, haftu i wycinania trzeba je scalić („Unite” w edytorze wektorowym).
- Przed rejestracją znaku zlecić badanie znaku towarowego (UPRP, EUIPO).
