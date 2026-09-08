import { Hero } from "@/components/hero/hero";
import { IndexBand } from "@/components/index-band";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { formatAmmanTime } from "@/lib/format";
import type { Metadata } from "next";

// Self-referential canonical for the home page (the root layout sets none).
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <SiteNav initialTime={formatAmmanTime()} />
      <main>
        <Hero />
        <IndexBand />
      </main>
      <SiteFooter />
    </>
  );
}
