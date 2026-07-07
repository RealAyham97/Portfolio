import { posts } from "@/content/posts";
import { services } from "@/content/services";
import { SITE_URL } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { path: "/", changeFrequency: "monthly", priority: 1 },
      { path: "/it", changeFrequency: "monthly", priority: 0.8 },
      { path: "/marketing", changeFrequency: "monthly", priority: 0.8 },
      { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
      { path: "/faq", changeFrequency: "yearly", priority: 0.5 },
      { path: "/ar/faq", changeFrequency: "yearly", priority: 0.5 },
      { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
    ] as const
  ).map(({ path, changeFrequency, priority }) => ({
    // Keep the home URL without a trailing slash to match its canonical.
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  // Service landing pages, English and Arabic. Both carry hreflang alternates
  // in their page metadata; listing both here keeps discovery independent of
  // internal links.
  const serviceRoutes: MetadataRoute.Sitemap = services.flatMap((s) => [
    {
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/ar/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ]);

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
