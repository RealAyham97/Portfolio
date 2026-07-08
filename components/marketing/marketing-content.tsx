import Link from "next/link";
import { Reveal } from "../reveal";
import { SectionLabel } from "../section-label";

const SERVICES = [
  "Paid ads: campaign strategy, creative, targeting, and optimization on Google Ads, Facebook, Instagram, and Snapchat.",
  "Social media management: content and community for LinkedIn, Snapchat, Instagram, and Facebook.",
  "SEO: technical and content work that wins the searches that matter.",
  "Analytics: dashboards and reporting that tie spend and posts to real results.",
];

export function MarketingContent() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
        {/* Experience + certification — first in DOM so they sit at the top on
            mobile; placed into the right column on desktop via grid coords. */}
        <Reveal className="space-y-8 md:col-start-2 md:row-start-1">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-text-muted">
              Experience
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-text leading-snug">Marketing Officer</p>
              <p className="text-sm text-text-muted">Madeed · Since June 2026</p>
            </div>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-text-muted">
              Certification
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-text leading-snug">
                Mastering Social Media Marketing &amp; SEO with AI Integration
              </p>
              <p className="text-sm text-text-muted">SAE Institute Amman · 2026</p>
            </div>
          </div>
        </Reveal>

        <div className="space-y-12 md:col-start-1 md:row-start-1">
          <Reveal className="space-y-4">
            <SectionLabel num="01" text="Services" />
            <h2
              className="font-display italic text-text"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              Marketing that closes the loop
            </h2>
            <p className="text-lg text-text-muted leading-relaxed">
              I help brands get in front of the right people and turn attention into measurable
              results. That means building and running paid ad campaigns, managing social media
              accounts across LinkedIn, Snapchat, Instagram, and Facebook, sharpening SEO so the
              right searches find you, and wiring everything to analytics so every campaign and
              every post can be traced to an outcome.
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
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="space-y-4">
            <p className="text-lg text-text-muted leading-relaxed">
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
              className="inline-block rounded-full bg-accent px-8 py-3.5 font-mono text-sm text-accent-fg transition hover:opacity-90"
            >
              Start a project
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
