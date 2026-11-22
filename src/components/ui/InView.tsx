"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

export const IN_VIEW_THRESHOLD = 0.2;
export const IN_VIEW_MARGIN = "0px 0px -6% 0px";

interface InViewProps {
  children?: React.ReactNode;
  className?: string;
  lag?: 0 | 1 | 2 | 3;
  decorative?: boolean;
  /** rootMargin; a larger negative bottom margin waits until the block is well inside the screen */
  margin?: string;
  /** share of the block that must be inside the margin; 0 for tall groups that should start at their top edge */
  threshold?: number;
}

/** Marks its box with data-in once it has been seen; CSS decides what that reveals. */
export function InView({ children, className, lag = 0, decorative = false, margin = IN_VIEW_MARGIN, threshold = IN_VIEW_THRESHOLD }: InViewProps) {
  const { ref, isInView } = useScrollAnimation({ threshold, margin });

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
