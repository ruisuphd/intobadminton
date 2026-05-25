import blogUrlMigrations from "@/data/blog-url-migrations.json";
import type { BlogSlug } from "@/lib/blog";

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
  const migration = migrationBySlug.get(slug);
  if (migration) return migration.destination;
  return `/comparisons/${slug}/`;
}

export function blogRedirects(): { source: string; destination: string }[] {
  const entries: { source: string; destination: string }[] = [
    { source: "/blog/", destination: "/comparisons/" },
  ];
  for (const entry of migrations) {
    entries.push({
      source: `/blog/${entry.slug}/`,
      destination: entry.destination,
    });
  }
  return entries;
}
