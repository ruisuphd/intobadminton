import type { BlogSlug } from "@/lib/blog";

/**
 * Review articles held back from the search index because they are thin.
 *
 * One of two noindex lists in this file. This one is about length; see
 * `duplicateNoindexSlugs` for pages held back because they duplicate a
 * sibling. Both feed `isThinContentNoindex` and the sitemap.
 *
 * Every slug below is under 400 words of body copy and recorded zero
 * impressions in the 2026-08-02 Search Console export. Individually they are
 * harmless; collectively they are the "low value content" signal that blocks
 * AdSense review, because they are a third of the corpus that no query has
 * ever reached.
 *
 * They are noindexed rather than deleted. Deleting a slug is not a small
 * change here: every one of these is wired into
 * `docs/baselines/reviews-queries.json` and `src/data/blog-review-product-map.json`,
 * and several are also referenced by PDP, catalog, home-featured, PWA precache
 * and e2e baselines. Noindexing keeps the pages live, keeps the catalog exits
 * and brand-hub shelves that point at them intact, and still removes them from
 * the index.
 *
 * `follow` is deliberate. These pages link out to the catalog and to the
 * indexed round-ups above them, and that crawl path should stay open.
 *
 * How an article graduates: expand it past the thin threshold, confirm the
 * word count, then delete its entry here. `li-ning-halbertec-5000-racket-review`
 * was on this list and came off it that way — the "halbertec 5000" query
 * cluster draws 277 impressions a quarter that a 205-word page could not reach.
 */
export const thinContentNoindexSlugs: readonly BlogSlug[] = [
  // Li-Ning — AxForce and Bladex line pages that duplicate coverage already
  // carried by the flagship round-ups and head-to-heads.
  "li-ning-aeronaut-9000c-racket-review",
  "li-ning-axforce-90-dragon-max-dragon-vs-tiger",
  "li-ning-axforce-90-dragon-max-review",
  "li-ning-axforce-90-dragon-max-vs-astrox-100zz",
  "li-ning-axforce-cannon-racket-review",
  "li-ning-bladex-900-new-vs-1000z-auraspeed-falcon-se",
  "li-ning-bladex-900-new-vs-nanoflare-1000z",
  "li-ning-invincible-ace-shoes-review",

  // Strings — single-SKU pages that the string selector guide covers better.
  "gosen-raimei-58-string-review",
  "gosen-raimei-62-string-review",
  "li-ning-no-1-string-review",
  "victor-vbs-63-string-review",
  "victor-vbs70-string-review",
  "yonex-bg80-string-review",
  "yonex-exbolt-68-string-review",

  // Shuttles.
  "li-ning-g100s-shuttle-review",
  "rsl-tourney-l7-shuttle-review",

  // Shoes.
  "bonny-infinity-002-shoes-review",
  "victor-yinbao-a-boom-shoes-review",

  // Rackets — one-off and legacy SKUs with no live query cluster.
  "anta-ah600w-racket-review",
  "bonny-leisu-800-lt-review",
  "bonny-lunar-8-racket-review",
  "decathlon-920d-racket-review",
  "gosen-ryoga-shiden-review",
  "kawasaki-crimson-blade-racket-review",
  "kawasaki-nezer-19-ii-racket-review",
  "mizuno-carbo-pro-825-review",
  "victor-fz-100xx-budget-attack-review",
  "yonex-nanospeed-9900-ltg-green-sword-review",
  "yonex-voltric-z-force-ltd-2012-review",

  // Comparisons already covered by a stronger sibling article.
  "victor-drivex-12-vs-zsw-vs-arc11-halbertec-8000",
];

/**
 * Review articles held back from the index because they duplicate a sibling.
 *
 * A separate list from `thinContentNoindexSlugs`, and deliberately so: these
 * pages are not thin. They clear the word-count threshold comfortably. Their
 * problem is that they render a near-copy of another live URL's body and draw
 * effectively no search demand of their own, which is the same "low value
 * content" signal arriving by a different route.
 *
 * The bar for adding a slug here is high, because the usual fix for a
 * duplicate pair is to give the weaker slug its own source markdown rather
 * than to hide it. Five pairs were resolved that way in Sprint 132. A slug
 * belongs on this list only when writing genuine content for it would require
 * asserting something the catalogue cannot yet support.
 */
export const duplicateNoindexSlugs: readonly BlogSlug[] = [
  // Renders the same body as `fz-forza-88d-review` from the same source file,
  // `reviews-fz-blade-88d-racket.md`, and drew 13 impressions in the quarter
  // to 2026-08-02 against that page's 225 — no independent query cluster.
  //
  // It is the one pair of the five that could not be split by writing a second
  // article, because the two catalogue rows may not be two rackets. The source
  // says the shaft reads "FZ FORZA AERO POWER 88D" with a Danish national team
  // badge, while `vic-fz-88d-power-purple` files the same frame under Victor
  // at $115 against FZ Forza's $175. Writing a distinct review would mean
  // narrating a brand and a price the catalogue has not settled — exactly what
  // the TITLE_FALLBACK_QUARANTINE note in `scripts/blog-import-option-b.py`
  // exists to prevent.
  //
  // Noindex is the interim, not the resolution. When the brand question is
  // decided, either the row merges into `fz-forza-88d` and this slug becomes a
  // redirect, or it earns a real review and comes off this list.
  "victor-fz-88d-power-purple-review",
];

const thinContentNoindexSet: ReadonlySet<string> = new Set([
  ...thinContentNoindexSlugs,
  ...duplicateNoindexSlugs,
]);

/** Every review slug served `noindex, follow`, whatever the reason. */
export const noindexReviewSlugs: readonly BlogSlug[] = [
  ...thinContentNoindexSlugs,
  ...duplicateNoindexSlugs,
];

/** True when `/review/<slug>/` should render `noindex, follow`. */
export function isThinContentNoindex(slug: string): boolean {
  return thinContentNoindexSet.has(slug);
}

/** Review slugs that belong in the sitemap — the corpus minus the thin set. */
export function indexableReviewSlugs(slugs: readonly string[]): string[] {
  return slugs.filter((slug) => !isThinContentNoindex(slug));
}
