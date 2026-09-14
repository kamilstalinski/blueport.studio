import { cellsToPath, numberCells } from "@/lib/pixel/raster";

interface PixelNumberProps {
  value: string;
  scale?: number;
}

export function PixelNumber({ value, scale = 5 }: PixelNumberProps) {
  const { ink, accent, width, height } = numberCells(value);

  return (
    <svg
      className="px-num"
      viewBox={`0 0 ${width} ${height}`}
      width={width * scale}
      height={height * scale}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <path className="n-ink" d={cellsToPath(ink)} />
      <path className="n-acc" d={cellsToPath(accent)} />
    </svg>
  );
}
