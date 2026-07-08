import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { profile } from "@/content/profile";
import { SITE_URL } from "@/lib/seo";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

const GITHUB_URL = "https://github.com/RealAyham97";
// Home-page meta description: keyword-relevant, distinct from the hero tagline.
const HOME_DESCRIPTION =
  "Freelance full-stack developer and digital marketer in Amman, Jordan. I build websites, Power BI dashboards, and data-driven marketing that delivers measurable results.";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${profile.name} · ${profile.role}`, template: `%s · ${profile.name}` },
  description: HOME_DESCRIPTION,
  // No canonical here on purpose: a blanket canonical would propagate to every
  // child route and make each page look like a duplicate of the home page.
  // The home page sets its own in app/page.tsx; other routes use pageMeta().
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title: `${profile.name} · ${profile.role}`,
    description: HOME_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} · ${profile.role}`,
    description: HOME_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

// Contact details (email, phone) are intentionally kept out of the structured
// data so they aren't exposed sitewide in page source. Reach out via /contact.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description: HOME_DESCRIPTION,
  url: SITE_URL,
  address: { "@type": "PostalAddress", addressLocality: "Amman", addressCountry: "JO" },
  knowsAbout: [
    "Full-stack development",
    "Web development",
    "Digital marketing",
    "SEO",
    "Data analysis",
    "Business analysis",
    "Business intelligence",
    "Power BI",
  ],
  knowsLanguage: ["en", "ar"],
  hasOccupation: {
    "@type": "Occupation",
    name: "Freelance Full-Stack Developer & Digital Marketer",
    occupationLocation: { "@type": "City", name: "Amman" },
    skills:
      "Web development, Power BI dashboards, data analysis, business analysis, SEO, paid advertising",
  },
  sameAs: [profile.socials.linkedin, GITHUB_URL],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} ${display.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static, not user input
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <div className="film-grain" aria-hidden />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
