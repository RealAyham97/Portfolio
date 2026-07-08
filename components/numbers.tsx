import { numbers } from "@/content/numbers";
import { KpiTile } from "./kpi-tile";
import { Reveal } from "./reveal";
import { SectionLabel } from "./section-label";

export function Numbers() {
  return (
    <section id="numbers" className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <Reveal>
        <SectionLabel num="04" text="Numbers" />
        <h2
          className="font-display italic text-text"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Numbers
        </h2>
      </Reveal>
      <Reveal className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
        {numbers.map((n) => (
          <KpiTile key={n.label} {...n} />
        ))}
      </Reveal>
    </section>
  );
}
