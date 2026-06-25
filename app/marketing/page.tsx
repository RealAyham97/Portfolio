import { MarketingContent } from "@/components/marketing/marketing-content";
import { ParallaxZoomHero } from "@/components/marketing/parallax-zoom-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { profile } from "@/content/profile";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing",
  description: "Paid ads, SEO, and analytics that close the loop.",
  alternates: { canonical: "/marketing" },
  openGraph: {
    type: "website",
    url: "/marketing",
    siteName: profile.name,
    title: "Digital Marketing · Aiham AlRawashdeh",
    description: "Paid ads, SEO, and analytics that close the loop.",
    locale: "en_US",
  },
};

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
