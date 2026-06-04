# Web App Improvement Plan — Sprint 4 (June 2026)

**Branches:** `cursor/web-app-improvement-plan-f0ec` (PR #104 follow-up), `cursor/web-app-improvement-plan-c4a6`  
**Baseline:** Sprint 3 merged items on `main` + PR #104 (compare UX, quick filters, quiz delight, a11y).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength | IntoBadminton status | Gap |
|------------|----------|----------------------|-----|
| **Tennis Warehouse / RacketGuide** | Filter-first finder, spec compare tables | ✅ Quick filters + `CompareTable` | Original hero photography |
| **Wirecutter / RTINGS** | Product rich results, author entity | ✅ Product JSON-LD + `/authors/rui-su/` | `Person.sameAs` after channel claim |
| **BadmintonCentral** | Community archive, long threads | ✅ 146+ reviews + on-site search | User comments / UGC pipeline |
| **Retailer finders** | Notify-me, saved lists | ✅ Buttondown + `/saved/` | Cross-device notify sync |
| **Interactive reference sites** | Calculators, diagrams | ✅ `/tools/*` toolkit (5 tools) | HelpfulReaction public counts |

**Moat retained:** transparent fit scoring, claims CI, static export, postbuild SEO gate, consent-first ads.

---

## 2. Top 5 gaps (prioritized — Sprint 4+)

| # | Gap | Impact | Sprint 4 action |
|---|-----|--------|-----------------|
| 1 | **HelpfulReaction aggregate counts** | Social proof on commercial URLs | ⏳ Workers/KV backend (deferred); GA4 + local vote only |
| 2 | **Original product photography** | CTR + AdSense quality on `/best/*` | ⏳ Editorial; `ProductImageSet` ready |
| 3 | **GSC / CrUX baseline CSVs** | Measurable SEO guardrails | ⏳ Owner export → `docs/baselines/` |
| 4 | **Lighthouse CI vs stored baselines** | Regression gate on `main` | ⏳ Extend `lint:lighthouse` with baseline diff |
| 5 | **Cross-device notify-me** | Retention when Buttondown live | ⏳ Migrate offline queue when `NEXT_PUBLIC_BUTTONDOWN_USERNAME` set in prod |

**Shipped in Sprint 4 CI pass (this branch):**

- E2E: quiz funnel scoped to `aria-label="Equipment finder quiz"` (glyph help text broke `/^Doubles$/` matchers)
- E2E: `quick-filters-smoke`, `tools-smoke`
- Lighthouse URLs: `/tools/authenticity-checker/`, `/tools/skill-level-converter/`

---

## 3. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 Sprint 4 + Sprint 3 deferred list | ✅ |
| 2 | No signup wall on tools or finder | ✅ |
| 3 | Quick filters + full quiz both reach `/results/` | ✅ e2e |
| 4 | Quiz option accessible names match glyph+help pattern | ✅ e2e `\b` word boundaries |
| 5 | Tools index + skill converter render | ✅ e2e |
| 6 | Static export safe | ✅ |
| 7 | `npm test` (190 tests) | ✅ |
| 8 | `npm run test:e2e` (16 tests) | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | Lighthouse config includes high-traffic tools | ✅ |

---

## 4. Verification

```bash
npm test
npm run test:e2e
npm run build
```

---

## 5. Metrics (unchanged from Q2)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| GSC clicks | 4× baseline |
| Quiz completion | 60%+ (`quiz_complete` / `quiz_start`) |
