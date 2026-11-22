import { useEffect, useMemo, useState } from "react";

import { buildTimeline } from "@/lib/hero/buildTimeline";
import type { BuildCycle } from "@/types";

interface UseBuildCycleOptions {
  /** wireframe size of each site in turn: every site builds its own layout */
  counts: readonly { wireCount: number; barCount: number }[];
  isStill: boolean;
}

export function useBuildCycle({ counts, isStill }: UseBuildCycleOptions): BuildCycle {
  const timelines = useMemo(() => counts.map((c) => buildTimeline(c.wireCount, c.barCount)), [counts]);
  const [cycle, setCycle] = useState<BuildCycle>({ ...timelines[0].frames[0], site: 0 });

  useEffect(() => {
    if (isStill) return;
    let index = 0;
    let site = 0;
    let timer: number | undefined;

    const showNextFrame = () => {
      const { frames, cycleMs } = timelines[site];
      const frame = frames[index];
      setCycle({ ...frame, site });
      const isLast = index === frames.length - 1;
      const delay = isLast ? cycleMs - frame.at : frames[index + 1].at - frame.at;
      index = isLast ? 0 : index + 1;
      if (isLast) site = (site + 1) % timelines.length;
      timer = window.setTimeout(showNextFrame, delay);
    };

    /* pause while the tab is hidden, resume from the next frame */
    const handleVisibilityChange = () => {
      window.clearTimeout(timer);
      if (!document.hidden) timer = window.setTimeout(showNextFrame, 0);
    };

    timer = window.setTimeout(showNextFrame, 0);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [timelines, isStill]);

  const still = timelines[0].frames;
  if (isStill) return { ...still[still.length - 1], site: 0 };
  return cycle;
}
