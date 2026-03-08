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

const PULSE_RADII = [120, 200, 290, 390] as const;

interface OrbitItem {
  angle: number;
  radius: number;
  icon: LucideIcon;
  label: string;
}

const ORBIT_ITEMS: OrbitItem[] = [
  { angle: 30, radius: 160, icon: Globe, label: "Strony www" },
  { angle: 90, radius: 200, icon: ShoppingCart, label: "Sklepy online" },
  { angle: 160, radius: 155, icon: Code2, label: "Next.js / React" },
  { angle: 230, radius: 195, icon: Zap, label: "Błyskawiczny load" },
  { angle: 290, radius: 165, icon: Search, label: "SEO on-page" },
  { angle: 330, radius: 185, icon: Smartphone, label: "Mobile first" },
];

const STAT_BADGES = [
  {
    value: "3+",
    label: "Lata doświadczenia",
    position: { top: "12%", right: "8%" },
    delay: 0.2,
  },
  {
    value: "15+",
    label: "Projektów",
    position: { bottom: "28%", right: "4%" },
    delay: 0.4,
  },
  {
    value: "100%",
    label: "Zadowolonych klientów",
    position: { bottom: "12%", left: "8%" },
    delay: 0.6,
  },
] as const;

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
      {/* WARSTWA 0 — Glow radialny */}
      <div className={styles.radialGlow} aria-hidden />

      {/* WARSTWA 1 — Pulse rings */}
      {PULSE_RADII.map((r, i) => (
        <motion.div
          key={r}
          className={styles.pulseRing}
          style={{ width: r * 2, height: r * 2 }}
          animate={
            noMotion
              ? undefined
              : { scale: [0.97, 1.02, 0.97], opacity: [0.4, 0.15, 0.4] }
          }
          transition={
            noMotion
              ? { duration: 0 }
              : {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.6,
                }
          }
          aria-hidden
        />
      ))}

      {/* WARSTWA 2 — Orbiting system (obraca się cały) */}
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
                top: `calc(50% + ${pos.y}px - 22px)`,
              }}
              title={item.label}
              animate={noMotion ? undefined : { rotate: -360 }}
              transition={
                noMotion
                  ? { duration: 0 }
                  : {
                      duration: ORBIT_DURATION,
                      repeat: Infinity,
                      ease: "linear",
                    }
              }
            >
              <item.icon size={18} className="text-white/70" aria-hidden />
            </motion.div>
          );
        })}
      </motion.div>

      {/* WARSTWA 3 — Logo centrum (bez obrotu); ikony orbitują wokół niego */}
      <div className={styles.logoCore} aria-hidden>
        <Image
          src="/circle-logo.svg"
          alt=""
          width={200}
          height={200}
          className="shrink-0"
        />
      </div>

      {/* WARSTWA 4 — Stat badges (statyczne, nie obracają się) */}
      {STAT_BADGES.map((badge) => (
        <motion.div
          key={badge.label}
          className={styles.statBadge}
          style={badge.position}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: badge.delay, duration: 0.6 }}
          aria-hidden
        >
          <motion.div
            animate={
              noMotion ? undefined : { y: [-3, 3, -3] }
            }
            transition={
              noMotion
                ? { duration: 0 }
                : {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: badge.delay,
                  }
            }
          >
            <div className={styles.statValue}>{badge.value}</div>
            <div className={styles.statLabel}>{badge.label}</div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
