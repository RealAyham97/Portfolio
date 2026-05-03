import { Reveal } from "./reveal";
import { KpiTile } from "./kpi-tile";
import { numbers, numbersCaption } from "@/content/numbers";

export function Numbers() {
  return (
    <section id="numbers" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal>
        <h2 className="font-display italic text-text" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
          Numbers
        </h2>
      </Reveal>
      <Reveal className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
        {numbers.map((n) => (
          <KpiTile key={n.label} {...n} />
        ))}
      </Reveal>
      <Reveal>
        <p className="mt-8 font-mono text-xs uppercase tracking-wider text-text-muted">{numbersCaption}</p>
      </Reveal>
    </section>
  );
}
