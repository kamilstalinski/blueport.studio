import type { CraneRun } from "@/types";
import { DUSK_BANDS, PANORAMA_GRID, panoramaRuns, windowCells } from "@/lib/pixel/panorama";

const toPath = (runs: CraneRun[]): string => runs.map((run) => `M${run.x} ${run.y}h${run.w}v1h-${run.w}z`).join("");

const LIT_PATH = toPath(panoramaRuns("X"));
const SHADE_PATH = toPath(panoramaRuns("o"));
const WINDOWS = windowCells();
const WINDOW_PATHS = [0, 1, 2, 3].map((group) =>
  toPath(WINDOWS.filter((cell) => cell.group === group).map(({ x, y }) => ({ x, y, w: 1 }))),
);

/* two dither rows above each band edge: 50% then 25% of the lower band bleeds into the one above */
const DITHER = 2;
const SKY_TOP = DUSK_BANDS[0].y0 - DITHER;
const { cols, rows } = PANORAMA_GRID;

export function HeroSkyline() {
  return (
    <svg
      className="hero-skyline"
      viewBox={`0 ${SKY_TOP} ${cols} ${rows - SKY_TOP}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <defs>
        {DUSK_BANDS.map(({ tone }) => (
          <g key={tone}>
            <pattern id={`dusk-${tone}-half`} width="2" height="1" patternUnits="userSpaceOnUse">
              <rect className={`hero-dusk-${tone}`} width="1" height="1" />
            </pattern>
            <pattern id={`dusk-${tone}-quarter`} width="4" height="1" patternUnits="userSpaceOnUse">
              <rect className={`hero-dusk-${tone}`} width="1" height="1" />
            </pattern>
          </g>
        ))}
      </defs>
      {DUSK_BANDS.map(({ y0, tone }, i) => (
        <g key={tone}>
          <rect className={`hero-dusk-${tone}`} y={y0} width={cols} height={(DUSK_BANDS[i + 1]?.y0 ?? rows) - y0} />
          <rect fill={`url(#dusk-${tone}-half)`} y={y0 - 1} width={cols} height="1" />
          <rect fill={`url(#dusk-${tone}-quarter)`} y={y0 - 2} width={cols} height="1" />
        </g>
      ))}
      <path className="hero-skyline-lit" d={LIT_PATH} />
      <path className="hero-skyline-shade" d={SHADE_PATH} />
      {WINDOW_PATHS.map((d, group) => (
        <path key={group} className={`hero-window hero-window-${group}`} d={d} />
      ))}
    </svg>
  );
}
