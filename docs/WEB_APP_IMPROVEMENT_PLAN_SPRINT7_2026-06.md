# Web App Improvement Plan — Sprint 7 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-9527`  
**Baseline:** Sprint 6 on `main` (PR #134 fuzzy search; PR #127 programmatic landings including `/best/all-round-rackets/`).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / response |
|------------|---------------------------|----------------|
| **Tennis Warehouse / retailer finders** | Full-text product search, typo tolerance | ✅ Fuzzy tokens (Sprint 6); **review body excerpts in index (this sprint)** |
| **Wirecutter / RTINGS** | Social proof vote counts | ⏳ HelpfulReaction Workers/KV (Phase C) |
| **RacketGuide / affiliate roundups** | Long-tail landings (all-round, control, power) | ✅ Shipped on main (PR #127) |
| **Brand PDPs** | First-party product photography | ⏳ Editorial `public/products/` pipeline |
| **YouTube-first reviewers** | Video evidence | ⏳ `VideoObject` gated on video commitment |

**Moat unchanged:** transparent fit score, claims CI, static export, 146+ reviews, postbuild SEO gate.

---

## 2. Top 5 gaps (Sprint 7)

| # | Gap | Impact | Sprint 7 |
|---|-----|--------|----------|
| 1 | **Search index misses review body terms** | Discovery friction — dek-only matching | ✅ Excerpt enrichment in `reviewEntries()` |
| 2 | **Fuzzy search lacks e2e coverage** | Regressions on typo UX | ✅ Playwright typo smoke |
| 3 | HelpfulReaction aggregate counts | Social proof (Wirecutter parity) | ⏳ Workers/KV backend |
| 4 | Original product photography | AdSense / visual maturity | ⏳ Editorial pipeline |
| 5 | Video / `VideoObject` schema | E-E-A-T visual evidence | ⏳ Gated on video commitment |

---

## 3. Execution summary

1. **`src/lib/site-search.ts`** — `reviewSearchExcerpt()` strips HTML from section bodies and adds capped plain-text tokens to review index keywords.
2. **`e2e/search-smoke.spec.ts`** — typo query smoke for fuzzy matching (`badmintn string tenson`).
3. **Unit tests** — body-only term discovery + existing fuzzy cases in `site-search.test.ts`.
4. **Docs hygiene** — resolve merge conflict in `WEB_APP_IMPROVEMENT_PLAN_2026-06.md`.

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 6 deferred list + competitive audit | ✅ |
| 2 | Excerpt cap prevents bundle blow-up (≤400 chars/article) | ✅ |
| 3 | Does not duplicate PR #127 all-round page work | ✅ |
| 4 | Static export safe (no API routes) | ✅ |
| 5 | Fuzzy e2e covers typo path end-to-end | ✅ |
| 6 | Body-only search term finds correct review | ✅ |
| 7 | Nonsense queries still return empty | ✅ |
| 8 | `npm test` | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | No Lighthouse URL regressions vs main | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npm run lint
```

---

## 6. Deferred (Sprint 8+)

- HelpfulReaction Workers/KV aggregate counts
- GSC/CrUX baseline CSV in `docs/baselines/`
- Original photos on top commercial URLs
- YouTube `sameAs` on author entity (after channel claim)
