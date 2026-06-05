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
      if (!keys.some((key) => key.startsWith("ib-v8"))) return false;
      const cache = await caches.open("ib-v8-static");
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
    const cache = await caches.open("ib-v8-static");
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
});

test("offline fallback lists guides recovery link", async ({ page }) => {
  await page.goto("/offline/");
  await expect(page.locator('a[href="/guides/"]').first()).toBeVisible();
});
