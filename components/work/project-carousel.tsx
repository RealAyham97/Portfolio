"use client";
import type { Project } from "@/content/projects";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectCard } from "./project-card";
import { ProjectOverlay } from "./project-overlay";

const AUTO_SPEED = 30; // px per second, frame-rate independent
const DRAG_MOMENTUM_DECAY = 0.95; // per 60fps-equivalent frame
const BASE_FRAME_MS = 1000 / 60;

export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<Project | null>(null);
  const [grabbing, setGrabbing] = useState(false);
  const track = [...projects, ...projects];

  const trackRef = useRef<HTMLUListElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef(0);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const velocityRef = useRef(0);
  const lastPointerXRef = useRef(0);
  const lastPointerTimeRef = useRef(0);
  const didDragRef = useRef(false);
  // Pause auto-scroll while the pointer or keyboard focus is on the carousel,
  // easing the speed instead of stopping dead.
  const restingRef = useRef(false);
  const speedFactorRef = useRef(1);
  const reducedRef = useRef(false);
  // Distance still to travel from an arrow-button press.
  const glideRef = useRef(0);
  const lastTsRef = useRef(0);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const applyTransform = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const halfWidth = el.scrollWidth / 2;
    if (halfWidth > 0) {
      offsetRef.current = ((offsetRef.current % halfWidth) + halfWidth) % halfWidth;
    }
    el.style.transform = `translateX(${-offsetRef.current}px)`;
  }, []);

  useEffect(() => {
    const animate = (ts: number) => {
      const dt = lastTsRef.current ? Math.min(ts - lastTsRef.current, 64) : BASE_FRAME_MS;
      lastTsRef.current = ts;
      const frames = dt / BASE_FRAME_MS;

      if (!draggingRef.current) {
        if (Math.abs(glideRef.current) > 0.5) {
          // Arrow-button glide eases toward its target distance.
          const step = glideRef.current * Math.min(1, 0.14 * frames);
          offsetRef.current += step;
          glideRef.current -= step;
        } else if (Math.abs(velocityRef.current) > 0.1) {
          offsetRef.current += velocityRef.current * frames;
          velocityRef.current *= DRAG_MOMENTUM_DECAY ** frames;
        } else {
          velocityRef.current = 0;
          glideRef.current = 0;
          const target = restingRef.current || reducedRef.current ? 0 : 1;
          speedFactorRef.current += (target - speedFactorRef.current) * Math.min(1, 0.08 * frames);
          offsetRef.current += ((AUTO_SPEED * dt) / 1000) * speedFactorRef.current;
        }
      }
      applyTransform();
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [applyTransform]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    draggingRef.current = true;
    setGrabbing(true);
    didDragRef.current = false;
    velocityRef.current = 0;
    glideRef.current = 0;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = performance.now();
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 3) didDragRef.current = true;
    offsetRef.current = dragStartOffsetRef.current - dx;

    const now = performance.now();
    const dt = now - lastPointerTimeRef.current;
    if (dt > 0) {
      velocityRef.current = (-(e.clientX - lastPointerXRef.current) / dt) * BASE_FRAME_MS;
    }
    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = now;
  }, []);

  const onPointerUp = useCallback(() => {
    draggingRef.current = false;
    setGrabbing(false);
  }, []);

  const handleCardOpen = useCallback((p: Project) => {
    if (!didDragRef.current) setOpen(p);
  }, []);

  const glideBy = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    const li = el?.querySelector("li");
    const width = li ? li.getBoundingClientRect().width : 360;
    velocityRef.current = 0;
    glideRef.current += dir * width;
  }, []);

  return (
    <>
      <div
        // Pointer hover only: touch "hover" never ends, which would freeze
        // the marquee after the first tap.
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") restingRef.current = true;
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") restingRef.current = false;
        }}
        onFocusCapture={() => {
          restingRef.current = true;
        }}
        onBlurCapture={() => {
          restingRef.current = false;
        }}
      >
        <div className="mb-4 flex items-center justify-end gap-2">
          <button
            type="button"
            aria-label="Previous projects"
            onClick={() => glideBy(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-muted transition hover:border-accent hover:text-text"
          >
            <ArrowLeft size={14} />
          </button>
          <button
            type="button"
            aria-label="Next projects"
            onClick={() => glideBy(1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-muted transition hover:border-accent hover:text-text"
          >
            <ArrowRight size={14} />
          </button>
        </div>

        <div
          className="relative overflow-hidden select-none touch-pan-y"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <ul
            ref={trackRef}
            className="flex w-max items-stretch will-change-transform"
            aria-label="Featured projects"
            style={{ cursor: grabbing ? "grabbing" : "grab" }}
          >
            {track.map((p, i) => (
              <li
                key={`${p.slug}-${i}`}
                aria-hidden={i >= projects.length}
                className="flex-shrink-0 pr-6 w-[304px] sm:w-[344px] lg:w-[364px]"
              >
                {/* Clones stay clickable for mouse users but leave the tab
                    order, so keyboard and screen readers see each project once. */}
                <ProjectCard project={p} onOpen={handleCardOpen} tabbable={i < projects.length} />
              </li>
            ))}
          </ul>

          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>

      <AnimatePresence>
        {open && <ProjectOverlay project={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </>
  );
}
