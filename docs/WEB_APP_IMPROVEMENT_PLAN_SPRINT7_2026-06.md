# Web App Improvement Plan — Sprint 7 (June 2026)

**Branches:** `9527` (#135 search excerpts), `c7f0` (#138 PDP-lite), `10b8` (#140 `/data/`, string guide, `/updates/`)  
**Baseline:** Sprint 6 on `main` (fuzzy search, programmatic `/best/*`, catalog compare).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 7 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | PDP per SKU + full-text search | ✅ PDP-lite (#138); review excerpts (#135) |
| **Wirecutter / RTINGS** | Public methodology + cited specs | ✅ `/data/` claims registry (#140) |
| **Retailer blogs** | Freshness feeds + stringing education | ✅ `/updates/` (#140); string feel guide (#140) |
| **BadmintonCentral** | Community trust | ⏳ HelpfulReaction Workers/KV |
| **Brand PDPs** | First-party photography | ⏳ Editorial pipeline |

---

## 2. Top 5 gaps (combined Sprint 7)

| # | Gap | Status |
|---|-----|--------|
| 1 | No PDP for unmapped catalogue SKUs | ✅ #138 `/product/[id]/` |
| 2 | Search index misses review body terms | ✅ #135 excerpt enrichment |
| 3 | Incomplete stringing cluster + freshness lane | ✅ #140 string guide + `/updates/` |
| 4 | No public claims transparency page | ✅ #140 `/data/` |
| 5 | HelpfulReaction aggregate counts | ⏳ Workers/KV backend |

---

## 3. PR #140 deliverables (branch `10b8`)

1. **`/data/`** — verified claims registry (Sprint 6 carryover from PR #130).
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
