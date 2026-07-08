import { projects } from "@/content/projects";
import { Reveal } from "../reveal";
import { SectionLabel } from "../section-label";
import { FeaturedProject } from "./featured-project";
import { ProjectCarousel } from "./project-carousel";

export function SelectedWork() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-12 md:py-16 space-y-10">
      <Reveal>
        <SectionLabel num="02" text="Selected work" />
        <h2
          className="font-display italic text-text"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Selected Work
        </h2>
      </Reveal>
      {featured && <FeaturedProject project={featured} />}
      <ProjectCarousel projects={rest} />
    </section>
  );
}
