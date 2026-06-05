# Web App Improvement Plan — Sprint 13 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-b1ad` (rebased PR #157 + Sprint 13)  
**Baseline:** Sprint 12 on `main` (#158) + profile fit pass (#157).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 13 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Keyword search while filter-browsing catalog | ✅ `/catalog/?q=` shareable keyword filter |
| **RacketGuide** | Model lookup without full site search | ✅ Fuzzy token match on brand, model, specs |
| **Wirecutter / RTINGS** | Aggregate helpful counts on reviews | ⏳ Reactions worker URL still owner secret |
| **YouTube-first reviewers** | Video evidence in SERP | ⏳ `VideoObject` gated on channel claim |
| **Retailer PDPs** | Original product photography | ⏳ Editorial pipeline for top commercial URLs |

**Moat unchanged:** transparent fit score, claims CI, static export, postbuild SEO gate.

---

## 2. Top 5 gaps (Sprint 13)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Catalog lacks keyword search** | Users must leave browse for `/search/` | ✅ `q` param + `catalog-search.ts` (this PR) |
| 2 | **PR #157 blocked on main merge conflicts** | Sprint 12 profile fit not on main | ✅ Rebase onto #158; unified Sprint 12 docs |
| 3 | **HelpfulReaction prod aggregates** | Social proof on editorial pages | ⏳ Owner: deploy worker + `REACTIONS_API_URL` |
| 4 | **Original photography on commercial URLs** | AdSense experience signal | ⏳ Editorial `public/products/` pipeline |
| 5 | **CrUX baseline not recorded** | CWV regression detection | ⏳ Owner: fill `docs/baselines/crux-template.csv` |

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Catalog keyword filter | `src/lib/catalog-search.ts`, `catalog-search.test.ts` |
| Shareable `q` URL param | `src/lib/catalog-url.ts`, `catalog-url.test.ts` |
| Catalog search UI | `src/app/catalog/CatalogClient.tsx` |
| E2E keyword smoke | `e2e/catalog-smoke.spec.ts` |
| Sprint 12 rebase (PR #157) | profile-ready, review filters, fit-desc sort, share e2e |
| Unified Sprint 12 docs | `docs/WEB_APP_IMPROVEMENT_PLAN_SPRINT12_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 12 deferred list + competitive audit | ✅ |
| 2 | `q` composes with existing facet filters (cat, brand, price) | ✅ |
| 3 | Empty `q` omitted from share URL | ✅ |
| 4 | Fuzzy match reuses `search-fuzzy.ts` (no duplicate logic) | ✅ |
| 5 | Static export — client-only filter, no new routes | ✅ |
| 6 | GA4 `catalog_filter` includes `q` dimension | ✅ |
| 7 | Unit tests: catalog-search, catalog-url | ✅ |
| 8 | `npm test` green | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | E2e: catalog keyword + Sprint 12 smokes | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npm run lint
npx playwright test e2e/catalog-smoke.spec.ts e2e/results-share-smoke.spec.ts e2e/reviews-hub-smoke.spec.ts
```

---

## 6. Deferred (Sprint 14+)

- Owner: deploy reactions worker + set `REACTIONS_API_URL` repository secret
- Owner: fill `docs/baselines/crux-template.csv` from PageSpeed Insights
- Original `public/products/` photography on top commercial URLs
- `VideoObject` / YouTube `sameAs` (channel claim)
- Site search → catalog deep links with `?q=` for product hits
