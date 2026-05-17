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

// Card scales 1.0 → 1.5. 1.5 is the max where the popover (also scaled) fits
// in the viewport when flipped above the bars.
const SCALE_STOPS: Stop[] = [
  { at: 0.0, v: 1.0 },
  { at: 1.0, v: 1.5 },
];

// Compute the pixel offset needed to slide the card from the right grid column
// to viewport center. Mirrors the layout: max-w-6xl, px-6, grid 1.4fr_1fr,
// gap-16. Returns 0 below the md breakpoint where the grid stacks.
function rightColumnCenterShift(vpW: number): number {
  if (vpW < 768) return 0;
  const containerW = Math.min(vpW, 1152); // max-w-6xl
  const contentW = containerW - 48; // px-6 each side
  const colGap = 64; // gap-16
  const rightColW = (contentW - colGap) / 2.4; // 1fr of 1.4fr_1fr
  const leftColW = rightColW * 1.4;
  const containerLeft = (vpW - containerW) / 2;
  const rightColCenter = containerLeft + 24 + leftColW + colGap + rightColW / 2;
  return vpW / 2 - rightColCenter; // negative = shift left
}

type Props = {
  /** Scroll runway in vh. Longer = slower zoom. @default 250 */
  scrollLengthVh?: number;
};

export function ParallaxItCard({ scrollLengthVh = 250 }: Props) {
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
  // X shift: 0 at start, full shift-to-center by progress=0.5
  const targetShift = rightColumnCenterShift(vpW);
  const leftPx = interp(progress, [
    { at: 0, v: 0 },
    { at: 0.5, v: targetShift },
    { at: 1, v: targetShift },
  ]);

  return (
    <section
      ref={wrapRef}
      aria-label="IT services scrollytelling intro"
      style={{ position: "relative", height: `${scrollLengthVh}vh` }}
      className="bg-background"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Original grid hero — same layout/title position, tighter vertical padding */}
        <section className="relative mx-auto grid h-full max-w-6xl gap-12 px-6 pt-20 pb-8 md:grid-cols-[1.4fr_1fr] md:gap-16 md:pt-20 md:pb-10">
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
