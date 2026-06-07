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
    await page.goto("/review/yy-nanoflare-1000z/", { waitUntil: "domcontentloaded" });
    await page.waitForURL(/\/review\/yonex-nanoflare-1000z-review\/?$/, {
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

  test("best shoes page links ranked picks to editorial reviews", async ({
    page,
  }) => {
    await page.goto("/best/shoes/");
    await expect(
      page
        .locator("#power-cushion-65-z-wide")
        .getByRole("link", { name: "Read full review →" })
    ).toHaveAttribute("href", "/review/yonex-65z4-shoes-review/");
    await expect(
      page
        .locator("#power-cushion-aerus-z2")
        .getByRole("link", { name: "Read full review →" })
    ).toHaveAttribute("href", "/review/yonex-eclipsion-z3-shoes-review/");
    await expect(
      page
        .locator("#power-cushion-comfort-z3")
        .getByRole("link", { name: "Read full review →" })
    ).toHaveAttribute("href", "/review/yonex-comfort-z3-shoes-review/");
  });

  test("beginner rackets page links DriveX 8S to DriveX 10 editorial review", async ({
    page,
  }) => {
    await page.goto("/best/beginner-rackets/");
    await expect(
      page
        .locator("#drivex-8s")
        .getByRole("link", { name: "Read full review →" })
    ).toHaveAttribute("href", "/review/victor-drivex-10-review/");
  });

  test("head-heavy-under-150 page links Astrox 100 Game to Nextage review", async ({
    page,
  }) => {
    await page.goto("/best/head-heavy-rackets-under-150/");
    await expect(
      page
        .locator("#astrox-100-game")
        .getByRole("link", { name: "Read full review →" })
    ).toHaveAttribute("href", "/review/yonex-astrox-nextage-review/");
  });

  test("all-round rackets page links Brave Sword 12 to Jetspeed 12 review", async ({
    page,
  }) => {
    await page.goto("/best/all-round-rackets/");
    await expect(
      page
        .locator("#brave-sword-12")
        .getByRole("link", { name: "Read full review →" })
    ).toHaveAttribute("href", "/review/victor-jetspeed-12-curious-review/");
  });

  test("smash-heavy rackets page links Auraspeed 100X SE to 90K II review", async ({
    page,
  }) => {
    await page.goto("/best/smash-heavy-rackets/");
    await expect(
      page
        .locator('[id="auraspeed-100x-se-(mohammad-ahsan)"]')
        .getByRole("link", { name: "Read full review →" })
    ).toHaveAttribute("href", "/review/victor-auraspeed-90k-ii-review/");
  });

  test("head-heavy-under-150 page links Voltric 8DG to Voltric Z-Force LTD review", async ({
    page,
  }) => {
    await page.goto("/best/head-heavy-rackets-under-150/");
    await expect(
      page
        .locator("#voltric-8dg")
        .getByRole("link", { name: "Read full review →" })
    ).toHaveAttribute("href", "/review/yonex-voltric-z-force-ltd-2012-review/");
  });

  test("rackets-under-100 page links Nanoray Light 70i to Nanoflare 1000 Play review", async ({
    page,
  }) => {
    await page.goto("/best/rackets-under-100/");
    await expect(
      page
        .locator("#nanoray-light-70i")
        .getByRole("link", { name: "Read full review →" })
    ).toHaveAttribute("href", "/review/yonex-nanoflare-1000z-play-review/");
  });

  test("beginner rackets page links Nanoflare 700 Play to Nanoflare 700 review", async ({
    page,
  }) => {
    await page.goto("/best/beginner-rackets/");
    await expect(
      page
        .locator("#nanoflare-700-play")
        .getByRole("link", { name: "Read full review →" })
    ).toHaveAttribute("href", "/review/yonex-nanoflare-700-review/");
  });

  test("beginner rackets page links Mizuno Altius N-Feel to Carbo Pro 823 review", async ({
    page,
  }) => {
    await page.goto("/best/beginner-rackets/");
    await expect(
      page
        .locator("#altius-n-feel")
        .getByRole("link", { name: "Read full review →" })
    ).toHaveAttribute("href", "/review/mizuno-carbo-pro-823-review/");
  });
});
