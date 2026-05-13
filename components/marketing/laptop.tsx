"use client";

type Props = {
  width: number;
  height: number;
  dark: boolean;
  baseVisible?: boolean;
  children: React.ReactNode;
};

/**
 * Macbook-style bezel. Children render inside the screen area.
 * Pure styling — no scroll/animation logic here.
 */
export function Laptop({ width, height, dark, baseVisible = true, children }: Props) {
  const bezel = dark ? "#0a0a0b" : "#111213";
  const screenBg = dark ? "#0f1011" : "#ffffff";
  const baseH = height * 0.04;
  const screenInset = Math.max(3, width * 0.012);

  return (
    <div style={{ position: "absolute", width, height, willChange: "width,height,transform" }}>
      {/* Lid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: bezel,
          borderRadius: Math.max(6, width * 0.018),
          boxShadow: dark
            ? "0 30px 60px -30px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04) inset"
            : "0 30px 60px -30px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06) inset",
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

      {/* Hinge / base */}
      {baseVisible && (
        <>
          <div
            style={{
              position: "absolute",
              left: -width * 0.05,
              right: -width * 0.05,
              top: "100%",
              height: baseH,
              background: `linear-gradient(180deg, ${dark ? "#1a1b1d" : "#cfd1d4"} 0%, ${
                dark ? "#0a0a0b" : "#9ea1a6"
              } 100%)`,
              borderBottomLeftRadius: width * 0.06,
              borderBottomRightRadius: width * 0.06,
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
              background: dark ? "#0a0a0b" : "#7d8085",
              borderBottomLeftRadius: 999,
              borderBottomRightRadius: 999,
            }}
          />
        </>
      )}
    </div>
  );
}
