# Web App Improvement Plan — Sprint 7 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-2162` (PR #139)  
**Baseline:** Sprint 6 on `main` (fuzzy search, control rackets, catalog URL filters).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / response |
|------------|---------------------------|----------------|
| **Tennis Warehouse** | Sharable filtered URLs, RSS discovery | ✅ Results share link; RSS `rel=alternate` (PR #139) |
| **Wirecutter / RTINGS** | Review full-text search, Product schema | ✅ Shipped on `main` — `reviewSearchExcerpt`, singles/head-light/wide-feet `/best/*`, all-round page |
| **RacketGuide roundups** | Versatile / all-round landings | ✅ `/best/all-round-rackets/` on `main` |
| **YouTube reviewers** | Video + social proof counts | ⏳ VideoObject + HelpfulReaction KV |
| **Brand PDPs** | Original photography | ⏳ Editorial `public/products/` pipeline |

---

## 2. Top 5 gaps (Sprint 7 — split across main + PR #139)

| # | Gap | Status |
|---|-----|--------|
| 1 | Review search misses body keywords | ✅ `main` — `reviewSearchExcerpt()` in `site-search.ts` |
| 2 | Missing programmatic `/best/*` clusters | ✅ `main` — all-round, singles, head-light, wide-feet shoes |
| 3 | Review→product map below 75% | ✅ PR #139 — +24 map entries (79% coverage) |
| 4 | No sharable results URL affordance | ✅ PR #139 — `ShareResultsLink` on `/results/` |
| 5 | RSS not advertised to aggregators | ✅ PR #139 — `alternates.types` → `/feed.xml` |

---

## 3. PR #139 execution summary

| Deliverable | Files |
|-------------|-------|
| Product map expansion | `src/data/blog-review-product-map.json` |
| Results share link | `ShareResultsLink.tsx`, `ResultsClient.tsx` |
| RSS discovery | `src/app/layout.tsx` |

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 6 deferred list | ✅ |
| 2 | New map entries reference valid `products.json` ids | ✅ |
| 3 | Share link uses `profileToResultsPath` (no PII) | ✅ |
| 4 | Static export — no new API routes | ✅ |
| 5 | No duplicate review-search modules | ✅ (uses `main` excerpt helper) |
| 6 | `npm test` | ✅ |
| 7 | `npm run build` + postbuild SEO audit | ✅ |
| 8 | `npm run lint` | ✅ |
| 9 | Map coverage ≥75% | ✅ (79%) |
| 10 | Rebased on latest `main` without feature duplication | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
node scripts/audit-review-product-map.mjs
```

---

## 6. Deferred (Sprint 8+)

- HelpfulReaction Workers/KV
- Original photos on top commercial URLs
- GSC/CrUX baseline CSV in `docs/baselines/`
- YouTube `sameAs` (channel claim)
