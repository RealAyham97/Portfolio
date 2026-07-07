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
    title: service.en.metaTitle,
    description: service.en.metaDescription,
    path: `/services/${service.slug}`,
    languages: {
      en: `/services/${service.slug}`,
      ar: `/ar/services/${service.slug}`,
      "x-default": `/services/${service.slug}`,
    },
  });
}

export default async function ServiceRoute({ params }: Props) {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <SiteNav />
      <ServicePage service={service} locale="en" />
      <SiteFooter />
    </>
  );
}
