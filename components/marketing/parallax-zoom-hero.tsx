"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { Laptop } from "./laptop";
import { SearchScreen } from "./search-screen";

// ── Helpers (same pattern as ParallaxItCard) ──────────────────────────────
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

// Same zoom curve as the IT card.
const SCALE_STOPS: Stop[] = [
  { at: 0.0, v: 1.0 },
  { at: 1.0, v: 1.5 },
];

// Same position curve as the IT card.
const CX_STOPS: Stop[] = [
  { at: 0.0, v: 0.745 },
  { at: 0.5, v: 0.5 },
  { at: 1.0, v: 0.5 },
];
const CY_STOPS: Stop[] = [
  { at: 0.0, v: 0.32 },
  { at: 0.5, v: 0.7 },
  { at: 1.0, v: 0.7 },
];

// Fixed laptop dimensions at scale=1.
// Height matches the IT card (315). Width derived from the laptop's
// natural aspect ratio (330/195 ≈ 1.692) so it still looks like a laptop.
const LAPTOP_H = 315;
const LAPTOP_ASPECT = 330 / 195;
const LAPTOP_W = Math.round(LAPTOP_H * LAPTOP_ASPECT);

type Props = {
  /** Scroll runway in vh. Longer = slower zoom. @default 250 */
  scrollLengthVh?: number;
};

export function ParallaxZoomHero({ scrollLengthVh = 250 }: Props) {
  const wrapRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

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
      aria-label="Digital marketing scrollytelling intro"
      style={{ position: "relative", height: `${scrollLengthVh}vh` }}
      className="bg-background"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Title at top-left — Contact-style heading section */}
        <div className="mx-auto max-w-6xl px-6 pt-32 pb-4 md:pt-40 md:pb-8">
          <h1
            className="font-display italic leading-none text-text/80"
            style={{ fontSize: "clamp(3.5rem, 8vw, 5rem)" }}
          >
            Digital
            <br />
            Marketing
          </h1>
        </div>

        {/* Laptop — absolutely positioned, scales via CSS transform like the IT card */}
        <div
          style={{
            position: "absolute",
            left: `${cxPct}%`,
            top: `${cyPct}%`,
            width: LAPTOP_W,
            transform: `translate(-50%, -50%) scale(${scale})`,
            transformOrigin: "center center",
            zIndex: 10,
          }}
        >
          <Laptop width={LAPTOP_W} height={LAPTOP_H} dark={dark} baseVisible={true}>
            <SearchScreen dark={dark} />
          </Laptop>
        </div>
      </div>
    </section>
  );
}
