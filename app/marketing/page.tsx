import { JsonLd } from "@/components/json-ld";
import { MarketingContent } from "@/components/marketing/marketing-content";
import { ParallaxZoomHero } from "@/components/marketing/parallax-zoom-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { profile } from "@/content/profile";
import { formatAmmanTime } from "@/lib/format";
import { SITE_URL, pageMeta } from "@/lib/seo";

const DESCRIPTION =
  "Freelance digital marketing from Amman, Jordan: SEO, Google and Meta ads, social media, and analytics that close the loop between spend and results, in Arabic and English.";

// Shortened so the template suffix still fits inside the rendered SERP title.
export const metadata = pageMeta({
  title: "Digital Marketing: SEO, Ads & Analytics",
  description: DESCRIPTION,
  path: "/marketing",
});

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Digital marketing: paid ads, SEO & analytics",
  serviceType: "Digital marketing",
  description: DESCRIPTION,
  url: `${SITE_URL}/marketing`,
  inLanguage: ["en", "ar"],
  areaServed: ["Jordan", "Saudi Arabia", "United Arab Emirates", "MENA", "Worldwide"],
  provider: {
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    url: SITE_URL,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Digital Marketing", item: `${SITE_URL}/marketing` },
  ],
};

export default function MarketingPage() {
  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <SiteNav initialTime={formatAmmanTime()} />
      <main>
        <ParallaxZoomHero />
        <MarketingContent />
      </main>
      <SiteFooter />
    </>
  );
}
