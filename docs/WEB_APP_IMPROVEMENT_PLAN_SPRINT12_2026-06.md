# Web App Improvement Plan — Sprint 12b (June 2026)

**Branch:** `cursor/web-app-improvement-plan-bfaf` (PR #157)  
**Baseline:** Sprint 12a on `main` (#158 — PWA `ib-v7`, related shelves, HelpfulReaction UX).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 12b response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Personalized sort while browsing | ✅ Catalog **Best fit for you** when finder profile is saved |
| **RacketGuide** | Fit preview on product pages | ✅ PDP + review panels use saved profile, not reference-only |
| **Wirecutter / RTINGS** | Filterable review archive | ✅ Reviews hub search + kind/equipment chips |
| **Retailer finders** | Shareable shortlist URLs | ✅ E2E round-trip for `/results/?…` share links |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate.

---

## 2. Top 5 gaps (Sprint 12b)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **PDP/review fit uses reference profile only** | Weak personalization on highest-intent pages | ✅ `ReviewProductPanel` + `profile-ready.ts` |
| 2 | **Catalog lacks personalized sort** | Browse UX lags TW/RacketGuide | ✅ `fit-desc` sort when profile ready |
| 3 | **Reviews hub is flat chronological** | Poor discovery vs Wirecutter browse | ✅ `ReviewsIndexClient` filters |
| 4 | **Share URL parity untested** | Viral results loop regressions | ✅ `results-share-smoke` round-trip e2e |
| 5 | **Reviews hub filter e2e missing** | Regressions on discovery UX | ✅ `reviews-hub-smoke.spec.ts` |

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Profile-aware fit panels | `src/lib/profile-ready.ts`, `ReviewProductPanel.tsx`, `ProductDetailPage.tsx` |
| Catalog best-fit sort | `catalog-url.ts`, `CatalogClient.tsx` |
| Reviews hub filters | `review-hub-filters.ts`, `ReviewsIndexClient.tsx` |
| Share URL e2e | `e2e/results-share-smoke.spec.ts`, `e2e/reviews-hub-smoke.spec.ts` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 11 deferred list + competitive audit | ✅ |
| 2 | Personalized fit falls back to reference when profile incomplete | ✅ |
| 3 | `fit-desc` invalid without profile → price-asc fallback | ✅ |
| 4 | Review filters do not hide mapped SKUs incorrectly | ✅ unit tests |
| 5 | Static export — no new dynamic routes | ✅ |
| 6 | Does not regress PWA `ib-v7` on main | ✅ |
| 7 | Unit tests: profile-ready, review-hub-filters, catalog-url | ✅ |
| 8 | `npm test` green | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | Lighthouse URL set unchanged | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npx playwright test e2e/results-share-smoke.spec.ts e2e/reviews-hub-smoke.spec.ts
```

---

## 6. Deferred (Sprint 13+)

- Production `NEXT_PUBLIC_REACTIONS_API_URL` in GitHub repo secrets
- Owner: fill `docs/baselines/crux-template.csv` from PageSpeed Insights
- Catalog keyword search (`q` param on `/catalog/`)
- Original `public/products/` photography on top commercial URLs
- `VideoObject` / YouTube `sameAs` (channel claim)
