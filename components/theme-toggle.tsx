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

  // Renders the dark-mode label before mount so button width is stable
  // across hydration.
  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={onToggle}
      className={cn(
        "shadow-hard-sm inline-flex min-h-[44px] items-center border-[3px] border-border px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] lg:min-h-0",
        className,
      )}
    >
      {isDark ? "Light ☀" : "Dark ☾"}
    </button>
  );
}
