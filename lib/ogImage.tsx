import { ImageResponse } from "next/og";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

/** Renders the shared branded 1200x630 OG card used by every route's opengraph-image.tsx. */
export function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#080810",
          backgroundImage:
            "radial-gradient(circle at 70% 30%, rgba(245,200,66,0.12) 0%, transparent 60%)",
          color: "#f0f0f4",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: 48,
          }}
        >
          <span>n</span>
          <span style={{ color: "#f5c842" }}>00</span>
          <span>dles</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#f5c842",
            marginBottom: 24,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            maxWidth: 920,
          }}
        >
          {title}
        </div>
      </div>
    ),
    { ...ogImageSize }
  );
}
