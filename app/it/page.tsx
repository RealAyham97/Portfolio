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
        <section className="mx-auto max-w-6xl px-6 pt-32 pb-4 md:pt-40 md:pb-8">
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
        </section>
        <SelectedWork />
        <Stack categories={IT_STACK_CATEGORIES} />
        <Numbers />
      </main>
      <SiteFooter />
    </>
  );
}
