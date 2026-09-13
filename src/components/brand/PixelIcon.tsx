import { PX_ICONS, type PixelIconName } from "@/lib/pixel/glyphs";
import { cellsToPath, rowsToCells } from "@/lib/pixel/raster";

interface PixelIconProps {
  name: PixelIconName;
  scale?: number;
}

export function PixelIcon({ name, scale = 2 }: PixelIconProps) {
  const rows = PX_ICONS[name];
  const cols = rows[0].length;

  return (
    <span className="px-ico" aria-hidden="true">
      <svg viewBox={`0 0 ${cols} ${rows.length}`} width={cols * scale} height={rows.length * scale} shapeRendering="crispEdges">
        <path fill="currentColor" d={cellsToPath(rowsToCells(rows))} />
      </svg>
    </span>
  );
}
