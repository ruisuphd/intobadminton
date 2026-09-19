import { test, expect } from "@playwright/test";
import blogSlugsList from "../scripts/blog-slugs-list.json";

/** Published review slugs — only original editorials since Sept 2026. */
const PUBLISHED = new Set<string>(blogSlugsList);

/** Review hrefs a page may link to: the hub or a published article. */
function isPublishedReviewHref(href: string): boolean {
  if (href === "/review/") return true;
  const slug = href.replace(/^\/review\//, "").replace(/\/$/, "");
  return PUBLISHED.has(slug);
}

test.describe("review blog style", () => {
  test("original editorial shows blog prose only", async ({ page }) => {
    await page.goto("/review/how-to-choose-a-badminton-racket/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /choose a badminton racket/i
    );
    await expect(page.getByRole("heading", { name: /specs|specifications/i })).toHaveCount(0);
    await expect(page.getByText("Spec verified against manufacturer page")).toHaveCount(0);
  });

  test("legacy blog URL redirects to review page", async ({ page }) => {
    await page.goto("/blog/li-ning-thunder-100-gen-2-vs-gen-1/");
    await expect(page).toHaveURL(
      /\/review\/li-ning-thunder-100-gen-2-vs-gen-1\/?$/
    );
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /AxForce 100/i
    );
  });

  test("legacy comparisons URL redirects to review page", async ({ page }) => {
    await page.goto("/comparisons/racket-balance-vs-swing-speed/");
    await expect(page).toHaveURL(/\/review\/racket-balance-vs-swing-speed\/?$/);
  });

  test("legacy product review URL redirects to blog-style review page", async ({
    page,
  }) => {
    await page.goto("/review/vic-drivex-12/", { waitUntil: "domcontentloaded" });
    await page.waitForURL(/\/review\/victor-drivex-12-vs-astrox-88d-pro\/?$/, {
      timeout: 15_000,
    });
  });

  test("legacy blogs hub redirects to review hub", async ({ page }) => {
    await page.goto("/blogs/");
    await expect(page).toHaveURL(/\/review\/?$/);
  });

  test("review hub lists posts in blog style", async ({ page }) => {
    await page.goto("/review/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Reviews"
    );
    await expect(page.getByRole("link").first()).toBeVisible();
    await expect(page.getByText(/court notes/i)).toHaveCount(0);
  });

  for (const path of [
    "/review/yonex-nanoflare-1000z-review/",
    "/review/yonex-comfort-z3-shoes-review/",
    "/review/anta-ah600w-racket-review/",
    "/review/yy-nanoflare-1000z/",
    "/blog/yonex-nanoflare-1000z-review/",
  ]) {
    test(`removed translated review ${path} returns 404`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(404);
    });
  }

  test("header has Reviews nav link only (no Comparisons)", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("navigation").getByRole("link", { name: "Reviews" })
    ).toBeVisible();
    await expect(
      page.getByRole("navigation").getByRole("link", { name: "Comparisons" })
    ).toHaveCount(0);
  });

  for (const path of [
    "/",
    "/brands/yonex/",
    "/brands/bonny/",
    "/brands/kumpoo/",
    "/best/shoes/",
    "/compare-guides/astrox-99-pro-vs-astrox-100zz/",
  ]) {
    test(`${path} links only to published reviews`, async ({ page }) => {
      await page.goto(path);
      const hrefs = await page
        .locator('a[href^="/review/"]')
        .evaluateAll((links) => links.map((a) => a.getAttribute("href") ?? ""));
      const dead = hrefs.filter((href) => !isPublishedReviewHref(href));
      expect(dead).toEqual([]);
    });
  }

  test("best shoes page shows no review links for unreviewed picks", async ({
    page,
  }) => {
    await page.goto("/best/shoes/");
    await expect(
      page
        .locator("#power-cushion-comfort-z3")
        .getByRole("link", { name: "Read full review →" })
    ).toHaveCount(0);
  });

  test("intermediate rackets page links DriveX 12 to its original review", async ({
    page,
  }) => {
    await page.goto("/best/intermediate-rackets/");
    await expect(
      page
        .locator("#drivex-12")
        .getByRole("link", { name: "Read full review →" })
    ).toHaveAttribute("href", "/review/victor-drivex-12-vs-astrox-88d-pro/");
  });

  for (const anchor of ["bg65", "exbolt-63", "bg80", "aerobite", "bg80-power"]) {
    test(`strings page links ${anchor} to string-selector guide`, async ({
      page,
    }) => {
      await page.goto("/best/strings/");
      await expect(
        page
          .locator(`#${anchor}`)
          .getByRole("link", { name: "Read string guide →" })
      ).toHaveAttribute("href", "/review/badminton-string-selector/");
    });
  }

  test("strings page shows no review link for Li-Ning L69", async ({ page }) => {
    await page.goto("/best/strings/");
    await expect(
      page.locator("#l69").getByRole("link", { name: "Read full review →" })
    ).toHaveCount(0);
  });
});
