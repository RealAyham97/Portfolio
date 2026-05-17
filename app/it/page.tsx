import { ParallaxItCard } from "@/components/it/ParallaxItCard";
import { Numbers } from "@/components/numbers";
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
        <ParallaxItCard />
        <SelectedWork />
        <Stack categories={IT_STACK_CATEGORIES} />
        <Numbers />
      </main>
      <SiteFooter />
    </>
  );
}
