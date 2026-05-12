import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./reveal";

const services = [
  {
    href: "/it",
    title: "IT\nServices",
    subtitle: "Foundry dashboards, automation, BI",
    imageSrc: "/it-services-circle.png",
    imageAlt: "IT Services tools: Monday.com, Jira, AWS, Zapier, Power BI",
  },
  {
    href: "/marketing",
    title: "Digital\nMarketing",
    subtitle: "Paid ads, SEO, analytics that close the loop",
    imageSrc: "/marketing-circle.png",
    imageAlt: "Digital Marketing platforms: Meta, LinkedIn, Google Ads, TikTok, YouTube, X",
  },
] as const;

export function Services() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <Reveal>
        <p className="text-center text-base text-text-muted mb-10">
          Pick What You Need
        </p>
      </Reveal>
      <div className="grid gap-6 sm:grid-cols-2">
        {services.map((s) => (
          <Reveal key={s.href}>
            <ServiceCard {...s} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ServiceCard({
  href,
  title,
  subtitle,
  imageSrc,
  imageAlt,
}: {
  href: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <Link href={href} className="group block">
      {/* Card: aspect-[4/3] matches Figma proportions and scales naturally on mobile */}
      <div className="relative aspect-[4/3] rounded-[3rem] border border-border bg-surface-2 transition-colors hover:border-accent">
        {/* Circular PNG fills the card; no overflow-hidden so it can sit flush with the rounded edges */}
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-contain p-2"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        {/* Category title centered in the open centre of the circle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className="font-display italic text-text/80 text-center whitespace-pre-line leading-tight"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.25rem)" }}
          >
            {title}
          </span>
        </div>
      </div>
      <p className="mt-3 text-center text-sm text-text-muted/80">{subtitle}</p>
    </Link>
  );
}
