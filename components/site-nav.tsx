"use client";
import { cn } from "@/lib/cn";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const LINKS = [
  { href: "/it", label: "IT" },
  { href: "/marketing", label: "Marketing" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 backdrop-blur-md bg-background/70">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 text-sm">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-mono uppercase tracking-wider text-text-muted hover:text-text"
          >
            Aiham R.
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {LINKS.map((l) => {
              const isActive = l.href !== "#" && pathname === l.href;
              return (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className={cn(
                      "relative rounded-full px-3 py-1.5 text-text-muted transition hover:text-text",
                      isActive && "text-text",
                    )}
                  >
                    {l.label}
                    {isActive && (
                      <span
                        className="absolute -right-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent"
                        aria-hidden
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((o) => !o)}
              className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-text-muted transition hover:text-text"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        {open && (
          <div
            id="mobile-nav"
            role="navigation"
            aria-label="Mobile navigation"
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md"
          >
            <ul className="mx-auto max-w-6xl flex flex-col px-6 py-3 gap-1">
              {LINKS.map((l) => {
                const isActive = l.href !== "#" && pathname === l.href;
                return (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-3 font-mono text-xs uppercase tracking-wider text-text-muted transition hover:text-text",
                        isActive && "text-text",
                      )}
                    >
                      {l.label}
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
