"use client";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { cn } from "@/lib/cn";
import { useEffect, useState } from "react";

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
  return (
    // @ts-expect-error generic Tag — ref/intrinsic-element mapping isn't statically resolvable here
    <Tag ref={ref} data-in={inView ? "true" : "false"} className={cn("reveal-fallback", className)}>
      {children}
    </Tag>
  );
}
