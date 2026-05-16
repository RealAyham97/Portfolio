"use client";
import type { Project } from "@/content/projects";
import { AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { ProjectCard } from "./project-card";
import { ProjectOverlay } from "./project-overlay";

export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<Project | null>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollBy = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = (card?.offsetWidth ?? 320) + 24;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Previous project"
          className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-1 text-text-muted hover:text-text transition"
        >
          ←
        </button>

        <ul
          ref={trackRef}
          className="flex flex-1 gap-6 overflow-x-auto snap-x snap-mandatory pb-1 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {projects.map((p) => (
            <li key={p.slug} className="snap-start flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[340px]">
              <ProjectCard project={p} onOpen={setOpen} />
            </li>
          ))}
        </ul>

        <button
          onClick={() => scrollBy(1)}
          aria-label="Next project"
          className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-1 text-text-muted hover:text-text transition"
        >
          →
        </button>
      </div>

      <AnimatePresence>
        {open && <ProjectOverlay project={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </>
  );
}
