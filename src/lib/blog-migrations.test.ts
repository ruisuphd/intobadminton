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
    expect(blogMigrationForSlug("li-ning-thunder-100-gen-2-vs-gen-1")).toEqual({
      slug: "li-ning-thunder-100-gen-2-vs-gen-1",
      type: "editorial",
      destination: "/comparisons/li-ning-thunder-100-gen-2-vs-gen-1/",
    });
    expect(articlePathForSlug("li-ning-thunder-100-gen-2-vs-gen-1")).toBe(
      "/review/li-ning-thunder-100-gen-2-vs-gen-1/"
    );
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
      source: "/blog/li-ning-thunder-100-gen-2-vs-gen-1/",
      destination: "/review/li-ning-thunder-100-gen-2-vs-gen-1/",
    });
    expect(redirects).toContainEqual({
      source: "/comparisons/li-ning-thunder-100-gen-2-vs-gen-1/",
      destination: "/review/li-ning-thunder-100-gen-2-vs-gen-1/",
    });
    expect(redirects).toContainEqual({
      source: "/review/vic-drivex-12/",
      destination: "/review/victor-drivex-12-vs-astrox-88d-pro/",
    });
    expect(
      redirects.filter((entry) => entry.source === "/review/vic-drivex-12/")
    ).toHaveLength(1);
  });

  it("drops redirects for the translated reviews removed in Sept 2026", () => {
    const sources = blogRedirects().map((entry) => entry.source);
    expect(sources).not.toContain("/blog/yonex-nanoflare-1000z-review/");
    expect(sources).not.toContain("/review/yy-nanoflare-1000z/");
  });

  it("splits mapped and editorial inventories", () => {
    expect(mappedProductBlogSlugs()).toEqual(["victor-drivex-12-vs-astrox-88d-pro"]);
    expect(editorialSlugs().length).toBe(12);
  });
});
