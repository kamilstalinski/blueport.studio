export const COUNT_UP_MS = 900;

/** Value shown after elapsedMs of an ease-out cubic count from 0 to target. */
export function countAt(target: number, elapsedMs: number, durationMs: number): number {
  const progress = Math.min(1, Math.max(0, elapsedMs / durationMs));
  return Math.round(target * (1 - Math.pow(1 - progress, 3)));
}
