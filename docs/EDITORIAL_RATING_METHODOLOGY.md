# Editorial rating methodology

How IntoBadminton derives the star ratings that appear in `Product` JSON-LD on
`/best/<category>/` pages and on `/results/`.

## Why we have ratings at all

Google Search Console flags two non-critical structured-data warnings when a
page emits `Product` schema without ratings or reviews:

- **Missing field `aggregateRating`** under "Product snippets"
- **Missing field `review`** under "Product snippets"

Without one of these, Google cannot show a star-rating snippet under the
search result. The site is editorial (not a retailer), so we add legitimate
ratings derived from real signals — never synthesized from thin air.

## What we DO NOT do

- We do not invent star counts.
- We do not pull ratings from third-party sites and re-publish them as our
  own.
- We do not aggregate user-generated content (the site has no users to
  generate it).
- We do not emit `aggregateRating` for products that have only one review
  source (Google's rules require ≥2 distinct sources).
- We do not emit `offers` because the site is not a retailer and earns no
  affiliate commission.

## What we DO do

The rating function `computeEditorialRating()` in
[`src/lib/editorial-rating.ts`](../src/lib/editorial-rating.ts) starts at a
base of **4.0** (since these products survived editorial filtering to be
featured in a `/best/` list) and adjusts up or down based on real signals
already recorded per product:

| Signal | Adjustment | Source field |
| --- | --- | --- |
| Spec page = official manufacturer URL | +0.4 | `verificationStatus === "official_verified"` |
| Spec page = editor-verified across two retailers | +0.2 | `verificationStatus === "editor_verified"` |
| Spec page still needs verification | −0.2 | `verificationStatus === "needs_review"` |
| Shaft flex from official source | +0.2 | `shaftFlexSource === "official"` (rackets only) |
| Shaft flex is an editor estimate | −0.2 | `shaftFlexSource === "editor_estimate"` (rackets only) |
| Founder personally tested on court | +0.3 | `editorNote` matches `/founder firsthand|founder current/i` |
| Substantive editor note (else) | +0.1 | `editorNote.length > 100` |
| High-confidence market signal | +0.15 each, capped at +0.30 | `marketSignals[].confidence === "high"` |
| ≥3 independent review sources | +0.1 | `reviewCount >= 3` |

**Output range:** clamped to [3.5, 5.0]. Rounded to one decimal.

The `reviewCount` reported on `aggregateRating` is the count of distinct
review sources we actually publish:

```
reviewCount = (editorNote ? 1 : 0) + marketSignals.length + reviewCount field
```

We never report a `reviewCount` higher than the number of distinct sources we
can point to.

## Aggregate vs. single review

- If `reviewCount >= 2`: the JSON-LD emits both `aggregateRating` (fulfilling
  the rating snippet requirement) and a primary `review` (fulfilling the
  review snippet requirement). The `review.author` is the editor (Rui Su).
- If `reviewCount === 1`: the JSON-LD emits only `review`. We do not emit
  `aggregateRating` because Google's documentation explicitly requires ≥2
  distinct ratings for an aggregate.

## How to keep ratings honest

When a product is added or updated:

1. Set `verificationStatus` based on whether the spec source is the
   manufacturer's product page or a third-party retailer.
2. For rackets, set `shaftFlexSource` based on whether the flex tier is
   spelled out on the manufacturer page (`official`), implied by retailer
   listings (`retailer`), or filled in by editorial estimate
   (`editor_estimate`).
3. Cite real `marketSignals` with `confidence: "high"` only when we have a
   substantive third-party review (BadmintonCN long-form, ckyew.com,
   YouTube reviewer with on-court testing, etc.). Confidence `"medium"` for
   surface-level signals; `"low"` for thin/marketing material.
4. Set `reviewCount` to the count of *additional* independent sources beyond
   the editor's own note. Default 0.

The rating will then re-derive automatically from those fields. The test
suite (`src/lib/editorial-rating.test.ts`) enforces that:

- Ratings stay in [3.5, 5.0].
- `aggregateRating` only appears when `reviewCount >= 2`.
- Each rating has at least one rationale line explaining where it came from.
