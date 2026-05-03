import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — ${profile.role}`;

// Hex values approximate the dark-mode tokens in app/globals.css (Satori does not parse oklch()).
// Keep #0a0a0a/#f1f1f1/#e8a04d in sync with --background/--text/--accent under .dark.
export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          justifyContent: "space-between", padding: 80,
          background: "#0a0a0a", color: "#f1f1f1",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 28, opacity: 0.6, letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace" }}>
            {`${profile.role.toUpperCase()} · AMMAN`}
          </div>
          <div style={{ fontSize: 96, lineHeight: 1, fontStyle: "italic" }}>{profile.name}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 32, maxWidth: 800 }}>{profile.pitch}</div>
          <div style={{ width: 120, height: 8, background: "#e8a04d" }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
