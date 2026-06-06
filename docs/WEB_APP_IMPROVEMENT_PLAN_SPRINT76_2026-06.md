# Web App Improvement Plan — Sprint 76 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-16c7`  
**Baseline:** Sprint 75 — catalogue image backfill, image CI expansion to 12/17 landings (PR #223).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 76 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Budget/specialty landings show photography on every row | ✅ Image CI now guards all 17 commercial `/best/*` landings |
| **Wirecutter** | Wide-feet and under-$100 guides show product photos | ✅ ASICS Blast FF 3 + Voltric 8DG catalogue images; waivers documented |
| **RTINGS** | Regression guards on imagery completeness | ✅ Full commercial landing coverage (17/17) in `lint:best-image-coverage` |
| **RacketGuide** | Tier-4 value shoes/rackets have spec-backed photos | ⏳ Tier-4 waivers documented; backfill deferred to Sprint 77+ |
| **BadmintonCentral** | Discontinued SKUs need honest imagery policy | ✅ Nanoray Light 70i waiver extended to 4 landings |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 76)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Image CI guarded only 12/17 commercial landings** | Budget/specialty regressions slip through | ✅ Expanded to 17/17 with waiver-adjusted thresholds |
| 2 | **Tier-4 shoe / value landings unguarded** | wide-feet, budget-shoes, lightweight-5u regressions | ✅ All 5 remaining landings added to `BEST_IMAGE_REQUIREMENTS` |
| 3 | **Voltric 8DG + ASICS Blast FF 3 lack catalogue photos** | head-heavy-under-150 + wide-feet rows show brand fallback | ✅ 2 verified distributor/manufacturer images added |
| 4 | **Nanoray Light 70i blocks 4 landings** | Discontinued SKU with no official product photo | ✅ Waiver documented on lightweight-5u + rackets-under-100 (4 total) |
| 5 | **Owner/editorial deferrals remain** | Reactions API, CrUX/GSC fill, YouTube `sameAs` | ⏳ Documented; no code change possible this sprint |

**Deferred (Sprint 77+):** owner set `REACTIONS_API_URL` + run wire workflow; fill CrUX/GSC CSV metrics; YouTube `sameAs`; `VideoObject` schema; tier-4 catalogue image backfill (Bonny, Kumpoo, Kawasaki, Victor niche SKUs); Nanoray Light 70i official/retailer image hunt.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Catalogue image backfill (+2 SKUs) | `src/data/products.json` |
| Image coverage guard expansion (+5 landings → 17/17) | `src/lib/best-image-coverage.ts` |
| Nanoray + Bonny waiver documentation | `src/lib/best-image-coverage.ts` |
| Tests | `src/lib/best-image-coverage.test.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 75 deferred items + competitive audit | ✅ |
| 2 | Voltric 8DG image matches correct SKU (e78.us VT8DG listing) | ✅ |
| 3 | ASICS Blast FF 3 image from official asics.com CDN | ✅ |
| 4 | wide-feet reaches 5/6 with documented Bonny waiver | ✅ |
| 5 | head-heavy-under-150 reaches 3/6 with 3 documented waivers | ✅ |
| 6 | Static export — no new API routes on site | ✅ |
| 7 | `lint:best-image-coverage` passes | ✅ |
| 8 | `npm test` + `npm run build` | ✅ |
| 9 | Commercial landings under image CI: 17/17 | ✅ |
| 10 | Master + sprint docs updated | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:best-image-coverage
npm run lint:editorial-baselines
npm run build
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Commercial landings under image CI | 17/17 |
| Catalogue verified images added | +2 SKUs |
| wide-feet verified imagery | 5/6 (waivers 1) |
| head-heavy-under-150 verified imagery | 3/6 (waivers 3) |
| rackets-under-100 verified imagery | 3/6 (waivers 3) |
| Image CI waivers (documented) | 6 entries |
