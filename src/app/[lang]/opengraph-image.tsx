import { ImageResponse } from "next/og";

export const alt = "Mohamed Abdelbaset — Frontend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Latin text only: the default OG font has no Arabic glyphs.
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0c0b0a",
          backgroundImage: "radial-gradient(circle at 88% 12%, rgba(255,90,31,0.35), transparent 45%)",
          color: "#edeae4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "#ff5a1f",
              color: "#0c0b0a",
              fontSize: 30,
              fontWeight: 900,
              letterSpacing: -2,
            }}
          >
            MA
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24, color: "#a39e96" }}>
            <div style={{ width: 12, height: 12, borderRadius: 12, background: "#3dd68c" }} />
            Available for new projects
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, fontWeight: 800, letterSpacing: -6, lineHeight: 0.9 }}>Mohamed</div>
          <div style={{ fontSize: 132, fontWeight: 800, letterSpacing: -6, lineHeight: 0.9 }}>Abdelbaset</div>
          <div style={{ marginTop: 36, fontSize: 34, color: "#a39e96" }}>
            Frontend Developer · React & Next.js · Cairo, EG
          </div>
        </div>
      </div>
    ),
    size,
  );
}
