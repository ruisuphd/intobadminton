# Web App Improvement Plan — Sprint 78 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-5a05`  
**Baseline:** Sprint 77 — tier-4 budget image baseline, HWQL catalogue image (PR #225).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 78 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Budget shoe rows link to full review + spec PDP | ✅ Tier-4 Bonny Carbon Armour review→catalog golden profile + e2e |
| **Wirecutter** | Under-$150 guides pair picks with hands-on review exits | ✅ HWQL Thruster review→catalog golden profile + e2e |
| **RTINGS** | Review↔SKU map regressions caught in CI | ✅ Review map baseline expanded (+2 tier-4 queries) |
| **RacketGuide** | Tier-4 value SKUs show verified distributor photos | ⏳ CN-market image backfill deferred (no Western listing found) |
| **YouTube-first reviewers** | Video evidence + `sameAs` author proofs | ⏳ Owner: claim YouTube handle before uncommenting `founderSameAs` |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 78)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Tier-4 budget reviews lack golden-profile CI** | Bonny shoe + HWQL racket map regressions slip through | ✅ 2 review-map baseline queries + e2e smoke |
| 2 | **Tier-4 Western distributor image backfill stalled** | budget-shoes / lightweight-5u rows show brand fallback | ⏳ 11 CN-market waivers remain; no verified Bonny/Kumpoo/Kawasaki listing found |
| 3 | **Nanoray Light 70i blocks 4 landings** | Discontinued SKU with no official product photo | ⏳ Documented waivers unchanged; image hunt deferred |
| 4 | **HelpfulReaction has no public KV counts** | Social proof on guides/reviews | ⏳ Owner: set `REACTIONS_API_URL` + run wire workflow |
| 5 | **CrUX/GSC baselines unfilled** | CWV regression visibility in CI | ⏳ Owner: export live metrics into `crux-template.csv` / `gsc-template.csv` |

**Deferred (Sprint 79+):** tier-4 Western distributor image hunt; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; raise `TIER4_IMAGE_MIN_VERIFIED` to 2 when second SKU image lands.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Tier-4 review→catalog golden profiles (+2) | `docs/baselines/review-product-map-queries.json` |
| E2e smoke for tier-4 mapped reviews | `e2e/review-product-map-baseline-smoke.spec.ts` (auto from baseline) |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 77 deferred items + competitive audit | ✅ |
| 2 | bonny-carbon-armour-shoes-review maps to `bonny-carbon-armour` (shoes) | ✅ |
| 3 | victor-thruster-hwql-nuke-review maps to `vic-thruster-hwql` (racket) | ✅ |
| 4 | Both queries require Product+Review JSON-LD | ✅ |
| 5 | Static export — no new API routes on site | ✅ |
| 6 | `lint:review-product-map-baseline` passes | ✅ |
| 7 | `npm test` passes | ✅ |
| 8 | `npm run build` passes | ✅ |
| 9 | Tier-4 image baseline unchanged (13 SKUs, min verified 1) | ✅ |
| 10 | Master + sprint docs updated | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:review-product-map-baseline
npm run lint:editorial-baselines
npm run build
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Review map golden-profile queries | +2 (tier-4 budget reviews) |
| Tier-4 reviews with e2e smoke | 2/2 |
| Commercial landings under image CI | 17/17 (unchanged) |
| Tier-4 budget SKUs with verified images | 1/13 (HWQL; unchanged) |
