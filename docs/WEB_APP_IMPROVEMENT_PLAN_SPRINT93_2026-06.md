# Web App Improvement Plan — Sprint 93 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-86a6`  
**Baseline:** Sprint 92 — shoes commercial Comfort Z3 / Eclipsion Z3 / Bladesabre MAX review-map e2e + `minMappedE2eGuards: 42` (PR #240).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 93 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Budget shoe picks exit to spec PDP with finder panel | ✅ Grpht Thrttl + Subaxia GT review-map golden profiles + e2e |
| **Wirecutter** | Wide-feet landing pairs every mapped pick with editorial review | ✅ P8500 II + Blast FF 3 review-map golden profiles + e2e |
| **RTINGS** | Review↔SKU map regressions caught in CI | ✅ `minMappedE2eGuards: 46` prevents silent e2e shrinkage |
| **RacketGuide** | Tier-4 value SKUs show verified distributor photos | ⏳ CN-market image backfill deferred (no Western listing found) |
| **BadmintonCentral** | Discontinued SKUs need honest imagery policy | ⏳ Nanoray Light 70i image hunt deferred (no verified Western listing found) |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 93)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Grpht Thrttl lacks review-map e2e** | Value Yonex pick on `/best/budget-badminton-shoes/` unguarded | ✅ `commercial-yy-grpht-thrttl` golden profile + e2e |
| 2 | **Subaxia GT lacks review-map e2e** | Step-up stability pick on `/best/budget-badminton-shoes/` unguarded | ✅ `commercial-yy-subaxia-gt` golden profile + e2e |
| 3 | **P8500 II lacks review-map e2e** | Heavy-player wide pick on `/best/wide-feet-badminton-shoes/` unguarded | ✅ `commercial-vic-p8500-ii` golden profile + e2e |
| 4 | **Blast FF 3 lacks review-map e2e** | Indoor wide crossover on `/best/wide-feet-badminton-shoes/` unguarded | ✅ `commercial-asics-blast-ff-3` golden profile + e2e |
| 5 | **L69 string lacks review-map e2e** | Sole mapped pick on `/best/strings/` but string category excluded from `reviewProductById` | ⏳ Blocked — baseline lookup uses shoe/racket/shuttle only |

**Deferred (Sprint 94+):** L69 string e2e (extend reviewProductById or alternate lookup); tier-4 Western distributor image hunt; Nanoray Light 70i verified image; Thruster Ryuga II + DriveX 8S review ingestion; YouTube `sameAs`; `VideoObject` schema; fill CrUX/GSC CSV metrics; raise `TIER4_IMAGE_MIN_VERIFIED` to 2 when second SKU image lands; HelpfulReaction owner secret + wire workflow.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| `minMappedE2eGuards: 46` coverage counter | `docs/baselines/review-product-map-queries.json` |
| Grpht Thrttl + Subaxia GT + P8500 II + Blast FF 3 golden profiles | same baseline file |
| Unit tests | `src/lib/review-product-map-baseline.test.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

**Golden profiles added:**

| Query id | Review slug | Product id | Landing |
|----------|-------------|------------|---------|
| commercial-yy-grpht-thrttl | yonex-grpht-thrttl-training-shoe-review | yy-grpht-thrttl | /best/budget-badminton-shoes/ |
| commercial-yy-subaxia-gt | yonex-subaxia-gt-shoes-review | yy-subaxia-gt | /best/budget-badminton-shoes/ |
| commercial-vic-p8500-ii | victor-p8500-ii-shoes-review | vic-p8500-ii | /best/wide-feet-badminton-shoes/ |
| commercial-asics-blast-ff-3 | asics-blast-ff-3-badminton-shoes-review | asics-blast-ff-3 | /best/wide-feet-badminton-shoes/ |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 92 deferred items + competitive audit | ✅ |
| 2 | yonex-grpht-thrttl-training-shoe-review maps to `yy-grpht-thrttl` (shoes) | ✅ |
| 3 | yonex-subaxia-gt-shoes-review maps to `yy-subaxia-gt` (shoes) | ✅ |
| 4 | victor-p8500-ii-shoes-review maps to `vic-p8500-ii` (shoes) | ✅ |
| 5 | asics-blast-ff-3-badminton-shoes-review maps to `asics-blast-ff-3` (shoes) | ✅ |
| 6 | `minMappedE2eGuards: 46` enforced in evaluator | ✅ |
| 7 | L69 string assessed — `reviewProductById` excludes string category | ✅ blocked |
| 8 | Static export — no new API routes on site | ✅ |
| 9 | E2e count rises from 42 → 46 mapped review profiles | ✅ |
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
| Mapped review e2e golden profiles | 46 |
| Explainer slug golden profiles | 13/13 (unchanged) |
| Tier-4 reviews with e2e smoke | 13/13 (unchanged) |
| Commercial landings under image CI | 17/17 (unchanged) |
