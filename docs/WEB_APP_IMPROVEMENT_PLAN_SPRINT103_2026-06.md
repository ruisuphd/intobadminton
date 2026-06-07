# Web App Improvement Plan — Sprint 103 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-983f`  
**Baseline:** Sprint 102 — commercial string golden-profile CI + CI workflow parity (PR #250).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 103 response |
|------------|---------------------------|---------------------|
| **Tennis Warehouse** | PDP, category browse, and buying guides agree on editorial exit per SKU | ✅ Three-way string parity guard (PDP ↔ catalog ↔ commercial) |
| **Wirecutter** | Every commercial pick has a matching PDP depth link | ✅ L69 PDP golden profile completes six-SKU string corpus |
| **RTINGS** | Cross-surface regression guards on high-traffic categories | ✅ `lint:string-editorial-parity` + aggregate `lint:string-editorial-baselines` |
| **RacketGuide** | Baseline-driven PDP e2e reads committed golden profiles | ✅ L69 added to `pdp-queries.json` with `e2e: true` |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, 56 review-map golden profiles, 17/17 commercial image CI, 10 PDP e2e profiles, 6 catalog + 6 commercial string golden profiles.

---

## 2. Top 5 gaps (Sprint 103)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **L69 PDP golden profile missing** | Catalog + commercial guarded L69 but PDP baseline only covered five Yonex strings | ✅ `pdp-review-ln-l69` row in `pdp-queries.json` |
| 2 | **PDP/catalog/commercial string parity unasserted** | Sprint 102 guarded catalog ↔ commercial only; PDP could diverge | ✅ `string-editorial-parity.ts` three-way unit guard |
| 3 | **No unified string editorial lint command** | Operators ran three separate scripts for string CI | ✅ `lint:string-editorial-baselines` aggregate |
| 4 | **HelpfulReaction production wiring** | Social proof counts still local-only without owner secret | ⏳ Owner: set `REACTIONS_API_URL` + run wire workflow |
| 5 | **Dedicated Yonex string review ingestion** | Five Yonex picks still exit to multi-SKU guide | ⏳ No source markdown in repo — deferred to content sprint |

**Deferred (Sprint 104+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX/GSC CSV metrics.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| L69 PDP golden profile | `docs/baselines/pdp-queries.json` |
| Three-way parity evaluator + tests | `src/lib/string-editorial-parity.ts`, `src/lib/string-editorial-parity.test.ts` |
| CI lint scripts | `scripts/string-editorial-parity.mjs`, `scripts/string-editorial-baselines.mjs`, `package.json` |
| CI workflow step | `.github/workflows/ci.yml` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 102 deferred items + competitive audit | ✅ |
| 2 | All six string productIds in catalog + commercial baselines | ✅ |
| 3 | All six string productIds have PDP `expectCategory: string` rows | ✅ |
| 4 | L69 PDP row uses `expectKind: review` + `li-ning-l69-string-review` slug | ✅ |
| 5 | Five Yonex PDP rows use `expectKind: guide` + `badminton-string-selector` slug | ✅ |
| 6 | Three-way parity agrees on slug/kind per productId | ✅ |
| 7 | `minMappedE2eGuards: 56` unchanged | ✅ |
| 8 | HelpfulReaction owner secret assessed — blocked on repo secret | ✅ deferred |
| 9 | Yonex string review ingestion assessed — no source markdown | ✅ deferred |
| 10 | `npm test` + baselines + `npm run build` pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:string-editorial-baselines
npm run lint:pdp-baseline
npm run build
npx playwright test e2e/pdp-baseline-smoke.spec.ts
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Mapped review e2e golden profiles | 56 (unchanged) |
| Explainer slug golden profiles | 13/13 (unchanged) |
| Commercial landings under image CI | 17/17 (unchanged) |
| PDP golden profiles with e2e | 10 (was 9) |
| Catalog string golden profiles | 6 (unchanged) |
| Commercial string golden profiles | 6 (unchanged) |
| String editorial three-way parity | 6/6 SKUs |
