import type { CraneRun } from "@/types";
import { CRANE_GRID, CRANE_HEADS, HEAD_FRAMES, craneRuns, headRuns } from "@/lib/pixel/cranes";

const toPath = (runs: CraneRun[]): string => runs.map((run) => `M${run.x} ${run.y}h${run.w}v1h-${run.w}z`).join("");

const BODY_PATH = toPath(craneRuns("body"));
/** seconds per swing; different per crane so they never move in step */
const SWING = [2.6, 3.2, 2.9] as const;
const HEADS = CRANE_HEADS.map((_, head) => HEAD_FRAMES.map((degrees) => toPath(headRuns(head, degrees))));

export function HeroCranes() {
  return (
    <>
      <svg
        className="hero-cranes"
        viewBox={`0 0 ${CRANE_GRID.cols} ${CRANE_GRID.rows}`}
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        <path d={BODY_PATH} />
        {HEADS.map((frames, head) => (
          <g key={head} className="hero-crane-head">
            {frames.map((d, frame) => (
              <path
                key={frame}
                d={d}
                style={{
                  animationDuration: `${SWING[head]}s`,
                  animationDelay: `${((frame / frames.length - 1) * SWING[head]).toFixed(3)}s`,
                }}
              />
            ))}
          </g>
        ))}
      </svg>
      <div className="hero-quay" aria-hidden="true" />
    </>
  );
}
