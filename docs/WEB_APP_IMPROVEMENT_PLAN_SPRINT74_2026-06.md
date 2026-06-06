# Web App Improvement Plan — Sprint 74 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-cf4e`  
**Baseline:** Sprint 73 — L69 image, catalogue-backed image CI, Li-Ning + Victor brand PDP exits (PR #221).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 74 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Every brand hub exits to spec-backed PDP | ✅ All 7 brand hubs wire flagship top pick → `/product/[id]/` |
| **Wirecutter** | Commercial landings show photography on every row | ✅ Image CI expanded to 9 `/best/*` landings (was 6) |
| **RTINGS** | Regression guards on imagery completeness | ✅ `control-rackets` joins smash/singles under catalogue-backed guard |
| **RacketGuide** | Tier-4 brands discoverable via catalogue | ✅ Anta / Bonny / Kawasaki / Kumpoo hub PDP exits |
| **BadmintonCentral** | Li-Ning Halbertec line imagery on control guides | ✅ Halbertec 9000 distributor image in catalogue |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 74)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Tier-4 brand hubs lack PDP exits** | Missed discovery vs Yonex / Li-Ning / Victor Sprint 71–73 pattern | ✅ Anta, Bonny, Kawasaki, Kumpoo flagship → `/product/[id]/` |
| 2 | **Image CI guarded only 6/17 commercial landings** | Smash/singles/control regressions slip through | ✅ Expanded `BEST_IMAGE_REQUIREMENTS` +3 landings at 6/6 |
| 3 | **Halbertec 9000 missing catalogue image** | `control-rackets` 5/6 imagery via fallback | ✅ li-ningfamily.com distributor image on `ln-halbertec-9000` |
| 4 | **No CI guard for brand hub PDP wiring** | Hub→PDP regressions undetected | ✅ `product-data-integrity.test.ts` asserts all 7 hubs |
| 5 | **Owner/editorial deferrals remain** | Reactions API, CrUX/GSC fill, YouTube `sameAs` | ⏳ Documented; no code change possible this sprint |

**Deferred (Sprint 75+):** owner set `REACTIONS_API_URL` + run wire workflow; fill CrUX/GSC CSV metrics; YouTube `sameAs`; `VideoObject` schema; expand image CI to remaining 8 landings (need catalogue backfill).

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Tier-4 brand hub PDP exits | `src/app/brands/anta/page.tsx`, `bonny/page.tsx`, `kawasaki/page.tsx`, `kumpoo/page.tsx` |
| Halbertec 9000 catalogue image | `src/data/products.json` |
| Image coverage guard expansion | `src/lib/best-image-coverage.ts` |
| Tests | `src/lib/best-image-coverage.test.ts`, `src/lib/product-data-integrity.test.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 73 deferred items + competitive audit | ✅ |
| 2 | All 7 brand hubs wire flagship top pick to live PDP | ✅ |
| 3 | `ln-halbertec-9000` image resolves with `verified: true` | ✅ |
| 4 | smash-heavy + singles + control reach 6/6 verified imagery | ✅ |
| 5 | Static export — no new API routes on site | ✅ |
| 6 | `lint:best-image-coverage` passes | ✅ |
| 7 | Editorial baselines chain includes guards | ✅ |
| 8 | `npm test` + `npm run build` | ✅ |
| 9 | Brand hub PDP parity test covers catalogue SKU existence | ✅ |
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
| Brand hub PDP exits (all dedicated hubs) | 7/7 wired |
| Commercial landings under image CI | 9/17 (6/6 each) |
| Halbertec 9000 catalogue image | verified |
| Image CI waivers | 0 |
