/** Client sites, newest first. Preview heights are the real image heights; `line` is the homepage one-liner; `kind` is what was built and on what.
 *  `url` only where the live address differs from https://<domain> (Polaqua serves plain http until it moves to .com).
 *  Screenshots come from scripts/capture-work.mjs. */
export const WORK_SITES = [
  { slug: "uniqueideas", kind: "Strona · Next.js", name: "Unique Ideas Foundation", domain: "uniqueideasfoundation.pl", line: "Fundacja łącząca naukę, biznes i kulturę: salony i sieć PFN.", image: "/work/uniqueideas.webp", page: { src: "/work/page-uniqueideas.webp", width: 820, height: 6982 }, desc: "Strona fundacji, która organizuje salony dyskusyjne i sieć Polish Future Network. Zespół sam edytuje treści, a zgłoszenia do sieci trafiają do jednej bazy." },
  { slug: "polaqua", kind: "Katalog · Astro", name: "Polaqua Group", domain: "polaquagroup.eu", url: "http://polaquagroup.eu", line: "Hurtownia uzdatniania wody z katalogiem produktów.", image: "/work/polaqua.webp", page: { src: "/work/page-polaqua.webp", width: 820, height: 7873 }, desc: "Katalog hurtowni urządzeń do uzdatniania wody, podzielony na kategorie, po polsku i angielsku. Nowe produkty zespół dodaje sam." },
  { slug: "dobreprecle", kind: "Strona · Next.js", name: "Dobre Precle", domain: "dobreprecle.pl", line: "Punkty z preclami: menu, lokalizacje i social media.", image: "/work/dobre_precle.webp", page: { src: "/work/page-dobreprecle.webp", width: 820, height: 2803 }, desc: "Strona sieci punktów z preclami: menu z alergenami, mapa lokalizacji i linki do mediów społecznościowych." },
  { slug: "spavalnia", kind: "Sklep · WooCommerce", name: "SPAVALNIA", domain: "spavalnia.pl", line: "Sklep marki streetwearowej z prostą ścieżką zakupu.", image: "/work/spavalnia.webp", page: { src: "/work/page-spavalnia.webp", width: 820, height: 2772 }, desc: "Sklep WooCommerce marki streetwearowej. Ciemny projekt w stylu marki i krótka droga od produktu do płatności." },
  { slug: "vilmart", kind: "Strona · WordPress", name: "Vilmart Water Service", domain: "vilmart.pl", line: "Uzdatnianie wody z formularzem doboru urządzenia.", image: "/work/vilmart.webp", page: { src: "/work/page-vilmart.webp", width: 820, height: 3396 }, desc: "Strona szczecińskiej firmy od uzdatniania wody. Zamiast zwykłego formularza kontaktu klient wypełnia formularz doboru urządzenia." },
  { slug: "dowytrenowania", kind: "Sklep · WooCommerce", name: "Dowytrenowania", domain: "dowytrenowania.pl", line: "Gabinet fizjoterapii ze sklepem z poradnikami i kursami.", image: "/work/dowytrenowania.webp", page: { src: "/work/page-dowytrenowania.webp", width: 820, height: 2817 }, desc: "Strona fizjoterapeutki i trenerki medycznej ze sklepem z poradnikami i kursami online." },
  { slug: "abcmosty", kind: "Strona · WordPress", name: "ABC Mosty", domain: "abcmosty.pl", line: "Szkółka drzew z katalogiem dla klientów hurtowych.", image: "/work/abc_mosty.webp", page: { src: "/work/page-abcmosty.webp", width: 820, height: 4485 }, desc: "Pierwsza strona rodzinnej szkółki drzew, krzewów i choinek, działającej od 30 lat. Oferta w trzech grupach i lokalne SEO." },
  { slug: "afterthesin", kind: "Strona · WordPress", name: "After the Sin", domain: "afterthesin.com", line: "Zespół dark wave: koncerty, płyty i odtwarzacz.", image: "/work/after_the_sin.webp", page: { src: "/work/page-afterthesin.webp", width: 820, height: 3880 }, desc: "Strona poznańskiego zespołu dark wave z kalendarzem koncertów, teledyskami i materiałami dla organizatorów." },
] as const;

export type WorkSlug = (typeof WORK_SITES)[number]["slug"];

/** Client sites that finish the hero build, in display order; each has its own wireframe in heroWires.ts. */
export const HERO_WORK = WORK_SITES.slice(0, 5);

/** Where a site's live link points. */
export const siteHref = (site: (typeof WORK_SITES)[number]): string => ("url" in site ? site.url : `https://${site.domain}`);
