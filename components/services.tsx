import Link from "next/link";
import { Reveal } from "./reveal";

const routes = [
  { href: "/it", label: "Websites, Design, & Dashboards" },
  { href: "/marketing", label: "Paid ads, SEO, & Analytics" },
] as const;

export function Services() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <Reveal>
        <p className="text-center text-base text-text-muted">What are you looking for?</p>
      </Reveal>
      <div className="mt-6 flex flex-col items-center gap-4">
        {routes.map((r) => (
          <Reveal key={r.href}>
            <Link
              href={r.href}
              className="inline-block rounded-full bg-accent px-8 py-3.5 text-center font-mono text-sm text-accent-fg transition hover:opacity-90"
            >
              {r.label}
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
