"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import type { Project } from "@/content/projects";

const STATUS_LABEL: Record<Project["status"], string> = {
  shipped: "Shipped",
  deployed: "Deployed",
  "in-progress": "In progress",
};

export function ProjectOverlay({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <Dialog.Root open onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/85 backdrop-blur-sm"
          />
        </Dialog.Overlay>
        <Dialog.Content asChild aria-label={project.title}>
          <motion.div
            layoutId={`project-${project.slug}`}
            className="fixed inset-2 sm:inset-6 z-50 overflow-y-auto rounded-2xl border border-border bg-surface-1"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-muted transition hover:text-text"
            >
              <X size={16} />
            </button>
            <article className="mx-auto max-w-4xl space-y-8 p-8 md:p-12">
              <motion.div layoutId={`project-${project.slug}-image`} className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-surface-2">
                {project.image && (
                  <Image src={project.image} alt={project.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 900px" />
                )}
              </motion.div>
              <header className="space-y-3">
                <div className="font-mono text-xs uppercase tracking-wider text-text-muted">
                  {STATUS_LABEL[project.status]}{project.client ? ` · ${project.client}` : ""}
                </div>
                <Dialog.Title asChild>
                  <motion.h3 layoutId={`project-${project.slug}-title`} className="font-display italic text-text" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
                    {project.title}
                  </motion.h3>
                </Dialog.Title>
                <Dialog.Description className="text-text-muted leading-relaxed">{project.description}</Dialog.Description>
              </header>
              <section className="space-y-3">
                <div className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Stack</div>
                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <li key={s} className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-text-muted">
                      {s}
                    </li>
                  ))}
                </ul>
              </section>
              {project.metrics && (
                <section className="grid grid-cols-2 gap-4 border-t border-border pt-6 md:grid-cols-4 font-mono">
                  {project.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="text-[11px] uppercase tracking-wider text-text-muted">{m.label}</div>
                      <div className="text-xl text-text tabular-nums">{m.value}</div>
                    </div>
                  ))}
                </section>
              )}
              {(project.links?.live || project.links?.github) && (
                <section className="flex gap-3">
                  {project.links?.live && (
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="rounded-full bg-accent px-4 py-2 text-sm text-accent-fg">Visit live</a>
                  )}
                  {project.links?.github && (
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border px-4 py-2 text-sm">GitHub</a>
                  )}
                </section>
              )}
            </article>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
