# Web App Improvement Plan — Sprint 89 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-53ad`  
**Baseline:** Sprint 88 — head-light speed Bladex 800 Speed / Auraspeed Fantome review-map e2e + `minMappedE2eGuards: 33` (PR #236).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 89 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Attack-flagship picks exit to spec PDP with finder panel | ✅ AxForce 90 New review-map golden profile + e2e |
| **Wirecutter** | Graduation/intermediate rackets pair with editorial reviews | ✅ Astrox 77 Pro review-map golden profile + e2e |
| **RTINGS** | Review↔SKU map regressions caught in CI | ✅ `minMappedE2eGuards: 35` prevents silent e2e shrinkage |
| **RacketGuide** | Tier-4 value SKUs show verified distributor photos | ⏳ CN-market image backfill deferred (no Western listing found) |
| **BadmintonCentral** | Discontinued SKUs need honest imagery policy | ⏳ Nanoray Light 70i image hunt deferred (no verified Western listing found) |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 89)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **AxForce 90 New lacks review-map e2e** | Li-Ning attack flagship compare-guide wiring unguarded | ✅ `flagship-ln-axforce-90-new` golden profile + e2e |
| 2 | **Astrox 77 Pro lacks review-map e2e** | Graduation racket on beginner/intermediate landings unguarded | ✅ `flagship-yy-astrox-77-pro` golden profile + e2e |
| 3 | **DriveX 8S has no review article** | Victor all-round pick on 4 landings but no editorial slug to map | ⏳ Blocked — no `blog-articles.json` entry; Astrox 77 Pro substituted on overlapping landings |
| 4 | **Nanoray Light 70i blocks 4 landings** | Discontinued SKU with no official product photo | ⏳ e78.us / Badminton Warehouse search found no verified Yonex listing; waivers unchanged |
| 5 | **HelpfulReaction has no public KV counts** | Social proof on guides/reviews | ⏳ Owner: set `REACTIONS_API_URL` + run wire workflow |

**Deferred (Sprint 90+):** tier-4 Western distributor image hunt; Nanoray Light 70i verified image; Thruster Ryuga II + DriveX 8S review ingestion; YouTube `sameAs`; `VideoObject` schema; fill CrUX/GSC CSV metrics; raise `TIER4_IMAGE_MIN_VERIFIED` to 2 when second SKU image lands; Halbertec 7000 II + Arcsaber 7 Tour review-map e2e.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| `minMappedE2eGuards: 35` coverage counter | `docs/baselines/review-product-map-queries.json` |
| AxForce 90 New + Astrox 77 Pro golden profiles | same baseline file |
| Unit tests | `src/lib/review-product-map-baseline.test.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

**Golden profiles added:**

| Query id | Review slug | Product id | Landing |
|----------|-------------|------------|---------|
| flagship-ln-axforce-90-new | li-ning-axforce-90-new-vs-axforce-80-and-yonex-88dp | ln-axforce-90-new | /compare-guides/astrox-88d-pro-vs-axforce-90-new/ |
| flagship-yy-astrox-77-pro | yonex-astrox-77-pro-review | yy-astrox-77-pro | /best/beginner-rackets/, /best/intermediate-rackets/ |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 88 deferred items + competitive audit | ✅ |
| 2 | li-ning-axforce-90-new-vs-axforce-80-and-yonex-88dp maps to `ln-axforce-90-new` (racket) | ✅ |
| 3 | yonex-astrox-77-pro-review maps to `yy-astrox-77-pro` (racket) | ✅ |
| 4 | `minMappedE2eGuards: 35` enforced in evaluator | ✅ |
| 5 | DriveX 8S assessed — no review article in `blog-articles.json` | ✅ blocked |
| 6 | Static export — no new API routes on site | ✅ |
| 7 | E2e count rises from 33 → 35 mapped review profiles | ✅ |
| 8 | All 13 explainer guards unchanged | ✅ |
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
| Mapped review e2e golden profiles | 35 |
| Explainer slug golden profiles | 13/13 (unchanged) |
| Tier-4 reviews with e2e smoke | 13/13 (unchanged) |
| Commercial landings under image CI | 17/17 (unchanged) |
