"use client";

import { useEffect } from "react";
import { reportError } from "@/lib/report-error";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportError({
      error,
      scope: "global",
      pathname:
        typeof window !== "undefined" ? window.location.pathname : undefined,
    });
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          margin: 0,
          padding: "4rem 1.5rem",
          background: "#fafaf9",
          color: "#1c1917",
          minHeight: "100vh",
        }}
      >
        <main style={{ maxWidth: 640, margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#78716c",
              margin: 0,
            }}
          >
            IntoBadminton
          </p>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              marginTop: "0.75rem",
              marginBottom: "1rem",
              lineHeight: 1.15,
            }}
          >
            The site hit an unexpected error
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.6,
              color: "#44403c",
              margin: 0,
            }}
          >
            The page layout itself failed to render. Refreshing usually fixes
            it. If it keeps happening, please email{" "}
            <a
              href="mailto:support@intobadminton.com"
              style={{ color: "#0f766e" }}
            >
              support@intobadminton.com
            </a>{" "}
            with the reference below.
          </p>
          {error.digest ? (
            <p
              style={{
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: "0.8rem",
                color: "#78716c",
                marginTop: "1rem",
              }}
            >
              Reference: {error.digest}
            </p>
          ) : null}
          <div style={{ marginTop: "2rem", display: "flex", gap: "0.75rem" }}>
            <button
              type="button"
              onClick={() => reset()}
              style={{
                background: "#0f766e",
                color: "white",
                border: "none",
                borderRadius: "9999px",
                padding: "0.625rem 1.25rem",
                fontWeight: 600,
                fontSize: "0.95rem",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            {/* Plain anchor (not next/link) on purpose: when the root
                layout itself crashes, falling back to a hard navigation
                avoids re-mounting the same broken React tree. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                background: "transparent",
                color: "#1c1917",
                border: "1px solid #d6d3d1",
                borderRadius: "9999px",
                padding: "0.625rem 1.25rem",
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
              }}
            >
              Go home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
