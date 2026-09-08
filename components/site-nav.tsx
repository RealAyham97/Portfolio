"use client";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";
import { formatAmmanTime } from "@/lib/format";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LiveLocalTime } from "./hero/live-local-time";
import { ThemeToggle } from "./theme-toggle";

const LINKS = [
  { href: "/it", label: "IT" },
  { href: "/marketing", label: "Marketing" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
] as const;

// "Amman" for the nav clock, derived from the existing location string rather
// than hardcoded, so the two can never drift apart.
const CITY = profile.location.split(",")[0].trim();

export function SiteNav({ initialTime }: { initialTime?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [clock, setClock] = useState(initialTime ?? "");

  // The nav is a band in the page flow now, not a fixed overlay, so the clock
  // has to hydrate itself on routes that don't pass a server-rendered value.
  useEffect(() => {
    if (!initialTime) setClock(formatAmmanTime());
  }, [initialTime]);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("scroll", close, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", close);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="rule-b relative z-50 bg-background">
      <nav className="u-gutter flex items-center justify-between py-4 lg:py-5">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-mono text-[12px] uppercase tracking-[0.18em] text-text transition hover:text-text"
        >
          Aiham R.
        </Link>

        {/* Desktop links — no pills, color-only hover */}
        <ul className="hidden items-center gap-[30px] lg:flex">
          {LINKS.map((l) => {
            const isActive = pathname === l.href;
            return (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className={cn(
                    "font-mono text-[12px] uppercase tracking-[0.18em] transition hover:text-text",
                    isActive ? "text-text" : "text-text-muted",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-text-muted">
            {CITY} {clock ? <LiveLocalTime initial={clock} /> : null}
          </span>
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex min-h-[44px] items-center border border-border px-[10px] font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted transition hover:text-text lg:hidden"
          >
            Menu
          </button>
        </div>
      </nav>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="rule-t bg-background lg:hidden"
        >
          <ul className="u-gutter flex flex-col py-2">
            {LINKS.map((l) => {
              const isActive = pathname === l.href;
              return (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex min-h-[44px] items-center font-mono text-[12px] uppercase tracking-[0.18em] transition hover:text-text",
                      isActive ? "text-text" : "text-text-muted",
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
