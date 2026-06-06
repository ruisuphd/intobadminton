# Web App Improvement Plan — Sprint 60 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-90a2`  
**Baseline:** Sprint 59 — Lighthouse review parity, shared path parser (PR #207).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 60 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Head-to-head compare pages link to deep editorial reviews | ✅ 7 compare-guide shelf review slugs in golden-profile CI |
| **RTINGS** | High-traffic comparison exits regression-tested beyond lab URL set | ✅ `requireCompareGuideReviewParity` links reviews baseline to compare shelves |
| **Wirecutter** | Homepage popular searches wire to stable review exits | ✅ `requirePopularSearchParity` prevents popular-search drift |
| **BadmintonCentral** | Multi-product breakdown articles distinct from single-SKU reviews | ✅ Halbertec line, AxForce three-way, Nanoflare series explainers guarded |
| **RacketGuide** | Offline PWA covers comparison funnel deep-links | ✅ PWA ib-v28 precaches 7 compare-guide editorial review shells |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v28, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 60)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Compare-guide editorial reviews lack golden-profile CI** | Duel shelf regressions on Halbertec/AxForce/Nanoflare explainers undetected | ✅ 7 slugs in `reviews-queries.json` + `requireCompareGuideReviewParity` |
| 2 | **No popular-search↔reviews parity guard** | Homepage search grid review hrefs could drift from reviews baseline | ✅ `requirePopularSearchParity` in `reviews-baseline.ts` |
| 3 | **Review golden profiles stop at Lighthouse set** | 146-article archive mostly unguarded beyond 15 priority slugs | ✅ Expand to 22 article rows (Lighthouse + featured + compare-guide shelves) |
| 4 | **Compare-guide shelf review slugs duplicated ad hoc** | PWA and CI guards can drift from page `relatedLinks` | ✅ Shared `compare-guide-reviews.ts` module |
| 5 | **Compare-guide editorial reviews absent from offline shell** | Duel→review deep-links fail offline after first visit | ✅ PWA ib-v28 precaches 7 review article shells |

**Deferred (Sprint 61+):** owner deploy reactions worker + `REACTIONS_API_URL`; fill CrUX/GSC CSVs; original photography; YouTube `sameAs`; expand review golden profiles to full mapped corpus.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Compare-guide review manifest | `src/lib/compare-guide-reviews.ts`, `src/lib/compare-guide-reviews.test.ts` |
| Popular-search review helper | `src/lib/home-popular-searches.ts` |
| Reviews parity guards | `src/lib/reviews-baseline.ts`, `docs/baselines/reviews-queries.json` |
| PWA ib-v28 precache | `public/sw.js`, `src/lib/pwa-precache-paths.ts` |
| Unit tests | `src/lib/reviews-baseline.test.ts`, `src/lib/pwa-precache.test.ts` |
| E2e PWA version sync | `e2e/pwa-offline-smoke.spec.ts` |
| Baselines README | `docs/baselines/README.md` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 59 deferred items + competitive audit | ✅ |
| 2 | Golden JSON validates schema (slug + expectCatalogHref + map fields) | ✅ |
| 3 | All 7 compare-guide editorial slugs in reviews baseline | ✅ |
| 4 | All 4 homepage popular-search review hrefs in reviews baseline | ✅ |
| 5 | Mapped compare-guide articles resolve catalog exit + enrichment | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: compare-guide-reviews + parity counters | ✅ |
| 8 | `npm run lint:discovery-baselines` + `lint:editorial-baselines` pass | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | Baseline e2e smoke passes on compare-guide review articles | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:reviews-baseline
npm run lint:discovery-baselines
npm run lint:editorial-baselines
npm run build
npm run test:e2e -- e2e/reviews-baseline-smoke.spec.ts
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Lighthouse performance (CrUX URLs) | ≥ 0.9 (lab baseline) |
| Reviews golden profiles | Hub + map + featured + lighthouse + compare-guide shelves in CI |
| Compare-guide editorial review parity | 100% |
| Product funnel golden profiles | 100% pass in CI |
| Editorial hub golden profiles | 100% pass in CI |
