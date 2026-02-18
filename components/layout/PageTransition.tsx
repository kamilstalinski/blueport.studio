"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { TransitionOverlay } from "./TransitionOverlay";

const FADE_DURATION = 0.2;
const EASE = [0.76, 0, 0.24, 1] as const;
const COLUMN_STAGGER_TOTAL = 0.1;
const OVERLAY_DURATION_DESKTOP = 0.22;
const OVERLAY_DURATION_MOBILE = 0.18;

function useOverlayDuration(): number {
  const [duration, setDuration] = useState(OVERLAY_DURATION_DESKTOP);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setDuration(mq.matches ? OVERLAY_DURATION_MOBILE : OVERLAY_DURATION_DESKTOP);
    const handler = () =>
      setDuration(mq.matches ? OVERLAY_DURATION_MOBILE : OVERLAY_DURATION_DESKTOP);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return duration;
}

type PageTransitionProps = {
  children: ReactNode;
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion() ?? false;
  const overlayDuration = useOverlayDuration();

  const [contentVisible, setContentVisible] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [overlayPhase, setOverlayPhase] = useState<"in" | "out">("in");
  const [handledPath, setHandledPath] = useState(pathname);

  if (pathname !== handledPath) {
    setHandledPath(pathname);
    setContentVisible(false);
    setShowOverlay(true);
    setOverlayPhase("in");
  }

  useEffect(() => {
    if (contentVisible) return;

    window.scrollTo({ top: 0, behavior: "auto" });

    if (reducedMotion) {
      const t = requestAnimationFrame(() => setContentVisible(true));
      return () => cancelAnimationFrame(t);
    }

    setShowOverlay(true);
    setOverlayPhase("in");

    const fullIn = (overlayDuration + COLUMN_STAGGER_TOTAL) * 1000;
    const fullOut = fullIn + (overlayDuration + COLUMN_STAGGER_TOTAL) * 1000;

    const overlayIn = window.setTimeout(() => {
      setOverlayPhase("out");
    }, fullIn);

    const overlayOut = window.setTimeout(() => {
      setShowOverlay(false);
      setContentVisible(true);
    }, fullOut);

    return () => {
      window.clearTimeout(overlayIn);
      window.clearTimeout(overlayOut);
    };
  }, [contentVisible, reducedMotion, overlayDuration]);

  return (
    <>
      <motion.div
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={
          contentVisible
            ? { duration: FADE_DURATION, ease: EASE }
            : { duration: 0 }
        }
        className="min-h-full"
        style={{ willChange: contentVisible ? "auto" : "opacity" }}
      >
        {children}
      </motion.div>

      {showOverlay && (
        <TransitionOverlay
          phase={overlayPhase}
          reducedMotion={reducedMotion}
          duration={overlayDuration}
        />
      )}
    </>
  );
}
