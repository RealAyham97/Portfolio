"use client";

import { useEffect, useRef, useState } from "react";

// ── Constants ──────────────────────────────────────────────────────────
const QUERY = "Aiham Al Rawashdeh";
const SUGGESTIONS = [
  "aiham al rawashdeh",
  "aiham al rawashdeh linkedin",
  "aiham al rawashdeh portfolio",
  "aiham al rawashdeh github",
];
const G_BLUE = "#4285F4";
const G_RED = "#EA4335";
const G_YELLOW = "#FBBC04";
const G_GREEN = "#34A853";
const G_GRAY_TEXT = "#202124";
const G_GRAY_MUTED = "#70757a";
const SERP_TITLE_BLUE = "#1a0dab";
const SERP_URL_GRAY = "#4d5156";
const SERP_VISITED_PURPLE = "#681da8";
const GOOGLE_FONT = '"Trebuchet MS", "Product Sans", Arial, sans-serif';

type Phase =
  | "homepage" // empty search, cursor blinking in input
  | "typing" // chars being typed
  | "type-done" // typing finished, brief pause
  | "move-to-search" // pointer moving to Google Search button
  | "clicking-search" // pointer click + button press
  | "serp" // results page shown
  | "move-to-result" // pointer moving to my result
  | "clicking-result" // pointer click + link press
  | "site"; // my actual site mock shown

// ── Helpers ────────────────────────────────────────────────────────────
function isReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// ── Cursor SVG ─────────────────────────────────────────────────────────
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
        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
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

// ── Google Wordmark ────────────────────────────────────────────────────
function GoogleWordmark({ size = "6em" }: { size?: string }) {
  return (
    <span
      style={{
        fontFamily: GOOGLE_FONT,
        fontWeight: 400,
        fontSize: size,
        letterSpacing: "-0.04em",
        lineHeight: 1,
      }}
    >
      <span style={{ color: G_BLUE }}>G</span>
      <span style={{ color: G_RED }}>o</span>
      <span style={{ color: G_YELLOW }}>o</span>
      <span style={{ color: G_BLUE }}>g</span>
      <span style={{ color: G_GREEN }}>l</span>
      <span style={{ color: G_RED }}>e</span>
    </span>
  );
}

