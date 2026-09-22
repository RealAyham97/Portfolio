import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { posts } from "@/content/posts";
import { profile } from "@/content/profile";
import { SITE_URL, pageMeta } from "@/lib/seo";
import Link from "next/link";

export const metadata = pageMeta({
  title: "Blog",
  description:
    "Writing on development, data, and digital marketing, with a focus on the MENA region.",
  path: "/blog",
});

// The index itself had no structured data — only the individual posts did.
// Listing the posts here lets the index be understood as a collection rather
// than an unlabelled page of links.
const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: `${profile.name} — Blog`,
  description:
    "Writing on development, data, and digital marketing, with a focus on the MENA region.",
  url: `${SITE_URL}/blog`,
  inLanguage: "en",
  author: { "@type": "Person", name: profile.name, url: SITE_URL },
  blogPost: posts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `${SITE_URL}/blog/${post.slug}`,
    keywords: post.tags.join(", "),
    author: { "@type": "Person", name: profile.name, url: SITE_URL },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
  ],
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
      <JsonLd data={blogJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <SiteNav />
      <main>
        <section className="mx-auto max-w-6xl px-6 pt-10 pb-4 md:pb-8">
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
                          className=" border border-border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h2 className="font-display italic text-text text-xl md:text-2xl leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-text-muted leading-relaxed line-clamp-2">{post.description}</p>
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
