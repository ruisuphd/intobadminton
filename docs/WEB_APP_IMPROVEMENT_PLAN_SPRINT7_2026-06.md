# Web App Improvement Plan — Sprint 7 (June 2026)

**Branches:** `cursor/web-app-improvement-plan-9527` (merged #135 — review search excerpts), `cursor/web-app-improvement-plan-10b8` (PR #140 — `/data/`, string guide, `/updates/`)  
**Baseline:** Sprint 6 on `main` (fuzzy search, programmatic `/best/*`, catalog compare funnel).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 7 response |
|------------|---------------------------|-------------------|
| **Wirecutter / RTINGS** | Public methodology + cited specs | ✅ `/data/` claims registry (PR #140) |
| **Tennis Warehouse** | Full-text search + stringing education | ✅ Review body excerpts (#135); string feel guide (#140) |
| **Retailer blogs** | Freshness feeds | ✅ `/updates/` editorial lane (#140) |
| **BadmintonCentral** | Community trust | ⏳ HelpfulReaction Workers/KV |
| **Brand PDPs** | First-party photography | ⏳ Editorial pipeline |

---

## 2. Top 5 gaps (combined Sprint 7)

| # | Gap | Status |
|---|-----|--------|
| 1 | Search index misses review body terms | ✅ #135 on main |
| 2 | Incomplete stringing SEO cluster | ✅ `/guides/string-feel-vs-durability/` (#140) |
| 3 | No domain freshness lane | ✅ `/updates/` (#140) |
| 4 | No public claims transparency page | ✅ `/data/` (#140) |
| 5 | HelpfulReaction aggregate counts | ⏳ Workers/KV backend |

---

## 3. PR #140 deliverables (this branch)

1. **`/data/`** — verified claims registry (Sprint 6 carryover).
2. **`/guides/string-feel-vs-durability/`** — stringing cluster spoke with HowTo schema.
3. **`/updates/`** — `listEditorialUpdates()` freshness feed.
4. Registry + Lighthouse URLs for new routes.

---

## 4. Verification

```bash
npm test
npm run build
npm run lint
```

---

## 5. Deferred (Sprint 8+)

- HelpfulReaction Workers/KV aggregate counts
- GSC/CrUX baseline CSV in `docs/baselines/`
- Original photos on top commercial URLs
