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

// The card travels from upper-right down to dead centre.
const CX_STOPS: Stop[] = [
  { at: 0.0, v: 0.73 },
  { at: 0.5, v: 0.5 },
  { at: 1.0, v: 0.5 },
];
const CY_STOPS: Stop[] = [
  { at: 0.0, v: 0.32 },
  { at: 0.5, v: 0.5 },
  { at: 1.0, v: 0.5 },
];

// Ceiling on the zoom, and the breathing room left above and below the card
// at full zoom. The end scale is derived from the card's own height rather
// than hardcoded: the card grew when the result row moved inside it, and a
// fixed 1.5 clipped its bottom edge on a 900px viewport.
const MAX_SCALE = 1.5;
const FRAME_GAP_PX = 32;
// The card starts under-sized so there is vertical slack to travel through.
// At scale 1 a 566px card already fills most of a laptop viewport, which left
// the centre pinned and the drop motion flat.
const START_SCALE = 0.85;

function endScaleFor(cardH: number, viewportH: number) {
  if (!cardH || !viewportH) return MAX_SCALE;
  const available = viewportH - FRAME_GAP_PX * 2;
  return Math.min(MAX_SCALE, Math.max(1, available / cardH));
}

/**
 * Keeps the card inside the frame for the whole travel, not just at the end.
 * The start stop sits high so the card reads as dropping into place, but on a
 * short viewport that start hangs off the top — so the centre is clamped to
 * whatever keeps both edges a FRAME_GAP_PX in. When the card cannot fit at
 * all, dead centre is the least-bad answer.
 */
function clampCentreY(cy: number, scaledH: number, viewportH: number) {
  if (!scaledH || !viewportH) return cy;
  if (scaledH + FRAME_GAP_PX * 2 > viewportH) return 0.5;
  const min = (FRAME_GAP_PX + scaledH / 2) / viewportH;
  const max = (viewportH - FRAME_GAP_PX - scaledH / 2) / viewportH;
  return Math.min(Math.max(cy, min), max);
}
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
  const cardRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  // Measured untransformed card height + viewport height, so the zoom can be
  // capped to whatever actually fits.
  const [frame, setFrame] = useState({ cardH: 0, viewportH: 0 });
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

  // Measure the card at its natural size (offsetHeight is pre-transform) and
  // re-measure whenever it or the viewport changes, so the cap stays honest
  // if the result row reflows.
  useEffect(() => {
    if (!zoom) return;
    const el = cardRef.current;
    if (!el) return;
    const measure = () => setFrame({ cardH: el.offsetHeight, viewportH: window.innerHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [zoom]);

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

  const endScale = endScaleFor(frame.cardH, frame.viewportH);
  const scale = interp(progress, [
    { at: 0, v: START_SCALE },
    { at: 1, v: endScale },
  ]);
  const cxPct = interp(progress, CX_STOPS) * 100;
  const cyPct =
    clampCentreY(interp(progress, CY_STOPS), frame.cardH * scale, frame.viewportH) * 100;
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
          ref={cardRef}
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
