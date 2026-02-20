"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ease } from "@/constants/animations";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
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
      </motion.div>
    </AnimatePresence>
  );
}
