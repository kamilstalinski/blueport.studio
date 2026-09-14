import { bitsPath, PLUS_ROWS } from "@/lib/pixel/deco";

const PLUS_CELL = 6;
const PLUS_PATH = bitsPath(PLUS_ROWS, PLUS_CELL);
const PLUS_COUNT = 4;

/* Power-ups around the call to action; the third one blinks a few times when the band is seen. */
export function DecoPlus() {
  return (
    <>
      {Array.from({ length: PLUS_COUNT }, (_, index) => (
        <svg key={index} className="deco-plus" viewBox="0 0 30 30" shapeRendering="crispEdges">
          <path fill="currentColor" d={PLUS_PATH} />
        </svg>
      ))}
    </>
  );
}
