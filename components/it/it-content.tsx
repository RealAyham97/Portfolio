import Link from "next/link";
import { Reveal } from "../reveal";

const SERVICES = [
  {
    href: "/services/web-development",
    text: "Web development: fast, SEO-ready websites and web apps built with Next.js and React.",
  },
  {
    href: "/services/dashboards",
    text: "Power BI dashboards: KPI reporting and business intelligence your team checks daily.",
  },
  {
    href: "/services/data-analysis",
    text: "Data and business analysis: metrics, requirements, and recommendations you can act on.",
  },
] as const;

/**
 * Crawlable services copy for the IT page. The scrollytelling card above is
 * decorative (aria-hidden), so this section carries the page's indexable text.
 */
export function ItContent() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <div className="max-w-3xl space-y-12">
        <Reveal className="space-y-4">
          <h2
            className="font-display italic text-text"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            Built like an analyst, shipped like a developer
          </h2>
          <p className="text-lg text-text-muted leading-relaxed">
            I offer freelance web development, Power BI dashboards, and data analysis from Amman,
            Jordan, working remotely with clients across MENA and worldwide. Every build starts with
            the numbers: what the business needs to know, then the website, dashboard, or analysis
            that answers it.
          </p>
        </Reveal>

        <Reveal className="space-y-4">
          <h2
            className="font-display italic text-text"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            What I help with
          </h2>
          <ul className="space-y-3 text-lg text-text-muted leading-relaxed">
            {SERVICES.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="transition hover:text-text underline decoration-border underline-offset-4 hover:decoration-accent"
                >
                  {s.text}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-accent px-8 py-3.5 font-mono text-sm text-accent-fg transition hover:opacity-90"
          >
            Start a project
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
