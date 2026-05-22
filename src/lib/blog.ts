import type { SiteLocale } from "@/lib/locale";
import { sourceReviewArticles } from "@/lib/blog-source-reviews";

export type BlogSlug =
  | "racket-balance-vs-swing-speed"
  | "how-to-read-badminton-reviews"
  | "beginner-racket-mistakes"
  | "badminton-string-selector"
  | "badminton-shoe-fit-stability"
  | "badminton-bag-loadout"
  | "used-racket-depreciation"
  | "yonex-astrox-88d-pro-vs-88s-pro-2024"
  | "yonex-nanoflare-speed-series-explained"
  | "yonex-nanoflare-800-pro-and-victor-hs-plus"
  | "li-ning-bladex-800-speed-tough-elastic"
  | "li-ning-halbertec-8000-vs-9000-vs-9000-power"
  | "li-ning-axforce-90-new-vs-axforce-80-and-yonex-88dp"
  | "yuan-style-shaft-hardness-explained"
  | "yonex-astrox-100zz-axelsen-va-vs-kurenai"
  | "victor-drivex-12-vs-astrox-88d-pro"
  | "li-ning-l69-string-review"
  | "victor-p9200-iii-shoes-review"
  | "li-ning-axforce-100-gen-2-vs-100zz-vs-90-new"
  | "yonex-eclipsion-z3-shoes-review"
  | "yonex-astrox-99-pro-2-deep-dive"
  | "victor-auraspeed-99-hayabusa-review"
  | "li-ning-bladesabre-max-shoes-review"
  | "victor-auraspeed-hs-plus-deep-dive"
  | "li-ning-halbertec-7000-ii-review"
  | "victor-carbonsonic-max-shuttle-review"
  | "bonny-leisu-800-racket-review"
  | "kumpoo-shanhai-new-racket-review"
  | "li-ning-axforce-80-review"
  | "victor-c90nl-shoes-review"
  | "yonex-65z4-shoes-review"
  | "kawasaki-master-mao-20-racket-review"
  | "kumpoo-shura-2-racket-review"
  | "victor-yu-12-racket-review"
  | "victor-auraspeed-fantome-review"
  | "li-ning-thunder-100-gen-2-vs-gen-1"
  | "li-ning-aerus-iii-pro-shoes-review"
  | "victor-tk-f-c-ultra-review"
  | "kawasaki-kace-shoes-review"
  | "kawasaki-star-cross-racket-review"
  | "yonex-arcsaber-7-pro-review"
  | "asics-blast-ff-3-badminton-shoes-review"
  | "yonex-astrox-nextage-review"
  | "victor-drivex-10-review"
  | "yonex-nanoflare-1000z-play-review"
  | "yonex-nanoflare-800-pro-tour-review"
  | "yonex-nanoflare-nextage-review"
  | "yonex-power-cushion-88-dial-3-review"
  | "yonex-grpht-thrttl-training-shoe-review"
  | "li-ning-bladex-900-new-review"
  | "victor-auraspeed-hs-plus-attack-review"
  | "yonex-astrox-88-pro-2024-review"
  | "victor-auraspeed-90k-ii-review"
  | "victor-thruster-falcon-review"
  | "yonex-nanoflare-700-review"
  | "li-ning-axforce-90-new-review"
  | "yonex-subaxia-gt-shoes-review"
  | "yonex-astrox-99-pro-3-deep-dive"
  | "how-to-choose-a-badminton-racket"
  | "badminton-equipment-for-kids"
  | "badminton-glossary-terms-every-player-should-know"
  | "yonex-grip-sizes-explained"
  | "yonex-arcsaber-10-complete-buying-guide"
  | "racket-stringing-hole-patterns-explained"
  | "yonex-tour-series-buying-guide"
  | "kumpoo-fourth-major-badminton-brand-profile"
  | "rsl-aero-u-shuttle-review"
  | "li-ning-axforce-90-new-5u-deep-dive"
  | "bonny-future-land-3-polaris-shoes-review"
  | "li-ning-bladesabre-2-pro-shoes-review"
  | "kawasaki-chocolate-88d-vs-yonex-astrox-88d-pro"
  | "jujiang-mzs-66un-string-review"
  | "kawasaki-twilight-shoes-review"
  | "li-ning-gp100-pro-overgrip-review"
  | "li-ning-l66-string-first-look"
  | "bonny-wuque-flagship-088-shoes-review"
  | "bonny-wind-shadow-budget-speed-shoes-review"
  | "jujiang-lbtu-value-racket-review"
  | "victor-fz-flash-1000-racket-review"
  | "kumpoo-kh-g805-lite-pro-shoes-review"
  | "bonny-phantom-100-racket-review"
  | "li-ning-axforce-10-beginner-attack-review"
  | "li-ning-bladex-arrow-review"
  | "victor-thruster-hwql-nuke-review"
  | "victor-jipo-ls-racket-review"
  | "victor-thruster-sr-cherry-blossom-review"
  | "victor-fz-88d-power-purple-review"
  | "yonex-arcsaber-7-play-review"
  | "kawasaki-glacier-800-racket-review"
  | "kawasaki-h2-6u-superlight-racket-review"
  | "kawasaki-star-cross-second-perspective-review"
  | "bonny-snake-breath-second-tier-flagship-review"
  | "li-ning-lt66-power-string-review"
  | "li-ning-flagship-racket-buying-guide-2026"
  | "bonny-wuque-1982-y3k-shoes-review"
  | "li-ning-halbertec-9000-power-deep-dive"
  | "li-ning-halbertec-9000-standalone-review"
  | "li-ning-axforce-100-gen-2-vs-gen-1"
  | "rsl-supreme-shuttle-review"
  | "yonex-astrox-100zz-anders-antonsen-vs-va-vs-kurenai"
  | "victor-drivex-12-zsw-vs-original-comparison"
  | "victor-drivex-12-vs-drivex-10-and-88d-pro-2024"
  | "bonny-zhangui-dao-8888ax-ultra-review"
  | "bonny-carbon-armour-shoes-review"
  | "victor-thruster-9900-curiosity-review"
  | "yonex-astrox-99-pro-gen-1-review"
  | "bonny-wuque-xuanwu-review"
  | "badminton-shoe-buying-guide-and-replacement"
  | "kumpoo-js-67-string-review"
  | "yonex-nanoflare-700-pro-vs-nf700-800-pro-1000z"
  | "victor-sonic-boom-pro-budget-attack-review"
  | "goshen-leiming-69-string-review"
  | "bonny-mojun-vs-arcsaber-11-pro-attack-racket-review"
  | "yonex-arcsaber-7-tour-review"
  | "victor-p8500-ii-shoes-review"
  | "victor-a970-nitro-lite-shoes-review"
  | "yonex-astrox-77-pro-review"
  | "yonex-nanoray-zspeed-duora-zstrike-legacy-comparison"
  | "li-ning-bladex-800-speed-vs-halbertec-9000-power"
  | "li-ning-halbertec-8000-vs-yonex-arcsaber-11-pro"
  | "victor-p8500-ii-vs-a970-nitro-lite"
  | "fz-forza-odin-8800-review"
  | "fz-forza-88d-review"
  | "bonny-golden-dragon-roar-pro-racket-review"
  | "mizuno-carbo-pro-823-review"
  | "bonny-phantom-88-racket-review"
  | "bonny-wuque-flagship-089-shoes-review"
  | "li-ning-l64-string-review"
  | "kumpoo-js-63-string-review"
  | "rsl-aero-classic-tourney-shuttle-review"
  | "li-ning-axforce-80-jr-junior-review"
  | "yonex-arcsaber-11-pro-review";

export const blogSlugs: BlogSlug[] = [
  "racket-balance-vs-swing-speed",
  "how-to-read-badminton-reviews",
  "beginner-racket-mistakes",
  "badminton-string-selector",
  "badminton-shoe-fit-stability",
  "badminton-bag-loadout",
  "used-racket-depreciation",
  "yonex-astrox-88d-pro-vs-88s-pro-2024",
  "yonex-nanoflare-speed-series-explained",
  "yonex-nanoflare-800-pro-and-victor-hs-plus",
  "li-ning-bladex-800-speed-tough-elastic",
  "li-ning-halbertec-8000-vs-9000-vs-9000-power",
  "li-ning-axforce-90-new-vs-axforce-80-and-yonex-88dp",
  "yuan-style-shaft-hardness-explained",
  "yonex-astrox-100zz-axelsen-va-vs-kurenai",
  "victor-drivex-12-vs-astrox-88d-pro",
  "li-ning-l69-string-review",
  "victor-p9200-iii-shoes-review",
  "li-ning-axforce-100-gen-2-vs-100zz-vs-90-new",
  "yonex-eclipsion-z3-shoes-review",
  "yonex-astrox-99-pro-2-deep-dive",
  "victor-auraspeed-99-hayabusa-review",
  "li-ning-bladesabre-max-shoes-review",
  "victor-auraspeed-hs-plus-deep-dive",
  "li-ning-halbertec-7000-ii-review",
  "victor-carbonsonic-max-shuttle-review",
  "bonny-leisu-800-racket-review",
  "kumpoo-shanhai-new-racket-review",
  "li-ning-axforce-80-review",
  "victor-c90nl-shoes-review",
  "yonex-65z4-shoes-review",
  "kawasaki-master-mao-20-racket-review",
  "kumpoo-shura-2-racket-review",
  "victor-yu-12-racket-review",
  "victor-auraspeed-fantome-review",
  "li-ning-thunder-100-gen-2-vs-gen-1",
  "li-ning-aerus-iii-pro-shoes-review",
  "victor-tk-f-c-ultra-review",
  "kawasaki-kace-shoes-review",
  "kawasaki-star-cross-racket-review",
  "yonex-arcsaber-7-pro-review",
  "asics-blast-ff-3-badminton-shoes-review",
  "yonex-astrox-nextage-review",
  "victor-drivex-10-review",
  "yonex-nanoflare-1000z-play-review",
  "yonex-nanoflare-800-pro-tour-review",
  "yonex-nanoflare-nextage-review",
  "yonex-power-cushion-88-dial-3-review",
  "yonex-grpht-thrttl-training-shoe-review",
  "li-ning-bladex-900-new-review",
  "victor-auraspeed-hs-plus-attack-review",
  "yonex-astrox-88-pro-2024-review",
  "victor-auraspeed-90k-ii-review",
  "victor-thruster-falcon-review",
  "yonex-nanoflare-700-review",
  "li-ning-axforce-90-new-review",
  "yonex-subaxia-gt-shoes-review",
  "yonex-astrox-99-pro-3-deep-dive",
  "how-to-choose-a-badminton-racket",
  "badminton-equipment-for-kids",
  "badminton-glossary-terms-every-player-should-know",
  "yonex-grip-sizes-explained",
  "yonex-arcsaber-10-complete-buying-guide",
  "racket-stringing-hole-patterns-explained",
  "yonex-tour-series-buying-guide",
  "kumpoo-fourth-major-badminton-brand-profile",
  "rsl-aero-u-shuttle-review",
  "li-ning-axforce-90-new-5u-deep-dive",
  "bonny-future-land-3-polaris-shoes-review",
  "li-ning-bladesabre-2-pro-shoes-review",
  "kawasaki-chocolate-88d-vs-yonex-astrox-88d-pro",
  "jujiang-mzs-66un-string-review",
  "kawasaki-twilight-shoes-review",
  "li-ning-gp100-pro-overgrip-review",
  "li-ning-l66-string-first-look",
  "bonny-wuque-flagship-088-shoes-review",
  "bonny-wind-shadow-budget-speed-shoes-review",
  "jujiang-lbtu-value-racket-review",
  "victor-fz-flash-1000-racket-review",
  "kumpoo-kh-g805-lite-pro-shoes-review",
  "bonny-phantom-100-racket-review",
  "li-ning-axforce-10-beginner-attack-review",
  "li-ning-bladex-arrow-review",
  "victor-thruster-hwql-nuke-review",
  "victor-jipo-ls-racket-review",
  "victor-thruster-sr-cherry-blossom-review",
  "victor-fz-88d-power-purple-review",
  "yonex-arcsaber-7-play-review",
  "kawasaki-glacier-800-racket-review",
  "kawasaki-h2-6u-superlight-racket-review",
  "kawasaki-star-cross-second-perspective-review",
  "bonny-snake-breath-second-tier-flagship-review",
  "li-ning-lt66-power-string-review",
  "li-ning-flagship-racket-buying-guide-2026",
  "bonny-wuque-1982-y3k-shoes-review",
  "li-ning-halbertec-9000-power-deep-dive",
  "li-ning-halbertec-9000-standalone-review",
  "li-ning-axforce-100-gen-2-vs-gen-1",
  "rsl-supreme-shuttle-review",
  "yonex-astrox-100zz-anders-antonsen-vs-va-vs-kurenai",
  "victor-drivex-12-zsw-vs-original-comparison",
  "victor-drivex-12-vs-drivex-10-and-88d-pro-2024",
  "bonny-zhangui-dao-8888ax-ultra-review",
  "bonny-carbon-armour-shoes-review",
  "victor-thruster-9900-curiosity-review",
  "yonex-astrox-99-pro-gen-1-review",
  "bonny-wuque-xuanwu-review",
  "badminton-shoe-buying-guide-and-replacement",
  "kumpoo-js-67-string-review",
  "yonex-nanoflare-700-pro-vs-nf700-800-pro-1000z",
  "victor-sonic-boom-pro-budget-attack-review",
  "goshen-leiming-69-string-review",
  "bonny-mojun-vs-arcsaber-11-pro-attack-racket-review",
  "yonex-arcsaber-7-tour-review",
  "victor-p8500-ii-shoes-review",
  "victor-a970-nitro-lite-shoes-review",
  "yonex-astrox-77-pro-review",
  "yonex-nanoray-zspeed-duora-zstrike-legacy-comparison",
  "li-ning-bladex-800-speed-vs-halbertec-9000-power",
  "li-ning-halbertec-8000-vs-yonex-arcsaber-11-pro",
  "victor-p8500-ii-vs-a970-nitro-lite",
  "fz-forza-odin-8800-review",
  "fz-forza-88d-review",
  "bonny-golden-dragon-roar-pro-racket-review",
  "mizuno-carbo-pro-823-review",
  "bonny-phantom-88-racket-review",
  "bonny-wuque-flagship-089-shoes-review",
  "li-ning-l64-string-review",
  "kumpoo-js-63-string-review",
  "rsl-aero-classic-tourney-shuttle-review",
  "li-ning-axforce-80-jr-junior-review",
  "yonex-arcsaber-11-pro-review",
];

export type BlogCategory = "reviews" | "comparisons" | "guides";

export type BlogReviewSummary = {
  verdict: string;
  bestFor: string[];
  avoidIf: string[];
  setupNotes?: string[];
  sourceHook: string;
};

export type BlogStoryFact = {
  label: string;
  value: string;
};

export type BlogStoryBlock =
  | {
      kind: "facts";
      heading: string;
      items: BlogStoryFact[];
    }
  | {
      kind: "callout";
      label: string;
      title: string;
      body: string;
    }
  | {
      kind: "comparison";
      heading: string;
      columns: string[];
      rows: { label: string; values: string[] }[];
    }
  | {
      kind: "verdict";
      heading: string;
      body: string;
      bullets: string[];
    }
  | {
      /**
       * First-person evidence block — Google's 2026 Product Reviews update
       * rewards lived experience anchored to specific judgments. Use sparingly:
       * 3–5 per article max, embedded next to factual claims to anchor them
       * to the author's on-court testing (sessions, strings, opponents, dates).
       * See docs/IMPROVEMENT_PLAN_2026Q2.md §3.2 #11.
       */
      kind: "firstPerson";
      /** Short e.g. "On court", "On the shoulder", "In doubles", "Restringing". */
      context: string;
      body: string;
      /** Optional setup details that make the evidence specific. */
      setup?: {
        sessions?: number;
        strings?: string;
        tensionLbs?: number;
        opponentLevel?: string;
      };
    }
  | {
      /**
       * Methodology block — a labelled "what was tested and how" panel rendered
       * at the top of every review (founder-firsthand or observer). The 2026
       * Google Product Reviews update rewards explicit test-conditions
       * disclosure; this block separates the founder-firsthand voice (with
       * truthful court conditions) from the observer voice (club/coach
       * context) at the type level so the renderer can style them differently
       * and a build check can enforce the boundary.
       *
       * `context: "founderFirsthand"` is only valid for products on the
       * founder-firsthand list (Astrox 77 Pro, 88D Pro, 88D Tour, 100ZZ
       * family, 99 Pro 2, Arcsaber 11 Pro, Arcsaber 7 Pro, Nanoflare 1000Z,
       * NF 700 Pro, NF 700 Play 5U, Aerus Z2, Comfort Z3). For any other
       * product, use `context: "observer"` and describe club/coach context.
       */
      kind: "methodology";
      headline: string;
      context: "founderFirsthand" | "observer";
      conditions: {
        sessions?: number;
        opponents?: string;
        strings?: string;
        tensionLbs?: number;
        courtSurface?: string;
        venue?: string;
      };
      comparators?: string[];
      /** When this block synthesises a third-party review, name the source here. */
      sourceAttribution?: string;
    };

export type BlogStory = {
  intro: string;
  blocks: BlogStoryBlock[];
};

export type BlogFactCheck = {
  sourceName: string;
  title: string;
  section: string;
  checkedAt: string;
  href: string;
  quote?: string;
  note: string;
};

export type BlogArticle = {
  slug: BlogSlug;
  /** First-published / last-revised date in ISO format (YYYY-MM-DD). */
  updatedAt: string;
  category: BlogCategory;
  title: string;
  dek: string;
  reviewSummary?: BlogReviewSummary;
  story?: BlogStory;
  factChecks?: BlogFactCheck[];
  sections: {
    heading: string;
    body: string;
    /**
     * Optional inline glossary references shown as small chip-row links
     * beneath the section body. Required when the body uses any glossary
     * term 3+ times — the `lint:glossary:strict` gate (see
     * scripts/check-glossary-links.mjs) enforces this for E-E-A-T
     * topical-cluster density. Each entry takes the term display label
     * and the glossary anchor id, e.g.
     * `{ term: "Head-heavy", id: "head-heavy" }` renders as a chip
     * linking to `/guides/glossary/#head-heavy`.
     */
    glossaryLinks?: { term: string; id: string }[];
  }[];
  cta: string;
};

export const CATEGORY_LABELS: Record<BlogCategory, string> = {
  reviews: "Reviews",
  comparisons: "Comparisons",
  guides: "Guides",
};

/**
 * Rough reading-time estimate (minutes), based on ~225 words/min for non-fiction
 * online prose. Returns at least 1.
 */
export function readingTimeMinutes(article: BlogArticle): number {
  const sections = article.sections.map((s) => `${s.heading} ${s.body}`);
  const storyParts = article.story
    ? [
        article.story.intro,
        ...article.story.blocks.flatMap((block) => {
          if (block.kind === "facts") {
            return [
              block.heading,
              ...block.items.map((item) => `${item.label} ${item.value}`),
            ];
          }

          if (block.kind === "callout") {
            return [block.label, block.title, block.body];
          }

          if (block.kind === "comparison") {
            return [
              block.heading,
              ...block.columns,
              ...block.rows.flatMap((row) => [row.label, ...row.values]),
            ];
          }

          if (block.kind === "firstPerson") {
            return [block.context, block.body];
          }

          if (block.kind === "methodology") {
            return [
              block.headline,
              ...Object.values(block.conditions).filter(
                (v): v is string | number => v != null
              ).map(String),
              ...(block.comparators ?? []),
              block.sourceAttribution ?? "",
            ];
          }

          return [block.heading, block.body, ...block.bullets];
        }),
      ]
    : [];
  const words = [...storyParts, ...sections]
    .map((part) => part.split(/\s+/).filter((word) => word.length > 0).length)
    .reduce((a, b) => a + b, 0);
  return Math.max(1, Math.round(words / 225));
}

/** Articles sorted newest-first by updatedAt. */
export function articlesByDateDesc(articles: BlogArticle[]): BlogArticle[] {
  return [...articles].sort((a, b) =>
    a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0
  );
}

/** Group articles by category, each group sorted newest-first. */
export function articlesGroupedByCategory(
  articles: BlogArticle[]
): { category: BlogCategory; articles: BlogArticle[] }[] {
  const order: BlogCategory[] = ["reviews", "comparisons", "guides"];
  return order
    .map((category) => ({
      category,
      articles: articlesByDateDesc(
        articles.filter((a) => a.category === category)
      ),
    }))
    .filter((group) => group.articles.length > 0);
}

/**
 * Extract a brand-and-product affinity key from an article slug.
 *
 * The first two kebab-case segments of a slug typically encode brand +
 * product family (e.g. `yonex-astrox-99-pro-2-deep-dive` → `yonex-astrox`;
 * `li-ning-halbertec-9000-power-deep-dive` → `li-ning`). This lets the
 * related-articles helper prefer same-family matches over generic
 * same-category matches — which materially improves topical-cluster
 * cross-link density without requiring per-article editorial work.
 *
 * For multi-word brand prefixes (li-ning), we keep both segments so that
 * `li-ning-halbertec-...` and `li-ning-axforce-...` land in different
 * sub-families but the same broader brand. The cross-link helper below
 * scores both same-family and same-brand affinity above same-category
 * affinity.
 */
function affinityKey(slug: string): { family: string; brand: string } {
  const parts = slug.split("-");
  if (parts.length < 2) return { family: slug, brand: slug };
  // Two-word brand prefixes: li-ning, jujiang (rare), bonny.
  const brand =
    parts[0] === "li" && parts[1] === "ning"
      ? "li-ning"
      : parts[0];
  // Family = brand + the next significant token.
  const tail = brand === "li-ning" ? parts[2] : parts[1];
  const family = tail ? `${brand}-${tail}` : brand;
  return { family, brand };
}

/**
 * Find up to `n` related articles, preferring same-family (brand +
 * product family) matches over same-brand matches, and same-brand over
 * generic same-category matches.
 *
 * Scoring:
 *   - 3 points: same family AND same category
 *   - 2 points: same family, different category
 *   - 1 point:  same brand (not family)
 *   - 0 points: same category, different brand (was previous default)
 *
 * Within each tier, articles are sorted newest-first. This produces a
 * "related coverage" shelf that naturally surfaces cluster-mates first
 * (e.g. a Yonex Astrox 88D Pro review shows other Astrox articles)
 * before falling back to broader category matches. Materially improves
 * E-E-A-T topical-cluster signals per Google's 2026 helpful-content
 * update without requiring per-article editorial cross-link work.
 */
export function relatedArticles(
  articles: BlogArticle[],
  current: BlogArticle,
  n = 3
): BlogArticle[] {
  const currentKey = affinityKey(current.slug);
  const scored = articles
    .filter((a) => a.slug !== current.slug)
    .map((a) => {
      const k = affinityKey(a.slug);
      let score = 0;
      if (k.family === currentKey.family) {
        score += a.category === current.category ? 3 : 2;
      } else if (k.brand === currentKey.brand) {
        score += 1;
      }
      // Tie-breaker: same category adds half a point so within the same
      // tier, category-matched siblings still rise.
      if (
        score === 0 &&
        a.category === current.category &&
        k.brand !== currentKey.brand
      ) {
        score = 0.25;
      }
      return { a, score };
    })
    .filter((row) => row.score > 0)
    .sort((x, y) => {
      if (y.score !== x.score) return y.score - x.score;
      return x.a.updatedAt < y.a.updatedAt ? 1 : -1;
    })
    .map((row) => row.a);
  return scored.slice(0, n);
}

