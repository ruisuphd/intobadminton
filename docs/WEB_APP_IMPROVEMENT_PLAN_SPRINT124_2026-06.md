# Web App Improvement Plan — Sprint 124 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-eb38`  
**Baseline:** Sprint 123 — trust-path editorial parity + procedural-guide CrUX expansion (PR #273).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 124 response |
|------------|---------------------------|---------------------|
| **Tennis Warehouse** | Procedural racket/string education in CWV monitoring with trust-path CI | ✅ `/guides/racket-balance/`, `/guides/doubles-positioning-and-rackets/`, `/guides/string-feel-vs-durability/`, `/guides/string-tension/` in trust-path e2e |
| **Wirecutter** | Glossary and concept hubs browser-guarded on homepage popular-search | ✅ `/guides/glossary/` in trust-path e2e |
| **Tennis Warehouse** | Shoe-fit procedural education in CWV monitoring | ✅ `/guides/shoes-footwork/` in crux-template + offline recovery + lighthouse baseline |
| **RacketGuide-style finders** | Doubles roles education + interactive toolkit in CWV set | ✅ `/guides/doubles-roles/` + three `/tools/*` calculators in crux-template |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v32, 20/20 commercial image CI, 80/80 all-category editorial parity, 82 PDP e2e guards, 124 catalog e2e guards, 22 trust-path e2e guards.

---

## 2. Top 5 gaps (Sprint 124)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Procedural guides in CrUX but missing trust-path e2e** | Sprint 123 added CrUX for racket-balance, doubles-positioning, string-feel but left them without trust-path CI guard | ✅ three `/guides/*` paths in trust-path e2e (`minE2eGuards: 22`) |
| 2 | **Glossary homepage popular-search missing from trust-path e2e** | Highest-traffic concept hub absent from trust-path CI | ✅ `/guides/glossary/` in trust-path e2e |
| 3 | **String-tension procedural guide missing from trust-path e2e** | String education cluster absent from trust-path CI | ✅ `/guides/string-tension/` in trust-path e2e |
| 4 | **Shoes-footwork + doubles-roles procedural guides missing from CrUX** | Shoe-fit and doubles role education e2e-guarded but not in CWV monitoring | ✅ two `/guides/*` paths in crux-template (+ offline recovery + lighthouse baseline) |
| 5 | **Remaining toolkit calculators missing from CrUX** | Skill converter, balance explainer, court diagram e2e-guarded but not in CWV set | ✅ three `/tools/*` paths in crux-template (+ offline recovery + lighthouse baseline) |

**Deferred (Sprint 125+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX CSV cells (owner runs `capture:crux-psi`); HelpfulReaction production wiring; flagship compare-guide duel CrUX expansion.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Trust-path e2e expansion | `docs/baselines/trust-path-queries.json`, `src/lib/trust-path-baseline.ts`, `src/lib/trust-path-baseline.test.ts` |
| CrUX procedural + toolkit expansion | `docs/baselines/crux-template.csv`, `src/lib/offline-recovery-paths.ts`, `lighthouserc-baseline.json`, `docs/baselines/lighthouse-scores.json` |
| Documentation | this file, master plan addendum |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 123 deferred items + competitive audit | ✅ |
| 2 | All 22 trust-path golden profiles have `e2e: true` | ✅ |
| 3 | `minE2eGuards: 22` enforced on trust-path baseline | ✅ |
| 4 | CrUX template includes shoes-footwork, doubles-roles, three toolkit tools | ✅ |
| 5 | `CRUX_OFFLINE_RECOVERY_PATHS` matches crux-template (excl. homepage) | ✅ |
| 6 | Lighthouse baseline config + scores include new CrUX paths | ✅ |
| 7 | HelpfulReaction / VideoObject / YouTube sameAs assessed — unchanged waivers | ✅ deferred |
| 8 | Compare-guide duel CrUX expansion assessed — deferred to Sprint 125 | ✅ deferred |
| 9 | Yonex string articles / tier-4 images assessed — content deferred | ✅ deferred |
| 10 | `npm test` + baselines + `npm run build` + trust-path e2e smokes pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:trust-path-baseline
npm run lint:crux-baseline
npm run lint:lighthouse:baseline
npm run build
npx playwright test e2e/trust-path-baseline-smoke.spec.ts
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Trust-path e2e golden profiles | 22 (was 17) |
| Trust-path `minE2eGuards` | 22 |
| CrUX-priority non-home paths | 77 (+2 procedural guides + 3 toolkit tools) |
| Discovery-parity e2e golden pairs | 4 (unchanged) |
| Home `minE2eGuards` | 1 (unchanged) |
| Finder e2e golden profiles | 6 (unchanged) |
| Catalog e2e golden profiles | 124 (unchanged) |
| PDP e2e golden profiles | 82 (unchanged) |
