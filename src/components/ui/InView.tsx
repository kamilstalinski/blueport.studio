"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const IN_VIEW_THRESHOLD = 0.2;
const IN_VIEW_MARGIN = "0px 0px -6% 0px";

interface InViewProps {
  children?: React.ReactNode;
  className?: string;
  lag?: 0 | 1 | 2 | 3;
  decorative?: boolean;
}

/** Marks its box with data-in once it has been seen; CSS decides what that reveals. */
export function InView({ children, className, lag = 0, decorative = false }: InViewProps) {
  const { ref, isInView } = useScrollAnimation({ threshold: IN_VIEW_THRESHOLD, margin: IN_VIEW_MARGIN });

  return (
    <div
      ref={ref}
      className={cn(className)}
      data-lag={lag > 0 ? lag : undefined}
      data-in={isInView ? "" : undefined}
      aria-hidden={decorative ? "true" : undefined}
    >
      {children}
    </div>
  );
}
