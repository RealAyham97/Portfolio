"use client";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";
import { formatAmmanTime } from "@/lib/format";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  // The header is a band in the page flow, so it scrolls away. Once it is
  // gone, a floating burger takes over navigation at every width.
  const [headerGone, setHeaderGone] = useState(false);
  const [floatOpen, setFloatOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);

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

  // Measure the header's own position rather than a fixed scroll offset, so
  // the burger appears at exactly the point the real nav leaves the screen
  // regardless of how tall the header is.
  //
  // A scroll listener rather than an IntersectionObserver on purpose: an
  // observer created while the document is hidden (a background tab, a
  // restored page) can miss its initial delivery and leave the burger stuck
  // off. Reading the rect on scroll always reflects the truth.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const check = () => {
      const gone = el.getBoundingClientRect().bottom <= 0;
      setHeaderGone(gone);
      if (!gone) setFloatOpen(false);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  // Escape and outside-tap close the floating panel. It deliberately does not
  // close on scroll: unlike the in-header dropdown it is the only way to
  // navigate once the header is gone.
  useEffect(() => {
    if (!floatOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFloatOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      if (floatRef.current && !floatRef.current.contains(e.target as Node)) {
        setFloatOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [floatOpen]);

  const linkClass = (isActive: boolean) =>
    cn(
      "flex min-h-[44px] items-center font-mono text-[12px] font-bold uppercase tracking-[0.16em]",
      isActive ? "text-second" : "text-text-muted hover:text-text",
    );

  return (
    <>
      <header ref={headerRef} className="rule-b relative z-50 bg-background">
        <nav className="u-gutter flex items-center justify-between gap-4 py-3.5">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block-accent font-display px-2.5 py-1 text-[15px] tracking-[-0.02em]"
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
              {LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={linkClass(pathname === l.href)}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      {/* Floating burger — only mounted once the header has scrolled off */}
      {headerGone && (
        <div ref={floatRef} className="fixed right-5 top-5 z-[60] flex flex-col items-end gap-2">
          <button
            type="button"
            aria-label={floatOpen ? "Close menu" : "Open menu"}
            aria-expanded={floatOpen}
            aria-controls="floating-nav"
            onClick={() => setFloatOpen((o) => !o)}
            className="shadow-hard flex h-[46px] w-[46px] flex-col items-center justify-center gap-[5px] border-[3px] border-border bg-background"
          >
            {floatOpen ? (
              <span className="font-mono text-[15px] font-bold leading-none text-text" aria-hidden>
                ✕
              </span>
            ) : (
              <>
                <span className="block h-[3px] w-[20px] bg-text" aria-hidden />
                <span className="block h-[3px] w-[20px] bg-text" aria-hidden />
                <span className="block h-[3px] w-[20px] bg-text" aria-hidden />
              </>
            )}
          </button>

          {floatOpen && (
            <nav
              id="floating-nav"
              aria-label="Navigation"
              className="shadow-hard w-[210px] border-[3px] border-border bg-background"
            >
              <ul className="flex flex-col px-3 py-1.5">
                {LINKS.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      onClick={() => setFloatOpen(false)}
                      className={linkClass(pathname === l.href)}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="rule-t flex items-center justify-between gap-2 px-3 py-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-muted">
                  {CITY} {clock ? <LiveLocalTime initial={clock} /> : null}
                </span>
                <ThemeToggle />
              </div>
            </nav>
          )}
        </div>
      )}
    </>
  );
}
