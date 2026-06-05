# Web App Improvement Plan — Sprint 14 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-bfaf` (PR #157)  
**Baseline:** Sprint 13 on `main` (#159) — PDP related shelf, explainer clusters, PWA `ib-v8`.

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 14 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Keyword search while filter-browsing catalog | ✅ `/catalog/?q=` shareable keyword filter |
| **RacketGuide** | Model lookup without full site search | ✅ Fuzzy token match on brand, model, specs |
| **Wirecutter / RTINGS** | Personalized fit on editorial pages | ✅ Profile-aware `ReviewProductPanel` on PDP + reviews |
| **Retailer finders** | Personalized browse sort | ✅ Catalog **Best fit for you** when profile saved |
| **BadmintonCentral** | Filterable review archive | ✅ Reviews hub search + kind/equipment chips |

**Moat unchanged:** transparent fit score, claims CI, static export, postbuild SEO gate.

---

## 2. Top 5 gaps (Sprint 14)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Catalog lacks keyword search** | Users must leave browse for `/search/` | ✅ `q` param + `catalog-search.ts` (PR #157) |
| 2 | **PDP/review fit uses reference profile only** | Weak personalization on highest-intent pages | ✅ `profile-ready.ts` + `ReviewProductPanel` |
| 3 | **Catalog lacks personalized sort** | Browse UX lags TW/RacketGuide | ✅ `fit-desc` sort when profile ready |
| 4 | **Reviews hub is flat chronological** | Poor discovery vs Wirecutter browse | ✅ `ReviewsIndexClient` filters |
| 5 | **Share URL parity untested** | Viral results loop regressions | ✅ `results-share-smoke` round-trip e2e |

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Catalog keyword filter | `src/lib/catalog-search.ts`, `catalog-search.test.ts` |
| Shareable `q` URL param | `src/lib/catalog-url.ts`, `catalog-url.test.ts` |
| Catalog search UI | `src/app/catalog/CatalogClient.tsx` |
| Profile-aware fit panels | `src/lib/profile-ready.ts`, `ReviewProductPanel.tsx`, `ProductDetailPage.tsx` |
| Catalog best-fit sort | `catalog-url.ts`, `CatalogClient.tsx` |
| Reviews hub filters | `review-hub-filters.ts`, `ReviewsIndexClient.tsx` |
| E2E regression | `catalog-smoke`, `results-share-smoke`, `reviews-hub-smoke` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 12–13 deferred list + competitive audit | ✅ |
| 2 | `q` composes with existing facet filters (cat, brand, price) | ✅ |
| 3 | Personalized fit falls back to reference when profile incomplete | ✅ |
| 4 | Fuzzy match reuses `search-fuzzy.ts` (no duplicate logic) | ✅ |
| 5 | Static export — client-only filter, no new routes | ✅ |
| 6 | PWA stays on `ib-v8` from main (no version regression) | ✅ |
| 7 | Unit tests: catalog-search, profile-ready, review-hub-filters | ✅ |
| 8 | `npm test` green | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | E2e: catalog keyword + results share + reviews hub | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npm run lint
npx playwright test e2e/catalog-smoke.spec.ts e2e/results-share-smoke.spec.ts e2e/reviews-hub-smoke.spec.ts
```

---

## 6. Deferred (Sprint 15+)

- Owner: deploy reactions worker + set `REACTIONS_API_URL` repository secret
- Owner: fill `docs/baselines/crux-template.csv` from PageSpeed Insights
- Original `public/products/` photography on top commercial URLs
- `VideoObject` / YouTube `sameAs` (channel claim)
- Site search → catalog deep links with `?q=` for product hits
