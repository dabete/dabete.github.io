import { ImageResponse } from "next/og";

// The preview card shown when the site's link is shared (LinkedIn, WhatsApp, Discord...).
// Built once at `next build` into a static PNG.
export const alt = "Diego Abete, Software Engineer, with an ASCII cat";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static"; // required by output: "export"

// ASCII-only: the bundled OG font has no ᴥ / ‿ glyphs like the site's cat.
const CAT = [
  "   /\\_____/\\   ",
  "  /         \\  ",
  " |  (o) (o)  | ",
  " |     w     | ",
  "  \\  \\___/  /  ",
  "   '-------'   ",
];

// The OG font isn't monospace, so each character gets a fixed-width box to keep the art aligned.
function catLine(line: string, row: number) {
  return (
    <div key={row} style={{ display: "flex" }}>
      {[...line].map((ch, i) => {
        const isEye = row === 2 && "(o)".includes(ch);
        return (
          <div key={i} style={{ width: 24, display: "flex", justifyContent: "center", color: isEye ? "#ff9a3c" : "#7f8894" }}>
            {ch}
          </div>
        );
      })}
    </div>
  );
}

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 90px",
          background: "#1c1c1c",
          borderBottom: "12px solid #ff9a3c",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, color: "#f0f0f0", letterSpacing: -2 }}>Diego Abete</div>
          <div style={{ fontSize: 36, color: "#8a8a8a", marginTop: 12 }}>Software Engineer</div>
          <div style={{ fontSize: 30, color: "#8a8a8a", marginTop: 6 }}>CS @ King&apos;s College London</div>
          <div style={{ fontSize: 30, color: "#ff9a3c", marginTop: 48 }}>dabete.github.io</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 40, lineHeight: 1.15 }}>
          {CAT.map(catLine)}
        </div>
      </div>
    ),
    size,
  );
}
