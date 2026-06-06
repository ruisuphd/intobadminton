# Web App Improvement Plan — Sprint 80 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-0acb`  
**Baseline:** Sprint 79 — tier-4 review map CI completion for Kumpoo/Kawasaki/Victor SR + Bonny Leisu 800 e2e (PR #227).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 80 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Wide-feet shoe rows link to full review + spec PDP | ✅ Bonny Future Land 3 review→catalog golden profile + e2e |
| **Wirecutter** | Under-$100 guides pair picks with hands-on review exits | ✅ Li-Ning AxForce 10 review→catalog golden profile + e2e |
| **RTINGS** | Review↔SKU map regressions caught in CI | ✅ Review map baseline expanded (+6 tier-4 queries) — 13/13 tier-4 commercial picks guarded |
| **RacketGuide** | Tier-4 value SKUs show verified distributor photos | ⏳ CN-market image backfill deferred (no Western listing found) |
| **BadmintonCentral** | Discontinued SKUs need honest imagery policy | ⏳ Nanoray Light 70i image hunt deferred (no verified Western listing found) |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 80)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **6 tier-4 commercial picks still lack review-map CI** | Li-Ning/Victor/Bonny budget map regressions slip through | ✅ 6 review-map baseline queries + e2e smoke |
| 2 | **Tier-4 Western distributor image backfill stalled** | budget-shoes / lightweight-5u rows show brand fallback | ⏳ 12 CN-market waivers remain; no verified listing found |
| 3 | **Nanoray Light 70i blocks 4 landings** | Discontinued SKU with no official product photo | ⏳ Documented waivers unchanged; image hunt deferred |
| 4 | **HelpfulReaction has no public KV counts** | Social proof on guides/reviews | ⏳ Owner: set `REACTIONS_API_URL` + run wire workflow |
| 5 | **CrUX/GSC baselines unfilled** | CWV regression visibility in CI | ⏳ Owner: export live metrics into `crux-template.csv` / `gsc-template.csv` |

**Deferred (Sprint 81+):** tier-4 Western distributor image hunt; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; raise `TIER4_IMAGE_MIN_VERIFIED` to 2 when second SKU image lands.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Tier-4 review→catalog golden profiles (+6) | `docs/baselines/review-product-map-queries.json` |
| E2e smoke for tier-4 mapped reviews | `e2e/review-product-map-baseline-smoke.spec.ts` (auto from baseline) |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

**Golden profiles added:**

| Query id | Review slug | Product id | Landing |
|----------|-------------|------------|---------|
| tier4-victor-fz-88d-power-purple | victor-fz-88d-power-purple-review | vic-fz-88d-power-purple | head-heavy-rackets-under-150 |
| tier4-bonny-future-land-3-shoes | bonny-future-land-3-polaris-shoes-review | bonny-future-land-3 | wide-feet-badminton-shoes |
| tier4-ln-bladex-arrow | li-ning-bladex-arrow-review | ln-bladex-arrow | lightweight-rackets-5u |
| tier4-ln-axforce-80-jr | li-ning-axforce-80-jr-junior-review | ln-axforce-80-jr | lightweight-rackets-5u |
| tier4-ln-axforce-10 | li-ning-axforce-10-beginner-attack-review | ln-axforce-10 | rackets-under-100 |
| tier4-ln-bladesabre-2-pro-shoes | li-ning-bladesabre-2-pro-shoes-review | ln-bladesabre-2-pro | budget-badminton-shoes |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 79 deferred items + competitive audit | ✅ |
| 2 | victor-fz-88d-power-purple-review maps to `vic-fz-88d-power-purple` (racket) | ✅ |
| 3 | bonny-future-land-3-polaris-shoes-review maps to `bonny-future-land-3` (shoes) | ✅ |
| 4 | li-ning-bladex-arrow-review maps to `ln-bladex-arrow` (racket) | ✅ |
| 5 | li-ning-axforce-80-jr-junior-review maps to `ln-axforce-80-jr` (racket) | ✅ |
| 6 | li-ning-axforce-10-beginner-attack-review maps to `ln-axforce-10` (racket) | ✅ |
| 7 | li-ning-bladesabre-2-pro-shoes-review maps to `ln-bladesabre-2-pro` (shoes) | ✅ |
| 8 | All new queries require Product+Review JSON-LD | ✅ |
| 9 | Static export — no new API routes on site | ✅ |
| 10 | `lint:review-product-map-baseline` + `npm test` pass | ✅ |

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
| Review map golden-profile queries | +6 (remaining tier-4 budget reviews) |
| Tier-4 reviews with e2e smoke | 13/13 mapped tier-4 commercial picks |
| Commercial landings under image CI | 17/17 (unchanged) |
| Tier-4 budget SKUs with verified images | 1/13 (HWQL; unchanged) |
