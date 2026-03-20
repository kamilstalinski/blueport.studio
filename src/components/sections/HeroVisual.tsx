"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Globe,
  ShoppingCart,
  Code2,
  Zap,
  Search,
  Smartphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import styles from "./HeroVisual.module.css";

/** SVG ring definitions: [radius, stroke-opacity] — opacity decreases from inner to outer. */
const PULSE_RINGS: readonly [number, number][] = [
  [270, 0.48],
  [360, 0.30],
  [450, 0.14],
] as const;

interface OrbitItem {
  angle: number;
  radius: number;
  icon: LucideIcon;
  label: string;
}

/**
 * Two icons on each of the three outer rings (200, 270, 360px).
 * Icons are spaced 180° apart on a ring and offset by 60° between rings
 * so each icon center lands exactly on its ring.
 */
const ORBIT_ITEMS: OrbitItem[] = [
  { angle: 30,  radius: 200, icon: Globe,        label: "Strony www" },
  { angle: 210, radius: 200, icon: ShoppingCart,  label: "Sklepy online" },
  { angle: 120, radius: 270, icon: Code2,         label: "Next.js / React" },
  { angle: 300, radius: 270, icon: Zap,           label: "Błyskawiczny load" },
  { angle: 60,  radius: 360, icon: Search,        label: "SEO on-page" },
  { angle: 240, radius: 360, icon: Smartphone,    label: "Mobile first" },
];

/** Circular position — rounded to integers to avoid hydration mismatches (Math.cos/sin differ server vs client). */
function getPosition(angle: number, radius: number): { x: number; y: number } {
  const rad = (angle * Math.PI) / 180;
  return {
    x: Math.round(Math.cos(rad) * radius),
    y: Math.round(Math.sin(rad) * radius),
  };
}

/** Orbit durations (seconds) — each icon runs at a different speed. */
const ORBIT_DURATIONS = [42, 52, 58, 68, 76, 88] as const;

export function HeroVisual(): React.ReactElement {
  const shouldReduceMotion = useReducedMotion();
  const noMotion = shouldReduceMotion === true;

  return (
    <div className={styles.visualRoot}>
      {/* Radial glow — behind everything */}
      <div className={styles.radialGlow} aria-hidden />

      {/* Filled ring (r 130→200) — SVG for crisp anti-aliased strokes */}
      <div className={styles.ringFillWrapper} aria-hidden>
        <svg
          className={styles.ringFillSvg}
          width="400"
          height="400"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/*
              Gradient offset = % of radius (200px):
              64% = 128px, 65% = 130px, 99% = 198px, 100% = 200px
            */}
            <radialGradient id="ringFillGrad" cx="50%" cy="50%" r="50%">
              <stop offset="64%" stopColor="var(--color-primary)" stopOpacity="0" />
              <stop offset="65%" stopColor="var(--color-primary)" stopOpacity="0.22" />
              <stop offset="99%" stopColor="var(--color-primary)" stopOpacity="0.16" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Donut fill */}
          <rect width="400" height="400" fill="url(#ringFillGrad)" />
          {/* Inner stroke (r=129 = center of the 128–130 band) */}
          <circle cx="200" cy="200" r="129" fill="none" stroke="var(--color-primary)" strokeOpacity="0.62" strokeWidth="2" />
          {/* Outer stroke (r=199 = center of the 198–200 band) */}
          <circle cx="200" cy="200" r="199" fill="none" stroke="var(--color-primary)" strokeOpacity="0.62" strokeWidth="2" />
        </svg>
      </div>

      {/* Rings — a single SVG with anti-aliased circles (no pixelation) */}
      <svg
        className={styles.ringsSvg}
        width="900"
        height="900"
        viewBox="0 0 900 900"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {PULSE_RINGS.map(([r, opacity]) => (
          <circle
            key={r}
            cx="450"
            cy="450"
            r={r}
            fill="none"
            stroke="var(--color-primary)"
            strokeOpacity={opacity}
            strokeWidth="1.5"
          />
        ))}
      </svg>

      {/* "4+ years of experience" label */}
      <div className={styles.heroLabelWrapper} aria-hidden>
        <div className={styles.heroLabel}>
          <span className={styles.heroLabelValue}>4+</span>
          <span className={styles.heroLabelText}>lat doświadczenia</span>
        </div>
        <div className={styles.heroLabelProjects}>
          <span className={styles.heroLabelValue}>10+</span>
          <span className={styles.heroLabelText}>zrealizowanych projektów</span>
        </div>
        <div className={styles.heroLabelTime}>
          <span className={styles.heroLabelValue}>1–2 tyg.</span>
          <span className={styles.heroLabelText}>średni czas realizacji</span>
        </div>
      </div>

      {/* Each icon has its own orbit speed (counter-rotate keeps it upright) */}
      {ORBIT_ITEMS.map((item, i) => {
        const pos = getPosition(item.angle, item.radius);
        const duration = ORBIT_DURATIONS[i];
        return (
          <motion.div
            key={item.label}
            className={styles.orbitSystem}
            animate={noMotion ? undefined : { rotate: 360 }}
            transition={
              noMotion
                ? { duration: 0 }
                : { duration, repeat: Infinity, ease: "linear" }
            }
            aria-hidden
          >
            <motion.div
              className={styles.orbitIcon}
              style={{
                left: `calc(50% + ${pos.x}px - 22px)`,
                top: `calc(50% + ${pos.y}px - 22px)`,
              }}
              title={item.label}
              animate={noMotion ? undefined : { rotate: -360 }}
              transition={
                noMotion
                  ? { duration: 0 }
                  : { duration, repeat: Infinity, ease: "linear" }
              }
            >
              <item.icon size={18} className="text-white/75" aria-hidden />
            </motion.div>
          </motion.div>
        );
      })}

      {/* ── Center logo ── */}
      <div className={styles.logoCore} aria-hidden>
        <Image src="/circle-logo.svg" alt="" width={200} height={200} />
      </div>
    </div>
  );
}
