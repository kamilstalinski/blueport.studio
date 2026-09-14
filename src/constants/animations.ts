// ─── Easings ───────────────────────────────────────────────────
export const ease = {
  // Springy — for element, card, and modal entrances
  spring: [0.16, 1, 0.3, 1],
  // Smooth out — for menu and dropdown exits
  smooth: [0.25, 0.46, 0.45, 0.94],
  // Sharp in — for close and exit transitions
  sharp: [0.4, 0, 0.2, 1],
  // Gentle — for opacity and color transitions
  gentle: [0.4, 0, 0.6, 1],
  // Out — matches --ease-out, for progress fills and other UI-chrome motion
  out: [0.23, 1, 0.32, 1],
} as const;

// ─── Durations ─────────────────────────────────────────────────
export const duration = {
  instant: 0.1, // click feedback
  fast: 0.2, // hover states
  base: 0.35, // most UI transitions
  slow: 0.5, // section entrances
  hero: 0.8, // hero and page transitions
} as const;

// ─── Reusable Variants ────────────────────────────────────────
// Philosophy: small motion, slow reveal, and opacity-first — no "popping"
export const variants = {
  // Main entrance — barely noticeable motion, opacity does the work
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

  // Pure fade — no movement, opacity only
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

  // Cards — minimal scale with opacity-led emphasis
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

  // Slide from left — intended for drawers and sidebars only
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

  // Stagger — slower stagger reads as more polished
  stagger: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.15,
      },
    },
  },

  // Hero stagger — elements enter smoothly
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

// ─── Spring configs ────────────────────────────────────────────
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
