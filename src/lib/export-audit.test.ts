import { describe, expect, it } from "vitest";
import { auditExportSnapshot } from "@/lib/export-audit";
import { legacyRedirects } from "@/lib/legacy-redirects";

function html({
  title = "Example | IntoBadminton",
  body = "",
  robots,
}: {
  title?: string;
  body?: string;
  robots?: string;
} = {}) {
  return `<!doctype html><html><head><title>${title}</title>${
    robots ? `<meta name="robots" content="${robots}">` : ""
  }</head><body><a href="/ok/">OK</a>${body}</body></html>`;
}

describe("auditExportSnapshot", () => {
  it("permits Review nodes with itemReviewed: Thing for head-to-head articles", () => {
    // Relaxed in PR #35: blog reviews that compare multiple products
    // legitimately use itemReviewed: Thing to avoid overclaiming a single
    // Product subject. Rich-result eligibility is reduced but not invalid.
    const issues = auditExportSnapshot({
      files: [
        {
          path: "blog/example/index.html",
          html: html({
            body: `<script type="application/ld+json">${JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Review",
              itemReviewed: { "@type": "Thing", name: "Example" },
            })}</script>`,
          }),
        },
      ],
      sitemapUrls: ["https://example.com/blog/example/"],
      legacyRedirects: [],
    });

    expect(issues).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({ code: "invalid-review-item-reviewed" }),
      ])
    );
  });

  it("permits JSON-LD on noindex pages", () => {
    // Relaxed in PR #35: noindex tells Google not to index the URL or its
    // rich results, so emitting JSON-LD on /results/ is wasted but not
    // harmful — and keeps schema shape consistent with /best/* for QA.
    const issues = auditExportSnapshot({
      files: [
        {
          path: "results/index.html",
          html: html({
            robots: "noindex, follow",
            body: `<script type="application/ld+json">{"@type":"ItemList"}</script>`,
          }),
        },
      ],
      sitemapUrls: [],
      legacyRedirects: [],
    });

    expect(issues).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({ code: "json-ld-on-noindex-page" }),
      ])
    );
  });

  it("permits Review and aggregateRating on /best/ list pages when authentic", () => {
    // Relaxed in PR #35: src/lib/editorial-rating.ts enforces authenticity
    // at source (suppresses aggregate when fewer than 2 review sources back
    // the score), so Google's authenticity guidance is satisfied.
    const issues = auditExportSnapshot({
      files: [
        {
          path: "best/example/index.html",
          html: html({
            body: `<script type="application/ld+json">${JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Example",
              author: { "@type": "Person", name: "Rui Su" },
              datePublished: "2026-05-08",
              publisher: {
                "@type": "Organization",
                name: "IntoBadminton",
                logo: {
                  "@type": "ImageObject",
                  url: "https://intobadminton.com/intobadminton-og.jpg",
                },
              },
            })}</script><script type="application/ld+json">${JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  item: {
                    "@type": "Product",
                    name: "X",
                    review: { "@type": "Review" },
                    aggregateRating: { "@type": "AggregateRating" },
                  },
                },
              ],
            })}</script>`,
          }),
        },
      ],
      sitemapUrls: ["https://example.com/best/example/"],
      legacyRedirects: [],
    });

    expect(issues).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({ code: "rating-markup-on-list-page" }),
      ])
    );
  });

  it("flags sitemap URLs without exported HTML and legacy URLs in the sitemap", () => {
    const issues = auditExportSnapshot({
      files: [{ path: "ok/index.html", html: html() }],
      sitemapUrls: [
        "https://example.com/ok/",
        "https://example.com/missing/",
        "https://example.com/en/",
      ],
      legacyRedirects,
    });

    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "sitemap-target-missing" }),
        expect.objectContaining({ code: "legacy-url-in-sitemap" }),
      ])
    );
  });

  it("flags duplicate branded titles and inherited 404 canonicals", () => {
    const issues = auditExportSnapshot({
      files: [
        {
          path: "404.html",
          html: html({
            title: "Page not found | IntoBadminton | IntoBadminton",
            body: `<link rel="canonical" href="https://example.com/">`,
          }),
        },
      ],
      sitemapUrls: [],
      legacyRedirects: [],
    });

    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "duplicate-title-brand" }),
        expect.objectContaining({ code: "bad-404-canonical" }),
      ])
    );
  });

  it("flags missing Article schema on best, brand, and compare-guide pages", () => {
    const issues = auditExportSnapshot({
      files: [
        {
          path: "best/beginner-rackets/index.html",
          html: html({
            body: `<script type="application/ld+json">${JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: [],
            })}</script>`,
          }),
        },
      ],
      sitemapUrls: [],
      legacyRedirects: [],
    });

    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "missing-article-schema",
          path: "best/beginner-rackets/index.html",
        }),
      ])
    );
  });

  it("accepts Article JSON-LD with author, datePublished, and self-contained publisher", () => {
    const issues = auditExportSnapshot({
      files: [
        {
          path: "best/beginner-rackets/index.html",
          html: html({
            body: `<script type="application/ld+json">${JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Best beginner rackets",
              author: { "@type": "Person", name: "Rui Su" },
              datePublished: "2026-05-08",
              publisher: {
                "@type": "Organization",
                name: "IntoBadminton",
                logo: {
                  "@type": "ImageObject",
                  url: "https://intobadminton.com/intobadminton-og.jpg",
                },
              },
            })}</script>`,
          }),
        },
      ],
      sitemapUrls: [],
      legacyRedirects: [],
    });

    expect(issues).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({ code: "missing-article-schema" }),
      ])
    );
  });

  it("rejects Article JSON-LD whose publisher is just an @id reference", () => {
    const issues = auditExportSnapshot({
      files: [
        {
          path: "best/beginner-rackets/index.html",
          html: html({
            body: `<script type="application/ld+json">${JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Best beginner rackets",
              author: { "@type": "Person", name: "Rui Su" },
              datePublished: "2026-05-08",
              publisher: { "@id": "https://example.com/#organization" },
            })}</script>`,
          }),
        },
      ],
      sitemapUrls: [],
      legacyRedirects: [],
    });

    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "missing-article-schema" }),
      ])
    );
  });

  it("rejects Article JSON-LD whose publisher has no logo", () => {
    const issues = auditExportSnapshot({
      files: [
        {
          path: "best/beginner-rackets/index.html",
          html: html({
            body: `<script type="application/ld+json">${JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Best beginner rackets",
              author: { "@type": "Person", name: "Rui Su" },
              datePublished: "2026-05-08",
              publisher: {
                "@type": "Organization",
                name: "IntoBadminton",
              },
            })}</script>`,
          }),
        },
      ],
      sitemapUrls: [],
      legacyRedirects: [],
    });

    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "missing-article-schema" }),
      ])
    );
  });

  it("does not require Article schema on noindex pages or section indices", () => {
    const issues = auditExportSnapshot({
      files: [
        // /best/ index page (depth 1, not matched by /best/SLUG/)
        { path: "best/index.html", html: html() },
        // noindex page in /best/ tree
        {
          path: "best/private-draft/index.html",
          html: html({ robots: "noindex, follow" }),
        },
      ],
      sitemapUrls: [],
      legacyRedirects: [],
    });

    expect(issues).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({ code: "missing-article-schema" }),
      ])
    );
  });

  it("flags sponsored links rendered without an affiliate disclosure", () => {
    const issues = auditExportSnapshot({
      files: [
        {
          path: "best/example/index.html",
          html: `<!doctype html><html><head><title>Example | IntoBadminton</title></head><body><script type="application/ld+json">${JSON.stringify(
            {
              "@context": "https://schema.org",
              "@type": "Article",
              author: { "@type": "Person", name: "Rui Su" },
              datePublished: "2026-05-08",
            }
          )}</script><a href="https://www.amazon.com/dp/B0XXXX?tag=intobad-20" rel="sponsored nofollow noopener">Buy</a></body></html>`,
        },
      ],
      sitemapUrls: [],
      legacyRedirects: [],
    });

    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "missing-affiliate-disclosure" }),
      ])
    );
  });

  it("flags exported routes that are missing from the sitemap", () => {
    const issues = auditExportSnapshot({
      files: [
        {
          path: "guides/new-orphan-guide/index.html",
          html: html(),
        },
      ],
      sitemapUrls: ["https://example.com/blog/"],
      legacyRedirects: [],
    });

    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "exported-route-missing-from-sitemap",
          path: "guides/new-orphan-guide/index.html",
        }),
      ])
    );
  });

  it("does not flag exempt routes, noindex pages, or meta-refresh redirects", () => {
    const issues = auditExportSnapshot({
      files: [
        // /quiz/ is on the exempt list
        { path: "quiz/index.html", html: html() },
        // noindex utility route
        {
          path: "internal-tool/index.html",
          html: html({ robots: "noindex, follow" }),
        },
        // meta-refresh redirect page (legacy alias)
        {
          path: "old-path/index.html",
          html: `<!doctype html><html><head><meta http-equiv="refresh" content="0; url=/new-path/"></head><body></body></html>`,
        },
      ],
      sitemapUrls: [],
      legacyRedirects: [],
    });

    expect(issues).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({
          code: "exported-route-missing-from-sitemap",
        }),
      ])
    );
  });

  it("accepts sponsored links when the disclosure marker is present", () => {
    const issues = auditExportSnapshot({
      files: [
        {
          path: "best/example/index.html",
          html: `<!doctype html><html><head><title>Example | IntoBadminton</title></head><body><script type="application/ld+json">${JSON.stringify(
            {
              "@context": "https://schema.org",
              "@type": "Article",
              author: { "@type": "Person", name: "Rui Su" },
              datePublished: "2026-05-08",
            }
          )}</script><a href="https://www.amazon.com/dp/B0XXXX?tag=intobad-20" rel="sponsored nofollow noopener">Buy</a><p data-affiliate-disclosure="footer">Affiliate disclosure ...</p></body></html>`,
        },
      ],
      sitemapUrls: [],
      legacyRedirects: [],
    });

    expect(issues).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({ code: "missing-affiliate-disclosure" }),
      ])
    );
  });
});
