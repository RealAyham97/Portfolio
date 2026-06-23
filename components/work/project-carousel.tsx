"use client";
import type { Project } from "@/content/projects";
import { AnimatePresence } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectCard } from "./project-card";
import { ProjectOverlay } from "./project-overlay";

const AUTO_SPEED = 0.5; // px per frame (~30 px/s at 60 fps)
const DRAG_MOMENTUM_DECAY = 0.95;

export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<Project | null>(null);
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
    const animate = () => {
      if (!draggingRef.current) {
        if (Math.abs(velocityRef.current) > 0.1) {
          offsetRef.current += velocityRef.current;
          velocityRef.current *= DRAG_MOMENTUM_DECAY;
        } else {
          velocityRef.current = 0;
          offsetRef.current += AUTO_SPEED;
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
    didDragRef.current = false;
    velocityRef.current = 0;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = performance.now();
    try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); } catch {}
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 3) didDragRef.current = true;
    offsetRef.current = dragStartOffsetRef.current - dx;

    const now = performance.now();
    const dt = now - lastPointerTimeRef.current;
    if (dt > 0) {
      velocityRef.current = -(e.clientX - lastPointerXRef.current) / dt * 16;
    }
    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = now;
  }, []);

  const onPointerUp = useCallback(() => {
    draggingRef.current = false;
  }, []);

  const handleCardOpen = useCallback((p: Project) => {
    if (!didDragRef.current) setOpen(p);
  }, []);

  return (
    <>
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
          style={{ cursor: "grab" }}
        >
          {track.map((p, i) => (
            <li
              key={`${p.slug}-${i}`}
              aria-hidden={i >= projects.length}
              className="flex-shrink-0 pr-6 w-[304px] sm:w-[344px] lg:w-[364px]"
            >
              <ProjectCard project={p} onOpen={handleCardOpen} />
            </li>
          ))}
        </ul>

        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
      </div>

      <AnimatePresence>
        {open && <ProjectOverlay project={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </>
  );
}
