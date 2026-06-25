"use client";

import { useEffect, useRef, useState } from "react";

// ── Data ─────────────────────────────────────────────────────────────────
const QUERY = "Aiham Al Rawashdeh";
const SUGGESTIONS = [
  "aiham al rawashdeh",
  "aiham al rawashdeh portfolio",
  "aiham al rawashdeh linkedin",
  "aiham al rawashdeh seo",
];

// ── Google dark-mode palette ─────────────────────────────────────────────
const BG = "#202124";
const SEARCH_BG = "#303134";
const BUTTON_BG = "#303134";
const TEXT = "#e8eaed";
const MUTED = "#9aa0a6";
const FAINT_BORDER = "#3c4043";
const LINK_BLUE = "#8ab4f8";
const VISITED = "#c58af9";
const ACCENT_RED = "#ea4335";
const FOOTER_BG = "#171717";
const HOVER_BG = "rgba(138,180,248,0.08)";
const GOOGLE_FONT = '"Product Sans", "Trebuchet MS", Arial, sans-serif';

// ── Phases ───────────────────────────────────────────────────────────────
type Phase =
  | "homepage"
  | "typing"
  | "type-done"
  | "move-to-search"
  | "clicking-search"
  | "serp"
  | "move-to-result"
  | "clicking-result"
  | "flash-white"
  | "site";

// ── Pointer cursor SVG ───────────────────────────────────────────────────
function PointerCursor({ pressed }: { pressed: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      style={{
        width: "2em",
        height: "2em",
        display: "block",
        transform: pressed ? "scale(0.9)" : "scale(1)",
        transition: "transform 0.12s ease-out",
        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.6))",
      }}
      aria-hidden
    >
      <title>cursor</title>
      <path
        d="M3 2 L3 18 L7.5 14 L10 21 L13 19.8 L10.5 13 L16 13 Z"
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── White Google wordmark (dark-mode variant uses solid white) ───────────
function GoogleWordmark({ size }: { size: string }) {
  return (
    <span
      style={{
        fontFamily: GOOGLE_FONT,
        fontWeight: 500,
        fontSize: size,
        letterSpacing: "-0.04em",
        lineHeight: 1,
        color: "#ffffff",
        userSelect: "none",
      }}
    >
      Google
    </span>
  );
}

// ── Main component ───────────────────────────────────────────────────────
type Props = {
  /** True once the laptop has reached (or nearly reached) its full zoom. */
  active: boolean;
};

