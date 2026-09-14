import { TETRO_CELL, TETRO_COLS, TETRO_FALLING, TETRO_REST, TETRO_ROWS, TETRO_TONES, tetroPath } from "@/lib/pixel/deco";

/* Building blocks: structure is what the section argues for; the last piece lands on arrival. */
export function DecoTetro() {
  return (
    <svg className="deco-tetro" viewBox={`0 0 ${TETRO_COLS * TETRO_CELL} ${TETRO_ROWS * TETRO_CELL}`} shapeRendering="crispEdges">
      {TETRO_REST.map((piece, index) => (
        <path key={index} d={tetroPath(piece)} fill="currentColor" opacity={TETRO_TONES[index]} />
      ))}
      <path className="deco-drop" d={tetroPath(TETRO_FALLING)} />
    </svg>
  );
}
