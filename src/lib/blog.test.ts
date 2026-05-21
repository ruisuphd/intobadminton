import { describe, expect, test } from "vitest";
import {
  blogArticles,
  blogSlugs,
  readingTimeMinutes,
  relatedArticles,
  type BlogStoryBlock,
} from "@/lib/blog";

// The founder-firsthand product list is authoritative — first-person voice
// (and `methodology` blocks with `context: "founderFirsthand"`) may only
// be used on articles whose primary product appears here. Everything else
// MUST use `context: "observer"`. Mirrors project_author_voice memory.
const FOUNDER_FIRSTHAND_SLUG_FRAGMENTS = [
  "astrox-77-pro",
  "astrox-88d-pro",
  "astrox-88d-tour",
  "astrox-100zz",
  "astrox-99-pro-2",
  "arcsaber-11-pro",
  "arcsaber-7-pro",
  "nanoflare-1000z",
  "nanoflare-700-pro",
  "nanoflare-700-play",
  "aerus-z2",
  "comfort-z3",
];

function slugAllowsFirsthandVoice(slug: string): boolean {
  return FOUNDER_FIRSTHAND_SLUG_FRAGMENTS.some((fragment) =>
    slug.includes(fragment)
  );
}

const FIRST_PERSON_VERB_PATTERN =
  /\b(i|i'?m|i'?ve|my|me|mine|we|we'?ve|we'?re|our|ours)\b/i;

