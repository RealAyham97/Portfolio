"use client";
import { useEffect, useState } from "react";
import { formatAmmanTime } from "@/lib/format";

export function LiveLocalTime({ initial }: { initial: string }) {
  const [now, setNow] = useState(initial);
  useEffect(() => {
    setNow(formatAmmanTime());
    const id = setInterval(() => setNow(formatAmmanTime()), 60_000);
    return () => clearInterval(id);
  }, []);
  return <time dateTime={now} aria-live="off">{now}</time>;
}
