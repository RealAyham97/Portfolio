import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing",
  description: "Paid ads, SEO, and analytics that close the loop.",
};

export default function MarketingPage() {
  return (
    <>
      <SiteNav />
      <main>
        <section className="mx-auto max-w-6xl px-6 pt-32 pb-4 md:pt-40 md:pb-8">
          <Reveal>
            <h1
              className="font-display italic text-text/80 leading-none"
              style={{ fontSize: "clamp(3.5rem, 8vw, 5rem)" }}
            >
              Digital
              <br />
              Marketing
            </h1>
          </Reveal>
          <Reveal>
            <p className="mt-8 font-mono text-sm uppercase tracking-wider text-text-muted">
              Coming soon
            </p>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
