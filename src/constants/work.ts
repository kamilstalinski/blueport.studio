/** Client sites shown on the home page, in the spec's order. Preview heights are the real image heights. */
export const WORK_SITES = [
  { slug: "dobreprecle", name: "Dobre Precle", domain: "dobreprecle.pl", image: "/work/dobre_precle.webp", page: { src: "/work/page-dobreprecle.webp", width: 820, height: 2803 } },
  { slug: "spavalnia", name: "SPAVALNIA", domain: "spavalnia.pl", image: "/work/spavalnia.webp", page: { src: "/work/page-spavalnia.webp", width: 820, height: 2772 } },
  { slug: "vilmart", name: "Vilmart Water Service", domain: "vilmart.pl", image: "/work/vilmart.webp", page: { src: "/work/page-vilmart.webp", width: 820, height: 3396 } },
  { slug: "dowytrenowania", name: "Dowytrenowania", domain: "dowytrenowania.pl", image: "/work/dowytrenowania.webp", page: { src: "/work/page-dowytrenowania.webp", width: 820, height: 2817 } },
  { slug: "abcmosty", name: "ABC Mosty", domain: "abcmosty.pl", image: "/work/abc_mosty.webp", page: { src: "/work/page-abcmosty.webp", width: 820, height: 4485 } },
  { slug: "afterthesin", name: "After the Sin", domain: "afterthesin.com", image: "/work/after_the_sin.webp", page: { src: "/work/page-afterthesin.webp", width: 820, height: 3880 } },
] as const;

/** Client sites that finish the Budowa hero frame, in display order. */
export const HERO_WORK = WORK_SITES.slice(0, 5);
