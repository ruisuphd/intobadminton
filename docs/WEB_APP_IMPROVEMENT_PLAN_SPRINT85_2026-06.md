# Web App Improvement Plan — Sprint 85 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-3c62`  
**Baseline:** Sprint 84 — flagship Astrox 88S Pro / Nanoflare 800 Pro review-map e2e + `minMappedE2eGuards: 25` (PR #232).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 85 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Victor/Li-Ning flagship picks exit to spec PDP with finder panel | ✅ Auraspeed HS Plus + Halbertec 9000 Power review-map golden profiles + e2e |
| **Wirecutter** | Non-Yonex flagship reviews pair with commercial landings | ✅ Victor doubles + Li-Ning smash/singles wiring guarded |
| **RTINGS** | Review↔SKU map regressions caught in CI | ✅ `minMappedE2eGuards: 27` prevents silent e2e shrinkage |
| **RacketGuide** | Tier-4 value SKUs show verified distributor photos | ⏳ CN-market image backfill deferred (no Western listing found) |
| **BadmintonCentral** | Discontinued SKUs need honest imagery policy | ⏳ Nanoray Light 70i image hunt deferred (no verified Western listing found) |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 85)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Auraspeed HS Plus lacks review-map e2e** | Victor flagship doubles review wiring unguarded | ✅ `flagship-vic-auraspeed-hs-plus` golden profile + e2e |
| 2 | **Halbertec 9000 Power lacks review-map e2e** | Li-Ning flagship attack review regressions slip through | ✅ `flagship-ln-halbertec-9000-power` golden profile + e2e |
| 3 | **Nanoray Light 70i blocks 4 landings** | Discontinued SKU with no official product photo | ⏳ e78.us / Badminton Warehouse search found no verified Yonex listing; waivers unchanged |
| 4 | **HelpfulReaction has no public KV counts** | Social proof on guides/reviews | ⏳ Owner: set `REACTIONS_API_URL` + run wire workflow |
| 5 | **Tier-4 CN-market product images** | Budget SKUs show brand fallback | ⏳ Western distributor backfill deferred |

**Deferred (Sprint 86+):** tier-4 Western distributor image hunt; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX/GSC CSV metrics; raise `TIER4_IMAGE_MIN_VERIFIED` to 2 when second SKU image lands; AxForce 100 Gen 2 + Auraspeed 90K II flagship e2e.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| `minMappedE2eGuards: 27` coverage counter | `docs/baselines/review-product-map-queries.json` |
| Auraspeed HS Plus + Halbertec 9000 Power golden profiles | same baseline file |
| Unit tests | `src/lib/review-product-map-baseline.test.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

**Golden profiles added:**

| Query id | Review slug | Product id | Landing |
|----------|-------------|------------|---------|
| flagship-vic-auraspeed-hs-plus | victor-auraspeed-hs-plus-deep-dive | vic-auraspeed-hs-plus | /best/doubles-rackets/, /best/head-light-rackets/ |
| flagship-ln-halbertec-9000-power | li-ning-halbertec-9000-power-deep-dive | ln-halbertec-9000-power | /best/smash-heavy-rackets/, /best/singles-rackets/ |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 84 deferred items + competitive audit | ✅ |
| 2 | victor-auraspeed-hs-plus-deep-dive maps to `vic-auraspeed-hs-plus` (racket) | ✅ |
| 3 | li-ning-halbertec-9000-power-deep-dive maps to `ln-halbertec-9000-power` (racket) | ✅ |
| 4 | `minMappedE2eGuards: 27` enforced in evaluator | ✅ |
| 5 | Nanoray Light 70i image hunt attempted (e78.us, Badminton Warehouse) | ✅ no verified listing |
| 6 | Static export — no new API routes on site | ✅ |
| 7 | E2e count rises from 25 → 27 mapped review profiles | ✅ |
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
| Mapped review e2e golden profiles | 27 |
| Explainer slug golden profiles | 13/13 (unchanged) |
| Tier-4 reviews with e2e smoke | 13/13 (unchanged) |
| Commercial landings under image CI | 17/17 (unchanged) |
