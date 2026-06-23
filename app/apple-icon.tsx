import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#080810",
          fontFamily: "monospace",
          fontWeight: 700,
          fontSize: 92,
          color: "#F5C842",
          letterSpacing: "-4px",
        }}
      >
        00
      </div>
    ),
    { ...size }
  );
}
