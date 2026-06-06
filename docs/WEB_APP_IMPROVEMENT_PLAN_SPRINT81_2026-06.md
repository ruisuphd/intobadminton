# Web App Improvement Plan — Sprint 81 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-5388`  
**Baseline:** Sprint 80 — tier-4 review map CI finalization for all 13 budget commercial picks (PR #228).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 81 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | DriveX and P9200 reviews exit to filtered brand browse with finder panel | ✅ DriveX 10 + P9200 III review-map e2e smoke enabled |
| **Wirecutter** | Concept explainers stay separate from product reviews | ✅ All 13 explainer slugs guarded in review-map CI |
| **RTINGS** | Review↔SKU map regressions caught in CI | ✅ `minExplainerGuards: 13` prevents silent guard shrinkage |
| **BadmintonCentral** | Educational articles never accidentally wired to SKUs | ✅ 12 additional `expectUnmapped` golden profiles |
| **RacketGuide** | Tier-4 value SKUs show verified distributor photos | ⏳ CN-market image backfill deferred (no Western listing found) |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 81)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Only 1/13 explainer slugs in review-map CI** | Accidental product-map wiring on concept articles slips through | ✅ 13/13 explainer `expectUnmapped` golden profiles + `minExplainerGuards` |
| 2 | **DriveX 10 + P9200 lack review-map e2e** | Flagship Victor reviews regress without Playwright smoke | ✅ `e2e: true` on both golden profiles |
| 3 | **Tier-4 Western distributor image backfill stalled** | budget-shoes / lightweight-5u rows show brand fallback | ⏳ 12 CN-market waivers remain; no verified listing found |
| 4 | **Nanoray Light 70i blocks 4 landings** | Discontinued SKU with no official product photo | ⏳ Documented waivers unchanged; image hunt deferred |
| 5 | **HelpfulReaction has no public KV counts** | Social proof on guides/reviews | ⏳ Owner: set `REACTIONS_API_URL` + run wire workflow |

**Deferred (Sprint 82+):** tier-4 Western distributor image hunt; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX/GSC CSV metrics; raise `TIER4_IMAGE_MIN_VERIFIED` to 2 when second SKU image lands.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Explainer slug golden profiles (+12) | `docs/baselines/review-product-map-queries.json` |
| `minExplainerGuards` coverage counter | `src/lib/review-product-map-baseline.ts` |
| DriveX + P9200 e2e smoke | same baseline file (`e2e: true`) |
| Unit tests | `src/lib/review-product-map-baseline.test.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

**Explainer slugs now guarded (13/13):**

| Query id | Slug |
|----------|------|
| explainer-how-to-choose-racket | how-to-choose-a-badminton-racket |
| explainer-racket-balance-vs-swing-speed | racket-balance-vs-swing-speed |
| explainer-how-to-read-reviews | how-to-read-badminton-reviews |
| explainer-beginner-racket-mistakes | beginner-racket-mistakes |
| explainer-badminton-string-selector | badminton-string-selector |
| explainer-badminton-shoe-fit-stability | badminton-shoe-fit-stability |
| explainer-badminton-bag-loadout | badminton-bag-loadout |
| explainer-used-racket-depreciation | used-racket-depreciation |
| explainer-yuan-shaft-hardness | yuan-style-shaft-hardness-explained |
| explainer-badminton-equipment-for-kids | badminton-equipment-for-kids |
| explainer-badminton-glossary | badminton-glossary-terms-every-player-should-know |
| explainer-yonex-grip-sizes | yonex-grip-sizes-explained |
| explainer-stringing-hole-patterns | racket-stringing-hole-patterns-explained |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 80 deferred items + competitive audit | ✅ |
| 2 | All 13 explainer slugs match `explainer-review-slugs.json` | ✅ |
| 3 | No explainer slug has a product-map entry | ✅ |
| 4 | DriveX 10 maps to `vic-drivex-10-metallic` (racket) | ✅ |
| 5 | P9200 III maps to `vic-p9200-iii` (shoes) | ✅ |
| 6 | `minExplainerGuards: 13` enforced in evaluator | ✅ |
| 7 | Static export — no new API routes on site | ✅ |
| 8 | E2e count rises from 16 → 18 mapped review profiles | ✅ |
| 9 | `lint:review-product-map-baseline` + `npm test` pass | ✅ |
| 10 | `npm run build` passes | ✅ |

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
| Explainer slug golden profiles | 13/13 |
| Review-map e2e smoke (mapped reviews) | 18 |
| Tier-4 reviews with e2e smoke | 13/13 (unchanged) |
| Commercial landings under image CI | 17/17 (unchanged) |
