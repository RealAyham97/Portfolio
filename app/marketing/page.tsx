import { MarketingContent } from "@/components/marketing/marketing-content";
import { ParallaxZoomHero } from "@/components/marketing/parallax-zoom-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Digital Marketing Services: SEO, Paid Ads & Analytics",
  description:
    "Freelance digital marketing from Amman, Jordan: SEO, Google and Meta ads, social media, and analytics that close the loop between spend and results, in Arabic and English.",
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
