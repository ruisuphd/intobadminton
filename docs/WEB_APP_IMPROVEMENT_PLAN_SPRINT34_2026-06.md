# Web App Improvement Plan — Sprint 34 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-f6fa`  
**Baseline:** Sprint 33 — PWA ib-v23 PDP/review precache, offline author recovery, saved reload e2e (PR #181).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 34 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Sample PDP readable offline after install | ✅ Offline recovery links to precached PDP |
| **RTINGS** | Flagship review discoverable from offline hub | ✅ Offline recovery links to precached review |
| **Wirecutter** | Privacy/consent controls reachable in installed app | ✅ Offline adds privacy-choices link |
| **Running Warehouse** | CI guards precache parity with audited URLs | ✅ Lighthouse ↔ precache regression test |
| **BadmintonCentral** | Offline experience validated end-to-end | ✅ Playwright offline navigation smoke |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, 153+ first-person reviews.

---

## 2. Top 5 gaps (Sprint 34)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Offline recovery missing Lighthouse PDP** | Precached product page not discoverable from `/offline/` | ✅ Sidebar link to `/product/yy-grpht-thrttl/` |
| 2 | **Offline recovery missing flagship review** | Precached review not discoverable from offline fallback | ✅ Sidebar link to `/review/yonex-arcsaber-7-pro-review/` |
| 3 | **Offline recovery missing privacy-choices** | Precached consent page not listed in legal cluster | ✅ Sidebar link to `/privacy-choices/` |
| 4 | **PWA e2e drift from unit precache list** | CI could miss regressions on 15 Lighthouse routes | ✅ E2E path list synced with `pwa-precache.test.ts` |
| 5 | **No true offline navigation e2e** | Cache-key tests do not validate SW HTML fallback | ✅ Offline navigation test for PDP + review |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv`; capture `lighthouse-scores.json` baseline; original `public/products/` photography; YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Offline PDP/review/privacy-choices recovery | `src/app/offline/page.tsx`, `e2e/pwa-offline-smoke.spec.ts` |
| PWA cache bump (offline shell HTML) | `public/sw.js` (`ib-v24`) |
| Lighthouse precache guardrail | `src/lib/pwa-precache.test.ts` |
| Offline navigation e2e | `e2e/pwa-offline-smoke.spec.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 33 precache vs offline discoverability diff | ✅ |
| 2 | No duplicate trust bands — links only on offline fallback | ✅ |
| 3 | No new components — reuse `OFFLINE_LINKS` pattern | ✅ |
| 4 | PWA cache version bumped (`ib-v23` → `ib-v24`) for offline shell change | ✅ |
| 5 | Static export — no new API routes | ✅ |
| 6 | Unit tests: ib-v24 + Lighthouse parity assertion | ✅ |
| 7 | Precache URLs unchanged — discoverability only | ✅ |
| 8 | `npm test` + `npm run build` + postbuild SEO audit | ✅ |
| 9 | E2E: offline recovery + navigation + ib-v24 | ✅ |
| 10 | Master plan doc updated with Sprint 34 entry | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npx playwright test e2e/pwa-offline-smoke.spec.ts
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Review→product map (mappable slugs) | 100% (140/140) |
| Pages per session | 2.5+ |
| Trust/legal → catalog CTR | Measurable in GA4 `select_content` |
