export const FAQ_ITEMS = {
  price: {
    q: "Ile kosztuje strona internetowa?",
    a: "Proste strony firmowe zaczynają się od 2 500 zł. Sklepy internetowe od 4 900 zł. Dokładną wycenę sprawdzisz w kalkulatorze.",
  },
  time: {
    q: "Ile trwa realizacja?",
    a: "Strona firmowa lub sklep do 30 produktów: zwykle 2–4 tygodnie. Większe projekty ustalamy indywidualnie po wycenie.",
  },
  contract: {
    q: "Czy podpisujemy umowę?",
    a: "Tak. Przed rozpoczęciem prac podpisujemy umowę z jasno określonym zakresem, terminami i warunkami współpracy.",
  },
  hosting: {
    q: "Czy pomagasz z hostingiem?",
    a: "Tak. Możemy zarekomendować i skonfigurować hosting, a także przenieść gotową stronę na Twoją domenę.",
  },
  cms: {
    q: "Czy mogę sam edytować stronę?",
    a: "Tak. Strony oparte o WordPress mają panel CMS – możesz sam dodawać treści, zdjęcia i aktualizacje bez znajomości kodu.",
  },
  support: {
    q: "Czy pomagasz po wdrożeniu?",
    a: "Tak. Oferujemy wsparcie i szkolenie po oddaniu projektu, abyś mógł swobodnie zarządzać stroną.",
  },
} as const;

export const DEFAULT_FAQ_KEYS = ["price", "time", "contract", "hosting", "cms"] as const;

export type FAQKey = keyof typeof FAQ_ITEMS;

