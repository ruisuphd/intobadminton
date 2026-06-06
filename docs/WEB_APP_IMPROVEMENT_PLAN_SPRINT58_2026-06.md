# Web App Improvement Plan — Sprint 58 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-059d`  
**Baseline:** Sprint 57 — homepage golden profile, review map parity (PR #205).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 58 response |
|------------|---------------------------|-------------------|
| **Wirecutter** | Homepage surfaces latest reviews with stable cross-links | ✅ Featured review slice hrefs guarded in homepage + reviews CI |
| **Tennis Warehouse** | Popular searches drive to product-mapped review exits | ✅ Tour guide, Kumpoo profile, stringing explainer in reviews baseline |
| **RTINGS** | High-traffic review URLs carry equipment finder panels | ✅ 6 homepage featured reviews with finder panel + catalog CTA guards |
| **BadmintonCentral** | Explainer articles stay separate from product reviews | ✅ Stringing-hole explainer `expectUnmapped` guard |
| **RacketGuide** | Landing page deep-links regression-tested end-to-end | ✅ Homepage e2e verifies all 6 featured review card hrefs |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v26, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 58)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Homepage featured reviews lack golden-profile CI guard** | Carousel regressions invisible despite high traffic | ✅ 6 featured slugs in `reviews-queries.json` + `requireFeaturedParity` |
| 2 | **Popular-search review deep-links unguarded** | Tour guide / Kumpoo / stringing explainer wiring untested | ✅ 3 article rows + homepage `expectPopularSearchHrefs` extension |
| 3 | **Home baseline only counts featured slice, not which slugs** | Wrong articles could appear without CI failure | ✅ `expectFeaturedReviewHrefs` on CrUX homepage row |
| 4 | **Featured review e2e missing** | Browser regressions on homepage cards undetected | ✅ Home e2e asserts all 6 featured hrefs; 4 new review e2e rows |
| 5 | **No featured-parity linkage between home data and reviews guard** | `home-featured-reviews.json` could drift from reviews baseline | ✅ `requireFeaturedParity` coverage counter in `reviews-baseline.ts` |

**Deferred (Sprint 59+):** owner deploy reactions worker + `REACTIONS_API_URL`; fill CrUX/GSC CSVs; original photography; YouTube `sameAs`; expand per-article review profiles to full Lighthouse review URL set.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Featured review golden profiles | `docs/baselines/reviews-queries.json` (+9 article rows) |
| Featured parity evaluator | `src/lib/reviews-baseline.ts`, `src/lib/home-featured.ts` |
| Homepage featured href guard | `docs/baselines/home-queries.json`, `src/lib/home-baseline.ts` |
| Unit tests | `src/lib/reviews-baseline.test.ts`, `src/lib/home-baseline.test.ts` |
| Playwright smoke | `e2e/home-baseline-smoke.spec.ts`, `e2e/reviews-baseline-smoke.spec.ts` |
| Baselines README | `docs/baselines/README.md` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 57 deferred items + competitive audit | ✅ |
| 2 | Golden JSON validates schema (slug + expectCatalogHref + map fields) | ✅ |
| 3 | All 6 `home-featured-reviews.json` slugs in reviews baseline | ✅ |
| 4 | All 3 popular-search review hrefs in homepage baseline | ✅ |
| 5 | Mapped featured articles resolve catalog exit + enrichment | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: schema + evaluator + parity counters | ✅ |
| 8 | `npm run lint:discovery-baselines` + `lint:editorial-baselines` pass | ✅ |
| 9 | `npm test` (485) + `npm run build` | ✅ |
| 10 | Baseline e2e smoke passes on homepage + review articles | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:home-baseline
npm run lint:discovery-baselines
npm run lint:editorial-baselines
npm run build
npm run test:e2e -- e2e/home-baseline-smoke.spec.ts e2e/reviews-baseline-smoke.spec.ts
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Lighthouse performance (CrUX URLs) | ≥ 0.9 (lab baseline) |
| CrUX URL golden-profile coverage | 100% |
| Reviews golden profiles | Hub + map parity + featured + popular-search articles in CI |
| Product funnel golden profiles | 100% pass in CI |
| Editorial hub golden profiles | 100% pass in CI |
