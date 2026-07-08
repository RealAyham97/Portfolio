/**
 * Decorative backdrop for hero sections: a fine dot grid that fades out
 * radially plus one soft accent glow. Both derive from theme variables, so
 * they adapt to light and dark. Render as the first child of a relative,
 * overflow-hidden container; sibling content should be positioned (relative)
 * so it paints above.
 */
export function HeroBackdrop() {
  const mask = "radial-gradient(ellipse 90% 85% at 50% 15%, black 0%, transparent 72%)";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Graph-paper dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
      {/* Soft accent glow anchored off the top-right corner */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(720px 460px at 85% -12%, color-mix(in oklab, var(--accent) 9%, transparent), transparent 70%)",
        }}
      />
    </div>
  );
}
