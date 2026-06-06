# Web App Improvement Plan — Sprint 77 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-5491`  
**Baseline:** Sprint 76 — full commercial image CI (17/17), Voltric 8DG + ASICS Blast FF 3 images (PR #224).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 77 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Budget/specialty rows show distributor photography | ✅ HWQL verified image; tier-4 budget SKU guard added |
| **Wirecutter** | Under-$150 guides show spec-backed photos on every row | ✅ head-heavy-under-150 waiver tightened (3→2) |
| **RTINGS** | Regression guards on imagery completeness | ✅ `lint:tier4-image-baseline` on 13 budget SKUs |
| **RacketGuide** | Tier-4 value shoes/rackets have spec-backed photos | ⏳ 12 CN-market waivers documented; Western backfill deferred |
| **BadmintonCentral** | Honest policy for discontinued / CN-only SKUs | ✅ Thruster SR + tier-4 waivers documented (no wrong-product fallback) |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 77)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Tier-4 budget SKUs lack verified catalogue photos** | Budget landings show brand fallback on Bonny/Kumpoo/Kawasaki rows | ✅ HWQL image; tier-4 baseline guard on 13 SKUs |
| 2 | **No CI guard on tier-4 budget landing SKUs** | CN-market regressions slip through image CI waiver counts | ✅ `tier4-image-baseline.ts` + editorial baselines chain |
| 3 | **head-heavy-under-150 at minimum waiver threshold** | 3/6 verified with 3 waivers — no headroom | ✅ HWQL backfill; waivers 3→2 |
| 4 | **CN-market SKUs lack Western distributor listings** | Bladesabre, Bladex Arrow, AxForce 10, tier-4 shoes blocked | ⏳ 12 documented waivers; backfill deferred |
| 5 | **Owner/editorial deferrals remain** | Reactions API, CrUX/GSC fill, YouTube `sameAs` | ⏳ Documented; no code change possible this sprint |

**Deferred (Sprint 78+):** owner set `REACTIONS_API_URL` + run wire workflow; fill CrUX/GSC CSV metrics; YouTube `sameAs`; `VideoObject` schema; Nanoray Light 70i official/retailer image hunt; tier-4 Western distributor image hunt (Bonny, Kumpoo, Kawasaki, Li-Ning entry tier).

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Catalogue image backfill (+1 SKU) | `src/data/products.json` |
| Tier-4 budget image baseline guard | `src/lib/tier4-image-baseline.ts` |
| head-heavy-under-150 waiver tighten | `src/lib/best-image-coverage.ts` |
| Tests | `src/lib/tier4-image-baseline.test.ts`, `src/lib/best-image-coverage.test.ts` |
| Editorial baselines chain | `scripts/editorial-baselines.mjs`, `scripts/tier4-image-baseline.mjs` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 76 deferred items + competitive audit | ✅ |
| 2 | HWQL image matches correct SKU (e78.us TK-HMRL U listing) | ✅ |
| 3 | No wrong-product fallback (TK-7 / TK-66 images rejected) | ✅ |
| 4 | head-heavy-under-150 reaches 4/6 with 2 documented waivers | ✅ |
| 5 | Static export — no new API routes on site | ✅ |
| 6 | `lint:best-image-coverage` passes | ✅ |
| 7 | `lint:tier4-image-baseline` passes | ✅ |
| 8 | `npm test` + `npm run build` | ✅ |
| 9 | Tier-4 budget SKUs under baseline guard: 13/13 tracked | ✅ |
| 10 | Master + sprint docs updated | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:best-image-coverage
npm run lint:tier4-image-baseline
npm run lint:editorial-baselines
npm run build
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Tier-4 budget SKUs tracked in CI | 13/13 |
| Tier-4 budget SKUs with verified images | ≥1 (HWQL) |
| head-heavy-under-150 verified imagery | 4/6 (waivers 2) |
| Documented tier-4 image waivers | 12 entries |
| Commercial landings under image CI | 17/17 (unchanged) |
