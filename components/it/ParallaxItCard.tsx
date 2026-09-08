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

// Card scales 1.0 → 1.5 along the new ledger path.
const SCALE_STOPS: Stop[] = [
  { at: 0.0, v: 1.0 },
  { at: 1.0, v: 1.5 },
];
const CX_STOPS: Stop[] = [
  { at: 0.0, v: 0.73 },
  { at: 0.5, v: 0.5 },
  { at: 1.0, v: 0.5 },
];
const CY_STOPS: Stop[] = [
  { at: 0.0, v: 0.34 },
  { at: 0.5, v: 0.56 },
  { at: 1.0, v: 0.56 },
];
// Title yields the frame to the card as it zooms in.
const TITLE_OPACITY: Stop[] = [
  { at: 0.0, v: 1.0 },
  { at: 1.0, v: 0.32 },
];

const CARD_W = 290;

function Title({ opacity }: { opacity?: number }) {
  return (
    <h1 className="t-display-l text-text" style={opacity === undefined ? undefined : { opacity }}>
      IT
      <br />
      <span className="italic text-accent">Services</span>
    </h1>
  );
}

type Props = {
  /** Scroll runway in vh. Longer = slower zoom. @default 250 */
  scrollLengthVh?: number;
};

export function ParallaxItCard({ scrollLengthVh = 250 }: Props) {
  const wrapRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  // The zoom is a desktop, motion-allowed affordance only. Below 1024px (or
  // with reduced motion) the card is shown at rest at full column width.
  // Defaults to on so the desktop majority renders its final structure on the
  // server; narrow and reduced-motion clients correct on mount.
  const [zoom, setZoom] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const sync = () => setZoom(mq.matches && motionOk.matches);
    sync();
    mq.addEventListener("change", sync);
    motionOk.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      motionOk.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!zoom) return;
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
  }, [zoom]);

  if (!zoom) {
    return (
      <section aria-label="IT services" className="rule-b u-gutter pt-8 pb-7">
        <Title />
        <div className="mt-7">
          <ItExperienceCard />
        </div>
      </section>
    );
  }

  const scale = interp(progress, SCALE_STOPS);
  const cxPct = interp(progress, CX_STOPS) * 100;
  const cyPct = interp(progress, CY_STOPS) * 100;
  const titleOpacity = interp(progress, TITLE_OPACITY);

  return (
    <section
      ref={wrapRef}
      aria-label="IT experience scrollytelling"
      style={{ position: "relative", height: `${scrollLengthVh}vh` }}
      className="rule-b bg-background"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="u-gutter relative pt-11">
          <Title opacity={titleOpacity} />
        </div>

        <div
          style={{
            position: "absolute",
            left: `${cxPct}%`,
            top: `${cyPct}%`,
            width: CARD_W,
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
