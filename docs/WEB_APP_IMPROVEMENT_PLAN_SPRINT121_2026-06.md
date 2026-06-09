# Web App Improvement Plan — Sprint 121 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-89f7`  
**Baseline:** Sprint 120 — trust-path e2e completion + brand/compliance CrUX expansion (PR #269).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 121 response |
|------------|---------------------------|---------------------|
| **Wirecutter / NYT** | Cookie + privacy choice pages in CWV monitoring | ✅ `/cookies/` + `/privacy-choices/` in crux-template + trust-path e2e |
| **RTINGS** | Security / vulnerability disclosure page | ✅ `/security/` in crux-template + trust-path e2e |
| **Tennis Warehouse** | Research / buying-guide methodology transparency | ✅ `/research/` in crux-template + trust-path e2e |
| **Wirecutter** | "Recently updated" editorial freshness feed | ✅ `/updates/` in crux-template + trust-path e2e |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v32, 20/20 commercial image CI, 80/80 all-category editorial parity, 82 PDP e2e guards, 124 catalog e2e guards, 9 trust-path e2e guards (expanding to 14).

---

## 2. Top 5 gaps (Sprint 121)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Cookie policy missing from CrUX** | AdSense / Consent Mode compliance page absent from CWV monitoring | ✅ `/cookies/` in crux-template (+ offline recovery + lighthouse baseline + trust-path e2e) |
| 2 | **Security page missing from CrUX** | Vulnerability-reporting trust path absent from CWV monitoring | ✅ `/security/` in crux-template (+ offline recovery + lighthouse baseline + trust-path e2e) |
| 3 | **Privacy choices missing from CrUX** | GDPR/CCPA consent UI absent from CWV monitoring | ✅ `/privacy-choices/` in crux-template (+ offline recovery + lighthouse baseline + trust-path e2e) |
| 4 | **Research page missing from CrUX** | Market-research transparency absent from CWV monitoring | ✅ `/research/` in crux-template (+ offline recovery + lighthouse baseline + trust-path e2e) |
| 5 | **Updates feed missing from CrUX + trust-path e2e** | Editorial freshness feed absent from CWV monitoring and trust-path CI | ✅ `/updates/` in crux-template (+ offline recovery + lighthouse baseline + trust-path e2e) |

**Deferred (Sprint 122+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX CSV cells (owner runs `capture:crux-psi` with API key); HelpfulReaction production wiring.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Trust-path e2e expansion | `docs/baselines/trust-path-queries.json`, `src/lib/trust-path-baseline.ts` |
| CrUX compliance + transparency expansion | `docs/baselines/crux-template.csv`, `src/lib/offline-recovery-paths.ts`, `lighthouserc-baseline.json`, `docs/baselines/lighthouse-scores.json` |
| Documentation | this file, master plan addendum |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 120 deferred items + competitive audit | ✅ |
| 2 | All 14 trust-path golden profiles have `e2e: true` | ✅ |
| 3 | `minE2eGuards: 14` enforced on trust-path baseline | ✅ |
| 4 | CrUX template includes `/cookies/`, `/security/`, `/privacy-choices/`, `/research/`, `/updates/` | ✅ |
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
| Trust-path e2e golden profiles | 14 (was 9) |
| Trust-path `minE2eGuards` | 14 |
| CrUX-priority non-home paths | 63 (+5 cookies, security, privacy-choices, research, updates) |
| Discovery-parity e2e golden pairs | 4 (unchanged) |
| Home `minE2eGuards` | 1 (unchanged) |
| Finder e2e golden profiles | 6 (unchanged) |
| Catalog e2e golden profiles | 124 (unchanged) |
| PDP e2e golden profiles | 82 (unchanged) |
