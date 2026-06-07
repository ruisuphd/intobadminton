# Web App Improvement Plan — Sprint 97 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-f95b`  
**Baseline:** Sprint 96 — commercial sibling alias expansion for DriveX 8S, Astrox 100 Game, Aerus Z2, Brave Sword 12, Auraspeed 100X SE + `minMappedE2eGuards: 56` (PR #244).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 97 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Every ranked pick exits to hands-on editorial review | ✅ Four new `PRODUCT_REVIEW_ALIASES` for remaining unmapped racket picks |
| **Wirecutter** | Budget and beginner guides link to nearest reviewed sibling | ✅ Nanoray Light 70i + Nanoflare 700 Play resolve to play/pro family reviews |
| **RTINGS** | Discontinued SKUs still show honest review exit | ✅ Voltric 8DG aliases to Voltric Z-Force LTD editorial |
| **RacketGuide** | Non-BWF brands (Mizuno) pair with in-brand editorial depth | ✅ Altius N-Feel aliases to Mizuno Carbo Pro 823 review |
| **Tennis Warehouse** | String guides link to string-specific reviews | ⏳ Yonex BG65/BG80/EXBOLT/Aerobite remain specs-only — no mapped string articles yet |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 97)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Voltric 8DG lacks editorial href** | `/best/head-heavy-rackets-under-150/` rank 4 had no review exit | ✅ Alias to `yy-voltric-z-force-ltd` + e2e |
| 2 | **Nanoray Light 70i lacks editorial href** | Four commercial landings (under-100, head-light, lightweight-5u, shoulder-comfort) had no review exit | ✅ Alias to `yy-nanoflare-1000-play` + e2e on `/best/rackets-under-100/` |
| 3 | **Nanoflare 700 Play lacks editorial href** | `/best/beginner-rackets/` rank 1 had no review exit | ✅ Alias to `yy-nanoflare-700-pro-2024` + e2e |
| 4 | **Mizuno Altius N-Feel lacks editorial href** | `/best/beginner-rackets/` and `/best/rackets-for-shoulder-comfort/` had no review exit | ✅ Alias to `mizuno-carbo-pro-823` + e2e |
| 5 | **Yonex string picks lack editorial href** | Five `/best/strings/` rows (BG65, BG80, EXBOLT, Aerobite, BG80 Power) have no mapped review articles | ⏳ Deferred — only Li-Ning L69 string review exists; specs-only badges remain honest |

**Deferred (Sprint 98+):** tier-4 Western distributor image hunt; Nanoray Light 70i verified product image (waivers on 4 landings); Thruster Ryuga II dedicated review ingestion; YouTube `sameAs`; `VideoObject` schema; fill CrUX/GSC CSV metrics; HelpfulReaction owner secret + wire workflow; Yonex string review ingestion.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Four new `PRODUCT_REVIEW_ALIASES` | `src/lib/review-pages.ts`, `src/lib/review-pages.test.ts` |
| Commercial alias e2e smoke (4 landings) | `e2e/review-consolidation.spec.ts` |
| PDP-only baseline retarget (Nanoray → Thruster Ryuga II) | `e2e/pdp-smoke.spec.ts`, `docs/baselines/pdp-queries.json` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

**Alias pairs added:**

| Product id | Resolves to | Editorial slug | Landing |
|------------|-------------|----------------|---------|
| `yy-voltric-8dg` | `yy-voltric-z-force-ltd` | yonex-voltric-z-force-ltd-2012-review | head-heavy-under-150 |
| `yy-nanoray-light-70i` | `yy-nanoflare-1000-play` | yonex-nanoflare-1000z-play-review | under-100 / head-light / lightweight-5u / shoulder-comfort |
| `yy-nanoflare-700-play` | `yy-nanoflare-700-pro-2024` | yonex-nanoflare-700-review | beginner-rackets |
| `mizuno-altius-01-feel` | `mizuno-carbo-pro-823` | mizuno-carbo-pro-823-review | beginner-rackets / shoulder-comfort |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 96 deferred items + competitive audit | ✅ |
| 2 | `yy-voltric-8dg` alias resolves to yonex-voltric-z-force-ltd-2012-review | ✅ |
| 3 | `yy-nanoray-light-70i` alias resolves to yonex-nanoflare-1000z-play-review | ✅ |
| 4 | `yy-nanoflare-700-play` alias resolves to yonex-nanoflare-700-review | ✅ |
| 5 | `mizuno-altius-01-feel` alias resolves to mizuno-carbo-pro-823-review | ✅ |
| 6 | All four alias targets already guarded in review-map golden profiles | ✅ |
| 7 | `minMappedE2eGuards: 56` unchanged (no new golden profiles required) | ✅ |
| 8 | Yonex string gap assessed — no review articles in `blog-articles.json` | ✅ blocked |
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
| Commercial sibling alias pairs | 12 |
