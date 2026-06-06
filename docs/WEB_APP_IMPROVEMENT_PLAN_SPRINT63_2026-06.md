# Web App Improvement Plan — Sprint 63 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-ef6e`  
**Baseline:** Sprint 62 — brand shelf review parity, PWA ib-v29 (PR #210).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 63 response |
|------------|---------------------------|-------------------|
| **Wirecutter** | Homepage featured picks reachable offline on repeat visits | ✅ PWA ib-v30 precaches all 6 featured review shells |
| **Tennis Warehouse** | Hero review deep-links survive spotty connectivity | ✅ Featured-only precache manifest deduplicates Lighthouse overlap |
| **RTINGS** | PWA precache parity regression-tested | ✅ Unit test asserts every `homeFeaturedReviewHrefs()` in `sw.js` |
| **BadmintonCentral** | Offline recovery surfaces recent editorial picks | ✅ Gosen Ryoga Shiden featured review on `/offline/` recovery |
| **RacketGuide** | Shared manifest prevents PWA/CI drift | ✅ `homeFeaturedReviewPrecachePaths()` in `home-featured.ts` |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards, 142-article reviews golden corpus.

---

## 2. Top 5 gaps (Sprint 63)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Homepage featured review shells missing from PWA precache** | 4/6 featured picks fail offline after first visit | ✅ PWA ib-v30 precaches nanospeed, voltric, fz-100xx, leisu-800-lt |
| 2 | **No shared featured↔precache manifest** | PWA and CI guards can drift from `home-featured-reviews.json` | ✅ `homeFeaturedReviewPrecachePaths()` in `home-featured.ts` |
| 3 | **No PWA precache parity guard for featured reviews** | Featured slice rotation can ship without offline shells | ✅ `pwa-precache.test.ts` asserts all featured hrefs |
| 4 | **Offline recovery lacks featured review sample** | Users offline cannot discover homepage editorial picks | ✅ Gosen Ryoga Shiden on `/offline/` recovery sidebar |
| 5 | **Featured review offline e2e gap** | No Playwright proof featured shell survives offline | ✅ `pwa-offline-smoke.spec.ts` featured review test |

**Deferred (Sprint 64+):** owner deploy reactions worker + `REACTIONS_API_URL`; fill CrUX/GSC CSVs; original photography; YouTube `sameAs`; PWA precache for full 140+ review corpus (impractical).

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Featured precache manifest | `src/lib/home-featured.ts`, `src/lib/home-featured.test.ts` |
| PWA ib-v30 precache | `public/sw.js`, `src/lib/pwa-precache-paths.ts` |
| PWA parity unit test | `src/lib/pwa-precache.test.ts` |
| Offline recovery link | `src/lib/offline-recovery-paths.ts` |
| E2e featured offline smoke | `e2e/pwa-offline-smoke.spec.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 62 deferred items + competitive audit | ✅ |
| 2 | All 6 featured slugs already in reviews-queries.json (`requireFeaturedParity`) | ✅ |
| 3 | 4 new featured shells added to PRECACHE_URLS | ✅ |
| 4 | `homeFeaturedReviewPrecachePaths()` omits Lighthouse-overlap slugs | ✅ |
| 5 | Offline recovery link targets precached route | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: home-featured + pwa precache parity | ✅ |
| 8 | `npm run lint:editorial-baselines` pass | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | PWA e2e asserts ib-v30 + featured review offline | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:reviews-baseline
npm run lint:editorial-baselines
npm run build
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Reviews golden profiles | Hub + full mapped corpus (140) + brand shelves + featured in CI |
| Featured review PWA precache | 100% (6/6 shells) |
| Product funnel golden profiles | 100% pass in CI |
| Editorial hub golden profiles | 100% pass in CI |