export function SeoLaptopMockup({ active }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("homepage");
  const [typed, setTyped] = useState("");
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // IntersectionObserver on the mockup root — tracks whether laptop screen is visible.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          setInView(e.isIntersecting && e.intersectionRatio >= 0.5);
        }
      },
      { threshold: [0, 0.5, 1] },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Sequence runner. Plays once the laptop is zoomed in and in view, then loops
  // so the story is always catchable instead of being a one-shot that's usually
  // already over. Resets to the opening frame whenever it's not running.
  useEffect(() => {
    if (reduced) {
      // Reduced-motion fallback: skip straight to the payoff frame — the SERP
      // with my result highlighted as the top organic hit (see render below).
      setTyped(QUERY);
      setPhase("serp");
      setCursor(null);
      return;
    }

    if (!(active && inView)) {
      setPhase("homepage");
      setTyped("");
      setCursor(null);
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(setTimeout(resolve, ms));
      });

    const run = async () => {
      while (!cancelled) {
        // Opening frame: empty box, blinking caret, cursor resting below.
        setPhase("homepage");
        setTyped("");
        setCursor({ x: 50, y: 86 });
        await wait(1000);
        if (cancelled) return;

        // Type the query one keystroke at a time, with a human-ish rhythm.
        setPhase("typing");
        for (let i = 1; i <= QUERY.length; i++) {
          if (cancelled) return;
          setTyped(QUERY.slice(0, i));
          const c = QUERY[i - 1];
          const base = 95 + Math.random() * 75; // ~95–170ms per key
          await wait(c === " " ? base + 120 : base);
        }
        setPhase("type-done");
        await wait(550);
        if (cancelled) return;

        // Glide the cursor down to the Search button, then press it.
        setPhase("move-to-search");
        setCursor({ x: 41, y: 72 });
        await wait(850);
        if (cancelled) return;
        setPhase("clicking-search");
        await wait(320);
        if (cancelled) return;

        // Results load. Keep the cursor visible and walk it to my result
        // along a continuous path instead of teleporting.
        setPhase("serp");
        setCursor({ x: 34, y: 40 });
        await wait(750);
        if (cancelled) return;
        setPhase("move-to-result");
        setCursor({ x: 19, y: 57 });
        await wait(900);
        if (cancelled) return;
        setPhase("clicking-result");
        await wait(520);
        if (cancelled) return;

        // Payoff: flash to my site and hold it long enough to register.
        setPhase("flash-white");
        await wait(220);
        if (cancelled) return;
        setPhase("site");
        setCursor(null);
        await wait(2400);
        if (cancelled) return;
      }
    };

    run();

    return () => {
      cancelled = true;
      for (const t of timers) clearTimeout(t);
    };
  }, [active, inView, reduced]);

  const onHomepage =
    phase === "homepage" ||
    phase === "typing" ||
    phase === "type-done" ||
    phase === "move-to-search" ||
    phase === "clicking-search";
  const onSerp = phase === "serp" || phase === "move-to-result" || phase === "clicking-result";
  const onSite = phase === "site";
  const onFlash = phase === "flash-white";

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        background: BG,
        color: TEXT,
        fontFamily: 'Roboto, Arial, "Helvetica Neue", sans-serif',
        overflow: "hidden",
      }}
    >
      {onHomepage && (
        <HomepageView
          typed={typed}
          caretBlink={phase === "homepage" || phase === "type-done"}
          showAutocomplete={
            phase === "typing" || phase === "type-done" || phase === "move-to-search"
          }
          searchPressed={phase === "clicking-search"}
        />
      )}
      {onSerp && (
        <SerpView
          query={QUERY}
          resultHover={phase === "move-to-result" || phase === "clicking-result" || reduced}
          resultPressed={phase === "clicking-result"}
        />
      )}
      {onSite && <SiteView />}
      {onFlash && (
        <div style={{ position: "absolute", inset: 0, background: "#ffffff", zIndex: 50 }} />
      )}

      {/* Cursor overlay */}
      {cursor && (
        <div
          style={{
            position: "absolute",
            left: `${cursor.x}%`,
            top: `${cursor.y}%`,
            transition: "left 0.7s cubic-bezier(.2,.7,.2,1), top 0.7s cubic-bezier(.2,.7,.2,1)",
            zIndex: 30,
            pointerEvents: "none",
          }}
        >
          <PointerCursor pressed={phase === "clicking-search" || phase === "clicking-result"} />
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Homepage view (dark mode)
// ─────────────────────────────────────────────────────────────────────────
function HomepageView({
  typed,
  caretBlink,
  showAutocomplete,
  searchPressed,
}: {
  typed: string;
  caretBlink: boolean;
  showAutocomplete: boolean;
  searchPressed: boolean;
}) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
      {/* Top-right utility */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "1.4em",
          padding: "1em 1.6em 0",
          fontSize: "0.9em",
          color: TEXT,
        }}
      >
        <span>Gmail</span>
        <span>Images</span>
        {/* Apps grid */}
        <span
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 0.3em)",
            gridTemplateRows: "repeat(3, 0.3em)",
            gap: "0.18em",
          }}
          aria-hidden
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={`dot-${i.toString()}`}
              style={{
                width: "0.3em",
                height: "0.3em",
                borderRadius: 999,
                background: TEXT,
              }}
            />
          ))}
        </span>
        {/* Account avatar */}
        <span
          style={{
            width: "1.7em",
            height: "1.7em",
            borderRadius: 999,
            background: "linear-gradient(135deg, #5b6776 0%, #2c3340 100%)",
            color: "#fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            fontSize: "0.85em",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          A
        </span>
      </div>

      {/* Center column */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "8%",
          gap: "1.4em",
          position: "relative",
        }}
      >
        <GoogleWordmark size="5.5em" />

        {/* Search box */}
        <div style={{ position: "relative", width: "62%", maxWidth: "640px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.7em",
              padding: "0.55em 0.6em 0.55em 1em",
              borderRadius: showAutocomplete ? "1.2em 1.2em 0 0" : "999px",
              background: SEARCH_BG,
              border: `1px solid ${FAINT_BORDER}`,
              borderBottom: showAutocomplete ? "1px solid transparent" : undefined,
            }}
          >
            {/* "+" icon */}
            <PlusIcon />

            {/* Input area */}
            <span
              style={{
                flex: 1,
                fontSize: "0.95em",
                color: typed ? TEXT : MUTED,
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {typed}
              <span
                style={{
                  display: "inline-block",
                  width: 1,
                  height: "1em",
                  background: TEXT,
                  marginLeft: 1,
                  verticalAlign: "middle",
                  animation: caretBlink ? "seoCaretBlink 1s steps(1) infinite" : "none",
                }}
              />
            </span>

            {/* Mic icon */}
            <MicIcon />
            {/* Lens icon */}
            <LensIcon />
            {/* AI Mode pill */}
            <AiModePill />
          </div>

          {/* Autocomplete */}
          {showAutocomplete && (
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: "100%",
                background: SEARCH_BG,
                border: `1px solid ${FAINT_BORDER}`,
                borderTop: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "0 0 1.2em 1.2em",
                boxShadow: "0 0.6em 0.8em rgba(0,0,0,0.4)",
                paddingBottom: "0.4em",
                fontSize: "0.95em",
                zIndex: 5,
                overflow: "hidden",
              }}
            >
              {SUGGESTIONS.map((s, i) => (
                <div
                  key={s}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.8em",
                    padding: "0.45em 1em",
                    color: TEXT,
                    background: i === 0 ? "rgba(255,255,255,0.04)" : "transparent",
                  }}
                >
                  <SmallLensIcon />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "0.7em", marginTop: "0.4em" }}>
          <button
            type="button"
            tabIndex={-1}
            style={{
              padding: "0.65em 1em",
              borderRadius: 8,
              background: BUTTON_BG,
              border: "1px solid transparent",
              fontSize: "0.78em",
              color: TEXT,
              transform: searchPressed ? "scale(0.97)" : "scale(1)",
              boxShadow: searchPressed ? "0 0 0 2px rgba(138,180,248,0.4)" : "0 0 0 0 transparent",
              transition: "transform 0.12s ease-out, box-shadow 0.12s ease-out",
              fontFamily: "inherit",
              cursor: "default",
            }}
          >
            Google Search
          </button>
          <button
            type="button"
            tabIndex={-1}
            style={{
              padding: "0.65em 1em",
              borderRadius: 8,
              background: BUTTON_BG,
              border: "1px solid transparent",
              fontSize: "0.78em",
              color: TEXT,
              fontFamily: "inherit",
              cursor: "default",
            }}
          >
            I'm Feeling Lucky
          </button>
        </div>

        {/* "New!" promo line */}
        <div
          style={{
            marginTop: "0.7em",
            fontSize: "0.78em",
            color: TEXT,
            display: "flex",
            alignItems: "center",
            gap: "0.3em",
          }}
        >
          <span style={{ color: ACCENT_RED, fontWeight: 700 }}>New!</span>
          <span>Learn practical AI skills for any job by getting a</span>
          <span style={{ color: LINK_BLUE }}>Google certificate</span>
          <span>today</span>
          <span aria-hidden>💡</span>
        </div>

        {/* Language offer */}
        <div style={{ marginTop: "0.2em", fontSize: "0.78em", color: MUTED }}>
          Google offered in:{" "}
          <span style={{ color: LINK_BLUE, textDecoration: "underline" }}>العربية</span>
        </div>
      </div>

      {/* Footer bar */}
      <div
        style={{
          padding: "0.7em 1.6em",
          fontSize: "0.78em",
          color: TEXT,
          background: FOOTER_BG,
          borderTop: `1px solid ${FAINT_BORDER}`,
          flexShrink: 0,
        }}
      >
        Jordan
      </div>

      <style>
        {"@keyframes seoCaretBlink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }"}
      </style>
    </div>
  );
}

