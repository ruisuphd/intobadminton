import { test, expect } from "@playwright/test";

test.describe("review consolidation", () => {
  test("Nanoflare 1000Z review shows specs, merged prose, and founder note", async ({
    page,
  }) => {
    await page.goto("/review/yy-nanoflare-1000z/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Nanoflare 1000 Z review"
    );
    await expect(
      page.getByRole("heading", { level: 2, name: "Specifications" })
    ).toBeVisible();
    await expect(page.getByText("★")).toHaveCount(0);
    await expect(page.getByText("Spec verified against manufacturer page")).toHaveCount(0);
    await expect(page.getByText("Founder current doubles racket")).toBeVisible();
    await expect(page.getByText("Nanoflare lineage context")).toBeVisible();
  });

  test("legacy 1000Z vs Play blog URL redirects to comparisons page", async ({
    page,
  }) => {
    await page.goto("/blog/yonex-nanoflare-1000z-play-review/");
    await expect(page).toHaveURL(
      /\/comparisons\/yonex-nanoflare-1000z-play-review\/?$/
    );
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "1000 Z vs 1000 Play"
    );
  });

  test("legacy editorial blog URL redirects to comparisons page", async ({
    page,
  }) => {
    await page.goto("/blog/racket-balance-vs-swing-speed/");
    await expect(page).toHaveURL(/\/comparisons\/racket-balance-vs-swing-speed\/?$/);
  });

  test("review hub lists shuttles and links to AS-50 review", async ({
    page,
  }) => {
    await page.goto("/review/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Badminton equipment reviews"
    );
    await expect(
      page.getByText(/\d+ rackets · \d+ shoes · \d+ shuttles/)
    ).toBeVisible();
    await page.getByRole("link", { name: /Aerosensa 50/i }).click();
    await expect(page).toHaveURL(/\/review\/yy-as-50\/?$/);
  });

  test("Comfort Z3 shoe review renders merged prose", async ({ page }) => {
    await page.goto("/review/yy-comfort-z3/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /Comfort Z3/i
    );
    await expect(
      page.getByRole("heading", { level: 2, name: "Specifications" })
    ).toBeVisible();
  });

  test("header includes Comparisons nav link", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("navigation").getByRole("link", { name: "Comparisons" })
    ).toBeVisible();
  });

  test("Yonex brand page links to Comfort Z3 and AS-50 reviews", async ({
    page,
  }) => {
    await page.goto("/brands/yonex/");
    await expect(
      page.getByRole("link", { name: /Comfort Z3 shoe review/i })
    ).toHaveAttribute("href", "/review/yy-comfort-z3/");
    await expect(
      page.getByRole("link", { name: /Aerosensa 50 shuttle review/i })
    ).toHaveAttribute("href", "/review/yy-as-50/");
  });

  test("Li-Ning brand page links to Halbertec 7000 review", async ({ page }) => {
    await page.goto("/brands/li-ning/");
    await expect(
      page.getByRole("link", { name: /Halbertec 7000 review/i })
    ).toHaveAttribute("href", "/review/ln-halbertec-7000/");
  });

  test("best shoes page links Comfort Z3 pick to full review", async ({
    page,
  }) => {
    await page.goto("/best/shoes/");
    await expect(
      page.getByRole("link", { name: "Read full review with specs →" }).first()
    ).toHaveAttribute("href", "/review/yy-comfort-z3/");
  });
});
