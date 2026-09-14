import type { FieldPixel, TrailRect } from "@/types";

const UNIT = 8;
const KEEP_OUT_PADDING = 24;
const PROBE = 32;
const AREA_PER_SPRITE = 9000;
const BOTTOM_THINNING = 0.9;
const LARGE_CELL_CHANCE = 0.16;
const ACCENT_TONE_CHANCE = 0.16;
const STRONG_TONE_CHANCE = 0.55;
const TWINKLE_CHANCE = 0.12;
const MAX_TWINKLE_DELAY_S = 5;
const DEFAULT_SEED = 20260913;

const SHAPES: readonly (readonly (readonly [number, number])[])[] = [
  [[0, 0]], [[0, 0]], [[0, 0]], [[0, 0], [1, 0]], [[0, 0], [0, 1]], [[0, 0], [1, 1]],
  [[0, 0], [1, 0], [0, 1], [1, 1]], [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]], [[0, 0], [2, 0], [1, 1]],
];

function seededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 16807) % 2147483647;
    return state / 2147483647;
  };
}

interface PixelFieldOptions {
  width: number;
  height: number;
  keepOut: readonly TrailRect[];
  seed?: number;
}

/** Scattered pixels on an 8px unit that avoid copy and thin out toward the bottom of the section. */
export function pixelField({ width, height, keepOut, seed = DEFAULT_SEED }: PixelFieldOptions): FieldPixel[] {
  const random = seededRandom(seed);
  const padded = keepOut.map((rect) => ({
    left: rect.left - KEEP_OUT_PADDING,
    top: rect.top - KEEP_OUT_PADDING,
    right: rect.right + KEEP_OUT_PADDING,
    bottom: rect.bottom + KEEP_OUT_PADDING,
  }));
  const isClear = (x: number, y: number): boolean =>
    !padded.some((rect) => x + PROBE > rect.left && x < rect.right && y + PROBE > rect.top && y < rect.bottom);

  const attempts = Math.round((width * height) / AREA_PER_SPRITE);
  const pixels: FieldPixel[] = [];
  for (let attempt = 0; attempt < attempts; attempt++) {
    const rawX = random() * width;
    const rawY = random() * height;
    if (random() > 1 - (rawY / height) * BOTTOM_THINNING) continue;
    if (!isClear(rawX, rawY)) continue;

    const shape = SHAPES[Math.floor(random() * SHAPES.length)];
    const cell = UNIT * (random() < LARGE_CELL_CHANCE ? 2 : 1);
    const toneRoll = random();
    const tone = toneRoll < ACCENT_TONE_CHANCE ? "c" : toneRoll < STRONG_TONE_CHANCE ? "a" : "b";
    const x = Math.round(rawX / UNIT) * UNIT;
    const y = Math.round(rawY / UNIT) * UNIT;
    const d = shape.map(([cx, cy]) => `M${x + cx * cell} ${y + cy * cell}h${cell}v${cell}h-${cell}z`).join("");
    const twinkles = shape.length === 1 && random() < TWINKLE_CHANCE;

    pixels.push({ d, tone, twinkleDelay: twinkles ? Number((random() * MAX_TWINKLE_DELAY_S).toFixed(2)) : null });
  }
  return pixels;
}
