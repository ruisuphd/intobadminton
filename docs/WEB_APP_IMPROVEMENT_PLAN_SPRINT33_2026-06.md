# Web App Improvement Plan — Sprint 33 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-5915`  
**Baseline:** Sprint 32 — PWA ib-v22 long-tail best-of precache, offline trust/legal/support recovery (PR #180, merged).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 33 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Sample product pages readable offline after install | ✅ PWA `ib-v23` precaches Lighthouse PDP shell |
| **RTINGS** | Flagship review articles available offline | ✅ PWA precaches sample review article |
| **Wirecutter** | Author profiles reachable from offline recovery | ✅ Offline adds authors + source-policy links |
| **Running Warehouse** | Saved shortlist survives page reload | ✅ E2E asserts saved shelf persists after reload |
| **BadmintonCentral** | Editorial policy pages discoverable offline | ✅ Offline recovery lists source-policy + author hubs |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, 153 first-person reviews.

---

## 2. Top 5 gaps (Sprint 33)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **PWA missing Lighthouse PDP shell** | Sample product page not precached for installed users | ✅ `ib-v23` precache (`/product/yy-grpht-thrttl/`) |
| 2 | **PWA missing Lighthouse review shell** | Flagship review not precached for offline install | ✅ `ib-v23` precache (`/review/yonex-arcsaber-7-pro-review/`) |
| 3 | **Offline recovery missing author/source-policy hubs** | Precached trust pages not discoverable from offline fallback | ✅ Offline sidebar adds 3 links |
| 4 | **Saved shelf reload untested** | Regression risk on localStorage persistence | ✅ E2E reload assertion on saved shelf |
| 5 | **PWA e2e still asserts ib-v22** | CI would miss cache-version bump | ✅ Tests updated for ib-v23 |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv`; capture `lighthouse-scores.json` baseline; original `public/products/` photography; YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| PWA PDP + review precache | `public/sw.js` (`ib-v23`), `pwa-precache.test.ts`, `pwa-offline-smoke.spec.ts` |
| Offline recovery expansion | `src/app/offline/page.tsx`, `e2e/pwa-offline-smoke.spec.ts` |
| Saved persistence e2e | `e2e/catalog-compare-saved-smoke.spec.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Lighthouse vs precache diff (2 missing URLs) | ✅ |
| 2 | Trust pages already have catalog CTAs from Sprint 28 — no duplicate bands | ✅ |
| 3 | No new components — offline links reuse existing pattern | ✅ |
| 4 | PWA cache version bumped (`ib-v22` → `ib-v23`) | ✅ |
| 5 | Static export — no new API routes | ✅ |
| 6 | Unit tests: `pwa-precache.test.ts` updated for ib-v23 + 2 routes | ✅ |
| 7 | Lighthouse URLs unchanged — precache catches up to existing CI set | ✅ |
| 8 | `npm test` + `npm run build` + postbuild SEO audit | ✅ |
| 9 | E2E: PWA ib-v23 + offline author links + saved reload | ✅ |
| 10 | Master plan doc updated with Sprint 33 entry | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npx playwright test e2e/pwa-offline-smoke.spec.ts e2e/catalog-compare-saved-smoke.spec.ts
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Review→product map (mappable slugs) | 100% (140/140) |
| Pages per session | 2.5+ |
| Trust/legal → catalog CTR | Measurable in GA4 `select_content` |