// ── Main component ─────────────────────────────────────────────────────
export function SeoLaptopMockup() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("homepage");
  const [typed, setTyped] = useState("");
  // Cursor position in % of the screen container.
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(isReducedMotion());
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;

    if (reduced) {
      // Skip animation, freeze on the SERP with my site highlighted.
      setTyped(QUERY);
      setPhase("serp");
      setCursor(null);
      return;
    }

    const el = rootRef.current;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let running = false;

    const cancel = () => {
      for (const t of timers) clearTimeout(t);
      timers.length = 0;
    };

    const reset = () => {
      cancel();
      setPhase("homepage");
      setTyped("");
      setCursor(null);
    };

    const run = () => {
      if (running) return;
      running = true;
      reset();

      // 0.8s: start typing
      timers.push(
        setTimeout(() => {
          setPhase("typing");
          let i = 0;
          const typeNext = () => {
            if (i >= QUERY.length) {
              setPhase("type-done");
              // Show pointer near search box, then move to "Google Search" button
              timers.push(
                setTimeout(() => {
                  setCursor({ x: 70, y: 55 });
                  setPhase("move-to-search");
                }, 350),
              );
              timers.push(
                setTimeout(() => {
                  setCursor({ x: 41, y: 73 });
                }, 450),
              );
              timers.push(
                setTimeout(() => {
                  setPhase("clicking-search");
                }, 1500),
              );
              timers.push(
                setTimeout(() => {
                  setPhase("serp");
                  setCursor(null);
                }, 1850),
              );
              // SERP arrives — move pointer down to my result
              timers.push(
                setTimeout(() => {
                  setCursor({ x: 70, y: 22 });
                  setPhase("move-to-result");
                }, 2700),
              );
              timers.push(
                setTimeout(() => {
                  setCursor({ x: 18, y: 58 });
                }, 2800),
              );
              timers.push(
                setTimeout(() => {
                  setPhase("clicking-result");
                }, 4000),
              );
              timers.push(
                setTimeout(() => {
                  setPhase("site");
                }, 4400),
              );
              return;
            }
            const c = QUERY[i];
            i++;
            setTyped(QUERY.slice(0, i));
            const base = 55 + Math.random() * 45;
            const delay = c === " " ? base + 130 : base;
            timers.push(setTimeout(typeNext, delay));
          };
          typeNext();
        }, 800),
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            run();
          } else if (!entry.isIntersecting) {
            running = false;
            reset();
          }
        }
      },
      { threshold: [0, 0.5, 1] },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancel();
    };
  }, [reduced]);

  const onHomepage =
    phase === "homepage" ||
    phase === "typing" ||
    phase === "type-done" ||
    phase === "move-to-search" ||
    phase === "clicking-search";
  const onSerp = phase === "serp" || phase === "move-to-result" || phase === "clicking-result";
  const onSite = phase === "site";

  const caretBlink = phase === "homepage";
  const showAutocomplete =
    phase === "typing" || phase === "type-done" || phase === "move-to-search";
  const searchPressed = phase === "clicking-search";
  const resultHover = phase === "move-to-result" || phase === "clicking-result";
  const resultPressed = phase === "clicking-result";

  return (
    <div
      ref={rootRef}
      style={{
        position: "absolute",
        inset: 0,
        background: "#ffffff",
        color: G_GRAY_TEXT,
        fontFamily: "Arial, Helvetica, sans-serif",
        overflow: "hidden",
      }}
    >
      {onHomepage && (
        <HomepageView
          typed={typed}
          caretBlink={caretBlink}
          showAutocomplete={showAutocomplete}
          searchPressed={searchPressed}
        />
      )}
      {onSerp && <SerpView query={QUERY} resultHover={resultHover} resultPressed={resultPressed} />}
      {onSite && <SiteView />}

      {/* Cursor overlay (above everything) */}
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
// Homepage view
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
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top utility row */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "1.2em",
          padding: "1em 1.4em 0",
          fontSize: "0.85em",
          color: G_GRAY_TEXT,
        }}
      >
        <span>Gmail</span>
        <span>Images</span>
        {/* Apps grid */}
        <span
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 0.32em)",
            gridTemplateRows: "repeat(3, 0.32em)",
            gap: "0.12em",
          }}
          aria-hidden
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={`dot-${i.toString()}`}
              style={{
                width: "0.32em",
                height: "0.32em",
                borderRadius: 999,
                background: "#5f6368",
              }}
            />
          ))}
        </span>
        {/* Account circle */}
        <span
          style={{
            width: "1.6em",
            height: "1.6em",
            borderRadius: 999,
            background: G_BLUE,
            color: "#fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            fontSize: "0.85em",
          }}
        >
          A
        </span>
      </div>

      {/* Logo + search */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "6%",
          gap: "1.6em",
          position: "relative",
        }}
      >
        <GoogleWordmark />

        {/* Search box (with optional autocomplete sticking out below) */}
        <div style={{ position: "relative", width: "62%", maxWidth: "640px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.7em",
              padding: "0.55em 1em",
              borderRadius: showAutocomplete ? "1.2em 1.2em 0 0" : "999px",
              background: "#ffffff",
              border: "1px solid #dfe1e5",
              boxShadow: "0 0.1em 0.4em rgba(32,33,36,0.06)",
              borderBottom: showAutocomplete ? "1px solid transparent" : undefined,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9aa0a6"
              strokeWidth={2}
              style={{ width: "1em", height: "1em", flexShrink: 0 }}
              aria-hidden
            >
              <title>search</title>
              <circle cx="11" cy="11" r="7" />
              <line x1="20" y1="20" x2="16.65" y2="16.65" />
            </svg>
            <span
              style={{
                flex: 1,
                fontSize: "0.95em",
                color: typed ? G_GRAY_TEXT : G_GRAY_MUTED,
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
                  background: G_GRAY_TEXT,
                  marginLeft: 1,
                  verticalAlign: "middle",
                  animation: caretBlink ? "seoCaretBlink 1s steps(1) infinite" : "none",
                }}
              />
            </span>
            {/* Mic icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              style={{ width: "1em", height: "1em" }}
              aria-hidden
            >
              <title>microphone</title>
              <path d="M12 14a3 3 0 003-3V6a3 3 0 10-6 0v5a3 3 0 003 3z" fill={G_BLUE} />
              <path
                d="M19 11a7 7 0 01-14 0M12 18v3"
                stroke={G_GRAY_TEXT}
                strokeWidth={1.6}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            {/* Lens icon */}
            <svg viewBox="0 0 24 24" style={{ width: "1em", height: "1em" }} aria-hidden>
              <title>lens</title>
              <circle cx="12" cy="12" r="3" fill={G_YELLOW} />
              <circle cx="12" cy="6.5" r="1.5" fill={G_RED} />
              <circle cx="17" cy="14.5" r="1.5" fill={G_GREEN} />
              <circle cx="7" cy="14.5" r="1.5" fill={G_BLUE} />
            </svg>
          </div>

          {/* Autocomplete dropdown */}
          {showAutocomplete && (
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: "100%",
                background: "#ffffff",
                border: "1px solid #dfe1e5",
                borderTop: "1px solid #eee",
                borderRadius: "0 0 1.2em 1.2em",
                boxShadow: "0 0.4em 0.6em rgba(32,33,36,0.1)",
                paddingBottom: "0.4em",
                fontSize: "0.95em",
                zIndex: 5,
              }}
            >
              {SUGGESTIONS.map((s, i) => (
                <div
                  key={s}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.7em",
                    padding: "0.4em 1em",
                    color: G_GRAY_TEXT,
                    background: i === 0 ? "#f5f5f5" : "transparent",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={G_GRAY_MUTED}
                    strokeWidth={2}
                    style={{ width: "0.9em", height: "0.9em", flexShrink: 0 }}
                    aria-hidden
                  >
                    <title>history</title>
                    <circle cx="11" cy="11" r="7" />
                    <line x1="20" y1="20" x2="16.65" y2="16.65" />
                  </svg>
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
              padding: "0.6em 1em",
              borderRadius: 4,
              background: "#f6f6f7",
              border: "1px solid transparent",
              fontSize: "0.75em",
              color: "#3c4043",
              transform: searchPressed ? "scale(0.97)" : "scale(1)",
              boxShadow: searchPressed ? "0 0 0 2px rgba(66,133,244,0.35)" : "0 0 0 0 transparent",
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
              padding: "0.6em 1em",
              borderRadius: 4,
              background: "#f6f6f7",
              border: "1px solid transparent",
              fontSize: "0.75em",
              color: "#3c4043",
              fontFamily: "inherit",
              cursor: "default",
            }}
          >
            I'm Feeling Lucky
          </button>
        </div>

        <div style={{ marginTop: "0.6em", fontSize: "0.7em", color: G_GRAY_MUTED }}>
          Google offered in: عربي · Français · Español
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "0.7em 1.4em",
          fontSize: "0.65em",
          color: G_GRAY_MUTED,
          background: "#f2f2f3",
          borderTop: "1px solid #ececec",
          display: "flex",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div>Jordan</div>
        <div style={{ display: "flex", gap: "1.2em" }}>
          <span>Advertising</span>
          <span>Business</span>
          <span>How Search works</span>
          <span>Privacy</span>
          <span>Terms</span>
        </div>
      </div>

      <style>
        {"@keyframes seoCaretBlink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }"}
      </style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// SERP view
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
        background: "#ffffff",
        color: G_GRAY_TEXT,
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
          borderBottom: "1px solid #ebebeb",
        }}
      >
        <GoogleWordmark size="1.8em" />
        <div
          style={{
            flex: 1,
            maxWidth: "32em",
            display: "flex",
            alignItems: "center",
            gap: "0.7em",
            padding: "0.45em 1em",
            border: "1px solid #dfe1e5",
            borderRadius: 999,
            background: "#fff",
            boxShadow: "0 0.05em 0.2em rgba(32,33,36,0.04)",
          }}
        >
          <span style={{ fontSize: "0.85em", color: G_GRAY_TEXT, flex: 1 }}>{query}</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke={G_BLUE}
            strokeWidth={2}
            style={{ width: "1em", height: "1em" }}
            aria-hidden
          >
            <title>search</title>
            <circle cx="11" cy="11" r="7" />
            <line x1="20" y1="20" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <span
          style={{
            width: "1.6em",
            height: "1.6em",
            borderRadius: 999,
            background: G_BLUE,
            color: "#fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            fontSize: "0.85em",
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
          color: G_GRAY_MUTED,
          borderBottom: "1px solid #ebebeb",
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
              color: t.active ? G_BLUE : G_GRAY_MUTED,
              borderBottom: t.active ? `3px solid ${G_BLUE}` : "3px solid transparent",
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
            color: G_GRAY_MUTED,
            marginBottom: "0.6em",
          }}
        >
          About 12,400 results (0.42 seconds)
        </div>

        {/* Sponsored ads */}
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

        {/* My result (highlighted #1 organic) */}
        <MyResult hover={resultHover} pressed={resultPressed} />

        {/* Other organic results */}
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
          title="Aiham AlRawashdeh - Analyst &amp; Founder"
          desc="Analyst &amp; Founder based in Amman, Jordan. Six years across aviation, consulting, and media. View profile, posts, and connections on LinkedIn."
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
      <div style={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
        <span style={{ fontWeight: 700, fontSize: "0.85em" }}>Sponsored</span>
      </div>
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
          <span style={{ fontSize: "0.78em", color: G_GRAY_TEXT, fontWeight: 500 }}>{domain}</span>
          <span style={{ fontSize: "0.7em", color: SERP_URL_GRAY }}>{breadcrumb}</span>
        </div>
      </div>
      <div
        style={{
          fontSize: "1.05em",
          color: SERP_TITLE_BLUE,
          marginTop: "0.3em",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: "0.82em",
          color: SERP_URL_GRAY,
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
        padding: hover ? "0.5em" : "0.5em",
        marginLeft: "-0.5em",
        background: hover ? "rgba(26,115,232,0.06)" : "transparent",
        borderRadius: 8,
        transition: "background 0.2s ease-out",
        transform: pressed ? "scale(0.997)" : "scale(1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
        {/* Favicon */}
        <span
          style={{
            width: "1.5em",
            height: "1.5em",
            borderRadius: 999,
            background: G_GRAY_TEXT,
            color: "#ffffff",
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
          <span style={{ fontSize: "0.82em", color: G_GRAY_TEXT, fontWeight: 500 }}>
            Aiham AlRawashdeh
          </span>
          <span style={{ fontSize: "0.7em", color: SERP_URL_GRAY }}>
            https://www.aihamalrawashdeh.com
          </span>
        </div>
      </div>
      <div
        style={{
          fontSize: "1.1em",
          color: SERP_TITLE_BLUE,
          marginTop: "0.35em",
          textDecoration: hover ? "underline" : "none",
        }}
      >
        Aiham AlRawashdeh — IT &amp; Digital Marketing
      </div>
      <div
        style={{
          fontSize: "0.82em",
          color: SERP_URL_GRAY,
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
          <span style={{ fontSize: "0.82em", color: G_GRAY_TEXT, fontWeight: 500 }}>{site}</span>
          <span style={{ fontSize: "0.7em", color: SERP_URL_GRAY }}>{breadcrumb}</span>
        </div>
      </div>
      <div
        style={{
          fontSize: "1.1em",
          color: SERP_VISITED_PURPLE,
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
          color: SERP_URL_GRAY,
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
// Final view — stylized representation of my site after click
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
      {/* Loading bar at top */}
      <div
        style={{
          height: "2px",
          background: G_BLUE,
          animation: "seoLoadingBar 0.5s ease-out",
          transformOrigin: "left center",
        }}
      />

      {/* Mini nav */}
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

      {/* Hero */}
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
          ANALYST &amp; FOUNDER · AMMAN, JORDAN
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
        @keyframes seoLoadingBar { from { transform: scaleX(0) } 80% { transform: scaleX(0.7) } to { transform: scaleX(1) } }
      `}</style>
    </div>
  );
}
