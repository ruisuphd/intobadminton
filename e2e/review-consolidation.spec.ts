import { test, expect } from "@playwright/test";

test.describe("review blog style", () => {
  test("Nanoflare 1000Z review shows blog prose only", async ({ page }) => {
    await page.goto("/review/yonex-nanoflare-1000z-review/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /Nanoflare 1000/i
    );
    await expect(page.getByRole("heading", { name: /specs|specifications/i })).toHaveCount(0);
    await expect(page.getByText("Spec verified against manufacturer page")).toHaveCount(0);
  });

  test("legacy blog URL redirects to review page", async ({ page }) => {
    await page.goto("/blog/yonex-nanoflare-1000z-play-review/");
    await expect(page).toHaveURL(
      /\/review\/yonex-nanoflare-1000z-play-review\/?$/
    );
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /1000/i
    );
  });

  test("legacy comparisons URL redirects to review page", async ({ page }) => {
    await page.goto("/comparisons/racket-balance-vs-swing-speed/");
    await expect(page).toHaveURL(/\/review\/racket-balance-vs-swing-speed\/?$/);
  });

  test("legacy product review URL redirects to blog-style review page", async ({
    page,
  }) => {
    await page.goto("/review/yy-nanoflare-1000z/");
    // Legacy product-id stub redirects via blog-url-migrations (see out/review/yy-nanoflare-1000z/).
    await expect(page).toHaveURL(/\/review\/yonex-nanoflare-1000z-play-review\/?$/);
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
  });

  test("Comfort Z3 shoe review renders blog prose", async ({ page }) => {
    await page.goto("/review/yonex-comfort-z3-shoes-review/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /Comfort Z3/i
    );
    await expect(page.getByRole("heading", { name: /specs|specifications/i })).toHaveCount(0);
  });

  test("header has Reviews nav link only (no Comparisons)", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("navigation").getByRole("link", { name: "Reviews" })
    ).toBeVisible();
    await expect(
      page.getByRole("navigation").getByRole("link", { name: "Comparisons" })
    ).toHaveCount(0);
  });

  test("Yonex brand page links to blog-style review URLs", async ({ page }) => {
    await page.goto("/brands/yonex/");
    await expect(
      page.getByRole("link", { name: /Comfort Z3 shoe review/i })
    ).toHaveAttribute("href", "/review/yonex-comfort-z3-shoes-review/");
    await expect(
      page.getByRole("link", { name: /Aerosensa 50 shuttle review/i })
    ).toHaveAttribute("href", "/review/yonex-aerosensa-50-shuttle-review/");
  });

  test("best shoes page links Comfort Z3 pick to full review", async ({
    page,
  }) => {
    await page.goto("/best/shoes/");
    await expect(
      page.getByRole("link", { name: "Read full review →" }).first()
    ).toHaveAttribute("href", "/review/yonex-comfort-z3-shoes-review/");
  });
});
