# Web App Improvement Plan — Sprint 6 (June 2026)

**Branches:** Multiple parallel sprints merged to `main` — `b7a9` (#134 fuzzy search), `06b6` (#129 reactions scaffold), `cc42` (#127 catalog/compare), `9a0c` (PR #130 `/data/` on branch 10b8)  
**Baseline:** Sprint 5 on `main` (PR #116 — programmatic best pages, glossary autolink).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 6 response |
|------------|---------------------------|-------------------|
| **Wirecutter / RTINGS** | Public methodology + cited specs | ✅ `/data/` claims registry (PR #140) |
| **Tennis Warehouse** | Faceted browse, long-tail landings | ✅ Catalog filters + 8+ `/best/*` pages |
| **RacketGuide** | Programmatic SEO roundups | ✅ singles, head-light, all-round, wide-feet shoes |
| **BadmintonCentral** | Community trust signals | ⏳ HelpfulReaction Workers/KV (scaffold #129) |
| **Brand PDPs** | First-party photography | ⏳ Editorial `public/products/` pipeline |

---

## 2. Top 5 gaps (combined Sprint 6)

| # | Gap | Status |
|---|-----|--------|
| 1 | No public claims transparency page | ✅ `/data/` (PR #140) |
| 2 | Site search typo tolerance | ✅ `search-fuzzy.ts` (#134) |
| 3 | Programmatic `/best/*` coverage | ✅ control, singles, head-light, all-round, wide-feet shoes |
| 4 | Catalog save/compare funnel | ✅ `CatalogProductActions` (#127) |
| 5 | HelpfulReaction aggregate counts | ⏳ Workers/KV backend |

---

## 3. Verification

```bash
npm test
npm run build
npm run lint
```

All passes ✅ — Lighthouse CI on port 4173.

---

## 4. Deferred (Sprint 7+)

See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT7_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT7_2026-06.md).
