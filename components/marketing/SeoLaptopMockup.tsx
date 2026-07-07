"use client";

import { type RefObject, useCallback, useEffect, useRef, useState } from "react";

// ── Data ─────────────────────────────────────────────────────────────────
const QUERY = "freelance digital marketer jordan";
const SUGGESTIONS = [
  "freelance digital marketer jordan",
  "freelance digital marketing jordan",
  "freelance seo jordan",
  "freelance digital marketer amman",
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
const SUGGESTION_HOVER_BG = "#3c4043";
const SUGGESTION_PRESSED_BG = "#45484d";
const GOOGLE_FONT = '"Product Sans", "Trebuchet MS", Arial, sans-serif';

// ── Phases ───────────────────────────────────────────────────────────────
type Phase =
  | "homepage"
  | "typing"
  | "type-done"
  | "move-to-suggestion"
  | "hover-suggestion"
  | "clicking-suggestion"
  | "serp"
  | "serp-scroll"
  | "move-to-result"
  | "hover-result"
  | "clicking-result"
  | "flash-white"
  | "site";

type ElRef = RefObject<HTMLDivElement | null>;

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
  const firstSuggestionRef = useRef<HTMLDivElement>(null);
  const serpOuterRef = useRef<HTMLDivElement>(null);
  const myResultRef = useRef<HTMLDivElement>(null);
  const resultTitleRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("homepage");
  const [typed, setTyped] = useState("");
  const [scrollPx, setScrollPx] = useState(0);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  // Once the animation has run, keep the home-page iframe mounted (hidden
  // between cycles) so the final frame never shows a loading blank.
  const [warm, setWarm] = useState(false);

  useEffect(() => {
    if (active && inView && !reduced) setWarm(true);
  }, [active, inView, reduced]);

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

  // Live scroll value for measurement (state lags inside the async runner).
  const scrollPxRef = useRef(0);
  const applyScroll = useCallback((px: number) => {
    scrollPxRef.current = px;
    setScrollPx(px);
  }, []);

  // Cursor targets are measured from the live DOM instead of hardcoded
  // percentages, so the pointer always lands on what it "clicks".
  const aimAt = useCallback((el: HTMLElement | null, fx = 0.5, fy = 0.5) => {
    const root = rootRef.current;
    if (!el || !root) return null;
    const r = el.getBoundingClientRect();
    const rr = root.getBoundingClientRect();
    if (rr.width === 0 || rr.height === 0) return null;
    return {
      x: ((r.left + r.width * fx - rr.left) / rr.width) * 100,
      y: ((r.top + r.height * fy - rr.top) / rr.height) * 100,
    };
  }, []);

  // How far the SERP must scroll so my result sits in the upper third.
  const measureScrollTarget = useCallback(() => {
    const outer = serpOuterRef.current;
    const block = myResultRef.current;
    if (!outer || !block) return 0;
    const oR = outer.getBoundingClientRect();
    const bR = block.getBoundingClientRect();
    return Math.max(0, bR.top - oR.top + scrollPxRef.current - oR.height * 0.26);
  }, []);

  // Reduced-motion fallback: skip straight to the payoff frame — the SERP
  // scrolled to my result, highlighted as the top organic hit.
  useEffect(() => {
    if (!reduced) return;
    setTyped(QUERY);
    setPhase("serp");
    setCursor(null);
    const raf = requestAnimationFrame(() => {
      applyScroll(measureScrollTarget());
    });
    return () => cancelAnimationFrame(raf);
  }, [reduced, applyScroll, measureScrollTarget]);

  // Sequence runner. Plays once the laptop is zoomed in and in view, then loops
  // so the story is always catchable instead of being a one-shot that's usually
  // already over. Resets to the opening frame whenever it's not running.
  useEffect(() => {
    if (reduced) return;

    if (!(active && inView)) {
      setPhase("homepage");
      setTyped("");
      applyScroll(0);
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
        applyScroll(0);
        setCursor({ x: 52, y: 84 });
        await wait(900);
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
        await wait(500);
        if (cancelled) return;

        // Glide to the first autocomplete suggestion and click it — the way
        // people actually search, instead of hunting for the Search button.
        setPhase("move-to-suggestion");
        const sAim = aimAt(firstSuggestionRef.current, 0.22, 0.55);
        if (sAim) setCursor(sAim);
        await wait(750);
        if (cancelled) return;
        setPhase("hover-suggestion");
        await wait(280);
        if (cancelled) return;
        setPhase("clicking-suggestion");
        await wait(240);
        if (cancelled) return;

        // Results load at the top of the page: sponsored ads first, like real
        // life. Give it a beat, then scroll past them to the organic results.
        setPhase("serp");
        await wait(1000);
        if (cancelled) return;
        setPhase("serp-scroll");
        applyScroll(measureScrollTarget());
        await wait(1050);
        if (cancelled) return;

        // Walk the cursor onto my result, hover, click.
        setPhase("move-to-result");
        const tAim = aimAt(resultTitleRef.current, 0.32, 0.5);
        if (tAim) setCursor(tAim);
        await wait(800);
        if (cancelled) return;
        setPhase("hover-result");
        await wait(300);
        if (cancelled) return;
        setPhase("clicking-result");
        await wait(420);
        if (cancelled) return;

        // Payoff: flash to my site and hold it long enough to register.
        setPhase("flash-white");
        await wait(200);
        if (cancelled) return;
        setPhase("site");
        setCursor(null);
        await wait(3000);
        if (cancelled) return;
      }
    };

    run();

    return () => {
      cancelled = true;
      for (const t of timers) clearTimeout(t);
    };
  }, [active, inView, reduced, aimAt, applyScroll, measureScrollTarget]);

  const onHomepage =
    phase === "homepage" ||
    phase === "typing" ||
    phase === "type-done" ||
    phase === "move-to-suggestion" ||
    phase === "hover-suggestion" ||
    phase === "clicking-suggestion";
  const onSerp =
    phase === "serp" ||
    phase === "serp-scroll" ||
    phase === "move-to-result" ||
    phase === "hover-result" ||
    phase === "clicking-result";
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
          showAutocomplete={phase !== "homepage"}
          firstSuggestionRef={firstSuggestionRef}
          suggestionHover={phase === "hover-suggestion" || phase === "clicking-suggestion"}
          suggestionPressed={phase === "clicking-suggestion"}
        />
      )}
      {onSerp && (
        <SerpView
          query={SUGGESTIONS[0]}
          resultHover={phase === "hover-result" || phase === "clicking-result" || reduced}
          resultPressed={phase === "clicking-result"}
          scrollPx={scrollPx}
          reduced={reduced}
          outerRef={serpOuterRef}
          myResultRef={myResultRef}
          resultTitleRef={resultTitleRef}
        />
      )}
      {warm && <SiteFrame visible={onSite} />}
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
          <PointerCursor pressed={phase === "clicking-suggestion" || phase === "clicking-result"} />
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
  firstSuggestionRef,
  suggestionHover,
  suggestionPressed,
}: {
  typed: string;
  caretBlink: boolean;
  showAutocomplete: boolean;
  firstSuggestionRef: ElRef;
  suggestionHover: boolean;
  suggestionPressed: boolean;
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
                  ref={i === 0 ? firstSuggestionRef : undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.8em",
                    padding: "0.45em 1em",
                    color: TEXT,
                    background:
                      i === 0 && suggestionPressed
                        ? SUGGESTION_PRESSED_BG
                        : i === 0 && suggestionHover
                          ? SUGGESTION_HOVER_BG
                          : "transparent",
                    transition: "background 0.15s ease-out",
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
  scrollPx,
  reduced,
  outerRef,
  myResultRef,
  resultTitleRef,
}: {
  query: string;
  resultHover: boolean;
  resultPressed: boolean;
  scrollPx: number;
  reduced: boolean;
  outerRef: ElRef;
  myResultRef: ElRef;
  resultTitleRef: ElRef;
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
        animation: reduced ? "none" : "seoSerpFadeIn 0.25s ease-out",
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

      {/* Results viewport — content inside scrolls like a real page */}
      <div
        ref={outerRef}
        style={{
          flex: 1,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            padding: "0.8em 1.4em 1em 7em",
            fontSize: "0.85em",
            transform: `translateY(-${scrollPx}px)`,
            transition: reduced ? "none" : "transform 0.9s cubic-bezier(.25,.6,.2,1)",
            willChange: "transform",
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
            domain="growthlab.jo"
            breadcrumb="growthlab.jo › services"
            title="Digital Marketing Agency Jordan | Full-Service Campaigns"
            desc="Paid ads, social media, and SEO for brands in Amman and the GCC. Get a free proposal."
            color="#1a73e8"
          />
          <SponsoredAd
            domain="adnexus.co"
            breadcrumb="adnexus.co › plans"
            title="Hire Digital Marketing Experts | Plans From $499/mo"
            desc="Google and Meta ads managed by certified specialists. Monthly reporting included."
            color="#0a8a3b"
          />

          <MyResult
            hover={resultHover}
            pressed={resultPressed}
            blockRef={myResultRef}
            titleRef={resultTitleRef}
          />

          <OrganicResult
            favicon={
              <svg viewBox="0 0 24 24" style={{ width: "1.1em", height: "1.1em" }} aria-hidden>
                <title>jordan business review</title>
                <rect width="24" height="24" rx="3" fill="#7c3aed" />
                <text
                  x="12"
                  y="17"
                  textAnchor="middle"
                  fontSize="13"
                  fontFamily="Arial"
                  fontWeight="700"
                  fill="white"
                >
                  J
                </text>
              </svg>
            }
            site="Jordan Business Review"
            breadcrumb="jordanbusinessreview.com › marketing"
            url="https://jordanbusinessreview.com/marketing"
            title="Top 10 Digital Marketing Agencies &amp; Freelancers in Jordan (2026)"
            desc="Our annual roundup of agencies and independent specialists serving Amman and the region, compared by services, pricing, and client reviews."
          />
          <OrganicResult
            favicon={
              <svg viewBox="0 0 24 24" style={{ width: "1.1em", height: "1.1em" }} aria-hidden>
                <title>brightreach</title>
                <rect width="24" height="24" rx="3" fill="#0e7490" />
                <text
                  x="12"
                  y="17"
                  textAnchor="middle"
                  fontSize="13"
                  fontFamily="Arial"
                  fontWeight="700"
                  fill="white"
                >
                  B
                </text>
              </svg>
            }
            site="BrightReach"
            breadcrumb="brightreach.jo › about"
            url="https://brightreach.jo/about"
            title="BrightReach | Digital Marketing Agency in Amman"
            desc="Full-service agency offering social media management, paid advertising, and branding for businesses across Jordan."
          />
        </div>
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

function MyResult({
  hover,
  pressed,
  blockRef,
  titleRef,
}: {
  hover: boolean;
  pressed: boolean;
  blockRef: ElRef;
  titleRef: ElRef;
}) {
  return (
    <div
      ref={blockRef}
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
        ref={titleRef}
        style={{
          fontSize: "1.1em",
          color: LINK_BLUE,
          marginTop: "0.35em",
          textDecoration: hover ? "underline" : "none",
        }}
      >
        Aiham AlRawashdeh | IT &amp; Digital Marketing
      </div>
      <div
        style={{
          fontSize: "0.82em",
          color: MUTED,
          lineHeight: 1.45,
          marginTop: "0.2em",
        }}
      >
        Freelance digital marketer in Amman, Jordan. SEO, Google and Meta ads, and analytics that
        close the loop between spend and results. Campaigns in Arabic and English across Jordan and
        the wider MENA region.
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
// Site frame — final frame: the real portfolio home page in an iframe,
// rendered at desktop width and scaled down to fit the laptop screen.
// Stays mounted (hidden) between loop cycles so it only loads once.
// ─────────────────────────────────────────────────────────────────────────
const SITE_FRAME_DESIGN_W = 1280;

function SiteFrame({ visible }: { visible: boolean }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  // offsetWidth/offsetHeight are layout pixels, unaffected by the parallax
  // scale() transform — getBoundingClientRect would double-apply the zoom.
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const measure = () => setBox({ w: el.offsetWidth, h: el.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scale = box.w > 0 ? box.w / SITE_FRAME_DESIGN_W : 0;

  return (
    <div
      ref={boxRef}
      style={{
        position: "absolute",
        inset: 0,
        background: "#0a0a0b",
        overflow: "hidden",
        visibility: visible ? "visible" : "hidden",
        animation: visible ? "seoSiteFadeIn 0.4s ease-out" : "none",
      }}
    >
      {scale > 0 && (
        <iframe
          src="/"
          title="Portfolio home page preview"
          tabIndex={-1}
          scrolling="no"
          style={{
            width: SITE_FRAME_DESIGN_W,
            height: Math.ceil(box.h / scale),
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            border: 0,
            display: "block",
            pointerEvents: "none",
          }}
        />
      )}
      <style>{"@keyframes seoSiteFadeIn { from { opacity: 0 } to { opacity: 1 } }"}</style>
    </div>
  );
}
