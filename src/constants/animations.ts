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
