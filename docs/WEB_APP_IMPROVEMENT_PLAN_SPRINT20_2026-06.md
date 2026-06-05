# Web App Improvement Plan — Sprint 20 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-6d30`  
**Baseline:** Sprint 19 — product-intent search submit (PR #166); blogs drop PR #167 (7 reviews + Anta brand + catalogue rows).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 20 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Brand hubs with model deep-links | ✅ `/brands/anta/` + hub deep links for all dedicated guides |
| **RTINGS** | Review ↔ product PDP wiring | ✅ Sync 7 Jun-4 review→product map entries to runtime JSON |
| **Wirecutter** | Consistent “read full review” on commercial pages | ✅ `editorialReviewHref` restored for new catalogue rows |
| **BadmintonCentral** | Archive discoverability for niche brands | ✅ Anta tier-4 profile + review panel on mapped articles |
| **RacketGuide** | Filter browse after editorial read | ✅ PDP-lite `/product/[id]/` links from enriched reviews |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, 153 first-person reviews.

---

## 2. Top 5 gaps (Sprint 20)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Jun-4 review map written to `scripts/` not `src/data/`** | PDP panels, Product JSON-LD, `editorialReviewHref` broken for 7 reviews | ✅ Sync map + fix ingest paths |
| 2 | **Anta brand in `brands.json` without landing page** | New tier-4 brand dead-ends on hub card | ✅ `/brands/anta/` |
| 3 | **Brands hub omits deep links** | bonny/kawasaki/kumpoo/anta guides hidden | ✅ `DEDICATED_BRAND_PAGES` expanded |
| 4 | **Ingest pipeline regression risk** | Future drops can repeat map drift | ✅ Python scripts point at `src/data/`; stale `scripts/` copy removed |
| 5 | **No regression test for drop slugs** | Silent map drift on content ingest | ✅ `review-pages.test.ts` Jun-4 assertions + e2e Anta smoke |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv`; original `public/products/` photography; YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Runtime review map (7 entries) | `src/data/blog-review-product-map.json` |
| Ingest path fix | `scripts/blog-import-option-b.py`, `scripts/ingest-jun2026-catalog.py` |
| Anta brand landing | `src/app/brands/anta/page.tsx`, `src/lib/editorial-meta.ts` |
| Hub deep links | `src/components/BrandsPage.tsx`, `BrandPage.tsx` slug union |
| Tests | `src/lib/review-pages.test.ts`, `e2e/brands-shelf-smoke.spec.ts` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 19 deferred list + PR #167 integration audit | ✅ |
| 2 | Map entries match `scripts/ingest-jun2026-catalog.py` `REVIEW_LINKS` | ✅ |
| 3 | All 7 product ids exist in `products.json` | ✅ |
| 4 | Anta page uses `reviewPath("anta-ah600w")` not hard-coded stale slug | ✅ |
| 5 | `articleJsonLd` dates via `editorial-meta` for `/brands/anta/` | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | `node scripts/audit-review-product-map.mjs` ≥ 140/153 mapped | ✅ |
| 8 | Unit tests: `review-pages.test.ts` Jun-4 cases | ✅ |
| 9 | `npm test` + `npm run build` + postbuild SEO audit | ✅ |
| 10 | E2e: brands hub Anta link + `/brands/anta/` smoke | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
node scripts/audit-review-product-map.mjs
npx playwright test e2e/brands-shelf-smoke.spec.ts
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Review→product map coverage | ≥ 91% (140/153) |
| Pages per session | 2.5+ |
| Brand hub → dedicated guide CTR | Measurable in GA4 `select_content` |
