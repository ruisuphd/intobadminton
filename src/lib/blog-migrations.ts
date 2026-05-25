import blogUrlMigrations from "@/data/blog-url-migrations.json";
import type { BlogSlug } from "@/lib/blog";
import { reviewPath } from "@/lib/review-pages";

export type BlogMigrationType = "product" | "editorial";

export type BlogUrlMigration = {
  slug: string;
  type: BlogMigrationType;
  destination: string;
};

const { migrations, multiBlogProducts } = blogUrlMigrations as {
  migrations: BlogUrlMigration[];
  multiBlogProducts: Record<string, string[]>;
};

const migrationBySlug = new Map(
  migrations.map((entry) => [entry.slug, entry] as const)
);

export { multiBlogProducts };

export function blogMigrationForSlug(
  slug: string
): BlogUrlMigration | undefined {
  return migrationBySlug.get(slug);
}

export function editorialSlugs(): BlogSlug[] {
  return migrations
    .filter((entry) => entry.type === "editorial")
    .map((entry) => entry.slug as BlogSlug);
}

export function mappedProductBlogSlugs(): BlogSlug[] {
  return migrations
    .filter((entry) => entry.type === "product")
    .map((entry) => entry.slug as BlogSlug);
}

export function articlePathForSlug(slug: string): string {
  return `/review/${slug}/`;
}

export function blogRedirects(): { source: string; destination: string }[] {
  const entries: { source: string; destination: string }[] = [
    { source: "/blog/", destination: "/review/" },
    { source: "/comparisons/", destination: "/review/" },
    { source: "/blogs/", destination: "/review/" },
  ];

  for (const entry of migrations) {
    const destination = `/review/${entry.slug}/`;
    entries.push({
      source: `/blog/${entry.slug}/`,
      destination,
    });
    if (entry.destination !== destination) {
      const productMatch = entry.destination.match(/^\/review\/([^/]+)\/$/);
      const legacyDestination = productMatch
        ? reviewPath(productMatch[1])
        : destination;
      entries.push({
        source: entry.destination,
        destination: legacyDestination,
      });
    }
  }

  return dedupeRedirects(entries);
}

function dedupeRedirects(
  entries: { source: string; destination: string }[]
): { source: string; destination: string }[] {
  const bySource = new Map<string, string>();
  for (const entry of entries) {
    bySource.set(entry.source, entry.destination);
  }
  return Array.from(bySource, ([source, destination]) => ({
    source,
    destination,
  }));
}
