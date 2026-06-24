import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { posts } from "@/content/posts";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on data, marketing, and building things that work.",
};

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <SiteNav />
      <main>
        <section className="mx-auto max-w-6xl px-6 pt-32 pb-4 md:pt-40 md:pb-8">
          <Reveal>
            <h1
              className="font-display italic text-text/80 leading-none"
              style={{ fontSize: "clamp(3rem, 10vw, 5rem)" }}
            >
              Blog
            </h1>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <div className="space-y-0 border-t border-border">
            {sorted.map((post) => (
              <Reveal key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-2 border-b border-border py-8 transition hover:opacity-80"
                >
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <time className="font-mono text-xs uppercase tracking-wider text-text-muted">
                      {formatDate(post.date)}
                    </time>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h2 className="font-display italic text-text text-xl md:text-2xl leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-text-muted leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
