import { expect, test } from "@playwright/test";

async function ensureServiceWorker(page: import("@playwright/test").Page) {
  await page.goto("/");
  await page.evaluate(async () => {
    if (!("serviceWorker" in navigator)) return;
    await navigator.serviceWorker.register("/sw.js");
    await navigator.serviceWorker.ready;
  });
  await page.waitForFunction(
    async () => {
      const keys = await caches.keys();
      if (!keys.some((key) => key.startsWith("ib-v21"))) return false;
      const cache = await caches.open("ib-v21-static");
      return (await cache.keys()).length >= 5;
    },
    undefined,
    { timeout: 30_000 }
  );
}

test("service worker precaches search, review, and offline shells", async ({
  page,
}) => {
  await ensureServiceWorker(page);

  const cachedPaths = await page.evaluate(async () => {
    const cache = await caches.open("ib-v21-static");
    return (await cache.keys()).map((request) => {
      try {
        return new URL(request.url).pathname;
      } catch {
        return request.url;
      }
    });
  });

  for (const path of [
    "/",
    "/quiz/",
    "/catalog/",
    "/search/",
    "/saved/",
    "/compare/",
    "/updates/",
    "/review/",
    "/guides/",
    "/offline/",
    "/data/",
    "/methodology/",
    "/tools/",
    "/faq/",
    "/best/",
    "/brands/",
    "/brands/yonex/",
    "/brands/victor/",
    "/brands/li-ning/",
    "/brands/anta/",
    "/brands/bonny/",
    "/brands/kawasaki/",
    "/brands/kumpoo/",
    "/compare-guides/",
    "/compare-guides/yonex-astrox-vs-nanoflare/",
    "/guides/string-tension/",
    "/guides/wide-feet-badminton-shoes/",
    "/guides/shoes-footwork/",
    "/guides/racket-balance/",
    "/guides/badminton-shoes-vs-running-shoes/",
    "/guides/doubles-roles/",
    "/guides/equipment-authenticity/",
    "/guides/glossary/",
    "/guides/season-refresh/",
    "/tools/racket-balance-explainer/",
    "/tools/court-diagram/",
    "/tools/skill-level-converter/",
    "/tools/string-tension-calculator/",
    "/tools/authenticity-checker/",
    "/compare-guides/yonex-victor-li-ning/",
    "/compare-guides/astrox-99-pro-vs-astrox-100zz/",
    "/compare-guides/badminton-vs-tennis-shoes/",
    "/best/beginner-rackets/",
    "/best/smash-heavy-rackets/",
    "/best/strings/",
    "/best/intermediate-rackets/",
    "/best/rackets-under-100/",
    "/best/rackets-under-150/",
    "/best/rackets-under-200/",
    "/best/shoes/",
    "/contact/",
    "/research/",
    "/privacy/",
    "/terms/",
    "/cookies/",
    "/security/",
    "/privacy-choices/",
    "/about/",
    "/sources/",
    "/source-policy/",
    "/authors/",
    "/authors/rui-su/",
  ]) {
    expect(
      cachedPaths.some((entry) => entry === path || entry.startsWith(path)),
      `expected ${path} in precache, got ${cachedPaths.join(", ")}`
    ).toBe(true);
  }
});

test("offline fallback page renders recovery links", async ({ page }) => {
  await page.goto("/offline/");
  const main = page.locator("main");
  await expect(main.getByRole("heading", { name: /offline/i })).toBeVisible();
  await expect(
    main.getByRole("link", { name: /equipment finder/i })
  ).toBeVisible();
  await expect(main.locator('a[href="/review/"]').first()).toBeVisible();
});

test("manifest exposes Reviews and Guides shortcuts", async ({ page }) => {
  const response = await page.goto("/manifest.webmanifest");
  expect(response?.ok()).toBeTruthy();
  const manifest = await response!.json();
  const shortcuts = manifest.shortcuts.map(
    (entry: { name: string }) => entry.name
  );
  expect(shortcuts).toContain("Reviews");
  expect(shortcuts).toContain("Guides");
  expect(shortcuts).toContain("Tools");
  expect(shortcuts).toContain("Best of");
  expect(shortcuts).toContain("Brands");
  expect(shortcuts).toContain("Compare guides");
});

test("offline fallback lists guides recovery link", async ({ page }) => {
  await page.goto("/offline/");
  await expect(page.locator('a[href="/guides/"]').first()).toBeVisible();
});

test("offline fallback lists best-of, brands, and privacy recovery links", async ({
  page,
}) => {
  await page.goto("/offline/");
  await expect(page.locator('a[href="/best/"]').first()).toBeVisible();
  await expect(page.locator('a[href="/brands/"]').first()).toBeVisible();
  await expect(page.locator('a[href="/privacy/"]').first()).toBeVisible();
});
