"use client";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { cn } from "@/lib/cn";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const SECTIONS = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
] as const;

export function SiteNav() {
  const active = useScrollSpy(SECTIONS.map((s) => s.id));
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 backdrop-blur-md bg-background/70">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 text-sm">
        <Link
          href="#top"
          onClick={() => setOpen(false)}
          className="font-mono uppercase tracking-wider text-text-muted hover:text-text"
        >
          Aiham AR.
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {SECTIONS.slice(1).map((s) => (
            <li key={s.id}>
              <Link
                href={`#${s.id}`}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-text-muted transition hover:text-text",
                  active === s.id && "text-text",
                )}
              >
                {s.label}
                {active === s.id && (
                  <span
                    className="absolute -right-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent"
                    aria-hidden
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-muted transition hover:text-text"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md">
          <ul className="mx-auto max-w-6xl flex flex-col px-6 py-3 gap-1">
            {SECTIONS.slice(1).map((s) => (
              <li key={s.id}>
                <Link
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-3 font-mono text-xs uppercase tracking-wider text-text-muted transition hover:text-text",
                    active === s.id && "text-text",
                  )}
                >
                  {s.label}
                  {active === s.id && (
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
