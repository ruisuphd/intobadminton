# Web App Improvement Plan — Sprint 4 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-f8ee`  
**Baseline:** Sprint 3 in [`WEB_APP_IMPROVEMENT_PLAN_SPRINT3_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT3_2026-06.md).

---

## 1. Competitive audit (fresh pass)

| Competitor pattern | IntoBadminton (post–Sprint 3) | Remaining gap |
|--------------------|-------------------------------|---------------|
| **Tennis Warehouse / retailer finders** | Finder + brand filter on `/results/` | No spec facets (weight, balance, price) or browse-all catalog |
| **Wirecutter / RTINGS price-band pages** | Curated `/best/*` guides | No programmatic budget landing pages (`under $100`) |
| **BadmintonCentral gear lists** | 148-product JSON catalogue | No dedicated filter-first browse surface |
| **Amazon / retailer search facets** | Search kind chips + product index | Product search lacks brand facet when filtering products |
| **Original photography / video** | Manufacturer images on some picks | Still editorial pipeline (deferred) |

**Moat unchanged:** transparent fit score, postbuild SEO gate, claims CI, static export.

---

## 2. Top 5 gaps (this sprint)

| # | Gap | Impact | Sprint 4 |
|---|-----|--------|----------|
| 1 | **No filter-first product catalog** | Discovery vs Tennis Warehouse browse | ✅ `/catalog/` with category/brand/price/weight/balance chips |
| 2 | **Results shortlist lacks spec facets** | Retention after quiz — brand-only filter | ✅ price, weight, balance chips on `/results/` |
| 3 | **No budget landing pages** | Long-tail SEO (`rackets under $100`) | ✅ `/best/rackets-under-100/` + `/best/rackets-under-150/` |
| 4 | **Product search missing brand facet** | Scan speed when searching SKUs | ✅ brand chips when kind = Products |
| 5 | **Shared filter logic duplicated** | Maintainability + test coverage | ✅ `src/lib/product-filters.ts` + unit tests |

### Deferred (Sprint 5+)

- Original `public/products/` hero photography pipeline
- HelpfulReaction Workers/KV aggregate counts
- VideoObject + claimed YouTube `sameAs`
- Chinese locale content (`/zh/`)
- GSC/CrUX baseline CSV capture

---

## 3. Execution summary

1. `src/lib/product-filters.ts` — shared filter state, price bands, catalog helpers.
2. `src/app/catalog/` — static catalog browse page with client-side facets.
3. `src/app/results/ResultsClient.tsx` — price / weight / balance filter chips.
4. `src/app/best/rackets-under-{100,150}/` — programmatic price-band guides via `price-band-best.ts`.
5. `src/components/SiteSearch.tsx` — brand facet when Products kind selected.
6. Nav + search index + best hub links for new routes.

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 3 deferred list + competitive audit | ✅ |
| 2 | Catalog links resolve via `reviewPath()` | ✅ |
| 3 | Results filters preserve scorer rank order (filter only, no re-sort) | ✅ |
| 4 | Price-band pages emit same BestPicks schema as other `/best/*` | ✅ |
| 5 | Static export safe — no API routes, client-only filters | ✅ |
| 6 | Sitemap auto-discovers `/catalog/` and new `/best/*` routes | ✅ |
| 7 | `product-filters.test.ts` + existing `site-search.test.ts` pass | ✅ |
| 8 | Header nav includes Catalog without crowding mobile menu | ✅ |
| 9 | `npm test && npm run build` | ✅ |
| 10 | postbuild SEO audit clean | ✅ |

---

## 5. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| Catalog → quiz conversion | Track via GA4 `catalog_view` (future) |
| Budget landing impressions | GSC cluster growth Q3 2026 |
