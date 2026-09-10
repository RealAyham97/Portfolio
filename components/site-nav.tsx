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
      <nav className="u-gutter flex items-center justify-between gap-4 py-3.5">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="block-accent font-display text-[15px] tracking-[-0.02em] px-2.5 py-1"
        >
          AIHAM R.
        </Link>

        {/* Desktop links — filled teal pill marks the active route */}
        <ul className="hidden items-center gap-1.5 lg:flex">
          {LINKS.map((l) => {
            const isActive = pathname === l.href;
            return (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className={cn(
                    "block border-2 px-2.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em]",
                    isActive
                      ? "block-second"
                      : "border-transparent text-text-muted hover:border-border hover:text-text",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2.5">
          <span className="hidden font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-text-muted sm:inline">
            {CITY} {clock ? <LiveLocalTime initial={clock} /> : null}
          </span>
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
            className="shadow-hard-sm inline-flex min-h-[44px] items-center border-[3px] border-border px-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] lg:hidden"
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
                      "flex min-h-[44px] items-center font-mono text-[12px] font-bold uppercase tracking-[0.16em]",
                      isActive ? "text-second" : "text-text-muted hover:text-text",
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
