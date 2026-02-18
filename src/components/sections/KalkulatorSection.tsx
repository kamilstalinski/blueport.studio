"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRef, useEffect, useCallback } from "react";

const TOTAL = 60;
const CIRCUMFERENCE = 2 * Math.PI * 54; // 339.292

export function KalkulatorSection() {
  const t = useTranslations("Home.kalkulatorSekcja");
  const sectionRef = useRef<HTMLElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasStartedRef = useRef(false);
  const startTimerRef = useRef<() => void>(() => {});

  const updateDisplay = useCallback((s: number) => {
    if (numberRef.current) numberRef.current.textContent = String(s);
    if (ringRef.current) {
      const progress = s / TOTAL;
      const offset = CIRCUMFERENCE * (1 - progress);
      ringRef.current.style.strokeDashoffset = String(offset);
      if (s <= 10) {
        ringRef.current.style.stroke = "#00b8d9";
        ringRef.current.style.filter = "drop-shadow(0 0 8px rgba(0,184,217,0.7))";
      } else {
        ringRef.current.style.stroke = "#00e5a0";
        ringRef.current.style.filter = "drop-shadow(0 0 6px rgba(0,229,160,0.6))";
      }
    }
  }, []);

  const startTimer = useCallback(() => {
    if (intervalRef.current) return; // już działa
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
        btnRef.current?.classList.add("pulse-ready");
        setTimeout(() => {
          btnRef.current?.classList.remove("pulse-ready");
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
    startTimerRef.current = startTimer;
  }, [startTimer]);

  useEffect(() => {
    updateDisplay(TOTAL);
  }, [updateDisplay]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting && !hasStartedRef.current) {
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

  const title = t("title");
  const beforeHighlight = title.replace("60 sekund.", "").trim();
  const highlight = "60 sekund";

  return (
    <section
      id="kalkulator"
      ref={sectionRef}
      className="cta-section"
      aria-labelledby="cta-heading"
    >
      {/* Tło: siatka */}
      <div className="cta-bg-grid" aria-hidden />
      {/* Tło: glow blob */}
      <div className="cta-bg-blob" aria-hidden />

      <div className="cta-content">
        <div className="timer-wrap">
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
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="3"
              />
              <circle
                ref={ringRef}
                className="ring-progress"
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#00e5a0"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={0}
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div className="timer-center">
              <span ref={numberRef} className="timer-number" id="timerNumber">
                {TOTAL}
              </span>
              <span className="timer-unit">sek</span>
            </div>
          </div>
        </div>

        <h2 id="cta-heading" className="cta-heading">
          {beforeHighlight}{" "}
          <span className="highlight">{highlight}</span>.
        </h2>
        <p className="cta-subheadline">{t("subtitle")}</p>

        <div className="cta-btn-wrap">
          <Link
            ref={btnRef}
            href="/kalkulator"
            className="cta-btn-primary"
          >
            <span className="btn-icon" aria-hidden>→</span>
            {t("cta")}
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
