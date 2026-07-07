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
    role: "Full-Stack Developer & Digital Marketer",
    location: "Remote",
    start: "2025-04",
    end: "Present",
    label: "FREELANCE",
    stack: ["Power BI", "Python", "SEO", "Strategy"],
    bullets: [
      "Built Power BI dashboards & reports for Ecompanio.",
      "Supported a cloud kitchen / bakery launch end-to-end.",
      "Analyzed engagement & KPIs for Padel Score.",
      "Ran data-driven social strategy + videography production.",
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
const POPOVER_W_PX = 280;
// Ignore synthetic mouse/focus events fired right after a touch interaction.
const TOUCH_GRACE_MS = 500;

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
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [canHover, setCanHover] = useState(true);
  const [interacted, setInteracted] = useState(false);
  const [pulsing, setPulsing] = useState(false);
  const barsRef = useRef<HTMLDivElement>(null);
  const lastTouchRef = useRef(0);
  const active = hoveredIdx == null ? null : JOBS[hoveredIdx];

  const months = JOBS.map(monthsFor);
  const maxMonths = Math.max(...months);

  const notTouch = () => Date.now() - lastTouchRef.current > TOUCH_GRACE_MS;

  const setHover = (idx: number | null) => {
    if (idx != null) setInteracted(true);
    setHoveredIdx(idx);
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

  // On touch devices, a tap outside the chart dismisses the popover.
  useEffect(() => {
    if (hoveredIdx == null) return;
    const onDocPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      if (barsRef.current && !barsRef.current.contains(e.target as Node)) {
        setHoveredIdx(null);
      }
    };
    document.addEventListener("pointerdown", onDocPointerDown);
    return () => document.removeEventListener("pointerdown", onDocPointerDown);
  }, [hoveredIdx]);

  const query = active
    ? `SELECT  company, role, months\nFROM    experience\nWHERE   id = ${active.id};`
    : "SELECT  company, role, months\nFROM    experience\nORDER BY start ASC;";

  const barCenterPct = hoveredIdx != null ? ((hoveredIdx + 0.5) / JOBS.length) * 100 : 0;

  return (
    <div
      className="w-full rounded-xl border border-border bg-surface-1 p-4 font-mono text-xs sm:text-sm"
      aria-live="polite"
    >
      {/* Header */}
      <div className="mb-3 flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
        <span
          className="block h-2 w-2 rounded-full"
          style={{
            backgroundColor: "var(--accent)",
            animation: "itCardDot 2s ease-in-out infinite",
          }}
          aria-hidden
        />
        <span className="uppercase tracking-wider">JOBS_HELD · LIVE QUERY</span>
      </div>

      {/* SQL */}
      <pre className="whitespace-pre-wrap leading-6" style={{ minHeight: 72, margin: 0 }}>
        {tokenizeSQL(query)}
      </pre>

      {/* Interaction hint, styled as a SQL comment; fades after first use */}
      <div
        className="mt-1"
        style={{
          color: "var(--text-muted)",
          opacity: interacted ? 0 : 0.8,
          transition: "opacity 0.5s ease",
        }}
      >
        {`-- ${canHover ? "hover" : "tap"} a bar to inspect each role`}
      </div>

      {/* Bars + popover anchor */}
      <div
        className="relative mt-4"
        ref={barsRef}
        onMouseLeave={() => {
          if (notTouch()) setHover(null);
        }}
      >
        <div className="flex items-end gap-2" style={{ height: BAR_H_PX }}>
          {JOBS.map((job, idx) => {
            const h = Math.round((months[idx] / maxMonths) * BAR_H_PX);
            const isActive = idx === hoveredIdx;
            return (
              <button
                key={job.id}
                type="button"
                onMouseEnter={() => {
                  if (notTouch()) setHover(idx);
                }}
                onFocus={() => {
                  if (notTouch()) setHover(idx);
                }}
                onBlur={() => {
                  if (notTouch()) setHover(null);
                }}
                onPointerDown={(e) => {
                  if (e.pointerType !== "mouse") {
                    lastTouchRef.current = Date.now();
                    setInteracted(true);
                    setHoveredIdx((cur) => (cur === idx ? null : idx));
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setHover(null);
                    e.currentTarget.blur();
                  }
                }}
                aria-label={`${job.company}: ${job.role}, ${months[idx]} months`}
                aria-expanded={isActive}
                className="flex-1 h-full flex items-end p-0 bg-transparent border-0 cursor-pointer outline-none"
              >
                <span
                  className="block w-full rounded-t-sm"
                  style={{
                    height: inView ? h : 0,
                    backgroundColor: isActive
                      ? "var(--accent)"
                      : "color-mix(in oklab, var(--accent) 28%, var(--surface-2))",
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

        {/* Bar labels */}
        <div className="mt-1 flex gap-2" aria-hidden>
          {JOBS.map((job, idx) => (
            <div
              key={job.id}
              className="flex-1 text-center uppercase tracking-wider"
              style={{
                fontSize: 9,
                color: idx === hoveredIdx ? "var(--text)" : "var(--text-muted)",
              }}
            >
              {job.label}
            </div>
          ))}
        </div>

        {/* Floating popover above the bars */}
        {active && (
          <div
            role="tooltip"
            className="absolute z-20 rounded-lg border border-border bg-surface-1 p-3 pointer-events-none"
            style={{
              width: POPOVER_W_PX,
              bottom: "calc(100% + 10px)",
              left: `clamp(0px, calc(${barCenterPct}% - ${POPOVER_W_PX / 2}px), calc(100% - ${POPOVER_W_PX}px))`,
              boxShadow: "0 12px 32px -8px rgba(0, 0, 0, 0.55), 0 4px 12px -4px rgba(0, 0, 0, 0.4)",
              animation: reduceMotion ? "none" : "itPopIn 0.18s ease-out",
              transition: reduceMotion ? "none" : "left 0.25s cubic-bezier(.2,.7,.2,1)",
            }}
          >
            <div className="flex items-baseline justify-between gap-2">
              <div
                className="font-display italic"
                style={{ fontSize: 17, lineHeight: 1.1, color: "var(--text)" }}
              >
                {active.company}
              </div>
              <div
                className="uppercase tracking-wider whitespace-nowrap"
                style={{ fontSize: 9, color: "var(--text-muted)" }}
              >
                {months[hoveredIdx as number]} MO
              </div>
            </div>
            <div className="mt-0.5" style={{ fontSize: 10, color: "var(--text-muted)" }}>
              {active.role} · {active.location}
            </div>
            <div
              className="mt-0.5 uppercase tracking-wider"
              style={{ fontSize: 9, color: "var(--text-muted)" }}
            >
              {fmtMonth(active.start)} - {fmtMonth(active.end)}
            </div>

            <ul
              className="mt-2 list-none p-0 m-0"
              style={{ fontSize: 10.5, lineHeight: 1.4, color: "var(--text)" }}
            >
              {active.bullets.map((b) => (
                <li key={b} className="relative pl-3 mb-1">
                  <span
                    className="absolute left-0 top-1.5"
                    style={{ width: 4, height: 1, backgroundColor: "var(--text-muted)" }}
                  />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-2 flex flex-wrap gap-1">
              {active.stack.map((s) => (
                <span
                  key={s}
                  className="uppercase tracking-wider rounded border border-border"
                  style={{ fontSize: 8.5, padding: "1px 5px", color: "var(--text-muted)" }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`@keyframes itCardDot { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
@keyframes itPopIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@keyframes itBarPulse { 0%, 100% { background-color: color-mix(in oklab, var(--accent) 28%, var(--surface-2)); } 50% { background-color: var(--accent); } }`}</style>
    </div>
  );
}
