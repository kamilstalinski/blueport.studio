export const FAQ_ITEMS = {
  time: {
    q: "Ile trwa stworzenie strony internetowej?",
    a: "Zwykle 1–2 tygodnie od akceptacji projektu graficznego do publikacji. Prosta strona firmowa powstaje od 7 dni roboczych, rozbudowana od 14, sklep internetowy od 21. Dokładną datę publikacji wpisujemy do umowy.",
  },
  contract: {
    q: "Czy podpisujemy umowę?",
    a: "Tak. Przed startem prac podpisujemy umowę, w której są zakres strony, cena i data publikacji.",
  },
  hosting: {
    q: "Kto płaci za hosting i domenę?",
    a: "Ty, bezpośrednio u dostawcy, bez naszej marży. My doradzamy hosting, konfigurujemy serwer i podpinamy Twoją domenę.",
  },
  cms: {
    q: "Czy mogę sam edytować stronę na WordPressie?",
    a: "Tak. W panelu WordPressa zmieniasz teksty, zdjęcia i ceny bez znajomości kodu. Przy publikacji pokazujemy, jak z niego korzystać.",
  },
  revisions: {
    q: "Ile rund poprawek obejmuje projekt?",
    a: "Projekt obejmuje dwie rundy poprawek.",
  },
  materials: {
    q: "Co muszę przygotować?",
    a: "Logotyp i zdjęcia, a jeśli masz już gotowy projekt graficzny, także jego. Teksty możemy napisać za Ciebie w dodatku „Profesjonalne teksty”.",
  },
  support: {
    q: "Czy pomagasz po publikacji strony?",
    a: "Tak. Szkolenie z obsługi panelu jest w każdym pakiecie, a wsparcie po starcie trwa 14 dni w pakiecie Start i 30 dni w Pro i Sklepie.",
  },
} as const;

export type FAQKey = keyof typeof FAQ_ITEMS;
