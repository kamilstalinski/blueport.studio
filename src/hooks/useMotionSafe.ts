import { useReducedMotion } from "framer-motion";
import { variants, duration, ease } from "@/constants/animations";

type SimpleVariant = {
  hidden: { opacity: number };
  visible: { opacity: number };
};

type StaggerVariant = {
  hidden: {};
  visible: {
    transition: {
      staggerChildren: number;
      delayChildren: number;
    };
  };
};

export type UseMotionSafeReturn = {
  variants: typeof variants | {
    fadeUp: SimpleVariant;
    fadeIn: SimpleVariant;
    scaleIn: SimpleVariant;
    stagger: StaggerVariant;
    staggerHero: StaggerVariant;
    slideRight: SimpleVariant;
  };
  duration: Record<keyof typeof duration, number>;
  ease: typeof ease;
};

export function useMotionSafe(): UseMotionSafeReturn {
  const shouldReduce = useReducedMotion();

  const isSlowConnection =
    typeof navigator !== "undefined" &&
    "connection" in navigator &&
    (() => {
      type ConnectionInfo = {
        effectiveType?: string;
        saveData?: boolean;
      };

      const connection = (
        navigator as Navigator & { connection?: ConnectionInfo | undefined }
      ).connection;

      const effectiveType = connection?.effectiveType;
      const saveData = connection?.saveData === true;

      const is2g =
        effectiveType === "2g" ||
        effectiveType === "slow-2g" ||
        effectiveType === "3g";

      return is2g || saveData;
    })();

  if (shouldReduce || isSlowConnection) {
    const reducedStagger = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0,
          delayChildren: 0,
        },
      },
    };

    return {
      variants: {
        fadeUp: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
        fadeIn: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
        scaleIn: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
        stagger: reducedStagger,
        staggerHero: reducedStagger,
        slideRight: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
      },
      duration: {
        ...duration,
        instant: 0,
        fast: 0,
        base: 0,
        slow: 0,
        hero: 0,
      },
      ease,
    };
  }

  return { variants, duration, ease };
}
