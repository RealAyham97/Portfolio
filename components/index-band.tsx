import { stack } from "@/content/stack";
import Link from "next/link";

// Row titles are the existing service CTA labels, byte-identical to the ones
// that lived in components/about.tsx before the fork moved up the page.
// Tool strings are derived from content/stack.ts rather than written, so the
// labels stay truthful to what's actually in the stack.
function tools(...categories: string[]) {
  return categories
    .flatMap((name) => stack.find((c) => c.name === name)?.items ?? [])
    .map((i) => i.label);
}

const ROWS = [
  {
    href: "/it",
    num: "01",
    label: "Websites, Design, & Dashboards",
    tools: tools("Visualization", "Programming").slice(0, 4),
  },
  {
    href: "/marketing",
    num: "02",
    label: "Paid ads, SEO, & Analytics",
    tools: tools("Digital Marketing").slice(0, 4),
  },
] as const;

export function IndexBand() {
  return (
    <section id="index" aria-label="What are you looking for?">
      <p className="t-mono-eyebrow u-gutter pt-[30px] pb-[6px] text-text-muted">
        What are you looking for?
      </p>

      {ROWS.map((row) => (
        <Link
          key={row.href}
          href={row.href}
          className="row-hover rule-t u-gutter flex flex-col gap-3 py-[26px] lg:flex-row lg:items-center lg:justify-between lg:gap-6"
        >
          <span className="flex flex-col gap-2 lg:flex-row lg:items-baseline lg:gap-[26px]">
            <span className="font-mono text-[12px] tracking-[0.10em] text-accent">{row.num}</span>
            <span className="font-display text-[34px] leading-none tracking-[-0.02em] text-text lg:text-[58px]">
              {row.label}
            </span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted lg:whitespace-nowrap lg:text-[11px] lg:tracking-[0.16em]">
            {row.tools.join(" · ")} →
          </span>
        </Link>
      ))}
    </section>
  );
}
