"use client";
import type { Project } from "@/content/projects";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { ProjectCard } from "./project-card";
import { ProjectOverlay } from "./project-overlay";

export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<Project | null>(null);
  // Duplicate the list once so the marquee can loop seamlessly.
  const track = [...projects, ...projects];

  return (
    <>
      <div className="marquee-viewport relative overflow-hidden">
        <ul
          className="marquee-track flex w-max items-stretch"
          aria-label="Featured projects"
        >
          {track.map((p, i) => (
            <li
              key={`${p.slug}-${i}`}
              aria-hidden={i >= projects.length}
              className="flex-shrink-0 pr-6 w-[304px] sm:w-[344px] lg:w-[364px]"
            >
              <ProjectCard project={p} onOpen={setOpen} />
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
