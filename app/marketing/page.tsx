import { ParallaxZoomHero } from "@/components/marketing/parallax-zoom-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing",
  description: "Paid ads, SEO, and analytics that close the loop.",
};

export default function MarketingPage() {
  return (
    <>
      <SiteNav />
      <ParallaxZoomHero />
      <SiteFooter />
    </>
  );
}
