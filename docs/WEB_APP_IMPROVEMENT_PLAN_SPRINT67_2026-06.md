# Web App Improvement Plan — Sprint 67 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-45a9`  
**Baseline:** Sprint 66 — popular-search PWA precache parity and reactions worker health (PR #214).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 67 response |
|------------|---------------------------|-------------------|
| **RTINGS** | Deploy verification for engagement backends | ✅ Post-deploy `GET /health` smoke in Wrangler workflow |
| **Wirecutter** | Scheduled uptime checks on optional services | ✅ Weekly `reactions-health.yml` when `REACTIONS_API_URL` is set |
| **Tennis Warehouse** | Unified operator runbooks for regression guards | ✅ `lint:performance-baselines` + inclusion in `lint:all-baselines` |
| **Running Warehouse** | Owner CrUX/GSC refresh in one command | ✅ Performance guard script chains CrUX + GSC validators |
| **BadmintonCentral** | Contract tests gate deploys | ✅ Reactions contract tests run before Wrangler deploy |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards, 142-article reviews golden corpus, 100% popular-search offline recovery + precache parity.

---

## 2. Top 5 gaps (Sprint 67)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Reactions deploy lacks post-deploy health verification** | Owner cannot trust Wrangler deploy without manual curl | ✅ Deploy workflow parses worker URL + runs `reactions:smoke` |
| 2 | **No scheduled reactions health monitoring** | Production worker drift undetected between deploys | ✅ `reactions-health.yml` weekly cron (skips when secret unset) |
| 3 | **Performance baselines not in unified operator command** | CrUX/GSC validators run separately from golden profiles | ✅ `lint:performance-baselines` + `all-baselines.mjs` extension |
| 4 | **Deploy workflow skips contract tests** | Worker/API contract drift can ship to production | ✅ Contract tests before Wrangler deploy |
| 5 | **Deploy runbook omits automated smoke + monitoring** | Owner friction for `REACTIONS_API_URL` setup | ✅ README + scaffold tests document deploy smoke + health workflow |

**Deferred (Sprint 68+):** owner set `REACTIONS_API_URL` secret + Pages rebuild; fill `crux-template.csv` and `gsc-template.csv` from live exports; original photography; YouTube `sameAs`; PWA precache for full 140+ review corpus (impractical).

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Post-deploy reactions smoke | `.github/workflows/deploy-reactions-worker.yml` |
| Scheduled reactions health | `.github/workflows/reactions-health.yml` |
| Performance baselines command | `scripts/performance-baselines.mjs`, `package.json` |
| All-baselines extension | `scripts/all-baselines.mjs` |
| Scaffold tests | `src/lib/performance-baselines-scaffold.test.ts`, `src/lib/reactions-worker-scaffold.test.ts` |
| Operator docs | `workers/reactions/README.md`, `docs/baselines/README.md` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 66 deferred items + competitive audit | ✅ |
| 2 | Deploy workflow runs contract tests before Wrangler | ✅ |
| 3 | Deploy workflow parses worker URL and runs `reactions:smoke` | ✅ |
| 4 | `reactions-health.yml` skips gracefully when secret unset | ✅ |
| 5 | `lint:performance-baselines` chains CrUX + GSC validators | ✅ |
| 6 | `lint:all-baselines` includes performance guard | ✅ |
| 7 | Static export — no new API routes on site | ✅ |
| 8 | Scaffold tests cover performance + reactions workflows | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | `npm run lint:performance-baselines` + `npm run lint:all-baselines` | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:performance-baselines
npm run lint:all-baselines
npm run build
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Reactions deploy smoke | `GET /health` → 200 after Wrangler deploy |
| Reactions weekly health | Smoke passes when `REACTIONS_API_URL` configured |
| Performance baseline guards | CrUX + GSC structure pass in CI |
| Product funnel golden profiles | 100% pass in CI |
| Editorial hub golden profiles | 100% pass in CI |
