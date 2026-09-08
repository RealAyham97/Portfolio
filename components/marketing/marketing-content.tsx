import Link from "next/link";
import { splitAtColon } from "../it/it-content";
import { Reveal } from "../reveal";

const SERVICES = [
  "Paid ads: campaign strategy, creative, targeting, and optimization on Google Ads, Facebook, Instagram, and Snapchat.",
  "Social media management: content and community for LinkedIn, Snapchat, Instagram, and Facebook.",
  "SEO: technical and content work that wins the searches that matter.",
  "Analytics: dashboards and reporting that tie spend and posts to real results.",
];

export function MarketingContent() {
  return (
    <>
      {/* Services band — same 1.3fr / 1fr split as IT so the pages read as siblings */}
      <section id="services" className="rule-b grid grid-cols-1 lg:grid-cols-[1.3fr_1fr]">
        <div className="border-b border-border px-5 py-10 lg:border-b-0 lg:border-r lg:py-11 lg:pl-14 lg:pr-12">
          <Reveal>
            <p className="t-mono-eyebrow mb-6 text-text-muted">Services</p>
            <h2 className="t-display-m text-text">
              Marketing that
              <br />
              <span className="italic text-accent">closes the loop</span>
            </h2>
            <p className="t-body-l mt-6 max-w-[560px] text-text-muted">
              I help brands get in front of the right people and turn attention into measurable
              results. That means building and running paid ad campaigns, managing social media
              accounts across LinkedIn, Snapchat, Instagram, and Facebook, sharpening SEO so the
              right searches find you, and wiring everything to analytics so every campaign and
              every post can be traced to an outcome.
            </p>
            <p className="t-body-l mt-6 max-w-[560px] text-text-muted">
              Want the details, deliverables, and pricing approach?{" "}
              <Link
                href="/services/digital-marketing"
                className="text-text underline decoration-border underline-offset-4 transition hover:decoration-accent"
              >
                See the full digital marketing service
              </Link>
              .
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center bg-accent px-[22px] py-[14px] font-mono text-[12px] uppercase tracking-[0.14em] text-accent-fg transition hover:opacity-90"
            >
              Start a project
            </Link>
          </Reveal>
        </div>

        <div className="flex flex-col">
          <p className="t-mono-eyebrow px-5 pt-10 pb-4 text-text-muted lg:pl-12 lg:pr-14 lg:pt-11">
            What I help with
          </p>
          {SERVICES.map((s, i) => {
            const { title, description } = splitAtColon(s);
            return (
              <div
                key={s}
                className="row-hover rule-t flex flex-1 flex-col justify-center px-5 py-[18px] lg:py-5 lg:pl-12 lg:pr-14"
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
              </div>
            );
          })}
        </div>
      </section>

      {/* Experience / certification band */}
      <section className="rule-b grid grid-cols-1 lg:grid-cols-2">
        <div className="border-b border-border px-5 py-8 lg:border-b-0 lg:border-r lg:pb-9 lg:pl-14 lg:pr-12 lg:pt-8">
          <div className="t-mono-label text-text-muted">Experience</div>
          <p className="t-display-s mt-4 text-text" style={{ lineHeight: 1.05 }}>
            Marketing Officer
          </p>
          <p className="mt-2 font-mono text-[12px] text-text-muted">Madeed · Since June 2026</p>
        </div>

        <div className="px-5 py-8 lg:pb-9 lg:pl-12 lg:pr-14 lg:pt-8">
          <div className="t-mono-label text-text-muted">Certification</div>
          <p className="t-display-s mt-4 text-text" style={{ lineHeight: 1.05 }}>
            Mastering Social Media Marketing &amp; SEO with AI Integration
          </p>
          <p className="mt-2 font-mono text-[12px] text-text-muted">SAE Institute Amman · 2026</p>
        </div>
      </section>
    </>
  );
}
