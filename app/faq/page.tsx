import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "FAQ",
  description:
    "Answers to common questions about working with Aiham AlRawashdeh on development, data, and digital marketing projects.",
  path: "/faq",
});

const faqs = [
  {
    q: "What services do you offer?",
    a: "I work across two main areas: IT Services (web development, data analysis, business analysis, and business intelligence) and Digital Marketing (paid acquisition, SEO, and analytics). Both are data-driven and built around measurable outcomes.",
  },
  {
    q: "Who do you typically work with?",
    a: "Early-stage founders who need growth strategy, and mid-sized businesses that want to surface operational insights from their data. I've worked across automotive, aviation, consulting, and media.",
  },
  {
    q: "Where are you based? Do you work remotely?",
    a: "I'm based in Amman, Jordan, and work with clients remotely and in-person across the region.",
  },
  {
    q: "How do I start working with you?",
    a: "The easiest way is through the Contact page. Drop me a message with a brief description of what you're trying to solve and I'll get back to you within 24 hours.",
  },
  {
    q: "Are you available for freelance or consulting engagements?",
    a: "Yes. I'm open to freelance projects, consulting engagements, and full-time roles. Short-term or long-term, it depends on the scope and fit.",
  },
  {
    q: "What does a typical project look like?",
    a: "It usually starts with a discovery session to understand the problem, followed by a scoped proposal. From there, it depends on the work. Dashboards and automations typically run 2–6 weeks, marketing campaigns are ongoing.",
  },
] as const;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static, not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SiteNav />
      <main>
        <section className="mx-auto max-w-6xl px-6 pt-32 pb-4 md:pt-40 md:pb-8">
          <Reveal>
            <h1
              className="font-display italic text-text/80 leading-none"
              style={{ fontSize: "clamp(3.5rem, 8vw, 5rem)" }}
            >
              FAQ
            </h1>
          </Reveal>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <dl className="divide-y divide-border">
            {faqs.map((item, i) => (
              <Reveal key={i}>
                <details className="group py-6">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                    <dt className="text-base font-medium text-text">
                      {item.q}
                    </dt>
                    <span
                      className="shrink-0 text-text-muted transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </span>
                  </summary>
                  <dd className="mt-4 text-sm text-text-muted leading-relaxed">
                    {item.a}
                  </dd>
                </details>
              </Reveal>
            ))}
          </dl>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
