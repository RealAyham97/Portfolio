import { profile } from "@/content/profile";
import { services } from "@/content/services";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="rule-t u-gutter flex flex-col gap-4 py-6 lg:flex-row lg:items-center lg:justify-between">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
        {profile.name.toUpperCase()} {new Date().getFullYear()}
      </p>

      <nav
        aria-label="Services"
        className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted"
      >
        {services.map((s, i) => (
          <span key={s.slug} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>·</span>}
            <Link href={`/services/${s.slug}`} className="transition hover:text-text">
              {s.label.en}
            </Link>
          </span>
        ))}
      </nav>

      <a
        href={profile.socials.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted transition hover:text-text"
      >
        LinkedIn
      </a>
    </footer>
  );
}
