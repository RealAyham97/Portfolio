"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ItExperienceCard } from "./ItExperienceCard";

// ── Helpers ────────────────────────────────────────────────────────────────
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

type Stop = { at: number; v: number };

function interp(p: number, stops: Stop[]): number {
  if (p <= stops[0].at) return stops[0].v;
  if (p >= stops[stops.length - 1].at) return stops[stops.length - 1].v;
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i];
    const b = stops[i + 1];
    if (p >= a.at && p <= b.at) {
      const t = (p - a.at) / (b.at - a.at);
      return a.v + (b.v - a.v) * easeInOutCubic(t);
    }
  }
  return stops[stops.length - 1].v;
}

const clamp = (x: number, a = 0, b = 1) => Math.max(a, Math.min(b, x));

// Card scales from 1.0 (current size) to 1.5. 1.5 is the largest zoom where
// the popover (also scaled) reliably fits in the viewport when flipped above.
const SCALE_STOPS: Stop[] = [
  { at: 0.0, v: 1.0 },
  { at: 1.0, v: 1.5 },
];

// Fraction-of-viewport-width to shift the card LEFT so its center ends at
// viewport center. 0 at scroll start, ~-0.28 at viewport center.
const X_SHIFT_STOPS: Stop[] = [
  { at: 0.0, v: 0.0 },
  { at: 0.5, v: -0.28 },
  { at: 1.0, v: -0.28 },
];

type Props = {
  /** How tall the scroll section is, in vh. Longer = slower zoom. @default 350 */
  scrollLengthVh?: number;
};

export function ParallaxItCard({ scrollLengthVh = 350 }: Props) {
  const wrapRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [vpW, setVpW] = useState(1440);

  useLayoutEffect(() => {
    const update = () => setVpW(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      setProgress(clamp(scrolled / Math.max(1, total)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    tick();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scale = interp(progress, SCALE_STOPS);
  const leftPx = interp(progress, X_SHIFT_STOPS) * vpW;

  return (
    <section
      ref={wrapRef}
      aria-label="IT services scrollytelling intro"
      style={{ position: "relative", height: `${scrollLengthVh}vh` }}
      className="bg-background"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Original grid hero — same layout, same title position */}
        <section className="relative mx-auto grid h-full max-w-6xl gap-12 px-6 pt-24 pb-12 md:grid-cols-[1.4fr_1fr] md:gap-16 md:pt-32 md:pb-16">
          <div className="flex flex-col justify-center">
            <h1
              className="font-display italic leading-none text-text/80"
              style={{ fontSize: "clamp(3.5rem, 8vw, 5rem)" }}
            >
              IT
              <br />
              Services
            </h1>
          </div>
          <div className="flex items-center">
            {/* Card scales in place and slides left to viewport center */}
            <div
              style={{
                position: "relative",
                left: `${leftPx}px`,
                transform: `scale(${scale})`,
                transformOrigin: "center center",
                width: "100%",
                zIndex: 10,
              }}
            >
              <ItExperienceCard />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
