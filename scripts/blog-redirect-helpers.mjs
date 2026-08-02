import blogArticles from "../src/data/blog-articles.json" with { type: "json" };
import blogReviewMap from "../src/data/blog-review-product-map.json" with { type: "json" };
import blogUrlMigrations from "../src/data/blog-url-migrations.json" with { type: "json" };

function blogSlugForProduct(productId) {
  const candidates = Object.entries(blogReviewMap)
    .filter(([, id]) => id === productId)
    .map(([slug]) => slug);
  if (!candidates.length) return undefined;

  return candidates
    .map((slug) => {
      const article = blogArticles.find((entry) => entry.slug === slug);
      let score = 0;
      if (slug.includes("review") || slug.includes("deep-dive")) score += 2;
      if (article && article.sections.length >= 3) score += 1;
      if (slug.includes("-vs-") || slug.includes("-play-")) score -= 2;
      if (slug.endsWith("-review") && !slug.includes("-vs-")) score += 1;
      return {
        slug,
        score,
        sections: article?.sections.length ?? 0,
        updatedAt: article?.updatedAt ?? "",
      };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.sections !== a.sections) return b.sections - a.sections;
      return a.updatedAt < b.updatedAt ? 1 : -1;
    })[0]?.slug;
}

function reviewPath(productId) {
  const slug = blogSlugForProduct(productId);
  if (slug) return `/review/${slug}/`;
  return `/review/${productId}/`;
}

function dedupeRedirects(entries) {
  const bySource = new Map();
  for (const entry of entries) {
    bySource.set(entry.source, entry.destination);
  }
  return Array.from(bySource, ([source, destination]) => ({
    source,
    destination,
  }));
}

export function blogRedirectsForStaticExport() {
  const entries = [
    { source: "/blog/", destination: "/review/" },
    { source: "/comparisons/", destination: "/review/" },
    { source: "/blogs/", destination: "/review/" },
  ];

  for (const entry of blogUrlMigrations.migrations) {
    const destination = `/review/${entry.slug}/`;
    entries.push({
      source: `/blog/${entry.slug}/`,
      destination,
    });

    if (entry.destination !== destination) {
      const productMatch = entry.destination.match(/^\/review\/([^/]+)\/$/);
      entries.push({
        source: entry.destination,
        destination: productMatch ? reviewPath(productMatch[1]) : destination,
      });
    }
  }

  // Articles retired in favour of another article — see BlogRetiredRedirect in
  // src/lib/blog-migrations.ts. Pushed last so they override anything the loop
  // above derived for the same source.
  for (const entry of blogUrlMigrations.retiredRedirects ?? []) {
    entries.push(entry);
  }

  return dedupeRedirects(entries);
}
