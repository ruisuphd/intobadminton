# Web App Improvement Plan — Sprint 71 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-f60e`  
**Baseline:** Sprint 70 — best-of `productId` backfill and coverage CI (PR #218).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 71 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Every buying-guide row exits to a filterable SKU PDP | ✅ Play-tier ingest closes last beginner-rackets waiver gap |
| **Wirecutter** | Beginner guides link to spec-backed product pages | ✅ 6/6 `productId` on `/best/beginner-rackets/` |
| **RTINGS** | Regression guards on catalogue completeness | ✅ Product integrity tests for new Play SKUs |
| **BadmintonCentral** | Community-trusted deep links to entry gear | ✅ Yonex brand hub top pick → PDP |
| **RacketGuide** | Finder ranks beginner Play frames | ✅ Play SKUs in catalogue with recreational level tags |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 71)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Play-tier SKUs missing from catalogue** | Beginner picks lack finder/PDP exits | ✅ `yy-nanoflare-700-play`, `yy-astrox-77-play` ingested |
| 2 | **Beginner-rackets partial linkage (4/6 wired)** | Commercial intent friction on top picks | ✅ 6/6 `productId`; waivers removed |
| 3 | **Brand hub Play pick links to listicle only** | Missed PDP discovery from Yonex hub | ✅ NF700 Play → `/product/yy-nanoflare-700-play/` |
| 4 | **No integrity guard for Play-tier specs** | Spec drift on high-traffic beginner SKUs | ✅ `product-data-integrity.test.ts` assertions |
| 5 | **Owner/editorial deferrals remain** | Reactions API, L69 image, CrUX/GSC fill | ⏳ Documented; no code change possible this sprint |

**Deferred (Sprint 72+):** owner set `REACTIONS_API_URL` + run wire workflow; fill CrUX/GSC CSV metrics; L69 verified string image; YouTube `sameAs`; Aerobite/BG80 Power string SKU ingest.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Play-tier catalogue ingest | `src/data/products.json` |
| Beginner-rackets full linkage | `src/app/best/beginner-rackets/page.tsx` |
| Waiver removal | `src/lib/best-product-id-coverage.ts` |
| Brand hub PDP exit | `src/app/brands/yonex/page.tsx` |
| Tests | `src/lib/product-data-integrity.test.ts`, `src/lib/best-product-id-coverage.test.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 70 deferred items + competitive audit | ✅ |
| 2 | Both new `productId` values resolve in `products.json` | ✅ |
| 3 | Official source URLs pass `sourceAuthorityForProduct` | ✅ |
| 4 | Beginner-rackets reaches 6/6 productId (waivers 0) | ✅ |
| 5 | `resolveBestPickImage` can fall back via new wires | ✅ |
| 6 | Static export — no new API routes on site | ✅ |
| 7 | `lint:best-product-id-coverage` passes | ✅ |
| 8 | Editorial baselines chain includes guards | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | Play SKUs score well for recreational beginner profile | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:best-product-id-coverage
npm run lint:editorial-baselines
npm run build
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Catalogue size | 157 products (+2 Play-tier rackets) |
| Beginner-rackets productId linkage | 6/6 |
| Play-tier waivers | 0 (removed from guard) |
| Brand hub Play pick PDP exit | 1 wired |
