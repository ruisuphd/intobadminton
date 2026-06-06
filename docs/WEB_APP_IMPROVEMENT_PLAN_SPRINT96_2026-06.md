# Web App Improvement Plan — Sprint 96 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-ef5e`  
**Baseline:** Sprint 95 — smash + shuttle commercial review-map e2e + `PRODUCT_REVIEW_ALIASES` for P9200 / 65 Z Wide / 77 Play + `minMappedE2eGuards: 56` (PR #243).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 96 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Every ranked pick exits to hands-on editorial review | ✅ Five new `PRODUCT_REVIEW_ALIASES` for unmapped commercial SKUs |
| **Wirecutter** | Budget attack picks link to nearest reviewed sibling | ✅ Astrox 100 Game → Nextage editorial href |
| **RTINGS** | Shoe line siblings share review depth | ✅ Aerus Z2 → Eclipsion Z3 sibling alias |
| **Tennis Warehouse** | Victor all-round picks pair with editorial depth | ✅ DriveX 8S → DriveX 10 + Brave Sword 12 → Jetspeed 12 |
| **RacketGuide** | Hybrid attack frames show review exit | ✅ Auraspeed 100X SE → 90K II sibling alias |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 96)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **DriveX 8S lacks editorial href** | Four commercial landings (beginner, all-round, doubles, shoulder-comfort) had no review exit | ✅ Alias to `vic-drivex-10-metallic` + e2e on `/best/beginner-rackets/` |
| 2 | **Astrox 100 Game lacks editorial href** | Head-heavy-under-150 rank 1 had no review exit | ✅ Alias to `yy-astrox-nextage` + e2e |
| 3 | **Aerus Z2 lacks editorial href** | `/best/shoes/` rank 2 had no review exit | ✅ Alias to `yy-eclipsion-z3` + e2e |
| 4 | **Brave Sword 12 lacks editorial href** | `/best/all-round-rackets/` and `/best/control-rackets/` had no review exit | ✅ Alias to `vic-jetspeed-12` + e2e |
| 5 | **Auraspeed 100X SE lacks editorial href** | `/best/smash-heavy-rackets/` rank 5 had no review exit | ✅ Alias to `vic-auraspeed-90k-ii` + e2e |

**Deferred (Sprint 97+):** tier-4 Western distributor image hunt; Nanoray Light 70i verified image; Thruster Ryuga II + DriveX 8S dedicated review ingestion; Voltric 8DG editorial map; YouTube `sameAs`; `VideoObject` schema; fill CrUX/GSC CSV metrics; HelpfulReaction owner secret + wire workflow.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Five new `PRODUCT_REVIEW_ALIASES` | `src/lib/review-pages.ts`, `src/lib/review-pages.test.ts` |
| Commercial alias e2e smoke (5 landings) | `e2e/review-consolidation.spec.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

**Alias pairs added:**

| Product id | Resolves to | Editorial slug | Landing |
|------------|-------------|----------------|---------|
| `vic-drivex-8s` | `vic-drivex-10-metallic` | victor-drivex-10-review | beginner / all-round / doubles / shoulder-comfort |
| `yy-astrox-100-game` | `yy-astrox-nextage` | yonex-astrox-nextage-review | head-heavy-under-150 |
| `yy-aerus-z2` | `yy-eclipsion-z3` | yonex-eclipsion-z3-shoes-review | shoes |
| `vic-brave-sword-12` | `vic-jetspeed-12` | victor-jetspeed-12-curious-review | all-round / control |
| `vic-auraspeed-100x-se` | `vic-auraspeed-90k-ii` | victor-auraspeed-90k-ii-review | smash-heavy |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 95 deferred items + competitive audit | ✅ |
| 2 | `vic-drivex-8s` alias resolves to victor-drivex-10-review | ✅ |
| 3 | `yy-astrox-100-game` alias resolves to yonex-astrox-nextage-review | ✅ |
| 4 | `yy-aerus-z2` alias resolves to yonex-eclipsion-z3-shoes-review | ✅ |
| 5 | `vic-brave-sword-12` alias resolves to victor-jetspeed-12-curious-review | ✅ |
| 6 | `vic-auraspeed-100x-se` alias resolves to victor-auraspeed-90k-ii-review | ✅ |
| 7 | All five alias targets already guarded in review-map golden profiles | ✅ |
| 8 | `minMappedE2eGuards: 56` unchanged (no new golden profiles required) | ✅ |
| 9 | Static export — alias resolution is build-time only | ✅ |
| 10 | `npm test` + `npm run lint:review-product-map-baseline` + `npm run build` pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:review-product-map-baseline
npm run lint:editorial-baselines
npm run build
npx playwright test e2e/review-consolidation.spec.ts
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Mapped review e2e golden profiles | 56 (unchanged) |
| Explainer slug golden profiles | 13/13 (unchanged) |
| Commercial landings under image CI | 17/17 (unchanged) |
| Commercial sibling alias pairs | 8 |
