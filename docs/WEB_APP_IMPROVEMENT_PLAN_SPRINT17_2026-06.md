# Web App Improvement Plan — Sprint 17 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-9f3b`  
**Baseline:** Sprint 16 — catalog keyword search (`?q=`) + review index Keep reading shelf.

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 17 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Global search routes to filtered catalogue | ✅ Site search → `/catalog/?q=` prefill |
| **RTINGS** | Unified discovery → spec browse | ✅ Catalog match count CTA on `/search/` |
| **Wirecutter** | Search exits to product shortlists | ✅ Empty search suggests catalog when SKUs match |
| **RacketGuide** | Model lookup without leaving browse context | ✅ Same fuzzy tokens as catalog keyword filter |
| **BadmintonCentral** | Forum search dead-ends | ✅ Catalog deep-link on zero editorial hits |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate.

---

## 2. Top 5 gaps (Sprint 17)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Site search does not deep-link to catalog** | Retailer parity; product intent stalls on editorial-only results | ✅ `/search/` → `/catalog/?q=` CTA + empty-state fallback |
| 2 | **HelpfulReaction KV aggregates** | Social proof on guides/reviews | ⏳ Owner: deploy worker + `REACTIONS_API_URL` |
| 3 | **Original photography on commercial URLs** | AdSense + experience signal | ⏳ Editorial pipeline |
| 4 | **YouTube `sameAs` on author entity** | Video-rich results | ⏳ Channel claim pending |
| 5 | **CrUX / GSC baselines not filled** | CWV regression detection | ⏳ Owner: PageSpeed export → `crux-template.csv` |

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Catalog href helper | `src/lib/catalog-url.ts` — `catalogHrefFromKeywordQuery()` |
| Catalog match count for search queries | `src/lib/site-search-catalog.ts` |
| Search UI catalog CTA | `src/components/SiteSearch.tsx` |
| Unit tests | `catalog-url.test.ts`, `site-search-catalog.test.ts` |
| E2E regression | `e2e/search-catalog-deeplink-smoke.spec.ts` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 16 deferred list + competitive audit | ✅ |
| 2 | Reuses `filterProductsByKeyword` (same tokens as catalog) | ✅ |
| 3 | `q` round-trips via existing `catalogUrlFromState` | ✅ |
| 4 | CTA only when query ≥2 chars and count > 0 | ✅ |
| 5 | Static export — no new routes | ✅ |
| 6 | Empty editorial results still surface catalog when SKUs match | ✅ |
| 7 | Unit tests: catalog-url, site-search-catalog | ✅ |
| 8 | `npm test` green (324) | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | E2E: search → catalog prefill smoke | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npm run lint
npx playwright test e2e/search-catalog-deeplink-smoke.spec.ts
```

---

## 6. Deferred (Sprint 18+)

- Owner: deploy reactions worker + set `REACTIONS_API_URL` repository secret
- Owner: fill `docs/baselines/crux-template.csv` from PageSpeed Insights
- Original `public/products/` photography on top commercial URLs
- `VideoObject` / YouTube `sameAs` (channel claim)
- Header search form optional “search catalog” split button
