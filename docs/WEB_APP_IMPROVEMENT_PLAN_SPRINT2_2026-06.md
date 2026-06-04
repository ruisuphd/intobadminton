# Web App Improvement Plan — Sprint 2 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-fbba`  
**Baseline:** Sprint 1 shipped in PR #77 ([`WEB_APP_IMPROVEMENT_PLAN_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_2026-06.md)).

---

## 1. Competitive audit (fresh pass)

| Competitor pattern | IntoBadminton (post–Sprint 1) | Remaining gap |
|--------------------|-------------------------------|---------------|
| BadmintonCentral search + forums | Site search + 146 reviews | No community threads |
| Tennis Warehouse product pages | Finder + best-of tables | Review pages lack Product rich-result schema |
| Retailer PDPs | Editorial ratings on `/best/*` | Same ratings not on `/review/[slug]/` |
| Wirecutter / RTINGS article UX | Methodology box + progress on reviews | Guides lack shared engagement chrome |
| YouTube reviewers | — | VideoObject still gated |

**Moat unchanged:** transparent fit scoring, postbuild SEO gate, consent-safe ads, static-export performance.

---

## 2. Top 5 gaps (this sprint)

| # | Gap | Impact | Sprint 2 |
|---|-----|--------|----------|
| 1 | **Product + Review JSON-LD missing on review articles** | Product Reviews Update / rich results | ✅ |
| 2 | **No save / fit preview on review pages** | Retention from article → finder | ✅ |
| 3 | **Guides lack reading progress + share + reactions** | Engagement parity with reviews | ✅ |
| 4 | **Related reading is a plain link list** | Discovery / pages per session | ✅ |
| 5 | **Lighthouse / CI still omits a mapped review URL** | Regression signal | ✅ |

### Deferred (Sprint 3+)

- Buttondown notify-me backend
- HelpfulReaction Workers/KV aggregates
- First-party `public/products/` photography
- `Person.sameAs` (only after channels are claimed)
- zh locale content

---

## 3. Execution summary

1. Emit `productReviewJsonLd()` on mapped `/review/[slug]/` pages (`blog-review-product-map.json`).
2. `ReviewProductPanel` — save toggle, reference-profile fit badge, quiz CTA, optional radar.
3. `src/app/guides/layout.tsx` — `ReadingProgress`, `SocialShare`, `HelpfulReaction` for all guides.
4. `RelatedPostsGrid` — 3-card shelf on review articles.
5. Lighthouse: add one catalog-mapped review URL to `lighthouserc.json`.

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in code audit vs Q2 plan | ✅ |
| 2 | JSON-LD only when `reviewProductIdForBlog` resolves | ✅ |
| 3 | `reviewBody` uses article dek (no fabricated copy) | ✅ |
| 4 | Reference profile documented; static-export safe | ✅ |
| 5 | Guide layout skips `/guides/` index-only chrome conflicts | ✅ |
| 6 | Related grid uses existing `relatedArticles()` | ✅ |
| 7 | Unit tests: scoring helper + JSON-LD wiring | ✅ |
| 8 | `npm test && npm run build` | ✅ |
| 9 | postbuild SEO audit clean | ✅ |
| 10 | Lighthouse config includes review + guide URLs | ✅ |

---

## 5. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| Product rich-result eligibility on reviews | Mapped slugs emit Product+Review |
