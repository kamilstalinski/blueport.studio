"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

/* loaded after hydration so the shader never competes with the h1 for LCP */
const Grainient = dynamic(() => import("@/components/backgrounds/Grainient"), { ssr: false });

/* the owner's Grainient settings, its orange ramp translated into the brand's blues and held dark: the brightest
   stop (#1A2F7E) keeps the grey body text at 5.5:1 wherever the bands pass. Sygnał stays out: never on Kobalt */
const COLORS = ["#05080D", "#0A0F17", "#101A3A", "#16286A", "#1A2F7E"];
const MAX_BLUR_PX = 28;

/** The homepage's ground: React Bits Grainient fixed behind every section, stirred by the cursor. It blurs as the
    hero scrolls away (sharp at the top, fully soft once the second section fills the screen), under a dark vignette
    that keeps the colour off the page edges. */
export function PageGrainient() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const hero = document.getElementById("hero");
    if (!layer || !hero) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = Math.min(1, Math.max(0, window.scrollY / Math.max(1, hero.offsetHeight)));
      layer.style.setProperty("--bg-blur", `${(progress * MAX_BLUR_PX).toFixed(1)}px`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={layerRef} className="bp-page-bg" aria-hidden="true">
      <div className="bp-page-bg__paint">
        <Grainient
          colors={COLORS}
          angle={165}
          flow={2}
          silk={0.81}
          grainAmount={0.1}
          bands={2}
          scale={1.95}
          speed={1.25}
          grainSize={1}
        />
      </div>
    </div>
  );
}
