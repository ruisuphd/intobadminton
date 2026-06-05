import { expect, test } from "@playwright/test";
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
      if (!keys.some((key) => key.startsWith("ib-v24"))) return false;
      const cache = await caches.open("ib-v24-static");
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
    const cache = await caches.open("ib-v24-static");
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

test("offline fallback lists trust, legal, support, and sample content recovery links", async ({
  page,
}) => {
  await page.goto("/offline/");
  for (const href of [
    "/about/",
    "/sources/",
    "/source-policy/",
    "/authors/",
    "/authors/rui-su/",
    "/methodology/",
    "/data/",
    "/contact/",
    "/research/",
    "/terms/",
    "/cookies/",
    "/security/",
    "/product/yy-grpht-thrttl/",
    "/review/yonex-arcsaber-7-pro-review/",
  ]) {
    await expect(page.locator(`a[href="${href}"]`).first()).toBeVisible();
  }
});
