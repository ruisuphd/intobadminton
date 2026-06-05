# Web App Improvement Plan — Sprint 8 (June 2026)

**Branches:** `main` (#130–#146 map, claims, PDP e2e); **#145** (string cluster, `/updates/`, retention shelves)  
**Baseline:** Sprint 7 on `main`.

---

## 1. Top 5 gaps

| # | Gap | Status |
|---|-----|--------|
| 1 | Product map below 85% | ✅ on `main` (#141, 86%) |
| 2 | Claims transparency | ✅ on `main` (#130 `/data/`) |
| 3 | String cluster + freshness lane | ✅ #145 |
| 4 | Review decision-path shelf | ✅ #145 |
| 5 | HelpfulReaction KV aggregates | ⏳ |

---

## 2. PR #145 execution

| Item | Files |
|------|-------|
| `/guides/string-feel-vs-durability/`, `/updates/` | app routes, `editorial-updates.ts` |
| String cluster + review shelf | `related-content.ts`, `EditorialArticlePage.tsx` |
| Homepage freshness strip | `HomeRecentUpdates.tsx` |
| Redirect canonical fix | `blog-redirect-helpers.mjs` |

---

## 3. Verification

```bash
npm test
npm run lint
npm run build
```

---

## 4. Deferred (Sprint 9+)

- HelpfulReaction Workers/KV deploy
- Original `public/products/` photography
- GSC/CrUX CSV baselines
