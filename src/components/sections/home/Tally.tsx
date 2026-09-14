"use client";

import { useEffect, useState } from "react";

import { PixelNumber } from "@/components/brand/PixelNumber";
import { TALLY } from "@/constants/process";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { COUNT_UP_MS, countAt } from "@/lib/countUp";

type TallyItemProps = (typeof TALLY)[number];

function TallyItem({ count, prefix, suffix, label }: TallyItemProps) {
  const isStill = usePrefersReducedMotion();
  const { ref, isInView } = useScrollAnimation({ threshold: 0.2 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView || isStill) return;
    let frame = 0;
    const startedAt = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startedAt;
      setValue(countAt(count, elapsed, COUNT_UP_MS));
      if (elapsed < COUNT_UP_MS) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [count, isInView, isStill]);

  const shown = isStill ? count : value;

  return (
    <div ref={ref}>
      <dt>
        <PixelNumber value={`${prefix}${shown}${suffix}`} />
        <span className="sr-only">{`${prefix}${count}${suffix}`}</span>
      </dt>
      <dd>{label}</dd>
    </div>
  );
}

export function Tally() {
  return (
    <dl className="tally">
      {TALLY.map((item) => (
        <TallyItem key={item.label} {...item} />
      ))}
    </dl>
  );
}
