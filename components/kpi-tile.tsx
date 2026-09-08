"use client";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { cn } from "@/lib/cn";
import { animate, useMotionValue } from "motion/react";
import { useEffect, useState } from "react";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  className?: string;
};

export function KpiTile({ value, prefix = "", suffix = "", label, className }: Props) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, mv]);

  return (
    <div ref={ref} className={cn("px-5 py-8 lg:px-10 lg:pt-8 lg:pb-9", className)}>
      <div className="t-mono-stat text-text">
        {prefix}
        {display}
        {suffix}
      </div>
      <div className="t-mono-label mt-[10px] text-text-muted">{label}</div>
    </div>
  );
}
