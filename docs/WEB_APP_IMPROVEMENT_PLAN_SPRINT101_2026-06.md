# Web App Improvement Plan — Sprint 101 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-d181`  
**Baseline:** Sprint 100 — full string explainer CI coverage across PDP, catalog, and commercial (PR #248 merged).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 101 response |
|------------|---------------------------|---------------------|
| **Tennis Warehouse** | Every string SKU row in category browse links to editorial depth | ✅ Catalog string golden-profile CI for all five Yonex guide exits + L69 review |
| **RTINGS** | Consistent guide vs review labelling across browse surfaces | ✅ `expectKind` on catalog string baseline rows |
| **Wirecutter** | Commercial + catalog parity on editorial exits | ✅ Catalog e2e 3/5 → 6/6 string rows (5 Yonex + L69) |
| **RacketGuide** | Filter browse regression guards on high-traffic categories | ✅ New `catalog-string-queries.json` in editorial baseline suite |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, 56 review-map golden profiles, 17/17 commercial image CI, 9 PDP e2e profiles.

---

## 2. Top 5 gaps (Sprint 101)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Catalog string guide e2e incomplete (3/5 Yonex)** | Sprint 100 left Aerobite + BG80 Power catalog exits untested | ✅ Two new pdp-smoke e2e + baseline-driven smoke spec |
| 2 | **No catalog-string golden-profile CI guard** | PDP and commercial guarded but catalog href resolution unguarded | ✅ `catalog-string-queries.json` + `lint:catalog-string-baseline` |
| 3 | **L69 catalog review exit untested** | Only commercial e2e covered dedicated string review | ✅ Catalog e2e + baseline row for L69 |
| 4 | **HelpfulReaction production wiring** | Social proof counts still local-only without owner secret | ⏳ Owner: set `REACTIONS_API_URL` + run wire workflow |
| 5 | **Dedicated Yonex string review ingestion** | Five Yonex picks still exit to multi-SKU guide | ⏳ No source markdown in repo — deferred to content sprint |

**Deferred (Sprint 102+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX/GSC CSV metrics.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Catalog string golden profiles (6 rows) | `docs/baselines/catalog-string-queries.json` |
| Baseline validator + unit tests | `src/lib/catalog-string-baseline.ts`, `src/lib/catalog-string-baseline.test.ts` |
| CI lint script | `scripts/catalog-string-baseline.mjs`, `package.json`, `scripts/editorial-baselines.mjs` |
| Baseline-driven catalog string e2e | `e2e/catalog-string-baseline-smoke.spec.ts` |
| Legacy catalog string e2e completion | `e2e/pdp-smoke.spec.ts` |
| `catalogProductHref` unit coverage | `src/lib/review-pages.test.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 100 deferred items + competitive audit | ✅ |
| 2 | All five `PRODUCT_REVIEW_EXPLAINER_ALIASES` string ids in catalog baseline | ✅ |
| 3 | L69 baseline row uses `expectKind: review` | ✅ |
| 4 | Catalog e2e covers BG65, BG80, EXBOLT, Aerobite, BG80 Power, L69 | ✅ |
| 5 | PDP golden profiles unchanged — no new PDP rows | ✅ |
| 6 | `minMappedE2eGuards: 56` unchanged | ✅ |
| 7 | Commercial string e2e unchanged from Sprint 100 | ✅ |
| 8 | HelpfulReaction owner secret assessed — blocked on repo secret | ✅ deferred |
| 9 | Yonex string review ingestion assessed — no source markdown | ✅ deferred |
| 10 | `npm test` + baselines + `npm run build` pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:catalog-string-baseline
npm run lint:pdp-baseline
npm run build
npx playwright test e2e/pdp-smoke.spec.ts e2e/catalog-string-baseline-smoke.spec.ts
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Mapped review e2e golden profiles | 56 (unchanged) |
| Explainer slug golden profiles | 13/13 (unchanged) |
| Commercial landings under image CI | 17/17 (unchanged) |
| PDP golden profiles with e2e | 9 (unchanged) |
| Catalog string golden profiles | 6 (new) |
| Catalog string e2e coverage | 6/6 guarded rows |
