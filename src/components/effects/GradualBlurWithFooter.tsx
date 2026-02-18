"use client";

import { useState, useEffect } from "react";
import GradualBlur from "@/components/effects/GradualBlur";

const FOOTER_ID = "site-footer";

export function GradualBlurWithFooter() {
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    const el = document.getElementById(FOOTER_ID);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterInView(entry.isIntersecting),
      { threshold: 0.1, rootMargin: "0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <GradualBlur
      target="page"
      position="bottom"
      height="7rem"
      strength={1}
      divCount={6}
      curve="bezier"
      exponential
      opacity={1}
      zIndex={20}
      disabled={footerInView}
    />
  );
}
