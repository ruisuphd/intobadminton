# Web App Improvement Plan — Sprint 3 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-f0ec`  
**Baseline:** Sprint 1–2 in [`WEB_APP_IMPROVEMENT_PLAN_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_2026-06.md), [`WEB_APP_IMPROVEMENT_PLAN_SPRINT2_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT2_2026-06.md).

---

## 1. Competitive audit (June 2026)

| Competitor pattern | IntoBadminton (post–Sprint 2) | Remaining gap |
|--------------------|-------------------------------|---------------|
| Tennis Warehouse / RacketGuide filter-first | Quiz + live counter | No quick-filter entry to `/results/` without full funnel |
| Retailer compare tables | Raw-key compare page | Human labels, fit score, thumbnails, winner chips |
| Wirecutter quiz UX | Completion overlay + counter | Per-option glyphs + “why this matters” help |
| WCAG on mobile nav | Skip link, semantic landmarks | Mobile drawer lacks focus trap / `aria-modal` |
| RTINGS / editorial schema | Product+Review on mapped reviews | `BlogPosting.author` missing `url` on author hub |

**Moat unchanged:** transparent fit scoring, postbuild SEO gate, claims CI, static export, 146+ reviews.

---

## 2. Top 5 gaps (this sprint)

| # | Gap | Impact | Sprint 3 |
|---|-----|--------|----------|
| 1 | Compare tool reads like a developer dump | Shareable compare is a retention hook | ✅ `CompareTable` + `compare-fields` |
| 2 | Filter-first finder entry missing | Discovery / pages per session | ✅ `FinderQuickFilters` on home + quiz |
| 3 | Quiz delight incomplete (glyphs + help) | Funnel completion rate | ✅ `QuizOptionGlyph` + `quiz-help` |
| 4 | Mobile nav accessibility gaps | Lighthouse a11y regression | ✅ Focus trap + `aria-modal` |
| 5 | `BlogPosting` author without `url` | E-E-A-T entity linking | ✅ Author hub URL in JSON-LD |

### Deferred (Sprint 4+)

- HelpfulReaction Workers/KV aggregates
- Buttondown notify-me wiring
- Original `public/products/` photography
- `Person.sameAs` social profiles (after channel claims)
- zh locale content

---

## 3. Execution summary

1. `src/lib/compare-fields.ts` — labels, category-aware rows, numeric winner logic
2. `src/components/CompareTable.tsx` — sticky spec column, images, fit badges, winner chips
3. `src/app/compare/page.tsx` — use `CompareTable`; layout copy: 2–3 items (matches `MAX_COMPARE`)
4. `src/components/FinderQuickFilters.tsx` — level + discipline + category → `/results/?…`
5. `LocalizedHome` + `quiz/page.tsx` — quick filter strip above funnel
6. `ResultsClient` — active filter summary + edit link
7. `QuizOptionGlyph` + `quiz-help` — discipline/style/category steps
8. `SiteHeader` — mobile menu focus trap
9. `EditorialArticlePage` + `structured-data` — `author.url` → `/authors/rui-su/`
10. `lighthouserc.json` — `/compare/` URL; a11y `warn` → `error`

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in code audit vs Q2 deferred §2.1–2.2 | ✅ |
| 2 | Compare copy matches `MAX_COMPARE = 3` | ✅ |
| 3 | Quick filters require level + discipline before `/results/` | ✅ |
| 4 | Compare table uses `scope` + caption | ✅ |
| 5 | Quiz help is additive; no change to scoring | ✅ |
| 6 | Static export safe (no new APIs) | ✅ |
| 7 | Author URL uses on-site `/authors/rui-su/` | ✅ |
| 8 | Unit tests: `compare-fields`, `profile-url` partial | ✅ |
| 9 | `npm test && npm run build` | ✅ |
| 10 | postbuild SEO audit clean | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
```
