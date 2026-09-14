import { MARK_RADIUS, markRects, markViewBox, ROG_MARK } from "@/lib/pixel/modularMark";
import { cellsToPath, stackCells } from "@/lib/pixel/raster";
import type { MarkTone } from "@/types";

const WORDMARK = stackCells("blueport", "studio");
const MARK_RECTS = markRects(ROG_MARK);
const SIZES = {
  nav: { mark: 34, scale: 2 },
  footer: { mark: 51, scale: 3 },
} as const;
const TONE_CLASS: Record<MarkTone, string> = { t1: "logo-t1", t2: "logo-t2" };

interface BrandLogoProps {
  size: keyof typeof SIZES;
}

export function BrandLogo({ size }: BrandLogoProps) {
  const { mark, scale } = SIZES[size];

  return (
    <span className="brand-logo">
      <svg viewBox={markViewBox(ROG_MARK)} width={mark} height={mark} aria-hidden="true">
        {MARK_RECTS.map((rect) => (
          <rect
            key={`${rect.x}-${rect.y}`}
            className={TONE_CLASS[rect.tone]}
            x={rect.x}
            y={rect.y}
            width={rect.width}
            height={rect.height}
            rx={MARK_RADIUS}
          />
        ))}
      </svg>
      <svg
        viewBox={`0 0 ${WORDMARK.width} ${WORDMARK.height}`}
        width={WORDMARK.width * scale}
        height={WORDMARK.height * scale}
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        <path className="logo-ink" d={cellsToPath(WORDMARK.top)} />
        <path className="logo-sub" d={cellsToPath(WORDMARK.bottom)} />
      </svg>
    </span>
  );
}
