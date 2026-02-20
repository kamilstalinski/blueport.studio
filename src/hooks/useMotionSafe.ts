import { useReducedMotion } from "framer-motion";
import { variants, duration, ease } from "@/constants/animations";

// Zwraca animacje lub ich wersję bez ruchu (tylko opacity)
export function useMotionSafe() {
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