// ── Small icon helpers ────────────────────────────────────────────────────
function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" style={{ width: "1.1em", height: "1.1em", flexShrink: 0 }} aria-hidden>
      <title>add</title>
      <path
        d="M12 5v14M5 12h14"
        stroke={MUTED}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" style={{ width: "1.1em", height: "1.1em", flexShrink: 0 }} aria-hidden>
      <title>mic</title>
      <path d="M12 14a3 3 0 003-3V6a3 3 0 10-6 0v5a3 3 0 003 3z" fill={TEXT} />
      <path
        d="M19 11a7 7 0 01-14 0M12 18v3"
        stroke={TEXT}
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function LensIcon() {
  return (
    <svg viewBox="0 0 24 24" style={{ width: "1.1em", height: "1.1em", flexShrink: 0 }} aria-hidden>
      <title>lens</title>
      <rect x="3" y="6" width="18" height="14" rx="2" fill="none" stroke={TEXT} strokeWidth="1.6" />
      <circle cx="12" cy="13" r="3.5" fill="none" stroke={TEXT} strokeWidth="1.6" />
      <circle cx="17.5" cy="9.5" r="0.8" fill={TEXT} />
    </svg>
  );
}

function AiModePill() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.3em",
        padding: "0.4em 0.8em",
        borderRadius: 999,
        background: "rgba(138,180,248,0.12)",
        color: LINK_BLUE,
        fontSize: "0.78em",
        flexShrink: 0,
        fontWeight: 500,
      }}
    >
      <SparkIcon />
      AI Mode
    </span>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" style={{ width: "0.9em", height: "0.9em" }} aria-hidden>
      <title>spark</title>
      <path
        d="M12 2 L13.5 9.5 L21 11 L13.5 12.5 L12 20 L10.5 12.5 L3 11 L10.5 9.5 Z"
        fill={LINK_BLUE}
      />
    </svg>
  );
}

function SmallLensIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      style={{ width: "0.85em", height: "0.85em", flexShrink: 0 }}
      aria-hidden
    >
      <title>search</title>
      <circle cx="11" cy="11" r="7" fill="none" stroke={MUTED} strokeWidth="2" />
      <line x1="20" y1="20" x2="16.65" y2="16.65" stroke={MUTED} strokeWidth="2" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// SERP view (dark mode)
// ─────────────────────────────────────────────────────────────────────────
function SerpView({
  query,
  resultHover,
  resultPressed,
}: {
  query: string;
  resultHover: boolean;
  resultPressed: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        background: BG,
        color: TEXT,
        animation: "seoSerpFadeIn 0.25s ease-out",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.4em",
          padding: "0.8em 1.4em",
          borderBottom: `1px solid ${FAINT_BORDER}`,
        }}
      >
        <GoogleWordmark size="1.8em" />
        <div
          style={{
            flex: 1,
            maxWidth: "34em",
            display: "flex",
            alignItems: "center",
            gap: "0.7em",
            padding: "0.45em 1em",
            border: `1px solid ${FAINT_BORDER}`,
            borderRadius: 999,
            background: SEARCH_BG,
          }}
        >
          <span style={{ fontSize: "0.88em", color: TEXT, flex: 1 }}>{query}</span>
          <MicIcon />
          <LensIcon />
          <AiModePill />
        </div>
        {/* Apps + avatar */}
        <span
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 0.3em)",
            gridTemplateRows: "repeat(3, 0.3em)",
            gap: "0.18em",
          }}
          aria-hidden
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={`tbdot-${i.toString()}`}
              style={{
                width: "0.3em",
                height: "0.3em",
                borderRadius: 999,
                background: TEXT,
              }}
            />
          ))}
        </span>
        <span
          style={{
            width: "1.7em",
            height: "1.7em",
            borderRadius: 999,
            background: "linear-gradient(135deg, #5b6776 0%, #2c3340 100%)",
            color: "#fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            fontSize: "0.85em",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          A
        </span>
      </div>

      {/* Tabs row */}
      <div
        style={{
          display: "flex",
          gap: "1.6em",
          padding: "0.5em 1.4em 0",
          fontSize: "0.78em",
          color: MUTED,
          borderBottom: `1px solid ${FAINT_BORDER}`,
        }}
      >
        {[
          { label: "All", active: true },
          { label: "Images" },
          { label: "Videos" },
          { label: "News" },
          { label: "Maps" },
          { label: "More" },
        ].map((t) => (
          <span
            key={t.label}
            style={{
              padding: "0.4em 0 0.55em",
              color: t.active ? LINK_BLUE : MUTED,
              borderBottom: t.active ? `3px solid ${LINK_BLUE}` : "3px solid transparent",
              fontWeight: t.active ? 500 : 400,
            }}
          >
            {t.label}
          </span>
        ))}
        <span style={{ marginLeft: "auto", padding: "0.4em 0 0.55em" }}>Tools</span>
      </div>

      {/* Results */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          padding: "0.8em 1.4em 1em 7em",
          fontSize: "0.85em",
        }}
      >
        <div
          style={{
            fontSize: "0.72em",
            color: MUTED,
            marginBottom: "0.6em",
          }}
        >
          About 12,400 results (0.42 seconds)
        </div>

        <SponsoredAd
          domain="findpros.io"
          breadcrumb="findpros.io › directory"
          title="Find Top IT &amp; Marketing Pros — Vetted Talent in Days"
          desc="Browse vetted professionals across IT, analytics, and growth. Hourly or project."
          color="#1a73e8"
        />
        <SponsoredAd
          domain="hireanalysts.com"
          breadcrumb="hireanalysts.com"
          title="Hire Data Analysts &amp; Growth Marketers"
          desc="On-demand analysts for SQL, Power BI, and paid acquisition campaigns."
          color="#0a8a3b"
        />

        <MyResult hover={resultHover} pressed={resultPressed} />

        <OrganicResult
          favicon={
            <svg viewBox="0 0 24 24" style={{ width: "1.1em", height: "1.1em" }} aria-hidden>
              <title>linkedin</title>
              <rect width="24" height="24" rx="3" fill="#0a66c2" />
              <text
                x="12"
                y="17"
                textAnchor="middle"
                fontSize="14"
                fontFamily="Arial"
                fontWeight="700"
                fill="white"
              >
                in
              </text>
            </svg>
          }
          site="LinkedIn"
          breadcrumb="linkedin.com › in › aiham"
          url="https://www.linkedin.com/in/aihamalrawashdeh"
          title="Aiham AlRawashdeh - Full-Stack Developer &amp; Digital Marketer"
          desc="Full-Stack Developer &amp; Digital Marketer based in Amman, Jordan. Builds web apps and runs data-driven campaigns. View profile, posts, and connections on LinkedIn."
        />
        <OrganicResult
          favicon={
            <svg viewBox="0 0 24 24" style={{ width: "1.1em", height: "1.1em" }} aria-hidden>
              <title>github</title>
              <rect width="24" height="24" rx="3" fill="#24292f" />
              <path
                d="M12 5.5a6.5 6.5 0 00-2.05 12.67c.32.06.44-.14.44-.31v-1.1c-1.8.4-2.18-.86-2.18-.86-.3-.75-.72-.95-.72-.95-.6-.4.04-.4.04-.4.65.05 1 .67 1 .67.58 1 1.52.71 1.9.54.06-.42.23-.71.42-.87-1.44-.16-2.95-.72-2.95-3.2 0-.7.25-1.28.67-1.73-.07-.16-.29-.83.06-1.73 0 0 .54-.17 1.78.66.52-.14 1.07-.22 1.62-.22.55 0 1.1.08 1.62.22 1.24-.83 1.78-.66 1.78-.66.36.9.14 1.57.07 1.73.42.45.67 1.03.67 1.73 0 2.48-1.51 3.03-2.95 3.2.23.2.44.6.44 1.2v1.78c0 .17.12.38.45.31A6.5 6.5 0 0012 5.5z"
                fill="#fff"
              />
            </svg>
          }
          site="GitHub"
          breadcrumb="github.com › RealAyham97"
          url="https://github.com/RealAyham97"
          title="RealAyham97 (Aiham AlRawashdeh) · GitHub"
          desc="Public projects, dashboards, and tooling. Pinned: Portfolio (Next.js, Tailwind v4) and a Power BI sample pack."
        />
      </div>

      <style>
        {
          "@keyframes seoSerpFadeIn { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: translateY(0) } }"
        }
      </style>
    </div>
  );
}

