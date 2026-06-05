# Web App Improvement Plan — Sprint 8 (June 2026)

**Branches:** Phase D + claims (`main`), product-map coverage (PR #141), search snippets (PR #144)  
**Baseline:** Sprint 7 on `main` (PR #135 — review excerpt search, fuzzy e2e).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 8 response |
|------------|---------------------------|-------------------|
| **Wirecutter / RTINGS** | Public methodology + claim sourcing | ✅ `/data/` claims registry |
| **Wirecutter / RTINGS** | Product + Review schema on commercial URLs | ✅ Review→product map **86%** (126/146) |
| **Tennis Warehouse** | Result snippets + PDP pages | ✅ Search snippets (PR #144); `/product/[id]/` PDP-lite |
| **RacketGuide** | “Balanced” keyword landings | ✅ Search keywords → `/best/all-round-rackets/` |
| **BadmintonCentral** | RSS discovery | ✅ `application/rss+xml` alternate in layout |
| **YouTube-first reviewers** | Video evidence | ⏳ `VideoObject` gated on video commitment |

**Moat:** transparent fit score, claims CI, static export, postbuild SEO gate.

---

## 2. Top 5 gaps (Sprint 8)

| # | Gap | Status |
|---|-----|--------|
| 1 | No public claims transparency | ✅ `/data/` registry |
| 2 | Product map below 85% | ✅ 86% + audit `--min-coverage=85` |
| 3 | Search cards hide body-match context | ✅ `searchResultSummary()` (PR #144) |
| 4 | No PDP-lite for catalog products | ✅ `/product/[id]/` |
| 5 | HelpfulReaction KV live | ⏳ Deploy Workers/KV + env URL |

---

## 3. Execution summary

| Track | Deliverables |
|-------|----------------|
| **Trust / schema** | `/data/` claims page; map +9 entries; canonical slug ranking in `review-pages.ts` |
| **Discovery** | `searchResultSummary()`; balanced-racket search alias; budget/head-heavy best pages |
| **Perf** | Catalog list CLS (reserved 72×72 image box); RSS alternate metadata |
| **Quality** | `audit-review-product-map.mjs --min-coverage=85`; Vitest coverage gate |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 7 deferrals + audit | ✅ |
| 2 | Map entries reference valid catalogue IDs | ✅ |
| 3 | Search snippets complement excerpt indexing (Sprint 7) | ✅ |
| 4 | No duplicate `/best/balanced-rackets/` URL | ✅ |
| 5 | Static export safe | ✅ |
| 6 | Body-only search e2e | ✅ |
| 7 | `npm test` (253+) | ✅ |
| 8 | `npm run build` + postbuild SEO audit | ✅ |
| 9 | Catalog list CLS fix | ✅ |
| 10 | Lighthouse CI | ✅ PR #144 run 26990611633 |

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

- Deploy HelpfulReaction Workers/KV to production
- GSC/CrUX baseline CSV capture (owner manual per `docs/baselines/README.md`)
- Original photos on top commercial URLs
- YouTube `sameAs` on author entity (after channel claim)
