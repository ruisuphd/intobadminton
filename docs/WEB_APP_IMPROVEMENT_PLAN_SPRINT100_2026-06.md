# Web App Improvement Plan — Sprint 100 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-32cb`  
**Baseline:** Sprint 99 — PDP guide-kind CI + catalog string explainer exits (PR #247 merged).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 100 response |
|------------|---------------------------|---------------------|
| **Tennis Warehouse** | Every string SKU row in category browse links to a buying guide | ✅ Catalog e2e for BG80 + EXBOLT guide exits (BG65 shipped Sprint 99) |
| **RTINGS** | Product pages consistently label guide vs review exits | ✅ PDP `expectReviewKind: guide` golden profiles for all five Yonex string SKUs |
| **Wirecutter** | Commercial comparison tables wire every pick to editorial depth | ✅ `/best/strings/` e2e for all five Yonex guide CTAs (was 2/5) |
| **RacketGuide** | Filter browse deep-links to nearest editorial depth | ✅ Catalog + PDP parity for tournament-tier strings |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, 56 review-map golden profiles, 17/17 commercial image CI.

---

## 2. Top 5 gaps (Sprint 100)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Only BG65 has PDP guide-kind golden profile** | Sprint 99 proved the guard but left four Yonex strings unguarded | ✅ BG80, EXBOLT, Aerobite, BG80 Power PDP baselines + e2e |
| 2 | **Commercial string explainer e2e incomplete (2/5)** | `/best/strings/` BG80, Aerobite, BG80 Power lacked Playwright smoke | ✅ Three new commercial e2e assertions |
| 3 | **Catalog string guide exit only tested for BG65** | Tournament-tier strings could regress to bare PDP links | ✅ Catalog e2e for BG80 + EXBOLT |
| 4 | **HelpfulReaction production wiring** | Social proof counts still local-only without owner secret | ⏳ Owner: set `REACTIONS_API_URL` + run wire workflow |
| 5 | **Tier-4 / Nanoray Light 70i verified imagery** | Four commercial landings still on honest waivers | ⏳ Western distributor image hunt deferred |

**Deferred (Sprint 101+):** dedicated Yonex string review ingestion; YouTube `sameAs`; `VideoObject` schema; fill CrUX/GSC CSV metrics; tier-4 Western distributor image backfill.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Four new string PDP guide-kind golden profiles | `docs/baselines/pdp-queries.json` |
| Commercial string explainer e2e (5/5 Yonex) | `e2e/review-consolidation.spec.ts` |
| Catalog string guide e2e (BG80, EXBOLT) | `e2e/pdp-smoke.spec.ts` |
| Explainer slug unit coverage | `src/lib/pdp-baseline.test.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 99 deferred items + competitive audit | ✅ |
| 2 | All five `PRODUCT_REVIEW_EXPLAINER_ALIASES` string ids have PDP baselines | ✅ |
| 3 | `expectReviewKind: guide` on every string explainer PDP profile | ✅ |
| 4 | Commercial e2e covers BG65, BG80, EXBOLT, Aerobite, BG80 Power | ✅ |
| 5 | L69 commercial e2e unchanged — still `Read full review →` | ✅ |
| 6 | Catalog BG65 regression test preserved | ✅ |
| 7 | `minMappedE2eGuards: 56` unchanged — no new review-map profiles | ✅ |
| 8 | HelpfulReaction owner secret assessed — blocked on repo secret | ✅ deferred |
| 9 | Grip baseline (`yy-ac102c`) unchanged — no review slug | ✅ |
| 10 | `npm test` + baselines + `npm run build` pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:pdp-baseline
npm run build
npx playwright test e2e/pdp-smoke.spec.ts e2e/pdp-baseline-smoke.spec.ts e2e/review-consolidation.spec.ts
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Mapped review e2e golden profiles | 56 (unchanged) |
| Explainer slug golden profiles | 13/13 (unchanged) |
| Commercial landings under image CI | 17/17 (unchanged) |
| PDP golden profiles with e2e | 9 (was 5) |
| String explainer alias pairs | 5 (unchanged) |
| Commercial string guide e2e coverage | 5/5 Yonex picks |
