# Web App Improvement Plan — Sprint 35 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-4b9f`  
**Baseline:** Sprint 34 — PWA ib-v24 offline discoverability, Lighthouse precache guard, offline nav e2e (PR #182).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 35 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Top buying guides readable offline after install | ✅ Offline recovery links to precached beginner-rackets |
| **RTINGS** | Flagship comparison articles discoverable offline | ✅ Offline recovery links to Astrox vs Nanoflare |
| **Wirecutter** | Procedural how-to guides reachable from offline hub | ✅ Offline recovery links to string-tension guide |
| **Running Warehouse** | CrUX-priority URLs discoverable from offline fallback | ✅ Shared recovery paths + CrUX parity unit test |
| **BadmintonCentral** | Offline experience validated for commercial deep-links | ✅ Playwright offline navigation for best-of + compare |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, 153+ first-person reviews.

---

## 2. Top 5 gaps (Sprint 35)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Offline recovery missing CrUX best-of URL** | `/best/beginner-rackets/` precached but not discoverable offline | ✅ Sidebar link + e2e offline nav |
| 2 | **Offline recovery missing CrUX compare guide** | `/compare-guides/yonex-astrox-vs-nanoflare/` precached but not listed | ✅ Sidebar link + e2e offline nav |
| 3 | **Offline recovery missing procedural guide deep-link** | `/guides/string-tension/` in Lighthouse set but not in recovery | ✅ Sidebar link + e2e offline nav |
| 4 | **Offline links duplicated in page component** | Drift risk vs precache assert list | ✅ `offline-recovery-paths.ts` shared module + unit test |
| 5 | **No CrUX ↔ offline parity guard** | Field-data priority URLs could regress silently | ✅ `offline-recovery.test.ts` CrUX assert |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv`; capture `lighthouse-scores.json` baseline; original `public/products/` photography; YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Shared offline recovery module | `src/lib/offline-recovery-paths.ts`, `src/app/offline/page.tsx` |
| CrUX + precache parity tests | `src/lib/offline-recovery.test.ts` |
| PWA cache bump (offline shell HTML) | `public/sw.js` (`ib-v25`) |
| Offline navigation e2e | `e2e/pwa-offline-smoke.spec.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in crux-template.csv vs offline sidebar diff | ✅ |
| 2 | No duplicate trust bands — commercial links only on offline fallback | ✅ |
| 3 | Reuse existing offline link pattern via shared constant | ✅ |
| 4 | PWA cache version bumped (`ib-v24` → `ib-v25`) for offline shell change | ✅ |
| 5 | Static export — no new API routes | ✅ |
| 6 | Unit tests: ib-v25 + CrUX parity + precache subset assert | ✅ |
| 7 | Precache URLs unchanged — discoverability only | ✅ |
| 8 | `npm test` + `npm run build` + postbuild SEO audit | ✅ |
| 9 | E2E: offline recovery + commercial offline nav + ib-v25 | ✅ |
| 10 | Master plan doc updated with Sprint 35 entry | ✅ |

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
