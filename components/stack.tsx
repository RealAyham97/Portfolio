import { stack } from "@/content/stack";
import { Reveal } from "./reveal";

export function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal>
        <h2
          className="font-display italic text-text"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Stack
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        {stack.map((cat) => (
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
