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
export const variants = {
  // Fade in z lekkim ruchem w górę — główny wariant wejścia
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration.slow, ease: ease.spring },
    },
    exit: {
      opacity: 0,
      y: -12,
      transition: { duration: duration.fast, ease: ease.sharp },
    },
  },

  // Fade in — dla elementów bez ruchu (tekst, label)
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: duration.slow, ease: ease.gentle },
    },
    exit: {
      opacity: 0,
      transition: { duration: duration.fast },
    },
  },

  // Scale in — dla kart, modali, tooltipów
  scaleIn: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: duration.slow, ease: ease.spring },
    },
    exit: {
      opacity: 0,
      scale: 0.97,
      transition: { duration: duration.fast, ease: ease.sharp },
    },
  },

  // Slide in z lewej — dla sidebaru, drawer
  slideRight: {
    hidden: { opacity: 0, x: -32 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: duration.slow, ease: ease.spring },
    },
    exit: {
      opacity: 0,
      x: -24,
      transition: { duration: duration.fast, ease: ease.sharp },
    },
  },

  // Stagger container — dla list kart
  stagger: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.07, delayChildren: 0.1 },
    },
  },

  // Stagger container wolniejszy — dla hero elementów
  staggerHero: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  },
} as const;

// ─── Spring configs dla useSpring / useAnimate ─────────────────
export const springs = {
  // Bouncy — dla mikro-interakcji (hover scale)
  bouncy: { type: "spring" as const, stiffness: 400, damping: 25 },
  // Smooth — dla position transitions
  smooth: { type: "spring" as const, stiffness: 200, damping: 30 },
  // Stiff — dla natychmiastowego feedbacku
  stiff: { type: "spring" as const, stiffness: 600, damping: 35 },
};
