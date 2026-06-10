import { expect, test } from "@playwright/test";
import { homeFeaturedReviewHrefs } from "../src/lib/home-featured";
import {
  homePopularSearchEditorialOfflineRecoveryLinks,
  homePopularSearchHrefs,
  homePopularSearchReviewOfflineRecoveryLinks,
} from "../src/lib/home-popular-searches";
import { OFFLINE_RECOVERY_PATHS } from "../src/lib/offline-recovery-paths";
import { PRECACHE_ASSERT_PATHS } from "../src/lib/pwa-precache-paths";

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
      if (!keys.some((key) => key.startsWith("ib-v33"))) return false;
      const cache = await caches.open("ib-v33-static");
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
    const cache = await caches.open("ib-v33-static");
    return (await cache.keys()).map((request) => {
      try {
        return new URL(request.url).pathname;
      } catch {
        return request.url;
      }
    });
  });

  for (const path of ["/", ...PRECACHE_ASSERT_PATHS]) {
    expect(
      cachedPaths.some((entry) => entry === path || entry.startsWith(path)),
      `expected ${path} in precache, got ${cachedPaths.join(", ")}`
    ).toBe(true);
  }
});

test("precached product-funnel shells load offline after prior visit", async ({
  page,
  context,
}) => {
  await ensureServiceWorker(page);

  const funnelRoutes: { path: string; heading: RegExp }[] = [
    { path: "/results/", heading: /equipment shortlist/i },
    { path: "/compare/", heading: /^compare gear$/i },
    { path: "/saved/", heading: /saved shelf/i },
  ];

  for (const { path, heading } of funnelRoutes) {
    await page.goto(path);
    await expect(page.getByRole("heading", { name: heading })).toBeVisible();
  }

  await context.setOffline(true);

  for (const { path, heading } of funnelRoutes) {
    await page.goto(path);
    await expect(page.getByRole("heading", { name: heading })).toBeVisible();
  }
});

test("precached commercial and guide pages load offline after prior visit", async ({
  page,
  context,
}) => {
  await ensureServiceWorker(page);

  const routes: { path: string; heading: RegExp }[] = [
    { path: "/best/beginner-rackets/", heading: /beginner/i },
    { path: "/best/doubles-rackets/", heading: /doubles/i },
    { path: "/best/shoes/", heading: /shoes/i },
    {
      path: "/compare-guides/yonex-astrox-vs-nanoflare/",
      heading: /Astrox vs Nanoflare/i,
    },
    {
      path: "/compare-guides/yonex-victor-li-ning/",
      heading: /Yonex vs Victor vs Li-Ning/i,
    },
    { path: "/guides/string-tension/", heading: /string tension/i },
    { path: "/guides/glossary/", heading: /glossary/i },
    { path: "/guides/equipment-authenticity/", heading: /authenticity/i },
    { path: "/brands/bonny/", heading: /Bonny/i },
  ];

  for (const { path, heading } of routes) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(heading);
  }

  await context.setOffline(true);

  for (const { path, heading } of routes) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(heading);
  }
});

test("precached homepage featured review loads offline after prior visit", async ({
  page,
  context,
}) => {
  await ensureServiceWorker(page);

  await page.goto("/review/gosen-ryoga-shiden-review/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /Ryoga Shiden/i
  );

  await context.setOffline(true);

  await page.goto("/review/gosen-ryoga-shiden-review/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /Ryoga Shiden/i
  );
});

test("precached PDP and review load offline after prior visit", async ({
  page,
  context,
}) => {
  await ensureServiceWorker(page);

  await page.goto("/product/yy-grpht-thrttl/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /Grpht Thrttl/i
  );

  await page.goto("/review/yonex-arcsaber-7-pro-review/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /Arcsaber 7 Pro/i
  );

  await context.setOffline(true);

  await page.goto("/product/yy-grpht-thrttl/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /Grpht Thrttl/i
  );

  await page.goto("/review/yonex-arcsaber-7-pro-review/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /Arcsaber 7 Pro/i
  );
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
  await expect(page.locator('a[href="/privacy-choices/"]').first()).toBeVisible();
});

test("offline fallback lists homepage featured and popular-search review recovery links", async ({
  page,
}) => {
  await page.goto("/offline/");
  for (const href of homeFeaturedReviewHrefs()) {
    await expect(page.locator(`a[href="${href}"]`).first()).toBeVisible();
  }
  for (const link of homePopularSearchReviewOfflineRecoveryLinks()) {
    await expect(page.locator(`a[href="${link.href}"]`).first()).toBeVisible();
  }
});

test("offline fallback lists every homepage popular-search recovery link", async ({
  page,
}) => {
  await page.goto("/offline/");
  for (const href of homePopularSearchHrefs()) {
    await expect(page.locator(`a[href="${href}"]`).first()).toBeVisible();
  }
  for (const link of homePopularSearchEditorialOfflineRecoveryLinks()) {
    await expect(page.locator(`a[href="${link.href}"]`).first()).toBeVisible();
  }
});

test("offline fallback lists trust, legal, support, and sample content recovery links", async ({
  page,
}) => {
  await page.goto("/offline/");
  for (const href of OFFLINE_RECOVERY_PATHS.filter(
    (path) =>
      path.startsWith("/about/") ||
      path.startsWith("/sources/") ||
      path.startsWith("/source-policy/") ||
      path.startsWith("/authors/") ||
      path.startsWith("/methodology/") ||
      path.startsWith("/data/") ||
      path.startsWith("/contact/") ||
      path.startsWith("/research/") ||
      path.startsWith("/terms/") ||
      path.startsWith("/cookies/") ||
      path.startsWith("/security/") ||
      path.startsWith("/product/") ||
      path.startsWith("/review/yonex") ||
      path.startsWith("/best/beginner") ||
      path.startsWith("/best/doubles") ||
      path.startsWith("/best/shoes") ||
      path.startsWith("/compare-guides/yonex-astrox") ||
      path.startsWith("/compare-guides/yonex-victor") ||
      path.startsWith("/guides/string-tension") ||
      path.startsWith("/guides/glossary") ||
      path.startsWith("/guides/equipment-authenticity") ||
      path.startsWith("/brands/bonny")
  )) {
    await expect(page.locator(`a[href="${href}"]`).first()).toBeVisible();
  }
});
