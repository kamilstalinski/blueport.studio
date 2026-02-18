"use client";

import Grainient from "@/components/Grainient";

/** Kolory z design systemu (zgodne z :root): ciemne tło + akcent mint (--glow-left / --color-primary) */
const DS = {
  bg: "#09094A",
  bgSecondary: "#03031C",
  /** Odpowiednik --color-primary / --glow-left */
  accent: "#00e5a0",
} as const;

export function GlobalGradientBackground() {
  return (
    <div className='fixed inset-0 -z-10 overflow-hidden' aria-hidden>
      <Grainient
        color1={DS.bg}
        color2={DS.bgSecondary}
        color3={DS.accent}
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
