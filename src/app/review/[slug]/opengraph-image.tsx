import { ImageResponse } from "next/og";
import { reviewProductById, reviewSlugs } from "@/lib/review-pages";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "IntoBadminton — badminton equipment review";

export function generateStaticParams() {
  return reviewSlugs().map((slug) => ({ slug }));
}

const CATEGORY_TINT: Record<string, string> = {
  racket: "#7a3b14",
  shoes: "#1f513d",
  string: "#2c4377",
  bag: "#5b3a8a",
  shuttle: "#a85a1e",
  grip: "#5c6470",
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = reviewProductById(slug);
  const heading = product
    ? `${product.brand} ${product.name}`
    : "IntoBadminton — review";
  const dek = product?.editorNote
    ? product.editorNote.slice(0, 220)
    : "Verified specs, source authority, and on-court behaviour.";
  const tint = product ? CATEGORY_TINT[product.category] ?? "#0f1115" : "#0f1115";

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
        <div style={{ width: 24, height: "100%", background: tint }} />
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
            <span style={{ color: "#5c6470" }}>Review</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              maxWidth: 980,
            }}
          >
            <div
              style={{
                fontSize: heading.length > 40 ? 64 : 76,
                lineHeight: 1.05,
                color: "#0f1115",
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              {heading}
            </div>
            <div
              style={{
                fontSize: 26,
                lineHeight: 1.4,
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
            {product ? (
              <span>Verified {product.lastVerifiedAt}</span>
            ) : (
              <span />
            )}
          </div>
        </div>
      </div>
    ),
    size
  );
}
