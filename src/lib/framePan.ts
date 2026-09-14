import type { FramePan } from "@/types";

const PX_PER_SECOND = 260;
const MAX_SECONDS = 26;
const MIN_OVERFLOW_PX = 8;

/** How far a full-page preview must travel inside its pane, and how long that takes. */
export function framePan(paneWidth: number, paneHeight: number, imageWidth: number, imageHeight: number): FramePan | null {
  const renderedHeight = paneWidth * (imageHeight / imageWidth);
  const shift = paneHeight - renderedHeight;
  if (shift >= -MIN_OVERFLOW_PX) return null;
  return {
    shift: Math.round(shift),
    seconds: Number(Math.min(MAX_SECONDS, Math.abs(shift) / PX_PER_SECOND).toFixed(1)),
  };
}
