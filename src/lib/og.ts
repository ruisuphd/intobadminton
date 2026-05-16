/**
 * Shared Open Graph image set.
 *
 * Next.js Metadata's `openGraph` is NOT shallow-merged with the parent: a page
 * that sets ANY `openGraph` field loses inheritance of the layout's `images`.
 * To prevent og:image gaps on pages that override openGraph (brand pages,
 * blog index, FAQ, /best/), call this helper and spread the result into the
 * page's `openGraph.images`.
 */
export const defaultOgImages = [
  {
    url: "/intobadminton-og.png",
    width: 512,
    height: 512,
    alt: "IntoBadminton — badminton equipment recommendations",
  },
] as const;
