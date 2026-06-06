# Web App Improvement Plan — Sprint 92 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-a389`  
**Baseline:** Sprint 91 — intermediate/control Victor Yu 12 / Halbertec 9000 review-map e2e + `minMappedE2eGuards: 39` (PR #239).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 92 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Shoe picks exit to spec PDP with finder panel | ✅ Comfort Z3 + Eclipsion Z3 review-map golden profiles + e2e |
| **Wirecutter** | Main `/best/shoes/` landing pairs every mapped pick with editorial review | ✅ Bladesabre MAX review-map golden profile + e2e |
| **RTINGS** | Review↔SKU map regressions caught in CI | ✅ `minMappedE2eGuards: 42` prevents silent e2e shrinkage |
| **RacketGuide** | Tier-4 value SKUs show verified distributor photos | ⏳ CN-market image backfill deferred (no Western listing found) |
| **BadmintonCentral** | Discontinued SKUs need honest imagery policy | ⏳ Nanoray Light 70i image hunt deferred (no verified Western listing found) |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 92)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Comfort Z3 lacks review-map e2e** | Joint-comfort pick on `/best/shoes/` unguarded | ✅ `commercial-yy-comfort-z3` golden profile + e2e |
| 2 | **Eclipsion Z3 lacks review-map e2e** | Max-stability pick on `/best/shoes/` unguarded | ✅ `commercial-yy-eclipsion-z3` golden profile + e2e |
| 3 | **Bladesabre MAX lacks review-map e2e** | Value pick on `/best/shoes/` unguarded | ✅ `commercial-ln-bladesabre-max` golden profile + e2e |
| 4 | **DriveX 8S has no review article** | Victor all-round pick on 4 landings but no editorial slug to map | ⏳ Blocked — no `blog-articles.json` entry |
| 5 | **Nanoray Light 70i blocks 4 landings** | Discontinued SKU with no verified product photo | ⏳ e78.us / Badminton Warehouse search found no verified Yonex listing; waivers unchanged |

**Deferred (Sprint 93+):** tier-4 Western distributor image hunt; Nanoray Light 70i verified image; Thruster Ryuga II + DriveX 8S review ingestion; YouTube `sameAs`; `VideoObject` schema; fill CrUX/GSC CSV metrics; raise `TIER4_IMAGE_MIN_VERIFIED` to 2 when second SKU image lands; HelpfulReaction owner secret + wire workflow.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| `minMappedE2eGuards: 42` coverage counter | `docs/baselines/review-product-map-queries.json` |
| Comfort Z3 + Eclipsion Z3 + Bladesabre MAX golden profiles | same baseline file |
| Unit tests | `src/lib/review-product-map-baseline.test.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

**Golden profiles added:**

| Query id | Review slug | Product id | Landing |
|----------|-------------|------------|---------|
| commercial-yy-comfort-z3 | yonex-comfort-z3-shoes-review | yy-comfort-z3 | /best/shoes/ |
| commercial-yy-eclipsion-z3 | yonex-eclipsion-z3-shoes-review | yy-eclipsion-z3 | /best/shoes/ |
| commercial-ln-bladesabre-max | li-ning-bladesabre-max-shoes-review | ln-bladesabre-max | /best/shoes/ |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 91 deferred items + competitive audit | ✅ |
| 2 | yonex-comfort-z3-shoes-review maps to `yy-comfort-z3` (shoes) | ✅ |
| 3 | yonex-eclipsion-z3-shoes-review maps to `yy-eclipsion-z3` (shoes) | ✅ |
| 4 | li-ning-bladesabre-max-shoes-review maps to `ln-bladesabre-max` (shoes) | ✅ |
| 5 | `minMappedE2eGuards: 42` enforced in evaluator | ✅ |
| 6 | DriveX 8S assessed — no review article in `blog-articles.json` | ✅ blocked |
| 7 | Static export — no new API routes on site | ✅ |
| 8 | E2e count rises from 39 → 42 mapped review profiles | ✅ |
| 9 | All 13 explainer guards unchanged | ✅ |
| 10 | `lint:review-product-map-baseline` + `npm test` + `npm run build` pass | ✅ |

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
| Mapped review e2e golden profiles | 42 |
| Explainer slug golden profiles | 13/13 (unchanged) |
| Tier-4 reviews with e2e smoke | 13/13 (unchanged) |
| Commercial landings under image CI | 17/17 (unchanged) |
