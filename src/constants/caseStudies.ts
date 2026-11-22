import { WORK_SITES, type WorkSlug } from "@/constants/work";
import type { CaseStudy } from "@/types";

/** Case study narratives, one per client site. Rewritten from the legacy copy without adding facts; quotes come from TESTIMONIALS. */
export const CASE_STUDIES: Record<WorkSlug, CaseStudy> = {
  uniqueideas: {
    title: "Unique Ideas Foundation",
    client: "Fundacja Unique Ideas",
    industry: "Organizacja pozarządowa / wydarzenia",
    context:
      "Fundacja Unique Ideas łączy ludzi nauki, biznesu, kultury, mediów, dyplomacji i NGO. Organizuje kameralne spotkania (Salon of Inspiration, Youth Salon, Warsaw Executive Salon) i rozwija sieć Polish Future Network. Stara strona nie mieściła już tego programu.",
    challenge:
      "Stronę trzeba było przenieść bez utraty treści i dać osobne wejścia gościom salonów, członkom sieci i partnerom. Do tego rejestracja do sieci PFN, wersja angielska i panel, w którym zespół fundacji sam zmienia treści.",
    strategy:
      "Strona główna pokazuje misję i prowadzi do ośmiu podstron. Sekcja „przy jednym stole” wyjaśnia, jak wygląda salon. Gość, członek sieci i partner mają każdy własną drogę do kontaktu.",
    implementation:
      "Przepisanie strony na Next.js z Payload CMS jako panelem treści. Zgłoszenia do sieci PFN zapisywane w Supabase, wiadomości i potwierdzenia wysyłane przez Resend. Wersje PL i EN, wyszukiwarka pod skrótem ⌘K.",
    stack: "Next.js, Payload CMS, Supabase, Resend",
    results:
      "Fundacja sama aktualizuje treści i zapowiedzi salonów w Payload, a zgłoszenia do sieci PFN trafiają do jednej bazy zamiast do skrzynki.",
    lessons:
      "Fundacja ma kilka programów i kilka grup odbiorców. Każda grupa dostała krótkie, osobne wejście już na stronie głównej, więc nikt nie musi przekopywać się przez wspólne menu.",
  },
  polaqua: {
    title: "Polaqua Group",
    client: "Polaqua Group",
    industry: "Uzdatnianie wody / hurtownia B2B",
    context:
      "Polaqua Group od 1999 roku dostarcza urządzenia i komponenty do uzdatniania wody: zmiękczacze, systemy odwróconej osmozy, złoża, wkłady i własną markę SUPREME. Obsługuje przemysł, biznes i klientów domowych.",
    challenge:
      "Asortyment w wielu kategoriach i odbiorcy od instalatorów po zakłady przemysłowe. Klient miał szybko trafić do swojej grupy produktów albo do zapytania ofertowego, w wersji polskiej lub angielskiej.",
    strategy:
      "Katalog w kategoriach z liczbą pozycji, rozwiązania podzielone według skali instalacji i przycisk „Zapytaj o ofertę” stale w nagłówku. Katalog produktów 2026 jest dostępny już z pierwszego ekranu.",
    implementation:
      "Astro z treściami w Sanity: kategorie i karty produktów, aktualności, wersje PL i EN, tryb jasny i ciemny, wideo w tle pierwszego ekranu.",
    stack: "Astro, Sanity",
    results:
      "Cała oferta hurtowni w jednym, przeszukiwalnym katalogu, który zespół rozbudowuje w Sanity bez udziału programisty. Strona przejdzie na domenę polaquagroup.com.",
    lessons:
      "Instalator wchodzi na stronę hurtowni po konkretny produkt. Kategorie z liczbą pozycji i stały przycisk zapytania skracają mu drogę do oferty.",
  },
  dowytrenowania: {
    title: "dowytrenowania.pl",
    client: "Anna Olszewska",
    industry: "Fizjoterapia / zdrowie",
    context:
      "Anna Olszewska jest magistrem fizjoterapii, trenerką medyczną i szkoleniowcem w Profi Academy. Jej poprzednia wizytówka nie pojawiała się w Google na lokalne frazy i nie pokazywała, czym Anna się zajmuje. Potrzebowała strony, przez którą pacjenci ją znajdą i na której sprzeda swoje poradniki i kursy.",
    challenge:
      "Strona nie wyświetlała się na frazy związane z fizjoterapią i treningiem medycznym, nie opisywała specjalizacji Anny i nie miała jak sprzedawać poradników ani kursów.",
    strategy:
      "Specjalizacja opisana prostym językiem na pierwszym ekranie. Sekcja „Z czym możesz do mnie przyjść” wyjaśnia pacjentom, z jakimi problemami warto się zgłosić, i przy okazji zbiera ruch z Google. Do tego sklep z poradnikami i kursami online.",
    implementation:
      "WordPress z WooCommerce dla sklepu z poradnikami i kursami, linki do Instagrama, YouTube i Facebooka, zapis do newslettera, optymalizacja pod lokalne SEO.",
    stack: "Wordpress, WooCommerce",
    results:
      "Więcej wejść z Google na frazy lokalne, sprzedaż poradników i kursów przez sklep, rosnąca lista subskrybentów newslettera.",
    lessons:
      "Pacjenci wpisują w Google swój problem, a nie nazwę zabiegu. Dlatego sekcja „Z czym możesz do mnie przyjść” opisuje problemy ich słowami.",
  },
  abcmosty: {
    title: "ABC Mosty",
    client: "Przedsiębiorstwo handlowo-produkcyjne ABC",
    industry: "Szkółkarstwo / ogrodnictwo",
    context:
      "Rodzinna firma z Mostów od 30 lat prowadzi szkółkę drzew i krzewów ozdobnych oraz plantację choinek. Nie miała strony, przez którą mogliby ją znaleźć nowi klienci.",
    challenge:
      "Firma nie miała żadnego kanału, przez który mogliby trafić do niej nowi klienci hurtowi i detaliczni. Do pokazania była szeroka oferta: krzewy, trawy ozdobne i choinki.",
    strategy:
      "Wizytówka z ofertą podzieloną na krzewy ozdobne, trawy i choinki, historią rodzinnej firmy, galerią i danymi kontaktowymi.",
    implementation:
      "WordPress z sekcjami produktowymi i galerią, układ dopasowany do telefonów, lokalne SEO pod Mosty i okolice.",
    stack: "Wordpress",
    results:
      "Firma pojawia się w lokalnych wynikach Google i dostaje zapytania ofertowe od klientów hurtowych i indywidualnych.",
    lessons:
      "Klient hurtowy chce szybko przejrzeć ofertę i zadzwonić. Dlatego oferta jest podzielona na trzy grupy, a kontakt jest zawsze pod ręką.",
  },
  afterthesin: {
    title: "After the Sin",
    client: "After the Sin",
    industry: "Muzyka / entertainment",
    context:
      "After the Sin to poznański zespół grający dark wave, cold wave i post-punk. Zespół potrzebował jednej strony z koncertami, muzyką i kontaktem dla fanów i organizatorów.",
    challenge:
      "Pokazać mroczny klimat zespołu na stronie i zebrać w jednym miejscu kalendarz koncertów, teledyski i materiały dla organizatorów.",
    strategy:
      "Ciemny, oszczędny projekt z mocnymi zdjęciami, lista nadchodzących koncertów z linkami do biletów, galeria i teledyski.",
    implementation:
      "WordPress z własnym motywem, wydarzenia pobierane z Facebook Events, teledyski z YouTube, układ dopasowany do telefonów.",
    stack: "Wordpress",
    results:
      "Fani sprawdzają koncerty na stronie zespołu, a booker wysyła ją organizatorom przy ustalaniu występów. Zespół pokazuje ją organizatorom przed debiutem za granicą.",
    lessons:
      "Booker potrzebuje jednego linku z muzyką, zdjęciami i terminami, który wyśle organizatorowi. Pod to zaplanowaliśmy układ strony.",
  },
  vilmart: {
    title: "Vilmart Water Service",
    client: "Vilmart Water Service",
    industry: "Uzdatnianie wody / B2B + B2C",
    context:
      "Vilmart Water Service ze Szczecina od 15 lat dobiera, montuje i serwisuje zmiękczacze, odżelaziacze, systemy odwróconej osmozy i filtry. Stara strona wyglądała przestarzale i przynosiła mało zapytań.",
    challenge:
      "Nieczytelny projekt, brak wyraźnego przycisku kontaktu, mało wysłanych formularzy i słabe pozycje w Google na frazy lokalne.",
    strategy:
      "Na pierwszym planie usługi: dobór, montaż i serwis. Opinie klientów zaraz pod ofertą. Zamiast ogólnego formularza kontaktowego formularz doboru urządzenia, w którym klient opisuje swoją wodę.",
    implementation:
      "WordPress z formularzem doboru urządzenia, sekcją opinii, linkiem do sklepu sklepzfiltrami.pl i lokalnym SEO pod Szczecin i okolice.",
    stack: "Wordpress",
    results:
      "Więcej zapytań przez formularz online i wyższe pozycje na frazy lokalne. Właściciel: „Ruch z Google wzrósł 3x w ciągu miesiąca”.",
    lessons:
      "Formularz doboru urządzenia działa lepiej niż „Napisz do nas”. Klient odpowiada na kilka pytań o wodę w domu, a Vilmart od pierwszej wiadomości wie, co mu zaproponować.",
  },
  dobreprecle: {
    title: "Dobre Precle",
    client: "DP 1 sp. z o.o.",
    industry: "Gastronomia / sieć lokali",
    context:
      "Dobre Precle to sieć punktów z tradycyjnymi preclami, która otwiera kolejne lokalizacje. Firma potrzebowała jednej strony z menu, adresami punktów i linkami do mediów społecznościowych.",
    challenge:
      "Sieć nie miała wspólnej strony. Trzeba było pokazać wiele punktów, rozbudowane menu i informacje o alergenach tak, żeby klient szybko je znalazł.",
    strategy:
      "Strona zbudowana wokół trzech rzeczy, których szuka klient: menu, mapy punktów i alergenów. Do tego aktualności i linki do social mediów.",
    implementation:
      "Next.js z TypeScript i Tailwind. Lista lokalizacji łatwa do rozbudowy o nowe punkty, linki do Facebooka, Instagrama, TikToka i YouTube, sekcja alergenów i aktualności.",
    stack: "Next.js, TypeScript, Tailwind",
    results:
      "Jedna strona dla całej sieci, więcej obserwujących w mediach społecznościowych, adresy punktów i menu dostępne w kilka sekund.",
    lessons:
      "Klient sieci gastronomicznej szuka najbliższego punktu albo składu precla. Obie informacje są na stronie o jedno kliknięcie od wejścia.",
  },
  spavalnia: {
    title: "SPAVALNIA",
    client: "SPAVALNIA",
    industry: "Moda / streetwear e-commerce",
    context:
      "SPAVALNIA to warszawska marka streetwearowa sprzedająca ubrania i akcesoria online. Potrzebowała sklepu w klimacie marki, w którym zakup na telefonie zajmuje kilka kroków.",
    challenge:
      "Oddać charakter marki w wyglądzie sklepu i zachować krótką ścieżkę zakupu oraz szybkie ładowanie na telefonach.",
    strategy:
      "WooCommerce z motywem zrobionym pod markę: ciemne kolory, duża typografia i jak najmniej kroków od karty produktu do płatności.",
    implementation:
      "WordPress z WooCommerce, motyw dopasowany do identyfikacji marki, płatności online, dopracowane karty produktów i koszyk.",
    stack: "WordPress, WooCommerce",
    results:
      "Sklep wygląda jak reszta komunikacji marki i sprawnie obsługuje sprzedaż. Właściciel: „klienci chwalą prostotę zamawiania”.",
    lessons:
      "Klienci SPAVALNI kupują też estetykę marki, więc sklep wygląda jak reszta jej komunikacji. Ścieżka zakupu i tak musi zostać krótka.",
  },
};

const WORK_SLUGS: readonly string[] = WORK_SITES.map((site) => site.slug);

export function isWorkSlug(value: string): value is WorkSlug {
  return WORK_SLUGS.includes(value);
}
