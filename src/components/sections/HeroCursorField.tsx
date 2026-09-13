"use client";

import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { addAmbient, addPointer, createTrailGrid, stepTrail, TRAIL_CELL } from "@/lib/hero/cursorTrail";
import type { TrailCell, TrailGrid, TrailRect } from "@/types";

const AMBIENT_EVERY_MS = 260;
const MAX_FRAME_MS = 64;
const MAX_DPR = 2;
const CELL_INSET = 3;
const MAX_ALPHA = 0.9;
const NEIGHBOUR_ALPHA = 0.45;

export function HeroCursorField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isStill = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (isStill || !canvas || !hero || !context) return;

    const accent = getComputedStyle(document.documentElement).getPropertyValue("--cobalt").trim();
    let cells: TrailCell[] = [];
    let grid: TrailGrid = createTrailGrid(0, 0, []);
    let dpr = 1;
    let frame = 0;
    let lastFrameAt = 0;
    let sinceAmbient = 0;
    let isOnScreen = true;

    const measure = () => {
      dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1);
      const bounds = hero.getBoundingClientRect();
      canvas.width = Math.round(bounds.width * dpr);
      canvas.height = Math.round(bounds.height * dpr);
      const keepOut: TrailRect[] = [...hero.querySelectorAll<HTMLElement>("[data-keep-out]")].map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          left: rect.left - bounds.left,
          top: rect.top - bounds.top,
          right: rect.right - bounds.left,
          bottom: rect.bottom - bounds.top,
        };
      });
      grid = createTrailGrid(bounds.width, bounds.height, keepOut);
    };

    const draw = () => {
      const size = (TRAIL_CELL - CELL_INSET * 2) * dpr;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = accent;
      for (const cell of cells) {
        context.globalAlpha = Math.min(MAX_ALPHA, cell.life) * (cell.accent ? 1 : NEIGHBOUR_ALPHA);
        context.fillRect((cell.x * TRAIL_CELL + CELL_INSET) * dpr, (cell.y * TRAIL_CELL + CELL_INSET) * dpr, size, size);
      }
      context.globalAlpha = 1;
    };

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const elapsed = lastFrameAt ? Math.min(MAX_FRAME_MS, now - lastFrameAt) : 0;
      lastFrameAt = now;
      if (!isOnScreen || document.hidden) return;
      sinceAmbient += elapsed;
      if (sinceAmbient >= AMBIENT_EVERY_MS) {
        sinceAmbient = 0;
        cells = addAmbient(cells, grid, Math.random);
      }
      cells = stepTrail(cells, elapsed);
      draw();
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect();
      cells = addPointer(cells, grid, event.clientX - bounds.left, event.clientY - bounds.top, Math.random);
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(hero);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isOnScreen = entry.isIntersecting;
    });
    visibilityObserver.observe(hero);
    hero.addEventListener("pointermove", handlePointerMove);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      hero.removeEventListener("pointermove", handlePointerMove);
    };
  }, [isStill]);

  return <canvas ref={canvasRef} className="hero-cursor" aria-hidden="true" />;
}
