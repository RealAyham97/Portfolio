"use client";
import { cn } from "@/lib/cn";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  function onToggle() {
    const next = (resolvedTheme ?? theme) === "dark" ? "light" : "dark";
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      document.startViewTransition(() => setTheme(next));
    } else {
      setTheme(next);
    }
  }

  // Square, 1px-bordered, mono label. Renders the dark-mode label before mount
  // so the button width is stable across hydration.
  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={onToggle}
      className={cn(
        "inline-flex min-h-[44px] items-center border border-border px-[11px] py-[6px] font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted transition hover:text-text lg:min-h-0",
        className,
      )}
    >
      {isDark ? "Light ☀" : "Dark ☾"}
    </button>
  );
}
