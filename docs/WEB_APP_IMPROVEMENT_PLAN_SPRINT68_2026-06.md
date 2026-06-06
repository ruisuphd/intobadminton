# Web App Improvement Plan — Sprint 68 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-75ef`  
**Baseline:** Sprint 67 — reactions deploy smoke, weekly health, performance baselines (PR #215).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 68 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Manufacturer product photography on buying guides | ✅ Victor DriveX 8S images on 3 `/best/*` landings |
| **Wirecutter** | Social proof persistence in production | ✅ Wire reactions → Pages workflow + pre-deploy smoke |
| **RTINGS** | Field-data regression baselines | ✅ CrUX/GSC owner capture hint commands |
| **Running Warehouse** | One-command operator runbooks | ✅ `capture:performance-hints` chains PSI + GSC steps |
| **BadmintonCentral** | Uptime before shipping engagement backends | ✅ Pages build smoke when `REACTIONS_API_URL` set |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 68)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Reactions API not wired in production Pages** | HelpfulReaction counts stay local-only | ✅ `wire-reactions-pages.yml` + Pages pre-deploy smoke |
| 2 | **CrUX/GSC templates unfilled** | No field-data regression signal | ✅ `capture:crux-hints` + `capture:gsc-hints` owner commands |
| 3 | **Best-of rows missing Victor DriveX imagery** | Visual gap vs retailer guides | ✅ Verified Victor CDN image on beginner/doubles/all-round |
| 4 | **No automated Pages rebuild after reactions secret** | Owner friction post-deploy | ✅ Wire workflow triggers `pages.yml` after smoke |
| 5 | **Original photography on remaining commercial URLs** | AdSense + experience signal | ⏳ Li-Ning strings/shoes TODOs remain editorial |

**Deferred (Sprint 69+):** owner set `REACTIONS_API_URL` + run wire workflow; fill CrUX/GSC CSV metrics from live exports; Li-Ning product images; YouTube `sameAs`; PWA precache for full 140+ review corpus (impractical).

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Wire reactions → Pages | `.github/workflows/wire-reactions-pages.yml` |
| Pages pre-deploy smoke | `.github/workflows/pages.yml` |
| CrUX capture hints | `scripts/crux-capture-hints.mjs`, `package.json` |
| GSC capture hints | `scripts/gsc-capture-hints.mjs` |
| Unified capture command | `scripts/performance-capture-hints.mjs` |
| Victor DriveX 8S images | `src/app/best/beginner-rackets/page.tsx`, `doubles-rackets/page.tsx`, `all-round-rackets/page.tsx` |
| Scaffold tests | `src/lib/performance-capture-scaffold.test.ts`, `src/lib/reactions-worker-scaffold.test.ts` |
| Operator docs | `docs/baselines/README.md`, `workers/reactions/README.md` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 67 deferred items + competitive audit | ✅ |
| 2 | `wire-reactions-pages.yml` smoke-tests secret before Pages trigger | ✅ |
| 3 | Pages workflow smoke when `REACTIONS_API_URL` set | ✅ |
| 4 | `capture:performance-hints` chains CrUX + GSC hint scripts | ✅ |
| 5 | Victor DriveX image verified on victorsport.com CDN | ✅ |
| 6 | Static export — no new API routes on site | ✅ |
| 7 | Scaffold tests cover capture + reactions wiring workflows | ✅ |
| 8 | Baselines README documents capture commands | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | `npm run capture:performance-hints` + `npm run lint:performance-baselines` | ✅ |

---

## 5. Verification

```bash
npm test
npm run capture:performance-hints
npm run lint:performance-baselines
npm run build
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Reactions production wire | Wire workflow smoke + Pages rebuild |
| Pages pre-deploy smoke | `GET /health` → 200 when secret set |
| Performance baseline guards | CrUX + GSC structure pass in CI |
| Best-of imagery | DriveX 8S rows show verified manufacturer image |
