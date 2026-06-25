import { About } from "@/components/about";
import { Hero } from "@/components/hero/hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import type { Metadata } from "next";

// Self-referential canonical for the home page (the root layout sets none).
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <About />
      </main>
      <SiteFooter />
    </>
  );
}
