import { ServicePage } from "@/components/services/service-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { getService, services } from "@/content/services";
import { pageMeta } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ service: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMeta({
    title: service.ar.metaTitle,
    description: service.ar.metaDescription,
    path: `/ar/services/${service.slug}`,
    locale: "ar_JO",
    languages: {
      en: `/services/${service.slug}`,
      ar: `/ar/services/${service.slug}`,
      "x-default": `/services/${service.slug}`,
    },
  });
}

export default async function ArabicServiceRoute({ params }: Props) {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <SiteNav />
      {/* The root <html> is lang="en"; scope the Arabic content explicitly so
          search engines and screen readers treat it as RTL Arabic. */}
      <div lang="ar" dir="rtl">
        <ServicePage service={service} locale="ar" />
      </div>
      <SiteFooter />
    </>
  );
}
