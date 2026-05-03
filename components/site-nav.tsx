"use client";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const SECTIONS = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "numbers", label: "Numbers" },
  { id: "contact", label: "Contact" },
] as const;

export function SiteNav() {
  const active = useScrollSpy(SECTIONS.map((s) => s.id));

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 backdrop-blur-md bg-background/70">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 text-sm">
        <Link
          href="#top"
          className="font-mono uppercase tracking-wider text-text-muted hover:text-text"
        >
          Aiham AR.
        </Link>
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
        <ThemeToggle />
      </nav>
    </header>
  );
}
