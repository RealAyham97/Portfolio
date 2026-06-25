import { posts } from "@/content/posts";
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
      { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
    ] as const
  ).map(({ path, changeFrequency, priority }) => ({
    // Keep the home URL without a trailing slash to match its canonical.
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
