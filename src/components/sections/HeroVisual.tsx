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

/** Tylko zewnętrzne obręcze (pierwsza i druga usunięte — zastąpione wypełnionym pierścieniem z borderem). */
const PULSE_RADII = [270, 360] as const;

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

      {/* Wypełniony pierścień (r 130→200) z borderem wewnętrznym i zewnętrznym w kolorze obręczy; pulsuje */}
      <div className={styles.ringFillWrapper} aria-hidden>
        <motion.div
          className={styles.ringFillInner}
          animate={
            noMotion ? undefined : { scale: [0.97, 1.02, 0.97], opacity: [0.85, 0.4, 0.85] }
          }
          transition={
            noMotion
              ? { duration: 0 }
              : { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0 }
          }
        />
      </div>

      {/* ── Pulse rings ──
          Używamy wrappera dla pozycjonowania i osobnego motion.div dla animacji,
          żeby Framer Motion nie nadpisał CSS transform: translate(-50%, -50%). */}
      {PULSE_RADII.map((r, i) => (
        <div
          key={r}
          className={styles.pulseRingWrapper}
          style={{ width: r * 2, height: r * 2 }}
          aria-hidden
        >
          <motion.div
            className={styles.pulseRing}
            animate={
              noMotion ? undefined : { scale: [0.97, 1.02, 0.97], opacity: [0.8, 0.35, 0.8] }
            }
            transition={
              noMotion
                ? { duration: 0 }
                : { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }
            }
          />
        </div>
      ))}

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