const rawBlogArticles: Record<SiteLocale, BlogArticle[]> = {
  en: [
    {
      slug: "racket-balance-vs-swing-speed",
      updatedAt: "2026-04-28",
      category: "guides",
      title: "Racket balance vs swing speed: why the best smash racket may not fit you",
      dek: "A practical guide to matching head weight, timing, and doubles speed without chasing the most powerful spec on paper.",
      story: {
        intro:
          "A practical guide to matching head weight, timing, and doubles speed without chasing the most powerful spec on paper.",
        blocks: [
          {
            kind: "firstPerson",
            context: "Why this guide exists",
            body:
              "When I moved from a head-heavy 3U attack frame to a head-light 4U speed frame mid-season, the biggest gain was not smash power — it was the cleaner block-and-reset at the front of the court in doubles. Forced errors went down before forehand drives even got measurably faster. That inversion — where the lighter frame produced better match results than the heavier one — is the trade this guide is about.",
          },
        ],
      },
      sections: [
        {
          heading: "The tradeoff",
          body: "Head-heavy rackets can help load a bigger smash, but they also ask more from your shoulder, timing, and recovery. If your points are won through blocks, drives, and interceptions, a faster frame may produce better match results than a heavier power frame.",
        },
        {
          heading: "How reviews can mislead",
          body: "Online reviews often come from players with different technique, string tension, shuttle speed, and playing role. Treat review themes as signals, not verdicts. A phrase like powerful is only useful when you know whether the reviewer plays singles, rear-court doubles, or front-court pressure.",
        },
        {
          heading: "What IntoBadminton does",
          body: "The finder weighs official balance and shaft information first, then adds editor interpretation and rights-safe review themes. It lowers confidence when a model needs source verification.",
        },
      ],
      cta: "Run the finder with your level, role, and comfort flags.",
    },
    {
      slug: "how-to-read-badminton-reviews",
      updatedAt: "2026-04-28",
      category: "guides",
      title: "How to read badminton equipment reviews without copying someone else’s fit",
      dek: "A review is useful only when you translate it through the reviewer’s level, setup, and style.",
      story: {
        intro:
          "A review is useful only when you translate it through the reviewer’s level, setup, and style.",
        blocks: [
          {
            kind: "firstPerson",
            context: "What I changed in my own reading",
            body:
              "The single most useful filter I apply when reading other people's badminton reviews is to ignore the verdict entirely on a first pass and look only for the reviewer's level, weight class, string and tension. If those three do not match mine, the subjective verdict — 'crisp', 'forgiving', 'dead' — usually does not transfer. The reviewer is reporting a true experience, just not one that predicts my experience.",
          },
        ],
      },
      sections: [
        {
          heading: "Start with context",
          body: "Look for the reviewer’s level, event, racket weight, grip size, string, tension, and how long they tested the product. One session can reveal first feel, but it cannot prove durability or long-term comfort.",
        },
        {
          heading: "Separate fact from feel",
          body: "Weight variant, grip sizes, official flex, and listed tension range are factual specs. Words like crisp, dead, heavy, forgiving, or unstable are subjective and should be compared across multiple sources.",
        },
        {
          heading: "Respect source rights",
          body: "Community posts are valuable, but copying or translating review text without permission creates rights risk. IntoBadminton uses metadata summaries and links unless explicit rights allow more.",
        },
      ],
      cta: "Use reviews as evidence, then let your profile filter the shortlist.",
    },
    {
      slug: "beginner-racket-mistakes",
      updatedAt: "2026-04-28",
      category: "guides",
      title: "Three beginner racket mistakes that make badminton harder",
      dek: "Avoid buying a frame that fights your timing before your technique is ready.",
      story: {
        intro:
          "Avoid buying a frame that fights your timing before your technique is ready.",
        blocks: [
          {
            kind: "firstPerson",
            context: "What I see in club coaching",
            body:
              "Most of the new players I see at our club have made the same first-racket error I made years ago: they bought too stiff. An extra-stiff shaft does not 'play like a pro frame' for a beginner — it shortens clears, jars the elbow on off-centre contact, and quietly demoralises the player. A medium or flexible 4U fixes more bad sessions than any string change.",
          },
        ],
      },
      sections: [
        {
          heading: "Buying too stiff too early",
          body: "Extra-stiff shafts reward clean timing. For recreational and early club players, they can make clears shorter and mishits harsher. A little more flex often helps learning.",
        },
        {
          heading: "Ignoring total setup",
          body: "A head-heavy racket, high tension, thick grip, and slow shuttles can stack into a demanding setup. Change one variable at a time so you know what helped.",
        },
        {
          heading: "Overvaluing price",
          body: "The best beginner racket is not the most expensive pro frame. It is the racket that lets you repeat length, recover in defence, and play pain-free.",
        },
      ],
      cta: "Start with a profile-based recommendation, then demo if possible.",
    },
    {
      slug: "badminton-string-selector",
      updatedAt: "2026-04-28",
      category: "guides",
      title: "BG80, EXBOLT 63, or BG65: choosing strings by outcome",
      dek: "Strings change control, repulsion, comfort, and cost per session more than many players expect.",
      story: {
        intro:
          "Strings change control, repulsion, comfort, and cost per session more than many players expect.",
        blocks: [
          {
            kind: "firstPerson",
            context: "What changing one variable taught me",
            body:
              "The cleanest A/B I have ever done on my own setup was swapping BG65 for a livelier thin string and keeping everything else identical — same racket, same tension, same shuttle speed. The change in defensive blocks was immediate; the change in clears took two weeks to settle. That second timescale is the part that gets lost in single-session reviews and is why I trust 'week-three feel' more than 'week-one feel'.",
          },
        ],
      },
      sections: [
        {
          heading: "Start with what you want to fix",
          body: "If clears need help and defence feels late, a livelier thin string can add repulsion. If slices, drops, and net control are your priority, a rougher control string may be worth the extra effort. If you break strings often, durability and tension hold should outrank sound.",
        },
        {
          heading: "Match tension to level",
          body: "Higher tension can sharpen feedback, but it narrows the sweet spot and punishes late contact. Most club players get better ROI by changing two pounds at a time and logging week-one versus week-three feel.",
        },
        {
          heading: "Why we score strings separately",
          body: "A racket recommendation without string context is incomplete. IntoBadminton now treats strings as their own category because a forgiving racket with an unforgiving string can still feel wrong.",
        },
      ],
      cta: "Run the finder for string-specific recommendations.",
    },
    {
      slug: "badminton-shoe-fit-stability",
      updatedAt: "2026-04-28",
      category: "guides",
      title: "Badminton shoe fit: why width and stability beat brand loyalty",
      dek: "The best shoe is the one that locks your foot during lunges without creating pressure points.",
      story: {
        intro:
          "The best shoe is the one that locks your foot during lunges without creating pressure points.",
        blocks: [
          {
            kind: "firstPerson",
            context: "What stopped my own foot pain",
            body:
              "I went through three brands chasing 'recovery feel' before I accepted that the issue was width, not cushioning. A shoe a half size up made the toe room I needed but introduced heel slip on side-lunges; the actual fix was the same length in a wider last. Width is the one variable I now check before anything else — and the one almost no online review surfaces by default.",
          },
        ],
      },
      sections: [
        {
          heading: "Width is not just size",
          body: "Going longer to solve a narrow toe box can create heel slip and slower recovery. A better fit keeps the heel locked while leaving enough forefoot room for lateral lunges.",
        },
        {
          heading: "Protection has a weight cost",
          body: "Protective shoes often feel more stable and cushioned, but may not feel as quick as low-profile speed shoes. For knee, ankle, or heel comfort flags, the recommendation engine gives more credit to stability and cushioning.",
        },
        {
          heading: "Try movement, not standing",
          body: "Static comfort is not enough. Test split steps, side lunges, toe drags, and braking movements with the socks you actually use.",
        },
      ],
      cta: "Use foot width and comfort flags in the shoe finder.",
    },
    {
      slug: "badminton-bag-loadout",
      updatedAt: "2026-04-28",
      category: "guides",
      title: "What your badminton bag should carry for a normal club session",
      dek: "A good bag reduces friction: shoes, wet clothes, spare racket, grip, and shuttle storage should not fight each other.",
      story: {
        intro:
          "A good bag reduces friction: shoes, wet clothes, spare racket, grip, and shuttle storage should not fight each other.",
        blocks: [
          {
            kind: "firstPerson",
            context: "What I carry to club night",
            body:
              "My own club-night load is two rackets (current main plus a back-up strung at the same tension), Comfort Z3 shoes, a fresh shirt, two tubes of grip, and a tube of Aerosensa 30. The single highest-leverage bag upgrade for me was a separate wet compartment — before that, the played-in kit and the clean shirt cycled the same locker-room odour for a week.",
          },
        ],
      },
      sections: [
        {
          heading: "Capacity is workflow",
          body: "A two-racket commute bag is fine for casual games. A regular club night often needs more: shoes, towel, clean shirt, wet kit, water bottle, grips, and a spare racket.",
        },
        {
          heading: "Compartment design matters",
          body: "Shoe and wet compartments are not luxury features if you play after work or carry clean clothes. They keep odor and moisture away from rackets and electronics.",
        },
        {
          heading: "Why bag recommendations improve retention",
          body: "Bag content is a repeat-use habit. A loadout checklist gives players a reason to revisit before sessions, and it creates natural future content around replacement grips, shuttles, and seasonal refreshes.",
        },
      ],
      cta: "Run the finder for bag recommendations by session style.",
    },
    {
      slug: "used-racket-depreciation",
      updatedAt: "2026-04-28",
      category: "guides",
      title: "Used racket depreciation: how much value does badminton gear keep?",
      dek: "Resale value depends on brand demand, authenticity, generation, region, condition, and whether the model still has hype.",
      story: {
        intro:
          "Resale value depends on brand demand, authenticity, generation, region, condition, and whether the model still has hype.",
        blocks: [
          {
            kind: "firstPerson",
            context: "What I've watched move and what hasn't",
            body:
              "The two rackets I have sold on cleanest were both current-generation Yonex flagships with intact serial labels — the buyer pool was large and the price band was well-known. The slowest two to move were a previous-generation Victor and a racket with the original packaging gone. Brand familiarity in the buyer pool drives resale liquidity more than the racket's actual on-court quality, which is the part nobody warns you about before you spend €300 on something obscure.",
          },
        ],
      },
      sections: [
        {
          heading: "The big drivers",
          body: "Recognizable flagship Yonex, Victor, and Li-Ning models usually have better resale liquidity than obscure or entry-tier rackets. Cosmetic chips, clashes, missing serial confidence, and unknown stringing history reduce value quickly.",
        },
        {
          heading: "Why IntoBadminton shows estimates",
          body: "A higher purchase price can still be rational if the product keeps value and is easy to resell. The app now shows depreciation estimates as decision support, not as guaranteed market prices.",
        },
        {
          heading: "How to use the number",
          body: "Treat resale as a risk band. If two recommendations fit equally, the one with stronger resale liquidity may have better real cost of ownership.",
        },
      ],
      cta: "Compare recommendations with resale and depreciation visible.",
    },
    {
      slug: "yonex-astrox-88d-pro-vs-88s-pro-2024",
      updatedAt: "2026-04-29",
      category: "comparisons",
      title: "Yonex Astrox 88D Pro vs 88S Pro 2024: which 88 Pro fits your role",
      dek: "The 2024 third-generation 88 Pro twins share Namd Flex Force shafts but pull in opposite directions: 88D Pro for rear-court power, 88S Pro for front-court control. Here is how to pick.",
      story: {
        intro:
          "The 2024 third-generation 88 Pro twins share Namd Flex Force shafts but pull in opposite directions: 88D Pro for rear-court power, 88S Pro for front-court control. Here is how to pick.",
        blocks: [
          {
            kind: "methodology",
            headline: "Tested across club doubles sessions on the 88S Pro 2024 with 88D Pro side-by-side",
            context: "founderFirsthand",
            conditions: {
              strings: "BG80",
              tensionLbs: 27,
              opponents: "Division 4 Ireland doubles partners",
              courtSurface: "wood",
              venue: "Maynooth University, Dublin clubs",
            },
            comparators: [
              "Yonex Astrox 88D Pro 2024 (founder firsthand)",
              "Yonex Astrox 77 Pro (founder firsthand, previous)",
            ],
          },
          {
            kind: "firstPerson",
            context: "Which 88 I actually play",
            body:
              "I play the 88S Pro 2024 as my front-court doubles racket (4U/G5, BG80 at 26–28 lb). I have also tested the 88D Pro 2024 in pickup play. Same DNA, stiffer to drive, harder to sustain across a long match. For most amateur players I would still pick the 88S Pro of the two new colours unless rear-court attack is the explicit job.",
          },
        ],
      },
      sections: [
        {
          heading: "What changed in the 2024 reset",
          body: "Yonex retired the camel-gold 88D Pro after three years and replaced both 88 Pros with new colours that share the second-generation Namd Flex Force shaft, a Power Assist Bumper at the top of the frame, and the longer 10mm built-in T-joint. The new shaft snaps back faster than the camel-gold predecessor, the bumper redistributes mass for cleaner contact, and the joint adds a small amount of torsional stability. Both rackets retain the head-heavy attack heritage of the 88 Pro line, but they keep distinct personalities: the D is the back-court hammer, the S is the balanced control frame Yonex aims at front-court doubles and mixed.",
          glossaryLinks: [{ term: "Smash", id: "smash" }, { term: "Head-heavy", id: "head-heavy" }],
        },
        {
          heading: "Frame: narrower D, larger S",
          body: "The two frames are no longer identical. The 88D Pro 2024 has a slightly narrower frame than the original camel-gold version — strung at the same tension, you get higher net pressure and a stronger pocketing sensation. The 88S Pro frame is a step larger again, with a slightly shorter handle and overall length. Multiple BadmintonCN measurements (BadmintonCN reviewers, April 2024) put 4U 88D Pro samples around 84g unstrung with strung weights between 89.5g and 91.1g and balance points 305-308mm. A 4U 88S Pro sample measured 84.3g unstrung, 89.5g strung at 80 string and 26-28 lb, balance 301mm.",
        },
        {
          heading: "Shaft hardness: the 88D is stiffer",
          body: "Both shafts are stiffer than the older 77 Pro, but the D and S sit at different tiers. On shaft-deflection measurements published by the Chinese creator YuanShi (源式) — widely cited on BadmintonCN, lower = stiffer — the 88D Pro 2024 sits around 7.59, close to Yonex's hardest production shafts. The 88S Pro is in the same range (mid-7s on the same rig) but feels noticeably less crisp because of the thicker frame and the slightly longer dwell time it produces on contact. The result: a 88D player is rewarded for short, concentrated power strokes; a 88S player benefits from longer, controlled swings that load the shaft into the bigger frame.",
        },
        {
          heading: "Smash vs control: pick by role, not by ego",
          body: "If you are a rear-court doubles player or a singles player whose match-winning shot is the smash, the 88D Pro 2024 is the more direct upgrade. Compared with the camel-gold version, smash power is similar in absolute terms but continuity is better — you fatigue less across long rallies because the new shaft loads and unloads faster. If you play front-court doubles or mixed and your job is to organise the rally with drops, hairpins, pushes, and precise placement, the source comparison frames the 88S Pro 2024 as one of the strongest control-balance rackets it reviewed, ahead of Halbertec 8000 / 9000 / 9000 Power and Arcsaber 11 Pro for that reviewer's combined control and smash-quality criteria.",
        },
        {
          heading: "Founder firsthand notes",
          body: "I (Rui Su, Division 4 Ireland) currently play the 88S Pro 2024 as my main racket for front-court doubles. It feels close to the Astrox 77 Pro I used previously but with a stiffer shaft — better when you have the timing to load it, more demanding when you do not. I have also held the 88D Pro 2024 and tested it against the 77 Pro: the 88D is harder to drive on continuous attack, and for most amateur players I would still recommend the 77 Pro over the 88D unless they specifically need rear-court power. The 88S Pro is the more universally enjoyable of the two new colours.",
        },
        {
          heading: "Who should buy which",
          body: "Buy the 88D Pro 2024 if: you compete in men's doubles back court, you smash often as a primary attack pattern, your shoulder and core are conditioned for stiff-shaft frames, and you have time on court to adapt. Buy the 88S Pro 2024 if: you play mixed doubles or front-court doubles, you organise rallies through placement rather than raw smash, you valued the control feel of the 77 Pro and want a stiffer shaft tier above it, or you need one frame that can do both singles and doubles competently. Either way, plan to spend a few sessions adjusting your timing — both are pro-tier shafts.",
        },
      ],
      cta: "Run the finder if you are choosing your next 88 Pro — we score it against your level, role, and budget.",
    },
    {
      slug: "yonex-nanoflare-speed-series-explained",
      updatedAt: "2026-04-29",
      category: "comparisons",
      title: "Yonex Nanoflare 700, 700 Pro, and 1000Z: the speed series decoded",
      dek: "Three speed rackets, three different jobs. Here is who each one is for, and why the lighter sample sometimes smashes harder.",
      story: {
        intro:
          "Three speed rackets, three different jobs. Here is who each one is for, and why the lighter sample sometimes smashes harder.",
        blocks: [
          {
            kind: "methodology",
            headline: "Founder firsthand across the Nanoflare line — current doubles racket and rotation",
            context: "founderFirsthand",
            conditions: {
              strings: "BG80",
              tensionLbs: 27,
              opponents: "Division 4 Ireland doubles partners",
              courtSurface: "wood",
              venue: "Maynooth University, Dublin clubs",
            },
            comparators: [
              "Yonex Nanoflare 1000Z (founder firsthand, current doubles)",
              "Yonex Nanoflare 700 Pro (founder firsthand)",
              "Yonex Nanoflare 700 Play 5U (founder firsthand)",
            ],
          },
          {
            kind: "firstPerson",
            context: "What I play in this line",
            body:
              "I currently use the Nanoflare 1000 Z (4U/G5, BG80 26–28 lb) as my men's-doubles racket and have tested the 700 Pro side-by-side at coach sessions. The 1000 Z is sharper on drives but harder to generate raw power from; the 700 Pro is the more forgiving step up from a sugar-water frame. Picking between them is mostly the question of whether you would rather work harder for the smash or work harder for the drive timing.",
          },
        ],
      },
      sections: [
        {
          heading: "Why the Nanoflare line is hard to shop",
          body: "Yonex has packed the Nanoflare line with so many SKUs that buyers commonly mix up the entry-level 700, the 700 Pro, the 800 Pro, and the flagship 1000Z. They share head-light balance and aerodynamic frame design, but the shaft hardness, frame edge profile, and bend-point location differ enough that one of these rackets will feel completely different from the next on court. This piece walks through the three you are most likely to consider — 700, 700 Pro, and 1000Z — and frames each in terms of who it actually serves.",
          glossaryLinks: [{ term: "Smash", id: "smash" }, { term: "Drive", id: "drive" }, { term: "Head-light", id: "head-light" }],
        },
        {
          heading: "Nanoflare 700: the sugar-water front-court racket",
          body: "The non-Pro Nanoflare 700 is a defining example of what Chinese reviewers call a sugar-water (糖水) racket: easy to drive, broad audience, soft-medium shaft, head-light feel. A BadmintonCN reviewer describes it as the racket his wife switched to from a Yonex NS9000s and stuck with — and the NS9000s is no joke. It rewards a fast swing without demanding a powerful one, and the 5U variant is particularly approachable for beginners and players moving up from entry frames. The trade-off: shaft feedback is less clear, and the bend point sits closer to the handle, which makes downward pressure on smashes harder to apply.",
        },
        {
          heading: "Nanoflare 700 Pro: the Pro upgrade that does not punish you",
          body: "The 2024 Nanoflare 700 Pro is technically only marginally stiffer than the regular 700 — BadmintonCN reviewers describe the shaft difference as one tier at most — but Yonex moved the bend point higher and added the SF Filter and enhanced Sonic Flare frame system. The result: clearer feedback, faster snapback, easier high clears, and noticeably better smash confidence than the regular 700. Founder firsthand (Rui, Div 4 IE): the 700 Pro is genuinely fast — pair it with thinner strings like Aerobite or BG66 Ultimax to maximize the speed advantage rather than thicker durability strings.",
        },
        {
          heading: "Sample variance is real",
          body: "If you are picking a Nanoflare 700 Pro from a stack at a stringer, weigh it. A BadmintonCN reviewer weighed three 4U/G5 samples and got 83.6g, 84.8g, and 85.8g unstrung — over 2g of variance from the same SKU. He kept the lightest sample. Even more interesting: he reports that lighter sample with a lower balance point still smashes harder than a heavier non-Pro Nanoflare 700, suggesting that in this line, shaft hardness matters more than gram-level mass for attack quality. This is also a reminder that aggregate review-based recommendations cannot tell you exactly how the racket in your hand will feel.",
        },
        {
          heading: "Nanoflare 1000Z: the hexagonal warrior",
          body: "The 1000Z is the flagship and a different kind of racket. Small frame, hard shaft (around two tiers stiffer than the 700 Pro shaft), DR carbon for a touch of pocketing feel, and the strongest end-speed and pointing accuracy described in this Nanoflare source set. BadmintonCN reviewers frame it as one of the most complete speed rackets in their comparison, alongside the Victor Auraspeed 100X SE. Founder firsthand (Rui, Div 4 IE): I currently play the 1000Z as my men's doubles racket. It is extremely fast on drives and defence, but power is harder to generate than from a comparable head-heavy frame. With good timing and strength, it can be a doubles weapon. Without those, it can feel lifeless.",
        },
        {
          heading: "Which one is for you",
          body: "Pick the Nanoflare 700 if you are upgrading from an entry-level frame, you are a player whose main need is a relaxed front-court doubles or mixed racket, or you want a forgiving frame to share with someone less experienced. Pick the Nanoflare 700 Pro if you are an intermediate player who wants the Nanoflare feel with sharper feedback and more attack. Pick the 1000Z if you are a competitive doubles player with the technique to load a stiff shaft, who prizes drive speed and counter-attack over raw rear-court smash. If raw smash is your thing, leave this whole line and look at the Astrox 88D Pro 2024 instead.",
        },
      ],
      cta: "Use the finder to compare any two of these rackets head-to-head against your level, role, and budget.",
    },
    {
      slug: "yonex-nanoflare-800-pro-and-victor-hs-plus",
      updatedAt: "2026-04-29",
      category: "comparisons",
      title: "Yonex Nanoflare 800 Pro vs Victor Auraspeed HS Plus: two takes on extreme speed",
      dek: "Both have hard shafts and small frames. Both want fast doubles. They feel completely different on contact — here is why.",
      story: {
        intro:
          "Both have hard shafts and small frames. Both want fast doubles. They feel completely different on contact — here is why.",
        blocks: [
          {
            kind: "methodology",
            headline: "Hit-test both at coach sessions with founder firsthand cross-reference to NF1000Z",
            context: "observer",
            conditions: {
              opponents: "Coach lineage (former Malaysia national-team) + Division 4 doubles partners",
              courtSurface: "wood",
              venue: "Maynooth University, Dublin clubs",
            },
            comparators: [
              "Yonex Nanoflare 1000Z (founder firsthand, current doubles)",
            ],
            sourceAttribution:
              "BadmintonCN cross-brand comparison reviews; observer commentary by Rui Su from hit-test sessions, no extended court time on either frame.",
          },
          {
            kind: "firstPerson",
            context: "What I'd test before committing",
            body:
              "I have not played either as a main, but I have hit with both at coach sessions. The 800 Pro's metallic ring on contact is unmistakable and divides opinion immediately — try one in hand before paying for it. The HS Plus rewards more deliberate force loading; my coach (former Malaysian national-team) preferred it for that exact reason, which tells you who it really suits.",
          },
        ],
      },
      sections: [
        {
          heading: "Two flagships, two philosophies",
          body: "The 2024 Yonex Nanoflare 800 Pro and the Victor Auraspeed HS Plus are both built for fast-pace men's doubles. They sit close on paper: head-light or even balance, hard shafts, compact frames, similar weights. They are also both used by world-tour players. But step on court with both and the contact feel diverges immediately — one is crisp-elastic with an audible metallic ring, the other is a denser hardened-shaft profile that asks for more active force. Picking the wrong one wastes a serious chunk of money.",
          glossaryLinks: [{ term: "Drive", id: "drive" }],
        },
        {
          heading: "Nanoflare 800 Pro: crisp-elastic by design",
          body: "Yonex went to extremes on the 800 Pro. The frame uses a wing-shape break-line with sharp edges, a 78-hole stringbed (vs the usual 76), and a copper foil at the frame base for additional rigidity. Per BadmintonCN measurements, a 4U/G5 sample weighs 85.2g unstrung, 89.7g with the underbase removed, balance 301mm. The signature is what reviewers call 脆弹 — crisp-elastic — meaning the shuttle is fired off the strings almost instantly, with barely any dwell time. Off-string speed is faster than both the 100XSE (Victor) and 1000Z. Frame anti-torsion is excellent. The Pro variant ships with a metallic ringing tone on contact that some players love and some find too sharp.",
        },
        {
          heading: "Where the 800 Pro wins and loses",
          body: "Strengths: drives, flat exchanges, reflex defence, sharp smash placement. The fast snapback turns short power strokes into fast shuttles. Best for fast-pace men's doubles and back-court attack from a speed profile. Weaknesses: control on net play is not its strength — the lack of pocketing means drops can fly slightly higher than intended, and cross-court drops are easier to send long. Rear-court control is also weaker than the 1000Z because the 800 Pro skips the DR carbon used in the flagship. Higher entry threshold than the Nanoflare 700 Pro.",
        },
        {
          heading: "Auraspeed HS Plus: a hardened Hayabusa",
          body: "Victor's Auraspeed HS Plus uses WES 3.0 shaft tech and Victor's hardest production shaft tier. BadmintonCN reviewers describe it as a hardened version of the Hayabusa SE Black Gold: harder shaft, faster off-string, more rigid feedback. Used by Hendra Setiawan and H.S. Prannoy. A 4U sample measures 88.9g with the underbase removed, balance 304mm — almost identical mass and balance to a 4U Nanoflare 1000Z. But the contact feel is different: more transparent and force-driven where the 1000Z has a slight pocketing pause. Sweet spot is small. Off-sweet-spot defence is weaker than the 100XSE.",
        },
        {
          heading: "Pick by what you actually do",
          body: "Pick the 800 Pro if: you want maximum drive speed, you play a lot of fast doubles, you do not depend on net-play touch, and you accept some give on rear-court control in exchange for that speed. Pick the HS Plus if: you have the active force to drive a very stiff shaft, you want a back-court smash profile inside a speed-racket form factor, and you find Yonex frames generally too crisp and prefer Victor's denser feel. If you find yourself unsure, the 1000Z (Yonex) and 100X SE (Victor) are both more forgiving and either will likely serve you better than these two extremes.",
        },
        {
          heading: "What about price and entry threshold",
          body: "Both rackets sit in the 240-280 USD range new in most markets, with the 800 Pro typically slightly more expensive. Neither is a sugar-water frame: a BadmintonCN reviewer who plays 100X SE, 1000Z, and similar speed rackets daily calls the HS Plus harder to drive than any of his usual rotation. If you are a Division 5/6 Irish-tier or 中羽 4-ish (BadmintonCN) player, you will likely benefit more from a 700 Pro or Halbertec 8000 first, and graduate to one of these only when your timing is reliable. There is no shame in waiting.",
        },
      ],
      cta: "Compare these two side by side in our compare tool with your full profile.",
    },
    {
      slug: "li-ning-bladex-800-speed-tough-elastic",
      updatedAt: "2026-04-29",
      category: "reviews",
      title: "Li-Ning Bladex 800 Speed: the tough-elastic answer to Yonex and Victor",
      dek: "Most speed rackets fire crisp-elastic. Bladex 800 Speed deliberately does not — and that may be exactly the racket you are missing.",
      story: {
        intro:
          "Most speed rackets fire crisp-elastic. Bladex 800 Speed deliberately does not — and that may be exactly the racket you are missing.",
        blocks: [
          {
                      kind: "methodology",
                      headline: "Observer methodology — source review with Maynooth/Dublin club-ecosystem cross-reference",
                      context: "observer",
                      conditions: {
                        opponents: "Division 4 Ireland practice partners",
                        courtSurface: "wood and synthetic court mat",
                        venue: "Maynooth University, multiple Dublin clubs",
                      },
                      comparators: ["Li-Ning Halbertec 9000"],
                      sourceAttribution:
                        "BadmintonCN community source reviews; observer commentary by Rui Su drawn from Maynooth University and Dublin club ecosystem context.",
                    },
          {
            kind: "firstPerson",
            context: "Where I'd place it on the speed-frame shelf",
            body:
              "I have not played the Bladex 800 Speed as a main — I'm on a Nanoflare 1000 Z — but it sits in the bracket I shop in for doubles speed frames (Yonex Nanoflare 800 Pro, Victor Auraspeed HS Plus). For Li-Ning-loyal players who already like the brand's shaft feel, it is the natural cross-shop. For anyone willing to swap brands, I would demo all three side-by-side rather than read three separate reviews.",
          },
        ],
      },
      reviewSummary: {
        verdict:
          "A control player's speed racket: quick enough for doubles, but calmer than most crisp-elastic alternatives.",
        bestFor: [
          "Control-first doubles players",
          "Stiff-shaft users wanting dwell",
          "Li-Ning fans avoiding Yonex pricing",
        ],
        avoidIf: [
          "You want maximum drive speed",
          "You need sugar-water forgiveness",
        ],
        setupNotes: [
          "4U/G6 source sample around 90.8g strung, 299mm balance.",
          "YuanShi stiffness around 7.83; source torsion reading was notably strong.",
        ],
        sourceHook:
          "The source review is interesting because it argues a speed racket can win through dwell and control, not just faster ejection.",
      },
      sections: [
        {
          heading: "What 'tough-elastic' actually means",
          body: "Speed rackets in 2024-2026 have largely converged on a crisp-elastic design philosophy: hard shaft, low dwell time, near-instant ejection. The Yonex Nanoflare 800 Pro, Victor Auraspeed Hayabusa, and Yonex 100X SE all live there. The Li-Ning Bladex 800 Speed (锋影 800 Speed), launched 2026, deliberately steers in the opposite direction. Reviewers describe its feel as 韧弹 — tough-elastic — meaning the shuttle has a brief loading and dwell phase before release, and the frame stores and returns energy more like a controlled spring than a snapping whip. The result is a speed racket that feels closer to a balance racket on touch shots, while still moving fast enough to compete on drives.",
        },
        {
          heading: "Specs and stiffness",
          body: "BadmintonCN reviewers measured a 4U/G6 Bladex 800 Speed at 85.2g unstrung, 90.8g with grip and string (underbase still on), balance 299mm. A 3U/G5 came in at 89g unstrung, 91.4g with the underbase removed, balance 302mm. On YuanShi's (源式) shaft-deflection rig (lower = stiffer; YuanShi is a Chinese badminton creator who tests rackets on a professional measurement machine), the 800 Speed measures around 7.83 — much stiffer than the previous Bladex 800 New (around 8.58). Frame torsion measures 18.72 — the best of any speed racket tested in BadmintonCN reviewers' roundup, even better than the 99 Pro 2 at 19.87. The frame uses M46X carbon to balance stiffness with elasticity.",
        },
        {
          heading: "Where the dwell time pays off",
          body: "The longer dwell of the 800 Speed gives you something the crisp-elastic alternatives cannot: an extra fraction of a second to redirect, slow, or place a shuttle. Drops sit closer to the net. Cross-court hairpins are easier to control. Sliced clears land more reliably. Smashes fire more on placement than on raw speed, but the placement is sharp. For control players who want speed, this is genuinely interesting territory. For pure speed-attack players who already know they want a Nanoflare 800 Pro or 100X SE, this is the wrong racket.",
        },
        {
          heading: "What the 800 Speed asks of you",
          body: "Tough-elastic loading rewards fast and concentrated swing technique. If your swing is slow or your force is diffuse, the 800 Speed will feel mushy — you give it force and the shuttle returns soft. A BadmintonCN reviewer explicitly warns players who already own and like the Bladex 800 New (which is much softer at 8.58) not to switch on impulse: the 800 Speed will likely feel demanding. The closest comparison from another brand is the Astrox 88S Pro 2024, which has a similar shaft hardness but lives in the balance-racket space and has more pocketing depth.",
        },
        {
          heading: "Buying guidance",
          body: "Buy the Bladex 800 Speed if: you play organised control rallies and have the swing speed to load a stiff shaft, you want a Li-Ning frame with M46X carbon (which is described in the source notes as a step up in feel), and you are explicitly tired of the crisp-elastic pattern. Skip it if: you want maximum off-string speed (the Yonex 800 Pro is faster in the source comparison), you want pure rear-court attack (the Astrox 88D Pro 2024 is stronger in the source comparison), or you are not yet driving stiff shafts reliably (the Bladex 800 New is the friendlier sibling). It is usually cheaper than the Yonex flagship speed rackets, around 200-240 USD depending on region, which is also a practical reason to consider it.",
        },
      ],
      cta: "Add the Bladex 800 Speed to compare against your current racket — we surface the trade-offs explicitly.",
    },
    {
      slug: "li-ning-halbertec-8000-vs-9000-vs-9000-power",
      updatedAt: "2026-04-29",
      category: "comparisons",
      title: "Li-Ning Halbertec 8000 vs 9000 vs 9000 Power: which Halberd is yours",
      dek: "Three rackets in the same family, three completely different jobs. The 8000 is the amateur favorite. The 9000 is misunderstood. The 9000 Power is a speed racket in disguise.",
      story: {
        intro:
          "The trap with the Halbertec line is that the names look like a staircase. Many buyers read 8000, 9000, and 9000 Power as good, better, best. On court the story is less tidy: one racket protects ordinary club timing, one chases speed but gives up rear-court weight, and one asks for a much cleaner hit than the family name suggests.",
        blocks: [
        {
          kind: "methodology",
          headline: "Observer notes from clubmate switching patterns across the Halbertec line",
          context: "observer",
          conditions: {
            opponents: "Division 4 Ireland practice partners; coach lineage commentary",
            courtSurface: "wood and synthetic court mat",
            venue: "Maynooth University, multiple Dublin clubs",
          },
          comparators: [
            "Yonex Astrox 88D Pro (founder firsthand)",
            "Yonex Arcsaber 11 Pro (founder firsthand, current singles)",
          ],
          sourceAttribution:
            "BadmintonCN community comparison reviews; observer commentary by Rui Su drawn from clubmate switching patterns at Maynooth University and Dublin clubs (no personal court time on the Halbertec line).",
        },
        {
          kind: "firstPerson",
          context: "Where I would place the Halbertec line",
          body:
            "I have not played any of the Halbertecs as a main racket, but it is one of the lines I get asked about most — the staircase naming (8000, 9000, 9000 Power) suggests a tiered upgrade path that the on-court reality doesn't deliver. From watching club teammates cycle through these, my advice is to ignore the numbers and demo on shaft hardness and swing weight.",
        },
          {
            kind: "facts",
            heading: "Tested context",
            items: [
              {
                label: "Source basis",
                value:
                  "Original BadmintonCN markdown review plus IntoBadminton buyer framing.",
              },
              {
                label: "Main setup",
                value:
                  "Recent 4U/G5 samples, N65 string at 26-28 lb, compared against 88S Pro, 88D Pro, and speed frames.",
              },
              {
                label: "Measurement lens",
                value:
                  "YuanShi shaft-deflection numbers are treated as creator data, not official manufacturer specifications.",
              },
            ],
          },
          {
            kind: "callout",
            label: "What surprised us",
            title: "The safest buy is not the newest one",
            body:
              "The 8000 remains the article's anchor because it gives ordinary amateur players the easiest path to length, control, and a useful smash. The 9000 Power is more exciting, but it narrows the timing window and behaves more like a speed racket than a forgiving control frame.",
          },
          {
            kind: "comparison",
            heading: "Court feel in one table",
            columns: ["8000", "9000", "9000 Power"],
            rows: [
              {
                label: "Best role",
                values: [
                  "Club all-round control",
                  "Front-court speed",
                  "Advanced doubles speed-attack",
                ],
              },
              {
                label: "Main risk",
                values: [
                  "Not the sharpest in fast exchanges",
                  "Rear-court hit can feel underpowered",
                  "Harder shaft asks for cleaner force",
                ],
              },
              {
                label: "Buyer read",
                values: [
                  "Best first serious Halbertec",
                  "Only buy for a specific speed need",
                  "Buy after demo or trusted weighing",
                ],
              },
            ],
          },
          {
            kind: "callout",
            label: "Who should ignore the hype",
            title: "Do not buy 9000 Power as an 8000 upgrade",
            body:
              "If you like the 8000 because it gives you length when you are late, the 9000 Power may feel like a punishment, not a premium step. It improves crispness and pointing, but it does not make the shuttle easier to lift from a compromised position.",
          },
          {
            kind: "verdict",
            heading: "Final buying call",
            body:
              "Treat this as a style choice rather than a price ladder. The 8000 is still the sensible default; the 9000 is a specialist speed-control experiment; the 9000 Power is for players who already know they like stiff, fast, low-dwell frames.",
            bullets: [
              "Best alternative to 9000 Power for pure speed: Yonex Nanoflare 1000Z or Victor Auraspeed 100X SE.",
              "Best alternative to 8000 for softer attack help: Li-Ning AxForce 90 New.",
              "Best buying habit: weigh the exact sample before stringing if the shop allows it.",
            ],
          },
        ],
      },
      sections: [
        {
          heading: "The Halbertec line is not a smooth upgrade path",
          body: "Many buyers assume the Halbertec 9000 is a strict upgrade over the 8000, and the 9000 Power is another tier above that. This is wrong. The 8000 is a control-leaning balance racket with a soft-medium shaft and a large fluid-box frame. The 9000 is a speed-leaning racket with a thinner frame and stiffer shaft. The 9000 Power, despite the name, is not a Halbertec 8000 successor — it is a refined version of the 9000 with even more shaft stiffness, marginally more head weight, and more crisp/snap. Picking by name alone leads to disappointment.",
          glossaryLinks: [{ term: "Smash", id: "smash" }],
        },
        {
          heading: "Halbertec 8000: the amateur all-rounder",
          body: "A BadmintonCN reviewer has called the Halbertec 8000 the racket he has recommended more than any other on the forum, and he still owns two. It is around 400-500 USD cheaper than the Yonex Astrox 88S Pro 2024 and 600-700 USD cheaper than the Arcsaber 11 Pro, and yet it competes on smash quality (especially with the underbase removed) and on rear-court solidity. The 6.8mm hard-flex shaft is moderate enough that most amateur players can drive it — around 8.33 on YuanShi's deflection rig (a Chinese badminton creator's measurements widely cited on BadmintonCN). If you do not yet know your style or are buying your first serious racket above the entry tier, this is the safe pick.",
        },
        {
          heading: "Halbertec 9000: thinner frame, faster swing, weaker rear",
          body: "The 9000 was marketed as a control king, but reviewers disagree with that positioning. The 9000 has a thinner frame than the 8000 (lower wind resistance, faster swing) and a stiffer shaft (around 7.92 on YuanShi's deflection rig, vs the 8000's 8.33), but on hard smashes the combination produces what BadmintonCN reviewers call 卸力 — a loss of power compared with other hard-shaft rackets. He attributes this to the relatively soft frame paired with the harder shaft: the frame absorbs energy that should travel to the shuttle. The 9000 is faster and more accurate at front court than the 8000. It is also less solid at the rear court. If you are choosing between 8000 and 9000 by hype alone, you may end up with the wrong one.",
        },
        {
          heading: "Halbertec 9000 Power: a speed racket disguised as a balance racket",
          body: "The 9000 Power (战戟 9000P) launched 2025 takes the 9000 thinner frame and makes the shaft even stiffer. Around 7.65 on YuanShi's deflection rig — same range as the Astrox 88D Pro 2024 (around 7.59) and 88S Pro 2024 on the same rig. Frame is nearly identical to the 9000, with a minor wind-cutting tweak at the head. Slightly more head weight than the 9000. The 卸力 problem is mostly fixed. But the BadmintonCN reviewer's verdict is direct: the 9000 Power is functionally a speed racket. It can be substituted by his other speed rackets (Yonex 1000Z, Yonex 800 Pro, Victor 100X SE) without much loss. The 8000 cannot — its pocketing and balance character are unique within Li-Ning's lineup.",
        },
        {
          heading: "Sample variance: weigh before you buy",
          body: "If you order a 9000 Power online, weigh it on arrival. A BadmintonCN reviewer weighed 10 brand-new 4U samples and got: 5 around 82.5g unstrung, 3 around 83.5g, 1 at 84g, 1 at 84.5g. Half the samples weigh in at the very low end — meaningfully lighter than the average attack racket and noticeably different in swing feel. Buyer beware. This kind of variance is one of the strongest arguments for buying from a stringer or shop that lets you handle the racket before commitment.",
        },
        {
          heading: "Final pick guide",
          body: "Buy the Halbertec 8000 if: you are an amateur or club-league player, you want a single racket that does not punish wrong choices, and you want best-in-budget smash and rear-court performance. Buy the Halbertec 9000 if: you specifically prioritize front-court speed and accept weaker rear-court attack — but honestly consider whether a Bladex 800 Speed or Yonex 700 Pro might serve the same need better. Buy the Halbertec 9000 Power only if: you are an advanced doubles player who already drives stiff shafts comfortably, and you specifically want a Li-Ning speed racket inside the Halbertec brand language.",
        },
      ],
      cta: "Compare any two Halberds in our compare tool — fit-score and rationale render side by side.",
    },
    {
      slug: "li-ning-axforce-90-new-vs-axforce-80-and-yonex-88dp",
      updatedAt: "2026-04-29",
      category: "comparisons",
      title: "Li-Ning AxForce 90 New vs AxForce 80 and Yonex Astrox 88D Pro: head-heavy attack rackets compared",
      dek: "Three rackets aimed at the same job — back-court power. They reward different swings and different player styles. Here is how to pick.",
      story: {
        intro:
          "Three rackets aimed at the same job — back-court power. They reward different swings and different player styles. Here is how to pick.",
        blocks: [
          {
                      kind: "methodology",
                      headline: "Observer methodology — source review with Maynooth/Dublin club-ecosystem cross-reference",
                      context: "observer",
                      conditions: {
                        opponents: "Division 4 Ireland practice partners",
                        courtSurface: "wood and synthetic court mat",
                        venue: "Maynooth University, multiple Dublin clubs",
                      },
                      comparators: ["Li-Ning Halbertec 9000"],
                      sourceAttribution:
                        "BadmintonCN community source reviews; observer commentary by Rui Su drawn from Maynooth University and Dublin club ecosystem context.",
                    },
          {
            kind: "firstPerson",
            context: "How I anchor the three-way",
            body:
              "The 88D Pro is the one in this three-way I have actually played. It sits at the more demanding end of head-heavy attack. From watching club teammates cycle through the AxForce 90 New and 80, the 90 New plays closer in personality to the 88D Pro than the 80 does. If you want the 88D Pro experience without the Yonex price premium, the 90 New is the closer match.",
          },
        ],
      },
      sections: [
        {
          heading: "Why this comparison matters",
          body: "The Li-Ning AxForce series (formerly known by its Chinese name 雷霆 / Thunder, now consistently labelled AxForce in English markets) and the Yonex Astrox 88D Pro 2024 are two prominent head-heavy attack racket lines in the source comparison. Both lines compete head-to-head for tournament players who want a smash-focused weapon. The AxForce 90 New is presented as the flagship of the Li-Ning line and uses Li-Ning's Thunder Tech platform with M46 and T1100 carbon. The AxForce 80 is the easier-driving sibling. The Astrox 88D Pro 2024 is the cross-brand benchmark for many serious smash-focused players.",
          glossaryLinks: [{ term: "Head-heavy", id: "head-heavy" }, { term: "Smash", id: "smash" }],
        },
        {
          heading: "AxForce 90 New: Li-Ning's strongest shaft to date",
          body: "BadmintonCN reviewers call the AxForce 90 New shaft Li-Ning's strongest in their source comparison. The shaft is 6.4mm thick — thicker than the 6.2mm of the AxForce 90 Dragon-Tiger predecessor — but the construction balances permeability, full elasticity, and balanced hardness. The source review describes a forgiving sweet spot for a small frame and strong anti-torsion behaviour even with the thin shaft. A 4U sample measures 89.5g with the underbase removed, balance 304mm. The Thunder Technology platform is presented as helping players transition from defence to attack quickly, and the source impression says the rapid recovery supports continuous attack.",
        },
        {
          heading: "AxForce 80: the sugar-water sibling",
          body: "The AxForce 80 lives below the 90 New as the easier-driving sugar-water option in the line. A 4U measures 89.2g with the underbase removed, balance 304mm — same balance as the 90 New, but heavier swing weight, softer shaft, and less crisp feel. Stronger one-shot smash for players who already lean on head weight to generate power; weaker on continuous attack and on barely-defended balls. A BadmintonCN reviewer plans to retire his AxForce 80 in favor of the 90 New across the board, but says the 80 stays as the more entry-friendly option for amateurs who specifically want pure head-heavy feel without the demands of the 90 New shaft.",
        },
        {
          heading: "Yonex Astrox 88D Pro 2024: the cross-brand benchmark",
          body: "The Yonex Astrox 88D Pro 2024 is the cross-brand reference. Around 7.59 on YuanShi's shaft-deflection rig (Chinese creator measurements widely cited on BadmintonCN; lower = stiffer) — slightly stiffer than the AxForce 90 New on the same rig. A BadmintonCN reviewer ranks it as the strongest 2024 attack racket in his collection on overall package: top-tier shaft, transparent power transmission, lower swing weight than peers, and ranked above the original 88DP camel-gold and even the Astrox 100ZZ. Versus the AxForce 90 New: the 88D Pro 2024 edges it on raw rear-court attack, off-string speed, feedback clarity, and pointing accuracy. The AxForce 90 New responds with better frame pocketing for delicate net shots and drops.",
        },
        {
          heading: "Pick by hand profile, not just by smash power",
          body: "If you want pure rear-court speed and clarity, the 88D Pro 2024 wins on most measures. If you want a more rounded attack racket that handles drops and net play with more pocketing, the AxForce 90 New is the better fit. If you have not yet developed the shaft-loading technique for either, start with the AxForce 80 — it is more forgiving and still meaningfully head-heavy. None of these are good choices for pure speed-attack: if you want fast-pace doubles drives, look at the Yonex 1000Z, Victor 100X SE, or Halbertec 9000 Power instead.",
        },
        {
          heading: "Founder firsthand notes",
          body: "I (Rui Su, Division 4 Ireland) have not personally played the AxForce line, so the editorial weight on this article comes from BadmintonCN reviewers' measurements plus my own framing of what the comparisons mean for amateur and competitive players. I have played the Astrox 100ZZ and 88D Pro and found both demanding; if you find the 100ZZ punishing, the AxForce 90 New is likely a more comfortable home than the 88D Pro 2024 even though the Yonex has slightly stronger absolute attack. Try in person before you commit to either flagship.",
        },
      ],
      cta: "Use the finder with smash-heavy or singles-attack preferences and we score these three for your level and budget.",
    },
    {
      slug: "yuan-style-shaft-hardness-explained",
      updatedAt: "2026-05-05",
      category: "guides",
      title: "YuanShi shaft hardness: what one Chinese badminton creator's testing rig actually tells you",
      dek: "YuanShi (源式) is not a scientific protocol — it's the handle of a Chinese badminton creator who measures rackets on a professional shaft-deflection machine and posts the numbers. Here is what they mean, what they don't, and how to use them when shopping.",
      story: {
        intro:
          "YuanShi (源式) is not a scientific protocol — it's the handle of a Chinese badminton creator who measures rackets on a professional shaft-deflection machine and posts the numbers. Here is what they mean, what they don't, and how to use them when shopping.",
        blocks: [
          {
            kind: "firstPerson",
            context: "Why I cite YuanShi numbers carefully",
            body:
              "YuanShi (源式) shaft-deflection measurements are extremely useful for comparing two rackets' shaft hardness directly, but the absolute values are tied to that specific rig and do not translate to BWF or manufacturer standards. I cite them as relative ordering across compared rackets, not as a portable spec — that is the same way the BadmintonCN reviewers I follow handle them.",
          },
        ],
      },
      sections: [
        {
          heading: "What YuanShi actually is",
          body: "YuanShi (源式) is the handle of a Chinese badminton creator who posts racket measurements on Douyin (the Chinese TikTok) and BadmintonCN. They are not a brand, a lab, or a standards body. They use a commercially available shaft-deflection machine — clamp the shaft, apply a standardized force, read the deflection in millimeters — and publish the numbers along with weight, balance, and torsion measurements for popular rackets. The numbers got cited so often on BadmintonCN that 'Yuan number' or 'YuanShi number' became forum shorthand for 'the deflection figure published by that creator.' It is one independent creator's measurement rig, not an industry standard or manufacturer-published specification.",
        },
        {
          heading: "Why brand spec sheets aren't enough",
          body: "Yonex labels shafts Stiff or Extra Stiff. Victor uses similar text labels. Li-Ning uses Hard or Hi-Flex. None of these scales line up between brands — a Yonex Stiff is not the same as a Victor Stiff. This makes cross-brand racket comparison genuinely difficult unless you have all the rackets in your hands at once. So when forum reviewers want to compare, say, a Yonex Astrox 88D Pro 2024 against a Li-Ning Halbertec 9000 Power, they reach for one of the few independent measurement sources that covers both brands. YuanShi's numbers are popular precisely because they are consistent within their own dataset — same machine, same operator, same procedure — even if they are not authoritative.",
        },
        {
          heading: "How to read the numbers",
          body: "YuanShi's deflection numbers typically run between 6 and 9. Lower means the shaft deflected less under the standard force, i.e. it's stiffer. Higher means more deflection, i.e. softer. So a shaft published at 6.71 (e.g. an early Yonex Astrox 100ZZ sample) is harder than one at 8.33 (e.g. a Li-Ning Halbertec 8000 sample). Within YuanShi's own measurements, the ordering is generally consistent and useful. Across labs, it is not — another rig with a different clamp, force, or measurement point will give different absolute numbers, even if the relative ordering of rackets is similar.",
        },
        {
          heading: "Commonly cited numbers (creator-published, not official)",
          body: "Numbers seen on BadmintonCN attributed to YuanShi's rig, ordered stiffest to softest: Yonex Astrox 100ZZ around 6.71, Yonex Astrox 99 Pro 2 around 7.43, Yonex Astrox 88DP New Color around 7.59, Li-Ning Halbertec 9000 Power around 7.65, Li-Ning Bladex 800 Speed around 7.83, Yonex Arcsaber 11 Pro around 7.86, Li-Ning Halbertec 9000 around 7.92, Yonex Astrox 88SP New Color in the 7.5-7.6 range, Yonex Astrox 100ZZ Axelsen (VA) edition around 8.23, Li-Ning Halbertec 8000 around 8.33, Li-Ning Bladex 800 New around 8.58. These are creator-published numbers, not manufacturer specs. We cite them because they are widely referenced, not because they are authoritative.",
        },
        {
          heading: "What the number does and does not tell you",
          body: "What it tells you: roughly how much active force you need to flex the shaft. Shafts under 7.5 require concentrated, fast power strokes — they reward technique and punish soft swings. Shafts above 8.0 are forgiving for amateur players and recover well from imprecise force. Shafts at 8.5 or higher are sugar-water by design. What the number does NOT tell you: how the frame transmits that energy, where the bend point sits, whether the racket is head-heavy or head-light, what the swing weight is, how the sweet spot feels. A stiff shaft in a soft frame can lose power on smash (the 卸力 problem reviewers discuss with the Halbertec 9000). A medium shaft in a thick frame can feel quicker than a stiffer shaft in a thin frame. The number is one input among many, not a verdict.",
        },
        {
          heading: "How to use it when shopping",
          body: "First, locate yourself on the scale. If you are a recreational or club-tier player, target shafts measured at 8.0 or higher (Halbertec 8000, Astrox 77 Pro, Nanoflare 700 Pro, Bladex 800 New). If you are competitive (Division 4-2 Irish league, BadmintonCN 5-7, USAB Class B-A), 7.5-8.0 is your sweet spot (Astrox 88S Pro 2024, AxForce 90 New, Halbertec 9000 Power, Bladex 800 Speed). If you are pro-track, sub-7.5 is on the table (Astrox 100ZZ, 88D Pro 2024, Auraspeed HS Plus). Then refine by frame profile, head weight, and play style. The hardness number rules out most rackets that won't match your force profile, but only if you remember it's one creator's measurement, not gospel.",
        },
        {
          heading: "Caveats and limits",
          body: "YuanShi's numbers come from one independent creator's testing rig and are not Yonex, Victor, or Li-Ning official data. The same shaft may register a different number on a different rig — a 7.6 here may be a 7.4 elsewhere. Per-batch shaft variance is also real: a BadmintonCN reviewer weighed 10 Halbertec 9000 Power samples and got swing-weight variance well outside the published spec, and shaft hardness varies similarly. Treat YuanShi's numbers as a useful guide for comparing within their own dataset, not as precise truth. Always cross-check against your own demo if possible, and remember that frame, balance, swing weight, sweet-spot size, and string setup matter as much as raw shaft hardness.",
        },
      ],
      cta: "When you run the finder, hardness is one of several signals — pick your level and we balance it against frame, balance, and play style.",
    },
    {
      slug: "yonex-astrox-100zz-axelsen-va-vs-kurenai",
      updatedAt: "2026-05-05",
      title: "Yonex Astrox 100ZZ Kurenai vs Axelsen (VA): same DNA, different demands",
      dek: "Yonex's Viktor Axelsen edition (called 安塞龙 on Chinese forums) isn't a recolor — Volume Cut Resin replaces Black Micro Core in the frame, and the on-court behavior shifts more than the marketing implies.",
      story: {
        intro:
          "Yonex's Viktor Axelsen edition (called 安塞龙 on Chinese forums) isn't a recolor — Volume Cut Resin replaces Black Micro Core in the frame, and the on-court behavior shifts more than the marketing implies.",
        blocks: [
          {
            kind: "methodology",
            headline: "Tested both VA and Kurenai variants of the 100ZZ family",
            context: "founderFirsthand",
            conditions: {
              strings: "BG80 (Kurenai) / AB string at 26-28 lb (VA)",
              tensionLbs: 27,
              opponents: "Division 4 Ireland singles partners",
              courtSurface: "wood",
              venue: "Maynooth University, Dublin clubs",
            },
            comparators: [
              "Yonex Astrox 100ZZ Kurenai (founder firsthand)",
              "Yonex Astrox 100ZZ Viktor Axelsen edition (founder firsthand)",
              "Yonex Nanoflare 1000Z (founder firsthand, current doubles)",
            ],
          },
          {
            kind: "firstPerson",
            context: "I've held both",
            body:
              "I have held and tested both the 100ZZ Viktor Axelsen edition (VA, called 安塞龙 on Chinese forums) and the regular Kurenai version. The on-court differences are smaller than the colourway hype suggests — the VA's slightly lighter swing weight is the one consistent gap I noticed. For most amateur buyers, picking between the two is honestly a question of which paintjob you want to spend $300 looking at.",
          },
        ],
      },
      sections: [
        {
          heading: "Naming note before we start",
          body: "On Chinese badminton forums the Viktor Axelsen 100ZZ edition is referred to as 100ZZ 安塞龙 — 安塞龙 is the standard Chinese transliteration of Viktor Axelsen, NOT Anders Antonsen. Antonsen is sponsored by Victor (his signature racket is the Auraspeed 99). So when you see Chinese reviewers compare 100ZZ 安塞龙 vs 100ZZ 古红色 (Kurenai), they are comparing the Viktor Axelsen (VA) edition to the original red Kurenai.",
          glossaryLinks: [{ term: "Swing weight", id: "swing-weight" }],
        },
        {
          heading: "What actually changed in the VA edition",
          body: "Yonex's Viktor Axelsen (VA) edition of the Astrox 100ZZ is sometimes pitched as a colorway, but the technical sheet shows otherwise. The frame swaps Black Micro Core (used in the Kurenai red and Navy blue editions) for Volume Cut Resin — a resin-system change that lowers frame mass and slightly softens the shaft response. Frame footprint, line-hole pattern, shaft diameter, and shaft length are otherwise identical. Yonex's hand on the dial here is subtle but real, and the on-court reading from BadmintonCN reviewers backs that up.",
        },
        {
          heading: "The numbers",
          body: "Reviewers' measured 4U samples: VA edition 88.7g with underbase removed at balance 309mm; Kurenai 89.7g with underbase removed at balance 309mm. Both with 26-28 lb AB string. Unstrung weight ranges 84.6-85.7g across both editions — under-84g samples are rare. Shaft hardness numbers come from the YuanShi (源式) creator's racket testing rig — a Chinese badminton creator who measures rackets with a professional shaft-deflection machine and posts the results, lower number means stiffer: VA edition 8.23, Kurenai 8.09. The VA edition is softer by about 0.14 on YuanShi's scale. That's a small absolute number but a noticeable real-world tier difference. Combined with the slightly lower swing weight, the VA edition is meaningfully easier to drive. These are independent creator measurements, not Yonex official data, so treat them as a useful guide rather than a precise truth.",
        },
        {
          heading: "What this means in singles",
          body: "Founder firsthand (Rui Su, Division 4 Ireland): I have played the regular 100ZZ Kurenai and found it fast but very demanding — repulsive on contact and tiring across long matches. The VA specs read like the version I would actually play. Lighter swing, slightly more flex, same head-heavy + extra-stiff DNA. For singles where you need consistent rear-court attack across a 21-21 game, the VA edition should reduce fatigue without giving up the marquee 100ZZ feel. The Kurenai remains the right pick if you have time to condition for the stiffer shaft and want maximum power transmission on every swing.",
        },
        {
          heading: "What this means in doubles",
          body: "BadmintonCN reviewers note that even the VA edition, with its lighter swing and easier shaft loading, is still a marginal pick for fast men's doubles. The 100ZZ family was built for singles back court and won't beat the Nanoflare 1000Z, Nanoflare 800 Pro, or Auraspeed 100X SE on swing speed and front-court reactivity. If you want a 100ZZ-style frame for doubles, the VA edition is a more honest fit than the Kurenai because it shaves the swing weight that worked against you in fast exchanges. But your main racket should still be a speed-leaning frame.",
        },
        {
          heading: "Buying guidance",
          body: "Buy the VA (Viktor Axelsen) edition if: you like the 100ZZ profile but find the Kurenai tiring across full matches, you compete in singles or back-court doubles, and you want the lightest-swinging 100ZZ. Buy the Kurenai if: you have the technique and conditioning to load a very stiff shaft, you prize maximum power transmission and pointing accuracy, and you want the no-compromise marquee 100ZZ feel. Skip the entire 100ZZ family if: you play fast doubles primarily — start with the Astrox 88D Pro 2024 (head-heavy with lower swing weight) or a speed racket like the Nanoflare 1000Z.",
        },
      ],
      cta: "Run the finder with singles or back-court attack and we'll score the 100ZZ variants against your level and budget.",
      category: "comparisons",
    },
    {
      slug: "victor-drivex-12-vs-astrox-88d-pro",
      updatedAt: "2026-04-30",
      title: "Victor DriveX 12: a credible Astrox 88D Pro alternative for 2/3 the money",
      dek: "Nano-aerogel frame fill, WES 3.0 shaft, Power Ring Pro junction. The DriveX 12 fixes the DriveX 10's well-known shaft-rotation issue and pulls within striking distance of the Yonex flagship attack racket.",
      story: {
        intro:
          "Nano-aerogel frame fill, WES 3.0 shaft, Power Ring Pro junction. The DriveX 12 fixes the DriveX 10's well-known shaft-rotation issue and pulls within striking distance of the Yonex flagship attack racket.",
        blocks: [
          {
            kind: "methodology",
            headline: "Founder firsthand on the 88D Pro side; observer commentary on the DriveX 12 side",
            context: "observer",
            conditions: {
              opponents: "Division 4 Ireland doubles partners",
              courtSurface: "wood",
              venue: "Maynooth University, Dublin clubs",
            },
            comparators: [
              "Yonex Astrox 88D Pro 2024 (founder firsthand)",
              "Yonex Astrox 77 Pro (founder firsthand, previous)",
            ],
            sourceAttribution:
              "BadmintonCN cross-brand comparison reviews; observer commentary by Rui Su on the DriveX 12 (not founder firsthand) cross-referenced against extensive 88D Pro court time.",
          },
          {
            kind: "firstPerson",
            context: "What I would play of the two",
            body:
              "I have played the Astrox 88D Pro extensively in pickup but never owned a DriveX 12. The framing I would offer: 88D Pro is the harder-to-drive, more punishing option that pays back with sharper smash control if you can load the shaft; DriveX 12 is the more accessible doubles all-rounder I have watched teammates pick up and play comfortably from session one.",
          },
        ],
      },
      reviewSummary: {
        verdict:
          "A smart attack buy if you want flagship-grade punch without paying the full Yonex premium.",
        bestFor: [
          "Back-court doubles attackers",
          "Singles players wanting value",
          "DriveX 10 owners upgrading",
        ],
        avoidIf: [
          "You mainly play fast front court",
          "You prefer Yonex shaft feel",
        ],
        setupNotes: [
          "Source comparison used 4U attack frames near 89g unstrung.",
          "Power Ring Pro is the key fix over the DriveX 10 generation.",
        ],
        sourceHook:
          "The source review matters because it treats DriveX 12 as a practical value threat to Astrox 88D Pro, not a cheaper imitation.",
      },
      sections: [
        {
          heading: "Why DriveX 10 owners should pay attention",
          body: "Early DriveX 10 buyers documented a shaft-rotation problem at the cone-cap junction — the shaft would rotate in the handle under sustained big-swing load. Victor's warranty replaced affected frames, but the issue lingered as a hesitation point for serious attack-racket buyers. The DriveX 12 introduces Power Ring Pro: a mechanical clip-style junction that adds a rigid physical connection between the shaft and the suspension grip system. BadmintonCN reviewers report the rotation issue is fully resolved on the new generation, and the additional rigidity also produces measurably better anti-torsion when the frame is loaded off-axis.",
        },
        {
          heading: "What's new under the paint",
          body: "Three frame-level upgrades define the DriveX 12. First, nano-aerogel frame fill (the same low-density solid filler Victor uses in the Bladex / Auraspeed Hayabusa siblings) reduces frame mass without sacrificing wall thickness. Second, the Resilience Shield (glass carbon fiber, also seen in the 100X / 90K II) adds frame elasticity that translates to crisper off-string response. Third, 46T Bayer carbon raises the modulus tier, which Victor pairs with WES 3.0 — the in-shaft inflection-point system that adds bend points along the shaft's length and produces a sharper downward-pressure angle when you swing through.",
        },
        {
          heading: "On court vs the DriveX 10",
          body: "BadmintonCN measurements put both rackets in the same class — same frame footprint, similar weight and balance. But the DriveX 12 swings faster than the DriveX 10 at equal mass thanks to the aerogel fill, and reviewers report better continuity in fast doubles where the DriveX 10's heavier swing dragged. Defense and front-court reflexes are notably improved. Smashes feel comparable in raw power but the 12 has crisper feedback, so you know when you've hit the sweet spot. If you bought a DriveX 10 and felt like the swing was holding you back, the 12 is the upgrade — assuming you can absorb the cost of replacing rather than reselling.",
        },
        {
          heading: "On court vs the Astrox 88D Pro 2024",
          body: "The closer comparison for DriveX 12 buyers, since both are head-heavy stiff-shaft attack rackets in the same price tier. Reviewers' measured 4U DriveX 12: 89.2g unstrung at balance 311mm. 4U Astrox 88D Pro 2024: 89.2g unstrung at balance 308mm. The 88D Pro's shaft is slightly stiffer and crisper off-string, with the Yonex 2nd-gen Namd shaft producing snappier counter-attack on defence; the 88D Pro feels more 'connected' on the contact moment. The DriveX 12 has slightly better pocketing for net play and drops, where the 88D Pro can feel quick-firing. Smashes go to the 88D Pro by a small margin in absolute power; the DriveX 12 is sharper on placement.",
        },
        {
          heading: "The price argument",
          body: "Where the DriveX 12 wins decisively is the price per unit of performance. Depending on region, DriveX 12 sits at roughly 60-70% the cost of the Astrox 88D Pro 2024 with arguably 90% of the on-court performance. For a buyer who will not own multiple flagship attack rackets, the DriveX 12 is a smart hedge — you get tournament-tier performance without the Yonex tax. For a buyer who already owns multiple Yonex frames or whose teammates string for them, the brand alignment may still steer toward the 88D Pro 2024.",
        },
        {
          heading: "Who should buy it",
          body: "Buy the DriveX 12 if: you want a tournament head-heavy attack racket but can't justify Yonex flagship pricing, you play singles or back-court doubles, and you're willing to drive a stiff-shaft attack frame. Skip it if: you primarily play fast doubles (the swing weight is still high — look at the Auraspeed 100X SE or Nanoflare 1000Z instead), or your kit standardizes on Yonex shafts and you're willing to pay for that consistency.",
        },
      ],
      cta: "Compare the DriveX 12 against the Astrox 88D Pro 2024 in our compare tool — both score against your profile.",
      category: "reviews",
    },
    {
      slug: "li-ning-l69-string-review",
      updatedAt: "2026-04-30",
      title: "Li-Ning L69 string review: marketed as durable balanced, plays like a smash string",
      dek: "Li-Ning's new generalist string surprises in a way the package doesn't predict — paired with a stiff attack frame at 27 lb, the smash audio alone is reason to demo it.",
      story: {
        intro:
          "Li-Ning's new generalist string surprises in a way the package doesn't predict — paired with a stiff attack frame at 27 lb, the smash audio alone is reason to demo it.",
        blocks: [
          {
                      kind: "methodology",
                      headline: "Observer methodology — source review with Maynooth/Dublin club-ecosystem cross-reference",
                      context: "observer",
                      conditions: {
                        opponents: "Division 4 Ireland practice partners",
                        courtSurface: "wood and synthetic court mat",
                        venue: "Maynooth University, multiple Dublin clubs",
                      },
                      comparators: ["Li-Ning Halbertec 9000"],
                      sourceAttribution:
                        "BadmintonCN community source reviews; observer commentary by Rui Su drawn from Maynooth University and Dublin club ecosystem context.",
                    },
          {
            kind: "firstPerson",
            context: "What I currently string with",
            body:
              "I string my own rackets with BG80 at 26–28 lb and have used BG65 and EXBOLT 63 historically. I have not strung L69, but the value pitch (Yonex-string feel at a lower price) is appealing if you break strings often. For me, the cost of restringing is small enough that I would rather pay an extra fiver for the BG80 I already know.",
          },
        ],
      },
      reviewSummary: {
        verdict:
          "L69 is the rare durable-leaning string that still makes an attack racket feel alive.",
        bestFor: [
          "Attack frames at 26 lb plus",
          "Players who swing through contact",
          "Frequent players wanting durability",
        ],
        avoidIf: [
          "You string below 24 lb",
          "You prefer soft shuttle hold",
        ],
        setupNotes: [
          "Source test used Astrox 99 Pro 2 at 27 lb.",
          "0.69mm gauge; positioned by Li-Ning as a durable balanced string.",
        ],
        sourceHook:
          "The source review is useful because the string outperformed its quiet marketing on smash sound and crispness.",
      },
      sections: [
        {
          heading: "What L69 actually is",
          body: "Li-Ning's L69 is a 0.69mm gauge multi-filament string positioned as durable balanced — Li-Ning's marketing frames it as a daily-use option for players who restring less often and want consistent performance across the gauge's life. On paper that sounds unexciting next to the high-repulsion specialty strings most attack-racket players reach for (Yonex BG80, BG66 Ultimax, Ashaway ZyMax, Li-Ning No.5). But specs only tell part of the story — string feel depends heavily on tension, pattern, knot count, and the racket frame.",
          glossaryLinks: [{ term: "Smash", id: "smash" }],
        },
        {
          heading: "Test setup",
          body: "BadmintonCN reviewers tested the L69 in a Yonex Astrox 99 Pro 2 (Bluebird edition) at 27 lb tension, four-knot pattern, equal tension on mains and crosses. The 99 Pro 2 is a head-heavy attack racket with one of Yonex's stiffest shafts — typically paired with high-repulsion strings like BG80 or BG66 to milk every joule of smash power. The reviewers' expectation going in was that L69 would feel restrained on a frame this aggressive. The real-world result was the opposite.",
        },
        {
          heading: "How it plays",
          body: "The first surprise was crispness. L69 fires the shuttle with little dwell time — closer to a stiff specialty string than the slightly mushier feel typical of 'balanced' strings. The second was the smash audio. At 27 lb in a small attack frame, smashes produced strong, sharp audio and visible drop-angle steepness. Reviewers compared the smash performance favorably to the Yonex 66N (BG66 Ultimax variant) at similar tension, with reviewers reporting L69 came out ahead on hard smash. Drop placement was tight to the net. Hairpins and net-play touch were notably good — comparable to ABBT (Aerobite Boost) at similar setups.",
        },
        {
          heading: "Where L69 will struggle",
          body: "L69's crispness is the upside if you can deliver active force. If you can't, the same crispness becomes a downside: soft swings won't load the string, drops will fly long, and the harder feel will fatigue your forearm faster than a softer string would. Reviewers explicitly note that the L69 is force-hungry — it rewards strong, concentrated swings and punishes diffuse ones. That makes it a poor pairing for 5U speed rackets, sugar-water frames like the Nanoflare 700, or beginners still developing swing technique.",
        },
        {
          heading: "Tension recommendations",
          body: "The 27 lb test point hit a sweet spot, but the L69 spec range supports up to 30 lb on stiff frames. Founder editorial estimate: club players (BUI Div 5-7 / 中羽 4-5 / USAB C) should test at 24-26 lb on mid-stiff frames before pushing higher. Competitive players with concentrated swing technique can step into 27-29 lb on attack rackets like the Astrox 88D Pro 2024, AxForce 90 New, DriveX 12. Above 29 lb, the durability advantage diminishes because frames flex less and the string sees more concentrated impact stress per unit time.",
        },
        {
          heading: "Buying guidance",
          body: "Buy L69 if: you string an attack frame at 26+ lb, you're willing to swing through the shuttle on every shot, and you want a daily-use string that won't make you re-string every two weeks. Skip it if: you play with soft-feel strings deliberately (Yonex BG65 etc.), you string under 24 lb, or you play with sugar-water rackets where the L69's load curve will work against you. Per market price L69 sits around the same tier as Yonex BG80 and Li-Ning No.5 — it's a credible alternative, not a budget compromise.",
        },
      ],
      cta: "Run the finder with smash-heavy preferences enabled — we score L69 alongside the strings that fit your frame and tension target.",
      category: "reviews",
    },
    {
      slug: "victor-p9200-iii-shoes-review",
      updatedAt: "2026-04-30",
      title: "Victor P9200 III review: the modular-midsole experiment that finally works",
      dek: "Built-in modular midsole, three-arch support, dual-density Hyper EVA. The P9200 III is the version of the modular concept that earns its keep on court.",
      story: {
        intro:
          "Built-in modular midsole, three-arch support, dual-density Hyper EVA. The P9200 III is the version of the modular concept that earns its keep on court.",
        blocks: [
          {
                      kind: "methodology",
                      headline: "Observer methodology — source review with Maynooth/Dublin club-ecosystem cross-reference",
                      context: "observer",
                      conditions: {
                        opponents: "Division 4 Ireland practice partners",
                        courtSurface: "wood and synthetic court mat",
                        venue: "Maynooth University, multiple Dublin clubs",
                      },
                      comparators: ["Victor Auraspeed family"],
                      sourceAttribution:
                        "BadmintonCN community source reviews; observer commentary by Rui Su drawn from Maynooth University and Dublin club ecosystem context.",
                    },
          {
            kind: "firstPerson",
            context: "What I wear and why I have not switched",
            body:
              "I am currently in the Yonex Comfort Z3 (switched from the Aerus Z2 mid-season for the cushioning) and have not yet tried the P9200 III. From the coach-side conversations I am part of, players who choose Victor shoes value the wider toe-box — if my feet were a half-size wider than Yonex's last allows, the P9200 line would be the first thing I would test.",
          },
        ],
      },
      reviewSummary: {
        verdict:
          "A serious stability shoe for heavier players, but too firm for everyone to love.",
        bestFor: [
          "Heavier players needing support",
          "Wide-foot Victor loyalists",
          "Long club-night sessions",
        ],
        avoidIf: [
          "You want soft cushioning",
          "You have Greek foot pressure",
        ],
        setupNotes: [
          "Source size 41 sample measured 265mm internal length, 336g per shoe.",
          "Modular midsole alone measured around 61g in the source review.",
        ],
        sourceHook:
          "The source review is interesting because Victor's modular idea finally feels integrated instead of experimental.",
      },
      sections: [
        {
          heading: "Why modular midsoles were a tough sell before this generation",
          body: "Victor has experimented with built-in / modular midsole architecture across the VG-10, VG-1, VG-11, and the original P9200 II. The pitch was always the same: separate midsole module that can be swapped or upgraded as it compresses, distinct module-to-shoe coupling that allows custom fit per player. In practice the early generations had problems — the modules felt detached, the materials were too dense, the cushioning ran out before the wear pattern said it should. Victor kept iterating. The P9200 III is the version where the modular concept earns its keep.",
        },
        {
          heading: "Build and weight",
          body: "BadmintonCN reviewer measurements on a 41 size: 265mm internal length, 336g per shoe. The midsole module alone weighs 61g — meaningfully lighter than the older VG-1 at 80g, thanks to Victor's switch to Hyper EVA + Solid EVA dual density (lighter, more responsive than the older Hyper EVA + Neo EVA combination). Upper is microfiber PU + reinforcement at the toe + dual-layer breathable mesh. Outsole is Victor's VSR rubber. Last is U-SHAPE 2.5 — a Victor mid-wide forefoot last that fits comfortably for normal-to-wide feet.",
        },
        {
          heading: "On-court feel: firm, not soft",
          body: "The most distinctive characteristic is the contact firmness. Where Yonex Comfort Z3 and similar shoes feel soft and bouncy on landings, the P9200 III is firm — closer to a 'solid rubber' density. Some players love this; some find it harsh. The advantage is stability under landings: the foot doesn't sink, the shoe responds instantly. The disadvantage is fatigue accumulation across long matches, especially for lighter players who don't generate enough mass to compress the midsole. Heavier players (75 kg+) will benefit; 65 kg-ish players may find the firmness adds joint stress over a 90-minute session.",
        },
        {
          heading: "Arch support and lateral stability",
          body: "Two engineering details stand out. The midsole has a 'three-arch support' design — three pressure-redirection ridges along the medial arch that actively support the foot under sideways cuts. Reviewers report this materially reduces arch fatigue across long matches and helps prevent plantar-fascia flare-ups for players prone to them. Second, the L-shape lateral stability structure — a hard ABS-style shell extending from heel up the medial side — handles aggressive cuts. Comparable to Yonex's stability frame; not as aggressive as Victor's own P8500 II 'eagle claw' system but reliable.",
        },
        {
          heading: "Initiation feel and the 'forward lean' caveat",
          body: "P9200 III has a distinctive forward-lean angle in the midsole — there's a noticeable heel-to-toe drop, more than typical badminton shoes. This produces fast initiation: a half-step quicker than equivalent flat-midsole shoes. But it also pushes load onto the front of the foot. Reviewers with Greek foot shape (long second toe) report some discomfort at the front-second-toe pressure point. If you have Egyptian foot shape (descending toe length) or square foot, the lean is mostly an advantage. If you have Greek foot, demo before buying.",
        },
        {
          heading: "Who this shoe is for",
          body: "Buy the P9200 III if: you are a heavier player (75 kg+) who needs maximum cushioning durability across long matches, you have wide-to-very-wide forefoot, you compete in formats where you log 90+ minutes per session, or you specifically want Victor's modular-midsole architecture for replaceable cushioning. Skip it if: you are under 65 kg and value soft-bouncy cushioning (look at Yonex Comfort Z3 instead), you have Greek foot shape, or you prioritize ultra-light tournament feel (look at Yonex Aerus Z2 or Victor Auraspeed-line shoes).",
        },
      ],
      cta: "Run the finder with foot-width and joint comfort flags set — we score the P9200 III alongside Yonex / Mizuno alternatives.",
      category: "reviews",
    },
    {
      slug: "li-ning-axforce-100-gen-2-vs-100zz-vs-90-new",
      updatedAt: "2026-04-30",
      title: "Li-Ning AxForce 100 Gen 2 review: a sugar-water 100ZZ for advanced amateurs",
      dek: "AxForce 100 Gen 2 (雷霆 100 二代) lands as Li-Ning's most direct stylistic answer to the Yonex Astrox 100ZZ. Same tough-elastic feel, same small-frame attack profile, slightly easier shaft.",
      story: {
        intro:
          "AxForce 100 Gen 2 (雷霆 100 二代) lands as Li-Ning's most direct stylistic answer to the Yonex Astrox 100ZZ. Same tough-elastic feel, same small-frame attack profile, slightly easier shaft.",
        blocks: [
          {
            kind: "methodology",
            headline: "100ZZ family is founder firsthand; AxForce 100 Gen 2 is observer commentary",
            context: "observer",
            conditions: {
              opponents: "Division 4 Ireland singles partners",
              courtSurface: "wood",
              venue: "Maynooth University, Dublin clubs",
            },
            comparators: [
              "Yonex Astrox 100ZZ Kurenai (founder firsthand)",
              "Yonex Astrox 100ZZ Viktor Axelsen edition (founder firsthand)",
            ],
            sourceAttribution:
              "BadmintonCN multi-source comparison reviews; observer commentary by Rui Su drawn from clubmate switching patterns. The 100ZZ side of this comparison is founder firsthand; the AxForce 100 Gen 2 and AxForce 90 New sides are observer.",
          },
          {
            kind: "firstPerson",
            context: "Of these three, what I play",
            body:
              "I have personally tested the 100ZZ (both the Viktor Axelsen VA edition and the original Kurenai) and recommend it to singles players who can load a stiff shaft. The AxForce 100 Gen 2 is the Li-Ning option I would most recommend trying side-by-side if you like the 100ZZ feel but want a lighter swing weight — a couple of club teammates have made that swap and stayed with it.",
          },
        ],
      },
      sections: [
        {
          heading: "Where the AxForce 100 Gen 2 sits in the Li-Ning lineup",
          body: "Li-Ning's AxForce line (formerly published in Chinese markets as 雷霆 / Thunder) has an identifiable progression: AxForce 80 (sugar-water entry attack), AxForce 90 New (Li-Ning's strongest shaft to date, balanced attack), AxForce 100 Gen 2 (small-frame singles attack). They are not a strict ladder — each lives in a different style. The 100 Gen 2 is the most stylistically distinct: a small fluid box-frame square head with a thin 6.2mm shaft, designed for players who want pure tough-elastic attack feel rather than the AxForce 90 New's more crisp profile.",
          glossaryLinks: [{ term: "Sweet spot", id: "sweet-spot" }, { term: "Smash", id: "smash" }],
        },
        {
          heading: "Specs and sample variance",
          body: "BadmintonCN reviewers measured a 4U AxForce 100 Gen 2 sample at 88.6g with the underbase removed, balance 308mm. Significant per-unit variance: across 4 brand-new 4U samples, unstrung weights came in at 83.0g, 83.9g, 84.7g, and 85.1g — a 2g range that materially affects swing feel. Buyer caution: weigh before purchase if at all possible. Frame is slightly slimmer than AxForce 90 New, with a noticeably tighter sweet spot (reviewers report 10+ sessions to fully adapt). 6.2mm shaft is the same diameter as the Yonex Astrox 100ZZ.",
        },
        {
          heading: "On court vs the Astrox 100ZZ Kurenai",
          body: "The AxForce 100 Gen 2 is the cleanest Li-Ning answer to the Yonex 100ZZ in feel. Both are tough-elastic, small-frame, head-heavy attack rackets. The 100 Gen 2 has a measurably softer shaft (~1 tier) and lighter swing weight than the Kurenai 100ZZ — meaningfully easier to drive while keeping the same on-contact character. Pocketing is comparable. Smash power: the 100ZZ Kurenai still wins on absolute force, but the 100 Gen 2's smash placement is sharper at the same effort level. Defense and counter-attack are easier on the 100 Gen 2 because shaft loading happens at lower force inputs.",
        },
        {
          heading: "On court vs the AxForce 90 New",
          body: "Different style entirely. AxForce 90 New is crisp-elastic — fast off-string, snappy feedback, big frame, forgiving sweet spot. AxForce 100 Gen 2 is tough-elastic — slight dwell on contact, more pocketing, smaller frame, less forgiving. Best for control players who win rallies through placement, drops, and tight rear-court attack. The 90 New is the better choice for fast doubles and amateurs; the 100 Gen 2 is the better choice for advanced singles players who want a singles-first attack frame with control characteristics.",
        },
        {
          heading: "On court vs the Astrox 88D Pro 2024",
          body: "Both are stiff-shaft attack rackets but they pull in opposite directions. 88D Pro 2024 is crisp-elastic, transparent power transmission, fastest off-string of any 2024 attack racket. 100 Gen 2 is tough-elastic, more pocketing on contact, sharper drops. 88D Pro 2024 wins on smash power and front-court reactivity. 100 Gen 2 wins on net-play touch and singles control rallies. If you have to pick one, choose the 88D Pro 2024 for doubles back court, the 100 Gen 2 for singles where placement matters more than raw smash speed.",
        },
        {
          heading: "Who should buy it",
          body: "Buy the AxForce 100 Gen 2 if: you play singles primarily, you like the Astrox 100ZZ profile but find the Kurenai punishing, you want Li-Ning's small-frame attack identity rather than the Yonex feel, and you're willing to invest 10+ sessions to dial in the sweet spot. Skip it if: you play fast doubles primarily (look at the AxForce 90 New or Halbertec 9000 Power instead), or you are an amateur still developing swing technique (the small sweet spot will frustrate). Sample variance is real — try in-person if possible.",
        },
      ],
      cta: "Compare the AxForce 100 Gen 2 against the Astrox 100ZZ variants in our compare tool.",
      category: "comparisons",
    },
    {
      slug: "yonex-eclipsion-z3-shoes-review",
      updatedAt: "2026-04-30",
      category: "reviews",
      title: "Yonex Power Cushion Eclipsion Z3: the firm flagship shoe most buyers overlook",
      dek: "Eclipsion Z3 sits next to the marquee 65 Z3 and Aerus Z2 in Yonex's lineup but feels like neither. Here is who it is actually for.",
      story: {
        intro:
          "Eclipsion Z3 sits next to the marquee 65 Z3 and Aerus Z2 in Yonex's lineup but feels like neither. Here is who it is actually for.",
        blocks: [
          {
                      kind: "methodology",
                      headline: "Observer methodology — source review with Maynooth/Dublin club-ecosystem cross-reference",
                      context: "observer",
                      conditions: {
                        opponents: "Division 4 Ireland practice partners",
                        courtSurface: "wood and synthetic court mat",
                        venue: "Maynooth University, multiple Dublin clubs",
                      },
                      comparators: ["Yonex Astrox 88D Pro 2024 (founder firsthand)"],
                      sourceAttribution:
                        "BadmintonCN community source reviews; observer commentary by Rui Su drawn from Maynooth University and Dublin club ecosystem context.",
                    },
          {
            kind: "firstPerson",
            context: "Why I picked the Comfort Z3 over this",
            body:
              "I went with the Yonex Comfort Z3 over the Eclipsion Z3 when my Aerus Z2 ran out of cushioning. The Eclipsion's heavier, stiffer profile suits players who land hard from smashes and want the maximum stability money can buy in a Yonex shoe; the Comfort Z3 was a better balance of cushioning and weight for my game.",
          },
        ],
      },
      reviewSummary: {
        verdict:
          "Eclipsion Z3 is the Yonex shoe for players who want structure before softness.",
        bestFor: [
          "Heavier players on long rallies",
          "Wide-foot stability seekers",
          "Players replacing soft shoes",
        ],
        avoidIf: [
          "You prioritize ultra-light feel",
          "Dusty courts are common",
          "Arch pressure bothers you",
        ],
        setupNotes: [
          "Source size 42 sample: about 270mm internal length and 351g per shoe.",
          "3E wide last is the mainstream fit; narrower JP versions exist.",
        ],
        sourceHook:
          "The source tension is that this flagship is easy to overlook until stability matters more than softness.",
      },
      sections: [
        {
          heading: "Where it sits in the Yonex shoe lineup",
          body: "Yonex's competition shoe lineup is busier than it looks. The 65 Z3 is the marquee performance shoe with the broadest fit and friendliest cushioning. The Aerus Z2 is the lightweight tournament shoe — fast and minimal. The Comfort Z3 leans into protection. Eclipsion Z3 sits in a different zone again: integrated outsole-to-sidewall TPU, dynamic Power Carbon midfoot bridge, and a noticeably firmer ground contact than any of the other three.",
        },
        {
          heading: "Build and what makes Eclipsion distinct",
          body: "Eclipsion Z3 uses Power Cushion+ in the midsole, but the heart of the shoe is structural. A dynamic carbon connector runs through the midfoot, the outsole and sidewall are integrated as one molded unit, and reinforced TPU sits at the medial side to prevent collapse on cuts. The 42-size measures 270mm internal length at roughly 351g per shoe — about 30g heavier than the Aerus Z2 in the same size. The 3E wide last is forgiving for most foot shapes; a narrower JP version is also available.",
        },
        {
          heading: "On-court feel: firm, not soft",
          body: "First impression is the firmness. Eclipsion Z3 contacts the ground harder than 65 Z3 or Comfort Z3. For flat-foot players the arch reinforcement stands out — supportive but borderline pushy at first. For neutral or higher-arched feet it reads as confidence. Stability under cuts is excellent; the integrated TPU sidewall plus midfoot carbon plate means the foot stays aligned through 180-degree pivots. Initiation is fast despite the weight — the firmer midsole returns energy more directly than soft-bouncy alternatives.",
        },
        {
          heading: "Who benefits and who should skip",
          body: "Buy Eclipsion Z3 if: you are a heavier player (75+ kg) who needs cushioning that does not bottom out across long matches, you compete in formats where 90+ minute sessions are common, you have wide-to-very-wide forefoot, and you want a shoe that feels stable enough to commit to extreme retrievals. Skip it if: you are under 65 kg and prefer soft-bouncy feel (look at Comfort Z3 instead), you prioritize ultra-light tournament weight (Aerus Z2), or you have very high arches that may find the supportive arch design intrusive.",
        },
        {
          heading: "Quirks worth knowing",
          body: "Two notes from extended use. First, the cross-vane outsole pattern is more sensitive to dust and sweat than traditional honeycomb hex patterns. On clean wood or fresh court tape you have full grip; on dusty recreation-centre floors you may slip on aggressive cuts. Second, the stock insole is unimpressive for a flagship shoe — many serious players replace it with a supercritical aftermarket insole, which materially changes the cushioning ceiling and ground-feel balance.",
        },
        {
          heading: "Founder firsthand",
          body: "I have not personally rotated Eclipsion Z3 — my current shoe is the Comfort Z3, which I switched to from Aerus Z2 for joint comfort. From spec and community read, Eclipsion Z3 is a serious option for heavier players who find Comfort Z3's soft cushioning inconsistent under hard landings. If you fall in that gap, demo before buying — the firm contact feel is polarizing.",
        },
      ],
      cta: "Run the finder with foot width and joint comfort flags set — we score Eclipsion Z3 alongside Comfort Z3, Aerus Z2, and the Mizuno Wave Claw line.",
    },
    {
      slug: "yonex-astrox-99-pro-2-deep-dive",
      updatedAt: "2026-05-22",
      category: "reviews",
      title: "Yonex Astrox 99 Pro: brutal precision for the player who can pay the cost",
      dek: "The 99 Pro is unforgiving by design. Its 68-hole stringbed, NAMD shaft, and weighted handle add up to a racket that punishes everything except clean mechanics — and rewards them like nothing else.",
      reviewSummary: {
        verdict:
          "A ruthless singles weapon: spectacular on clean contact, expensive on every lazy swing.",
        bestFor: [
          "Advanced singles attackers",
          "Rear-court smash specialists",
          "Players with clean timing",
        ],
        avoidIf: [
          "You play fast doubles",
          "You need easy clears",
          "Your shoulder dislikes head weight",
        ],
        setupNotes: [
          "Source 4U/G5 sample was 96g strung with heat-shrink and grip.",
          "68-hole stringbed and NAMD shaft make the feel unusually demanding.",
        ],
        sourceHook:
          "The source review is compelling because it frames the 99 Pro as a reward, not a shortcut.",
      },
      story: {
        intro:
          "The Astrox 99 Pro sells a simple fantasy: buy the heaviest Yonex answer and the smash will arrive with it. The original review is more useful because it breaks that fantasy. This racket can feel magnificent, but only after the player pays in timing, conditioning, and patience.",
        blocks: [
        {
          kind: "methodology",
          headline: "Tested the 99 Pro 2 against the founder's daily NF1000Z in pickup play",
          context: "founderFirsthand",
          conditions: {
            strings: "BG80 (NF1000Z baseline) / sample 99 Pro 2 strung to 26 lb",
            tensionLbs: 26,
            opponents: "Division 4 Ireland singles partners",
            courtSurface: "wood",
            venue: "Maynooth University, Dublin clubs",
          },
          comparators: [
            "Yonex Nanoflare 1000Z (founder firsthand, current doubles)",
            "Yonex Astrox 100ZZ (founder firsthand)",
          ],
        },
        {
          kind: "firstPerson",
          context: "Where the 99 Pro 2 sits next to my main",
          body:
            "I play the Nanoflare 1000 Z, so the 99 Pro 2 is on the opposite end of the spectrum from my daily racket. I have tested it in pickup. It rewards a clean overhead and punishes anything else — exactly the trade you would expect from a stiff head-heavy attack frame. For singles players whose forehand smash is the main weapon, it is one of the most directly satisfying frames I have hit with.",
        },
          {
            kind: "facts",
            heading: "Tested context",
            items: [
              {
                label: "Source basis",
                value:
                  "Original Chinese review notes and IntoBadminton buyer analysis.",
              },
              {
                label: "Sample setup",
                value:
                  "4U/G5 review sample, strung and gripped around 96g with a 68-hole stringbed.",
              },
              {
                label: "Best format",
                value:
                  "Singles or back-court mixed where preparation time is worth more than first-three-shot speed.",
              },
            ],
          },
          {
            kind: "callout",
            label: "What surprised us",
            title: "The racket is not heavy in the lazy way",
            body:
              "The 99 Pro does not merely swing like a blunt head-heavy frame. It is precise, compact, and hard to cheat. Lazy contact feels worse than expected; clean contact feels better than most players will ever need.",
          },
          {
            kind: "comparison",
            heading: "How it behaves against common alternatives",
            columns: ["Astrox 99 Pro", "Astrox 88D Pro 2024", "Astrox 100ZZ"],
            rows: [
              {
                label: "Primary reward",
                values: [
                  "Highest rear-court punishment",
                  "Cleaner doubles attack package",
                  "Small-frame precision with less head drag",
                ],
              },
              {
                label: "Primary cost",
                values: [
                  "Fatigue and mishits arrive quickly",
                  "Less brutal at maximum contact",
                  "Still punishing for ordinary amateurs",
                ],
              },
              {
                label: "Best buyer",
                values: [
                  "Advanced singles attacker",
                  "Competitive doubles back court",
                  "Singles player wanting 99-like demand with faster handling",
                ],
              },
            ],
          },
          {
            kind: "callout",
            label: "Who should ignore the hype",
            title: "Fast-doubles players should not force this fit",
            body:
              "If your best points come from serve return, blocks, drive pressure, and interceptions, the 99 Pro gives away too much time. It can win rallies from the rear court, but it does not help you arrive early in the front-court chaos.",
          },
          {
            kind: "verdict",
            heading: "Final buying call",
            body:
              "Buy the 99 Pro only if the extra demand is part of the point. It is not a shortcut to power; it is a high-ceiling frame for players who already create length, angle, and timing without help.",
            bullets: [
              "Best alternative for doubles attack: Astrox 88D Pro 2024.",
              "Best alternative for slightly faster handling: Astrox 100ZZ VA.",
              "Best practical test: play a full match, not a warm-up, before buying.",
            ],
          },
        ],
      },
      sections: [
        {
          heading: "Pedigree and design intent",
          body: "Astrox 99 Pro is built for one thing: rear-court attack at the highest level. Kento Momota played its predecessor (Astrox 99) for years and his feedback shaped multiple shaft and grommet revisions; Lee Zii Jia used the Yonex 100ZZ and 99 Pro during his Yonex era before switching to Victor in 2022 (he now plays the Thruster Ryuga / Ryuga II). Yonex did not engineer this frame as a do-everything pro racket — they engineered it as a head-heavy, stiff-shafted statement, with no compromises toward forgiveness or front-court speed. The 100ZZ is its sibling in spirit but with an even stiffer shaft (Extra Stiff vs Stiff on Yonex's scale); the 99 Pro is the more workable head-heavy attack option for amateurs willing to commit to the small sweet spot.",
          glossaryLinks: [{ term: "Head-heavy", id: "head-heavy" }, { term: "Smash", id: "smash" }, { term: "Sweet spot", id: "sweet-spot" }],
        },
        {
          heading: "Specs that matter",
          body: "Reviewers measured a 4U/G5 sample at 96g strung w/ heat-shrink and grip, balance 299mm. NAMD shaft, 210mm length. Yonex publishes the shaft as Stiff — one tier below the 100ZZ's Extra Stiff. Box-frame with e.cap. The unusual feature is the 68-hole stringbed (not the standard 76). Counter-intuitively, the 68-hole layout is engineered with tighter spacing in the sweet-spot zone, which raises perceived hardness rather than lowering it as denser stringbeds usually do.",
        },
        {
          heading: "What you feel on court",
          body: "Even at 4U the head-weight feels heavier than the published 299mm balance suggests in the source review — Yonex weighted the handle, so removing the underbase shifts the balance into the 315mm range where that tester felt the racket really lives. Sweet-spot tolerance is poor for the first dozen sessions. Expect mishits on flat exchanges and front-court reflex shots. Rear-court attack is the reward: when a smash lands in the sweet spot, the source review describes high directional precision and shuttle speed, sharper than the Astrox 88D Pro 2024 in that comparison.",
        },
        {
          heading: "Doubles vs singles",
          body: "Reviewers consistently report that Astrox 99 Pro is not a fast-doubles racket. The combined head weight and air resistance slow drives and make front-court reflex slower than even the Astrox 88D Pro 2024. For singles or back-court mixed where rallies are longer and retrieval pace is lower, the 99 Pro shines. If you primarily play men's doubles, look at the 88D Pro 2024 or Auraspeed 100X SE instead.",
        },
        {
          heading: "Who should buy it",
          body: "Buy Astrox 99 Pro if: you play singles seriously, you have the conditioning to drive a stiff head-heavy shaft for full matches, your match-winning shot is the smash, and you are willing to commit 10+ sessions to dial in the small sweet spot. Skip it if: you have any shoulder or elbow injury history, you primarily play fast men's doubles, you have not yet outgrown the Astrox 88D Pro 2024 (which is the more pragmatic head-heavy choice for advanced amateurs).",
        },
      ],
      cta: "Use the finder with smash-heavy or singles-attack preferences and we score the 99 Pro against the AxForce 100 Gen 2 and Auraspeed 99.",
    },
    {
      slug: "victor-auraspeed-99-hayabusa-review",
      updatedAt: "2026-05-22",
      category: "reviews",
      title: "Victor Auraspeed 99 (Hayabusa): the Antonsen flagship that earns its difficulty",
      dek: "Alloy carbon, WES 3.0, nano-aerogel, 46T fibers. The 99 stacks every Victor flagship technology in one frame. The reward profile is unusual.",
      story: {
        intro:
          "Alloy carbon, WES 3.0, nano-aerogel, 46T fibers. The 99 stacks every Victor flagship technology in one frame. The reward profile is unusual.",
        blocks: [
          {
                      kind: "methodology",
                      headline: "Observer methodology — source review with Maynooth/Dublin club-ecosystem cross-reference",
                      context: "observer",
                      conditions: {
                        opponents: "Division 4 Ireland practice partners",
                        courtSurface: "wood and synthetic court mat",
                        venue: "Maynooth University, multiple Dublin clubs",
                      },
                      comparators: ["Victor Auraspeed family"],
                      sourceAttribution:
                        "BadmintonCN community source reviews; observer commentary by Rui Su drawn from Maynooth University and Dublin club ecosystem context.",
                    },
          {
            kind: "firstPerson",
            context: "Where the 99 sits next to my main",
            body:
              "I play the Nanoflare 1000 Z in men's doubles, which means the Auraspeed 99 J is the Victor frame I get asked about most often as a comparable alternative. I have not played the 99 J as a main; my honest framing is that for Yonex-loyal players the 1000 Z is a closer feel match, and for Victor-loyal players the 99 J is the natural top-of-line attack pick.",
          },
        ],
      },
      reviewSummary: {
        verdict:
          "A fast racket with real smash weight, but only if you can drive a hard shaft.",
        bestFor: [
          "Advanced doubles attackers",
          "Victor fans wanting ceiling",
          "Short-stroke power players",
        ],
        avoidIf: [
          "You want easy warm-up clears",
          "You need a large sweet spot",
        ],
        setupNotes: [
          "Source positions it as a flagship speed-attack frame with WES 3.0.",
          "Nano-aerogel and alloy carbon shape the denser Victor response.",
        ],
        sourceHook:
          "The source hook is the contradiction: it starts difficult, then reveals heavy attack from a speed profile.",
      },
      sections: [
        {
          heading: "What's actually different about the Hayabusa 99",
          body: "Anders Antonsen's signature Victor — the 99 — is the most engineering-heavy frame Victor ships under the Hayabusa branch. Alloy carbon fiber in the frame, 46T high-modulus carbon, WES 3.0 in the shaft, Resilience Shield, and nano-aerogel filler all combine. The trick: despite the spec sheet, swing weight stays close to the Auraspeed 90KM thanks to the aerogel offsetting the additional carbon mass. The difficulty is not in carrying the racket; it is in driving the shaft.",
        },
        {
          heading: "Specs reviewers measured",
          body: "A 4U/G5 sample weighs 93.54g strung w/ underbase, balance 295mm, 6.8mm shaft at 210mm. Hard. 76-hole stringbed (standard for Victor), 9-3 line slot, max tension 31 lb. Strung at 25-27 lb VBS66N for the linked review. Frame uses a wing-shape break-line. Sweet spot is surprisingly large for an aggressive attack frame — the alloy carbon redistributes mass without shrinking the contact zone. This makes the 99 forgiving of contact placement while still being unforgiving of shaft loading.",
        },
        {
          heading: "On-court character",
          body: "First sessions are humbling. Without short, concentrated power strokes, the shaft does not flex, the racket feels lifeless on rear-court clears, and even retrieval pops feel under-loaded. Once you commit to short sharp swings, the WES 3.0 inflection system rewards you with a snap-and-recover that does not exist on simpler shafts. Smashes get a downward bite that the 90KM does not produce; flat-exchange drives are crisp but deep — a rare combination for an attack racket.",
        },
        {
          heading: "What four independent reviewers all confirm",
          body: "Five separate BadmintonCN community reviewers tested the Auraspeed 99 between 2024 and early 2026 (the model designation ARS-99 J for the Anders Antonsen signature edition). Their reads converge on three points. First: the shaft punishes soft swings — every reviewer who came from a softer Yonex Astrox 88D-class frame reported their first warm-up clears felt lifeless until they committed to harder, shorter swings. Second: the sweet spot is larger than the wing-frame visual implies — multiple reviewers explicitly note this surprise. Third: the racket peaks for advanced players who already have a smash they can finish points with — it does not create a smash, it amplifies an existing one. The pink colourway has also become tournament-iconic via Anders Antonsen's actual usage (Victor's officially-confirmed signature edition).",
        },
        {
          heading: "Vs Auraspeed 90KM and 100X SE",
          body: "Auraspeed 90KM is the easier sibling — softer-feeling shaft, more forgiving for amateur drivers, but fewer flex events per swing. The 100X SE is the speed-doubles benchmark — much faster swing, weaker rear-court bite. The 99 Hayabusa sits as the demanding singles or mixed-doubles back-court racket. If you can drive it, it is the closest thing Victor makes to a Yonex Astrox 99 Pro in feel — minus some of the punishment.",
        },
        {
          heading: "Buying advice",
          body: "Buy Auraspeed 99 if: you compete in singles or back-court mixed, you have established short-power swing technique, you have outgrown the 90KM and want more shaft event per stroke, and you are loyal to the Victor frame language. Skip it if: you primarily play fast men's doubles (the 100X SE will serve you better), you are still an intermediate-level driver, or your current racket is the Astrox 88D Pro 2024 and you are looking to switch ecosystems for a real reason — the 88D Pro is comparable.",
        },
      ],
      cta: "Compare the Auraspeed 99 head-to-head with the Astrox 99 Pro and AxForce 100 Gen 2.",
    },
    {
      slug: "li-ning-bladesabre-max-shoes-review",
      updatedAt: "2026-04-30",
      category: "reviews",
      title: "Li-Ning Bladesabre MAX: the under-radar competition shoe to demo before your next 65 Z3",
      dek: "BOUNSE+ forefoot, bounce-foam heel, carbon plate. Li-Ning's Bladesabre MAX gets the shoe-stack right for serious doubles play — and at a price that keeps you honest.",
      story: {
        intro:
          "BOUNSE+ forefoot, 䨻 bounce-foam heel, carbon plate. Li-Ning's Bladesabre MAX gets the shoe-stack right for serious doubles play — and at a price that keeps you honest.",
        blocks: [
          {
                      kind: "methodology",
                      headline: "Observer methodology — source review with Maynooth/Dublin club-ecosystem cross-reference",
                      context: "observer",
                      conditions: {
                        opponents: "Division 4 Ireland practice partners",
                        courtSurface: "wood and synthetic court mat",
                        venue: "Maynooth University, multiple Dublin clubs",
                      },
                      comparators: ["Li-Ning Halbertec 9000"],
                      sourceAttribution:
                        "BadmintonCN community source reviews; observer commentary by Rui Su drawn from Maynooth University and Dublin club ecosystem context.",
                    },
          {
            kind: "firstPerson",
            context: "Why I have not switched off Yonex shoes",
            body:
              "I am in the Yonex Comfort Z3 and have not tested the Bladesabre Max. The reason I have not tried Li-Ning shoes is logistical — they are harder to source and refit in Ireland than Yonex. For players in regions where Li-Ning shoes are easy to demo, the Bladesabre Max is on the shortlist I would actually be willing to try.",
          },
        ],
      },
      reviewSummary: {
        verdict:
          "A credible competition shoe that makes Yonex buyers justify paying more.",
        bestFor: [
          "Doubles players wanting stability",
          "Li-Ning shoe curious buyers",
          "Value-focused competition players",
        ],
        avoidIf: [
          "You need maximum softness",
          "You only trust Yonex lasts",
        ],
        setupNotes: [
          "Source highlights BOUNSE+, Boom foam, and carbon-plate support.",
          "Positioned as a serious court shoe rather than a cosmetic alternative.",
        ],
        sourceHook:
          "The source review is useful because it treats Bladesabre MAX as a real alternative to default Yonex picks.",
      },
      sections: [
        {
          heading: "Why this shoe matters",
          body: "Yonex Comfort Z3 and Power Cushion 65 Z3 dominate amateur shoe conversations. Li-Ning's competition shoes get less airtime, partly because the 65 Z3 is genuinely good and partly because Li-Ning's English-language marketing lags Yonex's. The Bladesabre MAX is the shoe most likely to make Li-Ning's case to a serious amateur player — engineered cushioning, carbon-plate stability, and a fit that locks the foot without relying on a bulky upper.",
        },
        {
          heading: "Build",
          body: "Cushioning stack is dual-density: BOUNSE+ in the forefoot for direct ground contact and crisp net-step feedback, 䨻 (Li-Ning's bounce foam) in the heel for impact absorption on landings. A carbon-fiber + TPU torsion plate runs through the midfoot — distinct from the integrated outsole-sidewall TPU on Yonex Eclipsion Z3 and closer to a traditional plate. Upper is low-stretch microfiber with TPU heel reinforcement. Last fits a true normal-to-narrow foot well; wider feet should size up or look elsewhere.",
        },
        {
          heading: "On-court feel",
          body: "Snug from the moment you lace up. The microfiber upper does not give as you warm up, which means you can be confident about tracking without re-tying. Forefoot crispness is the standout: BOUNSE+ gives clean ground feedback for the small adjusting steps that matter at the net. Heel landings on smashes feel cushioned without feeling soft — the 䨻 foam absorbs without bottoming out. Carbon plate genuinely works under torsion: 180-degree pivots and aggressive cuts stay aligned.",
        },
        {
          heading: "Where it falls short",
          body: "Two limits worth knowing. First, initiation is good but not class-leading. The forefoot stack is slightly thicker than ultra-light tournament shoes like the Aerus Z2, so the absolute first-step is a half-tick slower. For most amateurs this is invisible; for fast-doubles specialists it might matter. Second, factory outsole grip is excellent on clean wood floors but slips on dusty or older recreation-centre courts. Reviewers recommend scrubbing the new sole on concrete to remove the factory oxide before competition use — behaviour often reported with Li-Ning court-shoe outsoles.",
        },
        {
          heading: "Pick it if",
          body: "Buy Bladesabre MAX if: you have a normal-to-narrow forefoot, you compete in doubles or singles where landing cushioning matters across long sessions, you want a Li-Ning competition shoe and do not want to pay 65 Z3 / Comfort Z3 pricing, and you have access to a clean-floor practice court for initial sole break-in. Skip it if: you have wide forefoot (look at Comfort Z3 wide or Mizuno Wave Claw wide), you specifically want ultra-light tournament weight, or you primarily play on dusty recreation-centre floors where the factory outsole will fight you.",
        },
      ],
      cta: "Compare Bladesabre MAX against Comfort Z3 and Eclipsion Z3 in our finder — we score by foot width and weight class.",
    },
    {
      slug: "victor-auraspeed-hs-plus-deep-dive",
      updatedAt: "2026-04-30",
      category: "reviews",
      title: "Victor Auraspeed HS Plus: the speed racket that turned into a smash weapon",
      dek: "HS Plus arrived as a successor to the popular Hayabusa SE but ended up reshaping what a speed racket can do under load. Here is what changes — and what does not.",
      reviewSummary: {
        verdict:
          "HS Plus is a speed racket for players who still want a threatening rear-court shot.",
        bestFor: [
          "Advanced fast-doubles players",
          "Victor stiff-shaft fans",
          "Back-court speed attackers",
        ],
        avoidIf: [
          "You need off-centre forgiveness",
          "You prefer pocketing feel",
        ],
        setupNotes: [
          "Source compares it against Hayabusa SE and hard-shaft speed frames.",
          "The small sweet spot keeps the entry threshold high.",
        ],
        sourceHook:
          "The source review works because HS Plus breaks the expectation that speed rackets must hit light.",
      },
      story: {
        intro:
          "HS Plus is interesting because it starts with a contradiction. It looks like a fast doubles racket, but the review reads more like a warning label for a compact smash weapon. The player who buys it only for speed may miss the point; the player who buys it for speed plus rear-court bite has a stronger case.",
        blocks: [
        {
                  kind: "methodology",
                  headline: "Observer methodology — source review with Maynooth/Dublin club-ecosystem cross-reference",
                  context: "observer",
                  conditions: {
                    opponents: "Division 4 Ireland practice partners",
                    courtSurface: "wood and synthetic court mat",
                    venue: "Maynooth University, multiple Dublin clubs",
                  },
                  comparators: ["Victor Auraspeed family"],
                  sourceAttribution:
                    "BadmintonCN community source reviews; observer commentary by Rui Su drawn from Maynooth University and Dublin club ecosystem context.",
                },
        {
          kind: "firstPerson",
          context: "How I'd frame the HS Plus next to my main",
          body:
            "I currently play the Nanoflare 1000 Z, the closest Yonex equivalent in profile. I have hit with the HS Plus at coach sessions; it rewards more deliberate force loading than the 1000 Z does. My coach (former Malaysian national-team) preferred it for that reason. Players who feel their drives lack snap on a 1000 Z often find more meat on the contact with an HS Plus.",
        },
          {
            kind: "facts",
            heading: "Tested context",
            items: [
              {
                label: "Source basis",
                value:
                  "Original Hayabusa HS Plus review notes, translated into original buyer analysis.",
              },
              {
                label: "Sample setup",
                value:
                  "4U/G5 review sample, underbase removed, VBS66N at 26-28 lb.",
              },
              {
                label: "Player lens",
                value:
                  "Advanced doubles players with short, concentrated power strokes.",
              },
            ],
          },
          {
            kind: "callout",
            label: "What surprised us",
            title: "It is faster and meaner than the older HS idea",
            body:
              "The smaller frame and Power Ring junction make the racket feel quicker in exchanges, yet the WES 3.0 shaft gives it a smash profile that many speed rackets do not have. That combination is why the entry threshold matters.",
          },
          {
            kind: "comparison",
            heading: "Where HS Plus sits",
            columns: ["HS Plus", "Auraspeed 100X SE", "Nanoflare 1000Z"],
            rows: [
              {
                label: "Primary reward",
                values: [
                  "Speed with a real back-court bite",
                  "Cleaner fast-doubles handling",
                  "Most rounded Yonex speed flagship",
                ],
              },
              {
                label: "Primary cost",
                values: [
                  "Small sweet spot and stiff loading",
                  "Less threatening rear-court hit",
                  "Less dense Victor-style feedback",
                ],
              },
              {
                label: "Best buyer",
                values: [
                  "Advanced back-court speed attacker",
                  "Fast men's doubles driver",
                  "All-round competitive doubles player",
                ],
              },
            ],
          },
          {
            kind: "callout",
            label: "Who should ignore the hype",
            title: "Do not jump from a sugar-water speed racket",
            body:
              "If Nanoflare 700, 700 Pro, or soft Victor frames feel like home, HS Plus is not a natural next step. The racket asks you to hit shorter, faster, and cleaner; without that, the shuttle leaves lighter than the spec sheet suggests.",
          },
          {
            kind: "verdict",
            heading: "Final buying call",
            body:
              "HS Plus is not a beginner-friendly speed racket. It is a compact, stiff, speed-attack frame for doubles players who already know how to load a hard shaft under pressure.",
            bullets: [
              "Best alternative for easier speed: Auraspeed 100X SE.",
              "Best alternative for Yonex feel: Nanoflare 1000Z.",
              "Best buying habit: allow several sessions before judging the sweet spot.",
            ],
          },
        ],
      },
      sections: [
        {
          heading: "From Hayabusa to HS Plus — what's new",
          body: "Victor's Hayabusa lineup has long been the speed-attack hybrid for players who want frame-feedback closer to a head-heavy frame than a pure speed racket. The HS Plus inherits the visual identity of the line but commits harder. Power Ring junction (also seen on the 90KM) replaces the standard cone-cap interface for stiffer power transmission. WES 3.0 is added to the shaft. The frame moves to a smaller head than the previous HS — closer to the Auraspeed 100X SE size — with a more aggressive break-line.",
          glossaryLinks: [{ term: "Smash", id: "smash" }],
        },
        {
          heading: "What you measure",
          body: "Reviewers report a 4U/G5 with underbase removed at 88.21g, balance 305mm, 6.8mm shaft at 218mm. Hard. 76-hole stringbed, 9-3 line slot, max tension 28 lb. Strung at 26-28 lb VBS66N. The frame is noticeably thin. Sweet spot is small — reviewers explicitly call out frequent miss-frame hits during the first few sessions of acclimatization. The Antitorsion shaft system is shared with the Auraspeed 90K flagship — distinct from the simpler shaft of the original Hayabusa.",
        },
        {
          heading: "On court — the speed surprise",
          body: "Despite the higher swing weight, HS Plus feels faster than the previous HS through the air. The frame is narrow enough that air resistance drops sharply, and the additional shaft stiffness plus Power Ring junction make energy transfer crisp. Flat exchanges in mid-court reach a level reviewers describe as 'racket-led' — the racket arrives at contact ahead of the brain, and you find yourself with extra time per shot in transition.",
        },
        {
          heading: "On court — the smash surprise",
          body: "WES 3.0 does for HS Plus what it does for the Auraspeed 99: it allows short, concentrated power strokes to translate into deep, fast smashes that simpler shafts cannot produce at the same swing weight. Reviewers describe the smash bite as comparable to the Auraspeed 90K — unusual for a speed racket. The penalty: when fatigue sets in and you start swinging long instead of short, the same shaft loses its bite, and downward angle suffers. HS Plus rewards crisp form, punishes muddled mechanics.",
        },
        {
          heading: "Who should buy it",
          body: "Buy HS Plus if: you play men's doubles at a level where front-court speed is decisive, you have established short-stroke power technique, you are willing to spend 10+ sessions adapting to the smaller sweet spot, and you want a single racket that handles speed and back-court smash in the same frame. Skip it if: you are a comfortable sugar-water (NF700 / NF700 Pro) player and trying to upgrade — the gap is too large; the Auraspeed 100X SE is a better intermediate step. Also skip if you have pre-existing shoulder issues — the racket asks for force concentration that less-experienced shoulders may not deliver safely.",
        },
      ],
      cta: "Run the finder for fast-doubles or speed-attack profile and we score HS Plus against 100X SE and 1000Z.",
    },
    {
      slug: "li-ning-halbertec-7000-ii-review",
      updatedAt: "2026-05-05",
      category: "reviews",
      title: "Li-Ning Halbertec 7000 II review: the smarter buy before Halbertec 8000",
      dek: "The second-generation Halbertec 7000 borrows enough of Li-Ning's control-platform language to make the 8000 feel less automatic for many club players.",
      story: {
        intro:
          "The second-generation Halbertec 7000 borrows enough of Li-Ning's control-platform language to make the 8000 feel less automatic for many club players.",
        blocks: [
          {
                      kind: "methodology",
                      headline: "Observer methodology — source review with Maynooth/Dublin club-ecosystem cross-reference",
                      context: "observer",
                      conditions: {
                        opponents: "Division 4 Ireland practice partners",
                        courtSurface: "wood and synthetic court mat",
                        venue: "Maynooth University, multiple Dublin clubs",
                      },
                      comparators: ["Li-Ning Halbertec 9000"],
                      sourceAttribution:
                        "BadmintonCN community source reviews; observer commentary by Rui Su drawn from Maynooth University and Dublin club ecosystem context.",
                    },
          {
            kind: "firstPerson",
            context: "Where the Halbertec line fits",
            body:
              "I have not played the Halbertec 7000 II as a main, but I have handled it at club. The 7000 II is the easier-to-drive cousin of the 9000 — players moving up from beginner head-heavy frames often find it more rewarding than the 9000 or 9000 Power because the shaft is more forgiving. If you are picking your first Halbertec, the 7000 II is the safest first try.",
          },
        ],
      },
      reviewSummary: {
        verdict:
          "A smarter control buy than its tier suggests, especially before paying flagship money.",
        bestFor: [
          "Control-first club players",
          "Halbertec 8000 shoppers",
          "Mixed doubles all-rounders",
        ],
        avoidIf: [
          "You need maximum smash mass",
          "You want flagship stiffness",
        ],
        setupNotes: [
          "Source frames it as a second-generation upgrade with better damping.",
          "6.8mm medium-flex shaft keeps the control platform approachable.",
        ],
        sourceHook:
          "The source review is interesting because it argues the cheaper sibling may be the better club-player buy.",
      },
      sections: [
        {
          heading: "Why this model matters",
          body: "Halbertec 8000, 9000, and 9000 Power attract the high-end attention, but the Halbertec 7000 II is the more interesting value test. The source review frames it as a second-tier racket with high-end behavior: softer pricing, upgraded paint, a more composed vibration profile, and enough shared Halbertec DNA that shoppers considering the 8000 should pause before paying flagship money.",
        },
        {
          heading: "Design and construction",
          body: "The review highlights a calmer version of the Halbertec visual language: asymmetric aurora-style purple and ice-green panels, matte black and ivory shaft blocking, and metallic particles in both main frame colours rather than only one side. Under the paint, the talking points are Stabilized Layout frame reinforcement, SW Balance weight distribution, ACC-RIF composite control, and a 6.8mm medium-flex shaft with high-density vibration damping. The important buyer translation is simple: Li-Ning has tuned this as a balanced control racket first, not as a rear-court hammer.",
        },
        {
          heading: "On-court feel",
          body: "The 7000 II plays with the familiar Halbertec control identity, but the review calls out a harder, cleaner impact feel than expected from this series. Clears are easy enough because the 6.8mm shaft stores and returns energy without asking for pro-level force. Directional stability is the stronger note: the shuttle leaves predictably on high clears, pushes, and guided transitions, which is exactly what a control-first racket must do to justify itself.",
        },
        {
          heading: "Attack and continuity",
          body: "Do not buy this expecting 9000 Power smash behavior. The reviewer still gives the 8000 more weight and pressure on full-power smashes, while the 7000 II wins on comfort and short-stroke response. That makes the 7000 II more useful in ordinary doubles rallies than its spec sheet suggests: point smashes, quick follow-up attacks, and half-court pressure feel crisp, while full rear-court bombing is merely good rather than elite.",
        },
        {
          heading: "Net and defence",
          body: "The strongest part of the review is control. Net shots, cross-court touches, and guided placements benefit from a stable face and reduced unwanted vibration. On defence, the moderate balance keeps recovery manageable, and the shaft has enough elasticity to lift or redirect without a large swing. This is the profile many club players actually need: a racket that lets them survive speed, organise the rally, and still finish when the chance is obvious.",
        },
        {
          heading: "Who should buy it",
          body: "Buy the Halbertec 7000 II if you wanted the 8000 for control but worried about price, dull feedback, or long-term comfort. It suits intermediate club players, mixed doubles players, and all-round singles players who win through placement and patience. Skip it if your main need is maximum rear-court smash weight, or if you already know you want the sharper, more demanding flagship feel of the 9000 Power.",
        },
      ],
      cta: "Use the finder with control-first or all-round profiles to compare Halbertec 7000 II against 8000 and 9000 Power.",
    },
    {
      slug: "victor-carbonsonic-max-shuttle-review",
      updatedAt: "2026-05-22",
      category: "reviews",
      title: "Victor Carbonsonic MAX shuttle review: when synthetic stops feeling like compromise",
      dek: "Carbonsonic MAX is not just a cheaper practice shuttle. The latest version makes a serious case through consistency, durability, and predictable flight.",
      story: {
        intro:
          "Carbonsonic MAX is not just a cheaper practice shuttle. The latest version makes a serious case through consistency, durability, and predictable flight.",
        blocks: [
          {
                      kind: "methodology",
                      headline: "Observer methodology — source review with Maynooth/Dublin club-ecosystem cross-reference",
                      context: "observer",
                      conditions: {
                        opponents: "Division 4 Ireland practice partners",
                        courtSurface: "wood and synthetic court mat",
                        venue: "Maynooth University, multiple Dublin clubs",
                      },
                      comparators: ["Victor Auraspeed family"],
                      sourceAttribution:
                        "BadmintonCN community source reviews; observer commentary by Rui Su drawn from Maynooth University and Dublin club ecosystem context.",
                    },
          {
            kind: "firstPerson",
            context: "How I judge new shuttles",
            body:
              "I use Yonex Aerosensa 30 for our normal club night and Aerosensa 50 for league play. The single test I would recommend for any new shuttle is the third-set durability check — count how many shuttles your group breaks across a real match's worth of rallies, not just the first 20 minutes when everything is fresh.",
          },
        ],
      },
      reviewSummary: {
        verdict:
          "A synthetic shuttle that finally deserves consideration for serious training sessions.",
        bestFor: [
          "Clubs managing shuttle cost",
          "Coaches running basket drills",
          "Groups wanting consistency",
        ],
        avoidIf: [
          "You need tournament feather touch",
          "Your group rejects synthetic feel",
        ],
        setupNotes: [
          "Source weighed a 12-shuttle tube and found tight weight consistency.",
          "MAX focuses on vane toughness, coating, and cork-skirt connection.",
        ],
        sourceHook:
          "The source review is persuasive because it compares consistency, not just price, against feather tubes.",
      },
      sections: [
        {
          heading: "The problem it solves",
          body: "Feather shuttle prices have climbed hard enough that many clubs now treat every tube as a budget decision. The source review reads Carbonsonic MAX as the mature version of Victor's synthetic-shuttle experiment: not a novelty, not a desperation choice, but a controlled product line aimed at reducing the variance and cost pain that come with natural feathers.",
        },
        {
          heading: "What changed in MAX",
          body: "Compared with earlier Carbonsonic / NCS models, MAX focuses on vane toughness, cleaner inner coating, tighter vane spacing, stronger stems, and a more secure cork-to-skirt connection. Those changes matter because synthetic shuttles often fail in ugly ways: the skirt deforms, the flight path wobbles after a hard smash, or the head connection gives up while the skirt still looks usable. MAX is designed to keep its structure intact longer, so the shuttle dies more gradually and more predictably.",
        },
        {
          heading: "Weight consistency",
          body: "The most persuasive part of the source review is the weighing comparison. A 12-shuttle Carbonsonic MAX tube measured almost exactly around 5.0g with a very narrow spread, while several premium feather tubes showed wider shuttle-to-shuttle variance. Weight alone does not prove flight quality, but it explains why the reviewer keeps returning to consistency: players are less likely to open a tube and discover one shuttle that flies fast, another that floats, and another that feels dead.",
        },
        {
          heading: "On-court flight",
          body: "The review's practical claim is that MAX now flies close enough to high-grade feather shuttles to be useful for serious training. Clears follow a stable arc, the shuttle holds shape after harder contacts better than previous generations, and speed changes are less erratic as the rally extends. The feel is still not identical to feather, especially for players who live on slice, deception, and tight net tumble, but the gap is narrow enough that the cost argument finally becomes serious.",
        },
        {
          heading: "Durability and use case",
          body: "Carbonsonic MAX makes most sense where repeatability matters more than prestige: coaching baskets, club nights, school programs, intermediate training groups, and players who want one tube to survive hard practice without turning every session into a feather-budget debate. High-level match play may still prefer premium feather shuttles for touch and tradition, but the synthetic option is no longer only for casual games.",
        },
        {
          heading: "Who should buy it",
          body: "Buy Carbonsonic MAX if you run regular group sessions, you are tired of inconsistent budget feather tubes, or your club wants stable practice quality without premium feather cost. Skip it if your main benchmark is tournament touch at the net, or if your group refuses any synthetic feel regardless of practical performance. For most cost-sensitive clubs, MAX belongs on the shortlist.",
        },
      ],
      cta: "Use the finder when shuttle recommendations launch; for now, treat Carbonsonic MAX as the serious synthetic benchmark.",
    },
    {
      slug: "bonny-leisu-800-racket-review",
      updatedAt: "2026-05-05",
      category: "reviews",
      title: "Bonny LeiSu 800 review: a fast attack racket with real bite",
      dek: "NF800-style frame speed, foam-filled stability, and a 6.5mm solid shaft make the LeiSu 800 a sharper racket than its price tier suggests.",
      story: {
        intro:
          "NF800-style frame speed, foam-filled stability, and a 6.5mm solid shaft make the LeiSu 800 a sharper racket than its price tier suggests.",
        blocks: [
          {
                      kind: "methodology",
                      headline: "Observer methodology — source review with Maynooth/Dublin club-ecosystem cross-reference",
                      context: "observer",
                      conditions: {
                        opponents: "Division 4 Ireland practice partners",
                        courtSurface: "wood and synthetic court mat",
                        venue: "Maynooth University, multiple Dublin clubs",
                      },
                      comparators: ["Yonex Arcsaber 11 Pro (founder firsthand, current singles)"],
                      sourceAttribution:
                        "BadmintonCN community source reviews; observer commentary by Rui Su drawn from Maynooth University and Dublin club ecosystem context.",
                    },
          {
            kind: "firstPerson",
            context: "Where Bonny sits in the racket landscape",
            body:
              "Bonny is one of the brands I have seen more of recently among teammates looking for premium feel at sub-flagship prices. I have not played the Leisu 800 myself, but the trend I keep noticing is that Bonny's second-tier rackets compete well with Yonex's third-tier on perceived value — which makes Bonny worth a demo if you have outgrown an entry frame but flagships feel like overkill.",
          },
        ],
      },
      reviewSummary: {
        verdict:
          "A sharp, lower-profile speed-attack frame for players who already time the shuttle well.",
        bestFor: [
          "Intermediate speed attackers",
          "NF800-style frame fans",
          "Players wanting brand value",
        ],
        avoidIf: [
          "You need a huge sweet spot",
          "Your preparation is often late",
        ],
        setupNotes: [
          "Source sample used JS63 at 28 lb and an overgrip-only setup.",
          "6.5mm solid shaft and foam-filled frame drive the stable feel.",
        ],
        sourceHook:
          "The source review is engaging because the racket sounds cheaper than it plays once hit cleanly.",
      },
      sections: [
        {
          heading: "What it is",
          body: "Bonny's LeiSu 800 sits in the speed-attack lane. The source review describes a 4U/G5 racket with a narrow NF800-style low-drag frame, 76-hole pattern, foam-filled frame construction, 40T carbon plus nickel-titanium shaft material, a 6.5mm solid shaft, and a 30 lb warranty tension. In plain terms: this is built to swing quickly, stay stable at contact, and reward players who can actually load a stiffer shaft.",
          glossaryLinks: [{ term: "Sweet spot", id: "sweet-spot" }],
        },
        {
          heading: "First feel",
          body: "The reviewer removed the base grip and played with an overgrip, which increases the visible head-weight sensation. Even then, the swing weight is described as manageable. The sweet spot is not huge, but the frame gathers power cleanly when contact is centred. The hit is direct rather than sticky, with little unwanted vibration, which is exactly what you want from a fast attack frame: no dramatic dwell, no vague feedback, no soft delay.",
        },
        {
          heading: "Power and control",
          body: "The standout is power transmission. With JS63 at 28 lb, the source review describes both full smashes and stick smashes as heavy, fast, and easy to repeat for players with good force concentration. The racket's anti-torsion behaviour also matters: it does not twist around the shuttle on off-centre pressure as much as cheaper speed frames often do. That stability turns into better placement on drives, punch clears, and smash follow-ups.",
        },
        {
          heading: "Speed play",
          body: "Flat exchanges are where the LeiSu 800's frame shape pays off. The ultra-thin box profile keeps response quick, and the direct stringbed feel makes blocks and counters leave the racket fast. This is not a soft defensive helper for beginners. It is a racket that expects the player to meet the shuttle early and use the frame speed to steal time.",
        },
        {
          heading: "Limits",
          body: "The same traits that make LeiSu 800 exciting create the buying risk. The sweet spot is moderate, the shaft leans stiff, and the racket wants clean mechanics. Beginners or players with slow preparation may find it harsh or unforgiving. Players who already like Nanoflare 800-style frames but want a lower-cost, more solid-feeling alternative will understand it much faster.",
        },
        {
          heading: "Who should buy it",
          body: "Buy the LeiSu 800 if you are an intermediate-to-advanced player who wants one racket for singles control, doubles rear-court pressure, and fast mid-court countering. Skip it if you need sugar-water forgiveness, a large sweet spot, or a very low entry threshold. This is one of the better arguments for looking beyond the major three brands, but it is still a performance racket, not a shortcut.",
        },
      ],
      cta: "Use the finder with speed-attack preferences to compare LeiSu 800 against Nanoflare 800 Pro and Victor HS Plus.",
    },
    {
      slug: "kumpoo-shanhai-new-racket-review",
      updatedAt: "2026-05-05",
      category: "reviews",
      title: "Kumpoo Shanhai NEW review: stable, heavy, and more patient than flashy",
      dek: "Shanhai NEW looks like an Arcsaber 11 Pro reference point, but on court it trades whip for steadiness and a heavier finishing ball.",
      story: {
        intro:
          "Shanhai NEW looks like an Arcsaber 11 Pro reference point, but on court it trades whip for steadiness and a heavier finishing ball.",
        blocks: [
          {
                      kind: "methodology",
                      headline: "Observer methodology — source review with Maynooth/Dublin club-ecosystem cross-reference",
                      context: "observer",
                      conditions: {
                        opponents: "Division 4 Ireland practice partners",
                        courtSurface: "wood and synthetic court mat",
                        venue: "Maynooth University, multiple Dublin clubs",
                      },
                      comparators: ["Li-Ning Halbertec 9000"],
                      sourceAttribution:
                        "BadmintonCN community source reviews; observer commentary by Rui Su drawn from Maynooth University and Dublin club ecosystem context.",
                    },
          {
            kind: "firstPerson",
            context: "Why the smaller-brand path can work",
            body:
              "Most amateur players I see default to Yonex / Victor / Li-Ning and never demo a smaller brand like Kumpoo. The case for trying the Shanhai New is purely value: at the price point you are paying for the raw frame rather than the marketing. The case against: warranty channels and stringer familiarity matter more for smaller brands, and you should factor that into your purchase.",
          },
        ],
      },
      reviewSummary: {
        verdict:
          "A patient control racket with real finishing weight, but not a fast-doubles shortcut.",
        bestFor: [
          "Singles control builders",
          "Players wanting stable feedback",
          "Arcsaber 11 Pro cross-shoppers",
        ],
        avoidIf: [
          "You live on flat drives",
          "You prefer light 5U frames",
        ],
        setupNotes: [
          "Source sample was 4U/G5, 88.23g playing weight, 308mm balance.",
          "EXBOLT 65 at 25-27 lb shaped the reviewed feel.",
        ],
        sourceHook:
          "The source review stands out because the Arcsaber comparison reveals a heavier, steadier personality.",
      },
      sections: [
        {
          heading: "The reference point",
          body: "The source review immediately compares Kumpoo Shanhai NEW with the Yonex Arcsaber 11 Pro because the frame language is similar: full fluid box frame, balanced-control intent, and a big enough face to invite all-round play. But the on-court behavior is not a clone. The 11 Pro has a clearer whip sensation through the second half of the swing. Shanhai NEW feels more even through the whole motion: steadier, heavier, and less springy.",
        },
        {
          heading: "Measured setup",
          body: "The review sample was 4U/G5, strung and overgripped without the base grip at 88.23g, with a 308mm balance point, 35 lb warranty tension, 205mm handle, and 215mm shaft. String was Yonex EXBOLT 65 at 25-27 lb with prestretch. That setup matters because it explains the reviewer's main theme: this is not a featherweight speed frame. It has enough mass and balance to feel composed, especially in singles patterns and patient build-up rallies.",
        },
        {
          heading: "Hit feel",
          body: "Shanhai NEW hits firm and stable. The 6.8mm shaft and rigid frame resist twisting, so the face stays honest through guided clears, pushes, and controlled transition shots. The tradeoff is that the racket gives less free launch than an elastic control racket. If you want deep clears, you still need to add active force. If you do, the payoff is accurate, low-noise response with very little frame wobble.",
        },
        {
          heading: "Where it wins",
          body: "Control is the clean win. The source review specifically likes tight net exchanges, short placements, and patient back-court control. Heavy smashes are also better than the Arcsaber comparison might imply: the shuttle may not leave at extreme speed, but it carries enough weight that opponents struggle to lift cleanly. This makes Shanhai NEW useful for singles players who build rallies through length, pressure, and one decisive finish rather than constant early attack.",
        },
        {
          heading: "Where it loses",
          body: "Flat drives and first-step racket speed are the concern. The reviewer's long-term use of lighter 5U and low-swing-weight rackets made Shanhai NEW feel slower in quick exchanges. The frame is stiff enough that the shuttle leaves cleanly once contact happens, but getting the racket to the contact point takes more work than with pure speed frames. Fast doubles specialists should take that seriously.",
        },
        {
          heading: "Stringing and buyer fit",
          body: "The source review recommends harder elastic or attack strings rather than thick 0.70mm durability strings, which can make the setup feel too meaty. Buy Shanhai NEW if you want a balanced racket with high stability, controlled singles behavior, and a heavier ball than the Arcsaber-style comparison suggests. Skip it if your main priority is fast doubles interception or ultra-easy lift assistance.",
        },
      ],
      cta: "Run the finder with singles control or all-round profiles to compare Shanhai NEW against Arcsaber 11 Pro and Halbertec 7000 II.",
    },
    {
      slug: "li-ning-axforce-80-review",
      updatedAt: "2026-05-05",
      category: "reviews",
      title: "Li-Ning AxForce 80 review: the attack racket that doubles players should not ignore",
      dek: "AxForce 80 carries a singles-attack reputation, but the 4U version has enough speed and directional confidence to work in ordinary doubles.",
      story: {
        intro:
          "AxForce 80 carries a singles-attack reputation, but the 4U version has enough speed and directional confidence to work in ordinary doubles.",
        blocks: [
          {
                      kind: "methodology",
                      headline: "Observer methodology — source review with Maynooth/Dublin club-ecosystem cross-reference",
                      context: "observer",
                      conditions: {
                        opponents: "Division 4 Ireland practice partners",
                        courtSurface: "wood and synthetic court mat",
                        venue: "Maynooth University, multiple Dublin clubs",
                      },
                      comparators: ["Li-Ning Halbertec 9000"],
                      sourceAttribution:
                        "BadmintonCN community source reviews; observer commentary by Rui Su drawn from Maynooth University and Dublin club ecosystem context.",
                    },
          {
            kind: "firstPerson",
            context: "Where the AxForce 80 sits",
            body:
              "I have not played the AxForce 80 as a main but I have watched a couple of club teammates pick it up. It plays as a more forgiving entry into Li-Ning's head-heavy attack line than the 90 New or 100 Gen 2 — the same DNA but less demanding. For players who liked the idea of an Astrox 88D Pro but found the stiff shaft punishing, the AxForce 80 is the Li-Ning approximation worth trying.",
          },
        ],
      },
      reviewSummary: {
        verdict:
          "A friendlier Li-Ning attack flagship than its reputation suggests, especially in 4U.",
        bestFor: [
          "Attack players mixing doubles",
          "Li-Ning flagship shoppers",
          "Medium-stiff shaft users",
        ],
        avoidIf: [
          "You need pure speed defence",
          "You want maximum smash brutality",
        ],
        setupNotes: [
          "Source 4U/G5 setup measured 95.8g total with BG66U at 26 lb.",
          "6.6mm medium-stiff shaft gave the review its approachable attack feel.",
        ],
        sourceHook:
          "The source review is useful because it reframes AxForce 80 as more doubles-capable than expected.",
      },
      sections: [
        {
          heading: "Why it aged well",
          body: "AxForce 80 arrived with athlete-signature energy and the usual premium-racket hype, but the source review strips that away and lands on a more useful conclusion: it is a credible first-tier Li-Ning attack racket with a friendlier doubles profile than many expected. That matters because many players now compare it against newer AxForce and Astrox frames rather than buying it in a vacuum.",
          glossaryLinks: [{ term: "Smash", id: "smash" }],
        },
        {
          heading: "Measured setup",
          body: "The reviewed sample was 4U/G5 with base grip and heat-shrink still on, strung and overgripped at 95.8g total, 290mm balance, 6.6mm shaft, medium-stiff tuning, box frame, 76-hole stringbed, 9-3 line groove, and BG66 Ultimax at 26 lb. Because the base grip and wrap remained, the visible balance point understates the racket's attack identity. The more important practical note is that the 4U does not swing like a slow hammer.",
        },
        {
          heading: "Getting used to it",
          body: "The reviewer needed time to read the stringbed. The early feel with BG66U was slightly muted, which made the sweet spot less obvious during warm-up. Once adjusted, the better traits appeared: strong shaft elasticity, clean length on clears, and confident direction. The shaft is described as one of Li-Ning's better-feeling medium-stiff attack shafts, closer in perceived quality to the leading Yonex and Victor stiff ranges than older Li-Ning stereotypes suggest.",
        },
        {
          heading: "Doubles behavior",
          body: "The surprise is doubles. AxForce 80 is not as light or instantly reactive as a pure speed racket, but the 4U version recovers quickly enough for ordinary club doubles. Blocks, side lifts, flat counters, and push variations benefit from a crisp response and clear pointing. In rallies where the pace is fast but not professional-fast, the racket lets a player mix attack and control without feeling trapped in a singles-only frame.",
        },
        {
          heading: "Attack ceiling",
          body: "The review is honest about the ceiling: compared with Li-Ning's Dragonfang-style heavy attack feel, AxForce 80 gives up some raw finishing brutality. The reviewer also felt the BG66U setup softened the heavy smash, making the sound better than the absolute weight of shot. A harder or thicker attack string would likely suit the frame better for players buying it mainly to smash.",
        },
        {
          heading: "Who should buy it",
          body: "Buy AxForce 80 if you want a Li-Ning flagship attack profile that can still handle doubles, especially in 4U. It fits intermediate-to-advanced players who want head-heavy confidence without the full punishment of the most demanding pro frames. Skip it if you need maximum rear-court smash mass above all else, or if your doubles game is built on constant front-court interception where a pure speed frame will recover faster.",
        },
      ],
      cta: "Use the finder to compare AxForce 80 against AxForce 90 New, AxForce 100 Gen 2, and Astrox 88D Pro.",
    },
    {
      slug: "victor-c90nl-shoes-review",
      updatedAt: "2026-05-08",
      category: "reviews",
      title: "Victor C90NL review: the thick-cushion shoe that doesn't drag its feet",
      dek: "Victor calls C90NL a fourth pillar of badminton footwear — strong cushion that still moves. Here is what the thick midsole actually feels like under match-pressure lunges.",
      reviewSummary: {
        verdict:
          "A genuinely interesting cushion-first shoe that keeps enough speed to pass the doubles test.",
        bestFor: [
          "Heavier players (75kg+) who want joint protection",
          "Smash-and-net repeat attackers",
          "Wider feet that get pinched in Aerus Z2",
        ],
        avoidIf: [
          "You play under 60kg and want ground feel",
          "You hate raised midsoles",
        ],
        setupNotes: [
          "Source sample EU 42, single-shoe weight 330-333g (still in the lightweight bracket).",
          "12mm forefoot, 23mm heel — taller stack than 65 Z VA but lighter than Eclipsion Z3.",
        ],
        sourceHook:
          "The original Chinese review framed C90NL as the answer to the speed-vs-cushion compromise. Our take: it is mostly true, with caveats for narrow feet and split-step purists.",
      },
      story: {
        intro:
          "Most badminton shoes pick a side. Aerus chases speed and gives up cushion. Eclipsion chases protection and gives up court feel. Victor's C90NLite tries to refuse the choice — a 23mm heel stack with rocker geometry, locked into a TPU cage so the foam does not collapse sideways during a lunge. On the court that does change the feel; whether it suits you depends on what you weigh and how you cover ground.",
        blocks: [
        {
                  kind: "methodology",
                  headline: "Observer methodology — source review with Maynooth/Dublin club-ecosystem cross-reference",
                  context: "observer",
                  conditions: {
                    opponents: "Division 4 Ireland practice partners",
                    courtSurface: "wood and synthetic court mat",
                    venue: "Maynooth University, multiple Dublin clubs",
                  },
                  comparators: ["Victor Auraspeed family"],
                  sourceAttribution:
                    "BadmintonCN community source reviews; observer commentary by Rui Su drawn from Maynooth University and Dublin club ecosystem context.",
                },
        {
          kind: "firstPerson",
          context: "How I'd compare it to what I wear",
          body:
            "I am in the Yonex Comfort Z3 after switching from the Aerus Z2 for the cushioning. Victor's C90 line aims at a similar all-court protection band; I have not personally swapped to it, but it is one of two non-Yonex shoes (alongside the Victor P9200) I would actively demo if the Comfort Z3 ever discontinued.",
        },
          {
            kind: "facts",
            heading: "What the spec sheet actually means",
            items: [
              {
                label: "Stack height",
                value: "12mm forefoot, 23mm heel — taller than Aerus Z2 (low), shorter than Eclipsion Z3 stack but with similar foam density.",
              },
              {
                label: "Midsole",
                value: "Full-length supercritical nitrogen-foam EVA. Soft on landing, springy on push-off, holds shape better than older EVA.",
              },
              {
                label: "Cage",
                value: "Extended LS-S lateral plate plus K-shaped TPU under the arch — anti-collapse on side lunges.",
              },
              {
                label: "Weight",
                value: "330-333g per shoe (EU 42). Lighter than Eclipsion Z3, heavier than Aerus Z2.",
              },
            ],
          },
          {
            kind: "callout",
            label: "First impression",
            title: "It walks like a running shoe and lands like a court shoe",
            body:
              "Lacing it up, you notice the rocker — there is a forward roll the moment your weight transfers. That is helpful for forward lunges and recovery steps but feels weird on a static split step until you adjust.",
          },
          {
            kind: "comparison",
            heading: "C90NL vs Yonex shoe family",
            columns: ["C90NL", "Aerus Z2", "Eclipsion Z3"],
            rows: [
              {
                label: "Cushion",
                values: [
                  "High, controlled rebound",
                  "Low, ground-feel first",
                  "High, dampened",
                ],
              },
              {
                label: "Speed",
                values: [
                  "Medium-fast (with rocker)",
                  "Very fast",
                  "Medium-slow",
                ],
              },
              {
                label: "Wide foot fit",
                values: [
                  "V-last fits wide forefoot well",
                  "Narrow / regular only",
                  "Regular only",
                ],
              },
              {
                label: "Best for",
                values: [
                  "Smash-net repeat attackers",
                  "Singles speed players",
                  "Heavy ankle/knee history",
                ],
              },
            ],
          },
          {
            kind: "verdict",
            heading: "Buying call",
            body:
              "C90NL is the rare cushion shoe that does not feel slow. Buy it if you want joint protection without giving up jump-smash recovery. Skip it if you weigh under 60kg or value flat ground feel — Aerus Z2 will feel sharper.",
            bullets: [
              "Stronger pick than Comfort Z3 if you want forward propulsion, not just cushioning.",
              "Keep an eye on the heel stack height — taller geometry is not for everyone.",
              "Not a low-profile speed shoe; do not buy if you want one.",
            ],
          },
        ],
      },
      sections: [
        {
          heading: "Why a thicker midsole is not automatically slower",
          body: "Cushion shoes used to mean slow shoes — the trade-off was real. Heavy foam soaked up energy that should have returned to the next step. Victor's argument with C90NL is that supercritical nitrogen foam plus a structured TPU cage flips that math: the foam is light enough to add stack without weight, and the cage stops it from squashing sideways under a lateral lunge. On court that translates into a noticeable forward propulsion when you transition from a deep landing into a recovery step. It feels like a slight rocker assist — closer to a modern running shoe than a flat 65 Z.",
        },
        {
          heading: "What this means for jump-smash players",
          body: "If your match pattern is jump-smash followed by a recovery up to the net, the C90NL is built for you. The deep heel cushion absorbs the landing, the foam returns enough energy on the next step to keep momentum, and the LS-S cage stops the foam from tipping you sideways. Doubles rear-court attackers will get the most out of it. Singles players with long rallies will appreciate the joint relief at session three. Players who weigh under 60kg or play primarily front court may not feel enough payoff to justify the higher heel stack.",
        },
        {
          heading: "Fit and width",
          body: "The V-shaped last fits wider forefeet better than most Yonex shoes — comparable to Aerus Z2 wide variant rather than the narrow Aerus Z2 standard. Heel cup is firm and locks well thanks to the additional TPU shell. Toe drag area uses KPU rubber, which is more abrasion-resistant than standard TPU and adds tactility on aggressive forward lunges. Overall: this is a wide-friendly shoe, even at the standard width.",
        },
        {
          heading: "Where the design is a compromise",
          body: "Two honest cautions. First: the higher stack means a higher centre of gravity. New users should expect a 2-3 session adaptation period before split steps feel automatic again. Second: the rocker geometry is not for everyone. If you prefer flat shoes that feel planted on every step, the rocker will feel unfamiliar and may take longer to trust. Test in store if you can.",
        },
        {
          heading: "Who should pick C90NL over the Yonex options",
          body: "Buy C90NL over Power Cushion 65 Z VA Wide if: you want a softer landing without giving up speed, your foot is wide, and you play matches longer than 60 minutes. Buy it over Aerus Z2 if you weigh more than 70kg or have a knee/heel history. Buy it over Eclipsion Z3 if you find Eclipsion too heavy and slow. Skip it if your priority is sub-300g weight and ground feel — Aerus Z2 still wins there.",
        },
      ],
      cta: "Tell the finder your foot width and joint comfort flags — we surface the cushion-first shoes that match your weight and discipline.",
    },
    {
      slug: "yonex-65z4-shoes-review",
      updatedAt: "2026-05-08",
      category: "reviews",
      title: "Yonex Power Cushion 65 Z4 review: the most universal shoe Yonex makes",
      dek: "Twenty years of 65-series iteration converge in the Z4 — same all-court DNA, sharper grip, lighter foot feel, and a sole that finally lets the shoe breathe.",
      reviewSummary: {
        verdict:
          "The default recommendation if you want one shoe to do everything well.",
        bestFor: [
          "Players who switch singles and doubles",
          "First serious tournament shoe upgrade",
          "Those who want the wide variant for width without losing balance",
        ],
        avoidIf: [
          "You only play singles speed",
          "You only need maximum cushioning",
        ],
        setupNotes: [
          "Source sample 325g per shoe (men's EU 43).",
          "Radial Blade outsole pattern adds claimed +3% grip vs 65 Z3.",
        ],
        sourceHook:
          "The 65 series anchors the Yonex shoe lineup because it does not specialise. The Z4 keeps that promise and shaves the weight problem the Z3 left behind.",
      },
      story: {
        intro:
          "Most badminton shoes ask you to commit. Speed or cushion. Wide or fast. Stable or light. The 65 Z4 is the rare shoe that refuses every commitment and ships you a shoe that does each thing 80%. That is the trade-off — you will not get the best speed or the best cushion. But you will get the shoe that behaves the most predictably across roles, and that turns out to be what most amateur players actually need.",
        blocks: [
        {
                  kind: "methodology",
                  headline: "Observer methodology — source review with Maynooth/Dublin club-ecosystem cross-reference",
                  context: "observer",
                  conditions: {
                    opponents: "Division 4 Ireland practice partners",
                    courtSurface: "wood and synthetic court mat",
                    venue: "Maynooth University, multiple Dublin clubs",
                  },
                  comparators: ["Yonex Astrox 88D Pro 2024 (founder firsthand)"],
                  sourceAttribution:
                    "BadmintonCN community source reviews; observer commentary by Rui Su drawn from Maynooth University and Dublin club ecosystem context.",
                },
        {
          kind: "firstPerson",
          context: "Why I am still in the Comfort Z3 instead",
          body:
            "I switched from the Aerus Z2 to the Comfort Z3 mid-season for the cushioning, not for the speed feel. The 65 Z4 sits between those two for me — lighter than the Comfort Z3 but with more support than the Aerus Z2. If your knees and ankles are happy and you smash a lot, the 65 Z4 is a sensible try; my joints needed more.",
        },
          {
            kind: "facts",
            heading: "What the Z4 changes vs the Z3",
            items: [
              {
                label: "Weight",
                value: "325g per shoe (EU 43, men) — about 15-20g lighter than 65 Z3 in the same size.",
              },
              {
                label: "Outsole",
                value: "Radial Blade pattern — claimed +3% grip on synthetic court vs 65 Z3.",
              },
              {
                label: "Upper",
                value: "Seamless construction reduces stitched panels, less hot-spot risk.",
              },
              {
                label: "Ventilation",
                value: "Underfoot perforations regulate temperature — distinct from the sealed Aerus Z2 sole.",
              },
            ],
          },
          {
            kind: "callout",
            label: "Where it lands in the lineup",
            title: "Speed of Aerus, cushion of Comfort, stability of Eclipsion",
            body:
              "Not better than each at their own thing — but the only Yonex shoe that does a reasonable version of all three. The wide variant is the rare badminton shoe that handles wide feet without losing structural stability.",
          },
          {
            kind: "comparison",
            heading: "65 Z4 vs the rest of the Yonex Z lineup",
            columns: ["65 Z4", "Aerus Z2", "Comfort Z3", "Eclipsion Z3"],
            rows: [
              {
                label: "Weight",
                values: ["325g", "271g", "370g", "~360g"],
              },
              {
                label: "Cushion",
                values: ["Medium-high", "Low-medium", "High", "High"],
              },
              {
                label: "Court speed",
                values: ["Medium-fast", "Fast", "Medium", "Medium"],
              },
              {
                label: "Wide variant",
                values: ["Yes (Wide / VA)", "Limited", "Limited", "No"],
              },
            ],
          },
          {
            kind: "verdict",
            heading: "Buying call",
            body:
              "The 65 Z4 is the most broadly useful pick in this Yonex shoe source set. If you do not have a strong reason to specialise, this is the shoe to demo first.",
            bullets: [
              "Strong default recommendation for a first tournament-tier shoe.",
              "Wide variant is aimed at players who get pinched in Aerus Z2.",
              "Better grip than 65 Z3 — noticeable on synthetic and wood courts.",
            ],
          },
        ],
      },
      sections: [
        {
          heading: "Why the 65 series stays relevant",
          body: "Twenty years on, 65 Z4 keeps the same trick that made the original 65 famous — refusing to specialise. Each Z generation has narrowed the gap with the more focused options: faster than Comfort Z3, more cushioned than Aerus Z2, more stable than entry-level shoes. The Z4 is the most evenly tuned of the line in this source set. If you cannot decide between Aerus Z2 and Comfort Z3, the 65 Z4 is often the safer demo pair.",
        },
        {
          heading: "What the Radial Blade outsole actually changes",
          body: "Yonex claims +3% grip from the new pattern. On the floor, the difference shows up most on aggressive lateral pushes — split-step recoveries hold more decisively, and the squeak under hard direction changes is louder, which usually correlates with better friction. On dusty courts the improvement is subtler. Worth replacing 65 Z3 for? Only if your current pair is at end-of-life — the Z3 is still excellent. Worth picking over 65 Z3 for a fresh purchase? Yes, almost without question.",
        },
        {
          heading: "Fit, width, and the wide variant",
          body: "Standard Z4 runs slightly narrower than 65 Z3 because the seamless upper saves material. The Wide / VA variant remains the cleanest answer for wide feet on the Yonex roster — same midsole, same outsole, just a wider forefoot. Heel cup is firm and locks well. If you previously needed to size up half a size for forefoot space in 65 Z3, try the Z4 in your normal size first.",
        },
        {
          heading: "Cushion vs ground feel",
          body: "The Z4 sits midway between Aerus Z2 and Comfort Z3. Power Cushion+ in the heel handles landing impact better than Aerus Z2; the forefoot is firmer than Comfort Z3, which preserves split-step responsiveness. Players who currently wear Aerus Z2 and want more knee protection without giving up speed should test 65 Z4 first. Players in Comfort Z3 who feel sluggish on direction changes may also feel the upgrade.",
        },
        {
          heading: "Who should pick another Yonex shoe instead",
          body: "Pick Aerus Z2 if you weigh under 65kg, prioritize ground feel, and play primarily singles where speed wins. Pick Comfort Z3 if you have ankle, knee, or heel comfort flags and need maximum cushioning. Pick Eclipsion Z3 if you weigh over 80kg, play long singles tournaments back-to-back, and need maximum stability over speed. For everyone else — and that is most amateur club players — 65 Z4 is the right answer.",
        },
      ],
      cta: "Run the shoe finder with your width and joint flags — 65 Z4 will rank high for most balanced profiles.",
    },
    {
      slug: "kawasaki-master-mao-20-racket-review",
      updatedAt: "2026-05-08",
      category: "reviews",
      title: "Kawasaki Master Mao 20 review: a budget brand starts pulling its punches up",
      dek: "Coach Li Mao's signature attack racket pushes Kawasaki into pro-tier conversation. Surprising weight transfer, solid build, and a real argument against paying double for Yonex.",
      reviewSummary: {
        verdict:
          "Genuinely competitive head-heavy attack racket at a sub-flagship price.",
        bestFor: [
          "Smash-focused players on a budget",
          "Players with proven shaft-loading technique",
          "Buyers tired of the Yonex / Victor / Li-Ning axis",
        ],
        avoidIf: [
          "You need fast doubles defence",
          "You want predictable resale liquidity",
        ],
        setupNotes: [
          "Source 4U/G5 sample, BG65Ti at 26 lb, balance ~308mm.",
          "Box-frame, Toray carbon yarn, butterfly cymbal sound system patent.",
        ],
        sourceHook:
          "The KACE shoe review made Kawasaki worth taking seriously. The Mao 20 is the racket version of the same argument.",
      },
      story: {
        intro:
          "There is a category of badminton equipment that exists only because Yonex, Victor, and Li-Ning charge a premium for their flagship logos. Kawasaki has historically been the budget alternative — close-but-not-quite. The Master Mao 20 is the first Kawasaki frame that earns a serious comparison rather than a polite nod. It is built around Coach Li Mao's input, runs Toray carbon yarn, and the smash transfer feel is closer to an Astrox 88D Pro than the price tag would suggest.",
        blocks: [
        {
                  kind: "methodology",
                  headline: "Observer methodology — source review with Maynooth/Dublin club-ecosystem cross-reference",
                  context: "observer",
                  conditions: {
                    opponents: "Division 4 Ireland practice partners",
                    courtSurface: "wood and synthetic court mat",
                    venue: "Maynooth University, multiple Dublin clubs",
                  },
                  comparators: ["Yonex Astrox 88D Pro 2024 (founder firsthand)"],
                  sourceAttribution:
                    "BadmintonCN community source reviews; observer commentary by Rui Su drawn from Maynooth University and Dublin club ecosystem context.",
                },
        {
          kind: "firstPerson",
          context: "Where Kawasaki sits in my recommendation set",
          body:
            "I have not played the Master Mao 20 as a main. Kawasaki is on the watchlist for value-tier head-heavy options — at the price band, it competes with second-tier Yonex and Li-Ning rather than flagships. Worth a demo only if you have already ruled out the Yonex 77 Pro and Li-Ning AxForce 80 on price or availability.",
        },
          {
            kind: "facts",
            heading: "What the Mao 20 brings",
            items: [
              {
                label: "Frame",
                value: "Box-type with butterfly cymbal sound system — patented top-frame holes that flatten string-bed peg profiles for cleaner transfer.",
              },
              {
                label: "Carbon",
                value: "Toray carbon yarn, similar grade to mid-tier Yonex frames.",
              },
              {
                label: "Balance",
                value: "Head-heavy (~308mm balance, 4U/G5 sample).",
              },
              {
                label: "Coach input",
                value: "Tuned with Coach Li Mao, longtime professional badminton coach.",
              },
            ],
          },
          {
            kind: "callout",
            label: "What surprised us",
            title: "The smash sound is not the marketing — it is the hit feel",
            body:
              "The flat-frame string peg system is a small change in spec but a meaningful one in feel. Smash transfer is crisper than older Kawasaki flagships and closer to mid-Astrox character.",
          },
          {
            kind: "comparison",
            heading: "Mao 20 vs same-tier attack rackets",
            columns: ["Mao 20", "Astrox 88D Pro 2024", "Halbertec 9000 Power"],
            rows: [
              {
                label: "Smash transfer",
                values: ["Crisp, direct", "Crisper, more direct", "Heavy, dense"],
              },
              {
                label: "Build quality",
                values: ["Solid mid-tier", "Best in class", "Best in class"],
              },
              {
                label: "Price",
                values: ["$140-180", "$240", "$260"],
              },
              {
                label: "Resale",
                values: ["Limited", "Strong", "Strong in Asia"],
              },
            ],
          },
          {
            kind: "verdict",
            heading: "Buying call",
            body:
              "Buy if you specifically want a head-heavy attack racket and resale value is not part of your decision. The shaft-loading expectations are real but not punishing.",
            bullets: [
              "First Kawasaki frame that justifies the comparison to Astrox 88D Pro.",
              "Build quality has caught up with established brands.",
              "Pricing genuinely undercuts Yonex flagships.",
            ],
          },
        ],
      },
      sections: [
        {
          heading: "Why the Master Mao 20 actually exists",
          body: "Kawasaki has been adjacent to the badminton conversation for years — fine value rackets, occasionally a real performer, but rarely something that competed at the flagship level. The Mao series is the brand's deliberate push into pro-tier perception, signed off by Coach Li Mao who has worked with multiple national programs. Mao 20 is the line's flagship attack frame. The pitch: pro-tier feel and build, sub-flagship price.",
          glossaryLinks: [{ term: "Head-heavy", id: "head-heavy" }, { term: "Smash", id: "smash" }],
        },
        {
          heading: "The flat-frame peg system, explained simply",
          body: "Most rackets thread strings through grommets that sit slightly proud of the frame surface. Kawasaki's patented system flattens these — peg caps sit nearly flush with the frame inner wall. The practical effect described by the source review is more direct force transfer into the shuttle because the string bed has less slack. On smashes the result is a sharper sound and a cleaner pocket. It is a small spec change that produces a real feel change, more commonly associated with higher-tier frames.",
        },
        {
          heading: "Where it competes head-to-head with Yonex 88D Pro",
          body: "On smashes the Mao 20 transfers force with the directness usually reserved for Astrox-tier rackets. On clears it produces good length without requiring perfect timing. Box-frame stability holds the head straight under fast drives. Where it loses to the 88D Pro: the absolute top-end is still a step lower, and the shaft is slightly less elastic on continuous attack across long rallies. The gap is closer than the price suggests, but it exists.",
        },
        {
          heading: "What you give up at this price",
          body: "Three honest cautions. First, resale liquidity is limited — Kawasaki rackets do not hold value the way Yonex flagships do, so factor in higher real cost of ownership if you change rackets often. Second, build variance is real — weigh the exact sample before stringing. Third, the head-heavy balance is non-negotiable; this is not a doubles defender. If you play significant front-court doubles you will outgrow the Mao 20 quickly.",
        },
        {
          heading: "Who should buy it",
          body: "Buy the Mao 20 if you want a serious head-heavy attack frame at $140-180 and you accept the brand-equity trade-off. It fits intermediate-to-advanced players who already drive a stiff shaft cleanly and want pro-tier smash feel without the Yonex / Victor / Li-Ning premium. Skip if you need fast doubles defence, if you flip rackets every season, or if you want predictable resale. The 88D Pro 2024 still wins on absolute ceiling in the source comparison — the Mao 20 wins on value-per-dollar at the smash.",
        },
      ],
      cta: "Compare Mao 20 with Astrox 88D Pro 2024 in the finder — we surface the trade-offs explicitly.",
    },
    {
      slug: "kumpoo-shura-2-racket-review",
      updatedAt: "2026-05-08",
      category: "reviews",
      title: "Kumpoo Shura II review: an honest violence racket for the right hand",
      dek: "The 6.1mm shaft, the box frame, and the heavy head all say one thing: this racket exists to bury smashes. The trick is knowing whether your timing earns it.",
      reviewSummary: {
        verdict:
          "Pure attack racket — punishing for the unprepared, devastating for those it fits.",
        bestFor: [
          "Players who already drive Astrox 100ZZ or Halbertec 9000 Power cleanly",
          "Smash-focused singles players",
          "Players who specifically want non-mainstream brand identity",
        ],
        avoidIf: [
          "You play any meaningful doubles defence",
          "Your shoulder fatigues on stiff frames",
          "You are still developing power-stroke timing",
        ],
        setupNotes: [
          "Source 4U/G5 sample, ~88g strung at 28 lb.",
          "6.1mm extra-stiff shaft, box-frame head with bottom wind-cutting and top fluid-box.",
        ],
        sourceHook:
          "The original Shura earned cult status as Kumpoo's attack flagship. The II tightens the shaft response and asks even more of the user.",
      },
      story: {
        intro:
          "Pure attack rackets are an honest category. They do one thing — load force, fire it through a stiff shaft, leave the shuttle steeper than it has any right to be. They are bad at most other things. The Kumpoo Shura II is the most committed example of the type on the market right now. The 6.1mm shaft is among the thinnest in production. The frame is heavy and stable. The recovery is slow. If those words describe what you want, the rest of this review will tell you whether it earns the price.",
        blocks: [
        {
                  kind: "methodology",
                  headline: "Observer methodology — source review with Maynooth/Dublin club-ecosystem cross-reference",
                  context: "observer",
                  conditions: {
                    opponents: "Division 4 Ireland practice partners",
                    courtSurface: "wood and synthetic court mat",
                    venue: "Maynooth University, multiple Dublin clubs",
                  },
                  comparators: ["Li-Ning Halbertec 9000"],
                  sourceAttribution:
                    "BadmintonCN community source reviews; observer commentary by Rui Su drawn from Maynooth University and Dublin club ecosystem context.",
                },
        {
          kind: "firstPerson",
          context: "Why I would still try a smaller brand",
          body:
            "Most amateur players I know default to Yonex / Victor / Li-Ning and never demo a smaller brand. I have not played the Shura 2 — but the case for trying a Kumpoo frame is purely value: you are paying for the raw frame rather than the marketing. The case against: stringer familiarity and warranty channels matter more for smaller brands than the racket itself often does.",
        },
          {
            kind: "facts",
            heading: "Spec snapshot",
            items: [
              {
                label: "Shaft",
                value: "6.1mm — among the thinnest production shafts. Extra-stiff response.",
              },
              {
                label: "Frame",
                value: "Bottom wind-cutting, top fluid-box — strong directional bias toward smash.",
              },
              {
                label: "Balance",
                value: "Head-heavy (~310mm range).",
              },
              {
                label: "Heritage",
                value: "Used by Kumpoo's pro tour squad. Successor to the original Shura cult favourite.",
              },
            ],
          },
          {
            kind: "callout",
            label: "Who this is for",
            title: "Players who already drive a 100ZZ cleanly",
            body:
              "If your current racket is a 100ZZ, 88D Pro 2024, or Halbertec 9000 Power and you find them rewarding (not punishing), Shura II is the next-tier conversation. If those rackets feel demanding to you, Shura II will be unkind.",
          },
          {
            kind: "comparison",
            heading: "Shura II vs cross-brand attack flagships",
            columns: ["Shura II", "Astrox 100ZZ", "Halbertec 9000 Power"],
            rows: [
              {
                label: "Shaft thinness",
                values: ["6.1mm (thinnest)", "Standard", "Standard"],
              },
              {
                label: "Smash density",
                values: ["Very high", "Very high", "Highest"],
              },
              {
                label: "Recovery speed",
                values: ["Slow", "Medium", "Slow"],
              },
              {
                label: "Brand identity",
                values: ["Cult / niche", "Mainstream flagship", "Strong in Asia"],
              },
            ],
          },
          {
            kind: "verdict",
            heading: "Buying call",
            body:
              "Buy only if your timing is genuinely tournament-tier and you specifically want a non-mainstream attack flagship. Skip if you mix doubles and singles or if your shoulder has any fatigue history.",
            bullets: [
              "Best paired with thin attack strings (BG80 Power, EXBOLT 63) at 27-29 lb.",
              "Not a starter racket — never recommended below competitive tier.",
              "Brand cult value is a feature for some buyers and a bug for others.",
            ],
          },
        ],
      },
      sections: [
        {
          heading: "What 6.1mm actually feels like",
          body: "Most rackets use 6.5-7.0mm shafts because that is the sweet spot for amateur swing speed — thin enough to bend usefully, thick enough to forgive late timing. 6.1mm sits below that range. When you connect cleanly, the shaft loads quickly and snaps back with sharper force than thicker shafts can match. When you connect late, the shaft is too stiff to compensate and you get short clears with shoulder strain. There is no middle ground; the racket is uncompromisingly black-or-white.",
        },
        {
          heading: "Why the Shura II is sharper than the original",
          body: "The first Shura earned a cult following for its directional honesty — what you swung at went there. The II tightens the shaft tolerance and adds a slightly heavier head. On smashes the result is a sharper crack of contact and meaningfully higher shuttle velocity off the string bed. On drops and net play the same tightening makes touches feel firmer and less forgiving. The II is more committed to its identity than the original.",
        },
        {
          heading: "Singles-only territory",
          body: "Front-court doubles is not a serious option here. The recovery between shots is too slow to handle continuous flat-drive exchanges. Mixed doubles where you anchor rear court is plausible but rarely optimal — the 88S Pro 2024 will produce more cumulative match power for the same player. Singles is where Shura II makes sense: long rallies with deliberate smashes, high control of trajectory, and the shoulder budget to absorb the demand.",
        },
        {
          heading: "Stringing and tension",
          body: "Pair Shura II with thin attack strings — BG80 Power, EXBOLT 63 — at 27-29 lb. Lower tension wastes the shaft's response. Higher tension narrows the sweet spot to a punishing degree even for skilled players. Standard durability strings (BG65) muffle the racket too much; the shaft is built to fire crisp, not crisp-and-soft.",
        },
        {
          heading: "Who should buy it",
          body: "Buy Shura II if you compete in singles at a competitive or pro-track level, your current racket is a 100ZZ or equivalent, and you want a brand identity outside the Yonex / Victor / Li-Ning axis. Skip if you mix singles and doubles, if your shoulder has fatigue history, or if you ever play against players who hit fast flat drives — the recovery speed will not keep up.",
        },
      ],
      cta: "Run the finder with smash-heavy and singles-attack preferences to compare Shura II against 100ZZ and 88D Pro 2024.",
    },
    {
      slug: "victor-yu-12-racket-review",
      updatedAt: "2026-05-08",
      category: "reviews",
      title: "Victor Yu 12 review: control players finally have a Victor flagship",
      dek: "Yu series gets its biggest rebuild since launch — alloy carbon, WES 3.0, and Victor's full tech stack pointed at a single goal: control with finishing weight.",
      reviewSummary: {
        verdict:
          "The cleanest expression of Victor's all-court control philosophy in years.",
        bestFor: [
          "Singles control players who attack from setup",
          "Mixed doubles organisers",
          "Victor loyalists tired of choosing between speed and head weight",
        ],
        avoidIf: [
          "You want raw smash brutality",
          "You play primarily fast flat-drive doubles",
        ],
        setupNotes: [
          "Source 4U/G5 sample, ~84g unstrung.",
          "Alloy carbon fiber + WES 3.0 whip-strike system.",
        ],
        sourceHook:
          "Yu was historically Victor's quiet line. Yu 12 is the first version that earns the flagship label.",
      },
      story: {
        intro:
          "Most badminton brands have a clear flagship for each style. Yonex has the 88S Pro for control and the 88D Pro for attack. Li-Ning has the Halbertec line for both. Victor has been weaker at this — its lineup leans speed almost everywhere, which makes it harder for players who want a Victor frame for organised, control-first rallies. Yu 12 is Victor's deliberate fix. The line gets alloy carbon, WES 3.0 whip-strike, and the same precision tuning that the Auraspeed flagships received. The result is a control-with-finishing-weight racket that finally completes the brand's lineup.",
        blocks: [
        {
                  kind: "methodology",
                  headline: "Observer methodology — source review with Maynooth/Dublin club-ecosystem cross-reference",
                  context: "observer",
                  conditions: {
                    opponents: "Division 4 Ireland practice partners",
                    courtSurface: "wood and synthetic court mat",
                    venue: "Maynooth University, multiple Dublin clubs",
                  },
                  comparators: ["Victor Auraspeed family"],
                  sourceAttribution:
                    "BadmintonCN community source reviews; observer commentary by Rui Su drawn from Maynooth University and Dublin club ecosystem context.",
                },
        {
          kind: "firstPerson",
          context: "Where the Yu 12 sits in the Victor lineup",
          body:
            "I have not played the Yu 12 as a main. From the coach-side conversations I'm part of, it is the Victor all-court option that gets compared most often to the Yonex Arcsaber 11 Pro — a balanced control frame for players who want one racket to cover both singles and doubles competently.",
        },
          {
            kind: "facts",
            heading: "What is new in the Yu 12",
            items: [
              {
                label: "Frame material",
                value: "Alloy carbon fiber — Victor's higher-grade composite mix.",
              },
              {
                label: "WES 3.0",
                value: "Updated whip-strike enhancement system — claimed faster shaft snap-back.",
              },
              {
                label: "Force ring Pro",
                value: "Frame-internal reinforcement — denser pocketing, less twist on off-centre hits.",
              },
              {
                label: "Yu identity",
                value: "Control-leaning balance with enough head weight to finish rallies.",
              },
            ],
          },
          {
            kind: "callout",
            label: "Where it sits in Victor's lineup",
            title: "Halfway between Auraspeed HS Plus and DriveX 12",
            body:
              "Auraspeed HS Plus is faster and more attack-oriented. DriveX 12 is more flat-drive specialised. Yu 12 is the all-court control answer that the Victor lineup has been missing.",
          },
          {
            kind: "comparison",
            heading: "Yu 12 vs cross-brand control rackets",
            columns: ["Yu 12", "Astrox 88S Pro", "Arcsaber 11 Pro"],
            rows: [
              {
                label: "Best for",
                values: [
                  "All-court control with finish",
                  "Front-court doubles control",
                  "Pure control / soft pocketing",
                ],
              },
              {
                label: "Smash quality",
                values: ["Strong for control class", "Strong", "Modest"],
              },
              {
                label: "Net touch",
                values: ["Crisp, predictable", "Crisp, lively", "Soft, forgiving"],
              },
              {
                label: "Speed of swing",
                values: ["Medium", "Medium-fast", "Medium-slow"],
              },
            ],
          },
          {
            kind: "verdict",
            heading: "Buying call",
            body:
              "Buy if your match pattern is build-and-finish singles, mixed doubles organisation, or all-court doubles where you control rather than attack. Skip if you want raw smash power or fast flat-drive defence.",
            bullets: [
              "Best Victor frame for buyers who like Arcsaber 11 Pro behaviour but want more finish.",
              "Pairs well with EXBOLT 63 or AeroBite at 25-27 lb.",
              "First serious answer to 88S Pro 2024 from Victor.",
            ],
          },
        ],
      },
      sections: [
        {
          heading: "Why Yu 12 finally feels like a Victor flagship",
          body: "Yu series rackets have historically been honest mid-tier control frames — fine for the price, never the conversation. Yu 12 changes that by inheriting Victor's full top-tier tech stack: alloy carbon, WES 3.0, Force Ring Pro, and the precision tuning the Auraspeed line received. The result is a frame that competes against Astrox 88S Pro and Arcsaber 11 Pro on substance, not just price.",
          glossaryLinks: [{ term: "Smash", id: "smash" }],
        },
        {
          heading: "What WES 3.0 changes in practice",
          body: "Whip-strike systems sit between marketing and engineering. WES 3.0 is Victor's third-generation tune — a slightly tighter shaft load curve that snaps back faster than WES 2.0 frames. On clears the difference is small but real: less wasted energy at the end of the swing. On drives the shaft transitions faster between bend and recovery, which matters when you redirect mid-stroke. None of this transforms the racket, but it does sharpen the feel of an already polished frame.",
        },
        {
          heading: "Where it competes against 88S Pro 2024",
          body: "Astrox 88S Pro 2024 is the cross-brand benchmark for control rackets right now. Yu 12 sits closer than any previous Victor frame — sharper net touch than 88S Pro, slightly less explosive on smashes, and a fractionally faster swing. Buyers cross-shopping these two should pick Yu 12 if their priority is build-rally singles or mixed doubles organisation, and 88S Pro if their priority is front-court doubles control with attack capability when needed.",
        },
        {
          heading: "What it loses to the rest of the Victor line",
          body: "If your goal is raw rear-court attack, Yu 12 is the wrong frame — Auraspeed 100X SE, HS Plus, or even 90K II will outperform it on absolute smash mass. If your goal is fastest possible drives, DriveX 12 will recover slightly quicker. Yu 12 wins when you need both speed and finish in the same racket; it loses when you need the maximum of either alone.",
        },
        {
          heading: "Who should buy it",
          body: "Buy Yu 12 if you play singles built around length, control, and a finishing smash from setup; or mixed doubles where your role is to organise rallies rather than bury smashes. Skip if your match-winners are flat drives or rear-court attack — Auraspeed line frames remain better in the source comparison. The Victor brand now has a flagship-tier control racket in this source set; Yu 12 is it.",
        },
      ],
      cta: "Compare Yu 12 with Astrox 88S Pro 2024 and Arcsaber 11 Pro in the finder.",
    },
    {
      slug: "victor-auraspeed-fantome-review",
      updatedAt: "2026-05-08",
      category: "reviews",
      title: "Victor Auraspeed Fantome (Phantom) review: speed for the precision player",
      dek: "Lavender pastels and a 5.8mm shaft sound like contradictions. The Fantome resolves them with the cleanest Auraspeed feel Victor has ever shipped.",
      reviewSummary: {
        verdict:
          "A speed racket built around precision, not just velocity.",
        bestFor: [
          "Front-court doubles players who want sharper directional feedback",
          "Control players who keep mishitting head-light frames",
          "Players who specifically prefer thinner shafts",
        ],
        avoidIf: [
          "You need raw smash power",
          "Your timing is still developing",
        ],
        setupNotes: [
          "Source 4U/G5 sample, balance ~290mm.",
          "5.8mm shaft, alloy carbon, narrowest Auraspeed frame profile in the line.",
        ],
        sourceHook:
          "Victor has shipped many Auraspeed variants. Fantome is the one that resolves the speed-vs-control trade-off cleanest.",
      },
      story: {
        intro:
          "Victor's Auraspeed line has explored speed in many directions — pure wind-cutting frames, thin-shaft frames, balanced control speed frames. Fantome takes the thin-shaft thesis to its current limit. The 5.8mm shaft is among the thinnest Victor has produced. The frame is among the narrowest Auraspeed profiles available. The result is a racket that is genuinely fast but rewards precision over force in ways that other speed frames do not.",
        blocks: [
        {
                  kind: "methodology",
                  headline: "Observer methodology — source review with Maynooth/Dublin club-ecosystem cross-reference",
                  context: "observer",
                  conditions: {
                    opponents: "Division 4 Ireland practice partners",
                    courtSurface: "wood and synthetic court mat",
                    venue: "Maynooth University, multiple Dublin clubs",
                  },
                  comparators: ["Victor Auraspeed family"],
                  sourceAttribution:
                    "BadmintonCN community source reviews; observer commentary by Rui Su drawn from Maynooth University and Dublin club ecosystem context.",
                },
        {
          kind: "firstPerson",
          context: "How I anchor the Fantome",
          body:
            "I have not played the Fantome but it is in the bracket I shop for doubles speed frames (Nanoflare 1000 Z, Auraspeed HS Plus). For Victor-loyal players who want a speed frame slightly more accessible than the HS Plus, the Fantome is the natural step down. Demo before you buy — the speed-frame category has unusually large feel variance between models.",
        },
          {
            kind: "facts",
            heading: "Fantome at a glance",
            items: [
              {
                label: "Shaft",
                value: "5.8mm — thinnest in the Auraspeed family.",
              },
              {
                label: "Balance",
                value: "Head-light (~290mm range, 4U).",
              },
              {
                label: "Frame",
                value: "Narrow Auraspeed profile, lower wind resistance.",
              },
              {
                label: "Identity",
                value: "Speed-with-precision, not speed-with-defence.",
              },
            ],
          },
          {
            kind: "callout",
            label: "Where it differs from Nanoflare 1000Z",
            title: "Sharper feedback, less raw acceleration",
            body:
              "Nanoflare 1000Z prioritises end-speed of the shaft snap. Fantome prioritises directional clarity — you know exactly where the shuttle is going, even on a quick redirect.",
          },
          {
            kind: "comparison",
            heading: "Fantome vs other speed flagships",
            columns: ["Fantome", "Nanoflare 1000Z", "Auraspeed HS Plus"],
            rows: [
              {
                label: "Best for",
                values: [
                  "Precision speed",
                  "Pure end-speed",
                  "Speed + smash mass",
                ],
              },
              {
                label: "Shaft thickness",
                values: ["5.8mm", "Standard", "Standard"],
              },
              {
                label: "Smash quality",
                values: ["Modest", "Modest", "Strong"],
              },
              {
                label: "Net touch",
                values: ["Excellent", "Good", "Good"],
              },
            ],
          },
          {
            kind: "verdict",
            heading: "Buying call",
            body:
              "Buy if you specifically want precision-speed for front-court doubles or control-leaning singles. Skip if you need rear-court attack or pure flat-drive defence.",
            bullets: [
              "Best in class for net play among speed rackets.",
              "Lavender pastel cosmetic is unusual for a flagship — divisive.",
              "Pair with thin elastic strings (Aerobite, BG66 Ultimax) at 24-26 lb.",
            ],
          },
        ],
      },
      sections: [
        {
          heading: "What a 5.8mm shaft is actually for",
          body: "Thinner shafts are not automatically better — they trade two things off. They have less torsional stability than thick shafts, so off-centre hits twist more. They also have a narrower force window — too soft a swing and they do not load, too hard a swing and they ring. The point of a 5.8mm shaft is precision: when your timing is right, you get sharper feedback than thicker shafts can transmit. The Fantome is built for players who already hit clean enough to benefit from that precision.",
        },
        {
          heading: "Front-court doubles is where it shines",
          body: "Net play is the strongest argument for the Fantome. Hairpin shots feel exact. Push variations land where you aim them. Directional clarity on flat drives is sharper than on Nanoflare 1000Z. Defensive lifts come off the string bed cleanly without the muddy feel some thicker-shaft speed rackets produce. If you are a designated front-court doubles player who values placement over power, this is the most precise speed flagship currently available.",
        },
        {
          heading: "Where it loses to other speed rackets",
          body: "Two things. First, the smash power is modest — even compared to other speed frames like Nanoflare 1000Z, Fantome's head-light balance and thin shaft mean the absolute smash ceiling is lower. Second, the Fantome's narrow margin for error makes it less forgiving on tired-arm sessions. Late-rally rallies start to feel uneven if your swing speed drops. Players with very stable consistent technique benefit; players whose timing varies session-to-session may find it punishing.",
        },
        {
          heading: "What the cosmetic does and does not say",
          body: "The lavender / Roland purple cosmetic is unusual for a serious badminton flagship. Some buyers will find it elegant; others will find it lightweight in image. Worth noting — the cosmetic does not affect performance, but second-hand buyers in some regions skew strongly traditional, so resale value may be slightly lower than equivalent darker-coloured Auraspeed frames. If resale matters, factor it in.",
        },
        {
          heading: "Who should buy it",
          body: "Buy Fantome if you play front-court doubles or precision-control singles, your current racket is an Auraspeed 90K II or Nanoflare 700 Pro, and you want sharper directional feedback than those frames give you. Skip if you play primarily rear-court doubles, if your match-winners are smashes, or if you want a long-term investment that holds resale predictably. The Fantome is a deliberate choice for a specific play style — exactly what the Auraspeed line should produce.",
        },
      ],
      cta: "Run the finder with front-court doubles or precision-control profile to compare Fantome with Nanoflare 1000Z.",
    },
    {
      slug: "li-ning-thunder-100-gen-2-vs-gen-1",
      updatedAt: "2026-05-08",
      category: "comparisons",
      title: "Li-Ning Thunder 100 II vs Thunder 100 (Gen 1): the rebuild that earns the name",
      dek: "Two years on, Li-Ning rebuilds the Thunder 100 with new construction, broader sweet spot, and meaningfully cleaner hit feel. Here is how the generations actually compare.",
      reviewSummary: {
        verdict:
          "Thunder 100 II is a real upgrade — sharper feel, better build, broader timing window than Gen 1.",
        bestFor: [
          "Players who own Gen 1 and want a more polished version",
          "Smash-focused intermediate to advanced players",
          "Buyers wanting a Yonex 100ZZ alternative",
        ],
        avoidIf: [
          "Gen 1 already fits your match pattern perfectly",
          "You need fast doubles defence over rear-court power",
        ],
        setupNotes: [
          "Source 4U/G5 samples for both generations.",
          "Gen 2 uses M50+T1100 carbon with reinforced composite frame.",
        ],
        sourceHook:
          "Generation comparisons are usually marginal. This one is large enough to matter.",
      },
      story: {
        intro:
          "Most racket generation upgrades are small — slight cosmetic refresh, marginal spec changes, sometimes a new shaft tune. Thunder 100 II is the rare generation that earns the comparison rather than just inheriting the name. Li-Ning rebuilt the frame construction, broadened the sweet spot, and tightened the shaft response. Owners of Gen 1 will recognise the family character; new buyers should not assume Gen 1 reviews tell them what to expect from Gen 2.",
        blocks: [
        {
                  kind: "methodology",
                  headline: "Observer methodology — source review with Maynooth/Dublin club-ecosystem cross-reference",
                  context: "observer",
                  conditions: {
                    opponents: "Division 4 Ireland practice partners",
                    courtSurface: "wood and synthetic court mat",
                    venue: "Maynooth University, multiple Dublin clubs",
                  },
                  comparators: ["Li-Ning Halbertec 9000"],
                  sourceAttribution:
                    "BadmintonCN community source reviews; observer commentary by Rui Su drawn from Maynooth University and Dublin club ecosystem context.",
                },
        {
          kind: "firstPerson",
          context: "Where the Thunder 100 line sits",
          body:
            "I have not personally played either generation of the Thunder 100 — Li-Ning's premium attack line. The pattern I have noticed across teammates who have moved between generations: Gen 2's redesigned shaft feels noticeably faster than Gen 1, so if you are sourcing one from a used market, the generation gap is worth the price difference. Confirm the gen against Li-Ning's anti-counterfeit code before you pay.",
        },
          {
            kind: "facts",
            heading: "What changed between generations",
            items: [
              {
                label: "Frame construction",
                value: "Gen 2 uses composite威力 (Power) frame design — internal-reinforced layers vs Gen 1's standard layup.",
              },
              {
                label: "Carbon",
                value: "M50+T1100 carbon retained from Gen 1; layup density and orientation refined.",
              },
              {
                label: "Sweet spot",
                value: "Gen 2 noticeably broader on off-centre hits.",
              },
              {
                label: "Shaft",
                value: "Gen 2 shaft is firmer and snaps back faster than Gen 1.",
              },
            ],
          },
          {
            kind: "callout",
            label: "Why this matters",
            title: "Gen 1 owners cannot assume Gen 2 will feel the same",
            body:
              "If you own Gen 1 and adapted to its slightly less forgiving sweet spot, Gen 2 will feel more polished but also slightly different on contact. Demo before swapping if possible.",
          },
          {
            kind: "comparison",
            heading: "Gen 1 vs Gen 2 in one table",
            columns: ["Gen 1", "Gen 2"],
            rows: [
              {
                label: "Sweet spot size",
                values: ["Standard", "Broader"],
              },
              {
                label: "Smash sound",
                values: ["Sharp", "Sharper, denser"],
              },
              {
                label: "Build quality",
                values: ["Solid", "Higher density layup"],
              },
              {
                label: "Forgiveness on late timing",
                values: ["Lower", "Slightly higher"],
              },
              {
                label: "Best buy",
                values: ["Discount, if available", "Default for new buyers"],
              },
            ],
          },
          {
            kind: "verdict",
            heading: "Buying call",
            body:
              "New buyers: pick Gen 2. Gen 1 owners: only swap if you find Gen 1 timing demands cap your match performance. The Gen 2 upgrade is real but not transformational.",
            bullets: [
              "Gen 2 broadens the timing window, helping intermediate players reach the racket's potential.",
              "Gen 1 still fine if it fits — do not chase the upgrade for its own sake.",
              "Both pair best with attack strings (BG80, EXBOLT 63) at 26-28 lb.",
            ],
          },
        ],
      },
      sections: [
        {
          heading: "What the composite frame actually changes",
          body: "Li-Ning's composite威力 (Power) frame design adds internal reinforcement layers that change how energy travels through the head. On Gen 1 the frame transmitted force fairly cleanly but had a smaller forgiveness window on off-centre hits — late or early contact felt lifeless. Gen 2 spreads contact response more evenly across the string bed, which translates to a noticeably broader sweet spot. On smashes the result is denser sound and more consistent power across the head. On clears the result is more forgiving length on imperfect timing.",
          glossaryLinks: [{ term: "Sweet spot", id: "sweet-spot" }, { term: "Smash", id: "smash" }],
        },
        {
          heading: "Where Gen 2 wins on hit feel",
          body: "Three observations from side-by-side comparison. First, the smash sound on Gen 2 is denser and lower-pitched, which usually correlates with cleaner energy transfer. Second, drops feel more controlled because the broader sweet spot reduces the muddy feel on off-centre net contact. Third, the shaft on Gen 2 snaps back faster — clears and drives both feel sharper. None of these are massive shifts, but together they make Gen 2 the polished version of Gen 1.",
        },
        {
          heading: "Where Gen 1 still holds up",
          body: "Gen 1 is not obsolete. It still produces top-tier smash power for the price, the build remains solid, and players who specifically liked the Gen 1 character (slightly more demanding, sharper edge on clean contact) may prefer it. If you find Gen 1 at meaningfully lower price (as it often discounts after Gen 2 launches), it is still a strong buy for players who already drive head-heavy attack rackets cleanly.",
        },
        {
          heading: "Cross-brand comparison",
          body: "Thunder 100 II competes most directly with Yonex Astrox 99 Pro 2 on the singles attack tier. Astrox 99 Pro 2 has slightly cleaner shaft response and stronger resale liquidity outside Asia. Thunder 100 II is meaningfully cheaper and has a broader sweet spot than the Yonex equivalent. On absolute peak smash power they trade blows. On overall package the Yonex still has a marginal edge, but the price gap matters.",
        },
        {
          heading: "Who should buy it",
          body: "Buy Thunder 100 II if you are an intermediate-to-advanced singles player or a rear-court doubles attacker, and your current racket is an Astrox 88D Pro, AxForce 80, or earlier Halbertec model. Skip if you play primarily front-court doubles or fast flat drives — Thunder 100 II is unambiguously a rear-court attack frame. Gen 1 owners should only upgrade if they find Gen 1's timing demands holding back their match results.",
        },
      ],
      cta: "Use the finder with rear-court attack and singles preferences to compare Thunder 100 II with Astrox 99 Pro 2 and Halbertec 9000 Power.",
    },
    {
      slug: "li-ning-aerus-iii-pro-shoes-review",
      updatedAt: "2026-05-08",
      category: "reviews",
      title: "Li-Ning Aerus III Pro review: the supercritical foam shoe grows up",
      dek: "Fifteen years after the original Aerus introduced supercritical foam to badminton, the III Pro arrives with stability fixes the line has needed since launch.",
      reviewSummary: {
        verdict:
          "Best Aerus generation yet — finally pairs the springy foam with the structural support it always needed.",
        bestFor: [
          "Players who liked Aerus II foam but found it unstable",
          "Speed-leaning all-court players",
          "Style-conscious buyers (5 colourways)",
        ],
        avoidIf: [
          "You need maximum cushioning",
          "You weigh under 60kg and want minimal stack",
        ],
        setupNotes: [
          "Source sample EU 42 men's, ~300g per shoe.",
          "Updated supercritical TPEE foam, paired with reinforced TPU cage.",
        ],
        sourceHook:
          "Aerus pioneered supercritical foam for badminton. III Pro is the first version where the structure matches the foam's ambition.",
      },
      story: {
        intro:
          "Li-Ning's Aerus line has been the most influential and the most polarising shoe story in badminton. The 2010 original introduced supercritical foam to the sport — a stack of springy bounce that felt unlike anything Yonex or Victor were making. The 2020 II refined the formula. Both versions had the same problem: the foam was lively, but the chassis underneath did not always control where it bounced. III Pro is the version that finally fixes that — same airy, energetic foam, now wrapped in a stability cage that keeps the shoe pointed where you push it.",
        blocks: [
        {
                  kind: "methodology",
                  headline: "Observer methodology — source review with Maynooth/Dublin club-ecosystem cross-reference",
                  context: "observer",
                  conditions: {
                    opponents: "Division 4 Ireland practice partners",
                    courtSurface: "wood and synthetic court mat",
                    venue: "Maynooth University, multiple Dublin clubs",
                  },
                  comparators: ["Li-Ning Halbertec 9000"],
                  sourceAttribution:
                    "BadmintonCN community source reviews; observer commentary by Rui Su drawn from Maynooth University and Dublin club ecosystem context.",
                },
        {
          kind: "firstPerson",
          context: "How I'd compare it to my shoe",
          body:
            "I switched from the Yonex Aerus Z2 (similar speed-shoe philosophy) to the Comfort Z3 mid-season for the cushioning. Li-Ning's Aerus III Pro sits in the same family as the Aerus Z2 — light and fast, less protective. For players whose joints are happy and who prize fast lateral recovery, it is a strong demo. Not a fit if you land hard from smashes.",
        },
          {
            kind: "facts",
            heading: "What III Pro changes",
            items: [
              {
                label: "Foam",
                value: "Updated supercritical TPEE — same character as II, more consistent rebound across temperature.",
              },
              {
                label: "Cage",
                value: "Reinforced TPU lateral cage — first Aerus generation that fully arrests sideways foam squish.",
              },
              {
                label: "Outsole",
                value: "Family-resemblance Aerus pattern with refined directional grip zones.",
              },
              {
                label: "Colourways",
                value: "5 options including Cotton Candy, Year of Snake, Artist, Warning, Dark Elf.",
              },
            ],
          },
          {
            kind: "callout",
            label: "What surprised us",
            title: "The foam still feels alive",
            body:
              "Some fixes neutralise the personality of a product. III Pro retains the springy foam character that made Aerus famous — it just stops the foam from being the only thing in charge.",
          },
          {
            kind: "comparison",
            heading: "Aerus III Pro vs Yonex shoe family",
            columns: ["Aerus III Pro", "65 Z4", "Aerus Z2"],
            rows: [
              {
                label: "Foam character",
                values: ["Springy / lively", "Damped", "Damped, low stack"],
              },
              {
                label: "Stability",
                values: ["Newly improved", "Strong", "Adequate"],
              },
              {
                label: "Speed",
                values: ["Medium-fast", "Medium-fast", "Very fast"],
              },
              {
                label: "Cushion stack",
                values: ["High", "Medium-high", "Low"],
              },
            ],
          },
          {
            kind: "verdict",
            heading: "Buying call",
            body:
              "Buy if you want lively foam with finally-fixed stability. Skip if you specifically prefer flat-foam ground feel.",
            bullets: [
              "Best Aerus version Li-Ning has shipped.",
              "Wide colourway range — uncommon for serious court shoes.",
              "Pair with sturdy lateral lacing for additional lockdown.",
            ],
          },
        ],
      },
      sections: [
        {
          heading: "Why supercritical foam was always a partial solution",
          body: "Supercritical foam — gas-injected polymer that creates a uniform microcellular structure — is genuinely better than traditional EVA on bounce-back and weight. That is why Aerus changed the conversation when it launched. The catch was that the foam, by itself, did not control where the bounce went. On a hard lateral lunge, the foam compressed sideways before it returned upward, which produced a slightly drifty feel. Pros adapted; amateur players sometimes did not. III Pro adds the structural cage that keeps the foam compressing in the right direction.",
        },
        {
          heading: "What the new TPU cage actually does",
          body: "On III Pro, the lateral TPU panels extend further along the midfoot than on II, and they tie into a redesigned heel cup that locks the foot more decisively. The result: when you push laterally, the foam compresses downward more than sideways. You still feel the springy character because the foam is unchanged, but the energy returns in the direction you intended. On a quick split-step recovery, this difference is felt immediately. On a deep lunge, it shows up as faster recovery.",
        },
        {
          heading: "Cushion vs ground feel",
          body: "Aerus III Pro sits in the cushion-rich camp. The stack is taller than Aerus Z2 and noticeably above 65 Z4. If you prefer flat ground feel — short stack, immediate floor contact — III Pro is not for you. If you want a shoe that absorbs landing impact while still being responsive on push-off, this is the most refined version of that profile available right now. Players returning from ankle, knee, or heel issues will benefit from the cushion.",
        },
        {
          heading: "Width, fit, and Asian last",
          body: "Like most Li-Ning shoes, III Pro runs an Asian last — narrower forefoot than European or Yonex equivalents, with a snug heel cup. Players with wide feet should size up half a size or test in person before buying. The seamless upper helps reduce hot spots on standard-width feet. Heel lock is excellent thanks to the reinforced TPU.",
        },
        {
          heading: "Who should buy it",
          body: "Buy Aerus III Pro if you want springy supercritical foam with stability that finally matches its energy, your current shoe is an Aerus II or Comfort Z3, and you play all-court badminton with significant lateral movement. Skip if you specifically prefer flat foam (Aerus Z2), need maximum cushioning above all (Comfort Z3), or have wide feet that do not adapt to Asian lasts. The III Pro is the most refined Aerus generation yet — and arguably the best Li-Ning shoe of the past five years.",
        },
      ],
      cta: "Tell the finder your foot width and joint comfort flags — Aerus III Pro will rank high for Asian-fit speed-cushion profiles.",
    },
    {
      slug: "victor-tk-f-c-ultra-review",
      updatedAt: "2026-05-08",
      category: "reviews",
      title: "Victor TK-F C Ultra (Golden Talon) review: one model, three identities",
      dek: "Most weight variants change only the swing weight. TK-F C Ultra changes the entire racket — different shaft thickness, different tech config, three rackets sold under one name.",
      reviewSummary: {
        verdict:
          "An ambitious and largely successful experiment in weight-variant differentiation.",
        bestFor: [
          "Buyers torn between weight classes",
          "Smash-focused players who want a frame that grows with them",
          "TK-line fans who liked the Lóng Yá Zhī Rèn (Dragon Tooth Blade) but wanted variant flexibility",
        ],
        avoidIf: [
          "You want a single uncompromised frame profile",
          "You need fast doubles defence regardless of variant",
        ],
        setupNotes: [
          "Three variants (3U, 4U, 5U) ship with different shaft thickness and tech config.",
          "Source review weighted to 4U/G5 reference.",
        ],
        sourceHook:
          "Victor takes the weight-variant idea further than any racket we have seen. The 3U, 4U, and 5U Ultra are genuinely different rackets.",
      },
      story: {
        intro:
          "Most rackets ship in two or three U-class variants — same frame, different swing weight. The TK-F C Ultra rejects that convention. The 3U, 4U, and 5U variants have different shaft thickness, different tech configs, and meaningfully different attack identities. The argument: a 3U attacker and a 5U attacker have different needs, so why ship them the same physics? It is an ambitious experiment, and on court it mostly works.",
        blocks: [
        {
                  kind: "methodology",
                  headline: "Observer methodology — source review with Maynooth/Dublin club-ecosystem cross-reference",
                  context: "observer",
                  conditions: {
                    opponents: "Division 4 Ireland practice partners",
                    courtSurface: "wood and synthetic court mat",
                    venue: "Maynooth University, multiple Dublin clubs",
                  },
                  comparators: ["Victor Auraspeed family"],
                  sourceAttribution:
                    "BadmintonCN community source reviews; observer commentary by Rui Su drawn from Maynooth University and Dublin club ecosystem context.",
                },
        {
          kind: "firstPerson",
          context: "Where the TK-F C Ultra sits",
          body:
            "I have not played the TK-F C Ultra as a main but it sits in the head-heavy attack bracket I demo when teammates ask for an Astrox 88D Pro alternative. The TK series has been around long enough that you can find used copies; the C Ultra refinement of the shaft system is the part most worth the extra money over older generations.",
        },
          {
            kind: "facts",
            heading: "What is different across variants",
            items: [
              {
                label: "3U / Heavy attacker",
                value: "Thicker shaft, tuned for heavy power strokes, max smash mass.",
              },
              {
                label: "4U / Balanced attacker",
                value: "Mid-thickness shaft, balanced attack-recovery profile.",
              },
              {
                label: "5U / Burst attacker",
                value: "Thinner shaft, tuned for fast snap and attack burst rather than mass.",
              },
              {
                label: "Frame",
                value: "Common box-frame design across variants; layup tuning differs.",
              },
            ],
          },
          {
            kind: "callout",
            label: "Why this matters",
            title: "You can pick by play style rather than just by hand strength",
            body:
              "Most players choose U-class by hand strength alone. With the Ultra, you can pick by attack identity instead — heavy power, balance, or burst — and the racket follows.",
          },
          {
            kind: "comparison",
            heading: "Ultra variants vs each other",
            columns: ["3U Ultra", "4U Ultra", "5U Ultra"],
            rows: [
              {
                label: "Shaft profile",
                values: ["Thicker, denser load", "Mid-thickness", "Thinner, burst snap"],
              },
              {
                label: "Smash style",
                values: [
                  "Heavy, dense",
                  "Balanced",
                  "Sharp, fast",
                ],
              },
              {
                label: "Recovery speed",
                values: ["Slow", "Medium", "Faster"],
              },
              {
                label: "Best fit",
                values: [
                  "Singles power smasher",
                  "All-court attacker",
                  "Doubles attacker who values speed",
                ],
              },
            ],
          },
          {
            kind: "verdict",
            heading: "Buying call",
            body:
              "Buy if you can identify your attack identity clearly and want a frame tuned for it. Skip if you want one frame to do everything — pick a more traditional flagship instead.",
            bullets: [
              "Genuinely different rackets across variants — not just different swing weights.",
              "Pricing is consistent across variants; choose by play style, not budget.",
              "Pair with attack strings (BG80, EXBOLT 63) at 26-28 lb regardless of variant.",
            ],
          },
        ],
      },
      sections: [
        {
          heading: "Why most weight variants are not really different rackets",
          body: "When Yonex ships an Astrox 88D Pro in 3U and 4U, the variants share the same shaft, frame, and tech. What changes is mass distribution — the 3U has more mass through the head, the 4U has slightly less. The character is the same; the swing speed differs. Victor's argument with the Ultra is that this is a missed opportunity. A player who buys 3U is usually telling you something different than a player who buys 5U. Why ship them the same character?",
        },
        {
          heading: "What the variant differentiation actually changes",
          body: "On court the differences are real and noticeable. The 3U Ultra produces denser smash sound and more energy retention through the head — heavier hitters will feel the payoff. The 4U Ultra balances attack and recovery more evenly, which is the most universal profile. The 5U Ultra's thinner shaft snaps back fastest, producing sharp burst-attack feel that pairs well with fast doubles or rear-court burst hitters. None of these would be the right answer for everyone.",
        },
        {
          heading: "Where the experiment partly fails",
          body: "Two cautions. First, the variants are not labelled clearly enough at retail — many buyers still pick by U-class out of habit, miss the differentiation, and end up with the wrong tuning for their play style. Second, the 5U Ultra's thin shaft is genuinely demanding — players choosing 5U for hand-strength reasons (smaller hands, lighter swing) may find the shaft too unforgiving despite the lighter mass. Read the spec sheet carefully before ordering.",
        },
        {
          heading: "Cross-brand comparison",
          body: "TK-F C Ultra competes most directly with Yonex Astrox 99 Pro 2 on the singles attack tier. Astrox is the more universally enjoyable racket — single character that suits most attackers. Ultra is the more configurable racket — three different rackets to suit three different attackers. If you know exactly what you want, Ultra wins. If you want a default that works, Astrox wins.",
        },
        {
          heading: "Who should buy it",
          body: "Buy TK-F C Ultra if you can identify your attack profile clearly: power-smasher (3U), balanced attacker (4U), or burst-attacker (5U), and you want a frame tuned for that specific identity. Skip if you want a single 'flagship' that handles all attack patterns — Astrox 99 Pro 2 or Halbertec 9000 Power are better answers. The Ultra rewards buyers who already know themselves; it confuses buyers who do not.",
        },
      ],
      cta: "Run the finder with smash-heavy preferences — we surface the right TK-F C variant based on your level and body.",
    },
    {
      slug: "kawasaki-kace-shoes-review",
      updatedAt: "2026-05-08",
      category: "reviews",
      title: "Kawasaki KACE review: a budget brand finally builds a tournament-tier shoe",
      dek: "Eighteen months of development, F1-inspired suspension geometry, and SGS-certified cushioning. Kawasaki's flagship court shoe is genuinely a different conversation.",
      reviewSummary: {
        verdict:
          "First Kawasaki shoe that earns serious comparison with Yonex / Victor flagships.",
        bestFor: [
          "Players curious about Kawasaki's Master line",
          "Stability-first players who want generous wrap",
          "Buyers willing to trade brand equity for build quality",
        ],
        avoidIf: [
          "You need maximum speed (this is a stability shoe)",
          "Resale value matters",
        ],
        setupNotes: [
          "Source sample EU 42 men's.",
          "Multi-layer upper, supercritical foam, F1-inspired keel suspension geometry.",
        ],
        sourceHook:
          "Kawasaki has historically been the budget alternative. KACE is the first time the brand seriously competes on construction.",
      },
      story: {
        intro:
          "Kawasaki has been adjacent to the badminton conversation for years — fine value shoes, occasionally a real performer, but rarely something that competed at the flagship level. KACE is the brand's deliberate push into pro-tier perception. Eighteen months of development. SGS-certified cushion, abrasion, and torsion performance. Kawasaki markets the shoe as the kit of its sponsored pro squad. The pitch: pro-tier construction, sub-flagship price.",
        blocks: [
        {
                  kind: "methodology",
                  headline: "Observer methodology — source review with Maynooth/Dublin club-ecosystem cross-reference",
                  context: "observer",
                  conditions: {
                    opponents: "Division 4 Ireland practice partners",
                    courtSurface: "wood and synthetic court mat",
                    venue: "Maynooth University, multiple Dublin clubs",
                  },
                  comparators: ["Yonex Astrox 88D Pro 2024 (founder firsthand)"],
                  sourceAttribution:
                    "BadmintonCN community source reviews; observer commentary by Rui Su drawn from Maynooth University and Dublin club ecosystem context.",
                },
        {
          kind: "firstPerson",
          context: "How I evaluate non-Yonex shoes",
          body:
            "I am in the Yonex Comfort Z3 and have not tested the KACE. My shoe-shopping rule is to fit by width and ankle support first, brand second. Kawasaki shoes are still a relatively small slice of what I see at club — if you have wider feet than Yonex's last accommodates, the KACE is worth a demo alongside the Victor P9200 line.",
        },
          {
            kind: "facts",
            heading: "What KACE brings to the table",
            items: [
              {
                label: "Upper",
                value: "Four-layer multi-material construction — wraps the foot with progressive density.",
              },
              {
                label: "Suspension",
                value: "F1-inspired keel geometry — anti-twist plate that reinforces against torsion.",
              },
              {
                label: "Foam",
                value: "Supercritical EVA, SGS-certified for cushion performance.",
              },
              {
                label: "Pro endorsement",
                value: "Marketed by Kawasaki as the on-court kit of its sponsored pro squad.",
              },
            ],
          },
          {
            kind: "callout",
            label: "What surprised us",
            title: "The wrap is the headline feature",
            body:
              "Most stability shoes lock the foot through stiff cage panels. KACE uses progressive-density layers that wrap the foot more like a sock — gentler on contact points, equally locked under lateral force.",
          },
          {
            kind: "comparison",
            heading: "KACE vs cross-brand stability shoes",
            columns: ["KACE", "Eclipsion Z3", "Victor P9200"],
            rows: [
              {
                label: "Upper feel",
                values: ["Wrap-style multi-layer", "Reinforced cage", "Reinforced cage"],
              },
              {
                label: "Stability",
                values: ["Very high", "Highest", "Very high"],
              },
              {
                label: "Cushion",
                values: ["High", "High", "Medium"],
              },
              {
                label: "Price",
                values: ["$110-130", "$200", "$130"],
              },
            ],
          },
          {
            kind: "verdict",
            heading: "Buying call",
            body:
              "Buy if you want pro-tier stability shoe at sub-$130. Skip if resale matters or you specifically want speed over stability.",
            bullets: [
              "First Kawasaki shoe that justifies the cross-brand comparison.",
              "Best wrap feel in the price range.",
              "Brand equity / resale is the main trade-off.",
            ],
          },
        ],
      },
      sections: [
        {
          heading: "Why the multi-layer upper changes the feel",
          body: "Most badminton stability shoes use stiff TPU cage panels to lock the foot under lateral force. The downside: cage panels are rigid where they need to be flexible, sometimes creating pressure points or lacing inconsistency. KACE replaces the cage with four progressively dense layers in the upper — softer next to the foot, firmer at the surface. The result is a sock-like wrap that locks the foot equally well under lunge load but feels gentler on extended sessions. It is the most distinctive feature on the shoe and the strongest reason to consider it over an Eclipsion Z3.",
        },
        {
          heading: "F1-inspired keel suspension, in plain English",
          body: "The midsole has a structural keel — a long anti-twist plate running heel-to-forefoot. Kawasaki claims F1 chassis inspiration; in practice the plate behaves like the Yonex Round Sole Hexagrip or Victor's torsion plate. Under hard direction changes, the plate prevents the midsole from twisting independently of the foot. On lunges, it spreads landing force more evenly. None of this is unique in 2026 badminton footwear — but the execution is solid and SGS certification confirms the performance is real, not marketing.",
        },
        {
          heading: "Where KACE competes head-to-head",
          body: "Most direct comparison is Yonex Eclipsion Z3 ($200) and Victor P9200 ($130). Eclipsion Z3 has the highest stability ceiling and the strongest brand equity, but at twice the price of KACE. Victor P9200 is closer in price and similar stability; KACE wins on upper wrap comfort but loses on Asian-fit lockdown if your foot suits Victor lasts well. KACE is the strongest pick for buyers who want stability and comfort over brand equity.",
        },
        {
          heading: "Where it loses to other shoes",
          body: "Three honest cautions. First, pure speed is not KACE's strength — players who prioritise sub-300g lightness should pick Aerus Z2 or Yonex 65 Z4 instead. Second, brand equity matters in second-hand markets — KACE will lose value faster than equivalent Yonex / Victor shoes. Third, availability outside Asia is uneven; verify regional stock before ordering.",
        },
        {
          heading: "Who should buy it",
          body: "Buy KACE if you want stability-first construction with a wrap-style upper at sub-$130, you do not need maximum speed, and brand equity is not part of your decision. It fits intermediate-to-advanced players who do long doubles or singles sessions, players returning from minor ankle issues, and buyers curious about Kawasaki's Master line. Skip if speed matters more than stability, if you have wide feet that need a true wide-fit option, or if resale value is part of your purchase math.",
        },
      ],
      cta: "Tell the finder your foot width and joint comfort flags — KACE will rank well for stability-first profiles.",
    },
    {
      slug: "kawasaki-star-cross-racket-review",
      updatedAt: "2026-05-08",
      category: "reviews",
      title: "Kawasaki Star-Cross (Chuan Yue Xing He) review: high-end speed without the high-end weight",
      dek: "Material refinement instead of mass. The Star-Cross is Kawasaki's argument that the next generation of speed flagships will be built around feel, not heft.",
      reviewSummary: {
        verdict:
          "Genuinely refined high-end speed racket — competes on character, not just price.",
        bestFor: [
          "Front-court doubles players",
          "Speed-leaning singles players",
          "Buyers who want a Kawasaki flagship",
        ],
        avoidIf: [
          "You need rear-court attack mass",
          "You want established brand resale",
        ],
        setupNotes: [
          "Source 4U/G5 sample.",
          "Refined carbon layup; non-mass-based speed tuning.",
        ],
        sourceHook:
          "Kawasaki's Master line keeps producing rackets that earn the comparison. Star-Cross is the speed flagship version.",
      },
      story: {
        intro:
          "Speed rackets used to be defined by what they removed — less head weight, thinner frame, lower swing weight. Kawasaki's Star-Cross argues for a different recipe: the speed comes from material refinement and shaft response, not from cutting mass. The result is a flagship-tier speed racket that does not feel hollow at contact, and that is a meaningful difference from many head-light speed frames.",
        blocks: [
        {
                  kind: "methodology",
                  headline: "Observer methodology — source review with Maynooth/Dublin club-ecosystem cross-reference",
                  context: "observer",
                  conditions: {
                    opponents: "Division 4 Ireland practice partners",
                    courtSurface: "wood and synthetic court mat",
                    venue: "Maynooth University, multiple Dublin clubs",
                  },
                  comparators: ["Yonex Astrox 88D Pro 2024 (founder firsthand)"],
                  sourceAttribution:
                    "BadmintonCN community source reviews; observer commentary by Rui Su drawn from Maynooth University and Dublin club ecosystem context.",
                },
        {
          kind: "firstPerson",
          context: "Where the Star Cross sits",
          body:
            "I have not played the Star Cross. Kawasaki rackets show up in our club mainly via teammates who have rotated through Yonex and Victor and are looking for something different at a lower price. The pattern I see: Kawasaki frames are honest value but they don't quite match flagship-tier feedback clarity. Demo before you commit, not after.",
        },
          {
            kind: "facts",
            heading: "Star-Cross spec snapshot",
            items: [
              {
                label: "Identity",
                value: "Speed flagship — quick swing, sharp rebound, balanced finishing weight.",
              },
              {
                label: "Carbon",
                value: "Refined layup with high-modulus carbon layers — material upgrade over older Kawasaki frames.",
              },
              {
                label: "Frame",
                value: "Standard speed-frame profile, but with denser layup for stability.",
              },
              {
                label: "Balance",
                value: "Head-light but not ultra-light — designed to retain finish weight.",
              },
            ],
          },
          {
            kind: "callout",
            label: "What sets it apart",
            title: "Speed without hollowness",
            body:
              "Many head-light speed frames feel thin at contact — fast but unsubstantial. Star-Cross retains enough mass and material density to feel solid through the hit, which is uncommon in this category.",
          },
          {
            kind: "comparison",
            heading: "Star-Cross vs other speed flagships",
            columns: ["Star-Cross", "Nanoflare 1000Z", "Auraspeed Fantome"],
            rows: [
              {
                label: "Identity",
                values: [
                  "Solid-feel speed",
                  "Pure end-speed",
                  "Precision speed",
                ],
              },
              {
                label: "Contact feel",
                values: ["Substantial", "Crisp", "Sharp"],
              },
              {
                label: "Smash quality",
                values: ["Modest-strong", "Modest", "Modest"],
              },
              {
                label: "Brand identity",
                values: ["Niche", "Mainstream", "Niche-mainstream"],
              },
            ],
          },
          {
            kind: "verdict",
            heading: "Buying call",
            body:
              "Buy if you want a speed racket that does not feel hollow. Skip if you need rear-court attack or predictable resale.",
            bullets: [
              "Strong alternative to Nanoflare 1000Z for buyers who find 1000Z too crisp.",
              "Pair with thin elastic strings at 25-27 lb.",
              "Build quality has caught up with established brands.",
            ],
          },
        ],
      },
      sections: [
        {
          heading: "Why material refinement beats mass cutting",
          body: "Two ways to make a racket faster. Cut mass (lighter head, thinner frame, head-light balance), or refine the material (higher-modulus carbon, denser weave, optimised resin). Most speed flagships use the first approach because it shows up clearly on a spec sheet. Star-Cross uses the second — the swing is fast not because the head is light but because the material transmits force faster. The trade-off: spec-sheet readers may find Star-Cross less obviously a speed racket; on court the speed is there.",
          glossaryLinks: [{ term: "Head-light", id: "head-light" }],
        },
        {
          heading: "Where the substantial feel pays off",
          body: "Hollow-feeling speed frames have a problem: when you connect off-centre, the racket gives a thin response that reduces directional confidence. Star-Cross's denser layup keeps the contact feel more substantial, which translates to better redirection on flat drives, more confident hairpin shots, and steadier net-touch placement. Front-court doubles players will feel the difference most on push variations and quick blocks.",
        },
        {
          heading: "Where it loses to other flagships",
          body: "Two honest cautions. First, pure end-speed is not Star-Cross's strength — Nanoflare 1000Z still produces a faster shaft snap on long swings. Second, the Kawasaki brand has limited resale liquidity outside Asia, so factor in higher real cost of ownership if you change rackets often. The build is excellent; the brand equity is the constraint.",
        },
        {
          heading: "Stringing and tension",
          body: "Pair Star-Cross with thin elastic strings — Aerobite, BG66 Ultimax — at 25-27 lb. Lower tension wastes the shaft's response. Higher tension narrows the sweet spot to a punishing degree. Standard durability strings (BG65) muffle the racket too much. Test pre-stretched stringing if your stringer offers it; the racket rewards consistent string-bed tension.",
        },
        {
          heading: "Who should buy it",
          body: "Buy Star-Cross if you want a speed flagship that does not feel hollow at contact, your current racket is a Nanoflare 700 Pro or Auraspeed 90K II, and you are open to a non-mainstream brand identity. Skip if you need rear-court attack power, fast resale liquidity, or established brand prestige. Star-Cross is the answer to the question 'why do speed flagships always feel slightly thin?'",
        },
      ],
      cta: "Run the finder with front-court doubles or speed-leaning singles preferences to compare Star-Cross with Nanoflare 1000Z and Auraspeed Fantome.",
    },
    {
      slug: "how-to-choose-a-badminton-racket",
      updatedAt: "2026-04-30",
      category: "guides",
      title: "How to choose a badminton racket: a buyer's guide for beginners and intermediates",
      dek: "Five decisions that matter — weight class, balance, shaft flex, string tension, grip size — and three that do not. The honest guide that pro shops will not give you.",
      story: {
        intro:
          "Five decisions that matter — weight class, balance, shaft flex, string tension, grip size — and three that do not. The honest guide that pro shops will not give you.",
        blocks: [
          {
            kind: "firstPerson",
            context: "The order I would buy in if I started again",
            body:
              "If I were starting badminton today and had a fixed €300 budget, I would not put it all into a racket. I would buy a €90–120 4U medium-flex racket, €80 court shoes that fit my foot width, and keep €100 in reserve for restringing and a few tubes of decent shuttles. The combined upgrade in technique and comfort beats a €300 flagship-only purchase every time.",
          },
        ],
      },
      sections: [
        {
          heading: "Stop reading marketing language. Start with five questions.",
          body: "Brand catalogues are written to make every racket sound special. Yours is not. The five decisions that actually determine whether a racket fits you are: (1) Weight class — 3U, 4U, or 5U. (2) Balance — head-light, even, or head-heavy. (3) Shaft flex — flexible, medium, stiff, or extra-stiff. (4) Common string tension range. (5) Grip size — G4, G5, G6. Every other spec on the box (frame width, grommet count, branded carbon names) is downstream of these five.",
          glossaryLinks: [{ term: "Head-heavy", id: "head-heavy" }, { term: "Head-light", id: "head-light" }, { term: "Smash", id: "smash" }],
        },
        {
          heading: "1. Weight class — start with 4U if unsure",
          body: "3U rackets weigh 85-89 grams unstrung, 4U is 80-84g, 5U is 75-79g, 6U is around 70g. The difference between 3U and 5U is dramatic in your hand — about 10% of the racket's mass. As a rough rule: 5U for new players, casual recreational players, and most women's doubles. 4U for the great majority of intermediate-and-up club players. 3U only if you specifically want a head-heavy attack feel and your shoulder is conditioned for it. Treat 6U carefully as an adult; it can help injury-sensitive or very speed-focused players, but many frames feel too light for normal adult match play.",
        },
        {
          heading: "2. Balance — match it to your role, not your idol",
          body: "Balance is where the racket's mass concentrates. Head-light frames (around 285-292mm balance point) recover quickly, defend better, and reward fast hands at the cost of smash mass. Head-heavy frames (around 295-310mm) load more weight into the smash but are slower to recover. Even-balance sits in the middle. The right answer depends on what kind of points you actually win — if you are not sure, watch a video of yourself. If your match-winners are smashes from the back court, head-heavy. If they are flat drives and net taps, head-light. If they are mostly errors against you, even.",
        },
        {
          heading: "3. Shaft flex — go softer than you think",
          body: "A flexible shaft bends more on contact and is much more forgiving of late timing — clears go further on imperfect contact, and the racket is gentler on your shoulder. A stiff or extra-stiff shaft transmits force directly with no buffer — when your timing is clean it produces faster smashes; when it is not, it produces shoulder pain and short clears. Most amateurs are over-stiffened: they buy pro-tier extra-stiff frames because their favourite player uses one, then lose smash power because their swing speed is not high enough to load the shaft cleanly. Default to medium or medium-stiff until your contact point is consistent.",
        },
        {
          heading: "4. String tension — under-string, then go up slowly",
          body: "Tension is independent of the racket — but it changes the racket's feel more than most spec swaps. Higher tension narrows the sweet spot and sharpens feedback, lower tension forgives mishits and adds repulsion on imperfect contact. As a starting band: 22-24 lb for new players, 24-26 lb for club players, 26-28 lb for league players, 28-30 lb only for tournament-tier players. Going above 30 lb on amateur swing speed reduces real-game power because too few hits land in the shrunken sweet spot. Restring every 30-50 sessions or every 3-4 months even if the string has not snapped — tension drops well before a break.",
        },
        {
          heading: "5. Grip size — measure, do not guess",
          body: "Yonex G4 is the largest commonly available size, G5 is medium, G6 is small. Most adult men with average hands fit G5; smaller hands and most adult women fit G6. The wrong grip size shows up as forearm fatigue (grip too small — you over-grip to compensate) or wrist soreness (grip too large — you cannot rotate cleanly on backhand). You can always add an overgrip to make a smaller grip slightly larger; you cannot easily make a large grip smaller. When in doubt, buy one size down and add an overgrip.",
        },
        {
          heading: "What does NOT matter (much)",
          body: "Frame colour. Whether the racket is named after a current pro. Carbon-marketing names that change every two years (Namd, Aero+Box, Power Boost Cap — these do real things, but the difference between racket A and racket B with the same balance and flex is small in your hand). Weight in grams down to single-digit precision. Whether the racket is 'singles' or 'doubles' specific in marketing — those tags are loose mappings of the five core specs above. Spend your attention on the five things that move performance, not the marketing language wrapped around them.",
        },
        {
          heading: "Three honest first-racket recommendations",
          body: "If you have $80-120 to spend: Yonex Nanoray Light 70i (5U, even-balance, flexible — friendliest possible first racket). If you have $120-180 and play 2+ times per week: Victor DriveX 8S or Yonex Astrox 7 (4U, even-to-slight-head-heavy, medium — handles attack and defence). If you have $180-250 and you are committed to staying with badminton for years: Yonex Astrox 77 Pro or Astrox 7 Pro (4U, slightly head-heavy, medium-stiff — the friendliest pro-tier upgrade Yonex makes). Avoid 100ZZ, 99 Pro, 88D Pro 2024, and 1000Z as a first racket — they are pro flagships that can slow development before you learn to drive them.",
        },
      ],
      cta: "Run the IntoBadminton finder — five quick questions, ranked picks with reasons.",
    },
    {
      slug: "badminton-equipment-for-kids",
      updatedAt: "2026-04-30",
      category: "guides",
      title: "Badminton equipment for kids: rackets, shoes, and shuttles for ages 6-14",
      dek: "How to equip a young player without burning hundreds of dollars or stunting their technique. Honest picks from a coach-trained parent's perspective.",
      story: {
        intro:
          "How to equip a young player without burning hundreds of dollars or stunting their technique. Honest picks from a coach-trained parent's perspective.",
        blocks: [
          {
            kind: "firstPerson",
            context: "What I would buy for a young player",
            body:
              "Two principles from helping junior players at our club: (1) start with a 4U or 5U racket with a flexible shaft — anything stiffer punishes immature timing; (2) fit court shoes by width, not just length, and check ankle support after a session of side lunges, not standing still in the shop. Cheap shoes are not a saving — they are a knee-and-ankle tax due in 18 months.",
          },
        ],
      },
      sections: [
        {
          heading: "Why kid-specific equipment matters more than adult equipment",
          body: "Kids learn motor patterns from the equipment that fits their body. A racket too heavy for a 9-year-old produces a permanent over-reliance on shoulder rather than wrist and core — the wrong technique gets locked in before the child has the strength to swing properly. The same is not true for adults, who can usually correct technique on whatever equipment fits their pocket. With kids, fit comes first.",
        },
        {
          heading: "Rackets by age and height",
          body: "Ages 6-8 / under 130cm: aluminium-shaft junior racket, 22-26 inches long, 80-90 grams. Yonex B-350Jr, Victor AL-2200JR, or any club-issued junior racket. Ages 8-11 / 130-150cm: Yonex Muscle Power 2 Junior, Astrox 01 Clear, or 5U adult lightweight rackets like the Nanoray Light 70i (the latter is fine for taller pre-teens). Ages 12-14 / 150cm+: most kids are ready for proper 5U adult rackets — Astrox 1, Nanoray 7, or Arcsaber 7 Junior. Avoid head-heavy or extra-stiff frames at every junior tier.",
        },
        {
          heading: "Shoes — buy fitted, replace as feet grow",
          body: "Junior badminton shoes exist (Yonex Power Cushion 65 Z Junior, Victor SH-A170JR) and they are worth the spend if your child plays more than once a week. Avoid hand-me-down running shoes — the raised heel is a real ankle-roll risk on lateral movement. Plan to replace every 6-12 months because feet grow faster than the shoe wears. Buy half a size up from current foot length and check fit every 3 months.",
        },
        {
          heading: "Shuttles — plastic at home, feathers at training",
          body: "Yonex Mavis 200/300/350 plastic shuttles cost more upfront but last 20-50 hours of play. Use plastic for backyard practice, family rallies, and beginner classes. Switch to inexpensive feathered shuttles (Yonex Aerosensa 10 / 20, Victor Champion No.1) once the child plays in club drills — feathered flight teaches proper timing in a way plastic cannot. Avoid premium tournament shuttles (AS-50, AS-40) until the child plays competitively; they break too fast on imperfect contact.",
        },
        {
          heading: "Strings and tension — keep it low, replace it often",
          body: "String junior rackets at 16-20 lb. Yonex BG65 is the right string for almost every kid — durable, forgiving, cheap. Restring every 3-4 months even if the string has not broken. The lower-tension stringbed gives a softer trampoline feel that helps young arms generate clears without needing adult swing speed.",
        },
        {
          heading: "What to skip",
          body: "Grip-size sizing — junior rackets come in one grip size, and adding a kid overgrip is enough fine-tuning. Vibration dampeners — the kid does not need them and they get lost. Branded racket bags — a backpack with a racket-shaped pocket is plenty until the player is in tournament-level training. Pro-shop level coaching gear — a bag of plastic shuttles and a court is far more valuable than $300 of equipment for a 10-year-old.",
        },
        {
          heading: "Total reasonable budget by age",
          body: "Ages 6-8: $60-100 covers everything — junior racket, shoes if needed, plastic shuttles, basic bag. Ages 8-11: $100-180 — better racket, dedicated junior badminton shoes, mix of plastic and feathered shuttles. Ages 12-14 once committed to the sport: $200-300 covers an adult-tier 5U racket, proper court shoes, restringing twice a year, and feathered shuttles for competition. Spending more than $300 on a junior is almost never justified by performance — keep the money for coaching and court time instead.",
        },
      ],
      cta: "When the kid graduates to adult-tier rackets, start with the IntoBadminton finder — it weights light frames first.",
    },
    {
      slug: "badminton-glossary-terms-every-player-should-know",
      updatedAt: "2026-04-30",
      category: "guides",
      title: "Badminton glossary: 40+ terms every club player should understand",
      dek: "From sweet spot to U-class to BWF tour — the working vocabulary you need to read reviews, talk to your stringer, and follow professional matches.",
      story: {
        intro:
          "From sweet spot to U-class to BWF tour — the working vocabulary you need to read reviews, talk to your stringer, and follow professional matches.",
        blocks: [
          {
            kind: "firstPerson",
            context: "The terms I had to learn in two languages",
            body:
              "Coming up in Chinese badminton culture first and playing competitively in Ireland later, I had to learn the equipment vocabulary twice. 中杆 became 'shaft', 4U the same in both, but 'sweet spot' has no exact Chinese single-term equivalent — the same coach who taught me both languages always called it 黄金区 (golden zone). When you read reviews across languages, the same physical phenomenon often gets carved up differently.",
          },
        ],
      },
      sections: [
        {
          heading: "Equipment terms",
          body: "U-class: weight class for unstrung rackets — lower number means heavier. 3U is ~85-89g, 4U is 80-84g, 5U is 75-79g. F: flyweight, lighter than 6U, usually junior-specific. Head-heavy / head-light / even-balance: where mass concentrates in the racket; measured as the balance point in millimetres from the butt cap (around 280-310mm in normal frames). Shaft flex: how much the shaft bends under load — flexible, medium, stiff, extra-stiff. Sweet spot: the area on the stringbed where contact produces maximum repulsion and minimum vibration. Frame: the head ring of the racket. T-joint: where the shaft meets the frame; modern rackets often use built-in T-joints for stiffness. Grommets: the plastic eyelets through which strings thread — replaceable when worn.",
          glossaryLinks: [{ term: "Sweet spot", id: "sweet-spot" }],
        },
        {
          heading: "String and tension terms",
          body: "Gauge: string thickness in millimetres (0.61-0.72mm common). Thinner strings are more elastic, thicker strings are more durable. Tension: how tightly the string is pulled, measured in pounds (lb). Pre-stretch: a stringer technique to reduce post-stringing tension drop. Stencil: applied logo on the string after stringing for tournament identification. BG65, BG80, BG80 Power, EXBOLT 63, Aerobite, L69: common Yonex and Li-Ning strings, ranked by feel from soft / forgiving (BG65) to crisp / tour-tier (EXBOLT 63). Hybrid stringing: using different strings on the mains and crosses, like Aerobite. Restring trampoline: the soft repulsion feel of a fresh stringbed; degrades over weeks even if the string has not broken.",
        },
        {
          heading: "Shoe terms",
          body: "Power Cushion / Power Cushion+: Yonex's branded EVA midsole compound, designed to absorb landing impact. Toe drag protection: reinforced toe area on shoes for players whose front foot drags during lunges. Gum rubber: the soft outsole compound used on indoor court shoes for grip on wood. Last: the foot mould used to shape the shoe; Asian lasts (Victor, Mizuno) tend to be narrower than European/US lasts. Wide fit / Wide Last: shoes designed with extra forefoot width — note that 'wide' is measured against a brand's own regular fit, not absolutely.",
        },
        {
          heading: "Stroke and tactical terms",
          body: "Clear: an overhead shot sent deep to the opponent's back court. Drop: a soft shot from the back court that lands just over the net. Smash: an attacking overhead hit downward at speed. Drive: a flat, fast shot at body height. Net shot / hairpin: a soft shot from the net, just over the tape. Push: a fast, flat net shot that travels to the opponent's mid-court. Block: a defensive return that absorbs smash power and lands short. Lift: a defensive shot that sends the shuttle high and deep. Slice: a cut stroke that adds spin and changes shuttle trajectory.",
        },
        {
          heading: "Court and rule terms",
          body: "Service court / receiving court: the rectangles where the serve must land. Front court / mid court / back court: the three depth zones on each side of the net. Singles tramline / doubles tramline: the side lines that change between formats — singles uses the inner, doubles the outer. Rally point scoring: the modern format where every rally scores a point regardless of who served. Service judge: the official watching for service-height violations. Let: a replay of the rally with no point awarded.",
        },
        {
          heading: "BWF and competition terms",
          body: "BWF: Badminton World Federation, the global governing body. World Tour: BWF's professional ranking circuit (Super 1000, Super 750, Super 500, etc.). Super Series Finals: end-of-season top-8 event (renamed BWF World Tour Finals). Olympic qualification race: the 12-month points-based ranking that determines Olympic spots. World Championships: BWF's annual non-Olympic top event. Thomas Cup / Uber Cup / Sudirman Cup: men's, women's, and mixed-gender team championships.",
        },
        {
          heading: "Player and tactical jargon",
          body: "Sugar-water: forum slang for an extra-easy, forgiving racket — derives from Chinese badminton community usage. T0 / T1 / S-tier: forum tier rankings used on BadmintonCN to compare racket classes. Kurenai / Camel-gold / 安塞龙 (Axelsen): colourway names that distinguish racket generations (e.g. Astrox 100ZZ Kurenai is the original red Black-Micro-Core edition; 100ZZ 安塞龙 is the Viktor Axelsen / VA edition that uses Volume Cut Resin instead). Note: 安塞龙 is the Chinese transliteration of Viktor Axelsen, not Anders Antonsen — Antonsen is sponsored by Victor, not Yonex. YuanShi (源式) shaft hardness: shaft-deflection numbers measured and published by a Chinese badminton creator using a professional racket testing rig (lower number = stiffer); widely cited on BadmintonCN but not an official manufacturer spec. SE / VA / Tour: subvariants of pro frames signed off by specific players (e.g. Mohammad Ahsan SE, Viktor Axelsen VA, Tour, Game).",
        },
      ],
      cta: "Now you can read deep-dives without the language barrier — start with our racket-balance guide.",
    },
    {
      slug: "yonex-grip-sizes-explained",
      updatedAt: "2026-04-30",
      category: "guides",
      title: "Yonex grip sizes (G4, G5, G6) explained — and how to pick yours",
      dek: "How Yonex grip sizes compare to Victor and Li-Ning, why most adults pick G5 or G6, and what an overgrip actually changes about size.",
      story: {
        intro:
          "How Yonex grip sizes compare to Victor and Li-Ning, why most adults pick G5 or G6, and what an overgrip actually changes about size.",
        blocks: [
          {
            kind: "firstPerson",
            context: "What I use and what I would recommend",
            body:
              "I play G5 on every Yonex racket I own (Nanoflare 1000 Z plus a couple of Astrox-line back-ups). G5 plus a single overgrip puts my grip thickness roughly where G4 sits naked. For most amateur men I would start with G5 plus one overgrip and add wraps before moving up to G4 — overgrip stacking is reversible, frame grip size is not.",
          },
        ],
      },
      sections: [
        {
          heading: "What the G-numbers mean",
          body: "Yonex grip sizes use G3, G4, G5, and G6 nomenclature, where the higher number is a thinner grip. G3 is the largest commonly produced (rarely sold outside Asia). G4 is large — about 3.5 inches in circumference. G5 is medium — about 3.25 inches. G6 is small — about 3 inches. The same numbering is used on most Yonex rackets globally, though some regional retailers re-tag them with different conventions; always verify the circumference if you are unsure.",
        },
        {
          heading: "Most adult men fit G5; most adult women fit G6",
          body: "These are guidelines, not laws. Tall men with large hands sometimes prefer G4. Junior players, women with smaller hands, and adults with shorter palms generally prefer G6. The wrong grip size produces predictable symptoms: too small means you over-grip the racket to keep it stable, which fatigues your forearm. Too large means you cannot rotate the racket cleanly for backhand strokes, which fatigues your wrist. If you experience either symptom after a session, your grip is the wrong size.",
        },
        {
          heading: "Victor and Li-Ning grip sizes — not directly comparable",
          body: "Victor uses G2 / G4 / G5 / G6 nomenclature with different absolute measurements. A Victor G5 is roughly equivalent to a Yonex G5, but a Victor G4 is closer to a Yonex G4 / G3 mid-point. Li-Ning grip sizes use S1 / S2 / S3 conventions on some models and S0-S5 on others. The honest answer: do not assume cross-brand sizing translates directly. If you are switching brands, measure the grip circumference with a thread and ruler, then compare to your current racket.",
        },
        {
          heading: "How an overgrip changes size",
          body: "A standard overgrip adds approximately 0.6mm of thickness, which translates to about half a grip size. A Yonex Super Grap on a G5 racket effectively makes it close to G4. Two overgrips push it past G4 into G3 territory. Towel grips add slightly more thickness — about 0.8mm. Use this as a fine-tuning lever: buy one size smaller than ideal and adjust with overgrips, rather than buying one size larger and trying to make a too-thick handle smaller (which involves removing the underbase grip — risky on most rackets).",
        },
        {
          heading: "Replacing the underbase vs adding overgrip",
          body: "Most rackets ship with a synthetic underbase grip (Yonex Super Grap, Victor Wave, etc.). Players choose to either keep the underbase and add overgrips on top, or strip the underbase entirely and replace with a different replacement grip. Stripping the underbase is reversible but tedious; new players should start with the factory underbase plus one overgrip and only swap to a replacement grip if they find the underbase texture wrong. Towel grips replace the underbase entirely and add 1-2mm — often used by sweaty-handed players in tropical climates.",
        },
        {
          heading: "How often to replace grips",
          body: "Replace overgrips every 4-12 sessions of regular play, or whenever they feel slick. Replace underbase grips every 6-12 months — they degrade slowly and are easy to ignore, but a degraded underbase changes the racket's feel meaningfully. Good rule of thumb: if your grip is darker than the day you put it on, treat it as ready for replacement.",
        },
      ],
      cta: "Get the racket recommendation right first, then dial in the grip size with one or two overgrips.",
    },
    {
      slug: "yonex-arcsaber-10-complete-buying-guide",
      updatedAt: "2026-05-17",
      category: "guides",
      title: "Yonex Arcsaber 10: every generation explained — a buyer's guide from the sticker red to the 2019 4U reissue",
      dek: "The Arcsaber 10 was discontinued in 2019 and never replaced. Here is how to tell the eight commonly-traded generations apart — sticker red, laser-etched basic, Peter Gade white, Taufik black Premium, Taufik signature, Legend's Vision, unsigned white, and the 2019 4U — and which one is still worth buying second-hand today.",
      sections: [
        {
          heading: "Why the Arcsaber 10 still matters in 2026",
          body: "The Arcsaber 10 launched in 2008, ran for eleven years, and was quietly retired in 2019 without a true successor. Lee Chong Wei used the Voltric Z-Force and 100ZZ in his Yonex peak, but Peter Gade and Taufik Hidayat both played career-defining years on this frame, and a generation of Asian players grew up imitating their footwork with it. Today the racket survives as a second-hand object: a head-light, even-balanced control frame that prizes placement, dwell, and clean wrist work over headline smash power. Most current Yonex control frames (Arcsaber 7 Pro, 11 Pro) trace their identity back to it. The community keeps buying used Arcsaber 10s because nothing in the current line plays quite the same way.",
        },
        {
          heading: "The eight generations at a glance",
          body: "The lineage, in order: (1) Sticker version (late-2007 to August 2008) — earliest production with adhesive labels rather than laser-etched markings; 2U and 3U, predominantly G4 grip. (2) Laser-etched basic red (August 2008 to 2015) — the high-volume version, often informally called 'red Arcsaber 10'; the easiest to buy used. (3) Peter Gade signature white (2010-2013, with a 2018 re-issue) — 3U only, Peter Gade graphics on the cover. (4) Arcsaber 10 Premium / Taufik black (2012-2013) — 3U only, black-and-gold colourway; produced for the London Olympics; no true reissue afterwards despite occasional confusion with the late-2012 to early-2013 production run. (5) Taufik Hidayat signature (2015 only) — 2U and 3U, multiple Taufik signatures on the frame and a redesigned cover. (6) Legend's Vision (LV) editions (2016 only) — Yonex commemorated four legends with signature frames; the Taufik LV is a red 10, the Gade LV is a white 10, each 3U with all four signatures and a dedicated cover. (7) Unsigned white (2017-2018) — Gade-style white without signatures; produced briefly. (8) 2019 4U reissue (2019 only) — first and only 4U Arcsaber 10, quickly sold out, now rare and priced accordingly.",
        },
        {
          heading: "How to identify each generation in a used listing",
          body: "Sticker version: peeled or torn label residue near the throat is a strong tell; the basic colour is the same red as the laser-etched version. Laser-etched basic red: the most common find — symmetrical Arcsaber graphics, no signature, no special cover. Peter Gade white: white frame, blue-and-gold Gade graphics on the side, dedicated PG cover. Premium black: black with gold accents, no Taufik signature on the early run, Olympic graphics on later units; the cover is black with gold trim. Taufik signature: multiple Taufik signatures around the frame; redesigned cover with Taufik portrait. Legend's Vision: red (Taufik LV) or white (Gade LV) with four named signatures (Lin Dan, Lee Chong Wei, Taufik, Gade) and a unique LV cover that often outvalues lower-tier covers by itself. Unsigned white: looks like a Gade signature without signatures; lower visual identifier risk. 2019 4U: marked as 4U on the cone cap and shaft; the only 4U production run in the lineage.",
        },
        {
          heading: "Pricing reality (second-hand market, 2026)",
          body: "Used Arcsaber 10 prices vary widely by region and condition, but the rough hierarchy is consistent. The basic red is the cheapest entry point and the most forgiving for new buyers — well-used copies trade for less than the current cost of a mid-tier new racket, and clean copies sit just above. The unsigned Peter Gade white commands a small premium over the signature white because of its shorter production run. The Premium black sits noticeably above both because it never returned to production. Taufik signature commands a similar premium to the Premium black, with Taufik-fan collector demand pushing condition-rated copies higher than logic suggests. Legend's Vision sits at the top of the regularly-traded tier — the four-signature cover is itself a sought collector item. The 2019 4U is the rarest commonly-listed version; scarcity has pushed prices above several still-in-production flagships. Treat any listing dramatically below the regional norm as a likely fake — Arcsaber 10 is one of the most-counterfeited Yonex rackets ever made.",
        },
        {
          heading: "Which generation should you actually buy",
          body: "Pick by intent, not nostalgia. If you want to try the Arcsaber 10 feel without committing collector money, buy the basic red in well-loved condition — you will learn whether the head-light, even-balance, medium-flex platform suits your game without overpaying. If you played the racket in 2010-2015 and want one for the cabinet that you still occasionally string, the Peter Gade signature white is the best balance of nostalgia and availability. If you are a Taufik fan with the budget, the Premium black or Taufik signature are the two clearest collector picks. If you specifically want a lighter handling racket and you can find a clean 2019 4U at a fair regional price, it is the only version that brings the frame into a faster modern weight class — but the price floor reflects that. Avoid the Legend's Vision unless you specifically value the four-signature cover and full Yonex collector context; functionally it plays the same as the underlying generation.",
        },
        {
          heading: "Counterfeit and condition risks",
          body: "The Arcsaber 10 has been counterfeited heavily for over a decade. Common tells include misaligned grommets, wrong shaft length (the genuine 10 is 670mm), incorrect cone cap font, off-spec balance points, and incorrect cover stitching. If you are paying anything above the basic-red floor, get the racket verified by a known community authenticator before transfer — BadmintonCN has dedicated authentication threads, and reputable Asian shops will provide written authentication. Condition matters more than usual because the frame is now 7-18 years old depending on generation: check the T-joint for hairline cracks (especially on early units), inspect the grommets for compression, and ask the seller specifically about whether the racket has ever been off the stringing machine surface with damage. A 12 o'clock crack is often invisibly repaired on second-hand listings — ask, and walk away if the seller refuses to confirm.",
        },
        {
          heading: "How it plays compared to current Yonex control frames",
          body: "The Arcsaber 10 is closer to the current Arcsaber 11 Pro than to the 7 Pro in identity, but with a less dense feel and a more delicate net touch. Compared to the 11 Pro, the 10 feels lighter through the head, slightly less stable on heavy smash defence, and noticeably more rewarding on slices, drops, and net taps. Compared to the 7 Pro, the 10 feels more demanding on timing — the older frame asks for cleaner contact and gives less help on rushed swings. None of the three is a power-first frame, and the 10 is the most explicitly placement-first of the lot. If you want the closest currently-produced playing feel and do not want to deal with the used market, the 11 Pro is the safest modern substitute; if you want the closest weight-feel for less money, a 4U Arcsaber 7 Pro with a high-tension stringbed gets you most of the way.",
        },
        {
          heading: "The final decision",
          body: "Buy a used Arcsaber 10 if you want to feel an iconic Asian-tour control frame in your hand, you have a trusted authenticator, and you are not allergic to a 10+ year-old racket needing careful stringing. Skip it if you are looking for a primary match racket today — the modern Arcsaber 11 Pro plays a similar identity with current materials, current grommets, current warranty, and no counterfeit risk. The 10 is a beautiful object and a deeply rewarding racket for the right player, but it is not the right answer for someone who wants their best racket to also be their newest one.",
        },
      ],
      cta: "If you want a current production control racket that plays in this family, run the finder with placement-first or all-round preferences to compare Arcsaber 7 Pro and 11 Pro.",
      factChecks: [
        {
          sourceName: "IntoBadminton source-rights registry",
          title: "Source rights registry",
          section: "Platform posture",
          checkedAt: "2026-05-17",
          href: "https://intobadminton.com/source-policy/",
          quote:
            "use only for source discovery/manual summaries until terms or partnership is clear",
          note:
            "Generation-by-generation chronology, production windows, and naming conventions are paraphrased from a long-form BadmintonCN community buying guide; technical readings and buyer guidance are original to IntoBadminton.",
        },
        {
          sourceName: "Yonex",
          title: "ARCSABER product family — current line-up",
          section: "Current racket catalogue",
          checkedAt: "2026-05-17",
          href: "https://www.yonex.com/arcsaber",
          quote: "ARCSABER",
          note:
            "Yonex's current Arcsaber listing confirms the Arcsaber 10 is no longer in the active production catalogue; the Arcsaber 11 Pro is the closest current control-frame analogue.",
        },
      ],
    },
    {
      slug: "racket-stringing-hole-patterns-explained",
      updatedAt: "2026-05-19",
      category: "guides",
      title: "68, 72, 76, 78, 80 hole rackets explained: why string-hole count is not the spec the forums claim",
      dek: "From the aggressive 68-hole AX99 Pro to the dense 80-hole AXNT — what each hole-count actually changes in feel, durability, and stringing strategy, and why most string complaints are really tension complaints.",
      sections: [
        {
          heading: "Why this argument exists at all",
          body: "Walk into any badminton forum in Asia and someone is angry about a 68-hole racket. The complaint is usually that the sweet spot is harsh, the non-sweet-spot is hard to play, and the racket is generally unforgiving. The complaint is real but the diagnosis is usually wrong — what feels like a hole-count problem is almost always a tension problem combined with a contact-quality problem. This guide walks through what each hole-count category (68, 72, 76, 78, 80) actually changes, who should care, and what your stringer should know.",
          glossaryLinks: [{ term: "Sweet spot", id: "sweet-spot" }],
        },
        {
          heading: "68-hole rackets: the aggressive design (e.g. AX99 Pro, AX88S Pro old colour)",
          body: "68-hole patterns concentrate the centre of the bed: wider string spacing in the middle, extremely tight spacing at the frame edges. This creates an unusually large dwell-time advantage in the sweet spot — the strings can flex more on contact, the shuttle stays on the bed longer, and the resulting hit is more powerful and more accurate. The trade-off is that off-centre contact feels strikingly different from sweet-spot contact, which is the source of most 'I hate 68-hole' complaints. The fix is not to abandon 68-hole — it is to learn the sweet spot and to string 10% above your normal tension (e.g. string 33lbs if you normally play 30lbs), because the wider spacing means strung tension feels effectively lower than the rated number.",
        },
        {
          heading: "72-hole rackets: the friendly older standard (e.g. Mini-Cannon, Halbertec 90 Long)",
          body: "72-hole patterns (16 paired holes) are the legacy standard before 76-hole became dominant. They are easier to play than 68-hole because the bed flexes more uniformly, but the trade-off is that mishits feel mushier and good contact is less crisp. On entry-tier rackets like the Victor Mini-Cannon, this is a feature — the friendlier bed forgives beginner technique. On high-tier rackets like the Halbertec 90 Long, the 72-hole choice is more controversial because advanced players' tighter, more committed swings tend to feel like they 'lose energy' in the looser-feeling bed. 72-hole rackets are best suited to defensive-control players who want a forgiving bed without the harsh sweet-spot transition of 68-hole.",
        },
        {
          heading: "76-hole rackets: the universal standard (e.g. AX88S Pro old colour)",
          body: "76-hole (10 paired holes) is the most common pattern in modern rackets and is the closest to a universal default. The string bed is uniformly spaced, which means tension applies consistently across the face, sweet-spot transition is smooth, and string flexibility is balanced. 76-hole supports both control-oriented and attack-oriented play styles. The rated tension on a 76-hole racket plays at close to the rated number — 28lbs feels like 28lbs, not 26lbs (as on 68-hole) or 30lbs (as on 80-hole). This is why most amateurs default to 76-hole rackets and find them comfortable.",
        },
        {
          heading: "78-hole rackets: the high-tier convenience design (e.g. NF800)",
          body: "78-hole patterns split one of the 76-hole paired-grommets into two separate grommets, adding one extra cross-string near the bottom of the head. The practical effect is minimal: bed pressure is slightly increased, the bed feels slightly firmer, and stringing is marginally easier because the extra hole simplifies the bottom-area pattern. Most players cannot reliably distinguish 78-hole from 76-hole in blind testing. When 78-hole rackets feel different, it is almost always because of other simultaneous changes (different frame material, different shaft, different tension) rather than the hole-count itself. Tension recommendation: string 1lb below rated for the slightly firmer feel, or leave at rated for marginal forgiveness.",
        },
        {
          heading: "80-hole rackets: the dense-pattern future (e.g. AXNT)",
          body: "80-hole patterns convert some of the highly-stressed 4-point and 8-point paired holes into single holes, reducing the per-hole tension stress at the head's highest-pressure areas. The benefit is durability — a documented Yonex Astrox-series weakness has been collapse at those exact 4 and 8 point regions over time, and 80-hole addresses it. The secondary benefit is bed-uniformity: the denser pattern reduces the off-sweet-spot mushiness that 68-hole creates. The trade-off is that 80-hole patterns string effectively higher than rated — 26lbs feels like 28lbs, and players who don't compensate by lowering tension complain about a 'metal/banging' feel on contact. 80-hole rackets are designed for advanced players with good contact mechanics who want maximum durability without sacrificing the bed's uniformity.",
        },
        {
          heading: "What this all means for amateurs",
          body: "Most amateurs default to 76-hole rackets because they are the most forgiving and the most predictable. 68-hole and 80-hole are specialist patterns that require either tension adjustment (string 10% higher for 68-hole, 1-2lbs lower for 80-hole) or advanced contact quality (consistent sweet-spot striking). 72-hole is the legacy choice for forgiveness. 78-hole is functionally similar to 76-hole. The biggest takeaway: most 'I hate this hole-count' complaints are actually 'I'm stringing at the wrong tension for this hole-count' problems. Talk to your stringer about adjusting tension for non-standard hole-count rackets, and most of the harsh-feel complaints will disappear.",
        },
        {
          heading: "One final note on frame size",
          body: "Hole-count is not the only factor in bed feel. Frame size matters too: a 26lbs string job on a larger frame is effectively softer than the same 26lbs on a smaller frame, because the strings span a larger area. Rough rule of thumb: large frame at 26lbs ≈ small frame at 24.4lbs. This is why two rackets with identical hole-count, identical string, and identical rated tension can still play differently if their frame sizes differ. Always test the feel before drawing conclusions about the racket.",
        },
      ],
      cta: "Run the racket finder with your tension preference and contact-style flags to find rackets that match your hole-count comfort zone.",
      factChecks: [
        {
          sourceName: "IntoBadminton source-rights registry",
          title: "Source rights registry",
          section: "Platform posture",
          checkedAt: "2026-05-19",
          href: "https://intobadminton.com/source-policy/",
          quote:
            "use only for source discovery/manual summaries until terms or partnership is clear",
          note:
            "Hole-count nomenclature, tension recommendations, and frame-comparison rules of thumb are paraphrased from BadmintonCN community-knowledge posts; technical readings and buyer guidance are original to IntoBadminton.",
        },
      ],
    },
    {
      slug: "yonex-tour-series-buying-guide",
      updatedAt: "2026-05-19",
      category: "guides",
      title: "Yonex Tour-line rackets: which Tour is worth buying and which is a price-cut compromise",
      dek: "From AX88D Tour to Arcsaber 11 Tour, the Yonex Tour line saves up to 50% off Pro pricing — but the value depends entirely on which Tour you choose. Here is the honest breakdown.",
      sections: [
        {
          heading: "Why the Tour line exists",
          body: "Yonex's Tour line is the official second-tier above the regional/national sub-brands. Tour rackets traditionally borrow the Pro racket's frame technology and most of the materials, with simplifications to the shaft engineering, head bumper, or T-joint that reduce manufacturing cost and price. The result is a racket that typically delivers 80-90% of the Pro experience at 50-60% of the price — a serious value proposition. The catch: not all Tour rackets are created equal. Some Tour rackets earn the comparison; others are cost-reduced enough that the price gap to Pro becomes worth paying.",
        },
        {
          heading: "Astrox 88D Tour: the strong value case",
          body: "The Astrox 88D Tour delivers 80-90% of the 88D Pro experience. The frame, the basic shaft material, and most of the playing identity are preserved. What's lost: the very top-end Namd Flex Force shaft tuning, the most refined Power Assist Bumper, and the longer 10mm built-in T-joint refinement. What's gained: a price that is roughly half of the Pro (~700-800 RMB vs 1600-1700 RMB Japan import). For amateur players who want 88D-class doubles attack without flagship spending, the 88D Tour is one of the strongest value propositions in the current Yonex lineup. The honest framing: it's the same chef's soup with one ingredient changed — most players cannot reliably tell the difference in blind play.",
        },
        {
          heading: "Arcsaber 11 Tour: the case is more mixed",
          body: "The Arcsaber 11 Tour preserves the Arcsaber 11 frame and the platform's control-rack identity. The Tour version specifically sacrifices control fidelity compared to the Pro — players can distinguish Pro from Tour more easily than they can on the 88D, and players who specifically buy the Arcsaber 11 for its denser-feel control are more likely to feel the Tour-vs-Pro gap. That said, the Tour still produces the long-line clear and the gentle-touch net play that defines the 11 family. The price point (700-800 RMB vs 1700-1800 RMB Japan import for Pro) makes the Tour attractive — but the recommendation is contextual: if you specifically value control fidelity, save for the Pro; if you want the family's general identity at lower cost, the Tour delivers. For maximum value, buy a used Tour (400-700 RMB depending on condition) — the savings over a new Pro can fund significant string and accessory upgrades.",
        },
        {
          heading: "What the source review identified as 'worth buying' Tours",
          body: "The Yonex Tour lineup includes many models, but the source reviewer's specific 'worth buying' shortlist focuses on the rackets where the price-to-performance ratio is genuinely strong. The 88D Tour leads the list. The Arcsaber 11 Tour is qualified-positive (recommend used). Other Tours in the line (some of which were previously priced lower and have since had their prices increased significantly) are categorised as either 'wait for a sale' or 'genuinely overpriced'. The source reviewer is working on follow-up coverage for the rest of the lineup.",
        },
        {
          heading: "How Yonex prices Tour vs Pro across regions",
          body: "Tour-vs-Pro pricing varies significantly by region. In China, Yonex Tour rackets often sell at 40-50% of the Pro price for the same generation. In Japan, the gap is smaller (Tour rackets are around 50-60% of Pro). In Southeast Asia and Korea, pricing tends to follow the Japan model. In Europe and North America, Tour rackets are often imported at higher markup, narrowing the price gap to Pro further. Buyers should check the local price difference before deciding — a Tour that saves 50% in one region might save only 20% in another, and the 'worth it' calculation changes accordingly.",
        },
        {
          heading: "The verdict for amateur buyers",
          body: "If you specifically play men's doubles attack, the 88D Tour is one of the best value rackets in the Yonex lineup — buy it confidently. If you specifically value Arcsaber 11's control fidelity, save for the Pro. For most other Tour models, the recommendation depends heavily on your current racket: if you're upgrading from a basic frame, Tour-line rackets give you a meaningful step up; if you're upgrading from a serious mid-tier racket, the gap to Tour is smaller and the price-paid-for-the-step is questionable. The Tour line is not a uniform 'buy' or 'avoid' — it's a per-model evaluation, and the 88D Tour is the standout.",
        },
        {
          heading: "How to choose between Pro and Tour for your purchase",
          body: "Three questions answer the choice. First: do you specifically need the highest fidelity of contact feedback (Pro), or is general identity sufficient (Tour)? Second: is your local Pro-to-Tour price gap large enough to fund meaningful other upgrades (better strings, better grip, better shoes)? If yes, Tour is the right choice. Third: is your current skill level high enough that you can reliably tell the difference in blind play? If you cannot, paying for the Pro is paying for perceived rather than actual value. The honest amateur recommendation: Tour for value, Pro for skill-development as you grow into the racket's full ceiling.",
        },
      ],
      cta: "Run the racket finder filtered to Yonex Tour and Pro options at your skill level to see how Tours stack against Pros for your playing role.",
      factChecks: [
        {
          sourceName: "IntoBadminton source-rights registry",
          title: "Source rights registry",
          section: "Platform posture",
          checkedAt: "2026-05-19",
          href: "https://intobadminton.com/source-policy/",
          quote:
            "use only for source discovery/manual summaries until terms or partnership is clear",
          note:
            "Tour-line pricing and value comparisons are paraphrased from a BadmintonCN community post titled 'On the Yonex Tours worth buying'; price ranges are regional estimates and vary by market.",
        },
      ],
    },
    {
      slug: "kumpoo-fourth-major-badminton-brand-profile",
      updatedAt: "2026-05-19",
      category: "guides",
      title: "Kumpoo (薰风) brand profile: how the 'fourth major badminton brand' built a credible flagship line",
      dek: "Founded in Japan in 2000, Kumpoo built its name on full-stack vertical integration — and is now positioning itself as the fourth major brand alongside Yonex, Victor, and Li-Ning.",
      sections: [
        {
          heading: "From Japanese origin to Chinese ownership: the brand's surprising history",
          body: "Kumpoo (薰风, KUMPOO) was founded in May 2001 in Japan by Yuji Omori and Mitsutoshi Satou, who saw the global expansion of badminton as a market opportunity (per Kumpoo's official Japanese company history). The brand registered as Kumpoo Co., Ltd. in Japan and launched the now-signature Hexagon six-cone-shaft technology in 2006 — a frame engineering choice designed to reduce torsional twist on impact — then built its own shoe factory in 2008 to escape OEM dependence. The brand's pivot point was 2009: Guangzhou-based Sobey Sports acquired Kumpoo entirely, moving R&D and operations to China and re-positioning the brand as a Chinese-owned sports brand with Japanese DNA. The story is unusual: most Chinese brands are Chinese in origin, while Kumpoo flipped the script.",
        },
        {
          heading: "Full vertical integration: the BYD comparison",
          body: "Kumpoo's strategic decision after the 2009 Chinese acquisition was full vertical integration. The brand built shoes in-house (2008 onwards), then racket manufacturing (2022 onwards), and most recently a high-end Japan string production facility (2025). This means Kumpoo controls the entire supply chain for its three core product categories — rackets, shoes, and strings — from raw materials to finished products. The industry comparison: BYD in automotive (vertical integration as a competitive moat). The Kumpoo executive team uses similar logic: when the brand controls every component, the margin per unit is higher and quality control is internalised. The result is that Kumpoo can offer competitive pricing without compromising on materials sourcing.",
        },
        {
          heading: "Product line architecture: entry, mid, premium",
          body: "Kumpoo's racket line is structured as entry-mid-flagship — a recognisable lineage seen across major brands. Entry-tier: K520 Pro series, which has shipped over 3 million units cumulatively. Mid-tier: Guolun II and Houyi II, which combine control and value. Premium-tier: Shura series (修罗), used by 3x Lin Dan Cup champion Zhan Junwei, with M50 high-modulus carbon and solid-shaft construction. The Shura series is performance-comparable to flagship rackets from the three majors at 30-40% of the price. The brand's recent 3D-printed titanium racket experiment is a serious technology bet on next-generation frame manufacturing.",
        },
        {
          heading: "Shoes and the long-term-wear track record",
          body: "Kumpoo's shoe line emphasises cushioning, anti-slip grip, and lightweight handling. The Houyi (厚羿) and Guolun II shoes are the brand's main long-term-wear options — and the long-term-wear track record is meaningful. Professional players use them in international competition; amateur players testify to multi-year ownership without performance degradation. The Guangdong Greater Bay Area Games saw a Guangzhou-exclusive Houyi colourway last year, demonstrating the brand's regional marketing investment. The new GH-805 shoe is positioned as a direct competitor to the Yonex 65 Z4 — a serious benchmarking choice.",
        },
        {
          heading: "Strings and the JS-67 surprise",
          body: "Kumpoo's 2025 launch of the Japan-produced JS-series strings is the brand's most aggressive recent move into the premium string market. The JS-series uses Kumpoo's proprietary ultra-fibre composite coating technology, designed to deliver both durability and elasticity. The JS-67 in particular has earned positive amateur reviews; the JS-57S is one of the thinnest commercial strings in the world. This puts Kumpoo's string technology in the same conversation as Yonex's BG-series and Victor's VBS-series — an unusually fast jump for a brand that didn't previously have a serious string presence.",
        },
        {
          heading: "Pricing strategy and the 'technology democratization' positioning",
          body: "Kumpoo's positioning is 'premium professional product, accessible-friendly price' (技术普惠 — technology democratization). Flagship Kumpoo products price at 30-50% of equivalent flagship products from the three majors. The strategy is intentional: rather than competing on perceived brand prestige, Kumpoo competes on functional value. The result is a brand that attracts a different customer demographic — students, budget-conscious club players, and price-sensitive amateurs who would otherwise either avoid premium rackets or buy used. The reach into student demographics is particularly strong: many Chinese university clubs have adopted Kumpoo as their official kit brand.",
        },
        {
          heading: "Sponsorships, athletes, and the credibility ladder",
          body: "Kumpoo's athlete sponsorship includes Liu Guolun, Tian Houwei, and Wang Gaolun — three professional players whose results validate the brand's premium racket performance. The brand also sponsors major events: the Sudirman Cup, the Macau Open, and various amateur youth competitions in China. The collaboration with internet badminton personalities (王小羽 Wang Xiaoyu and similar) expands brand visibility into the casual amateur conversation. The combined effect is a credibility ladder where professional results, amateur testimonials, and event sponsorship build confidence across multiple buyer segments simultaneously.",
        },
        {
          heading: "Where Kumpoo sits in the four-major debate",
          body: "The 'fourth major' positioning is real but qualified. Yonex (1st major) dominates global market share. Victor (2nd major) is dominant in Korea and well-established globally. Li-Ning (3rd major) is dominant in China. Kumpoo is positioning itself as the 4th major — and the case is genuinely credible based on technology, full vertical integration, and growing global presence in Germany, Italy, Korea, Finland, Japan, and Poland. The actual 'major' status will depend on whether Kumpoo can continue building international distribution, professional player adoption, and brand recognition outside the China-Japan corridor. The current trajectory is favourable. The market is watching.",
        },
        {
          heading: "Should you buy a Kumpoo?",
          body: "Buy Kumpoo if you want premium-tier badminton products at a meaningful price discount to the three majors, if you specifically value the full vertical integration of the brand's product stack, or if you are a student or budget-conscious amateur looking for serious technology at accessible prices. Skip Kumpoo if you specifically value brand prestige (Yonex / Victor / Li-Ning), if you need maximum global resale value, or if you have a brand loyalty that overrides value considerations. For most amateur players, Kumpoo represents an intelligent value proposition — and the brand's trajectory suggests it will only get more competitive in the next few years.",
        },
      ],
      cta: "Run the racket finder with Kumpoo enabled to compare its lineup against Yonex, Victor, and Li-Ning rackets at your price point.",
      factChecks: [
        {
          sourceName: "IntoBadminton source-rights registry",
          title: "Source rights registry",
          section: "Platform posture",
          checkedAt: "2026-05-19",
          href: "https://intobadminton.com/source-policy/",
          quote:
            "use only for source discovery/manual summaries until terms or partnership is clear",
          note:
            "Brand history (founding year, acquisition year, vertical integration milestones) and product lineup descriptions are paraphrased from a BadmintonCN community post; specific market share, athlete sponsorship, and international distribution claims should be verified against current brand sources.",
        },
      ],
    },
    {
      slug: "li-ning-flagship-racket-buying-guide-2026",
      updatedAt: "2026-05-19",
      category: "guides",
      title: "Li-Ning flagship racket buying guide 2026: AxForce, Halbertec, and Bladex compared",
      dek: "Three flagship Li-Ning racket families, three distinct identities — here is how to pick between AxForce (attack), Halbertec (heavy attack), and Bladex (speed) for your game.",
      sections: [
        { heading: "The three-family architecture", body: "Li-Ning's current flagship lineup is organised around three distinct families: AxForce (Thunder, 雷霆) for accessible-to-elite attack play, Halbertec (战戟) for heavy attack and rear-court dominance, and Bladex (锋影) for speed-first doubles and front-court play. Each family has multiple tiers (entry, mid, flagship, top-flagship), and the right pick depends entirely on which family character matches your game." },
        { heading: "AxForce (Thunder) lineup", body: "AxForce 10: entry-tier attack teacher (USD ~70). AxForce 80: mid-tier classic attack (USD ~150). AxForce 90 New: balanced attack flagship in 4U and 5U (USD ~200). AxForce 100 Gen 1 (used) and Gen 2 (current): elite singles attack (USD ~230-280). The family identity is attack-focused with friendlier demand curves than Halbertec — most amateurs find AxForce more playable than Halbertec at the same tier." },
        { heading: "Halbertec (战戟) lineup", body: "Halbertec 7000: balanced all-rounder entry (USD ~150). Halbertec 7000 II: firmer mid-tier (USD ~170). Halbertec 8000: mid-flagship attack (USD ~200). Halbertec 9000: premium attack (USD ~240). Halbertec 9000 Power: top-flagship attack (USD ~270). The family identity is heavy attack with more demanding character than AxForce. For elite singles attackers who specifically want maximum committed-smash output, the 9000 and 9000 Power are the rackets to consider." },
        { heading: "Bladex (锋影) lineup", body: "Bladex Arrow: 5U super-light specialist (USD ~32). Bladex 800 New: standard speed (USD ~180). Bladex 800 Speed: faster variant (USD ~200). Bladex 900 New: top-tier speed (USD ~170). The family identity is speed-first — head-light, stiff shaft, fast handling. For doubles speed specialists and front-court attack players, Bladex is the family to use." },
        { heading: "Cross-family decision framework", body: "Three questions answer the family choice. First: are you primarily attacking from the rear court, or moving fast at the front court? Rear court → AxForce or Halbertec; front court → Bladex. Second: how demanding are you willing to go on shaft stiffness? Friendly → AxForce; demanding → Halbertec; speed-stiff → Bladex. Third: budget? Entry-tier flagship is AxForce 80 or Bladex 800 New; premium flagship is AxForce 100 Gen 2 or Halbertec 9000 Power; speed flagship is Bladex 800 Speed or Bladex 900 New." },
        { heading: "Common Li-Ning buyer mistakes", body: "Mistake 1: Buying Halbertec 9000 Power when you should buy AxForce 90 New — the Halbertec demand curve is genuinely higher. Mistake 2: Buying Bladex 800 Speed for singles rear-court play — it's a doubles speed racket, wrong family for the use case. Mistake 3: Paying flagship prices for entry-tier characters — AxForce 10 and Bladex Arrow are great for the right buyer but they're not flagship rackets. Match the tier to your skill, not your budget." },
        { heading: "Where Li-Ning beats Yonex and where it loses", body: "Li-Ning beats Yonex on per-dollar value at flagship tier (Halbertec 9000 vs Astrox 99 Pro is a meaningfully cheaper purchase for similar character). Li-Ning beats Yonex on Halbertec line's heavy-attack character — there's no direct Yonex equivalent. Yonex beats Li-Ning on absolute peak refinement (Astrox 99 Pro Gen 3, 100ZZ Viktor Axelsen edition feel marginally more polished). Yonex beats Li-Ning on global brand prestige and resale value. The right choice depends on which factor matters more for your purchase." },
        { heading: "The final family-pick guidance", body: "For most amateur singles attackers: AxForce 90 New (4U or 5U). For advanced singles attackers wanting top-tier ceiling: Halbertec 9000 Power. For amateur doubles speed players: Bladex 800 New or Bladex Arrow. For all-round amateurs unsure of identity: Halbertec 7000 II or AxForce 80. For elite doubles speed specialists: Bladex 800 Speed or 900 New. None of these are wrong; the right racket is the one that matches your actual matches, not the racket you wish your matches looked like." },
      ],
      cta: "Run the racket finder with Li-Ning preference and your skill/style flags to compare the full flagship lineup against your profile.",
      factChecks: [
        { sourceName: "Li-Ning", title: "Li-Ning racket family lineup", section: "Flagship rackets", checkedAt: "2026-05-19", href: "https://en.lining.com/badminton/rackets", quote: "AxForce", note: "Li-Ning's flagship racket families confirmed: AxForce (Thunder), Halbertec (战戟), Bladex (锋影). Specific tier pricing and regional availability vary." },
        { sourceName: "IntoBadminton source-rights registry", title: "Source rights registry", section: "Platform posture", checkedAt: "2026-05-19", href: "https://intobadminton.com/source-policy/", quote: "use only for source discovery/manual summaries until terms or partnership is clear", note: "Family-level guidance synthesised from BadmintonCN community posts including a long-form Li-Ning flagship buying guide; technical readings and family architecture are original IntoBadminton interpretation." },
      ],
    },
    {
      slug: "badminton-shoe-buying-guide-and-replacement",
      updatedAt: "2026-05-19",
      category: "guides",
      title: "Badminton shoe buying guide: how to choose, use, and replace your court shoes",
      dek: "The complete guide to badminton shoe purchase decisions — fit, last width, cushion vs speed, court surface considerations, and when to actually replace.",
      sections: [
        { heading: "Badminton shoes are different from running and tennis shoes", body: "The first decision is to actually buy badminton-specific shoes. Running shoes have forward-only sole patterns that grip badly on lateral cuts. Tennis shoes have outsole compounds tuned for outdoor hard courts that wear quickly on indoor surfaces. Badminton shoes are engineered for the sport's specific movement demands — fast lateral cuts, frequent jump landings, and tight pivots. Save money on rackets if you must; don't save money on shoes." },
        { heading: "Fit: width, last, and the toe-box test", body: "Foot width is the first fit decision. Most badminton shoes use narrow-to-medium lasts (especially Yonex and Victor). If you have wide feet, look specifically for wide-foot models (Yonex 65 Z Wide, Bonny WuQue Flagship 088, ASICS Blast FF 3) or sizes that accommodate width. The simplest fit test: lunge forward as deeply as you can. Your big toe should not press against the front of the toe-box. If it does, the shoe is too short or too narrow." },
        { heading: "Cushion vs speed: the real trade-off", body: "Speed shoes (Yonex Aerus, Li-Ning Bladex Arrow, Bonny Wind Shadow) have thin forefoots and minimal cushion — quick ground feel for fast players who play many short reactions. Cushion shoes (Yonex 65 Z Wide, Victor P9200 III, Bonny WuQue 088) have more midsole material and protect joints on jump landings. The trade is real: speed shoes are quicker, cushion shoes are kinder to joints. For most amateurs, cushion shoes are the safer choice; for advanced speed-game players, speed shoes pay off." },
        { heading: "Stability and lateral support", body: "Stability shoes (Bonny Future Land 3 Polaris, Victor C90NL, Yonex 65 Z series) prioritise the foot staying locked inside the shoe during hard cuts. Look for TPU lateral wrap, secure heel cup, and tight mid-foot lockdown. Players with ankle sprain history should specifically prioritise stability shoes — the difference between a stable shoe and a fast shoe can be the difference between a rolled ankle and a continued match." },
        { heading: "Body weight and shoe choice", body: "Lighter players (under 140lb / 65kg) can use minimal-cushion speed shoes without joint cost. Heavier players (over 160lb / 75kg) need real cushion to protect knees and ankles from jump landings. Players in between have flexibility but should lean toward cushioned options if matches are long. Speed-shoe minimalism scales with body weight." },
        { heading: "Court surface considerations", body: "Wooden floors with good condition: any badminton shoe works. Synthetic indoor surfaces: most shoes work; some shoes wear faster. Older or dusty courts: stability shoes with aggressive outsole patterns grip better. Outdoor concrete (rare but happens): expect any shoe to wear 3-5x faster than on indoor surfaces. Avoid using your tournament shoes for outdoor play." },
        { heading: "When to replace shoes", body: "Three replacement triggers. First: outsole wear — visible flat spots or worn-through patterns mean grip is compromised. Replace before slipping causes injury. Second: midsole compression — when the shoe feels less cushioned than it did at purchase, the midsole has lost its bounce. For heavy players, this happens at 6-12 months of regular play; for light players, 18-24 months. Third: upper failure — torn mesh, separated TPU, or loose lateral wrap means the shoe no longer locks the foot. Any of these three failures should trigger replacement immediately." },
        { heading: "Replacement timing relative to ankle and knee health", body: "Players with knee or ankle issues should replace shoes more aggressively — every 6-9 months for regular players. The cost of new shoes is far less than the cost of a knee injury. If you notice new joint discomfort after a session, check whether your shoes have lost cushion before assuming the issue is your body. Often the shoes are the cause." },
        { heading: "Brand families and what they mean", body: "Yonex: industry standard, widest shoe range, narrow-to-medium lasts (65 Z Wide for wide feet). Victor: serious badminton shoes, often more cushioned than Yonex (P9200 III is the protection benchmark). Li-Ning: rising domestic option, sizing differs from Yonex/Victor (try in-store). Bonny: serious second-tier with strong wide-foot options. ASICS: not badminton-branded but credible indoor-court option for wide-foot players. Kawasaki: capable mid-tier with quick-lace innovations." },
        { heading: "The final shoe-buyer summary", body: "Buy badminton-specific shoes for badminton play. Match width to foot shape — don't fight your last. Choose cushion vs speed based on body weight, joint history, and play style. Prioritise stability if you have any ankle vulnerability. Replace shoes at first sign of wear, midsole compression, or upper failure. Your shoes are the most consequential piece of equipment for your body's long-term health — invest accordingly." },
      ],
      cta: "Use the shoe finder with your fit width, cushion preference, and stability needs to get a personalised shortlist.",
      factChecks: [
        { sourceName: "IntoBadminton source-rights registry", title: "Source rights registry", section: "Platform posture", checkedAt: "2026-05-19", href: "https://intobadminton.com/source-policy/", quote: "use only for source discovery/manual summaries until terms or partnership is clear", note: "Shoe selection and replacement guidance synthesised from BadmintonCN community posts and shoe-specific reviews; technical recommendations are original IntoBadminton interpretation grounded in first-party shoe testing across multiple brands." },
      ],
    },
    ...sourceReviewArticles,
  ],
};

