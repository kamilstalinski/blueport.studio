"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Arrow } from "@/components/ui/Arrow";
import { ABOUT_STATEMENT } from "@/constants/about";

const split = (text: string) => text.split(/(?<=\s)/).filter(Boolean);
const BEFORE = split(ABOUT_STATEMENT.before);
const ACCENT = split(ABOUT_STATEMENT.accent);
const AFTER = split(ABOUT_STATEMENT.after);
const TOTAL = BEFORE.length + ACCENT.length + AFTER.length;
/* the statement's top at 85% of the screen lights the first word, its bottom at 45% the last (taste-skill word-highlight) */
const FROM = 0.85;
const TO = 0.45;

/** O nas: how we work, as one statement whose words turn from half ink to ink as it crosses the screen. */
export function AboutStatement() {
  const text = useRef<HTMLParagraphElement>(null);
  const [lit, setLit] = useState(TOTAL);

  useEffect(() => {
    const node = text.current;
    if (!node || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const read = () => {
      frame = 0;
      const box = node.getBoundingClientRect();
      const start = innerHeight * FROM;
      const end = innerHeight * TO;
      const progress = Math.min(1, Math.max(0, (start - box.top) / Math.max(1, start - end + box.height)));
      const atEnd = innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
      setLit(atEnd ? TOTAL : Math.round(progress * TOTAL));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  let index = 0;
  const words = (list: string[]) =>
    list.map((word) => {
      const on = index++ < lit;
      return (
        <span key={index} className="bp-wh-w" data-on={on ? "" : undefined}>
          {word}
        </span>
      );
    });

  return (
    <section className="bp-sec bp-wh" aria-labelledby="about-approach-title">
      <div className="bp-shell">
        <h2 id="about-approach-title" className="sr-only">
          Jak pracujemy
        </h2>
        <p ref={text} className="bp-wh-text">
          {words(BEFORE)}
          <strong>{words(ACCENT)}</strong>
          {words(AFTER)}
        </p>
        <div className="bp-rows-act bp-wh-act">
          <Link className="bp-row-act" href="/proces">
            Zobacz cały proces <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
