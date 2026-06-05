# Web App Improvement Plan — Sprint 6 (June 2026)

**Branches:** Multiple parallel sprints merged to `main` — #127 catalog/compare, #129 reactions, #134 fuzzy search, #130 `/data/`, #137 compare/PWA e2e  
**Baseline:** Sprint 5 on `main` (PR #116 — programmatic best pages, glossary autolink).

---

## 2. Top 5 gaps (combined Sprint 6)

| # | Gap | Status |
|---|-----|--------|
| 1 | No public claims transparency page | ✅ `/data/` (#130) |
| 2 | Site search typo tolerance | ✅ `search-fuzzy.ts` (#134) |
| 3 | Programmatic `/best/*` coverage | ✅ Multiple PRs |
| 4 | Catalog save/compare funnel | ✅ #127 |
| 5 | HelpfulReaction aggregate counts | ⏳ Workers/KV backend |

---

## 3. PR #137 follow-up

| Deliverable | Files |
|-------------|-------|
| Compare share-link hydration fix | `ProfileContext.tsx`, `compare/page.tsx` |
| Compare row winner highlight | `CompareTable.tsx` |
| PWA manifest shortcuts | `public/manifest.webmanifest` |
| Retention-flow e2e | `e2e/catalog-compare-saved-smoke.spec.ts` |

---

## 4. Deferred (Sprint 7+)

See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT7_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT7_2026-06.md).
