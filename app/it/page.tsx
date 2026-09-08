import { ParallaxItCard } from "@/components/it/ParallaxItCard";
import { ItContent } from "@/components/it/it-content";
import { Numbers } from "@/components/numbers";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { SelectedWork } from "@/components/work/selected-work";
import { formatAmmanTime } from "@/lib/format";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "IT Services: Web Development, Power BI Dashboards & Data Analysis",
  description:
    "Freelance web development, Power BI dashboards, and data analysis from Amman, Jordan. Websites, business intelligence, and automation that turn your data into decisions.",
  path: "/it",
});

export default function ITPage() {
  return (
    <>
      <SiteNav initialTime={formatAmmanTime()} />
      <main>
        <ParallaxItCard />
        <ItContent />
        <SelectedWork />
        <Numbers />
      </main>
      <SiteFooter />
    </>
  );
}
