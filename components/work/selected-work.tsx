import { projects } from "@/content/projects";
import { FeaturedProject } from "./featured-project";
import { ProjectLedger } from "./project-ledger";

export function SelectedWork() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="rule-b">
      <h2 className="t-mono-eyebrow px-5 pt-10 pb-2 text-text-muted lg:px-14">Selected Work</h2>
      {featured && <FeaturedProject project={featured} />}
      <ProjectLedger projects={rest} />
    </section>
  );
}
