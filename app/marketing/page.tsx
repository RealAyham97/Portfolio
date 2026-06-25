import { MarketingContent } from "@/components/marketing/marketing-content";
import { ParallaxZoomHero } from "@/components/marketing/parallax-zoom-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Digital Marketing",
  description: "Paid ads, SEO, and analytics that close the loop.",
  path: "/marketing",
});

export default function MarketingPage() {
  return (
    <>
      <SiteNav />
      <main>
        <ParallaxZoomHero />
        <MarketingContent />
      </main>
      <SiteFooter />
    </>
  );
}
