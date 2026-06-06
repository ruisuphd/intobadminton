# Web App Improvement Plan — Sprint 79 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-b723`  
**Baseline:** Sprint 78 — tier-4 review map CI for Bonny Carbon Armour + HWQL golden profiles (PR #226).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 79 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Budget shoe rows link to full review + spec PDP | ✅ Kumpoo G805 + Kawasaki KACE review→catalog golden profiles + e2e |
| **Wirecutter** | Under-$150 guides pair picks with hands-on review exits | ✅ Kumpoo Shura II review→catalog golden profile + e2e |
| **RTINGS** | Review↔SKU map regressions caught in CI | ✅ Review map baseline expanded (+5 tier-4 queries, +1 e2e upgrade) |
| **RacketGuide** | Tier-4 value SKUs show verified distributor photos | ⏳ CN-market image backfill deferred (no Western listing found) |
| **BadmintonCentral** | Budget niche brands have editorial depth | ✅ Bonny Leisu 800 e2e smoke enabled on /best/rackets-under-100/ |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 79)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Tier-4 budget landings lack full review-map CI** | 5 of 7 tier-4 commercial picks unguarded after Sprint 78 | ✅ 5 review-map baseline queries + e2e smoke |
| 2 | **Bonny Leisu 800 lacks e2e smoke** | Budget niche review regression on rackets-under-100 | ✅ e2e enabled on existing golden profile |
| 3 | **Tier-4 Western distributor image backfill stalled** | budget-shoes / lightweight-5u rows show brand fallback | ⏳ 12 CN-market waivers remain; no verified listing found |
| 4 | **HelpfulReaction has no public KV counts** | Social proof on guides/reviews | ⏳ Owner: set `REACTIONS_API_URL` + run wire workflow |
| 5 | **CrUX/GSC baselines unfilled** | CWV regression visibility in CI | ⏳ Owner: export live metrics into `crux-template.csv` / `gsc-template.csv` |

**Deferred (Sprint 80+):** tier-4 Western distributor image hunt; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; raise `TIER4_IMAGE_MIN_VERIFIED` to 2 when second SKU image lands.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Tier-4 review→catalog golden profiles (+5) | `docs/baselines/review-product-map-queries.json` |
| Bonny Leisu 800 e2e smoke | same baseline file (`e2e: true`) |
| E2e smoke for tier-4 mapped reviews | `e2e/review-product-map-baseline-smoke.spec.ts` (auto from baseline) |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

**Golden profiles added:**

| Query id | Review slug | Product id | Landing |
|----------|-------------|------------|---------|
| tier4-kumpoo-g805-shoes | kumpoo-kh-g805-lite-pro-shoes-review | kumpoo-kh-g805-lite-pro | budget-badminton-shoes |
| tier4-kawasaki-kace-shoes | kawasaki-kace-shoes-review | kawasaki-kace | budget-badminton-shoes |
| tier4-kumpoo-shura-2 | kumpoo-shura-2-racket-review | kumpoo-shura-2 | head-heavy-rackets-under-150 |
| tier4-kawasaki-crimson-blade | kawasaki-crimson-blade-racket-review | kawasaki-crimson-blade | lightweight-rackets-5u |
| tier4-victor-thruster-sr | victor-thruster-sr-cherry-blossom-review | vic-thruster-sr | lightweight-rackets-5u, rackets-under-100 |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 78 deferred items + competitive audit | ✅ |
| 2 | kumpoo-kh-g805-lite-pro-shoes-review maps to `kumpoo-kh-g805-lite-pro` (shoes) | ✅ |
| 3 | kawasaki-kace-shoes-review maps to `kawasaki-kace` (shoes) | ✅ |
| 4 | kumpoo-shura-2-racket-review maps to `kumpoo-shura-2` (racket) | ✅ |
| 5 | kawasaki-crimson-blade-racket-review maps to `kawasaki-crimson-blade` (racket) | ✅ |
| 6 | victor-thruster-sr-cherry-blossom-review maps to `vic-thruster-sr` (racket) | ✅ |
| 7 | All new queries require Product+Review JSON-LD | ✅ |
| 8 | Static export — no new API routes on site | ✅ |
| 9 | `lint:review-product-map-baseline` + `npm test` pass | ✅ |
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
| Review map golden-profile queries | +5 (tier-4 budget reviews) |
| Tier-4 reviews with e2e smoke | 7/7 mapped tier-4 commercial picks |
| Commercial landings under image CI | 17/17 (unchanged) |
| Tier-4 budget SKUs with verified images | 1/13 (HWQL; unchanged) |
