import { Reveal } from "@/components/reveal";
import { profile } from "@/content/profile";
import type { Service } from "@/content/services";
import { SITE_URL } from "@/lib/seo";
import Link from "next/link";

type Locale = "en" | "ar";

const OTHER_LOCALE_LINK: Record<Locale, string> = {
  en: "اقرأ هذه الصفحة بالعربية",
  ar: "Read this page in English",
};

const HOME_CRUMB: Record<Locale, string> = { en: "Home", ar: "الرئيسية" };

function pathsFor(service: Service): Record<Locale, string> {
  return { en: `/services/${service.slug}`, ar: `/ar/services/${service.slug}` };
}

/**
 * Shared body for the English and Arabic service landing pages. The Arabic
 * variant is wrapped in dir="rtl"/lang="ar" by its route.
 */
export function ServicePage({ service, locale }: { service: Service; locale: Locale }) {
  const content = service[locale];
  const paths = pathsFor(service);
  const otherLocale: Locale = locale === "en" ? "ar" : "en";

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.h1,
    serviceType: content.serviceType,
    description: content.metaDescription,
    url: `${SITE_URL}${paths[locale]}`,
    inLanguage: locale,
    areaServed: ["Jordan", "Saudi Arabia", "United Arab Emirates", "MENA", "Worldwide"],
    provider: {
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.role,
      url: SITE_URL,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: HOME_CRUMB[locale], item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: content.h1,
        item: `${SITE_URL}${paths[locale]}`,
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static, not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static, not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static, not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="mx-auto max-w-6xl px-6 pt-32 pb-4 md:pt-40 md:pb-8">
        <Reveal>
          <h1
            className="font-display italic text-text/80 leading-tight"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)" }}
          >
            {content.h1}
          </h1>
        </Reveal>
        <Reveal>
          <Link
            href={paths[otherLocale]}
            className="mt-4 inline-block font-mono text-xs uppercase tracking-wider text-text-muted underline underline-offset-4 transition hover:text-text"
          >
            {OTHER_LOCALE_LINK[locale]}
          </Link>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12 md:py-16 md:mx-0 md:ml-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] space-y-12">
        <Reveal className="space-y-5 text-lg text-text-muted leading-relaxed">
          {content.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>

        <Reveal className="space-y-4">
          <h2
            className="font-display italic text-text"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)" }}
          >
            {content.offeringsTitle}
          </h2>
          <ul className="space-y-3 text-lg text-text-muted leading-relaxed list-disc ps-6">
            {content.offerings.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="space-y-4">
          <h2
            className="font-display italic text-text"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)" }}
          >
            {content.processTitle}
          </h2>
          <ol className="space-y-3 text-lg text-text-muted leading-relaxed list-decimal ps-6">
            {content.process.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="space-y-2">
          <h2
            className="font-display italic text-text mb-4"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)" }}
          >
            {content.faqTitle}
          </h2>
          <dl className="divide-y divide-border border-t border-border">
            {content.faqs.map((item) => (
              <div key={item.q} className="py-5">
                <dt className="text-base font-medium text-text">{item.q}</dt>
                <dd className="mt-2 text-text-muted leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-accent px-8 py-3.5 font-mono text-sm text-accent-fg transition hover:opacity-90"
          >
            {content.cta}
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
