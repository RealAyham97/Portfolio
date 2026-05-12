import { stack } from "@/content/stack";
import { Reveal } from "./reveal";

export function Stack({ categories }: { categories?: string[] }) {
  const filtered = categories
    ? stack.filter((c) => categories.includes(c.name))
    : stack;

  return (
    <section id="stack" className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <Reveal>
        <h2
          className="font-display italic text-text"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Stack
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        {filtered.map((cat) => (
          <Reveal key={cat.name} className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-wider text-text-muted">
              {cat.name}
            </div>
            <ul className="flex flex-wrap gap-2">
              {cat.items.map((it) => (
                <li
                  key={it.label}
                  className="rounded-full border border-border px-3 py-1.5 text-sm text-text transition hover:border-accent hover:text-accent"
                >
                  {it.label}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
