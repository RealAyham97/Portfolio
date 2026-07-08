"use client";

import { HeroBackdrop } from "@/components/hero-backdrop";
import { useEffect, useRef, useState } from "react";
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

// Card scales 1.0 → 1.5.
const SCALE_STOPS: Stop[] = [
  { at: 0.0, v: 1.0 },
  { at: 1.0, v: 1.5 },
];

// ── Desktop stops ──
const CX_DESKTOP: Stop[] = [
  { at: 0.0, v: 0.745 },
  { at: 0.5, v: 0.5 },
  { at: 1.0, v: 0.5 },
];
const CY_DESKTOP: Stop[] = [
  { at: 0.0, v: 0.32 },
  { at: 0.5, v: 0.7 },
  { at: 1.0, v: 0.7 },
];

// ── Mobile stops: card starts centered below title, stays centered ──
const CX_MOBILE: Stop[] = [
  { at: 0.0, v: 0.5 },
  { at: 1.0, v: 0.5 },
];
const CY_MOBILE: Stop[] = [
  { at: 0.0, v: 0.68 },
  { at: 0.5, v: 0.68 },
  { at: 1.0, v: 0.68 },
];

type Props = {
  /** Scroll runway in vh. Longer = slower zoom. @default 250 */
  scrollLengthVh?: number;
};

export function ParallaxItCard({ scrollLengthVh = 250 }: Props) {
  const wrapRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
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

  const cxStops = isMobile ? CX_MOBILE : CX_DESKTOP;
  const cyStops = isMobile ? CY_MOBILE : CY_DESKTOP;
  const scaleStops: Stop[] = isMobile
    ? [
        { at: 0, v: 1.0 },
        { at: 1, v: 1.15 },
      ]
    : SCALE_STOPS;

  const scale = interp(progress, scaleStops);
  const cxPct = interp(progress, cxStops) * 100;
  const cyPct = interp(progress, cyStops) * 100;

  return (
    <section
      ref={wrapRef}
      aria-label="IT experience scrollytelling"
      style={{ position: "relative", height: `${scrollLengthVh}vh` }}
      className="bg-background"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <HeroBackdrop />
        {/* Title at top-left — matches the Contact page heading section */}
        <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-4 md:pt-40 md:pb-8">
          <h1
            className="font-display italic leading-none text-text/80"
            style={{ fontSize: "clamp(3rem, 10vw, 5rem)" }}
          >
            IT
            <br />
            Services
          </h1>
        </div>

        {/* Card — absolutely positioned, animates next to title → below title centered */}
        <div
          style={{
            position: "absolute",
            left: `${cxPct}%`,
            top: `${cyPct}%`,
            width: isMobile ? "calc(100vw - 3rem)" : 420,
            maxWidth: 420,
            transform: `translate(-50%, -50%) scale(${scale})`,
            transformOrigin: "center center",
            zIndex: 10,
          }}
        >
          <ItExperienceCard />
        </div>
      </div>
    </section>
  );
}
