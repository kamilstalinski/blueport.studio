"use client";

import { useEffect, useRef, useState } from "react";

import { pixelField } from "@/lib/pixel/pixelField";
import { cn } from "@/lib/utils";
import type { FieldPixel, TrailRect } from "@/types";

const TONE_CLASS: Record<FieldPixel["tone"], string> = { a: "hp-a", b: "hp-b", c: "hp-c" };

type Field = { width: number; height: number; pixels: FieldPixel[] };

/** Soft pixel field behind a section; measured from the real layout so copy stays clear. */
export function PixelField() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [field, setField] = useState<Field | null>(null);

  useEffect(() => {
    const host = svgRef.current?.parentElement;
    if (!host) return;

    const observer = new ResizeObserver(() => {
      const bounds = host.getBoundingClientRect();
      const keepOut: TrailRect[] = [...host.querySelectorAll<HTMLElement>("[data-keep-out]")].map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          left: rect.left - bounds.left,
          top: rect.top - bounds.top,
          right: rect.right - bounds.left,
          bottom: rect.bottom - bounds.top,
        };
      });
      setField({ width: bounds.width, height: bounds.height, pixels: pixelField({ width: bounds.width, height: bounds.height, keepOut }) });
    });
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      className="px-field"
      viewBox={field ? `0 0 ${field.width} ${field.height}` : undefined}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {field?.pixels.map((pixel, index) => (
        <path
          key={index}
          className={cn(TONE_CLASS[pixel.tone], pixel.twinkleDelay !== null && "tw")}
          style={pixel.twinkleDelay === null ? undefined : { animationDelay: `${pixel.twinkleDelay}s` }}
          d={pixel.d}
        />
      ))}
    </svg>
  );
}
