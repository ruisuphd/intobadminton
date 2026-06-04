# Web App Improvement Plan — Sprint 3 (June 2026)

**Branches:** `cursor/web-app-improvement-plan-0fb2` (merged PR #94), `cursor/web-app-improvement-plan-f0ec` (PR #104)  
**Baseline:** Sprint 1–2 on `main`.

---

## 1. Competitive audit (June 2026)

| Competitor pattern | Gap addressed |
|--------------------|---------------|
| Tennis Warehouse / RacketGuide | Filter-first entry + polished compare table |
| Wirecutter quiz UX | Glyphs, step help, notify-me / shortlist recall |
| Retailer saved lists | `HomeRecentShortlists`, `/saved/` in Lighthouse |
| WCAG mobile nav | Focus trap + `aria-modal` on drawer |
| RTINGS / editorial schema | `author.url` → `/authors/rui-su/` |

**Moat unchanged:** transparent fit scoring, postbuild SEO gate, claims CI, static export, 146+ reviews.

---

## 2. Top gaps shipped (combined Sprint 3)

| # | Gap | PR track |
|---|-----|----------|
| 1 | Compare tool raw spec keys | ✅ `CompareTable` + `compare-fields` (#104) |
| 2 | Filter-first finder entry | ✅ `FinderQuickFilters` (#104) |
| 3 | Quiz delight (glyphs + help) | ✅ `QuizOptionGlyph` (#104) |
| 4 | Notify-me `alert()` only | ✅ `notify-me.ts` + Buttondown (#94) |
| 5 | Homepage shortlist recall | ✅ `HomeRecentShortlists` (#94) |
| 6 | Mobile nav a11y | ✅ focus trap (#104) |
| 7 | Author JSON-LD `url` | ✅ `/authors/rui-su/` (#104) |
| 8 | `/saved/` + `/compare/` in Lighthouse | ✅ (#94 + #104) |

### Deferred (Sprint 4+)

- HelpfulReaction Workers/KV aggregates
- Migrate offline notify-me when Buttondown is live in production
- First-party `public/products/` photography
- `Person.sameAs` after channel claims
- zh locale content

---

## 3. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 + competitive audit | ✅ |
| 2 | Compare copy matches `MAX_COMPARE = 3` | ✅ |
| 3 | Quick filters require level + discipline | ✅ |
| 4 | Notify-me device-local when Buttondown unset | ✅ |
| 5 | Compare table `scope` + caption | ✅ |
| 6 | Static export safe | ✅ |
| 7 | Author URL on-site | ✅ |
| 8 | Unit tests (`compare-fields`, `notify-me`, `site-search`) | ✅ |
| 9 | `npm test && npm run build` | ✅ |
| 10 | postbuild SEO audit clean | ✅ |

---

## 4. Verification

```bash
npm test
npm run build
```
