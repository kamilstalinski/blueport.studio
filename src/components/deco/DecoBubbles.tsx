import { BUBBLE_ROWS, bitsPath, mirrorRows } from "@/lib/pixel/deco";

const BUBBLE_CELL = 10;
const LEFT_BUBBLE = bitsPath(BUBBLE_ROWS, BUBBLE_CELL);
const RIGHT_BUBBLE = bitsPath(mirrorRows(BUBBLE_ROWS), BUBBLE_CELL);

/* Voices: two pixel speech bubbles behind the quotes. */
export function DecoBubbles() {
  return (
    <div className="px-deco px-deco--bubbles" aria-hidden="true">
      <svg className="deco-bubble b1" viewBox="0 0 160 100" shapeRendering="crispEdges">
        <path fill="currentColor" d={LEFT_BUBBLE} />
      </svg>
      <svg className="deco-bubble b2" viewBox="0 0 160 100" shapeRendering="crispEdges">
        <path fill="currentColor" d={RIGHT_BUBBLE} />
      </svg>
    </div>
  );
}
