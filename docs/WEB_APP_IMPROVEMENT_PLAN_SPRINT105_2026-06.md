# Web App Improvement Plan — Sprint 105 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-e428`  
**Baseline:** Sprint 104 — shuttle commercial landing + three-way editorial parity CI (PR #252).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 105 response |
|------------|---------------------------|---------------------|
| **Tennis Warehouse** | Shoe PDP, category browse, and buying guides agree on editorial exit per SKU | ✅ Shoe three-way parity guard (PDP ↔ catalog ↔ commercial) |
| **RunRepeat / RunRepeat-style shoe guides** | Multiple fit-intent landings (wide, budget, general) with consistent review depth links | ✅ 16 SKUs across `/best/shoes/`, `/best/wide-feet-badminton-shoes/`, `/best/budget-badminton-shoes/` |
| **Wirecutter** | Cross-surface regression on high-traffic categories | ✅ `lint:shoe-editorial-baselines` aggregate + CI workflow |
| **RTINGS** | PDP golden profiles track editorial slug resolution, not naive map first-match | ✅ `reviewSlugForProductId` aligned with `editorialReviewHref` scoring |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v31, 56 review-map golden profiles, 18/18 commercial image CI, 6+6 string + 6+6 shuttle golden profiles.

---

## 2. Top 5 gaps (Sprint 105)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Shoe PDP/catalog/commercial parity unasserted** | Three shoe commercial landings had review-map CI but no cross-surface guard | ✅ `shoe-editorial-parity.ts` three-way unit guard (16 SKUs) |
| 2 | **Missing PDP golden profiles for shoe commercial picks** | Only 2/16 shoe picks had PDP baseline rows | ✅ 16 shoe PDP rows in `pdp-queries.json` |
| 3 | **No unified shoe editorial lint command** | Operators ran PDP + review-map checks separately | ✅ `lint:shoe-editorial-baselines` aggregate |
| 4 | **PDP slug resolution drift on duplicate review maps** | `ln-bladesabre-max` map had two slugs; naive first-match disagreed with live exits | ✅ `reviewSlugForProductId` prefers `editorialReviewHref` |
| 5 | **String parity missing from editorial aggregate** | `editorial-baselines.mjs` ran shuttle but not string three-way parity | ✅ Added `string-editorial-parity` to aggregate |

**Deferred (Sprint 106+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX/GSC CSV metrics; racket three-way parity.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Catalog + commercial golden profiles | `docs/baselines/catalog-shoe-queries.json`, `docs/baselines/commercial-shoe-queries.json` |
| Three-way parity evaluator + tests | `src/lib/shoe-editorial-parity.ts`, `src/lib/shoe-editorial-parity.test.ts` |
| Catalog + commercial baseline libs | `src/lib/catalog-shoe-baseline.ts`, `src/lib/commercial-shoe-baseline.ts` |
| PDP golden profiles (16 shoe SKUs) | `docs/baselines/pdp-queries.json` |
| PDP slug resolution fix | `src/lib/pdp-baseline.ts` |
| CI lint scripts | `scripts/catalog-shoe-baseline.mjs`, `scripts/commercial-shoe-baseline.mjs`, `scripts/shoe-editorial-parity.mjs`, `scripts/shoe-editorial-baselines.mjs` |
| E2E smoke | `e2e/catalog-shoe-baseline-smoke.spec.ts`, `e2e/commercial-shoe-baseline-smoke.spec.ts` |
| Editorial aggregate | `scripts/editorial-baselines.mjs` |
| CI workflow | `.github/workflows/ci.yml` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 104 deferred items + competitive audit | ✅ |
| 2 | All 16 shoe productIds in catalog + commercial baselines | ✅ |
| 3 | All 16 shoe productIds have PDP `expectCategory: shoes` rows | ✅ |
| 4 | Alias picks (65 Z Wide, Aerus Z2, P9200) use correct resolved review slugs | ✅ |
| 5 | Commercial queries include `expectBestSlug` for three landings | ✅ |
| 6 | Three-way parity agrees on slug/kind per productId | ✅ |
| 7 | `reviewSlugForProductId` matches `editorialReviewHref` for duplicate maps | ✅ |
| 8 | HelpfulReaction owner secret assessed — blocked on repo secret | ✅ deferred |
| 9 | String parity added to `editorial-baselines.mjs` aggregate | ✅ |
| 10 | `npm test` + baselines + `npm run build` + shoe e2e pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:shoe-editorial-baselines
npm run lint:pdp-baseline
npm run build
npx playwright test e2e/catalog-shoe-baseline-smoke.spec.ts e2e/commercial-shoe-baseline-smoke.spec.ts
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Commercial landings under image CI | 18/18 (unchanged) |
| PDP golden profiles with e2e | 22 (was 16; +6 shoe) |
| Catalog shoe golden profiles | 16 |
| Commercial shoe golden profiles | 16 |
| Shoe editorial three-way parity | 16/16 SKUs |
| String editorial three-way parity | 6/6 SKUs (unchanged) |
| Shuttle editorial three-way parity | 6/6 SKUs (unchanged) |
