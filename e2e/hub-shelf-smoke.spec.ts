import { expect, test } from "@playwright/test";

test("compare-guides hub shows Keep reading shelf", async ({ page }) => {
  await page.goto("/compare-guides/");

  await expect(
    page.getByRole("heading", { name: /badminton comparison guides/i })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: /keep reading/i })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /best-of buying guides/i }).first()
  ).toBeVisible();
});

test("compare-guides hub links to full catalog browse", async ({ page }) => {
  await page.goto("/compare-guides/");

  const catalogLink = page.getByRole("link", { name: /browse full catalog/i });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/");
});

test("product compare guide links to filtered catalog browse", async ({
  page,
}) => {
  await page.goto("/compare-guides/astrox-99-pro-vs-astrox-100zz/");

  const catalogLink = page.getByRole("link", {
    name: /browse matching catalog/i,
  });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute(
    "href",
    "/catalog/?cat=racket&brand=Yonex"
  );
});

test("concept compare guide links to filtered catalog browse", async ({
  page,
}) => {
  await page.goto("/compare-guides/yonex-astrox-vs-nanoflare/");

  const catalogLink = page.getByRole("link", {
    name: /browse yonex in catalog/i,
  });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute(
    "href",
    "/catalog/?cat=racket&brand=Yonex"
  );
});

test("guides hub links to full catalog browse", async ({ page }) => {
  await page.goto("/guides/");

  const catalogLink = page.getByRole("link", { name: /browse full catalog/i });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/");
});

test("tools hub links to full catalog browse", async ({ page }) => {
  await page.goto("/tools/");

  const catalogLink = page.getByRole("link", { name: /browse full catalog/i });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/");
});

test("review hub links to full catalog browse", async ({ page }) => {
  await page.goto("/review/");

  const catalogLink = page.getByRole("link", { name: /browse full catalog/i });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/");
});

test("brands hub links to full catalog browse", async ({ page }) => {
  await page.goto("/brands/");

  const catalogLink = page.getByRole("link", { name: /browse full catalog/i });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/");
});

test("procedural guide links to filtered catalog browse", async ({ page }) => {
  await page.goto("/guides/string-tension/");

  const catalogLink = page.getByRole("link", {
    name: /browse strings in catalog/i,
  });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/?cat=string");
});

test("wide-feet shoes guide links to filtered catalog browse", async ({
  page,
}) => {
  await page.goto("/guides/wide-feet-badminton-shoes/");

  const catalogLink = page.getByRole("link", {
    name: /browse shoes in catalog/i,
  });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/?cat=shoes");
});

test("string tension calculator links to filtered catalog browse", async ({
  page,
}) => {
  await page.goto("/tools/string-tension-calculator/");

  const catalogLink = page.getByRole("link", {
    name: /browse strings in catalog/i,
  });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/?cat=string");
});

test("guides hub shows Keep reading shelf", async ({ page }) => {
  await page.goto("/guides/");

  await expect(page.getByRole("heading", { name: /keep reading/i })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /string tension guide/i }).first()
  ).toBeVisible();
});

test("search page shows Keep reading shelf", async ({ page }) => {
  await page.goto("/search/");

  await expect(page.getByRole("heading", { name: /^search$/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /keep reading/i })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /compare products/i }).first()
  ).toBeVisible();
});

test("saved shelf shows Keep reading when empty", async ({ page }) => {
  await page.goto("/saved/");

  await expect(
    page.getByRole("heading", { name: /your saved shelf/i })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: /keep reading/i })).toBeVisible();
});

test("review index shows Keep reading shelf", async ({ page }) => {
  await page.goto("/review/");

  await expect(page.getByRole("heading", { name: /^reviews$/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /keep reading/i })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /best-of buying guides/i }).first()
  ).toBeVisible();
});

test("faq page links to full catalog browse", async ({ page }) => {
  await page.goto("/faq/");

  const catalogLink = page.getByRole("link", { name: /browse full catalog/i });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/");
});

