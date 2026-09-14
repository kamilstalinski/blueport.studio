import { CRANE_GRID, craneRuns } from "@/lib/pixel/cranes";

const CRANE_PATH = craneRuns().map((run) => `M${run.x} ${run.y}h${run.w}v1h-${run.w}z`).join("");

export function HeroCranes() {
  return (
    <>
      <svg
        className="hero-cranes"
        viewBox={`0 0 ${CRANE_GRID.cols} ${CRANE_GRID.rows}`}
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        <path d={CRANE_PATH} />
      </svg>
      <div className="hero-quay" aria-hidden="true" />
    </>
  );
}
