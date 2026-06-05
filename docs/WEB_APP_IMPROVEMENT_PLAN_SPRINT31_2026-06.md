# Web App Improvement Plan — Sprint 31 (June 2026)

**Branch:** `cursor/web-app-maturity-plan-04b3`  
**Baseline:** Sprint 30 — legal-cluster catalog CTAs, PWA ib-v20 (PR #178).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 31 response |
|------------|---------------------------|-------------------|
| **RTINGS** | Security and source-policy URLs in perf CI | ✅ Lighthouse adds `/security/`, `/source-policy/` |
| **Wirecutter** | Installed PWA users can read about/sources offline | ✅ PWA `ib-v21` precaches trust cluster (5 routes) |
| **Tennis Warehouse** | Offline recovery lists shop browse + brand index | ✅ Offline page adds Best-of + Brands recovery links |
| **Running Warehouse** | Security in Lighthouse set | ✅ CI covers remaining indexable legal/trust URLs from Sprint 30 |
| **BadmintonCentral** | About/sources reachable without network after install | ✅ About, sources, authors shells precached |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, 153 first-person reviews.

---

## 2. Top 5 gaps (Sprint 31)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Lighthouse CI gaps on security/source-policy** | Perf regressions on remaining compliance URLs undetected | ✅ CI adds 2 indexable routes (`/privacy-choices/` excluded — noindex) |
| 2 | **PWA missing trust/editorial shells** | Installed users lose about/sources/authors offline | ✅ `ib-v21` precache (5 routes) |
| 3 | **Offline recovery omits best/brands** | PWA users cannot discover buying guides or brand hubs offline | ✅ Offline sidebar adds Best-of + Brands |
| 4 | **Offline recovery omits legal cluster** | Policy pages unreachable from offline fallback | ✅ Offline sidebar adds Privacy link |
| 5 | **PWA e2e still asserts ib-v20** | CI would miss cache-version bump | ✅ Tests updated for ib-v21 |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv`; original `public/products/` photography; YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| PWA trust-cluster precache | `public/sw.js` (`ib-v21`), `pwa-precache.test.ts`, `pwa-offline-smoke.spec.ts` |
| Offline recovery expansion | `src/app/offline/page.tsx`, `e2e/pwa-offline-smoke.spec.ts` |
| Lighthouse CI | `lighthouserc.json` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 30 deferred list + competitive audit | ✅ |
| 2 | Trust pages already have catalog CTAs from Sprint 28 — no duplicate bands | ✅ |
| 3 | No new components — offline links reuse existing pattern | ✅ |
| 4 | PWA cache version bumped (`ib-v20` → `ib-v21`) | ✅ |
| 5 | Static export — no new API routes | ✅ |
| 6 | Unit tests: `pwa-precache.test.ts` updated for ib-v21 | ✅ |
| 7 | Lighthouse URLs are indexable (no noindex setup/saved/compare) | ✅ |
| 8 | `npm test` + `npm run build` + postbuild SEO audit | ✅ |
| 9 | E2E: PWA ib-v21 + offline recovery links | ✅ |
| 10 | Master plan doc updated with Sprint 31 entry | ✅ |

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
