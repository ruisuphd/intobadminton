# Web App Improvement Plan — Sprint 9 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-f9f6`  
**Baseline:** Sprint 8 merged (review body search, product map 86%, share results, search/compare e2e).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / response |
|------------|---------------------------|----------------|
| **Tennis Warehouse** | PDP per SKU, sharable compare URLs | ✅ Compare share (Sprint 7); **PDP-lite `/gear/[id]/` (this sprint)** |
| **Wirecutter / RTINGS** | Product schema on every commercial URL | ✅ 86% review map; gear pages for unmapped catalogue rows |
| **RacketGuide** | Filter-first catalog → product detail | ✅ `/catalog/` + gear PDP for 31 unmapped SKUs |
| **BadmintonCentral** | Deep threads per model | ✅ Editorial reviews where mapped; specs PDP otherwise |
| **Brand PDPs** | First-party photography | ⏳ Editorial `public/products/` pipeline |

**Moat:** transparent fit score, claims CI, static export, postbuild SEO gate, finder + compare without signup.

---

## 2. Top 5 gaps (Sprint 9)

| # | Gap | Impact | Sprint 9 |
|---|-----|--------|----------|
| 1 | **No PDP for catalogue rows without blog reviews** | 31 rackets/shoes/shuttles link to brand hub or 404 | ✅ `/gear/[id]/` static pages |
| 2 | **Compare share URL not e2e-verified** | Regression on coach/partner compare sets | ✅ `compare-share-smoke.spec.ts` |
| 3 | **Catalog → compare funnel not e2e-verified** | Retailer-style discovery path untested | ✅ `catalog-compare-smoke.spec.ts` |
| 4 | **HelpfulReaction counts need prod deploy** | Social proof (Wirecutter parity) | ⏳ Worker + `NEXT_PUBLIC_REACTIONS_API_URL` (owner) |
| 5 | **Original photos / video schema** | AdSense experience signal | ⏳ Editorial pipeline |

**Deferred:** GSC/CrUX baseline CSV; YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| PDP-lite pages | `src/app/gear/[id]/page.tsx`, `src/components/GearProductPage.tsx` |
| Product JSON-LD (catalog) | `productCatalogJsonLd()` in `structured-data.ts` |
| Catalog links → gear | `catalogProductHref()` in `review-pages.ts` |
| Sitemap expansion | `DYNAMIC_ROUTE_EXPANSIONS` + gear lastmod in `sitemap.ts` |
| Compare share e2e | `e2e/compare-share-smoke.spec.ts` |
| Catalog compare e2e | `e2e/catalog-compare-smoke.spec.ts` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 8 deferred list + competitive audit | ✅ |
| 2 | Gear pages only for reviewable categories (racket/shoes/shuttle) | ✅ |
| 3 | Mapped products still link to `/review/[slug]/` first | ✅ |
| 4 | Static export — `generateStaticParams` from `reviewSlugs()` | ✅ |
| 5 | Product JSON-LD without fabricated Review body | ✅ |
| 6 | Compare `?p=` hydration matches Sprint 7 results share pattern | ✅ |
| 7 | Sitemap includes expanded `/gear/*/` URLs | ✅ |
| 8 | `npm test` | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | `npm run test:e2e` (after build) | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npm run test:e2e
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| GSC clicks | 4× baseline |
| Lighthouse performance (homepage) | ≥ 0.9 |
| Review→product map coverage | ≥ 85% (maintain) |
