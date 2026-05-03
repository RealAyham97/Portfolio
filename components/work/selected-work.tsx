import { projects } from "@/content/projects";
import { Reveal } from "../reveal";
import { FeaturedProject } from "./featured-project";
import { ProjectGrid } from "./project-grid";

export function SelectedWork() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-24 md:py-32 space-y-16">
      <Reveal>
        <h2 className="font-display italic text-text" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
          Selected Work
        </h2>
      </Reveal>
      {featured && <FeaturedProject project={featured} />}
      <ProjectGrid projects={rest} />
    </section>
  );
}
