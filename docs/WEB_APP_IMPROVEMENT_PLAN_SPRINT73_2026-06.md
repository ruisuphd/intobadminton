# Web App Improvement Plan — Sprint 73 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-f869`  
**Baseline:** Sprint 72 — Aerobite and BG80 Power string SKU ingest and full strings linkage (PR #220).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 73 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Every buying-guide row shows product photography | ✅ Catalogue-backed image guard counts `productId` fallback |
| **Wirecutter** | Brand hubs exit to spec-backed PDPs | ✅ Li-Ning L69 + Victor DriveX 8S PDP exits |
| **RTINGS** | Regression guards on imagery completeness | ✅ `all-round-rackets` + `intermediate-rackets` in image CI |
| **RacketGuide** | Filter browse shows photos for every shortlist row | ✅ 5 catalogue images backfill (L69, DriveX 8S, Jetspeed 12, Arc 7 Tour, DriveX 12) |
| **BadmintonCentral** | Community-trusted Li-Ning string coverage | ✅ L69 verified retailer image; strings 6/6 imagery |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 73)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **L69 string image waiver (5/6 strings imagery)** | AdSense + experience signal on high-traffic strings guide | ✅ e78.us retailer image on `ln-l69-string`; waiver removed |
| 2 | **Image CI counted inline only** | Catalogue fallback regressions slip through | ✅ `countVerifiedPickCoverage` mirrors `resolveBestPickImage` |
| 3 | **All-round / intermediate landings unguarded for imagery** | 3/6 and 5/6 picks lacked CI-backed photos | ✅ Expanded `BEST_IMAGE_REQUIREMENTS` + catalogue backfill |
| 4 | **Li-Ning / Victor brand hubs lack PDP exits** | Missed discovery vs Yonex Sprint 71 pattern | ✅ L69 + DriveX 8S → `/product/[id]/` |
| 5 | **Owner/editorial deferrals remain** | Reactions API, CrUX/GSC fill, YouTube `sameAs` | ⏳ Documented; no code change possible this sprint |

**Deferred (Sprint 74+):** owner set `REACTIONS_API_URL` + run wire workflow; fill CrUX/GSC CSV metrics; YouTube `sameAs`; `VideoObject` schema.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Catalogue image backfill | `src/data/products.json` |
| Image coverage guard (catalog fallback) | `src/lib/best-image-coverage.ts` |
| Brand hub PDP exits | `src/app/brands/li-ning/page.tsx`, `src/app/brands/victor/page.tsx` |
| Tests | `src/lib/best-image-coverage.test.ts`, `src/lib/product-data-integrity.test.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 72 deferred items + competitive audit | ✅ |
| 2 | L69 image resolves in `products.json` with `verified: true` | ✅ |
| 3 | `countVerifiedPickCoverage` matches `resolveBestPickImage` behaviour | ✅ |
| 4 | Strings reaches 6/6 verified imagery (waivers 0) | ✅ |
| 5 | All-round + intermediate reach 6/6 via catalogue fallback | ✅ |
| 6 | Static export — no new API routes on site | ✅ |
| 7 | `lint:best-image-coverage` passes | ✅ |
| 8 | Editorial baselines chain includes guards | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | Brand hub top picks link to live PDP shells | ✅ |

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
| Strings verified imagery | 6/6 (waivers 0) |
| All-round verified imagery | 6/6 |
| Intermediate verified imagery | 6/6 |
| Brand hub PDP exits (flagship) | Li-Ning + Victor wired |
| Catalogue images added | +5 SKUs |
