"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Grainient } from "@/components/Grainient";

function getCssVar(name: string): string {
  if (typeof document === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/** Fallbacki na SSR / przed hydracją (zgodne z globals.css) */
const FALLBACK = {
  color1: "#4a3880",
  color2: "#03031C",
  color3: "#3b82f6",
};

export function GlobalGradientBackground() {
  const [colors, setColors] = useState<{ color1: string; color2: string; color3: string }>(
    FALLBACK
  );

  const { scrollY } = useScroll();
  const meshY = useTransform(scrollY, [0, 1000], [0, -120]);

  const readColors = () => {
    setColors({
      color1: getCssVar("--color-gradient-mesh-1") || FALLBACK.color1,
      color2: getCssVar("--color-gradient-mesh-2") || FALLBACK.color2,
      color3: getCssVar("--color-primary") || FALLBACK.color3,
    });
  };

  useEffect(() => {
    readColors();
    window.addEventListener("blueport-accent-change", readColors);
    return () => window.removeEventListener("blueport-accent-change", readColors);
  }, []);

  return (
    <div
      className="fixed left-0 right-0 top-0 -z-10 overflow-hidden bg-[var(--color-gradient-mesh-2,#03031C)]"
      style={{
        height: "calc(100dvh + 30vh)",
        minHeight: "100dvh",
        willChange: "transform",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
      aria-hidden
    >
      {/* Rozszerzenie powyżej i poniżej viewportu — subtelny parallax przy scrollu */}
      <motion.div
        style={{
          position: "absolute",
          top: "-20vh",
          left: 0,
          right: 0,
          width: "100%",
          height: "calc(100% + 40vh)",
          minHeight: "100dvh",
          y: meshY,
        }}
      >
        <Grainient
          color1={colors.color1}
          color2={colors.color2}
          color3={colors.color3}
          timeSpeed={0.1}
          colorBalance={0.1}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={15}
          blendAngle={0}
          blendSoftness={0.01}
          rotationAmount={10}
          noiseScale={10}
          grainAmount={0}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={0.5}
          saturation={0.5}
          centerX={0}
          centerY={0}
          zoom={0.5}
          className="absolute inset-0 h-full w-full"
          resizeDebounceMs={120}
        />
      </motion.div>
    </div>
  );
}
