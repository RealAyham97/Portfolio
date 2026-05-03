import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-6xl border-t border-border px-6 py-10">
      <div className="flex flex-col items-start justify-between gap-3 font-mono text-xs uppercase tracking-wider text-text-muted sm:flex-row">
        <div>© {new Date().getFullYear()} {profile.name}. All rights reserved.</div>
        <div>Built in Amman · Next.js · Vercel</div>
      </div>
    </footer>
  );
}
