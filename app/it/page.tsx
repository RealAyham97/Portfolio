import { ParallaxItCard } from "@/components/it/ParallaxItCard";
import { ItContent } from "@/components/it/it-content";
import { JsonLd } from "@/components/json-ld";
import { Numbers } from "@/components/numbers";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { SelectedWork } from "@/components/work/selected-work";
import { profile } from "@/content/profile";
import { formatAmmanTime } from "@/lib/format";
import { SITE_URL, pageMeta } from "@/lib/seo";

const DESCRIPTION =
  "Freelance web development, Power BI dashboards, and data analysis from Amman, Jordan. Websites, business intelligence, and automation that turn your data into decisions.";

// Title kept short enough that the "· Aiham AlRawashdeh" template suffix still
// fits inside the ~60 characters Google renders before truncating.
export const metadata = pageMeta({
  title: "Web Development & Power BI Dashboards",
  description: DESCRIPTION,
  path: "/it",
});

// This page is the hub for the /services/* pages beneath it, so it carries the
// same Service shape they do — without it the hub was semantically weaker than
// its own spokes.
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Web development, Power BI dashboards & data analysis",
  serviceType: "IT services",
  description: DESCRIPTION,
  url: `${SITE_URL}/it`,
  inLanguage: "en",
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
    { "@type": "ListItem", position: 2, name: "IT Services", item: `${SITE_URL}/it` },
  ],
};

export default function ITPage() {
  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
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
