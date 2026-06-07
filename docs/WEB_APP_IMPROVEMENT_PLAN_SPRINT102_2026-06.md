# Web App Improvement Plan — Sprint 102 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-cf56`  
**Baseline:** Sprint 101 — catalog string editorial exit CI + e2e completion (PR #249).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 102 response |
|------------|---------------------------|---------------------|
| **Wirecutter** | Every commercial pick links to editorial depth with consistent CTA labelling | ✅ `commercial-string-queries.json` golden profiles + link-label guard |
| **Tennis Warehouse** | Category browse and buying guides agree on editorial exit per SKU | ✅ Cross-surface parity test (catalog ↔ commercial string baselines) |
| **RTINGS** | CI guards every high-traffic regression surface | ✅ `lint:catalog-string-baseline`, `lint:commercial-string-baseline`, `lint:tier4-image-baseline` wired into CI |
| **RacketGuide** | Baseline-driven Playwright smoke reads committed golden profiles | ✅ `commercial-string-baseline-smoke.spec.ts` |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, 56 review-map golden profiles, 17/17 commercial image CI, 9 PDP e2e profiles, 6 catalog string golden profiles.

---

## 2. Top 5 gaps (Sprint 102)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Commercial string picks lack golden-profile JSON guard** | Sprint 100–101 guarded PDP + catalog but `/best/strings/` relied on hardcoded e2e only | ✅ `commercial-string-queries.json` + `lint:commercial-string-baseline` |
| 2 | **Catalog/commercial string parity unasserted** | Browse and buying-guide surfaces could diverge on href/kind | ✅ Cross-surface parity unit test |
| 3 | **Sprint 101 baseline guards not in CI workflow** | `catalog-string-baseline` + `tier4-image-baseline` only ran via vitest/editorial aggregate | ✅ Individual CI steps in `.github/workflows/ci.yml` |
| 4 | **HelpfulReaction production wiring** | Social proof counts still local-only without owner secret | ⏳ Owner: set `REACTIONS_API_URL` + run wire workflow |
| 5 | **Dedicated Yonex string review ingestion** | Five Yonex picks still exit to multi-SKU guide | ⏳ No source markdown in repo — deferred to content sprint |

**Deferred (Sprint 103+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX/GSC CSV metrics.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Commercial string golden profiles (6 rows) | `docs/baselines/commercial-string-queries.json` |
| Baseline validator + unit tests | `src/lib/commercial-string-baseline.ts`, `src/lib/commercial-string-baseline.test.ts` |
| CI lint script | `scripts/commercial-string-baseline.mjs`, `package.json`, `scripts/editorial-baselines.mjs` |
| Baseline-driven commercial string e2e | `e2e/commercial-string-baseline-smoke.spec.ts` |
| CI workflow parity | `.github/workflows/ci.yml` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 101 deferred items + competitive audit | ✅ |
| 2 | All six string picks on `/best/strings/` in commercial baseline | ✅ |
| 3 | L69 baseline row uses `expectKind: review` + `Read full review →` label | ✅ |
| 4 | Five Yonex rows use `expectKind: guide` + `Read string guide →` label | ✅ |
| 5 | Catalog and commercial baselines agree on href/kind per productId | ✅ |
| 6 | PDP golden profiles unchanged — no new PDP rows | ✅ |
| 7 | `minMappedE2eGuards: 56` unchanged | ✅ |
| 8 | HelpfulReaction owner secret assessed — blocked on repo secret | ✅ deferred |
| 9 | Yonex string review ingestion assessed — no source markdown | ✅ deferred |
| 10 | `npm test` + baselines + `npm run build` pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:catalog-string-baseline
npm run lint:commercial-string-baseline
npm run lint:tier4-image-baseline
npm run lint:editorial-baselines
npm run build
npx playwright test e2e/commercial-string-baseline-smoke.spec.ts e2e/catalog-string-baseline-smoke.spec.ts
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Mapped review e2e golden profiles | 56 (unchanged) |
| Explainer slug golden profiles | 13/13 (unchanged) |
| Commercial landings under image CI | 17/17 (unchanged) |
| PDP golden profiles with e2e | 9 (unchanged) |
| Catalog string golden profiles | 6 (unchanged) |
| Commercial string golden profiles | 6 (new) |
| CI editorial string guards | catalog + commercial + tier-4 image |
