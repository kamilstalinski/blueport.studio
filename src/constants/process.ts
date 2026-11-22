import type { TileDigit } from "@/lib/pixel/glyphs";

export const PROCESS_STEPS = [
  { digit: "1", when: "Dzień 0", title: "Wypełniasz kalkulator", text: "60 sekund. Określasz zakres i dostajesz wstępną wycenę. Bez rozmowy sprzedażowej." },
  { digit: "2", when: "Dzień 1", title: "Doprecyzowujemy", text: "Krótka rozmowa. Ustalamy finalną cenę i termin, zanim cokolwiek zaczniemy." },
  { digit: "3", when: "Dzień 2-10", title: "Projekt i wdrożenie", text: "Projekt wizualny, a po Twojej akceptacji implementacja i optymalizacja szybkości." },
  { digit: "4", when: "Przed startem", title: "Testy i poprawki", text: "Sprawdzamy na telefonach i tabletach, nanosimy poprawki, akceptujesz finalną wersję." },
  { digit: "5", when: "Start", title: "Publikacja i szkolenie", text: "Konfiguracja serwera, podpięcie domeny i szkolenie z obsługi. Strona jest Twoja." },
] as const satisfies readonly { digit: TileDigit; when: string; title: string; text: string }[];

/** /proces detail, in PROCESS_STEPS order: who does what, what the client walks away with, and the step's share of the day ruler.
 *  `span` is in ruler units: one per day for days 0–10; testing and launch get no day count, only enough room for their label. */
export const PROCESS_PARTS = [
  { you: "Wybierasz typ strony i funkcje. Zajmuje to około minuty.", we: "Odzywamy się dopiero, gdy wyślesz zapytanie.", get: "Widełki cenowe na ekranie", key: false, span: 1 },
  { you: "Na krótkiej rozmowie opowiadasz o firmie i swoich klientach.", we: "Doprecyzowujemy zakres i przygotowujemy umowę.", get: "Umowę z ceną i datą publikacji", key: true, span: 1 },
  { you: "Akceptujesz projekt graficzny albo zgłaszasz uwagi.", we: "Projektujemy wygląd, a po akceptacji budujemy stronę i przyspieszamy jej ładowanie.", get: "Projekt graficzny do akceptacji", key: false, span: 9 },
  { you: "Przeglądasz gotową stronę i akceptujesz finalną wersję.", we: "Testujemy na telefonach i tabletach, poprawiamy błędy i SEO.", get: "Finalną wersję strony", key: false, span: 2 },
  { you: "Uczysz się obsługi panelu na szkoleniu.", we: "Konfigurujemy serwer i podpinamy Twoją domenę.", get: "Stronę pod Twoją domeną i dostęp do panelu", key: false, span: 1 },
] as const satisfies readonly { you: string; we: string; get: string; key: boolean; span: number }[];

export const TALLY = [
  { count: 10, prefix: "", suffix: "+", label: "wdrożeń dla małych firm w całej Polsce" },
  { count: 2, prefix: "1-", suffix: "", label: "tygodnie od akceptacji projektu do publikacji" },
  { count: 24, prefix: "", suffix: " h", label: "maksymalny czas odpowiedzi w dni robocze" },
] as const;
