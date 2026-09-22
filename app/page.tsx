import { Hero } from "@/components/hero/hero";
import { IndexBand } from "@/components/index-band";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { profile } from "@/content/profile";
import { formatAmmanTime } from "@/lib/format";
import { SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";

// Self-referential canonical for the home page (the root layout sets none).
export const metadata: Metadata = { alternates: { canonical: "/" } };

// The root entity for the site. The Person in the root layout describes who
// runs it; this describes the site itself and names that Person as publisher,
// which is what ties the two together for search engines.
const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: profile.name,
  alternateName: `${profile.name} — ${profile.role}`,
  url: SITE_URL,
  inLanguage: ["en", "ar"],
  publisher: { "@type": "Person", name: profile.name, url: SITE_URL },
};

export default function Home() {
  return (
    <>
      <JsonLd data={webSiteJsonLd} />
      <SiteNav initialTime={formatAmmanTime()} />
      <main>
        <Hero />
        <IndexBand />
      </main>
      <SiteFooter />
    </>
  );
}
