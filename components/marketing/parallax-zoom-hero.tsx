"use client";

import { useTheme } from "next-themes";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Laptop } from "./laptop";
import { SearchScreen } from "./search-screen";

// ── Helpers ────────────────────────────────────────────────────────────────
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

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

// ── Figma keyframes (1440 × 1024 canvas) ───────────────────────────────────
// Laptop stays centered the whole zoom; only its size animates.
const FIGMA_W = 1440;
const LAPTOP_ASPECT = 330 / 195; // ≈ 1.692

const W_STOPS: Stop[] = [
  { at: 0.0, v: 330 / FIGMA_W },
  { at: 0.34, v: 660 / FIGMA_W },
  { at: 0.68, v: 990 / FIGMA_W },
  { at: 1.0, v: 1320 / FIGMA_W },
];

// ── Props ──────────────────────────────────────────────────────────────────
type Props = {
  /**
   * URL to your screen recording (mp4). Plays muted on loop once the laptop
   * fills the screen. While zooming in, the original search-engine mock shows
   * inside the screen instead.
   */
  videoSrc?: string;
  /**
   * How tall the scroll section is (in vh). Longer = slower zoom.
   * @default 400
   */
  scrollLengthVh?: number;
};

// ── Component ──────────────────────────────────────────────────────────────
export function ParallaxZoomHero({
  videoSrc = "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
  scrollLengthVh = 400,
}: Props) {
  const wrapRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [vp, setVp] = useState({ w: 1440, h: 900 });

  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  // Track viewport size
  useLayoutEffect(() => {
    const update = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Scroll → progress (0..1)
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

  // Compute laptop dims (centered, constrained to fit viewport)
  const stage = useMemo(() => {
    const targetW = interp(progress, W_STOPS) * vp.w;
    const maxH = vp.h * 0.78;
    let w = targetW;
    let h = w / LAPTOP_ASPECT;
    if (h > maxH) {
      h = maxH;
      w = h * LAPTOP_ASPECT;
    }
    return { w, h };
  }, [progress, vp]);

  // Headline + subtitle visibility
  const bigTitleOpacity = clamp(1 - (progress - 0.3) / 0.2);
  const bigTitleY = -interp(progress, [
    { at: 0, v: 0 },
    { at: 0.6, v: 220 },
    { at: 1, v: 280 },
  ]);
  const subtitleOpacity = clamp(
    Math.min((progress - 0.12) / 0.15, 1 - (progress - 0.45) / 0.1),
  );

  // Video crossfade at the end
  const videoOpacity = clamp((progress - 0.92) / 0.06);
  const searchOpacity = 1 - videoOpacity;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (videoOpacity > 0.5) v.play().catch(() => {});
    else v.pause();
  }, [videoOpacity]);

  return (
    <section
      ref={wrapRef}
      aria-label="Digital marketing scrollytelling intro"
      style={{ position: "relative", height: `${scrollLengthVh}vh` }}
      className="bg-background"
    >
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Big sliding "Digital Marketing" headline */}
        <div
          aria-hidden={bigTitleOpacity < 0.1}
          className="font-display italic text-text"
          style={{
            position: "absolute",
            top: 110,
            left: "clamp(20px, 5vw, 80px)",
            transform: `translateY(${bigTitleY}px)`,
            opacity: bigTitleOpacity,
            fontSize: "clamp(64px, 8vw, 128px)",
            lineHeight: 0.92,
            letterSpacing: "-0.02em",
            zIndex: 5,
            whiteSpace: "pre-line",
            pointerEvents: bigTitleOpacity < 0.1 ? "none" : "auto",
          }}
        >
          {"Digital\nMarketing"}
        </div>

        {/* Subtitle */}
        <div
          className="text-text-muted"
          style={{
            position: "absolute",
            top: "72%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(820px, 75vw)",
            textAlign: "center",
            opacity: subtitleOpacity,
            fontSize: "clamp(16px, 1.4vw, 22px)",
            lineHeight: 1.5,
            zIndex: 5,
            pointerEvents: subtitleOpacity < 0.1 ? "none" : "auto",
          }}
        >
          I run paid acquisition the way an analyst would,
          <br /> every dollar tracked to a row in a database.
        </div>

        {/* The laptop — locked to center, only resizing */}
        <div
          style={{
            position: "absolute",
            left: vp.w / 2,
            top: vp.h / 2,
            transform: `translate(-50%, calc(-50% - ${
              progress < 0.98 ? stage.h * 0.022 : 0
            }px))`,
            zIndex: 10,
          }}
        >
          <Laptop
            width={stage.w}
            height={stage.h}
            dark={dark}
            baseVisible={progress < 0.98}
          >
            {/* Search mock (fades out at full zoom) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: searchOpacity,
                transition: "opacity 0.2s linear",
              }}
            >
              <SearchScreen dark={dark} />
            </div>

            {/* Video (fades in at full zoom) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: videoOpacity,
                background: "#000",
              }}
            >
              <video
                ref={videoRef}
                src={videoSrc}
                muted
                loop
                playsInline
                preload="metadata"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </Laptop>
        </div>

        {/* Scroll hint (only at very start) */}
        <div
          className="font-mono text-text-muted"
          style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            opacity: clamp(1 - progress / 0.15) * 0.6,
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            zIndex: 20,
            pointerEvents: "none",
          }}
        >
          <span>Scroll</span>
          <span style={{ fontSize: 16 }}>↓</span>
        </div>
      </div>
    </section>
  );
}
