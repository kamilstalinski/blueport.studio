"use client";

import { useEffect, useState } from "react";
import Grainient from "@/components/Grainient";

function getCssVar(name: string): string {
  if (typeof document === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/** Fallbacki na SSR / przed hydracją (zgodne z globals.css) */
const FALLBACK = {
  color1: "#09094A",
  color2: "#03031C",
  color3: "#00e5a0",
};

export function GlobalGradientBackground() {
  const [colors, setColors] = useState<{ color1: string; color2: string; color3: string }>(FALLBACK);

  useEffect(() => {
    setColors({
      color1: getCssVar("--color-gradient-mesh-1") || FALLBACK.color1,
      color2: getCssVar("--color-gradient-mesh-2") || FALLBACK.color2,
      color3: getCssVar("--color-primary") || FALLBACK.color3,
    });
  }, []);

  return (
    <div className='fixed inset-0 -z-10 overflow-hidden' aria-hidden>
      <Grainient
        color1={colors.color1}
        color2={colors.color2}
        color3={colors.color3}
        timeSpeed={2.5}
        colorBalance={0}
        warpStrength={1}
        warpFrequency={10}
        warpSpeed={0.35}
        warpAmplitude={50}
        blendAngle={-45}
        blendSoftness={0}
        rotationAmount={180}
        noiseScale={0}
        grainAmount={0}
        grainScale={2}
        grainAnimated={false}
        contrast={1.2}
        gamma={1}
        saturation={1}
        centerX={0}
        centerY={0}
        zoom={0.9}
        className='absolute inset-0 h-full w-full'
      />
    </div>
  );
}
