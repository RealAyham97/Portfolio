import { profile } from "@/content/profile";
import type { Metadata } from "next";

export const SITE_URL = "https://www.aihamalrawashdeh.com";

type PageMetaArgs = {
  /** Page title, without the site-name suffix (the root template adds it). */
  title: string;
  description: string;
  /** Absolute path, e.g. "/it". Used for the self-referential canonical and og:url. */
  path: string;
  type?: "website" | "article";
  /** ISO date, only used for article pages. */
  publishedTime?: string;
  /**
   * hreflang alternates for translated pages, e.g.
   * { en: "/services/dashboards", ar: "/ar/services/dashboards", "x-default": "/services/dashboards" }.
   */
  languages?: Record<string, string>;
  /** BCP 47 locale for Open Graph. @default "en_US" */
  locale?: string;
};

/**
 * Builds per-page metadata with a self-referential canonical and a matching
 * Open Graph / Twitter card. Without this, child routes inherit the root's
 * canonical and OG, which makes every page look like a duplicate of the home page.
 */
export function pageMeta({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  languages,
  locale = "en_US",
}: PageMetaArgs): Metadata {
  const ogTitle = `${title} · ${profile.name}`;
  const openGraph: Metadata["openGraph"] =
    type === "article"
      ? {
          type: "article",
          url: path,
          siteName: profile.name,
          title: ogTitle,
          description,
          locale,
          publishedTime,
          authors: [profile.name],
        }
      : {
          type: "website",
          url: path,
          siteName: profile.name,
          title: ogTitle,
          description,
          locale,
        };

  return {
    title,
    description,
    alternates: { canonical: path, ...(languages ? { languages } : {}) },
    openGraph,
    twitter: { card: "summary_large_image", title: ogTitle, description },
  };
}
