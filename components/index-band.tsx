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
      <p className="t-mono-eyebrow u-gutter pt-6 pb-3 text-text-muted">What are you looking for?</p>

      {ROWS.map((row) => (
        <Link
          key={row.href}
          href={row.href}
          className="row-hover row-zebra rule-t u-gutter flex flex-col gap-3 py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6"
        >
          <span className="flex items-center gap-3.5">
            <span className="block-accent font-display grid h-[34px] w-[34px] flex-none place-items-center text-[15px]">
              {row.num}
            </span>
            <span className="t-display-s text-text">{row.label}</span>
          </span>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-muted lg:whitespace-nowrap">
            {row.tools.join(" · ")} →
          </span>
        </Link>
      ))}
    </section>
  );
}
