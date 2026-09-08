"use client";
import type { Project } from "@/content/projects";
import { useState } from "react";
import { ProjectOverlay, STATUS_LABEL } from "./project-overlay";

/**
 * Vertical ledger of every non-featured project. Replaces the horizontal
 * carousel: all rows are visible and scannable without interaction, and each
 * opens the existing detail overlay.
 */
export function ProjectLedger({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <>
      <ul>
        {projects.map((p, i) => (
          <li key={p.slug}>
            <button
              type="button"
              onClick={() => setActive(p)}
              className="row-hover rule-t grid w-full grid-cols-1 items-center gap-2 px-5 py-5 text-left lg:grid-cols-[44px_1fr_1.1fr_130px] lg:gap-7 lg:px-14"
            >
              <span className="font-mono text-[11px] text-text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="t-display-s text-text">{p.title}</span>
              <span className="t-body-s text-text-muted">{p.summary}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent lg:text-right">
                {STATUS_LABEL[p.status]}
              </span>
            </button>
          </li>
        ))}
      </ul>
      {active && <ProjectOverlay project={active} onClose={() => setActive(null)} />}
    </>
  );
}
