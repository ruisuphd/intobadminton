# Web App Improvement Plan — Sprint 28 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-8a87`  
**Baseline:** Sprint 27 — trust/discovery catalog CTAs, richer profile links, PWA ib-v17 (PR #175, merged).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 28 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | About, sources, and buying-guide intros exit to filtered shop browse | ✅ Catalog CTAs on `/about/`, `/sources/`, `/source-policy/`, `/authors/*`, `/quiz/` |
| **Running Warehouse** | Post-quiz browse opens with category + price + style + build filters | ✅ `catalogHrefFromProfile` adds weight class from `body.weightKg` |
| **RTINGS** | Editorial trust cluster links to tested product index | ✅ About, sources, authors catalog exits |
| **Wirecutter** | Commercial long-tail and trust URLs in perf CI | ✅ Lighthouse adds authors, smash/strings/intermediate best-of, kumpoo, about, sources (saved/compare excluded — noindex) |
| **RacketGuide** | Offline reference + flagship comparisons for installed users | ✅ PWA `ib-v18` precaches 10 compare articles + 4 tier-1 best-of landings |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, 153 first-person reviews.

---

## 2. Top 5 gaps (Sprint 28)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Trust/editorial cluster lacks catalog exit** | About, sources, source-policy, authors are dead-ends after Sprint 27 methodology/data coverage | ✅ Secondary `Browse full catalog` bands on 5 trust pages |
| 2 | **Quiz funnel entry lacks catalog band** | Top entry point only links to best-of lists — no retailer-style browse escape hatch | ✅ Quiz secondary `Browse full catalog` CTA |
| 3 | **PWA missing compare articles + tier-1 best-of shells** | Installed users lose flagship comparisons and buying guides offline | ✅ `ib-v18` precache expansion (14 routes) |
| 4 | **Lighthouse CI gaps on funnel + commercial long-tail** | Perf regressions on smash/strings best-of, trust cluster undetected | ✅ CI adds 8 indexable routes; excludes noindex saved/compare; removes duplicate `/best/` entry |
| 5 | **Profile catalog link ignores body weight; tray CTAs lack E2E** | Post-quiz browse misses weight-class filter; saved/compare CTAs have no regression coverage | ✅ Weight class in `catalogHrefFromProfile`; E2E for trust + tray CTAs; glossary deep-link fix |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv`; original `public/products/` photography; YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Trust cluster catalog CTAs | `AboutPage.tsx`, `SourcesPage.tsx`, `source-policy/page.tsx`, `authors/page.tsx`, `authors/rui-su/page.tsx` |
| Quiz catalog band | `quiz/page.tsx` |
| Richer profile → catalog | `src/lib/catalog-url.ts`, `catalog-url.test.ts` |
| Glossary deep-link fix | `guides/glossary/page.tsx` |
| Saved/compare + trust E2E | `e2e/hub-shelf-smoke.spec.ts`, `e2e/catalog-compare-saved-smoke.spec.ts` |
| PWA offline expansion | `public/sw.js` (`ib-v18`), `pwa-precache.test.ts`, `pwa-offline-smoke.spec.ts` |
| Lighthouse CI | `lighthouserc.json` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 27 deferred list + competitive audit | ✅ |
| 2 | Weight class only when `category === "racket"` and `weightKg` is a clear signal (<60 → 5U, >85 → 3U) | ✅ |
| 3 | Trust pages use same secondary CTA pattern as FAQ/search (no new components) | ✅ |
| 4 | Quiz band mirrors FAQ layout — primary finder, secondary catalog | ✅ |
| 5 | PWA cache version bumped (`ib-v17` → `ib-v18`) | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: `catalog-url.test.ts`, `pwa-precache.test.ts` | ✅ |
| 8 | `npm test` + `npm run build` + postbuild SEO audit | ✅ |
| 9 | E2E: trust/quiz/saved/compare catalog CTAs + PWA ib-v18 | ✅ |
| 10 | Lighthouse CI URL set includes authors, commercial long-tail, trust cluster (no noindex routes) | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npx playwright test e2e/hub-shelf-smoke.spec.ts e2e/catalog-compare-saved-smoke.spec.ts e2e/pwa-offline-smoke.spec.ts
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Review→product map (mappable slugs) | 100% (140/140) |
| Pages per session | 2.5+ |
| Trust/discovery → catalog CTR | Measurable in GA4 `select_content` |
