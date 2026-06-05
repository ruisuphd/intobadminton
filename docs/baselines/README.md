# Performance and search baselines

Owner-run capture for Core Web Vitals and Google Search Console trends, plus committed on-site search golden queries. Agents cannot access GSC; store exports here for regression comparison.

## Finder golden profiles (scoring engine)

Committed player profiles and expected shortlist behaviour for the transparent fit-score engine:

- [`finder-profile-queries.json`](finder-profile-queries.json) — club doubles racket, budget beginner, wide-foot shoes, string shopper, pro singles, ankle-injury guard.

Validate against the live scoring engine (runs in CI after discovery parity guard):

```bash
npm run lint:finder-baseline
```

Profiles with `"e2e": true` are also exercised in Playwright (`e2e/finder-baseline-smoke.spec.ts`) — quiz funnel through to a non-empty results shortlist.

## Unified discovery guards

Refresh all three discovery regression layers in one operator command:

```bash
npm run lint:discovery-baselines
```

Runs `lint:search-baseline`, `lint:catalog-baseline`, and `lint:discovery-baseline` sequentially.

## Discovery parity (search submit ↔ catalog filter)

Committed expectations for **product-intent** queries where header/search submit routes to `/catalog/?q=` and the catalogue keyword filter must return matching rows:

- [`discovery-parity-queries.json`](discovery-parity-queries.json) — pairs covering SKU tokens and full product ids (`ac102c`, `yy-ac102c`, `vic-p9200`, `yy-bg65`).

Validate routing + catalogue row counts (runs in CI after catalog guard):

```bash
npm run lint:discovery-baseline
```

Queries with `"e2e": true` are also exercised in Playwright (`e2e/discovery-parity-smoke.spec.ts`) — header submit through to visible catalog product rows.

## Catalogue keyword search (golden queries)

Committed expectations for `/catalog/?q=` keyword filtering:

- [`catalog-keyword-queries.json`](catalog-keyword-queries.json) — brand, model, SKU, spec-token, and empty-result guards.

Validate against the live product index (runs in CI after site search guard):

```bash
npm run lint:catalog-baseline
```

Queries with `"e2e": true` are also exercised in Playwright (`e2e/catalog-baseline-smoke.spec.ts`) after static build.

## On-site search (golden queries)

Committed expectations for `/search/`, header autocomplete, and product-intent submit routing:

- [`site-search-queries.json`](site-search-queries.json) — queries covering reviews, guides, best-of, compare, catalog, fuzzy typos, empty-query guards, **submit routing** (`/catalog/?q=` vs `/search/?q=`), and **autocomplete** suggestion rows.

Validate against the live search index, routing, and suggestions (runs in CI after unit tests):

```bash
npm run lint:search-baseline
```

Queries with `"e2e": true` are also exercised in Playwright (`e2e/search-baseline-smoke.spec.ts`) after static build.

Refresh the JSON when adding high-traffic discovery routes or changing search ranking — keep expectations aligned with intentional UX, not accidental top hits.

## CrUX (field data)

1. Open [PageSpeed Insights](https://pagespeed.web.dev/) for each URL below.
2. Export or copy LCP, INP, CLS for mobile and desktop.
3. Save as `docs/baselines/crux-YYYY-MM-DD.csv` with columns:
   `url,device,lcp_ms,inp_ms,cls,note`

   Copy [`crux-template.csv`](crux-template.csv) as a starting point — it lists the
   priority URLs with empty metric cells ready to fill from PageSpeed Insights.

Priority URLs:

- `https://intobadminton.com/`
- `https://intobadminton.com/quiz/`
- `https://intobadminton.com/best/beginner-rackets/`
- `https://intobadminton.com/review/yonex-arcsaber-7-pro-review/`
- `https://intobadminton.com/compare-guides/yonex-astrox-vs-nanoflare/`

## Google Search Console

1. Search Console → Performance → Export last 28 days.
2. Save as `docs/baselines/gsc-performance-YYYY-MM-DD.csv` (or copy [`gsc-template.csv`](gsc-template.csv) for column layout).
3. Note total clicks, impressions, and average position in the commit message or `AUTOMATION_RUNLOG.md`.

Validate CrUX CSV structure and thresholds (when metrics are filled):

```bash
npm run lint:crux-baseline
```

Validate GSC CSV structure and metric sanity (when metrics are filled):

```bash
npm run lint:gsc-baseline
npm run lint:gsc-baseline:compare   # optional >10% clicks/impressions regression guard
```

Committed GSC snapshot (empty until owner fills): [`gsc-performance-baseline.json`](gsc-performance-baseline.json).

## CI Lighthouse

Local parity with GitHub Actions:

```bash
npm run build
npx -y serve@latest out -l 4173 &
sleep 2
npm run lint:lighthouse
npm run lint:lighthouse:baseline
```

Configs:

- Full CI URL set (78 routes): [`lighthouserc.json`](../../lighthouserc.json)
- CrUX-priority baseline subset (11 routes): [`lighthouserc-baseline.json`](../../lighthouserc-baseline.json)

Refresh the committed baseline after intentional perf work:

```bash
npm run build
npx -y serve@latest out -l 4173 &
sleep 2
npm run capture:lighthouse:baseline
```

Committed scores: [`lighthouse-scores.json`](lighthouse-scores.json).
