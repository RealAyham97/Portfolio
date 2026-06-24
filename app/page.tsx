import { About } from "@/components/about";
import { Hero } from "@/components/hero/hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

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
