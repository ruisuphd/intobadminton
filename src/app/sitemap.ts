import type { MetadataRoute } from "next";
import { sitemapEntries } from "@/lib/sitemap";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date();
  return sitemapEntries().map((entry) => ({
    url: entry.url,
    lastModified: today,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
