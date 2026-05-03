"use client";
import type { Project } from "@/content/projects";
import { AnimatePresence, LayoutGroup } from "motion/react";
import { useMemo, useState } from "react";
import { type Filter, FilterBar, matchesFilter } from "./filter-bar";
import { ProjectCard } from "./project-card";
import { ProjectOverlay } from "./project-overlay";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<Project | null>(null);
  const visible = useMemo(
    () => projects.filter((p) => matchesFilter(p.stack, filter)),
    [projects, filter],
  );

  return (
    <LayoutGroup>
      <FilterBar value={filter} onChange={setFilter} />
      <ul className="mt-8 flex flex-wrap justify-center gap-6">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <li key={p.slug} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <ProjectCard project={p} onOpen={setOpen} />
            </li>
          ))}
        </AnimatePresence>
      </ul>
      <AnimatePresence>
        {open && <ProjectOverlay project={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </LayoutGroup>
  );
}
