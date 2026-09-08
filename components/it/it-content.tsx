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

/** Splits an existing service string at its colon — the part before becomes the
 *  row title, the part after the description. No copy is rewritten. */
export function splitAtColon(text: string) {
  const i = text.indexOf(":");
  if (i === -1) return { title: text, description: "" };
  return { title: text.slice(0, i), description: text.slice(i + 1).trim() };
}

/**
 * Crawlable services copy for the IT page. The scrollytelling card above is
 * decorative (aria-hidden), so this section carries the page's indexable text.
 */
export function ItContent() {
  return (
    <section id="services" className="rule-b grid grid-cols-1 lg:grid-cols-[1.3fr_1fr]">
      {/* Left cell — section statement */}
      <div className="border-b border-border px-5 py-10 lg:border-b-0 lg:border-r lg:py-11 lg:pl-14 lg:pr-12">
        <Reveal>
          <p className="t-mono-eyebrow mb-6 text-text-muted">Services</p>
          <h2 className="t-display-m text-text">
            Built like an analyst,
            <br />
            shipped like a <span className="italic text-accent">developer</span>
          </h2>
          <p className="t-body-l mt-6 max-w-[560px] text-text-muted">
            I offer freelance web development, Power BI dashboards, and data analysis from Amman,
            Jordan, working remotely with clients across MENA and worldwide. Every build starts with
            the numbers: what the business needs to know, then the website, dashboard, or analysis
            that answers it.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center bg-accent px-[22px] py-[14px] font-mono text-[12px] uppercase tracking-[0.14em] text-accent-fg transition hover:opacity-90"
          >
            Start a project
          </Link>
        </Reveal>
      </div>

      {/* Right cell — numbered service rows */}
      <div className="flex flex-col">
        <p className="t-mono-eyebrow px-5 pt-10 pb-4 text-text-muted lg:pl-12 lg:pr-14 lg:pt-11">
          What I help with
        </p>
        {SERVICES.map((s, i) => {
          const { title, description } = splitAtColon(s.text);
          return (
            <Link
              key={s.href}
              href={s.href}
              className="row-hover rule-t flex flex-1 flex-col justify-center px-5 py-[18px] lg:py-[26px] lg:pl-12 lg:pr-14"
            >
              <span className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="t-display-s text-text">{title}</span>
              </span>
              <span className="t-body-s mt-2 block pl-[26px] text-text-muted lg:pl-[28px]">
                {description}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
