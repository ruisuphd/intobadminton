# Web App Improvement Plan — Sprint 4 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-c920` (merged with Sprint 3)  
**Baseline:** Sprint 3 on `main` after PR #97; toolkit pages shipped on `main` per [`IMPROVEMENT_PLAN_2026Q2.md`](IMPROVEMENT_PLAN_2026Q2.md) §6 Sprint 4.

---

## 1. Competitive audit (June 2026)

| Competitor | Strength | IntoBadminton response |
|------------|----------|------------------------|
| **RacketGuide / Tennis Warehouse** | Interactive calculators + comparison | Five `/tools/*` pages + homepage toolkit strip |
| **Wirecutter** | Topic clusters with deep internal links | Guide ↔ tool cross-links (string tension, balance, authenticity) |
| **BadmintonCentral** | Community Q&A density | Glossary + autolinks in reviews (Sprint 3) |
| **RTINGS** | Methodology transparency | Scoring breakdown + `ReviewMethodologyBox` |
| **YouTube reviewers** | Video proof | Deferred (`VideoObject` gated) |

**Moat:** static export, postbuild SEO gate, signed reviews, transparent fit scoring, no signup on finder.

---

## 2. Top 5 gaps (Sprint 4 + polish)

| # | Gap | Status |
|---|-----|--------|
| 1 | Toolkit pages exist but guides did not link into tools | ✅ Cluster cross-links (this PR) |
| 2 | Duplicate engagement chrome on guides (layout + per-page) | ✅ Removed per-page `GuideEngagement` |
| 3 | Sprint 3 PR blocked on `main` merge conflict | ✅ Merged `main` into branch |
| 4 | Lighthouse did not cover representative tool URL | ✅ `/tools/index.html` in `lighthouserc.json` |
| 5 | HelpfulReaction counts still client-only (no KV) | ⏳ Sprint 5 |

### Sprint 4b — Return-path polish (PR #100)

| # | Gap | Status |
|---|-----|--------|
| 6 | Homepage shortlists showed names only (no `/results/` reopen) | ✅ `resultsPathForProfile` + linked cards |
| 7 | Toolkit pages lacked share / helpful feedback | ✅ `ToolEngagement` on `/tools` layout |
| 8 | `/tools/` hub missing from site search | ✅ `buildSearchIndex()` entry |
| 9 | Lighthouse skipped authenticity-checker | ✅ URL added (`/saved/` omitted — `noindex`) |

### Deferred (Sprint 5+)

- HelpfulReaction Workers/KV aggregates
- First-party `public/products/` photography
- `Person.sameAs` after social profile claims
- PWA web push
- GSC/CrUX CSV in `docs/baselines/`

---

## 3. Execution summary

1. Merge `origin/main` into Sprint 3 branch; resolve `SavedListClient` conflict
2. Remove duplicate `GuideEngagement` from guide articles (layout footer owns share + helpful stripe)
3. Link `/tools/string-tension-calculator/`, `/tools/racket-balance-explainer/`, `/tools/authenticity-checker/` from matching guides
4. Extend `GUIDE_HEADLINES` for cluster pillar guides

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 Sprint 4 + competitive audit | ✅ |
| 2 | Tools index lists all five tools | ✅ (on `main`) |
| 3 | No duplicate ReadingProgress on guides | ✅ |
| 4 | Guide ToC still portal-mounted after h1 | ✅ |
| 5 | Glossary autolinks unchanged | ✅ |
| 6 | Static export safe | ✅ |
| 7 | `npm test` | ✅ |
| 8 | `npm run build` + postbuild SEO audit | ✅ |
| 9 | `npm run lint` | ✅ |
| 10 | PR mergeable with `main` | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint
npm run build
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| Tool → finder CTR | Track `tool_open` / outbound quiz clicks in GA4 |
