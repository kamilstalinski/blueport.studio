/** Client sites in the spec's order. Preview heights are the real image heights; `line` is the homepage one-liner. */
export const WORK_SITES = [
  { slug: "dobreprecle", name: "Dobre Precle", domain: "dobreprecle.pl", line: "Punkty z preclami: menu, lokalizacje i social media.", image: "/work/dobre_precle.webp", page: { src: "/work/page-dobreprecle.webp", width: 820, height: 2803 }, desc: "Strona Next.js dla sieci punktów z tradycyjnymi preclami. Menu, lokalizacje, integracja z social media." },
  { slug: "spavalnia", name: "SPAVALNIA", domain: "spavalnia.pl", line: "Sklep marki streetwearowej z prostą ścieżką zakupu.", image: "/work/spavalnia.webp", page: { src: "/work/page-spavalnia.webp", width: 820, height: 2772 }, desc: "Sklep internetowy dla marki streetwearowej. Ciemny design oddający klimat marki, sprawna ścieżka zakupowa, integracja z WooCommerce." },
  { slug: "vilmart", name: "Vilmart Water Service", domain: "vilmart.pl", line: "Uzdatnianie wody z formularzem doboru urządzenia.", image: "/work/vilmart.webp", page: { src: "/work/page-vilmart.webp", width: 820, height: 3396 }, desc: "Strona WordPress dla specjalisty od uzdatniania wody. Formularz doboru urządzenia jako główne narzędzie leadowe." },
  { slug: "dowytrenowania", name: "Dowytrenowania", domain: "dowytrenowania.pl", line: "Gabinet fizjoterapii ze sklepem z planami treningowymi.", image: "/work/dowytrenowania.webp", page: { src: "/work/page-dowytrenowania.webp", width: 820, height: 2817 }, desc: "Strona WordPress + WooCommerce dla magistra fizjoterapii i trenerki medycznej. Sklep z poradnikami i kursami, SEO lokalne." },
  { slug: "abcmosty", name: "ABC Mosty", domain: "abcmosty.pl", line: "Szkółka drzew z katalogiem dla klientów hurtowych.", image: "/work/abc_mosty.webp", page: { src: "/work/page-abcmosty.webp", width: 820, height: 4485 }, desc: "Wizytówka WordPress dla rodzinnej szkółki drzew i krzewów ozdobnych. Nowa obecność online, wzrost zapytań B2B." },
  { slug: "afterthesin", name: "After the Sin", domain: "afterthesin.com", line: "Zespół dark wave: koncerty, płyty i odtwarzacz.", image: "/work/after_the_sin.webp", page: { src: "/work/page-afterthesin.webp", width: 820, height: 3880 }, desc: "Strona WordPress dla poznańskiego zespołu dark wave. Klimatyczny design, kalendarz koncertów, integracja z teledyskami." },
] as const;

export type WorkSlug = (typeof WORK_SITES)[number]["slug"];

/** Client sites that finish the Budowa hero frame, in display order. */
export const HERO_WORK = WORK_SITES.slice(0, 5);
