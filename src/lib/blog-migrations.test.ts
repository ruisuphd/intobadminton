import { describe, expect, it } from "vitest";
import {
  articlePathForSlug,
  blogMigrationForSlug,
  blogRedirects,
  editorialSlugs,
  mappedProductBlogSlugs,
} from "@/lib/blog-migrations";

describe("blog-migrations", () => {
  it("maps all blog slugs to review pages", () => {
    expect(blogMigrationForSlug("yonex-nanoflare-1000z-play-review")).toEqual({
      slug: "yonex-nanoflare-1000z-play-review",
      type: "editorial",
      destination: "/comparisons/yonex-nanoflare-1000z-play-review/",
    });
    expect(
      articlePathForSlug("yonex-nanoflare-1000z-play-review")
    ).toBe("/review/yonex-nanoflare-1000z-play-review/");
  });

  it("includes hub, legacy, and slug redirects", () => {
    const redirects = blogRedirects();
    expect(redirects).toContainEqual({
      source: "/blog/",
      destination: "/review/",
    });
    expect(redirects).toContainEqual({
      source: "/comparisons/",
      destination: "/review/",
    });
    expect(redirects).toContainEqual({
      source: "/blog/yonex-nanoflare-1000z-play-review/",
      destination: "/review/yonex-nanoflare-1000z-play-review/",
    });
    expect(redirects).toContainEqual({
      source: "/comparisons/yonex-nanoflare-1000z-play-review/",
      destination: "/review/yonex-nanoflare-1000z-play-review/",
    });
    expect(redirects).toContainEqual({
      source: "/review/yy-nanoflare-1000z/",
      destination: "/review/yonex-nanoflare-1000z-review/",
    });
    expect(redirects).toContainEqual({
      source: "/review/vic-jetspeed-12/",
      destination: "/review/victor-jetspeed-12-curious-review/",
    });
    expect(
      redirects.filter((entry) => entry.source === "/review/vic-jetspeed-12/")
    ).toHaveLength(1);
  });

  it("splits mapped and editorial inventories", () => {
    expect(mappedProductBlogSlugs().length).toBe(80);
    expect(editorialSlugs().length).toBe(66);
  });
});
