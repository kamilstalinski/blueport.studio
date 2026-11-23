"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { Arrow, Lock } from "@/components/ui/Arrow";
import { framePan } from "@/lib/framePan";

interface ScrollingFrameProps {
  href: string;
  domain: string;
  kind?: string;
  name: string;
  page: { src: string; width: number; height: number };
}

/** A client's full page in a browser window; hovering scrolls it top to bottom. */
export function ScrollingFrame({ href, domain, kind, name, page }: ScrollingFrameProps) {
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
    <Link ref={frameRef} href={href} className="bp-frame" data-keep-out>
      <div className="bp-win-bar">
        <Lock />
        <span className="bp-url bp-mono">{domain}</span>
        {kind && <span className="bp-win-kind bp-mono">{kind}</span>}
      </div>
      <div ref={paneRef} className="bp-frame-pane">
        <Image
          src={page.src}
          alt={`Pełna strona ${name}`}
          width={page.width}
          height={page.height}
          sizes="(max-width: 1023px) 100vw, 400px"
        />
      </div>
      <div className="bp-frame-foot">
        <span>{name}</span>
        <span className="bp-mono">
          Case study <Arrow />
        </span>
      </div>
    </Link>
  );
}
