"use client";

import Link from "next/link";
import { useRef, useEffect, useCallback } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

const TOTAL = 60;
const CIRCUMFERENCE = 2 * Math.PI * 54; // 339.292

export function KalkulatorSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasStartedRef = useRef(false);
  const startTimerRef = useRef<() => void>(() => {});
  const introDoneRef = useRef(false);

  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 });

  const updateDisplay = useCallback((s: number) => {
    count.set(s);
    if (ringRef.current) {
      const progress = s / TOTAL;
      const offset = CIRCUMFERENCE * (1 - progress);
      ringRef.current.style.strokeDashoffset = String(offset);
    }
    sectionRef.current?.classList.toggle("ring-urgent", s <= 10);
  }, [count]);

  const startTimer = useCallback(() => {
    if (intervalRef.current) return;
    hasStartedRef.current = true;
    let s = TOTAL;
    updateDisplay(s);

    intervalRef.current = setInterval(() => {
      s -= 1;
      if (s < 0) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        updateDisplay(0);
        setTimeout(() => {
          updateDisplay(TOTAL);
          hasStartedRef.current = false;
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              startTimerRef.current();
            }
          }
        }, 2500);
        return;
      }
      updateDisplay(s);
    }, 1000);
  }, [updateDisplay]);

  useEffect(() => {
    if (!isInView || introDoneRef.current) return;
    introDoneRef.current = true;
    const controls = animate(count, 60, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.3,
    });
    controls.then(() => {
      if (ringRef.current) {
        ringRef.current.style.strokeDashoffset = String(0);
      }
      startTimerRef.current();
    });
    return () => controls.stop();
  }, [isInView, count]);

  useEffect(() => {
    startTimerRef.current = startTimer;

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting && !hasStartedRef.current && introDoneRef.current) {
          startTimer();
        }
        if (!entry.isIntersecting && hasStartedRef.current) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          hasStartedRef.current = false;
          updateDisplay(TOTAL);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [startTimer, updateDisplay]);

  const title = "Sprawdź koszt swojej strony w 60 sekund.";
  const beforeHighlight = title.replace("60 sekund.", "").trim();
  const highlight = "60 sekund";

  return (
    <section
      id="kalkulator"
      ref={sectionRef}
      className="cta-section"
      aria-labelledby="cta-heading"
    >
      {/* Tło: glow blob */}
      <div className="cta-bg-blob" aria-hidden />

      <div className="cta-content container-narrow">
        <motion.div
          className="timer-wrap"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="timer-ring-container">
            <svg
              className="timer-svg"
              viewBox="0 0 120 120"
              width={120}
              height={120}
              aria-hidden
            >
              <circle
                className="ring-track"
                cx="60"
                cy="60"
                r="54"
                fill="none"
                strokeWidth="3"
              />
              <circle
                ref={ringRef}
                className="ring-progress"
                cx="60"
                cy="60"
                r="54"
                fill="none"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={CIRCUMFERENCE}
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div className="timer-center">
              <motion.span className="timer-number" id="timerNumber">
                {rounded}
              </motion.span>
              <span className="timer-unit">sek</span>
            </div>
          </div>
        </motion.div>

        <h2 id="cta-heading" className="cta-heading">
          {beforeHighlight}{" "}
          <span className="highlight">{highlight}</span>.
        </h2>
        <p className="cta-subheadline">Wybierz zakres projektu i zobacz szacunkową wycenę. Bez zobowiązań.</p>

        <div className="cta-btn-wrap">
          <Link
            ref={btnRef}
            href="/kalkulator"
            className="cta-btn-primary"
          >
            <span className="btn-icon" aria-hidden>→</span>
            Przejdź do kalkulatora
          </Link>
        </div>

        <p className="cta-disclaimer">
          <span>Bez rejestracji</span>
          <span>Bez zobowiązań</span>
          <span>Wynik w 60 sek</span>
        </p>
      </div>
    </section>
  );
}
