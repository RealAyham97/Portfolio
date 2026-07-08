"use client";
import type { Project } from "@/content/projects";
import { motion } from "motion/react";
import Image from "next/image";

const STATUS_LABEL: Record<Project["status"], string> = {
  shipped: "Shipped",
  deployed: "Deployed",
  "in-progress": "In progress",
  "early-stage": "Early stage",
};

export function ProjectCard({
  project,
  onOpen,
  tabbable = true,
}: {
  project: Project;
  onOpen: (p: Project) => void;
  /** False for marquee clones: clickable but out of the tab order. */
  tabbable?: boolean;
}) {
  return (
    <motion.button
      type="button"
      layout
      onClick={() => onOpen(project)}
      tabIndex={tabbable ? undefined : -1}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-border bg-surface-1 text-left transition duration-300 hover:border-text-muted hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] w-full flex-shrink-0 overflow-hidden bg-surface-2">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-text-muted">
          <span>{STATUS_LABEL[project.status]}</span>
          {/* Hover affordance; always visible on touch, where hover never fires. */}
          <span className="opacity-0 transition group-hover:opacity-100 [@media(hover:none)]:opacity-100">
            Open →
          </span>
        </div>
        <h4 className="text-lg text-text">{project.title}</h4>
        <p className="text-sm text-text-muted">{project.summary}</p>
      </div>
    </motion.button>
  );
}
