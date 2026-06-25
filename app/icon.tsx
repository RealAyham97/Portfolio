import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Brand monogram favicon: crimson field with an italic serif "A".
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#b21f2d",
        color: "#ffffff",
        fontSize: 48,
        fontFamily: "Georgia, serif",
        fontStyle: "italic",
        fontWeight: 600,
      }}
    >
      A
    </div>,
    { ...size },
  );
}
