"use client";

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

// Card center X (as a fraction of viewport width):
// starts at the right-column position next to the title, ends centered.
const CX_STOPS: Stop[] = [
  { at: 0.0, v: 0.745 },
  { at: 0.5, v: 0.5 },
  { at: 1.0, v: 0.5 },
];

// Card center Y (as a fraction of viewport height):
// starts next to the title (matching its vertical center), ends below it.
const CY_STOPS: Stop[] = [
  { at: 0.0, v: 0.32 },
  { at: 0.5, v: 0.7 },
  { at: 1.0, v: 0.7 },
];

type Props = {
  /** Scroll runway in vh. Longer = slower zoom. @default 250 */
  scrollLengthVh?: number;
};

export function ParallaxItCard({ scrollLengthVh = 250 }: Props) {
  const wrapRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

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
  const cxPct = interp(progress, CX_STOPS) * 100;
  const cyPct = interp(progress, CY_STOPS) * 100;

  return (
    <section
      ref={wrapRef}
      aria-label="IT experience scrollytelling"
      style={{ position: "relative", height: `${scrollLengthVh}vh` }}
      className="bg-background"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Title at top-left — matches the Contact page heading section */}
        <div className="mx-auto max-w-6xl px-6 pt-32 pb-4 md:pt-40 md:pb-8">
          <h1
            className="font-display italic leading-none text-text/80"
            style={{ fontSize: "clamp(3.5rem, 8vw, 5rem)" }}
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
            width: 420,
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
