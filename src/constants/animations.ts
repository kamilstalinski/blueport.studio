// ─── Easings ───────────────────────────────────────────────────
export const ease = {
  // Sprężysty — do wejść elementów, kart, modali
  spring: [0.16, 1, 0.3, 1],
  // Płynny out — do menu, dropdownów
  smooth: [0.25, 0.46, 0.45, 0.94],
  // Ostry in — do zamknięć, wyjść
  sharp: [0.4, 0, 0.2, 1],
  // Delikatny — do opacity, kolorów
  gentle: [0.4, 0, 0.6, 1],
} as const;

// ─── Duracje ───────────────────────────────────────────────────
export const duration = {
  instant: 0.1, // feedback na klik
  fast: 0.2, // hover stany
  base: 0.35, // większość UI
  slow: 0.5, // wejścia sekcji
  hero: 0.8, // hero, page transitions
} as const;

// ─── Warianty wielokrotnego użytku ─────────────────────────────
// FILOZOFIA: mały ruch, wolne pojawienie, dużo opacity — zero "wyskakiwania"
export const variants = {
  // Główny wariant wejścia — ledwo widoczny ruch, dominuje opacity
  fadeUp: {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: ease.smooth },
    },
    exit: {
      opacity: 0,
      y: -6,
      transition: { duration: duration.base, ease: ease.gentle },
    },
  },

  // Czyste fade — zero ruchu, tylko opacity
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: ease.gentle },
    },
    exit: {
      opacity: 0,
      transition: { duration: duration.base, ease: ease.gentle },
    },
  },

  // Karty — minimalne scale, dominuje opacity
  scaleIn: {
    hidden: { opacity: 0, scale: 0.98, y: 8 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.65, ease: ease.smooth },
    },
    exit: {
      opacity: 0,
      scale: 0.99,
      transition: { duration: duration.base, ease: ease.gentle },
    },
  },

  // Slide z lewej — tylko dla drawer/sidebar
  slideRight: {
    hidden: { opacity: 0, x: -16 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: ease.smooth },
    },
    exit: {
      opacity: 0,
      x: -12,
      transition: { duration: duration.base, ease: ease.gentle },
    },
  },

  // Stagger — wolniejszy stagger = elegantszy
  stagger: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.15,
      },
    },
  },

  // Hero stagger — każdy element wchodzi spokojnie
  staggerHero: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.1,
      },
    },
  },
} as const;

// ─── Spring configs — wytłumione, bez odbicia ──────────────────
export const springs = {
  smooth: {
    type: "spring" as const,
    stiffness: 180,
    damping: 28,
    mass: 1,
  },
  stiff: {
    type: "spring" as const,
    stiffness: 500,
    damping: 40,
    mass: 0.8,
  },
  bouncy: {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
    mass: 0.9,
  },
};
