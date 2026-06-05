# Web App Improvement Plan — Sprint 8 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-32b1` (PR #145)  
**Baseline:** `/data/` claims registry on `main` (#130); PDP-lite (#138); review search excerpts (#135).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / response |
|------------|---------------------------|----------------|
| **Wirecutter / RTINGS** | Methodology + cited specs | ✅ `/data/` on `main` |
| **Tennis Warehouse** | Stringing education cluster | ✅ Cluster hub; this PR completes cross-links + string feel guide |
| **Retailer blogs** | Freshness feeds | ✅ `/updates/` + homepage strip |
| **BadmintonCentral** | Community trust | ⏳ HelpfulReaction KV (deploy + env) |
| **Brand PDPs** | Product photography | ⏳ Editorial `public/products/` pipeline |

**Moat:** transparent fit scoring, postbuild SEO gate, dated editorial feed, static-export performance.

---

## 2. Top 5 gaps (Sprint 8)

| # | Gap | Impact | Sprint 8 |
|---|-----|--------|----------|
| 1 | **String cluster incomplete** | Topical authority | ✅ `string-feel-vs-durability` guide + `related-content` cluster |
| 2 | **Review pages lack decision-path shelf** | Post-article retention | ✅ `relatedReadingForReviewSlug` + shelf on reviews |
| 3 | **Homepage hides freshness lane** | Return visits | ✅ `HomeRecentUpdates` strip → `/updates/` |
| 4 | Original product photography | AdSense / visual maturity | ⏳ Editorial pipeline |
| 5 | HelpfulReaction aggregate counts | Social proof | ⏳ Workers/KV deploy + `NEXT_PUBLIC_REACTIONS_API_URL` |

---

## 3. Execution summary

1. **`/guides/string-feel-vs-durability/`** — stringing cluster spoke (if not already on branch from Sprint 7).
2. **`/updates/`** — `listEditorialUpdates()` freshness feed.
3. Extend `strings` cluster; map `/data/`, `/updates/` in `related-content`.
4. `relatedReadingForReviewSlug()` — heuristic cluster from review slug.
5. `HomeRecentUpdates` — three latest rows from `listEditorialUpdates(3)`.

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 7 deferrals + Q2 engagement | ✅ |
| 2 | String cluster distinct paths (feel vs tension vs calculator) | ✅ |
| 3 | Review shelf excludes current slug; only mapped clusters | ✅ |
| 4 | Homepage updates use editorial dates, not build time | ✅ |
| 5 | Static export safe (no new API routes) | ✅ |
| 6 | `/data/` and `/updates/` in sitemap/footer | ✅ |
| 7 | `related-content.test.ts` covers new paths | ✅ |
| 8 | `npm test` | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | Lighthouse URL set includes PDP + new routes | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npm run lint
```

---

## 6. Deferred (Sprint 9+)

- Deploy `workers/reactions/` and set `NEXT_PUBLIC_REACTIONS_API_URL` in production
- GSC/CrUX baseline CSV in `docs/baselines/`
- Original photos on top commercial URLs
- `Person.sameAs` YouTube after channel claim
