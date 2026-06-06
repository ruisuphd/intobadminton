# Web App Improvement Plan — Sprint 86 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-fbba`  
**Baseline:** Sprint 85 — Victor/Li-Ning flagship Auraspeed HS Plus / Halbertec 9000 Power review-map e2e + `minMappedE2eGuards: 27` (PR #233).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 86 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Victor/Li-Ning singles attack picks exit to spec PDP with finder panel | ✅ Auraspeed 90K II + AxForce 100 Gen 2 review-map golden profiles + e2e |
| **Wirecutter** | Non-Yonex flagship reviews pair with commercial landings | ✅ Victor defensive/intermediate + Li-Ning singles attack wiring guarded |
| **RTINGS** | Review↔SKU map regressions caught in CI | ✅ `minMappedE2eGuards: 29` prevents silent e2e shrinkage |
| **RacketGuide** | Tier-4 value SKUs show verified distributor photos | ⏳ CN-market image backfill deferred (no Western listing found) |
| **BadmintonCentral** | Discontinued SKUs need honest imagery policy | ⏳ Nanoray Light 70i image hunt deferred (no verified Western listing found) |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 86)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Auraspeed 90K II lacks review-map e2e** | Victor flagship speed/doubles review wiring unguarded | ✅ `flagship-vic-auraspeed-90k-ii` golden profile + e2e |
| 2 | **AxForce 100 Gen 2 lacks review-map e2e** | Li-Ning flagship attack review regressions slip through | ✅ `flagship-ln-axforce-100-gen-2` golden profile + e2e |
| 3 | **Nanoray Light 70i blocks 4 landings** | Discontinued SKU with no official product photo | ⏳ e78.us / Badminton Warehouse search found no verified Yonex listing; waivers unchanged |
| 4 | **HelpfulReaction has no public KV counts** | Social proof on guides/reviews | ⏳ Owner: set `REACTIONS_API_URL` + run wire workflow |
| 5 | **Tier-4 CN-market product images** | Budget SKUs show brand fallback | ⏳ Western distributor backfill deferred |

**Deferred (Sprint 87+):** tier-4 Western distributor image hunt; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX/GSC CSV metrics; raise `TIER4_IMAGE_MIN_VERIFIED` to 2 when second SKU image lands; Jetspeed 12 + Halbertec 8000 flagship e2e.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| `minMappedE2eGuards: 29` coverage counter | `docs/baselines/review-product-map-queries.json` |
| Auraspeed 90K II + AxForce 100 Gen 2 golden profiles | same baseline file |
| Unit tests | `src/lib/review-product-map-baseline.test.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

**Golden profiles added:**

| Query id | Review slug | Product id | Landing |
|----------|-------------|------------|---------|
| flagship-vic-auraspeed-90k-ii | victor-auraspeed-90k-ii-review | vic-auraspeed-90k-ii | /best/defensive-rackets/, /best/intermediate-rackets/, /best/singles-rackets/ |
| flagship-ln-axforce-100-gen-2 | li-ning-axforce-100-gen-2-vs-100zz-vs-90-new | ln-axforce-100-gen-2 | /best/singles-rackets/, /compare-guides/halbertec-9000-power-vs-axforce-100-gen-2/ |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 85 deferred items + competitive audit | ✅ |
| 2 | victor-auraspeed-90k-ii-review maps to `vic-auraspeed-90k-ii` (racket) | ✅ |
| 3 | li-ning-axforce-100-gen-2-vs-100zz-vs-90-new maps to `ln-axforce-100-gen-2` (racket) | ✅ |
| 4 | `minMappedE2eGuards: 29` enforced in evaluator | ✅ |
| 5 | Nanoray Light 70i image hunt attempted (e78.us, Badminton Warehouse) | ✅ no verified listing |
| 6 | Static export — no new API routes on site | ✅ |
| 7 | E2e count rises from 27 → 29 mapped review profiles | ✅ |
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
| Mapped review e2e golden profiles | 29 |
| Explainer slug golden profiles | 13/13 (unchanged) |
| Tier-4 reviews with e2e smoke | 13/13 (unchanged) |
| Commercial landings under image CI | 17/17 (unchanged) |