function SponsoredAd({
  domain,
  breadcrumb,
  title,
  desc,
  color,
}: {
  domain: string;
  breadcrumb: string;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <div style={{ marginBottom: "1em" }}>
      <div style={{ fontWeight: 700, fontSize: "0.85em", color: TEXT }}>Sponsored</div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5em",
          marginTop: "0.3em",
        }}
      >
        <span
          style={{
            width: "1.4em",
            height: "1.4em",
            borderRadius: 999,
            background: color,
            color: "#fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "0.7em",
          }}
        >
          {domain.charAt(0).toUpperCase()}
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.05em" }}>
          <span style={{ fontSize: "0.78em", color: TEXT, fontWeight: 500 }}>{domain}</span>
          <span style={{ fontSize: "0.7em", color: MUTED }}>{breadcrumb}</span>
        </div>
      </div>
      <div
        style={{
          fontSize: "1.05em",
          color: LINK_BLUE,
          marginTop: "0.3em",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: "0.82em",
          color: MUTED,
          lineHeight: 1.45,
          marginTop: "0.15em",
        }}
      >
        {desc}
      </div>
    </div>
  );
}

function MyResult({ hover, pressed }: { hover: boolean; pressed: boolean }) {
  return (
    <div
      style={{
        marginTop: "0.6em",
        marginBottom: "1.4em",
        padding: "0.5em",
        marginLeft: "-0.5em",
        background: hover ? HOVER_BG : "transparent",
        borderRadius: 8,
        transition: "background 0.2s ease-out, box-shadow 0.2s ease-out",
        transform: pressed ? "scale(0.997)" : "scale(1)",
        boxShadow: pressed
          ? "0 0 0 2px rgba(138,180,248,0.55)"
          : hover
            ? "0 0 0 1px rgba(138,180,248,0.28)"
            : "0 0 0 0 transparent",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
        <span
          style={{
            width: "1.5em",
            height: "1.5em",
            borderRadius: 999,
            background: TEXT,
            color: BG,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "0.85em",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
          }}
        >
          A
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.05em" }}>
          <span style={{ fontSize: "0.82em", color: TEXT, fontWeight: 500 }}>
            Aiham AlRawashdeh
          </span>
          <span style={{ fontSize: "0.7em", color: MUTED }}>https://www.aihamalrawashdeh.com</span>
        </div>
      </div>
      <div
        style={{
          fontSize: "1.1em",
          color: LINK_BLUE,
          marginTop: "0.35em",
          textDecoration: hover ? "underline" : "none",
        }}
      >
        Aiham AlRawashdeh — IT &amp; Digital Marketing
      </div>
      <div
        style={{
          fontSize: "0.82em",
          color: MUTED,
          lineHeight: 1.45,
          marginTop: "0.2em",
        }}
      >
        Analyst turned entrepreneur — IT services, dashboards, and data-driven marketing. Six years
        across aviation, consulting, and media. Foundry, Power BI, paid acquisition, and SEO that
        closes the loop.
      </div>
    </div>
  );
}

function OrganicResult({
  favicon,
  site,
  breadcrumb,
  url,
  title,
  desc,
}: {
  favicon: React.ReactNode;
  site: string;
  breadcrumb: string;
  url: string;
  title: string;
  desc: string;
}) {
  return (
    <div style={{ marginBottom: "1.1em", opacity: 0.85 }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
        {favicon}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.05em" }}>
          <span style={{ fontSize: "0.82em", color: TEXT, fontWeight: 500 }}>{site}</span>
          <span style={{ fontSize: "0.7em", color: MUTED }}>{breadcrumb}</span>
        </div>
      </div>
      <div
        style={{
          fontSize: "1.1em",
          color: VISITED,
          marginTop: "0.3em",
          opacity: 0.9,
        }}
        title={url}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: "0.82em",
          color: MUTED,
          lineHeight: 1.45,
          marginTop: "0.15em",
        }}
      >
        {desc}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Site view — final frame (stylized version of my actual portfolio hero)
// ─────────────────────────────────────────────────────────────────────────
function SiteView() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#0a0a0b",
        color: "#e7e7e7",
        display: "flex",
        flexDirection: "column",
        animation: "seoSiteFadeIn 0.4s ease-out",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1em 1.4em",
          fontFamily: "monospace",
          fontSize: "0.75em",
          color: "#8a8a8a",
        }}
      >
        <span style={{ letterSpacing: "0.1em" }}>AIHAM R.</span>
        <div style={{ display: "flex", gap: "1.2em" }}>
          <span>IT</span>
          <span style={{ color: "#e7e7e7" }}>Marketing</span>
          <span>Contact</span>
          <span>Blog</span>
          <span>FAQ</span>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          padding: "2em 2em 0",
          display: "flex",
          flexDirection: "column",
          gap: "1em",
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: "0.75em",
            color: "#8a8a8a",
            letterSpacing: "0.1em",
          }}
        >
          FULL-STACK DEVELOPER &amp; DIGITAL MARKETER · AMMAN, JORDAN
        </div>
        <div style={{ fontFamily: "monospace", fontSize: "0.8em", color: "#8a8a8a" }}>
          Hi, my name is
        </div>
        <div
          style={{
            fontFamily: "Georgia, 'Instrument Serif', serif",
            fontStyle: "italic",
            fontSize: "3.6em",
            lineHeight: 1,
            color: "#fff",
            letterSpacing: "-0.02em",
          }}
        >
          Aiham AlRawashdeh
        </div>
        <div style={{ fontSize: "1em", color: "#bcbcbc", maxWidth: "32em" }}>
          I spot what's broken, then I build what fixes it.
        </div>
      </div>

      <style>{`
        @keyframes seoSiteFadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </div>
  );
}
