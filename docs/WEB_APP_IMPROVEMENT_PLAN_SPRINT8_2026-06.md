# Web App Improvement Plan — Sprint 8 (June 2026)

**Branches:** #130 claims registry, #141 map 86% + canonical ranking, #146 PDP e2e + mobile static search  
**Baseline:** Sprint 7 on `main` (PR #138 PDP-lite; PR #135 search excerpts).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 8 response |
|------------|---------------------------|-------------------|
| **Wirecutter / RTINGS** | Product schema + methodology | ✅ Map **86%** (#141); ✅ `/data/` claims (#130) |
| **Tennis Warehouse** | PDP per SKU | ✅ PDP-lite (#138); ✅ PDP e2e (#146) |
| **RacketGuide** | Long-tail landings | ✅ “Balanced” → all-round hub keywords (#141) |
| **Retailer finders** | Mobile search | ✅ Static search in mobile nav (#146) |
| **YouTube reviewers** | Video evidence | ⏳ `VideoObject` deferred |

**Moat:** transparent fit score, claims CI, static export, postbuild SEO gate.

---

## 2. Top 5 gaps (Sprint 8 — closed)

| # | Gap | Delivery |
|---|-----|----------|
| 1 | Product map below 85% | ✅ #141 → 86% (126/146) |
| 2 | No PDP/catalog e2e | ✅ #146 `e2e/pdp-smoke.spec.ts` |
| 3 | Mobile nav search needs hydration | ✅ #146 `SiteSearchFormStatic` |
| 4 | Claims transparency | ✅ #130 `/data/` registry |
| 5 | HelpfulReaction public counts | ⏳ Workers/KV deploy |

---

## 3. Execution summary

| Item | PR |
|------|-----|
| Map +9, canonical ranking, audit `--min-coverage=85` | #141 |
| Claims registry | #130 |
| PDP e2e, mobile static search | #146 |

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 7 deferrals | ✅ |
| 2 | PDP e2e (`yy-nanoray-light-70i`) | ✅ #146 |
| 3 | Map ids valid; coverage ≥85% | ✅ #141 |
| 4 | Mobile search native submit | ✅ #146 |
| 5 | Static export safe | ✅ |
| 6–8 | `npm test`, `lint`, `build` | ✅ CI |
| 9 | `audit-review-product-map.mjs --min-coverage=85` | ✅ |
| 10 | Lighthouse PDP URL | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npm run test:e2e
node scripts/audit-review-product-map.mjs --min-coverage=85
```

---

## 6. Deferred (Sprint 9+)

- HelpfulReaction Workers/KV + `NEXT_PUBLIC_REACTIONS_API_URL`
- Original `public/products/` photography
- GSC/CrUX CSV baselines
- E2E for `/saved/`, `/compare/`
