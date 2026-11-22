import type { TileDigit } from "@/lib/pixel/glyphs";

export const PROCESS_STEPS = [
  { digit: "1", when: "Dzień 0", title: "Wypełniasz kalkulator", text: "60 sekund. Określasz zakres i dostajesz wstępną wycenę. Bez rozmowy sprzedażowej." },
  { digit: "2", when: "Dzień 1", title: "Doprecyzowujemy", text: "Krótka rozmowa. Ustalamy finalną cenę i termin, zanim cokolwiek zaczniemy." },
  { digit: "3", when: "Dzień 2-10", title: "Projekt i wdrożenie", text: "Projekt wizualny, a po Twojej akceptacji implementacja i optymalizacja szybkości." },
  { digit: "4", when: "Przed startem", title: "Testy i poprawki", text: "Sprawdzamy na telefonach i tabletach, nanosimy poprawki, akceptujesz finalną wersję." },
  { digit: "5", when: "Start", title: "Publikacja i szkolenie", text: "Konfiguracja serwera, podpięcie domeny i szkolenie z obsługi. Strona jest Twoja." },
] as const satisfies readonly { digit: TileDigit; when: string; title: string; text: string }[];

/** /proces: the five home steps told as four chapters (testing and launch share one), each with the thing it produces. */
export const PROCESS_CHAPTERS = [
  {
    when: "Dzień 0",
    title: "Wypełniasz kalkulator",
    text: "Wybierasz typ strony i funkcje, a kalkulator od razu pokazuje widełki cenowe. Odzywamy się dopiero, gdy wyślesz zapytanie.",
    visual: "calculator",
  },
  {
    when: "Dzień 1",
    title: "Ustalamy cenę i datę publikacji",
    text: "Na krótkiej rozmowie doprecyzowujemy zakres. Potem dostajesz umowę, w której cena i data publikacji są już wpisane.",
    visual: "contract",
  },
  {
    when: "Dni 2–10",
    title: "Projektujemy i budujemy stronę",
    text: "Najpierw dostajesz projekt graficzny do akceptacji. Po Twojej zgodzie budujemy stronę i przyspieszamy jej ładowanie.",
    visual: "site",
  },
  {
    when: "Start",
    title: "Testujemy i publikujemy",
    text: "Sprawdzamy stronę na telefonach i tabletach, a Ty akceptujesz finalną wersję. Na koniec podpinamy domenę i uczymy Cię obsługi panelu.",
    visual: "phone",
  },
] as const satisfies readonly { when: string; title: string; text: string; visual: "calculator" | "contract" | "site" | "phone" }[];

export type ProcessChapter = (typeof PROCESS_CHAPTERS)[number];

export const TALLY = [
  { count: 10, prefix: "", suffix: "+", label: "wdrożeń dla małych firm w całej Polsce" },
  { count: 2, prefix: "1-", suffix: "", label: "tygodnie od akceptacji projektu do publikacji" },
  { count: 24, prefix: "", suffix: " h", label: "maksymalny czas odpowiedzi w dni robocze" },
] as const;
