import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Brand monogram for iOS home screen: crimson field with an italic serif "A".
export default function AppleIcon() {
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
        fontSize: 120,
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
