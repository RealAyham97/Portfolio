"use client";

type Props = {
  width: number;
  height: number;
  baseVisible?: boolean;
  children: React.ReactNode;
};

/**
 * Macbook-style bezel. Children render inside the screen area.
 * Pure styling — no scroll/animation logic here.
 *
 * The rim ring uses color-mix with the theme's text color so the outline
 * stays visible on both light and dark page backgrounds.
 */
export function Laptop({ width, height, baseVisible = true, children }: Props) {
  const bezel = "#1a1b1e";
  const screenBg = "#0f1011";
  const baseH = height * 0.04;
  const screenInset = Math.max(3, width * 0.012);

  return (
    <div style={{ position: "absolute", width, height }}>
      {/* Lid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: bezel,
          borderRadius: Math.max(6, width * 0.018),
          boxShadow: [
            "0 34px 70px -34px rgba(0,0,0,0.55)",
            "0 0 0 1px color-mix(in oklab, var(--text) 22%, transparent)",
            "0 0 0 1px rgba(255,255,255,0.05) inset",
          ].join(", "),
          overflow: "hidden",
        }}
      >
        {/* Camera dot */}
        <div
          style={{
            position: "absolute",
            top: screenInset * 0.35,
            left: "50%",
            transform: "translateX(-50%)",
            width: Math.max(2, width * 0.004),
            height: Math.max(2, width * 0.004),
            borderRadius: 999,
            background: "#2a2b2e",
          }}
        />
        {/* Screen */}
        <div
          style={{
            position: "absolute",
            top: screenInset,
            left: screenInset,
            right: screenInset,
            bottom: screenInset,
            background: screenBg,
            borderRadius: Math.max(2, width * 0.008),
            overflow: "hidden",
            fontSize: `${Math.max(8, width * 0.022)}px`,
          }}
        >
          {children}
        </div>
      </div>

      {/* Hinge / base — MacBook-silver in both themes */}
      {baseVisible && (
        <>
          <div
            style={{
              position: "absolute",
              left: -width * 0.05,
              right: -width * 0.05,
              top: "100%",
              height: baseH,
              background: "linear-gradient(180deg, #cfd1d4 0%, #9ea1a6 100%)",
              borderBottomLeftRadius: width * 0.06,
              borderBottomRightRadius: width * 0.06,
              boxShadow:
                "0 1px 0 color-mix(in oklab, var(--text) 14%, transparent), 0 14px 24px -12px rgba(0,0,0,0.45)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              width: width * 0.16,
              height: baseH * 0.55,
              background: "#7d8085",
              borderBottomLeftRadius: 999,
              borderBottomRightRadius: 999,
            }}
          />
        </>
      )}
    </div>
  );
}
