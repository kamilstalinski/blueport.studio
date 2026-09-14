import { useEffect, useMemo, useState } from "react";

import { buildTimeline } from "@/lib/hero/buildTimeline";
import type { BuildCycle } from "@/types";

interface UseBuildCycleOptions {
  wireCount: number;
  barCount: number;
  siteCount: number;
  isStill: boolean;
}

export function useBuildCycle({ wireCount, barCount, siteCount, isStill }: UseBuildCycleOptions): BuildCycle {
  const timeline = useMemo(() => buildTimeline(wireCount, barCount), [wireCount, barCount]);
  const [cycle, setCycle] = useState<BuildCycle>({ ...timeline.frames[0], site: 0 });

  useEffect(() => {
    if (isStill) return;
    const { frames, cycleMs } = timeline;
    let index = 0;
    let site = 0;
    let timer: number | undefined;

    const showNextFrame = () => {
      const frame = frames[index];
      setCycle({ ...frame, site });
      const isLast = index === frames.length - 1;
      const delay = isLast ? cycleMs - frame.at : frames[index + 1].at - frame.at;
      index = isLast ? 0 : index + 1;
      if (isLast) site = (site + 1) % siteCount;
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
  }, [timeline, siteCount, isStill]);

  if (isStill) return { ...timeline.frames[timeline.frames.length - 1], site: 0 };
  return cycle;
}
