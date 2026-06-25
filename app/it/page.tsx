import { ParallaxItCard } from "@/components/it/ParallaxItCard";
import { Numbers } from "@/components/numbers";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Stack } from "@/components/stack";
import { SelectedWork } from "@/components/work/selected-work";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "IT Services",
  description:
    "Web development, Power BI dashboards, business intelligence, and automation that turn your data into decisions.",
  path: "/it",
});

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
