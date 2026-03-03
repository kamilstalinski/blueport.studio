import { useReducedMotion } from "framer-motion";
import { variants, duration, ease } from "@/constants/animations";

type SimpleVariant = {
  hidden: { opacity: number };
  visible: { opacity: number };
};

export type UseMotionSafeReturn = {
  variants: typeof variants | {
    fadeUp: SimpleVariant;
    fadeIn: SimpleVariant;
    scaleIn: SimpleVariant;
    stagger: (typeof variants)["stagger"];
    staggerHero: (typeof variants)["staggerHero"];
    slideRight: SimpleVariant;
  };
  duration: Record<keyof typeof duration, number>;
  ease: typeof ease;
};

export function useMotionSafe(): UseMotionSafeReturn {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return {
      variants: {
        fadeUp: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
        fadeIn: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
        scaleIn: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
        stagger: variants.stagger,
        staggerHero: variants.staggerHero,
        slideRight: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
      },
      duration: { ...duration, slow: 0.2, hero: 0.3 },
      ease,
    };
  }

  return { variants, duration, ease };
}
