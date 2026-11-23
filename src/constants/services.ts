import { ABOUT_NOT_FOR } from "@/constants/about";
import type { ContactTopic } from "@/constants/contact";
import { FAQ_ITEMS } from "@/constants/faq";
import { PACKAGES, type PackageId } from "@/constants/pricing";
import type { WorkSlug } from "@/constants/work";
import { formatPrice } from "@/lib/formatPrice";

/** Offer hub and service subpages (/oferta, /oferta/<slug>). www and shop copy comes from PACKAGES, faq.ts and real work;
 *  Ads and AI carry only the facts the owner has given. Every `// FAKT:` marks a fact still missing (closed in Task 8). */
export type ServiceSlug = "strony-www" | "sklepy-internetowe" | "reklamy-meta-google" | "wdrozenia-ai";
export type ServiceGroup = "klienci" | "automatyzacja";

export interface Service {
  slug: ServiceSlug;
  name: string;
  group: ServiceGroup;
  topic: ContactTopic;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  lede: string;
  /** One sentence for the hub card. */
  problem: string;
  scope: readonly [string, string, string];
  /** null = no figure from the owner yet. */
  priceFrom: number | null;
  priceUnit: "" | "/ mies." | "za proces";
  time: string | null;
  packages: readonly PackageId[];
  forWho: readonly string[];
  notFor: readonly string[];
  terms: readonly { term: string; text: string }[];
  proof: { kind: "work"; slugs: readonly WorkSlug[] } | { kind: "scenarios"; items: readonly { title: string; text: string }[]; tools: readonly string[] };
  faq: readonly { q: string; a: string }[];
}

const CONTRACT = "Umowę podpisujemy przed startem prac. Odpowiadamy w 24 godziny w dni robocze.";

