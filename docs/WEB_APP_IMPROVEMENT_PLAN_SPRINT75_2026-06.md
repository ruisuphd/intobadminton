# Web App Improvement Plan — Sprint 75 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-47b4`  
**Baseline:** Sprint 74 — tier-4 brand hub PDP exits, Halbertec 9000 image, image CI expansion (PR #222).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 75 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Every buying-guide row shows product photography | ✅ 10 catalogue images backfilled; 12/17 commercial landings guarded |
| **Wirecutter** | Commercial landings show photography on every row | ✅ defensive-rackets 6/6; head-light + shoulder-comfort 5/6 with documented waiver |
| **RTINGS** | Regression guards on imagery completeness | ✅ Image CI expanded +3 landings |
| **RacketGuide** | Budget and specialty landings have spec-backed photos | ✅ rackets-under-100 partial backfill (3/6); shoes landings +4 images |
| **BadmintonCentral** | Discontinued SKUs still need honest imagery policy | ✅ Nanoray Light 70i waiver documented (not wrong-product fallback) |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 75)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Image CI guarded only 9/17 commercial landings** | Budget/specialty regressions slip through | ✅ Expanded to 12/17; defensive 6/6; head-light + shoulder-comfort 5/6 |
| 2 | **26 catalogue SKUs lack verified distributor photos** | AdSense + experience signal on `/best/*` rows | ✅ 10 verified images added (Yonex US, BadmintonDirect, e78.us) |
| 3 | **Nanoray Light 70i blocks 4 landings** | Discontinued SKU with no official product photo | ⏳ Documented waiver on 2 landings; catalogue backfill deferred |
| 4 | **Tier-4 shoe / value landings still unguarded** | wide-feet, budget-shoes, lightweight-5u at ≤4/6 | ⏳ Sprint 76+ catalogue backfill (Bonny, Kumpoo, Kawasaki, Victor niche) |
| 5 | **Owner/editorial deferrals remain** | Reactions API, CrUX/GSC fill, YouTube `sameAs` | ⏳ Documented; no code change possible this sprint |

**Deferred (Sprint 76+):** owner set `REACTIONS_API_URL` + run wire workflow; fill CrUX/GSC CSV metrics; YouTube `sameAs`; `VideoObject` schema; expand image CI to remaining 5 landings; Nanoray Light 70i official/retailer image hunt.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Catalogue image backfill (+10 SKUs) | `src/data/products.json` |
| Image coverage guard expansion (+3 landings) | `src/lib/best-image-coverage.ts` |
| Nanoray Light 70i waiver documentation | `src/lib/best-image-coverage.ts` |
| Tests | `src/lib/best-image-coverage.test.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 74 deferred items + competitive audit | ✅ |
| 2 | 10 catalogue images use correct SKU URLs (no wrong-product fallback) | ✅ |
| 3 | defensive-rackets reaches 6/6 verified imagery | ✅ |
| 4 | head-light + shoulder-comfort reach 5/6 with documented Nanoray waiver | ✅ |
| 5 | Static export — no new API routes on site | ✅ |
| 6 | `lint:best-image-coverage` passes | ✅ |
| 7 | Editorial baselines chain includes guards | ✅ |
| 8 | `npm test` + `npm run build` | ✅ |
| 9 | Commercial landings under image CI: 12/17 | ✅ |
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
| Commercial landings under image CI | 12/17 |
| Catalogue verified images added | +10 SKUs |
| defensive-rackets verified imagery | 6/6 (waivers 0) |
| head-light / shoulder-comfort imagery | 5/6 (waivers 1 each) |
| Image CI waivers (documented) | 2 (Nanoray Light 70i) |
