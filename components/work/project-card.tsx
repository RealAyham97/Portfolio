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
}: { project: Project; onOpen: (p: Project) => void }) {
  return (
    <motion.button
      type="button"
      layout
      onClick={() => onOpen(project)}
      className="group relative overflow-hidden rounded-xl border border-border bg-surface-1 text-left transition hover:border-text-muted"
    >
      <div className="relative aspect-[16/10] w-full bg-surface-2">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : null}
      </div>
      <div className="space-y-2 p-5">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-text-muted">
          <span>{STATUS_LABEL[project.status]}</span>
          <span className="opacity-0 transition group-hover:opacity-100">Open →</span>
        </div>
        <h4 className="text-lg text-text">{project.title}</h4>
        <p className="text-sm text-text-muted">{project.summary}</p>
      </div>
    </motion.button>
  );
}
