# Web App Improvement Plan — Sprint 113 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-122a`  
**Baseline:** Sprint 112 — catalog-racket e2e completion + commercial e2e guards + homepage discovery parity (PR #261).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 113 response |
|------------|---------------------------|---------------------|
| **Tennis Warehouse** | Filter-first catalog exits guarded per category | ✅ `minE2eGuards` on all 6 catalog category baselines |
| **RacketGuide-style finders** | Keyword search regression on spec tokens | ✅ 9/9 catalog-keyword golden queries with e2e |
| **RTINGS** | E2e counts can shrink silently post-Sprint 112 | ✅ `minE2eGuards` on catalog-keyword baseline |
| **Wirecutter** | Review hub + tools in CWV priority set | ✅ `/review/` + `/tools/string-tension-calculator/` in CrUX template |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v32, 20/20 commercial image CI, 80/80 all-category editorial parity, 82 PDP e2e guards, 124 catalog e2e guards (44 racket + 80 accessory).

---

## 2. Top 5 gaps (Sprint 113)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **5 catalog category baselines lack minE2eGuards** | Shoe/string/shuttle/grip/bag e2e can shrink silently | ✅ `minE2eGuards` on 5 remaining catalog baselines (36 guards) |
| 2 | **6/9 catalog-keyword queries lack e2e** | Filter-first search regression on spec/brand tokens | ✅ e2e on all 9 keyword golden queries (3→9) |
| 3 | **No CI guard on catalog-keyword e2e count** | Keyword e2e can shrink post-Sprint 112 | ✅ `minE2eGuards: 9` on catalog-keyword baseline |
| 4 | **Review hub + flagship tool missing from CrUX** | CWV/offline recovery gap on discovery + tools | ✅ CrUX template + offline recovery + lighthouse baseline |
| 5 | **Sprint 112 deferred items assessed** | YouTube sameAs, HelpfulReaction, string hands-on, images | ✅ assessed — blocked on owner channel/secret/API key |

**Deferred (Sprint 114+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX CSV cells (owner runs `capture:crux-psi` with API key); HelpfulReaction production wiring.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Catalog category e2e guards | `docs/baselines/catalog-{shoe,string,shuttle,grip,bag}-queries.json`, `src/lib/catalog-*-baseline.ts` |
| Catalog-keyword e2e completion | `docs/baselines/catalog-keyword-queries.json`, `src/lib/catalog-baseline.ts` |
| CrUX expansion | `docs/baselines/crux-template.csv`, `src/lib/offline-recovery-paths.ts`, `lighthouserc-baseline.json`, `docs/baselines/lighthouse-scores.json` |
| Documentation | this file, master plan addendum |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 112 deferred items + competitive audit | ✅ |
| 2 | All 36 non-racket catalog golden profiles have `e2e: true` | ✅ |
| 3 | `minE2eGuards` on all 6 catalog category baselines (80 total) | ✅ |
| 4 | All 9 catalog-keyword golden queries have `e2e: true` | ✅ |
| 5 | `minE2eGuards: 9` enforced on catalog-keyword baseline | ✅ |
| 6 | CrUX template includes `/review/` + `/tools/string-tension-calculator/` | ✅ |
| 7 | `CRUX_OFFLINE_RECOVERY_PATHS` matches crux-template (excl. homepage) | ✅ |
| 8 | Lighthouse baseline config + scores include new CrUX paths | ✅ |
| 9 | HelpfulReaction / VideoObject / YouTube sameAs assessed — unchanged waivers | ✅ deferred |
| 10 | `npm test` + baselines + `npm run build` pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:catalog-shoe-baseline
npm run lint:catalog-string-baseline
npm run lint:catalog-baseline
npm run lint:crux-baseline
npm run lint:lighthouse:baseline
npm run build
npx playwright test e2e/catalog-baseline-smoke.spec.ts
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Catalog category e2e golden profiles | 80 (44 racket + 36 accessory) |
| Catalog category `minE2eGuards` baselines | 6/6 |
| Catalog-keyword e2e golden queries | 9 (was 3) |
| CrUX-priority non-home paths | 31 (+2 review hub + tension calculator) |
| Commercial e2e golden profiles | 80/80 (unchanged) |
| PDP e2e golden profiles | 82 (unchanged) |
