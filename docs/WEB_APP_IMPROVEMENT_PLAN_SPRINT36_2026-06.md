# Web App Improvement Plan — Sprint 36 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-64e5`  
**Baseline:** Sprint 35 — PWA ib-v25 CrUX commercial offline recovery, shared paths module (PR #183).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 36 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Category buying guides (doubles, shoes) readable offline | ✅ Offline recovery deep-links for doubles + shoes best-of |
| **RTINGS** | Brand comparison hubs discoverable offline | ✅ Offline recovery for Yonex vs Victor vs Li-Ning |
| **Wirecutter** | Reference glossary + buyer-protection guides offline | ✅ Offline recovery for glossary + authenticity |
| **Running Warehouse** | Full CrUX URL set parity with offline hub | ✅ `crux-template.csv` ↔ recovery guard + unit test |
| **BadmintonCentral** | Niche brand hubs (Bonny) reachable when offline | ✅ Offline recovery for `/brands/bonny/` + e2e nav |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, 153+ first-person reviews.

---

## 2. Top 5 gaps (Sprint 36)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **CrUX doubles + shoes best-of not in offline recovery** | Field-data URLs precached but not discoverable | ✅ Sidebar links + e2e offline nav |
| 2 | **CrUX brand compare (Yonex vs Victor vs Li-Ning) missing** | Second flagship compare not listed on `/offline/` | ✅ Sidebar link + CrUX assert |
| 3 | **CrUX glossary + authenticity guides missing** | Reference content in CrUX set but hub-only links | ✅ Sidebar links + e2e |
| 4 | **CrUX Bonny brand hub missing** | Niche brand in field-data template, not in recovery | ✅ Sidebar link + e2e |
| 5 | **CrUX template ↔ recovery drift risk** | Manual 4-path constant lagged full CSV | ✅ Full CSV parity + `crux-template` unit test |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv` LCP/INP/CLS columns; capture `lighthouse-scores.json`; original `public/products/` photography; YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| CrUX offline recovery deep-links | `src/lib/offline-recovery-paths.ts` |
| CrUX CSV parity test | `src/lib/offline-recovery.test.ts` |
| PWA cache bump (offline shell HTML) | `public/sw.js` (`ib-v26`) |
| Offline navigation e2e | `e2e/pwa-offline-smoke.spec.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in `crux-template.csv` vs offline sidebar diff | ✅ |
| 2 | No duplicate trust bands — commercial links only on offline fallback | ✅ |
| 3 | Reuse `OFFLINE_RECOVERY_LINKS` shared constant | ✅ |
| 4 | PWA cache version bumped (`ib-v25` → `ib-v26`) for offline shell change | ✅ |
| 5 | Static export — no new API routes | ✅ |
| 6 | Unit tests: ib-v26 + full CrUX CSV parity + precache subset | ✅ |
| 7 | Precache URLs unchanged — discoverability only | ✅ |
| 8 | `npm test` + `npm run build` + postbuild SEO audit | ✅ |
| 9 | E2E: CrUX offline recovery links + commercial offline nav + ib-v26 | ✅ |
| 10 | Master plan doc updated with Sprint 36 entry | ✅ |

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
