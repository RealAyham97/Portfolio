import { MarkdownBody } from "@/components/markdown-body";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { profile } from "@/content/profile";
import { posts } from "@/content/posts";
import { SITE_URL, pageMeta } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
  });
}

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: profile.name, url: SITE_URL },
    publisher: { "@type": "Person", name: profile.name, url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    image: `${SITE_URL}/opengraph-image`,
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static, not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <SiteNav />
      <main>
        <article className="mx-auto max-w-6xl px-6 pt-32 pb-12 md:pt-40 md:pb-16">
          <Reveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-text-muted transition hover:text-text mb-8"
            >
              &larr; Back to blog
            </Link>
          </Reveal>

          <Reveal>
            <header className="mb-10 border-b border-border pb-8">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                <time className="font-mono text-xs uppercase tracking-wider text-text-muted">
                  {formatDate(post.date)}
                </time>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h1
                className="font-display italic text-text leading-tight"
                style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)" }}
              >
                {post.title}
              </h1>
              <p className="mt-4 text-lg text-text-muted leading-relaxed max-w-prose">
                {post.description}
              </p>
            </header>
          </Reveal>

          <Reveal>
            <MarkdownBody content={post.body} />
          </Reveal>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
