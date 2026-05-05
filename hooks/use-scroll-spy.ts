"use client";
import { useEffect, useState } from "react";

// A section becomes active once its top edge crosses 70% down the viewport.
// Using 70% (rather than 50%) ensures the last section on the page can always
// become active even when the browser can't scroll it to the top.
export function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const onScroll = () => {
      const threshold = window.scrollY + window.innerHeight * 0.7;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= threshold) current = id;
      }
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);

  return active;
}
