import { ItExperienceCard } from "@/components/it/ItExperienceCard";
import { Numbers } from "@/components/numbers";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Stack } from "@/components/stack";
import { SelectedWork } from "@/components/work/selected-work";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IT Services",
  description: "Foundry dashboards, automation, and business intelligence.",
};

const IT_STACK_CATEGORIES = ["Visualization", "Programming", "Automation & Cloud", "Tools"];

export default function ITPage() {
  return (
    <>
      <SiteNav />
      <main>
        <section className="relative mx-auto grid max-w-6xl gap-12 px-6 pt-24 pb-12 md:grid-cols-[1.4fr_1fr] md:gap-16 md:pt-32 md:pb-16">
          <div className="flex flex-col justify-center">
            <Reveal>
              <h1
                className="font-display italic text-text/80 leading-none"
                style={{ fontSize: "clamp(3.5rem, 8vw, 5rem)" }}
              >
                IT
                <br />
                Services
              </h1>
            </Reveal>
          </div>
          <div className="flex items-center">
            <ItExperienceCard />
          </div>
        </section>
        <SelectedWork />
        <Stack categories={IT_STACK_CATEGORIES} />
        <Numbers />
      </main>
      <SiteFooter />
    </>
  );
}
