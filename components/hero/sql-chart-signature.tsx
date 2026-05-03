"use client";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { useEffect, useState } from "react";
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis } from "recharts";

const QUERY_LINES = [
  "SELECT quarter,",
  "       SUM(idle_hours_saved)",
  "FROM   fleet_telemetry",
  "WHERE  fleet = 'gargash-2025'",
  "GROUP  BY quarter;",
];

const DATA = [
  { quarter: "Q1", value: 12_400 },
  { quarter: "Q2", value: 18_800 },
  { quarter: "Q3", value: 22_300 },
  { quarter: "Q4", value: 16_900 },
];
const MAX_INDEX = DATA.reduce((acc, d, i, arr) => (d.value > arr[acc].value ? i : acc), 0);

export function SqlChartSignature() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>("0px 0px -20% 0px");
  const [revealedLines, setRevealedLines] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setRevealedLines(QUERY_LINES.length);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setRevealedLines(i);
      if (i >= QUERY_LINES.length) clearInterval(id);
    }, 220);
    return () => clearInterval(id);
  }, [inView]);

  const chartReady = revealedLines >= QUERY_LINES.length;

  return (
    <div
      ref={ref}
      className="rounded-xl border border-border bg-surface-1 p-4 font-mono text-xs sm:text-sm"
      aria-label="Signature visual: SQL query that produced quarterly idle-hours-saved on the Palantir engagement"
    >
      <div className="mb-3 flex items-center gap-2 text-text-muted">
        <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
        <span className="uppercase tracking-wider">fleet_telemetry · live query</span>
      </div>
      <pre className="text-text whitespace-pre-wrap leading-6">
        {QUERY_LINES.slice(0, revealedLines).join("\n")}
        {revealedLines < QUERY_LINES.length && <span className="animate-pulse">▍</span>}
      </pre>
      <div className="mt-4 h-32" aria-hidden>
        {chartReady && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DATA} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
              <XAxis
                dataKey="quarter"
                tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Bar
                dataKey="value"
                radius={[4, 4, 0, 0]}
                animationDuration={800}
                animationBegin={0}
                isAnimationActive
              >
                {DATA.map((d, i) => (
                  <Cell
                    key={d.quarter}
                    fill={i === MAX_INDEX ? "var(--accent)" : "var(--text-muted)"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="mt-2 text-[10px] uppercase tracking-wider text-text-muted">
        Idle hours saved · Gargash fleet · 2025
      </div>
    </div>
  );
}
