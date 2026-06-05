# Web App Improvement Plan — Sprint 9 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-f1fa` (PR #143)  
**Baseline:** Sprint 8 on `main` (PR #130 — `/data/` claims registry; PR #138 — PDP-lite product pages).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / response |
|------------|---------------------------|----------------|
| **Wirecutter / RTINGS** | Product schema on ~90%+ review URLs; aggregate helpful votes | ✅ Map **87%**; reactions Worker ready |
| **Tennis Warehouse** | Sharable filtered URLs + spec compare | ✅ `ShareResultsLink` on `/results/` |
| **RacketGuide / affiliate roundups** | Long-tail landings | ✅ Programmatic `/best/*` on main |
| **BadmintonCentral** | Forum search depth | ✅ Per-section review search snippets |
| **Brand PDPs / YouTube** | Original photography, video | ⏳ Editorial pipeline |

---

## 2. Top 5 gaps (Sprint 9)

| # | Gap | Impact | Sprint 9 |
|---|-----|--------|----------|
| 1 | **Product map below 85%** | Rich-result coverage | ✅ 127/146 (87%) |
| 2 | **Review body search not e2e-verified** | Regression risk | ✅ Playwright `BG80` smoke |
| 3 | **No results share affordance** | Coach/partner sharing | ✅ `ShareResultsLink` |
| 4 | **RSS not in `<head>` alternates** | Aggregator discovery | ✅ `layout.tsx` |
| 5 | **Original photos / video schema** | AdSense signal | ⏳ Editorial |

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Product map ≥85% | `blog-review-product-map.json` |
| Per-section search snippets | `site-search.ts` (`reviewSectionSnippets`) |
| Results share link | `ShareResultsLink.tsx`, `ResultsClient.tsx` |
| RSS discovery | `layout.tsx` |
| E2E smoke | `results-share-smoke.spec.ts`, `search-smoke.spec.ts` |

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 audit + Sprint 8 deferred | ✅ |
| 2 | Map entries reference valid product ids | ✅ |
| 3 | Evergreen guides remain unmapped | ✅ |
| 4 | `BG80` → L69 in unit + e2e | ✅ |
| 5 | Share link uses `profileToResultsPath` | ✅ |
| 6 | Static export safe | ✅ |
| 7 | `npm test` (247) | ✅ |
| 8 | `npm run build` + SEO audit | ✅ |
| 9 | Map ≥85% | ✅ (87%) |
| 10 | No duplicate Sprint 8 claims scope | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
node scripts/audit-review-product-map.mjs
```
