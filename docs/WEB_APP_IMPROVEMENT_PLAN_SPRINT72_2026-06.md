# Web App Improvement Plan — Sprint 72 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-f4be`  
**Baseline:** Sprint 71 — Play-tier catalogue ingest and beginner-rackets full linkage (PR #219).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 72 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Every buying-guide row exits to a filterable SKU PDP | ✅ Strings 6/6 `productId` linkage |
| **Wirecutter** | String guides link to spec-backed product pages | ✅ Aerobite + BG80 Power ingested |
| **RTINGS** | Regression guards on catalogue completeness | ✅ Product integrity tests for new string SKUs |
| **RacketGuide** | Finder ranks hybrid/power strings | ✅ Aerobite + BG80 Power in catalogue with level tags |
| **BadmintonCentral** | Community-trusted deep links to string picks | ✅ `/best/strings/` full finder/PDP exits |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 72)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Aerobite / BG80 Power missing from catalogue** | Strings guide lacks finder/PDP exits on 2/6 picks | ✅ `yy-aerobite`, `yy-bg80-power` ingested |
| 2 | **Strings partial linkage (4/6 wired)** | Commercial intent friction on hybrid/power picks | ✅ 6/6 `productId`; waivers removed |
| 3 | **No integrity guard for string SKU specs** | Spec drift on high-traffic string picks | ✅ `product-data-integrity.test.ts` assertions |
| 4 | **Catalogue image fallback underused on strings** | Duplicate image maintenance when `productId` missing | ✅ Wiring unlocks `resolveBestPickImage` fallback |
| 5 | **Owner/editorial deferrals remain** | Reactions API, L69 image, CrUX/GSC fill | ⏳ Documented; no code change possible this sprint |

**Deferred (Sprint 73+):** owner set `REACTIONS_API_URL` + run wire workflow; fill CrUX/GSC CSV metrics; L69 verified string image; YouTube `sameAs`; `VideoObject` schema.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| String SKU catalogue ingest | `src/data/products.json` |
| Strings full linkage | `src/app/best/strings/page.tsx` |
| Waiver removal | `src/lib/best-product-id-coverage.ts` |
| Tests | `src/lib/product-data-integrity.test.ts`, `src/lib/best-product-id-coverage.test.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 71 deferred items + competitive audit | ✅ |
| 2 | Both new `productId` values resolve in `products.json` | ✅ |
| 3 | Aerobite official source passes `sourceAuthorityForProduct` | ✅ |
| 4 | Strings reaches 6/6 productId (waivers 0) | ✅ |
| 5 | `resolveBestPickImage` can fall back via new wires | ✅ |
| 6 | Static export — no new API routes on site | ✅ |
| 7 | `lint:best-product-id-coverage` passes | ✅ |
| 8 | Editorial baselines chain includes guards | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | New string SKUs score in finder for attack/slice profiles | ✅ |

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
| Catalogue size | 159 products (+2 string SKUs) |
| Strings productId linkage | 6/6 |
| String pick waivers | 0 (removed from guard) |
| Aerobite official verification | `official_verified` via us.yonex.com |
