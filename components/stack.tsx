"use client";
import { stack } from "@/content/stack";
import { useState } from "react";
import { Reveal } from "./reveal";
import { SectionLabel } from "./section-label";

export function Stack({ categories }: { categories?: string[] }) {
  const filtered = categories ? stack.filter((c) => categories.includes(c.name)) : stack;
  const [openSet, setOpenSet] = useState<Set<string>>(new Set());

  const toggle = (name: string) =>
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });

  return (
    <section id="stack" className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <Reveal>
        <SectionLabel num="03" text="Stack" />
        <h2
          className="font-display italic text-text"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Stack
        </h2>
      </Reveal>
      <div className="mt-10 border-t border-border">
        {filtered.map((cat) => {
          const isOpen = openSet.has(cat.name);
          const panelId = `stack-panel-${cat.name.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`;
          return (
            <Reveal key={cat.name} className="border-b border-border">
              <button
                type="button"
                onClick={() => toggle(cat.name)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="group flex w-full items-center justify-between py-5 text-left transition"
              >
                <span className="font-mono text-sm uppercase tracking-wider text-text-muted transition group-hover:text-text">
                  {cat.name}
                </span>
                <span
                  aria-hidden
                  className="font-mono text-xl leading-none text-text-muted transition group-hover:text-text"
                  style={{
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.25s cubic-bezier(.2,.7,.2,1), color 0.2s",
                  }}
                >
                  +
                </span>
              </button>
              {isOpen && (
                <ul id={panelId} className="flex flex-wrap gap-2 pb-5">
                  {cat.items.map((it) => (
                    <li
                      key={it.label}
                      className="rounded-full border border-border px-3 py-1.5 text-sm text-text transition hover:border-accent hover:text-accent"
                    >
                      {it.label}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
