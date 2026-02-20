import { useInView } from "framer-motion";
import { useRef } from "react";

interface UseScrollAnimationOptions {
  threshold?: number; // ile elementu musi być widoczne (0-1)
  once?: boolean; // animuj tylko raz (domyślnie true)
  margin?: string; // rootMargin dla triggera (np. "0px 0px -80px 0px")
}

const defaultMargin = "0px 0px -80px 0px" as const;

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.15,
    once = true,
    margin = defaultMargin,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const opts = {
    once,
    margin: margin ?? defaultMargin,
    amount: threshold,
  };
  const isInView = useInView(ref, opts as Parameters<typeof useInView>[1]);

  return { ref, isInView, animate: isInView ? "visible" : "hidden" };
}
