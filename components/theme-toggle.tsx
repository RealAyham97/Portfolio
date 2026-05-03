"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

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

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={onToggle}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border text-text-muted transition hover:text-text",
        className
      )}
    >
      {mounted ? (resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />) : <Moon size={16} />}
    </button>
  );
}
