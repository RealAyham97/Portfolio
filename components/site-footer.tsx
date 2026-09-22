import { profile } from "@/content/profile";
import { services } from "@/content/services";
import Link from "next/link";

// Touch targets need 44px of height. On desktop the rows collapse back to
// their natural height so the footer stays a single tight band.
const TAP = "inline-flex min-h-[44px] items-center lg:min-h-0";

export function SiteFooter() {
  return (
    <footer className="rule-t u-gutter flex flex-col gap-1 py-3 lg:flex-row lg:items-center lg:justify-between lg:gap-3 lg:py-5">
      <p
        className={`${TAP} font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-text-muted lg:text-[10px]`}
      >
        {profile.name.toUpperCase()} {new Date().getFullYear()}
      </p>

      <nav
        aria-label="Services"
        className="flex flex-col lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-2"
      >
        {services.map((s, i) => (
          <span key={s.slug} className="flex items-center lg:gap-2">
            {i > 0 && (
              <span aria-hidden className="hidden lg:inline text-text-muted">
                ·
              </span>
            )}
            <Link
              href={`/services/${s.slug}`}
              className={`${TAP} font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-text-muted hover:text-second lg:text-[10px]`}
            >
              {s.label.en}
            </Link>
          </span>
        ))}
      </nav>

      <a
        href={profile.socials.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={`${TAP} font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-text-muted hover:text-second lg:text-[10px]`}
      >
        LinkedIn
      </a>
    </footer>
  );
}
