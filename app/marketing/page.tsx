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
      <ParallaxZoomHero
        // Replace with your screen recording when ready: put the mp4 in public/videos/
        // videoSrc="/videos/marketing-search.mp4"
        videoSrc="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"
      />
      <SiteFooter />
    </>
  );
}
