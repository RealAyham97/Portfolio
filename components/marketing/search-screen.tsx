"use client";

type Props = { dark: boolean };

/**
 * Original generic search-engine mock that lives inside the laptop screen
 * before the user's video starts playing. Intentionally NOT Google.
 */
export function SearchScreen({ dark }: Props) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: dark ? "#0f1011" : "#ffffff",
        color: dark ? "#e7e7e7" : "#202124",
        display: "flex",
        flexDirection: "column",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* faux browser chrome */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6em",
          padding: "0.7em 0.9em",
          borderBottom: dark ? "1px solid #1f1f22" : "1px solid #ececec",
          background: dark ? "#1a1b1d" : "#f6f6f7",
          flexShrink: 0,
        }}
      >
        <span style={{ width: "0.7em", height: "0.7em", borderRadius: 999, background: "#ff5f57" }} />
        <span style={{ width: "0.7em", height: "0.7em", borderRadius: 999, background: "#febc2e" }} />
        <span style={{ width: "0.7em", height: "0.7em", borderRadius: 999, background: "#28c840" }} />
        <div
          style={{
            flex: 1,
            margin: "0 1em",
            padding: "0.35em 0.9em",
            borderRadius: 999,
            background: dark ? "#0f1011" : "#ffffff",
            border: dark ? "1px solid #2a2b2e" : "1px solid #e2e2e2",
            fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
            fontSize: "0.7em",
            color: dark ? "#8a8a8e" : "#5f6368",
            display: "flex",
            alignItems: "center",
            gap: "0.5em",
          }}
        >
          <span style={{ opacity: 0.6 }}>🔒</span>
          <span>search.example/</span>
        </div>
      </div>

      {/* utility row */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "1.2em",
          padding: "0.8em 1.4em",
          fontSize: "0.75em",
          color: dark ? "#cfd0d2" : "#202124",
          flexShrink: 0,
        }}
      >
        <span>Gallery</span>
        <span>Library</span>
        <span>Mail</span>
        <span
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 0.18em)",
            gridTemplateRows: "repeat(3, 0.18em)",
            gap: "0.06em",
          }}
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              style={{
                width: "0.18em",
                height: "0.18em",
                borderRadius: 999,
                background: dark ? "#cfd0d2" : "#5f6368",
              }}
            />
          ))}
        </span>
        <span
          style={{
            width: "1.4em",
            height: "1.4em",
            borderRadius: 999,
            background: "linear-gradient(135deg, oklch(0.78 0.15 70), oklch(0.62 0.18 30))",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.75em",
          }}
        >
          A
        </span>
      </div>

      {/* main */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "8%",
          gap: "1.6em",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "0.05em",
            fontFamily: "var(--font-instrument-serif), serif",
            fontStyle: "italic",
            fontSize: "3.2em",
            letterSpacing: "-0.02em",
            color: dark ? "#f1f1f3" : "#202124",
          }}
        >
          <span>orbit</span>
          <span
            style={{
              width: "0.18em",
              height: "0.18em",
              borderRadius: 999,
              background: "oklch(0.68 0.15 70)",
              transform: "translateY(-0.1em)",
            }}
          />
        </div>

        <div
          style={{
            width: "62%",
            maxWidth: 640,
            display: "flex",
            alignItems: "center",
            gap: "0.7em",
            padding: "0.55em 1em",
            borderRadius: 999,
            background: dark ? "#1a1b1d" : "#ffffff",
            border: dark ? "1px solid #2a2b2e" : "1px solid #dfe1e5",
            boxShadow: dark
              ? "0 0.1em 0.4em rgba(0,0,0,0.4)"
              : "0 0.1em 0.4em rgba(32,33,36,0.06)",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke={dark ? "#8a8a8e" : "#9aa0a6"}
            strokeWidth={2}
            style={{ width: "0.9em", height: "0.9em", flexShrink: 0 }}
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="20" y1="20" x2="16.65" y2="16.65" />
          </svg>
          <span style={{ fontSize: "0.85em", color: dark ? "#cfd0d2" : "#202124" }}>
            digital marketing aiham
            <span
              className="pzh-caret"
              style={{
                display: "inline-block",
                width: 1,
                height: "1em",
                background: dark ? "#cfd0d2" : "#202124",
                marginLeft: 2,
                verticalAlign: "middle",
              }}
            />
          </span>
          <div style={{ flex: 1 }} />
        </div>

        <div style={{ display: "flex", gap: "0.6em", marginTop: "0.4em" }}>
          {["Search", "I'm feeling curious"].map((label) => (
            <div
              key={label}
              style={{
                padding: "0.5em 0.9em",
                borderRadius: 4,
                background: dark ? "#1a1b1d" : "#f6f6f7",
                border: dark ? "1px solid #2a2b2e" : "1px solid transparent",
                fontSize: "0.7em",
                color: dark ? "#cfd0d2" : "#3c4043",
              }}
            >
              {label}
            </div>
          ))}
        </div>

        <div style={{ marginTop: "1em", fontSize: "0.65em", color: dark ? "#8a8a8e" : "#70757a" }}>
          orbit offered in: عربي · Français · Español
        </div>
      </div>

      <div
        style={{
          padding: "0.7em 1.4em",
          fontSize: "0.62em",
          color: dark ? "#8a8a8e" : "#70757a",
          background: dark ? "#1a1b1d" : "#f2f2f3",
          borderTop: dark ? "1px solid #1f1f22" : "1px solid #ececec",
          display: "flex",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div>Amman, Jordan · from your IP</div>
        <div style={{ display: "flex", gap: "1.2em" }}>
          <span>About</span>
          <span>Privacy</span>
          <span>Terms</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes pzh-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        :global(.pzh-caret) { animation: pzh-blink 1.1s steps(1) infinite; }
      `}</style>
    </div>
  );
}
