"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

// ──────────────────────────────────────────────────────────────────────────
// IT-experience live-query card.
// Compact variant with a floating popover on bar hover / tap.
// ──────────────────────────────────────────────────────────────────────────

type Job = {
  id: number;
  company: string;
  role: string;
  location: string;
  start: string; // YYYY-MM
  end: string; // YYYY-MM or "Present"
  label: string;
  stack: string[];
  bullets: string[];
};

const JOBS: Job[] = [
  {
    id: 1,
    company: "Shahid / MBC",
    role: "Media Engineer Intern",
    location: "Amman, Jordan",
    start: "2019-04",
    end: "2020-03",
    label: "SHAHID",
    stack: ["Streaming", "Codecs", "Automation", "Security"],
    bullets: [
      "Optimized streaming performance for low latency and seamless playback.",
      "Improved video quality and compression algorithms.",
      "Automated workflows to reduce manual tasks.",
      "Maintained data integrity & compliance protocols.",
    ],
  },
  {
    id: 2,
    company: "Deloitte",
    role: "Business Analyst",
    location: "Amman, Jordan",
    start: "2021-05",
    end: "2022-06",
    label: "DELOITTE",
    stack: ["IT Risk", "Controls", "Power BI", "Audit"],
    bullets: [
      "Evaluated IT controls for compliance and risk mitigation.",
      "Analyzed vulnerabilities and recommended security improvements.",
      "Presented technical findings aligned with business goals.",
      "Tracked IT regulatory updates to refine risk strategy.",
    ],
  },
  {
    id: 3,
    company: "JSIT / Republic Airways",
    role: "IT Support & Business Analyst",
    location: "Amman, Jordan",
    start: "2022-07",
    end: "2023-08",
    label: "JSIT",
    stack: ["IT Support", "Internal Web", "Crew Ops", "Power BI"],
    bullets: [
      "Diagnosed system issues to maintain technical continuity for crew teams.",
      "Co-designed and improved internal web applications.",
      "Assessed crew performance data & operational reliability.",
      "Analyzed crew feedback for service-quality insights.",
    ],
  },
  {
    id: 4,
    company: "Gargash Enterprises",
    role: "Digital Growth Executive",
    location: "Dubai, UAE",
    start: "2023-09",
    end: "2025-03",
    label: "GARGASH",
    stack: ["Power BI", "Google Analytics", "A/B Testing", "UX"],
    bullets: [
      "Built data-driven omnichannel campaigns; optimized ROI via A/B testing.",
      "Analyzed KPIs in Power BI, Excel, GA to optimize operations.",
      "Collaborated with UX to improve engagement and reduce churn.",
      "Tracked AI research trends to keep strategies competitive.",
    ],
  },
  {
    id: 5,
    company: "Freelancing",
    role: "Full-Stack Developer & Analyst",
    location: "Remote",
    start: "2025-04",
    end: "Present",
    label: "FREELANCE",
    stack: ["Power BI", "Web Development", "Data & Business", "Strategy"],
    bullets: [
      "Built Power BI dashboards & reports for Ecompanio.",
      "Supported a cloud kitchen / bakery launch end-to-end.",
      "Analyzed engagement & KPIs for Padel Score.",
      "Ran data-driven social strategy.",
    ],
  },
];

// Inclusive month count; "Present" resolves to the current month so the
// ongoing role never goes stale.
function monthIndex(iso: string): number {
  if (iso === "Present") {
    const now = new Date();
    return now.getFullYear() * 12 + now.getMonth() + 1;
  }
  const [y, m] = iso.split("-").map(Number);
  return y * 12 + m;
}

const monthsFor = (job: Job) => monthIndex(job.end) - monthIndex(job.start) + 1;

