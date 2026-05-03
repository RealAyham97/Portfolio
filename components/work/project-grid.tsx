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
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <li key={p.slug}>
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
