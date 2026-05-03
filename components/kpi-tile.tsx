"use client";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { animate, useMotionValue } from "motion/react";
import { useEffect, useState } from "react";

type Props = { value: number; prefix?: string; suffix?: string; label: string };

export function KpiTile({ value, prefix = "", suffix = "", label }: Props) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(mv, value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, mv]);

  return (
    <div ref={ref} className="border-t border-border pt-4">
      <div className="font-mono text-4xl text-text md:text-5xl tabular-nums">
        {prefix}
        {display}
        {suffix}
      </div>
      <div className="mt-2 font-mono text-xs uppercase tracking-wider text-text-muted">{label}</div>
    </div>
  );
}
