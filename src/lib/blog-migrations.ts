import blogUrlMigrations from "@/data/blog-url-migrations.json";
import type { BlogSlug } from "@/lib/blog";
import { reviewPath } from "@/lib/review-pages";

export type BlogMigrationType = "product" | "editorial";

export type BlogUrlMigration = {
  slug: string;
  type: BlogMigrationType;
  destination: string;
};

/**
 * A retired article URL and the live article that replaced it.
 *
 * `migrations` can only say "this slug also answers to that legacy path". It
 * cannot say "slug A was retired in favour of slug B", which is what you need
 * when two published articles turn out to describe the same product, or when
 * an article's slug named the wrong product entirely. Routing those through
 * `migrations` produces a self-redirect, because the retired path has no
 * catalogue id for reviewPath() to resolve.
 */
export type BlogRetiredRedirect = { source: string; destination: string };

const { migrations, multiBlogProducts, retiredRedirects } =
  blogUrlMigrations as {
    migrations: BlogUrlMigration[];
    multiBlogProducts: Record<string, string[]>;
    retiredRedirects?: BlogRetiredRedirect[];
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

  // Retired articles win over anything the migration loop derived for the same
  // source, so a slug that was pulled from publication cannot be redirected
  // back to its own dead URL.
  for (const entry of retiredRedirects ?? []) {
    entries.push(entry);
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