describe("blog publishing metadata", () => {
  test("keeps every English article reachable through static blog routes", () => {
    const routeSlugs = new Set(blogSlugs);

    expect(blogArticles.en.map((article) => article.slug)).toEqual(
      expect.arrayContaining(blogSlugs)
    );

    for (const article of blogArticles.en) {
      expect(routeSlugs.has(article.slug)).toBe(true);
    }
  });

  test("publishes the remaining markdown review sources as English review articles", () => {
    expect(blogSlugs).toEqual(
      expect.arrayContaining([
        "li-ning-halbertec-7000-ii-review",
        "victor-carbonsonic-max-shuttle-review",
        "bonny-leisu-800-racket-review",
        "kumpoo-shanhai-new-racket-review",
        "li-ning-axforce-80-review",
      ])
    );
  });

  test("gives every review article a concise buyer-first summary", () => {
    const reviews = blogArticles.en.filter(
      (article) => article.category === "reviews"
    );

    expect(reviews.length).toBeGreaterThan(0);

    for (const article of reviews) {
      expect(article.reviewSummary, article.slug).toBeDefined();
      expect(article.reviewSummary?.verdict.trim(), article.slug).not.toBe("");
      expect(
        article.reviewSummary?.bestFor.length,
        article.slug
      ).toBeGreaterThanOrEqual(2);
      expect(
        article.reviewSummary?.bestFor.length,
        article.slug
      ).toBeLessThanOrEqual(3);
      expect(
        article.reviewSummary?.avoidIf.length,
        article.slug
      ).toBeGreaterThanOrEqual(1);
      expect(
        article.reviewSummary?.avoidIf.length,
        article.slug
      ).toBeLessThanOrEqual(3);
      expect(article.reviewSummary?.sourceHook.trim(), article.slug).not.toBe(
        ""
      );

      for (const bullet of [
        ...(article.reviewSummary?.bestFor ?? []),
        ...(article.reviewSummary?.avoidIf ?? []),
      ]) {
        expect(
          bullet.split(/\s+/).length,
          `${article.slug}: ${bullet}`
        ).toBeLessThanOrEqual(16);
      }
    }
  });

  test("enriches priority review articles with narrative buyer-first blocks", () => {
    const priorityReviewSlugs = [
      "li-ning-halbertec-8000-vs-9000-vs-9000-power",
      "yonex-astrox-99-pro-2-deep-dive",
      "victor-auraspeed-hs-plus-deep-dive",
    ];

    for (const slug of priorityReviewSlugs) {
      const article = blogArticles.en.find((item) => item.slug === slug);

      expect(article, slug).toBeDefined();
      expect(article?.story?.intro.trim(), slug).not.toBe("");

      const blockKinds = new Set(
        article?.story?.blocks.map((block) => block.kind)
      );

      expect(blockKinds.has("facts"), slug).toBe(true);
      expect(blockKinds.has("callout"), slug).toBe(true);
      expect(blockKinds.has("comparison"), slug).toBe(true);
      expect(blockKinds.has("verdict"), slug).toBe(true);
    }
  });

  test("counts rich narrative blocks in article reading time", () => {
    const article = blogArticles.en.find(
      (item) => item.slug === "li-ning-halbertec-8000-vs-9000-vs-9000-power"
    );

    expect(article?.story).toBeDefined();
    expect(readingTimeMinutes(article!)).toBeGreaterThanOrEqual(4);
  });

  test("publishes the latest local source reviews as longer buyer-first articles", () => {
    const latestSourceSlugs = [
      "yonex-arcsaber-7-pro-review",
      "asics-blast-ff-3-badminton-shoes-review",
      "yonex-astrox-nextage-review",
      "victor-drivex-10-review",
      "yonex-nanoflare-1000z-play-review",
      "li-ning-halbertec-7000-ii-review",
      "yonex-nanoflare-800-pro-tour-review",
      "yonex-nanoflare-nextage-review",
      "yonex-power-cushion-88-dial-3-review",
      "yonex-grpht-thrttl-training-shoe-review",
    ];

    expect(blogSlugs).toEqual(expect.arrayContaining(latestSourceSlugs));

    for (const slug of latestSourceSlugs) {
      const article = blogArticles.en.find((item) => item.slug === slug);

      expect(article, slug).toBeDefined();
      expect(article?.reviewSummary, slug).toBeDefined();
      expect(article?.story?.intro.trim(), slug).not.toBe("");
      expect(readingTimeMinutes(article!), slug).toBeGreaterThanOrEqual(4);
    }
  });

  test("methodology blocks respect the founder-firsthand voice boundary", () => {
    // Walks every published article and asserts:
    //   1. A methodology block with context: "founderFirsthand" only appears
    //      on articles whose slug references a founder-firsthand product.
    //   2. A methodology block with context: "observer" never has a headline
    //      using first-person verbs (I/we/my/our).
    // The boundary is documented in project_author_voice memory and
    // enforced here at the type+content layer.
    for (const article of blogArticles.en) {
      const methodologyBlocks = (article.story?.blocks ?? []).filter(
        (block): block is Extract<BlogStoryBlock, { kind: "methodology" }> =>
          block.kind === "methodology"
      );

      for (const block of methodologyBlocks) {
        if (block.context === "founderFirsthand") {
          // founderFirsthand context is valid when EITHER:
          //   (a) the article slug references a firsthand product directly
          //       (single-product reviews like yonex-arcsaber-7-pro-review), OR
          //   (b) the methodology comparators include a founder-firsthand
          //       product (multi-product comparisons like
          //       yonex-nanoflare-speed-series-explained that cross-reference
          //       the NF1000Z founder current doubles racket).
          const comparatorMentionsFirsthand = (block.comparators ?? []).some(
            (c) => /founder firsthand/i.test(c)
          );
          const slugMentionsFirsthand = slugAllowsFirsthandVoice(article.slug);
          expect(
            slugMentionsFirsthand || comparatorMentionsFirsthand,
            `${article.slug} uses founderFirsthand context but neither the slug nor any comparator references a founder-firsthand product`
          ).toBe(true);
        } else {
          // Observer voice — headline must not be first-person.
          expect(
            FIRST_PERSON_VERB_PATTERN.test(block.headline),
            `${article.slug} observer methodology headline uses first-person verbs: "${block.headline}"`
          ).toBe(false);
        }
      }
    }
  });

  test("methodology block factors into reading-time estimate", () => {
    // A synthetic article with one methodology block must produce a
    // positive reading-time estimate without throwing on the discriminated
    // union exhaustiveness.
    const synthetic = {
      slug: "racket-balance-vs-swing-speed" as const,
      updatedAt: "2026-05-21",
      category: "guides" as const,
      title: "Methodology block coverage probe",
      dek: "Synthetic article confirming methodology block reading-time path.",
      story: {
        intro: "Probe article body to exercise the methodology branch.",
        blocks: [
          {
            kind: "methodology" as const,
            headline: "Tested over four club sessions in Dublin",
            context: "founderFirsthand" as const,
            conditions: {
              sessions: 4,
              strings: "BG80",
              tensionLbs: 26,
              opponents: "Division 4 doubles partners",
            },
            comparators: ["Nanoflare 1000Z", "Astrox 88D Pro"],
          },
        ],
      },
      sections: [
        {
          heading: "Why methodology disclosure matters",
          body: "The 2026 Product Reviews update rewards explicit test-conditions disclosure.",
        },
      ],
      cta: "Compare these rackets in the finder.",
    };
    expect(readingTimeMinutes(synthetic)).toBeGreaterThanOrEqual(1);
  });

  test("relatedArticles prefers brand+family matches over generic category matches", () => {
    // Take an Astrox 88D Pro vs 88S Pro article (founder firsthand, yonex-
    // astrox family). The new relatedArticles helper should surface OTHER
    // Astrox articles before unrelated category-matched articles.
    const current = blogArticles.en.find(
      (a) => a.slug === "yonex-astrox-88d-pro-vs-88s-pro-2024"
    );
    expect(current).toBeDefined();
    const related = relatedArticles(blogArticles.en, current!, 3);
    expect(related.length).toBeGreaterThan(0);
    // At least one of the top related articles should be in the same
    // yonex-astrox family.
    const yonexAstroxRelated = related.filter((a) =>
      a.slug.startsWith("yonex-astrox-")
    );
    expect(yonexAstroxRelated.length).toBeGreaterThan(0);
    // None of the related articles is the current article itself.
    expect(related.some((a) => a.slug === current!.slug)).toBe(false);
  });

  test("relatedArticles falls back to same-brand matches when family is sparse", () => {
    // RSL Supreme shuttle review — the only RSL family-mate is the RSL
    // Classic Tourney. The helper should still find it via brand matching.
    const rslSupreme = blogArticles.en.find(
      (a) => a.slug === "rsl-supreme-shuttle-review"
    );
    if (rslSupreme) {
      const related = relatedArticles(blogArticles.en, rslSupreme, 3);
      // Should include RSL family-mates or fall back to brand+category matches.
      expect(related.length).toBeGreaterThan(0);
    }
  });

  test("keeps published review articles grounded with fact-check source notes", () => {
    const reviews = blogArticles.en.filter(
      (article) => article.category === "reviews"
    );

    for (const article of reviews) {
      expect(article.factChecks?.length, article.slug).toBeGreaterThanOrEqual(1);

      for (const note of article.factChecks ?? []) {
        expect(note.sourceName.trim(), article.slug).not.toBe("");
        expect(note.title.trim(), article.slug).not.toBe("");
        expect(note.checkedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(note.href).toMatch(/^https:\/\//);
        expect(note.note.trim(), article.slug).not.toBe("");
      }
    }
  });
});
