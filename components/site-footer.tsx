import { profile } from "@/content/profile";
import { services } from "@/content/services";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="rule-t u-gutter flex flex-col gap-3 py-5 lg:flex-row lg:items-center lg:justify-between">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-text-muted">
        {profile.name.toUpperCase()} {new Date().getFullYear()}
      </p>

      <nav
        aria-label="Services"
        className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-text-muted"
      >
        {services.map((s, i) => (
          <span key={s.slug} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>·</span>}
            <Link href={`/services/${s.slug}`} className="hover:text-second">
              {s.label.en}
            </Link>
          </span>
        ))}
      </nav>

      <a
        href={profile.socials.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-text-muted hover:text-second"
      >
        LinkedIn
      </a>
    </footer>
  );
}
