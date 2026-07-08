/**
 * Numbered mono eyebrow above section headings ("01 / About ———"). Decorative
 * rhythm for long pages; the h2 below carries the semantics.
 */
export function SectionLabel({ num, text }: { num: string; text: string }) {
  return (
    <div className="mb-5 flex items-center gap-4" aria-hidden>
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted whitespace-nowrap">
        {num} / {text}
      </span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
