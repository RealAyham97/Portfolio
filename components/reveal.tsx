"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { useInViewOnce } from "@/hooks/use-in-view-once";

const supportsTimeline = () =>
  typeof CSS !== "undefined" && CSS.supports?.("animation-timeline: view()");

export function Reveal({
  as: Tag = "div",
  className,
  children,
}: { as?: keyof React.JSX.IntrinsicElements; className?: string; children: React.ReactNode }) {
  const [native, setNative] = useState(false);
  useEffect(() => setNative(supportsTimeline()), []);
  const { ref, inView } = useInViewOnce<HTMLElement>();

  if (native) {
    return <Tag className={cn("reveal", className)}>{children}</Tag>;
  }
  // @ts-expect-error generic Tag — ref/intrinsic-element mapping isn't statically resolvable here
  return <Tag ref={ref} data-in={inView ? "true" : "false"} className={cn("reveal-fallback", className)}>{children}</Tag>;
}
