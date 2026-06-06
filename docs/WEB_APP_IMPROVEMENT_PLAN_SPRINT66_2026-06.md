# Web App Improvement Plan — Sprint 66 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-cc2b`  
**Baseline:** Sprint 65 — popular-search editorial offline recovery parity (PR #213).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 66 response |
|------------|---------------------------|-------------------|
| **Wirecutter** | Homepage grid deep-links work offline without prior visit | ✅ Explicit PWA precache parity guard for all 30 popular-search hrefs |
| **Tennis Warehouse** | Social proof on buying guides | ✅ HelpfulReaction API-on first-vote subline; worker `/health` + smoke script |
| **RTINGS** | Deploy verification for engagement backends | ✅ `npm run reactions:smoke` hits `GET /health` |
| **BadmintonCentral** | Shared manifests prevent offline/CI drift | ✅ `homePopularSearchPrecachePaths()` mirrors featured-review pattern |
| **RacketGuide** | Operator runbooks for optional services | ✅ Reactions README + scaffold tests document health + smoke |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards, 142-article reviews golden corpus, 100% popular-search offline recovery (Sprint 65).

---

## 2. Top 5 gaps (Sprint 66)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **No explicit popular-search↔PWA precache parity guard** | Grid rotation can ship without SW precache | ✅ `homePopularSearchPrecachePaths()` + `pwa-precache.test.ts` |
| 2 | **Reactions worker lacks deploy health probe** | Owner cannot verify worker after Wrangler deploy | ✅ `GET /health` + `scripts/smoke-reactions-worker.mjs` |
| 3 | **HelpfulReaction API-on empty state** | Blank subline when counts not yet loaded | ✅ First-vote prompt in `helpful-reaction-ui.ts` |
| 4 | **No operator smoke command for reactions** | Manual curl required post-deploy | ✅ `npm run reactions:smoke` |
| 5 | **Reactions scaffold docs incomplete** | Health + smoke not in CI guard | ✅ `reactions-worker-scaffold.test.ts` asserts README |

**Deferred (Sprint 67+):** owner set `REACTIONS_API_URL` secret + Pages rebuild; fill `crux-template.csv` and `gsc-template.csv` from live exports; original photography; YouTube `sameAs`; PWA precache for full 140+ review corpus (impractical).

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Popular-search precache manifest | `src/lib/home-popular-searches.ts`, `src/lib/home-popular-searches.test.ts` |
| PWA precache parity test | `src/lib/pwa-precache.test.ts` |
| Reactions worker health | `workers/reactions/index.js`, `workers/reactions/index.test.js` |
| Deploy smoke script | `scripts/smoke-reactions-worker.mjs`, `package.json` |
| HelpfulReaction UX | `src/lib/helpful-reaction-ui.ts`, `src/lib/helpful-reaction-ui.test.ts` |
| Scaffold docs guard | `workers/reactions/README.md`, `src/lib/reactions-worker-scaffold.test.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 65 deferred items + competitive audit | ✅ |
| 2 | All 30 popular-search hrefs already in `PRECACHE_ASSERT_PATHS` (ib-v30) | ✅ |
| 3 | `homePopularSearchPrecachePaths()` covers every grid href | ✅ |
| 4 | `pwa-precache.test.ts` asserts SW contains every popular-search path | ✅ |
| 5 | Reactions worker `GET /health` returns `{ ok, service }` | ✅ |
| 6 | `reactions:smoke` script documents operator verification | ✅ |
| 7 | Static export — no new API routes on site | ✅ |
| 8 | Unit tests: home-popular-searches, pwa-precache, reactions worker, helpful-reaction-ui | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | `npm run lint:editorial-baselines` pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:editorial-baselines
npm run build
REACTIONS_API_URL=https://example.workers.dev npm run reactions:smoke  # after deploy
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Popular-search PWA precache | 100% (30/30 grid hrefs) |
| Popular-search offline recovery | 100% (30/30 grid hrefs) |
| Reactions worker deploy smoke | `GET /health` → 200 |
| Product funnel golden profiles | 100% pass in CI |
| Editorial hub golden profiles | 100% pass in CI |
