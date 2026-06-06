# Web App Improvement Plan — Sprint 62 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-840e`  
**Baseline:** Sprint 61 — full mapped review corpus golden profiles, sync tooling (PR #209).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 62 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Brand hubs deep-link to SKU reviews with stable URLs | ✅ 19 brand-shelf review slugs in golden-profile CI |
| **RTINGS** | Brand→review wiring regression-tested beyond product map | ✅ `requireBrandReviewParity` links reviews baseline to brand shelves |
| **Wirecutter** | Popular-search explainers reachable offline | ✅ PWA ib-v29 precaches stringing-hole explainer shell |
| **BadmintonCentral** | Niche brand reviews (Kumpoo, Bonny, Kawasaki) discoverable from brand hubs | ✅ Brand shelf reviews offline-precached |
| **RacketGuide** | Shared manifest prevents brand/CI drift | ✅ `src/lib/brand-reviews.ts` |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v29, lab + CrUX + GSC + full product-funnel + editorial CI guards, 142-article reviews golden corpus.

---

## 2. Top 5 gaps (Sprint 62)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Brand hub review shelves lack golden-profile CI** | Yonex/Kumpoo/Bonny review href regressions undetected | ✅ `requireBrandReviewParity` + `brand-reviews.ts` |
| 2 | **No shared brand↔review manifest** | PWA and CI guards can drift from `relatedLinks` | ✅ `src/lib/brand-reviews.ts` (19 slugs) |
| 3 | **Brand shelf reviews absent from offline shell** | Brand→review deep-links fail offline after first visit | ✅ PWA ib-v29 precaches 16 brand shelf + stringing explainer shells |
| 4 | **Popular-search stringing explainer not offline** | Homepage grid deep-link fails offline | ✅ `/review/racket-stringing-hole-patterns-explained/` in precache |
| 5 | **Full mapped corpus guards brand shelves implicitly only** | Brand-specific shelf changes not isolated in CI | ✅ Dedicated `requireBrandReviewParity` counter |

**Deferred (Sprint 63+):** owner deploy reactions worker + `REACTIONS_API_URL`; fill CrUX/GSC CSVs; original photography; YouTube `sameAs`; PWA precache for full 140+ review corpus (impractical).

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Brand review manifest | `src/lib/brand-reviews.ts`, `src/lib/brand-reviews.test.ts` |
| Brand shelf parity guard | `src/lib/reviews-baseline.ts`, `docs/baselines/reviews-queries.json` |
| PWA ib-v29 precache | `public/sw.js`, `src/lib/pwa-precache-paths.ts` |
| Unit tests | `src/lib/reviews-baseline.test.ts`, `src/lib/pwa-precache.test.ts` |
| E2e PWA version sync | `e2e/pwa-offline-smoke.spec.ts` |
| Baselines README | `docs/baselines/README.md` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 61 deferred items + competitive audit | ✅ |
| 2 | Golden JSON validates schema with `requireBrandReviewParity` | ✅ |
| 3 | All 19 brand shelf slugs in reviews baseline | ✅ |
| 4 | Brand shelf slugs resolve catalog exit or expectUnmapped | ✅ |
| 5 | Existing e2e flags preserved on priority slugs | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: brand-reviews + brand parity counter | ✅ |
| 8 | `npm run lint:editorial-baselines` pass | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | PWA precache asserts include brand shelf review shells | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:reviews-baseline
npm run lint:editorial-baselines
npm run build
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Reviews golden profiles | Hub + full mapped corpus (140) + brand shelves in CI |
| Brand shelf review parity | 100% |
| Product funnel golden profiles | 100% pass in CI |
| Editorial hub golden profiles | 100% pass in CI |
