import { profile } from "@/content/profile";
import { services } from "@/content/services";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-6xl border-t border-border px-6 py-10 space-y-6">
      <nav aria-label="Services" className="flex flex-wrap gap-x-6 gap-y-2">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="font-mono text-xs uppercase tracking-wider text-text-muted transition hover:text-text"
          >
            {s.label.en}
          </Link>
        ))}
      </nav>
      <p className="font-mono text-xs uppercase tracking-wider text-text-muted">
        {profile.name.toUpperCase()} {new Date().getFullYear()}
      </p>
    </footer>
  );
}
