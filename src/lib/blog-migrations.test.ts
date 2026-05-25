import { describe, expect, it } from "vitest";
import {
  articlePathForSlug,
  blogMigrationForSlug,
  blogRedirects,
  editorialSlugs,
  mappedProductBlogSlugs,
} from "@/lib/blog-migrations";

describe("blog-migrations", () => {
  it("maps comparison blog slugs to comparisons pages", () => {
    expect(blogMigrationForSlug("yonex-nanoflare-1000z-play-review")).toEqual({
      slug: "yonex-nanoflare-1000z-play-review",
      type: "editorial",
      destination: "/comparisons/yonex-nanoflare-1000z-play-review/",
    });
  });

  it("maps editorial blog slugs to comparisons pages", () => {
    expect(articlePathForSlug("racket-balance-vs-swing-speed")).toBe(
      "/comparisons/racket-balance-vs-swing-speed/"
    );
  });

  it("includes hub and slug redirects", () => {
    const redirects = blogRedirects();
    expect(redirects).toContainEqual({
      source: "/blog/",
      destination: "/comparisons/",
    });
    expect(redirects).toContainEqual({
      source: "/blog/yonex-nanoflare-1000z-play-review/",
      destination: "/comparisons/yonex-nanoflare-1000z-play-review/",
    });
  });

  it("splits mapped and editorial inventories", () => {
    expect(mappedProductBlogSlugs().length).toBe(80);
    expect(editorialSlugs().length).toBe(66);
  });
});
