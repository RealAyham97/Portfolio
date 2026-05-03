"use client";
import { cn } from "@/lib/cn";

export const FILTERS = ["All", "SQL", "Python", "Power BI", "Foundry", "Figma"] as const;
export type Filter = (typeof FILTERS)[number];

export function FilterBar({ value, onChange }: { value: Filter; onChange: (v: Filter) => void }) {
  return (
    <ul role="tablist" aria-label="Project filter" className="flex flex-wrap gap-2">
      {FILTERS.map((f) => (
        <li key={f}>
          <button
            type="button"
            role="tab"
            aria-selected={value === f}
            onClick={() => onChange(f)}
            className={cn(
              "rounded-full border border-border px-3 py-1 font-mono text-xs uppercase tracking-wider transition",
              value === f
                ? "bg-accent text-accent-fg border-accent"
                : "text-text-muted hover:text-text",
            )}
          >
            {f}
          </button>
        </li>
      ))}
    </ul>
  );
}

export function matchesFilter(stack: string[], filter: Filter): boolean {
  if (filter === "All") return true;
  return stack.some((s) => s.toLowerCase().includes(filter.toLowerCase()));
}
