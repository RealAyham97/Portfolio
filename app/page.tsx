import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero/hero";
import { Numbers } from "@/components/numbers";
import { SiteNav } from "@/components/site-nav";
import { Stack } from "@/components/stack";
import { SelectedWork } from "@/components/work/selected-work";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <About />
        <SelectedWork />
        <Stack />
        <Numbers />
        <Contact />
      </main>
    </>
  );
}
