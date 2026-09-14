import { WORK_SITES, type WorkSlug } from "@/constants/work";
import type { CaseStudy } from "@/types";

/** Case study narratives, one per client site. Copy moved unchanged from the legacy case study page. */
export const CASE_STUDIES: Record<WorkSlug, CaseStudy> = {
  dowytrenowania: {
    title: "dowytrenowania.pl",
    client: "Anna Olszewska",
    industry: "Fizjoterapia / zdrowie",
    context:
      "Anna Olszewska — magister fizjoterapii, trenerka medyczna i szkoleniowiec w Profi Academy — potrzebowała strony, która zbuduje jej autorytet online i da możliwość sprzedaży wiedzy. Poprzednia wizytówka nie pozycjonowała się na lokalne frazy i nie budowała zaufania.",
    challenge:
      "Brak widoczności w Google na frazy z fizjoterapii i treningu medycznego, strona nieprzedstawiająca ekspertyzy specjalistki, brak kanału do monetyzacji wiedzy (poradniki, kursy).",
    strategy:
      "Nowa strona z jasną prezentacją specjalizacji, sekcja 'z czym możesz do mnie przyjść' jako narzędzie edukacyjne i SEO, sklep z poradnikami i kursami online wzmacniający autorytet i generujący przychód.",
    implementation:
      "WordPress z WooCommerce — sklep z poradnikami i kursami, integracja z mediami społecznościowymi (Instagram, YouTube, Facebook), newsletter, optymalizacja pod lokalne SEO.",
    stack: "Wordpress, WooCommerce",
    results:
      "Wzrost ruchu organicznego na frazy lokalne, sprzedaż poradników i kursów przez sklep online, aktywna baza subskrybentów newslettera.",
    lessons:
      "W branży medycznej zaufanie buduje treść — czytelna prezentacja specjalizacji i edukacja pacjentów przekłada się bezpośrednio na leady.",
  },
  abcmosty: {
    title: "ABC Mosty",
    client: "Przedsiębiorstwo handlowo-produkcyjne ABC",
    industry: "Szkółkarstwo / ogrodnictwo",
    context:
      "Rodzinna firma z 30-letnim doświadczeniem prowadzi szkółkę drzew i krzewów ozdobnych oraz plantację choinek. Brakowało im nowoczesnej obecności online, która oddawałaby jakość i wartości marki.",
    challenge:
      "Brak strony WWW jako kanału pozyskiwania klientów B2B i detalicznych, niska rozpoznawalność poza lokalnym rynkiem, konieczność prezentacji szerokiej oferty roślinnej.",
    strategy:
      "Elegancka wizytówka nawiązująca do natury — prezentacja oferty (krzewy ozdobne, trawy, choinki), historia rodzinnej firmy jako element budowania zaufania, galeria i dane kontaktowe.",
    implementation:
      "WordPress z designem inspirowanym naturą, sekcje produktowe, galeria, responsywny layout, lokalne SEO pod Mosty i okolice.",
    stack: "Wordpress",
    results:
      "Profesjonalna obecność online, zwiększony ruch z wyszukiwarek lokalnych, nowe zapytania ofertowe od klientów B2B i indywidualnych.",
    lessons:
      "Dla tradycyjnych branż kluczowy jest balans między estetyką marki a prostotą obsługi i znajdywalnością w sieci — design musi oddawać charakter firmy.",
  },
  afterthesin: {
    title: "After the Sin",
    client: "After the Sin",
    industry: "Muzyka / entertainment",
    context:
      "After the Sin to poznański zespół tworzący w klimatach dark wave, cold wave i post-punku. Potrzebowali reprezentacyjnej strony-wizytówki, która odda mroczny klimat muzyki i stanie się centralnym hubem informacji dla fanów i organizatorów koncertów.",
    challenge:
      "Komunikacja artystycznej tożsamości zespołu w formacie strony WWW, integracja kalendarza koncertów i materiałów wideo, zachowanie spójnego, mrocznego estetycznego DNA marki.",
    strategy:
      "Minimalistyczny, atmosferyczny design z mocnymi efektami wizualnymi, sekcja nadchodzących koncertów z linkami do zakupu biletów, galeria i teledyski.",
    implementation:
      "WordPress z atmosferycznym motywem, integracja z Facebook Events, sekcja wideo z YouTube, responsywny layout zoptymalizowany pod mobile.",
    stack: "Wordpress",
    results:
      "Strona stała się głównym kanałem informacji dla fanów, wspiera bookingowych w procesie wyceny koncertów, wzmacnia wizerunek zespołu przed debiutem zagranicznym.",
    lessons:
      "W projektach artystycznych design jest komunikatem — estetyka musi oddawać duszę marki, a nie tylko prezentować dane kontaktowe.",
  },
  vilmart: {
    title: "Vilmart Water Service",
    client: "Vilmart Water Service",
    industry: "Uzdatnianie wody / B2B + B2C",
    context:
      "Vilmart Water Service ze Szczecina to specjalista od uzdatniania wody z 15-letnim doświadczeniem — zmiękczacze, odżelaziacze, systemy odwróconej osmozy, filtry. Przestarzała strona nie oddawała profesjonalizmu marki i słabo generowała leady.",
    challenge:
      "Nieatrakcyjny design, brak wyraźnego CTA, niska konwersja na formularzu kontaktowym, słaba widoczność w wyszukiwarce na frazy lokalne.",
    strategy:
      "Nowa strona z mocnym akcentem na usługi (dobór, montaż, serwis), sekcja referencji jako social proof, dedykowany formularz doboru urządzenia jako główne narzędzie leadowe.",
    implementation:
      "WordPress z formularzem doboru urządzenia, sekcja recenzji klientów, integracja ze sklepem internetowym sklepzfiltrami.pl, lokalne SEO pod Szczecin i okolice.",
    stack: "Wordpress",
    results:
      "Wzrost liczby zapytań przez formularz online, lepsze pozycje na frazy lokalne, profesjonalna prezentacja marki wzmacniająca zaufanie klientów.",
    lessons:
      "W usługach specjalistycznych formularz doboru rozwiązania działa lepiej niż klasyczne 'Napisz do nas' — redukuje barierę wejścia i kwalifikuje klienta jeszcze przed pierwszym kontaktem.",
  },
  dobreprecle: {
    title: "Dobre Precle",
    client: "DP 1 sp. z o.o.",
    industry: "Gastronomia / sieć lokali",
    context:
      "Dobre Precle to dynamicznie rozwijająca się sieć punktów z tradycyjnymi preclami. Firma potrzebowała spójnej identyfikacji cyfrowej, która pokaże menu, lokalizacje i zbuduje społeczność wokół marki w mediach społecznościowych.",
    challenge:
      "Brak spójnej strony internetowej, trudność w prezentacji sieci punktów i rozbudowanego menu, konieczność wyróżnienia się w nasyconym rynku gastronomicznym.",
    strategy:
      "Prosta, apetyczna strona skupiona na menu, mapie lokalizacji i kanałach social media, z sekcją aktualności i transparentnym podejściem do informacji o alergenach.",
    implementation:
      "Next.js z TypeScript i Tailwind — dynamiczna sekcja lokalizacji, integracja z mediami społecznościowymi (Facebook, Instagram, TikTok, YouTube), sekcja alergenów, aktualności.",
    stack: "Next.js, TypeScript, Tailwind",
    results:
      "Spójna identyfikacja cyfrowa dla całej sieci, wzrost obserwujących w social media, łatwiejszy dostęp do informacji o lokalizacjach i ofercie dla klientów.",
    lessons:
      "Dla sieci gastronomicznych kluczowe jest połączenie wizualnej atrakcyjności oferty z praktyczną informacją o lokalizacjach i składnikach — klient musi znaleźć to, czego szuka w kilka sekund.",
  },
  spavalnia: {
    title: "SPAVALNIA",
    client: "SPAVALNIA",
    industry: "Moda / streetwear e-commerce",
    context:
      "SPAVALNIA to sklep internetowy z odzieżą streetwearową — ubrania i akcesoria dla osób ceniących miejski styl i autentyczną kulturę ulicy. Marka potrzebowała sklepu, który odda klimat streetwearu i sprawnie obsłuży sprzedaż online.",
    challenge:
      "Stworzenie sklepu e-commerce z charakterem — przekazanie estetyki streetwear przez design, przy zachowaniu prostej ścieżki zakupowej i wydajności na mobile.",
    strategy:
      "Sklep oparty na WooCommerce z mocno skustomizowanym motywem oddającym klimat marki — ciemna kolorystyka, odważna typografia, minimalne tarcie w ścieżce zakupowej.",
    implementation:
      "WordPress z WooCommerce, dedykowany motyw dopasowany do identyfikacji wizualnej marki, integracja z systemem płatności, optymalizacja kart produktowych i koszyka pod konwersję.",
    stack: "WordPress, WooCommerce",
    results:
      "Spójna identyfikacja wizualna marki w kanale e-commerce, sprawna sprzedaż online, pozytywny odbiór projektu przez społeczność streetwearową.",
    lessons:
      "W modzie streetwear design sklepu jest częścią produktu — klienci kupują nie tylko ubranie, ale też przynależność do estetyki marki.",
  },
};

const WORK_SLUGS: readonly string[] = WORK_SITES.map((site) => site.slug);

export function isWorkSlug(value: string): value is WorkSlug {
  return WORK_SLUGS.includes(value);
}
