import type { Project } from "@/content/projects";
import Image from "next/image";
import { Reveal } from "../reveal";

export function FeaturedProject({ project }: { project: Project }) {
  return (
    <Reveal
      as="article"
      className="grid max-w-full grid-cols-1 items-start gap-8 px-5 pt-[18px] pb-11 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:px-14"
    >
      <div>
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          Featured · {project.client ?? "Personal"}
        </div>
        <h3 className="mt-4 font-display text-[34px] leading-none tracking-[-0.02em] text-text lg:text-[46px]">
          {project.title}
        </h3>
        <p className="t-body-m mt-4 text-text-muted">{project.description}</p>

        <ul className="mt-5 flex flex-wrap gap-[6px]">
          {project.stack.map((s) => (
            <li
              key={s}
              className="border border-border px-[9px] py-[5px] font-mono text-[10px] uppercase tracking-[0.10em] text-text-muted"
            >
              {s}
            </li>
          ))}
        </ul>

        {project.metrics && (
          <dl className="mt-7 grid grid-cols-2 font-mono">
            {project.metrics.map((m) => (
              <div key={m.label} className="rule-t rule-b py-[14px] pr-4">
                <dt className="t-mono-label text-text-muted">{m.label}</dt>
                <dd className="mt-[10px] text-[24px] leading-none tabular-nums text-text">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      <div className="relative aspect-[16/10] w-full border border-border bg-surface-2">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 640px"
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
