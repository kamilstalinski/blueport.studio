"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { m } from "framer-motion";
import { ease } from "@/constants/animations";

export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <m.div
      style={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.35,
        ease: ease.smooth,
      }}
    >
      {children}
    </m.div>
  );
}
