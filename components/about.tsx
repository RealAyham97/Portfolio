import { about } from "@/content/about";
import { Reveal } from "./reveal";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <Reveal>
        <h2
          className="font-display italic text-text"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          About
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-12 md:grid-cols-[1.2fr_1fr]">
        <Reveal className="space-y-5 text-lg text-text-muted leading-relaxed">
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
        <Reveal className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-1 md:gap-8">
          <AboutBlock label="Now" body={<p>{about.now}</p>} />
          <AboutBlock label="Past" body={<List items={about.past} />} />
          <AboutBlock label="Industries" body={<List items={about.industries} />} />
        </Reveal>
      </div>
    </section>
  );
}

function AboutBlock({ label, body }: { label: string; body: React.ReactNode }) {
  return (
    <div className="space-y-2 border-t border-border pt-4">
      <div className="font-mono text-xs uppercase tracking-wider text-text-muted">{label}</div>
      <div className="text-text">{body}</div>
    </div>
  );
}

function List({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-1">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}
