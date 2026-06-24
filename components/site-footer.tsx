import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-6xl border-t border-border px-6 py-10">
      <p className="font-mono text-xs uppercase tracking-wider text-text-muted">
        {profile.name.toUpperCase()} {new Date().getFullYear()}
      </p>
    </footer>
  );
}