const SQL_KW = new Set([
  "SELECT",
  "FROM",
  "WHERE",
  "GROUP",
  "BY",
  "ORDER",
  "AS",
  "COUNT",
  "SUM",
  "DISTINCT",
  "AND",
  "ON",
  "JOIN",
  "LIMIT",
  "ASC",
  "DESC",
]);
const SQL_SPLIT = /(\s+|[(),;*'=])/;

function tokenizeSQL(query: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  query.split("\n").forEach((line, li) => {
    if (li > 0) nodes.push("\n");
    line.split(SQL_SPLIT).forEach((tok, ti) => {
      if (tok === "") return;
      nodes.push(
        <span
          key={`${li}-${ti}-${tok}`}
          style={{ color: SQL_KW.has(tok.toUpperCase()) ? "var(--text)" : "var(--text-muted)" }}
        >
          {tok}
        </span>,
      );
    });
  });
  return nodes;
}

const BAR_H_PX = 96;
// The row below the chart is always populated, so the card opens on the
// current role rather than on an empty selection.
const DEFAULT_IDX = JOBS.length - 1;

function fmtMonth(iso: string): string {
  if (iso === "Present") return "Present";
  const [y, m] = iso.split("-");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[Number.parseInt(m, 10) - 1]} ${y}`;
}

// Bar highlighted by the one-time attract pulse (tallest bar draws the eye).
const PULSE_IDX = 3;

export function ItExperienceCard() {
  const [selectedIdx, setSelectedIdx] = useState(DEFAULT_IDX);
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [canHover, setCanHover] = useState(true);
  const [interacted, setInteracted] = useState(false);
  const [pulsing, setPulsing] = useState(false);
  const barsRef = useRef<HTMLDivElement>(null);
  const active = JOBS[selectedIdx];

  const months = JOBS.map(monthsFor);
  const maxMonths = Math.max(...months);

  const select = (idx: number) => {
    setInteracted(true);
    setSelectedIdx(idx);
  };

  // Grow the bars in once the card scrolls into view.
  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setCanHover(window.matchMedia("(hover: hover)").matches);
    const el = barsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // One-time attract pulse after the bars grow in, until the user interacts.
  useEffect(() => {
    if (!inView || reduceMotion || interacted) return;
    const start = setTimeout(() => setPulsing(true), 1300);
    const stop = setTimeout(() => setPulsing(false), 3600);
    return () => {
      clearTimeout(start);
      clearTimeout(stop);
      setPulsing(false);
    };
  }, [inView, reduceMotion, interacted]);

  // The WHERE clause always names the selected row — the pane below is that
  // row, so the query and the result stay in step.
  const query = `SELECT  company, role, months\nFROM    experience\nWHERE   id = ${active.id};`;

  return (
    <div
      className="shadow-hard box-border w-full border-[3px] border-border bg-surface-1 font-mono"
      aria-live="polite"
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 border-b-[3px] border-border px-2.5 py-1.5"
        style={{ background: "var(--text)", color: "var(--background)" }}
      >
        <span
          className="block h-[7px] w-[7px] flex-none"
          style={{
            backgroundColor: "var(--accent)",
            animation: "itCardDot 2s ease-in-out infinite",
          }}
          aria-hidden
        />
        <span className="text-[10px] font-bold uppercase tracking-[0.14em]">
          JOBS_HELD · LIVE QUERY
        </span>
      </div>

      {/* SQL */}
      <pre className="m-0 whitespace-pre-wrap px-2.5 pt-2.5 text-[11px] leading-[1.8]">
        {tokenizeSQL(query)}
      </pre>

      {/* Interaction hint, styled as a SQL comment; fades after first use */}
      <div
        className="px-2.5 pb-2.5 text-[11px]"
        style={{
          color: "var(--text-muted)",
          opacity: interacted ? 0 : 0.8,
          transition: "opacity 0.5s ease",
        }}
      >
        {`-- ${canHover ? "hover" : "tap"} a bar to inspect each role`}
      </div>

      {/* Chart */}
      <div ref={barsRef}>
        <div
          className="flex items-end gap-1 border-t-[3px] border-border px-2.5"
          style={{ height: BAR_H_PX }}
        >
          {JOBS.map((job, idx) => {
            const h = Math.round((months[idx] / maxMonths) * BAR_H_PX);
            const isActive = idx === selectedIdx;
            return (
              <button
                key={job.id}
                type="button"
                onMouseEnter={() => select(idx)}
                onFocus={() => select(idx)}
                onPointerDown={(e) => {
                  if (e.pointerType !== "mouse") select(idx);
                }}
                onKeyDown={(e) => {
                  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                  e.preventDefault();
                  const dir = e.key === "ArrowRight" ? 1 : -1;
                  const next = (idx + dir + JOBS.length) % JOBS.length;
                  select(next);
                  const sibling = e.currentTarget.parentElement?.children[next];
                  if (sibling instanceof HTMLElement) sibling.focus();
                }}
                aria-label={`${job.company}: ${job.role}, ${months[idx]} months`}
                aria-pressed={isActive}
                className="flex h-full flex-1 cursor-pointer items-end border-0 bg-transparent p-0 outline-none focus-visible:outline-[3px] focus-visible:outline-accent"
              >
                <span
                  className="block w-full border-2 border-b-0 border-border"
                  style={{
                    height: inView ? h : 0,
                    backgroundColor: isActive ? "var(--accent)" : "var(--second)",
                    transition: reduceMotion
                      ? "background-color 0.2s ease"
                      : `height 0.7s cubic-bezier(.2,.7,.2,1) ${idx * 90}ms, background-color 0.2s ease`,
                    animation:
                      pulsing && idx === PULSE_IDX && !isActive
                        ? "itBarPulse 1.1s ease-in-out 2"
                        : undefined,
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Axis labels — the selected one inverts to a filled block, which is
            what ties the column to the row below without drawing a connector. */}
        <div className="flex gap-1 border-t-[3px] border-border px-2.5 py-1.5" aria-hidden>
          {JOBS.map((job, idx) => (
            <div
              key={job.id}
              className="flex-1 overflow-hidden text-ellipsis border-2 px-0.5 py-[3px] text-center text-[9px] font-bold uppercase tracking-[0.06em] lg:text-[8px]"
              style={
                idx === selectedIdx
                  ? {
                      background: "var(--second)",
                      color: "var(--second-fg)",
                      borderColor: "var(--border)",
                    }
                  : { borderColor: "transparent", color: "var(--text-muted)" }
              }
            >
              {job.label}
            </div>
          ))}
        </div>
      </div>

      {/* Result divider */}
      <div
        className="flex justify-between gap-2 border-t-[3px] border-border px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em]"
        style={{ background: "var(--background)", color: "var(--text-muted)" }}
      >
        <span>1 row returned</span>
        <span>
          {selectedIdx + 1} / {JOBS.length}
        </span>
      </div>

      {/* The returned row — always populated, content swaps on selection */}
      <div
        className="border-t-[3px] border-border px-2.5 pt-3 pb-3.5"
        style={{ background: "var(--background)" }}
      >
        <div className="flex items-baseline justify-between gap-2.5">
          <div className="font-display text-[17px] leading-[1.05] tracking-[-0.02em] text-text">
            {active.company}
          </div>
          <div className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.1em] text-text-muted">
            {months[selectedIdx]} MO
          </div>
        </div>
        <div className="mt-0.5 text-[10.5px] leading-[1.7] text-text-muted">
          {active.role} · {active.location}
        </div>
        <div className="mt-px text-[9.5px] font-bold uppercase tracking-[0.12em] text-text-muted">
          {fmtMonth(active.start)} - {fmtMonth(active.end)}
        </div>

        <ul className="m-0 mt-2.5 flex list-none flex-col gap-1.5 p-0">
          {active.bullets.map((b) => (
            <li key={b} className="flex gap-2 text-[10.5px] leading-[1.55] text-text">
              <span className="flex-none font-bold text-accent" aria-hidden>
                –
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {active.stack.map((s) => (
            <span
              key={s}
              className="border-2 border-border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] lg:text-[8px] text-text-muted"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <style>{`@keyframes itCardDot { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
@keyframes itBarPulse { 0%, 100% { background-color: var(--second); } 50% { background-color: var(--accent); } }`}</style>
    </div>
  );
}
