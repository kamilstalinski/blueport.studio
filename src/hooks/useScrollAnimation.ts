import { useInView } from "framer-motion";
import { useRef } from "react";

type UseScrollAnimationOptions = {
  threshold?: number;
  once?: boolean;
  margin?: string;
};

const DEFAULT_MARGIN = "0px 0px -80px 0px" as const;

export type UseScrollAnimationReturn = {
  ref: React.RefObject<HTMLDivElement | null>;
  isInView: boolean;
  animate: "visible" | "hidden";
};

export function useScrollAnimation(
  options: UseScrollAnimationOptions = {}
): UseScrollAnimationReturn {
  const {
    threshold = 0.15,
    once = true,
    margin = DEFAULT_MARGIN,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const opts = {
    once,
    margin,
    amount: threshold,
  } as Parameters<typeof useInView>[1];
  const isInView = useInView(ref, opts);

  return { ref, isInView, animate: isInView ? "visible" : "hidden" };
}
