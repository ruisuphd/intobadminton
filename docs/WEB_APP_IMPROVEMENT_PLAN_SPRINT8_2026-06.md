# Web App Improvement Plan — Sprint 8 (June 2026)

**Baseline:** Sprint 7 on `main` (PR #135). Parallel tracks merged via PRs #141, #144, and Phase D on `main`.

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 8 response |
|------------|---------------------------|-------------------|
| **Wirecutter / RTINGS** | Public methodology + claim sourcing | ✅ `/data/` claims registry |
| **Wirecutter / RTINGS** | Product + Review schema | ✅ Review→product map **86%** |
| **Tennis Warehouse** | Search snippets + PDP | ✅ `searchResultSummary()`; `/product/[id]/` |
| **RacketGuide** | “Balanced” keyword landings | ✅ Search alias → `/best/all-round-rackets/` |
| **BadmintonCentral** | RSS discovery | ✅ `application/rss+xml` alternate |

---

## 2. Top 5 gaps (Sprint 8)

| # | Gap | Status |
|---|-----|--------|
| 1 | No public claims transparency | ✅ `/data/` |
| 2 | Product map below 85% | ✅ 86% + audit gate |
| 3 | Search cards hide body-match context | ✅ Snippets (PR #144) |
| 4 | No PDP-lite | ✅ `/product/[id]/` |
| 5 | HelpfulReaction KV live | ⏳ Deploy + env URL |

---

## 3. Execution summary

- Claims registry, PDP-lite, map +9, canonical slug ranking
- `searchResultSummary()`, RSS alternate, catalog list CLS fix
- Balanced-racket search keywords; BG80 body search test
- `audit-review-product-map.mjs --min-coverage=85`

---

## 4. Ten-pass verification

All passes ✅ — `npm test` (256+), `npm run build`, Lighthouse CI on PR #144.

---

## 5. Verification

```bash
npm test
npm run lint
npm run build
node scripts/audit-review-product-map.mjs --min-coverage=85
```

---

## 6. Deferred (Sprint 9+)

- HelpfulReaction Workers/KV production deploy
- GSC/CrUX baseline CSV
- Original product photography
- YouTube `sameAs` / `VideoObject`
