"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

type Bar = { label: string; value: number; highlight?: boolean };
type Scene = {
  id: string;
  header: string;
  query: string;
  bars: [Bar, Bar, Bar, Bar];
  footer: string;
};

const SCENES: Scene[] = [
  {
    id: "portfolio-visitors",
    header: "PORTFOLIO_VISITORS",
    query:
      "SELECT   source,\n         COUNT(*) AS visits\nFROM     portfolio_traffic\nWHERE    month = '2025-05'\nGROUP BY source;",
    bars: [
      { label: "LINKEDIN", value: 412 },
      { label: "DIRECT", value: 318, highlight: true },
      { label: "GITHUB", value: 247 },
      { label: "REFERRAL", value: 89 },
    ],
    footer: "VISITS BY SOURCE · LAST 30 DAYS · 2025",
  },
  {
    id: "cheesecakes-baked",
    header: "CHEESECAKES_BAKED",
    query:
      "SELECT   flavor,\n         COUNT(*) AS baked\nFROM     home_kitchen\nWHERE    year = 2025\nGROUP BY flavor;",
    bars: [
      { label: "CLASSIC", value: 14 },
      { label: "BISCOFF", value: 22, highlight: true },
      { label: "MANGO", value: 9 },
      { label: "PISTACHIO", value: 11 },
    ],
    footer: "CHEESECAKES BAKED · HOME KITCHEN · 2025",
  },
  {
    id: "arenas-equipped",
    header: "ARENAS_EQUIPPED",
    query:
      "SELECT   quarter,\n         COUNT(DISTINCT venue_id) AS arenas\nFROM     padelscore_deployments\nWHERE    year = 2025\nGROUP BY quarter;",
    bars: [
      { label: "Q1", value: 1 },
      { label: "Q2", value: 3 },
      { label: "Q3", value: 5, highlight: true },
      { label: "Q4", value: 2 },
    ],
    footer: "ARENAS EQUIPPED · PADELSCORE ROLLOUT · 2025",
  },
  {
    id: "coffee-intake",
    header: "COFFEE_INTAKE",
    query:
      "SELECT   day,\n         SUM(cups) AS caffeine\nFROM     daily_logs\nWHERE    owner = 'aiham'\nGROUP BY day;",
    bars: [
      { label: "MON", value: 3 },
      { label: "TUE", value: 4 },
      { label: "WED", value: 6, highlight: true },
      { label: "THU", value: 4 },
    ],
    footer: "CUPS PER DAY · ROASTERY 25 · 2025",
  },
];

const SQL_KW = new Set(["SELECT", "FROM", "WHERE", "GROUP", "BY", "ORDER", "AS", "COUNT", "SUM"]);
const SQL_SPLIT = /(\s+|[(),;*'])/;
const MAX_LINES = Math.max(...SCENES.map((s) => s.query.split("\n").length));
const LINE_H_PX = 22; // matches the 22px mono line-height in the ledger
const BAR_H_PX = 84; // bars read as one continuous data block at 1px gaps

function tokenizeSQL(query: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  query.split("\n").forEach((line, li) => {
    if (li > 0) nodes.push("\n");
    line.split(SQL_SPLIT).forEach((tok, ti) => {
      if (tok === "") return;
      nodes.push(
        <span
          key={`${li}-${ti}`}
          style={{ color: SQL_KW.has(tok.toUpperCase()) ? "var(--text)" : "var(--text-muted)" }}
        >
          {tok}
        </span>,
      );
    });
  });
  return nodes;
}

export function LiveQueryCard() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (paused) return;
    const delay = index === 0 ? 6000 : 5000;
    const t = setTimeout(() => setIndex((i) => (i + 1) % SCENES.length), delay);
    return () => clearTimeout(t);
  }, [index, paused]);

  const scene = SCENES[index];
  const maxVal = Math.max(...scene.bars.map((b) => b.value));
  const highlighted = scene.bars.find((b) => b.highlight);
  const ariaLabel = `${scene.header.replace(/_/g, " ").toLowerCase()} chart${
    highlighted ? `, ${highlighted.label} highest at ${highlighted.value}` : ""
  }`;

  return (
    <div
      className="box-border w-full overflow-hidden font-mono"
      aria-live="polite"
      aria-label={ariaLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Header row — stays visible during scene transition */}
      <div className="mb-3 flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
        <motion.span
          className="block h-[6px] w-[6px]"
          style={{ backgroundColor: "var(--accent)" }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: [1, 0.4, 1] }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
          }
          aria-hidden
        />
        <span className="text-[11px] uppercase tracking-[0.18em]">{scene.header} · LIVE QUERY</span>
      </div>

      {/* Animated scene body */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={scene.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: reducedMotion ? 0 : 0.15, ease: "easeInOut" }}
        >
          {/* SQL block */}
          <pre
            className="whitespace-pre-wrap text-[12px]"
            style={{ minHeight: Math.max(MAX_LINES * LINE_H_PX, 110), lineHeight: "22px" }}
          >
            {tokenizeSQL(scene.query)}
          </pre>

          {/* Bar chart — 1px gaps and a rule under the baseline */}
          <div
            className="mt-4 flex items-end gap-px border-b border-border"
            style={{ height: BAR_H_PX }}
            aria-hidden
          >
            {scene.bars.map((bar) => {
              const h = Math.round((bar.value / maxVal) * BAR_H_PX);
              const bg = bar.highlight ? "var(--accent)" : "var(--border)";
              return (
                <motion.div
                  key={`${scene.id}-${bar.label}`}
                  className="flex-1"
                  style={{ backgroundColor: bg }}
                  animate={{ height: h }}
                  initial={{ height: 0 }}
                  transition={
                    reducedMotion
                      ? { duration: 0, type: "tween" }
                      : { type: "spring", stiffness: 300, damping: 30 }
                  }
                />
              );
            })}
          </div>

          {/* Bar labels */}
          <div className="mt-1 flex gap-px" aria-hidden>
            {scene.bars.map((bar) => (
              <div
                key={bar.label}
                className="flex-1 text-center uppercase"
                style={{ fontSize: "8px", letterSpacing: "0.10em", color: "var(--text-muted)" }}
              >
                {bar.label}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div
            className="mt-2 uppercase"
            style={{ fontSize: "9px", letterSpacing: "0.16em", color: "var(--text-muted)" }}
          >
            {scene.footer}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