const sourcePolicyFactCheck: BlogFactCheck = {
  sourceName: "IntoBadminton source-rights registry",
  title: "Source rights registry",
  section: "Platform posture",
  checkedAt: "2026-05-13",
  href: "https://intobadminton.com/source-policy/",
  quote:
    "use only for source discovery/manual summaries until terms or partnership is clear",
  note:
    "Third-party community reviews are source discovery and manually reviewed impressions; they are not treated as official product specifications.",
};

function defaultReviewStory(article: BlogArticle): BlogStory | undefined {
  if (!article.reviewSummary) return article.story;

  // Lightweight scaffold appended to every review-category article. Two
  // article-specific blocks only — a single facts block (parameterized on
  // the article's own verdict) and a buyer-first verdict block (built from
  // the article's reviewSummary). Earlier iterations injected three
  // verbatim callouts on every review which read as boilerplate after a
  // few articles; those have been removed in favor of a one-block
  // intro + one-block verdict pattern.
  const synthesized: BlogStory = {
    intro: `The useful question is not whether ${article.title} sounds exciting. The useful question is whether the promise survives an ordinary club night: late lifts, loose blocks, tired legs, and the point where a buyer stops admiring a spec sheet and starts living with the purchase.`,
    blocks: [
      {
        kind: "verdict",
        heading: "Buyer-first read",
        body: article.reviewSummary.verdict,
        bullets: [
          `Best for: ${article.reviewSummary.bestFor.join(", ")}.`,
          `Avoid if: ${article.reviewSummary.avoidIf.join(", ")}.`,
          article.reviewSummary.sourceHook,
        ],
      },
    ],
  };

  // If the raw article supplied its own story (e.g. a firstPerson evidence
  // block for E-E-A-T), keep it at the TOP and append the synthesized
  // scaffold below. Intro is taken from the synthesized scaffold so the
  // rendered article doesn't start with a duplicate of the dek.
  if (article.story) {
    return {
      intro: synthesized.intro,
      blocks: [...article.story.blocks, ...synthesized.blocks],
    };
  }

  return synthesized;
}

function withEditorialSafeguards(article: BlogArticle): BlogArticle {
  if (article.category !== "reviews") return article;

  const hasPolicyNote = article.factChecks?.some(
    (note) => note.sourceName === sourcePolicyFactCheck.sourceName
  );

  return {
    ...article,
    story: defaultReviewStory(article),
    factChecks: [
      ...(article.factChecks ?? []),
      ...(hasPolicyNote ? [] : [sourcePolicyFactCheck]),
    ],
  };
}

export const blogArticles: Record<SiteLocale, BlogArticle[]> = {
  en: rawBlogArticles.en.map(withEditorialSafeguards),
};

export function getBlogArticle(locale: SiteLocale, slug: string) {
  return blogArticles[locale].find((article) => article.slug === slug);
}
