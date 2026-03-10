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

/** Obręcze SVG: [promień, stroke-opacity] — jasność maleje od wewnętrznej do zewnętrznej. */
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
 * Po 2 ikony na każdej z 3 zewnętrznych obręczy (200, 270, 360 px).
 * Ikony są rozstawione o 180° na jednej obręczy i przesunięte o 60° między obręczami
 * → środek każdej ikony leży dokładnie na pierścieniu.
 */
const ORBIT_ITEMS: OrbitItem[] = [
  { angle: 30,  radius: 200, icon: Globe,        label: "Strony www" },
  { angle: 210, radius: 200, icon: ShoppingCart,  label: "Sklepy online" },
  { angle: 120, radius: 270, icon: Code2,         label: "Next.js / React" },
  { angle: 300, radius: 270, icon: Zap,           label: "Błyskawiczny load" },
  { angle: 60,  radius: 360, icon: Search,        label: "SEO on-page" },
  { angle: 240, radius: 360, icon: Smartphone,    label: "Mobile first" },
];

function getPosition(angle: number, radius: number): { x: number; y: number } {
  const rad = (angle * Math.PI) / 180;
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  };
}

const ORBIT_DURATION = 60;

export function HeroVisual(): React.ReactElement {
  const shouldReduceMotion = useReducedMotion();
  const noMotion = shouldReduceMotion === true;

  return (
    <div className={styles.visualRoot}>
      {/* Glow radialny — pod wszystkim */}
      <div className={styles.radialGlow} aria-hidden />

      {/* Wypełniony pierścień (r 130→200) — SVG dla ostrych, anty-aliasowanych obwódek */}
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
              Gradient offset = % promienia (200px):
              64% = 128px, 65% = 130px, 99% = 198px, 100% = 200px
            */}
            <radialGradient id="ringFillGrad" cx="50%" cy="50%" r="50%">
              <stop offset="64%" stopColor="var(--color-primary)" stopOpacity="0" />
              <stop offset="65%" stopColor="var(--color-primary)" stopOpacity="0.22" />
              <stop offset="99%" stopColor="var(--color-primary)" stopOpacity="0.16" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Wypełnienie donut */}
          <rect width="400" height="400" fill="url(#ringFillGrad)" />
          {/* Wewnętrzna obwódka (r=129 = środek strefy 128–130) */}
          <circle cx="200" cy="200" r="129" fill="none" stroke="var(--color-primary)" strokeOpacity="0.62" strokeWidth="2" />
          {/* Zewnętrzna obwódka (r=199 = środek strefy 198–200) */}
          <circle cx="200" cy="200" r="199" fill="none" stroke="var(--color-primary)" strokeOpacity="0.62" strokeWidth="2" />
        </svg>
      </div>

      {/* Obręcze — jeden SVG z anty-aliasowanymi okręgami (bez pikselizacji) */}
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

      {/* Etykieta „4+ lat doświadczenia” */}
      <div className={styles.heroLabelWrapper} aria-hidden>
        <div className={styles.heroLabel}>
          <span className={styles.heroLabelValue}>4+</span>
          <span className={styles.heroLabelText}>lat doświadczenia</span>
        </div>
      </div>

      {/* ── Orbiting system ──
          Zajmuje cały visualRoot (100% × 100%), obraca się względem swojego środka.
          Framer Motion NIE używa tu translate, więc nie ma konfliktu z CSS. */}
      <motion.div
        className={styles.orbitSystem}
        animate={noMotion ? undefined : { rotate: 360 }}
        transition={
          noMotion
            ? { duration: 0 }
            : { duration: ORBIT_DURATION, repeat: Infinity, ease: "linear" }
        }
        aria-hidden
      >
        {ORBIT_ITEMS.map((item) => {
          const pos = getPosition(item.angle, item.radius);
          return (
            <motion.div
              key={item.label}
              className={styles.orbitIcon}
              style={{
                left: `calc(50% + ${pos.x}px - 22px)`,
                top:  `calc(50% + ${pos.y}px - 22px)`,
              }}
              title={item.label}
              animate={noMotion ? undefined : { rotate: -360 }}
              transition={
                noMotion
                  ? { duration: 0 }
                  : { duration: ORBIT_DURATION, repeat: Infinity, ease: "linear" }
              }
            >
              <item.icon size={18} className="text-white/75" aria-hidden />
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Logo centrum ── */}
      <div className={styles.logoCore} aria-hidden>
        <Image src="/circle-logo.svg" alt="" width={200} height={200} />
      </div>
    </div>
  );
}
