"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { PixelIcon } from "@/components/brand/PixelIcon";
import { framePan } from "@/lib/framePan";

interface ScrollingFrameProps {
  href: string;
  domain: string;
  name: string;
  page: { src: string; width: number; height: number };
}

/** A client's full page in a browser window; hovering scrolls it top to bottom. */
export function ScrollingFrame({ href, domain, name, page }: ScrollingFrameProps) {
  const frameRef = useRef<HTMLAnchorElement>(null);
  const paneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const pane = paneRef.current;
    if (!frame || !pane) return;

    const observer = new ResizeObserver(() => {
      const pan = framePan(pane.clientWidth, pane.clientHeight, page.width, page.height);
      if (!pan) {
        frame.style.removeProperty("--shift");
        frame.style.removeProperty("--dur");
        return;
      }
      frame.style.setProperty("--shift", `${pan.shift}px`);
      frame.style.setProperty("--dur", `${pan.seconds}s`);
    });
    observer.observe(pane);
    return () => observer.disconnect();
  }, [page.width, page.height]);

  return (
    <Link ref={frameRef} href={href} className="frame" data-keep-out>
      <div className="chrome">
        <PixelIcon name="lock" />
        <span>{domain}</span>
        <span className="live">przewiń kursorem</span>
      </div>
      <div ref={paneRef} className="pane">
        <Image
          src={page.src}
          alt={`Pełna strona ${name}`}
          width={page.width}
          height={page.height}
          sizes="(max-width: 760px) 100vw, (max-width: 1000px) 50vw, 400px"
        />
      </div>
      <div className="frame-foot">
        <span className="nm">{name}</span>
        <span className="go">
          Case study <PixelIcon name="arrow-right" />
        </span>
      </div>
    </Link>
  );
}
