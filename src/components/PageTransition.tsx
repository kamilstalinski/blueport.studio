"use client";

import { AnimatePresence, m } from "framer-motion";
import { usePathname } from "next/navigation";
import { ease } from "@/constants/animations";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <m.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.4, ease: ease.gentle },
        }}
        exit={{
          opacity: 0,
          transition: { duration: 0.25, ease: ease.gentle },
        }}
      >
        {children}
      </m.div>
    </AnimatePresence>
  );
}
