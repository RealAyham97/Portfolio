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
        <p className="text-center font-mono text-sm uppercase tracking-wider text-text-muted mb-10">
          Pick What You Need
        </p>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2">
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
      <div className="relative overflow-hidden rounded-[3.5rem] border border-border bg-surface-2 h-80 transition-colors hover:border-accent">
        {/* Circle logo image */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain p-6"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        {/* Category title overlaid in the empty center of the circle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className="font-display italic text-text/80 text-center whitespace-pre-line leading-tight"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)" }}
          >
            {title}
          </span>
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-text-muted">{subtitle}</p>
    </Link>
  );
}
