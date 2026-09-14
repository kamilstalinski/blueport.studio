import type { TileDigit } from "@/lib/pixel/glyphs";
import { cellsToPath, rowsToCells, tileRows } from "@/lib/pixel/raster";

const TILE_SIZE = 9;

interface PixelTileProps {
  digit: TileDigit;
  scale?: number;
}

export function PixelTile({ digit, scale = 4 }: PixelTileProps) {
  return (
    <svg
      className="px-tile"
      viewBox={`0 0 ${TILE_SIZE} ${TILE_SIZE}`}
      width={TILE_SIZE * scale}
      height={TILE_SIZE * scale}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <path fill="currentColor" d={cellsToPath(rowsToCells(tileRows(digit)))} />
    </svg>
  );
}
