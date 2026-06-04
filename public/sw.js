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
const CACHE_VERSION = "ib-v3";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const HTML_CACHE = `${CACHE_VERSION}-html`;

const PRECACHE_URLS = [
  "/",
  "/quiz/",
  "/catalog/",
  "/tools/",
  "/manifest.webmanifest",
  "/intobadminton-mark.png",
  "/intobadminton-icon-192.png",
  "/intobadminton-icon-512.png",
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
          caches.match(request).then((cached) => cached || caches.match("/"))
        )
    );
    return;
  }
});
