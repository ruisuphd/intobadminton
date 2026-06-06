# Web App Improvement Plan — Sprint 70 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-2b0c`  
**Baseline:** Sprint 69 — Li-Ning shoe imagery, catalog image fallback, image coverage CI (PR #217).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 70 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Every buying-guide row links to a filterable SKU page | ✅ `productId` backfill on 10 `/best/*` landings |
| **Wirecutter** | Persistent product context from guide → catalogue → PDP | ✅ 22 new pick→SKU wires; `resolveBestPickImage` fallback enabled |
| **RTINGS** | Regression guards on commercial completeness | ✅ `lint:best-product-id-coverage` in CI + editorial baselines |
| **RacketGuide** | Finder fit column needs catalogue linkage | ✅ Smash/intermediate/singles landings now 6/6 wired |
| **BadmintonCentral** | Community-trusted deep links to gear pages | ⏳ Play-tier SKUs (77 Play, NF700 Play) await catalogue ingest |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 70)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Partial `productId` wiring on commercial `/best/*`** | Finder/PDP exit friction on 40%+ of picks | ✅ 22 new `productId` links across 10 landings |
| 2 | **No CI guard for catalogue pick linkage** | Linkage regressions slip through post-Sprint 69 | ✅ `best-product-id-coverage` + CI step |
| 3 | **Catalog image fallback underused** | Duplicate image maintenance when `productId` missing | ✅ Wiring unlocks `resolveBestPickImage` for more rows |
| 4 | **Smash/intermediate landings under-linked** | Commercial intent pages lack full finder exits | ✅ 6/6 on smash-heavy, intermediate, singles, lightweight |
| 5 | **Owner/editorial deferrals remain** | Reactions API, L69 image, CrUX/GSC fill | ⏳ Documented; no code change possible this sprint |

**Deferred (Sprint 71+):** owner set `REACTIONS_API_URL` + run wire workflow; fill CrUX/GSC CSV metrics; L69 verified string image; YouTube `sameAs`; ingest Play-tier catalogue SKUs.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| productId backfill | `src/app/best/{strings,shoes,beginner-rackets,doubles-rackets,smash-heavy-rackets,intermediate-rackets,singles-rackets,lightweight-rackets-5u,rackets-for-shoulder-comfort}/page.tsx` |
| productId coverage guard | `src/lib/best-product-id-coverage.ts`, `scripts/best-product-id-coverage.mjs` |
| CI + editorial baselines | `.github/workflows/ci.yml`, `scripts/editorial-baselines.mjs`, `package.json` |
| Tests | `src/lib/best-product-id-coverage.test.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 69 deferred items + competitive audit | ✅ |
| 2 | All new `productId` values resolve in `products.json` | ✅ |
| 3 | Waiver-adjusted thresholds for strings (4/6) and beginner (4/6) | ✅ |
| 4 | Shoes, doubles, smash-heavy reach 6/6 productId | ✅ |
| 5 | `resolveBestPickImage` can fall back via new wires | ✅ |
| 6 | Static export — no new API routes on site | ✅ |
| 7 | `lint:best-product-id-coverage` wired in CI | ✅ |
| 8 | Editorial baselines chain includes new guard | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | `npm run lint:best-product-id-coverage` + `npm run lint:editorial-baselines` | ✅ |

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
| Commercial productId linkage | 6/6 on guarded landings (waiver-adjusted where no SKU) |
| New pick→SKU wires | 22 across 10 `/best/*` pages |
| Linkage regression guard | CI fails if productId count drops below waiver-adjusted threshold |
