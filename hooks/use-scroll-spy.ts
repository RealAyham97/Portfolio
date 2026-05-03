"use client";
import { useEffect, useState } from "react";

export function useScrollSpy(ids: string[], rootMargin = "-40% 0px -55% 0px") {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin, threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, [ids, rootMargin]);

  return active;
}
