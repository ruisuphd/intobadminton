# Web App Improvement Plan — Sprint 121 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-23ea`  
**Baseline:** Sprint 120 — trust-path e2e completion + brand/compliance CrUX expansion (PR #269).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 121 response |
|------------|---------------------------|---------------------|
| **Wirecutter / RTINGS** | Privacy + cookie CMP pages browser-guarded | ✅ `/privacy/`, `/terms/`, `/cookies/`, `/privacy-choices/` in trust-path e2e |
| **Google AdSense / publisher policy** | Cookie + privacy-choice pages in CWV monitoring | ✅ `/cookies/` + `/privacy-choices/` in crux-template |
| **Tennis Warehouse** | Wishlist/compare retention paths in performance set | ✅ `/saved/` + `/compare/` in crux-template |
| **Tennis Warehouse** | Compliance pages regression-guarded end-to-end | ✅ trust-path e2e 9→13; `minE2eGuards: 13` |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v32, 20/20 commercial image CI, 80/80 all-category editorial parity, 82 PDP e2e guards, 124 catalog e2e guards, 6 finder e2e guards, 4 discovery-parity e2e guards, 4 results-url e2e guards, 4 compare-share e2e guards.

---

## 2. Top 5 gaps (Sprint 121)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Privacy/terms in CrUX but not trust-path e2e** | AdSense compliance pages lack browser regression guards | ✅ `/privacy/` + `/terms/` in trust-path e2e (`minE2eGuards: 13`) |
| 2 | **Cookie policy missing from CrUX** | Consent Mode CMP page absent from CWV monitoring | ✅ `/cookies/` in crux-template (+ offline recovery + lighthouse baseline + trust-path e2e) |
| 3 | **Privacy choices missing from CrUX** | Do-not-sell / ad personalization controls absent from CWV set | ✅ `/privacy-choices/` in crux-template (+ offline recovery + lighthouse baseline + trust-path e2e) |
| 4 | **Saved/compare retention paths missing from CrUX** | Return-visit hooks not in CWV monitoring | ✅ `/saved/` + `/compare/` in crux-template (+ offline recovery + lighthouse baseline) |
| 5 | **No CI guard on expanded compliance trust-path e2e** | Cookie/privacy pages lack `minE2eGuards` | ✅ `trust-path-queries.json` + `minE2eGuards: 13` |

**Deferred (Sprint 122+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX CSV cells (owner runs `capture:crux-psi` with API key); HelpfulReaction production wiring.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Compliance trust-path e2e completion | `docs/baselines/trust-path-queries.json`, `src/lib/trust-path-baseline.ts`, `src/lib/trust-path-baseline.test.ts` |
| CrUX compliance + retention expansion | `docs/baselines/crux-template.csv`, `src/lib/offline-recovery-paths.ts`, `lighthouserc-baseline.json`, `docs/baselines/lighthouse-scores.json` |
| Documentation | this file, master plan addendum |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 120 deferred items + competitive audit | ✅ |
| 2 | All 13 trust-path golden profiles have `e2e: true` | ✅ |
| 3 | `minE2eGuards: 13` enforced on trust-path baseline | ✅ |
| 4 | CrUX template includes `/cookies/`, `/privacy-choices/`, `/saved/`, `/compare/` | ✅ |
| 5 | `CRUX_OFFLINE_RECOVERY_PATHS` matches crux-template (excl. homepage) | ✅ |
| 6 | Lighthouse baseline config + scores include new CrUX paths | ✅ |
| 7 | HelpfulReaction / VideoObject / YouTube sameAs assessed — unchanged waivers | ✅ deferred |
| 8 | Site-search product-intent queries assessed — remain in discovery-parity layer | ✅ by design |
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
| Trust-path e2e golden profiles | 13 (was 9) |
| Trust-path `minE2eGuards` | 13 |
| CrUX-priority non-home paths | 62 (+4 cookies, privacy-choices, saved, compare) |
| Discovery-parity e2e golden pairs | 4 (unchanged) |
| Home `minE2eGuards` | 1 (unchanged) |
| Finder e2e golden profiles | 6 (unchanged) |
| Catalog e2e golden profiles | 124 (unchanged) |
| PDP e2e golden profiles | 82 (unchanged) |
