import { ImageResponse } from "next/og";
import { getBlogArticle } from "@/lib/blog";
import { editorialSlugs } from "@/lib/blog-migrations";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "IntoBadminton — badminton equipment comparison";

export function generateStaticParams() {
  return editorialSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getBlogArticle("en", slug);
  const title =
    article?.title ?? "IntoBadminton — badminton equipment recommendations";
  const dek =
    article?.dek ??
    "Evidence-led badminton racket, string, shoe, and bag recommendations.";
  const tint = "#1f513d";
  const label = "Comparison";
  const updatedAt = article?.updatedAt;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            width: 24,
            height: "100%",
            background: tint,
          }}
        />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 80px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 26,
              color: tint,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            <span>IntoBadminton</span>
            <span style={{ color: "#cbd1d7" }}>·</span>
            <span style={{ color: "#5c6470" }}>{label}</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 28,
              maxWidth: 980,
            }}
          >
            <div
              style={{
                fontSize: title.length > 72 ? 58 : 68,
                lineHeight: 1.1,
                color: "#0f1115",
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 28,
                lineHeight: 1.35,
                color: "#4a525c",
                maxWidth: 920,
              }}
            >
              {dek}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 22,
              color: "#5c6470",
            }}
          >
            <span>intobadminton.com</span>
            {updatedAt ? <span>Updated {updatedAt}</span> : <span />}
          </div>
        </div>
      </div>
    ),
    size
  );
}
