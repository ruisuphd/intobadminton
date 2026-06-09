# Web App Improvement Plan — Sprint 120 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-478b`  
**Baseline:** Sprint 119 — trust-path e2e expansion + commercial CrUX expansion (PR #268).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 120 response |
|------------|---------------------------|---------------------|
| **Wirecutter / RTINGS** | Full editorial team index in CWV monitoring | ✅ `/authors/` in crux-template + trust-path e2e |
| **Wirecutter** | Methodology page browser-guarded | ✅ `/methodology/` in trust-path e2e (already in CrUX) |
| **Tennis Warehouse** | Support/contact page in performance set | ✅ `/contact/` in crux-template + trust-path e2e |
| **Tennis Warehouse** | All brand hubs (tier-2/4) in CWV monitoring | ✅ `/brands/kumpoo/`, `/brands/kawasaki/`, `/brands/anta/` in crux-template |
| **Google AdSense / publisher policy** | Privacy + terms in CWV set for compliance pages | ✅ `/privacy/` + `/terms/` in crux-template |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v32, 20/20 commercial image CI, 80/80 all-category editorial parity, 82 PDP e2e guards, 124 catalog e2e guards, 6 finder e2e guards, 4 discovery-parity e2e guards, 4 results-url e2e guards, 4 compare-share e2e guards.

---

## 2. Top 5 gaps (Sprint 120)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Authors hub missing from CrUX** | Editorial team index absent from CWV monitoring | ✅ `/authors/` in crux-template (+ offline recovery + lighthouse baseline + trust-path e2e) |
| 2 | **Contact page missing from CrUX** | Support trust path absent from CWV monitoring | ✅ `/contact/` in crux-template (+ offline recovery + lighthouse baseline + trust-path e2e) |
| 3 | **Tier-2/4 brand hubs missing from CrUX** | Kumpoo/Kawasaki/Anta e2e-guarded but not in CWV set | ✅ all three in crux-template (+ offline recovery + lighthouse baseline) |
| 4 | **Compliance pages missing from CrUX** | Privacy/terms absent from CWV monitoring (AdSense policy) | ✅ `/privacy/` + `/terms/` in crux-template (+ offline recovery + lighthouse baseline) |
| 5 | **No CI guard on expanded trust-path e2e** | Authors/methodology/contact lack trust-path `minE2eGuards` | ✅ `trust-path-queries.json` + `minE2eGuards: 9` |

**Deferred (Sprint 121+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX CSV cells (owner runs `capture:crux-psi` with API key); HelpfulReaction production wiring.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Trust-path e2e expansion | `docs/baselines/trust-path-queries.json`, `src/lib/trust-path-baseline.ts`, `src/lib/trust-path-baseline.test.ts` |
| CrUX brand + compliance + support expansion | `docs/baselines/crux-template.csv`, `src/lib/offline-recovery-paths.ts`, `lighthouserc-baseline.json`, `docs/baselines/lighthouse-scores.json` |
| Documentation | this file, master plan addendum |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 119 deferred items + competitive audit | ✅ |
| 2 | All 9 trust-path golden profiles have `e2e: true` | ✅ |
| 3 | `minE2eGuards: 9` enforced on trust-path baseline | ✅ |
| 4 | CrUX template includes `/authors/`, `/contact/`, tier-2/4 brand hubs, `/privacy/`, `/terms/` | ✅ |
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
| Trust-path e2e golden profiles | 9 (was 6) |
| Trust-path `minE2eGuards` | 9 |
| CrUX-priority non-home paths | 58 (+7 authors, contact, 3 brand hubs, privacy, terms) |
| Discovery-parity e2e golden pairs | 4 (unchanged) |
| Home `minE2eGuards` | 1 (unchanged) |
| Finder e2e golden profiles | 6 (unchanged) |
| Catalog e2e golden profiles | 124 (unchanged) |
| PDP e2e golden profiles | 82 (unchanged) |
