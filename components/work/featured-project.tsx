import type { Project } from "@/content/projects";
import Image from "next/image";
import { Reveal } from "../reveal";

export function FeaturedProject({ project }: { project: Project }) {
  return (
    <Reveal as="article" className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:gap-12">
      <div className="space-y-5">
        <div className="font-mono text-xs uppercase tracking-wider text-text-muted">
          Featured · {project.client ?? "Personal"}
        </div>
        <h3
          className="font-display italic text-text"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
        >
          {project.title}
        </h3>
        <p className="text-text-muted leading-relaxed">{project.description}</p>
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <li
              key={s}
              className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-text-muted"
            >
              {s}
            </li>
          ))}
        </ul>
        {project.metrics && (
          <dl className="grid grid-cols-2 gap-4 border-t border-border pt-5 font-mono">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <dt className="text-[11px] uppercase tracking-wider text-text-muted">{m.label}</dt>
                <dd className="text-xl text-text tabular-nums">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border bg-surface-2">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 600px"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-mono text-xs text-text-muted">
            screenshot pending
          </div>
        )}
      </div>
    </Reveal>
  );
}
