# Web App Improvement Plan — Sprint 32 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-749b`  
**Baseline:** Sprint 31 — trust-cluster PWA ib-v21, offline best/brands/privacy recovery, Lighthouse security/source-policy (PR #179, merged).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 32 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Long-tail buying guides available offline after install | ✅ PWA `ib-v22` precaches 6 remaining Lighthouse best-of shells |
| **Running Warehouse** | Offline hub lists policies + about before retry | ✅ Offline recovery adds legal + trust + support hubs |
| **RTINGS** | Methodology and data transparency reachable offline | ✅ Offline adds methodology + claims registry links |
| **Wirecutter** | Support/contact surfaces in installed-app recovery | ✅ Offline adds contact + research links |
| **BadmintonCentral** | About and sources readable without network | ✅ Offline adds about + sources links |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, 153 first-person reviews.

---

## 2. Top 5 gaps (Sprint 32)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **PWA missing long-tail best-of shells** | 6 Lighthouse-audited buying guides not precached for installed users | ✅ `ib-v22` precache (6 routes) |
| 2 | **Offline recovery missing trust/editorial hubs** | About, sources, methodology, data unreachable from offline fallback | ✅ Offline sidebar adds 4 trust links |
| 3 | **Offline recovery missing remaining legal cluster** | Terms, cookies, security policies not listed (privacy only from Sprint 31) | ✅ Offline sidebar adds 3 legal links |
| 4 | **Offline recovery missing support hubs** | Contact and research precached but not discoverable offline | ✅ Offline sidebar adds contact + research |
| 5 | **PWA e2e still asserts ib-v21** | CI would miss cache-version bump | ✅ Tests updated for ib-v22 |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv`; original `public/products/` photography; YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| PWA long-tail best-of precache | `public/sw.js` (`ib-v22`), `pwa-precache.test.ts`, `pwa-offline-smoke.spec.ts` |
| Offline recovery expansion | `src/app/offline/page.tsx`, `e2e/pwa-offline-smoke.spec.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 31 deferred list + Lighthouse/precache diff | ✅ |
| 2 | Trust pages already have catalog CTAs from Sprint 28 — no duplicate bands | ✅ |
| 3 | No new components — offline links reuse existing pattern | ✅ |
| 4 | PWA cache version bumped (`ib-v21` → `ib-v22`) | ✅ |
| 5 | Static export — no new API routes | ✅ |
| 6 | Unit tests: `pwa-precache.test.ts` updated for ib-v22 + 6 routes | ✅ |
| 7 | Lighthouse URLs unchanged — precache catches up to existing CI set | ✅ |
| 8 | `npm test` + `npm run build` + postbuild SEO audit | ✅ |
| 9 | E2E: PWA ib-v22 + offline trust/legal/support recovery links | ✅ |
| 10 | Master plan doc updated with Sprint 32 entry | ✅ |

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
