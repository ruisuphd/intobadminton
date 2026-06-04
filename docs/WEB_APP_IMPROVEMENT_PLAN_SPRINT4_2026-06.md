# Web App Improvement Plan — Sprint 4 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-f8ee` → PR #105  
**Baseline:** Sprint 3 on `main` (PRs #94–#97, #98).

---

## 1. Competitive audit (June 2026)

| Competitor pattern | IntoBadminton (post–Sprint 3) | Sprint 4 response |
|--------------------|-------------------------------|-------------------|
| **Tennis Warehouse browse** | Finder + brand filter on `/results/` | `/catalog/` + spec facets on results |
| **Wirecutter price-band pages** | Editorial `/best/rackets-under-100/` (#98) | `/best/rackets-under-150/` catalogue page |
| **Retailer search facets** | Product kind chips | Brand facet when kind = Products |
| **RacketGuide calculators** | Five `/tools/*` + guide cross-links (#97) | Unchanged — toolkit mature on `main` |
| **Original photography** | Manufacturer images on some picks | Still editorial pipeline (deferred) |

**Moat unchanged:** transparent fit score, postbuild SEO gate, claims CI, static export.

---

## 2. Top 5 gaps (this sprint)

| # | Gap | Impact | Sprint 4 |
|---|-----|--------|----------|
| 1 | **No filter-first product catalog** | Discovery vs Tennis Warehouse | ✅ `/catalog/` with facets |
| 2 | **Results shortlist lacks spec facets** | Post-quiz retention | ✅ price, weight, balance chips |
| 3 | **No $150 budget landing page** | Long-tail SEO | ✅ `/best/rackets-under-150/` |
| 4 | **Product search missing brand facet** | SKU scan speed | ✅ brand chips on Products kind |
| 5 | **Broken product deep-links** | SEO audit failures | ✅ `catalogProductHref()` |

### Deferred (Sprint 5+)

- HelpfulReaction Workers/KV aggregates
- First-party `public/products/` hero photography
- VideoObject + claimed YouTube `sameAs`
- GSC/CrUX baseline CSV capture

---

## 3. Execution summary

1. `src/lib/product-filters.ts` — shared filter state + tests
2. `src/app/catalog/` — browse page with client-side facets
3. `src/app/results/ResultsClient.tsx` — price / weight / balance chips
4. `src/app/best/rackets-under-150/` — programmatic price-band guide
5. `src/lib/review-pages.ts` — `catalogProductHref`, `productHref`
6. `src/components/SiteSearch.tsx` — brand facet for product search

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 3 deferred list + audit | ✅ |
| 2 | Catalog links resolve to existing static routes | ✅ |
| 3 | Results filters preserve scorer rank order | ✅ |
| 4 | Price-band page uses BestPicks schema | ✅ |
| 5 | Static export safe | ✅ |
| 6 | Sitemap includes `/catalog/` + new `/best/*` | ✅ |
| 7 | `product-filters.test.ts` + `site-search.test.ts` | ✅ |
| 8 | Header nav includes Catalog | ✅ |
| 9 | `npm test && npm run lint && npm run build` | ✅ |
| 10 | postbuild SEO audit clean | ✅ |

---

## 5. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| Catalog → quiz conversion | GA4 event (future) |
