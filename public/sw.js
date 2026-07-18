/**
 * IntoBadminton service worker — minimal offline shell.
 *
 * Strategy: cache the homepage, the finder, the offline fallback, and
 * already-visited pages. Network-first for HTML (so updates are picked up
 * promptly), cache-first for hashed Next.js static assets (immutable).
 *
 * Conservative scope: we do NOT cache `pagead2.googlesyndication.com`,
 * Google Tag Manager, the cookie banner endpoints, or any cross-origin
 * resource. Cross-origin caching would shadow Consent Mode v2 and AdSense's
 * own freshness assumptions.
 *
 * Cache versioning: bump CACHE_VERSION whenever the offline shell HTML
 * changes so old clients receive the new copy on next activate.
 */
// Bump CACHE_VERSION whenever the offline shell HTML or PRECACHE_URLS change
// so installed clients pick up the new copy on the next activate.
const CACHE_VERSION = "ib-v36";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const HTML_CACHE = `${CACHE_VERSION}-html`;

const PRECACHE_URLS = [
  "/",
  "/quiz/",
  "/catalog/",
  "/results/",
  "/search/",
  "/saved/",
  "/compare/",
  "/review/",
  "/updates/",
  "/guides/",
  "/offline/",
  "/data/",
  "/methodology/",
  "/tools/",
  "/faq/",
  "/best/",
  "/brands/",
  "/brands/yonex/",
  "/guides/string-tension/",
  "/guides/wide-feet-badminton-shoes/",
  "/guides/shoes-footwork/",
  "/guides/racket-balance/",
  "/guides/string-feel-vs-durability/",
  "/guides/doubles-positioning-and-rackets/",
  "/guides/doubles-roles/",
  "/guides/equipment-authenticity/",
  "/guides/badminton-shoes-vs-running-shoes/",
  "/guides/glossary/",
  "/guides/season-refresh/",
  "/tools/racket-balance-explainer/",
  "/tools/court-diagram/",
  "/tools/skill-level-converter/",
  "/tools/string-tension-calculator/",
  "/tools/authenticity-checker/",
  "/compare-guides/yonex-victor-li-ning/",
  "/brands/victor/",
  "/brands/li-ning/",
  "/brands/anta/",
  "/brands/bonny/",
  "/brands/kawasaki/",
  "/brands/kumpoo/",
  "/compare-guides/",
  "/compare-guides/yonex-astrox-vs-nanoflare/",
  "/compare-guides/astrox-99-pro-vs-astrox-100zz/",
  "/compare-guides/astrox-77-pro-vs-88s-pro/",
  "/compare-guides/badminton-vs-tennis-shoes/",
  "/compare-guides/astrox-99-pro-vs-halbertec-9000-power/",
  "/compare-guides/astrox-88d-pro-vs-axforce-90-new/",
  "/compare-guides/halbertec-9000-power-vs-axforce-100-gen-2/",
  "/compare-guides/bladex-800-speed-vs-nanoflare-1000z/",
  "/compare-guides/nanoflare-1000z-vs-auraspeed-99/",
  "/compare-guides/nanoflare-800-pro-vs-auraspeed-hs-plus/",
  "/compare-guides/yonex-65z4-vs-eclipsion-z3/",
  "/best/beginner-rackets/",
  "/best/smash-heavy-rackets/",
  "/best/strings/",
  "/best/shuttles/",
  "/best/grips/",
  "/best/bags/",
  "/best/intermediate-rackets/",
  "/best/rackets-under-100/",
  "/best/rackets-under-150/",
  "/best/rackets-under-200/",
  "/best/shoes/",
  "/best/doubles-rackets/",
  "/best/head-light-rackets/",
  "/best/all-round-rackets/",
  "/best/wide-feet-badminton-shoes/",
  "/best/budget-badminton-shoes/",
  "/best/control-rackets/",
  "/best/singles-rackets/",
  "/best/defensive-rackets/",
  "/best/lightweight-rackets-5u/",
  "/best/rackets-for-shoulder-comfort/",
  "/best/head-heavy-rackets-under-150/",
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
  "/product/yy-grpht-thrttl/",
  "/review/yonex-arcsaber-7-pro-review/",
  "/review/yonex-nanoflare-1000z-review/",
  "/review/gosen-ryoga-shiden-review/",
  "/review/anta-ah600w-racket-review/",
  "/review/yonex-tour-series-buying-guide/",
  "/review/how-to-choose-a-badminton-racket/",
  "/review/yonex-nanoflare-speed-series-explained/",
  "/review/li-ning-halbertec-8000-vs-9000-vs-9000-power/",
  "/review/yonex-astrox-88d-pro-vs-88s-pro-2024/",
  "/review/yonex-nanoflare-800-pro-and-victor-hs-plus/",
  "/review/li-ning-axforce-100-gen-2-vs-100zz-vs-90-new/",
  "/review/li-ning-axforce-90-new-vs-axforce-80-and-yonex-88dp/",
  "/review/li-ning-bladex-800-speed-tough-elastic/",
  "/review/yonex-comfort-z3-shoes-review/",
  "/review/yonex-aerosensa-50-shuttle-review/",
  "/review/li-ning-halbertec-7000-review/",
  "/review/kumpoo-shura-2-racket-review/",
  "/review/kumpoo-fourth-major-badminton-brand-profile/",
  "/review/kumpoo-js-67-string-review/",
  "/review/kumpoo-kh-g805-lite-pro-shoes-review/",
  "/review/bonny-snake-breath-second-tier-flagship-review/",
  "/review/bonny-wuque-flagship-088-shoes-review/",
  "/review/bonny-mojun-vs-arcsaber-11-pro-attack-racket-review/",
  "/review/bonny-zhangui-dao-8888ax-ultra-review/",
  "/review/bonny-leisu-800-racket-review/",
  "/review/kawasaki-chocolate-88d-vs-yonex-astrox-88d-pro/",
  "/review/kawasaki-master-mao-20-racket-review/",
  "/review/kawasaki-star-cross-racket-review/",
  "/review/kawasaki-kace-shoes-review/",
  "/review/racket-stringing-hole-patterns-explained/",
  "/manifest.webmanifest",
  "/intobadminton-mark.png",
  "/intobadminton-icon-192.png",
  "/intobadminton-icon-512.png",
  "/review/anta-dingyin-1000-racket-review/",
  "/review/li-ning-axforce-10-beginner-attack-review/",
  "/review/li-ning-okay-1-shuttle-review/",
  "/review/victor-auraspeed-99-hayabusa-review/",
  "/review/victor-c90-ii-shoes-review/",
  "/review/li-ning-mirage-ii-pro-shoes-review/",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) =>
      cache.addAll(PRECACHE_URLS).catch(() => {
        /* tolerate offline install — these will be filled on first online visit */
      })
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => !k.startsWith(CACHE_VERSION))
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // cross-origin: don't touch

  // Hashed static assets — cache-first, long-lived.
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((res) => {
            const copy = res.clone();
            caches.open(STATIC_CACHE).then((c) => c.put(request, copy));
            return res;
          })
      )
    );
    return;
  }

  // HTML navigations — network-first, with offline-cache fallback.
  if (request.mode === "navigate" || request.destination === "document") {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(HTML_CACHE).then((c) => c.put(request, copy));
          return res;
        })
        .catch(() =>
          caches
            .match(request)
            .then(
              (cached) =>
                cached || caches.match("/offline/") || caches.match("/")
            )
        )
    );
    return;
  }
});
