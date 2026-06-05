# Web App Improvement Plan — Sprint 7 (June 2026)

**Branches:** #135 search excerpts, #138 PDP-lite, #139 share results, #141 HelpfulReaction lint, **#145** string cluster + `/updates/`  
**Baseline:** Sprint 6 on `main` (catalog, fuzzy search, `/data/` claims registry).

---

## 1. Competitive audit

| Competitor | Strength | IntoBadminton response |
|------------|----------|------------------------|
| Tennis Warehouse | PDP + stringing education | PDP-lite (#138); string feel guide (#145) |
| Wirecutter / RTINGS | Methodology + schema | `/data/` claims; product map 86% (#141) |
| Retailer blogs | Freshness feeds | `/updates/` (#145) |
| RacketGuide | Long-tail landings | All-round, budget shoes, head-heavy (#138) |

---

## 2. Top gaps (parallel delivery)

| Gap | Status |
|-----|--------|
| Review body search | ✅ #135 |
| PDP-lite `/product/[id]/` | ✅ #138 |
| HelpfulReaction CI lint | ✅ #141 |
| String cluster + freshness lane | ✅ #145 |
| HelpfulReaction KV aggregates | ⏳ |

---

## 3. PR #145 execution

1. `/guides/string-feel-vs-durability/` — HowTo + cluster links  
2. `/updates/` — `listEditorialUpdates()` feed  
3. Registry: `editorial-meta`, footer, Lighthouse URLs  

---

## 4. Verification

```bash
npm test && npm run lint && npm run build
```