export const SERVICES: readonly Service[] = [
  {
    slug: "strony-www",
    name: "Strona www",
    group: "klienci",
    topic: "strona",
    h1: "Strona internetowa dla małej firmy",
    metaTitle: "Strona internetowa dla małej firmy",
    metaDescription:
      "Strona firmowa na WordPressie albo w Next.js, do 10 podstron i wersja na telefony. Publikacja od 7 dni roboczych, data w umowie. Zobacz, co obejmuje.",
    lede: "Budujemy strony na WordPressie, a gdy to nie wystarcza, piszemy je w Next.js. Zakres, cenę i datę publikacji wpisujemy do umowy przed startem prac.",
    problem: "Nie masz strony albo stara wizytówka nie prowadzi klienta do kontaktu.",
    scope: [
      "Do 5 podstron na gotowym układzie albo do 10 z projektem od zera",
      "Wersja na telefony i tablety, formularz kontaktowy",
      "Szkolenie z panelu: sam zmieniasz teksty, zdjęcia i ceny",
    ],
    priceFrom: PACKAGES["strona-start"].basePrice,
    priceUnit: "",
    time: PACKAGES["strona-start"].deliveryLabel,
    packages: ["strona-start", "strona-pro", "projekt-dedykowany"],
    forWho: [
      "Nowa firma, która potrzebuje pierwszej strony",
      "Firma ze starą wizytówką, której nie widać w Google",
      "Firma, która chce sama zmieniać treści bez programisty",
      "Projekt z integracjami albo nietypową logiką: wtedy strona w Next.js",
    ],
    notFor: ABOUT_NOT_FOR,
    terms: [
      { term: "Czas", text: `Start ${PACKAGES["strona-start"].deliveryLabel}, Pro ${PACKAGES["strona-pro"].deliveryLabel}, dedykowany ${PACKAGES["projekt-dedykowany"].deliveryLabel}. Datę publikacji wpisujemy do umowy.` },
      { term: "Poprawki", text: FAQ_ITEMS.revisions.a },
      { term: "Wsparcie", text: "14 dni po starcie w pakiecie Start, 30 dni w Pro." },
      { term: "Od Ciebie", text: "Logotyp i zdjęcia. Teksty możemy napisać za Ciebie." },
      { term: "Hosting i domena", text: FAQ_ITEMS.hosting.a },
    ],
    proof: { kind: "work", slugs: ["vilmart", "abcmosty", "uniqueideas"] },
    faq: [
      FAQ_ITEMS.time,
      FAQ_ITEMS.cms,
      FAQ_ITEMS.hosting,
      {
        q: "Kiedy WordPress, a kiedy Next.js?",
        a: "WordPress wystarcza większości firm: do 10 podstron, formularz, panel do edycji. Next.js wybieramy, gdy strona ma łączyć się z innymi systemami, ma nietypową logikę albo duży ruch.",
      },
      FAQ_ITEMS.contract,
    ],
  },
  {
    slug: "sklepy-internetowe",
    name: "Sklep internetowy",
    group: "klienci",
    topic: "sklep",
    h1: "Sklep internetowy na WooCommerce dla małej firmy",
    metaTitle: "Sklep internetowy WooCommerce dla firmy",
    metaDescription:
      "Sklep WooCommerce z płatnościami online, wysyłką przez kurierów i panelem zamówień. Do 30 produktów na start. Zobacz, co obejmuje wdrożenie sklepu.",
    lede: "Sklep na WooCommerce, w którym sam dodajesz produkty i obsługujesz zamówienia. Płatności online i kurierzy są podpięci przed publikacją.",
    problem: "Sprzedajesz przez wiadomości i przelewy, a każde zamówienie obsługujesz ręcznie.",
    scope: [
      "Do 30 produktów na start, panel do ich edycji",
      "Płatności kartą i szybkimi przelewami",
      "Integracja z kurierami i panel zamówień",
    ],
    priceFrom: PACKAGES["sklep-online"].basePrice,
    priceUnit: "",
    time: PACKAGES["sklep-online"].deliveryLabel,
    packages: ["sklep-online"],
    forWho: [
      "Marka, która sprzedaje produkty i chce przyjmować płatności na stronie",
      "Specjalista, który sprzedaje poradniki albo kursy online",
      "Firma, która chce sama dodawać produkty i obsługiwać zamówienia",
    ],
    notFor: ABOUT_NOT_FOR,
    terms: [
      { term: "Czas", text: `${PACKAGES["sklep-online"].deliveryLabel}. Datę publikacji wpisujemy do umowy.` },
      { term: "Produkty", text: "Do 30 na start. Warianty, filtry i import z hurtowni dochodzą jako dodatki." },
      { term: "Poprawki", text: FAQ_ITEMS.revisions.a },
      { term: "Wsparcie", text: "30 dni po starcie i szkolenie z panelu zamówień." },
      { term: "Hosting i domena", text: FAQ_ITEMS.hosting.a },
    ],
    proof: { kind: "work", slugs: ["spavalnia", "dowytrenowania"] },
    faq: [
      {
        q: "Ile trwa stworzenie sklepu internetowego?",
        a: `Sklep publikujemy ${PACKAGES["sklep-online"].deliveryLabel}. Dokładną datę wpisujemy do umowy przed startem prac.`,
      },
      {
        q: "Czy sam dodam produkty i obsłużę zamówienia?",
        a: "Tak. W panelu WooCommerce dodajesz produkty, zmieniasz ceny i obsługujesz zamówienia bez znajomości kodu. Przy publikacji pokazujemy, jak z niego korzystać.",
      },
      {
        q: "Co, jeśli mam więcej niż 30 produktów?",
        a: "30 produktów to zakres na start. Większy katalog, warianty, filtry albo import z hurtowni ustalamy na rozmowie i dopisujemy do umowy.",
      },
      FAQ_ITEMS.hosting,
      FAQ_ITEMS.contract,
    ],
  },
  {
    slug: "reklamy-meta-google",
    name: "Reklamy Meta i Google",
    group: "klienci",
    topic: "reklamy",
    h1: "Reklamy na Facebooku, Instagramie i w Google dla małej firmy",
    metaTitle: "Reklamy Meta i Google Ads dla małej firmy",
    metaDescription:
      "Kampanie na Facebooku, Instagramie i w Google, które prowadzą klienta na Twoją stronę. Budżet płacisz prosto Meta lub Google. Zobacz, jak pracujemy.",
    lede: "Ustawiamy i prowadzimy reklamy, które kierują klientów na Twoją stronę albo do sklepu. Budżet reklamowy płacisz bezpośrednio Meta lub Google, osobno od naszej obsługi.",
    problem: "Strona jest, ale odwiedza ją za mało osób, żeby przychodziły zapytania.",
    // FAKT: zakres obsługi Ads (co dokładnie robimy co miesiąc, raporty, pomiar)
    scope: [
      "Kampanie w Meta (Facebook, Instagram) i Google Ads",
      "Reklama prowadzi na stronę albo do konkretnego produktu",
      "Budżet reklamowy płacisz bezpośrednio Meta lub Google",
    ],
    priceFrom: 900,
    priceUnit: "/ mies.",
    time: null, // FAKT: ile trwa start kampanii od podpisania umowy
    packages: [],
    forWho: [
      "Firma, która ma stronę albo sklep i chce więcej odwiedzin",
      "Sklep, który chce kierować reklamę na konkretne produkty",
    ],
    notFor: [
      // FAKT: minimalny okres współpracy i minimalny budżet, od którego reklamy mają sens
      "Firmy bez strony: reklama potrzebuje miejsca, do którego prowadzi. Stronę możemy zbudować najpierw.",
    ],
    terms: [
      { term: "Budżet reklamowy", text: "Płacisz go bezpośrednio Meta lub Google, osobno od naszego wynagrodzenia." }, // FAKT: jak rozliczany budżet (czyja karta, czyje konto reklamowe)
      { term: "Umowa", text: CONTRACT },
      // FAKT: minimalny okres współpracy
    ],
    proof: { kind: "scenarios", items: [
      { title: "Usługa lokalna", text: "Reklama w Google pokazuje się osobom, które szukają Twojej usługi w okolicy, i prowadzi je na stronę z formularzem." },
      { title: "Sklep", text: "Reklama na Instagramie pokazuje konkretny produkt i prowadzi prosto na jego kartę w sklepie." },
    ], tools: [] }, // FAKT: narzędzia faktycznie używane (Meta Ads, Google Ads, analityka)
    faq: [
      {
        q: "Czy budżet reklamowy jest wliczony w obsługę?",
        a: "Nie. Budżet reklamowy płacisz bezpośrednio Meta lub Google. Nasze wynagrodzenie za obsługę jest osobne.",
      },
      {
        q: "Czy reklama może prowadzić na nową stronę od was?",
        a: "Tak. Budujemy też strony i sklepy, więc reklama i strona, na którą prowadzi, mogą powstać w jednym miejscu.",
      },
      {
        q: "Czy pracujecie tylko ze Szczecina?",
        a: "Jesteśmy ze Szczecina, a z firmami z całej Polski pracujemy zdalnie.",
      },
      FAQ_ITEMS.contract,
      // FAKT: minimalny okres współpracy (pytanie do FAQ, gdy będzie odpowiedź)
    ],
  },
  {
    slug: "wdrozenia-ai",
    name: "Wdrożenia AI",
    group: "automatyzacja",
    topic: "ai",
    h1: "Wdrożenia AI w małej firmie: jeden proces na start",
    metaTitle: "Wdrożenia AI i automatyzacja dla firmy",
    metaDescription:
      "Automatyzujemy jedną powtarzalną czynność: odpowiedzi na zapytania, porządkowanie maili, szkice ofert. Umów rozmowę o procesie, od którego zaczniemy.",
    lede: "Wybieramy jedną czynność, którą dziś robisz ręcznie, i przekazujemy ją AI. Gdy działa, bierzemy następną.",
    problem: "Odpisywanie na zapytania, przepisywanie maili i składanie ofert zjada godziny, które wolisz spędzić z klientem.",
    // FAKT: zakres wdrożenia AI (czy w cenie są szkolenie i poprawki po starcie)
    scope: [
      "Rozmowa o tym, jak dziś wygląda jeden powtarzalny proces",
      "Wdrożenie AI w tym procesie, na Twoich skrzynkach i arkuszach",
      "Szkolenie i poprawki, zanim przejdziemy do kolejnego procesu",
    ],
    priceFrom: 2500,
    priceUnit: "za proces",
    time: null, // FAKT: ile trwa wdrożenie jednego procesu
    packages: [],
    forWho: [
      "Firma, do której codziennie przychodzą podobne zapytania",
      "Właściciel, który sam przepisuje maile i zamówienia do arkusza",
      "Firma, która składa podobne oferty z tych samych klocków",
    ],
    notFor: [ABOUT_NOT_FOR[0]],
    terms: [
      { term: "Na start", text: "Jeden proces. O kolejnych rozmawiamy, gdy pierwszy działa." },
      { term: "Umowa", text: CONTRACT },
      // FAKT: kto płaci koszty API dostawcy AI
      // FAKT: jak traktowane są dane klientów (gdzie przetwarzane, umowa powierzenia)
    ],
    proof: { kind: "scenarios", items: [
      { title: "Zapytanie z formularza", text: "Klient pisze przez formularz. AI przygotowuje szkic odpowiedzi, wpisuje zapytanie do arkusza i wysyła Ci powiadomienie." },
      { title: "Maile w arkuszu", text: "Zamówienia i pytania ze skrzynki trafiają do arkusza z podziałem na rodzaj sprawy, zamiast czekać na przepisanie." },
      { title: "Szkic oferty", text: "Z notatki po rozmowie z klientem AI składa szkic oferty z Twoich gotowych opisów usług. Ty go sprawdzasz i wysyłasz." },
    ], tools: [] }, // FAKT: dostawca AI i narzędzia automatyzacji faktycznie używane
    faq: [
      {
        q: "Od czego zaczynamy?",
        a: "Od jednego procesu, który zabiera Ci najwięcej czasu. Na rozmowie opowiadasz, jak dziś wygląda, a my proponujemy, co przejmie AI.",
      },
      {
        q: "Co muszę przygotować?",
        a: "Opis, jak dziś wygląda ten proces, i kilka przykładów: zapytań, maili albo ofert, na których AI ma się wzorować.",
      },
      {
        q: "Czy pracujecie tylko ze Szczecina?",
        a: "Jesteśmy ze Szczecina, a z firmami z całej Polski pracujemy zdalnie.",
      },
      FAQ_ITEMS.contract,
      // FAKT: kontrola człowieka nad odpowiedziami AI, koszty API, dane klientów (pytania do FAQ, gdy będą odpowiedzi)
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function priceLabel(service: Service): string {
  if (service.priceFrom === null) return "Wycena po rozmowie";
  return `od ${formatPrice(service.priceFrom)} zł${service.priceUnit ? ` ${service.priceUnit}` : ""}`;
}
