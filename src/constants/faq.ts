import { FEATURES } from "@/constants/pricing";
import { formatPrice } from "@/lib/formatPrice";

export const FAQ_ITEMS = {
  price: {
    q: "Ile kosztuje strona internetowa?",
    a: "Strona start od 2 500 zł, Strona Pro od 3 900 zł, sklep WooCommerce od 4 900 zł (ceny netto). Widełki dla swojego zakresu sprawdzisz w kalkulatorze w 60 sekund.",
  },
  time: {
    q: "Ile trwa realizacja?",
    a: "Strona start od 7 dni roboczych, Strona Pro od 14, sklep od 21. Od akceptacji projektu graficznego do publikacji mija zwykle 1–2 tygodnie. Dokładną datę wpisujemy do umowy.",
  },
  contract: {
    q: "Czy podpisujemy umowę?",
    a: "Tak. Przed startem prac podpisujemy umowę z zakresem, ceną i datą publikacji.",
  },
  hosting: {
    q: "Czy pomagasz z hostingiem?",
    a: "Tak. Doradzamy hosting, konfigurujemy serwer i podpinamy Twoją domenę. Za hosting i domenę płacisz bezpośrednio dostawcy, bez naszej marży.",
  },
  cms: {
    q: "Czy mogę sam edytować stronę?",
    a: "Tak. Strony na WordPressie mają panel, w którym zmieniasz teksty, zdjęcia i ceny bez znajomości kodu. Przy publikacji pokazujemy, jak z niego korzystać.",
  },
  revisions: {
    q: "Ile poprawek jest w cenie?",
    a: "W cenie są dwie rundy poprawek.",
  },
  materials: {
    q: "Co muszę przygotować?",
    a: `Logotyp i zdjęcia, a jeśli masz już gotowy projekt graficzny, także jego. Teksty możemy napisać za Ciebie w dodatku „Profesjonalne teksty” za ${formatPrice(FEATURES.copywriting.price)} zł.`,
  },
  support: {
    q: "Czy pomagasz po wdrożeniu?",
    a: "Tak. Szkolenie z obsługi jest w każdym pakiecie, a wsparcie po starcie trwa 14 dni w pakiecie Start i 30 dni w Pro i Sklepie.",
  },
} as const;

export type FAQKey = keyof typeof FAQ_ITEMS;

