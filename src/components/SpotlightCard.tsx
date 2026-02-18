"use client";

import React, { useRef, useState, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

const DRIFT_RADIUS = 40;
const DRIFT_SPEED = 0.0003;

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.25)'
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);
  const [driftOffset, setDriftOffset] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    let rafId: number;
    const start = performance.now();
    const tick = () => {
      const t = (performance.now() - start) * DRIFT_SPEED;
      setDriftOffset({
        x: Math.sin(t) * DRIFT_RADIUS,
        y: Math.cos(t * 0.7) * DRIFT_RADIUS
      });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = e => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(0.6);
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      setPosition({ x: rect.width / 2, y: rect.height / 2 });
    }
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const centerX = position.x + driftOffset.x;
  const centerY = position.y + driftOffset.y;

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-8 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${centerX}px ${centerY}px, ${spotlightColor}, transparent 80%)`
        }}
      />
      <div className="relative z-10 h-full min-h-0">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;