test("mapped review article links to filtered catalog browse", async ({
  page,
}) => {
  await page.goto("/review/yonex-arcsaber-7-pro-review/");

  const catalogLink = page.getByRole("link", {
    name: /browse yonex in catalog/i,
  });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute(
    "href",
    "/catalog/?cat=racket&brand=Yonex"
  );
});

test("quiz results link to profile-filtered catalog browse", async ({
  page,
}) => {
  await page.goto(
    "/results/?level=club&disc=doubles&styles=offensive&cat=racket&budget=120&weight=75&foot=normal&tension=26&n=8"
  );

  const catalogLink = page.getByRole("link", {
    name: /browse matching catalog/i,
  });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute(
    "href",
    "/catalog/?cat=racket&balance=head_heavy&price=under150&sort=fit-desc"
  );
});

test("search page links to full catalog browse", async ({ page }) => {
  await page.goto("/search/");

  const catalogLink = page.getByRole("link", { name: /browse full catalog/i });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/");
});

test("glossary page links to racket-filtered catalog browse", async ({ page }) => {
  await page.goto("/guides/glossary/");

  const catalogLink = page.getByRole("link", { name: /browse full catalog/i });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/?cat=racket");
});

test("about page links to full catalog browse", async ({ page }) => {
  await page.goto("/about/");

  const catalogLink = page.getByRole("link", { name: /browse full catalog/i });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/");
});

test("sources page links to full catalog browse", async ({ page }) => {
  await page.goto("/sources/");

  const catalogLink = page.getByRole("link", { name: /browse full catalog/i });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/");
});

test("quiz page links to full catalog browse", async ({ page }) => {
  await page.goto("/quiz/");

  const catalogLink = page.getByRole("link", { name: /browse full catalog/i });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/");
});

test("methodology page links to full catalog browse", async ({ page }) => {
  await page.goto("/methodology/");

  const catalogLink = page.getByRole("link", { name: /browse full catalog/i });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/");
});

test("data page links to full catalog browse", async ({ page }) => {
  await page.goto("/data/");

  const catalogLink = page.getByRole("link", { name: /browse full catalog/i });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/");
});

test("updates page links to full catalog browse", async ({ page }) => {
  await page.goto("/updates/");

  const catalogLink = page.getByRole("link", { name: /browse full catalog/i });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/");
});

test("contact page links to full catalog browse", async ({ page }) => {
  await page.goto("/contact/");

  const catalogLink = page.getByRole("link", { name: /browse full catalog/i });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/");
});

test("research page links to full catalog browse", async ({ page }) => {
  await page.goto("/research/");

  const catalogLink = page.getByRole("link", { name: /browse full catalog/i });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/");
});

test("homepage links to full catalog browse", async ({ page }) => {
  await page.goto("/");

  const catalogLink = page.getByRole("link", { name: /browse full catalog/i });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/");
});

test("privacy page links to full catalog browse", async ({ page }) => {
  await page.goto("/privacy/");

  const catalogLink = page.getByRole("link", { name: /browse full catalog/i });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/");
});

test("terms page links to full catalog browse", async ({ page }) => {
  await page.goto("/terms/");

  const catalogLink = page.getByRole("link", { name: /browse full catalog/i });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/");
});

test("cookies page links to full catalog browse", async ({ page }) => {
  await page.goto("/cookies/");

  const catalogLink = page.getByRole("link", { name: /browse full catalog/i });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/");
});

test("security page links to full catalog browse", async ({ page }) => {
  await page.goto("/security/");

  const catalogLink = page.getByRole("link", { name: /browse full catalog/i });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/");
});

test("privacy-choices page links to full catalog browse", async ({ page }) => {
  await page.goto("/privacy-choices/");

  const catalogLink = page.getByRole("link", { name: /browse full catalog/i });
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toHaveAttribute("href", "/catalog/");
});
