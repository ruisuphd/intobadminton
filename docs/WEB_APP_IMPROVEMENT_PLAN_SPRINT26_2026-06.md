# Web App Improvement Plan — Sprint 26 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-549a`  
**Baseline:** Sprint 25 — tool/guide catalog CTAs, PWA ib-v15 (PR #173).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 26 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | PDP and review pages exit to filtered catalogue browse | ✅ `catalogHrefFromProduct` + CTA on review/PDP panels |
| **Running Warehouse** | Quiz/finder results link to full filtered catalog | ✅ `catalogHrefFromProfile` on `/results/` |
| **RTINGS** | FAQ and support pages link to product browse | ✅ FAQ secondary catalog CTA |
| **Wirecutter** | High-intent review URLs in perf CI | ✅ Lighthouse CI adds review article + doubles-roles guide |
| **RacketGuide** | Calculator shells offline for installed users | ✅ PWA `ib-v16` precaches remaining guides + racket-balance tool |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, 153 first-person reviews.

---

## 2. Top 5 gaps (Sprint 26)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Review/PDP panels lack filtered catalog exit** | Readers finish a product review with no retailer-style browse path | ✅ `catalogHrefFromProduct` in `ReviewProductPanel` |
| 2 | **Quiz results lack catalog deep-link** | Post-quiz users cannot browse the full filtered catalogue with profile context | ✅ `catalogHrefFromProfile` on `/results/` |
| 3 | **FAQ page lacks catalog CTA** | Last major discovery hub without browse exit (Sprint 24–25 covered others) | ✅ FAQ secondary `Browse full catalog` button |
| 4 | **PWA missing remaining guide/tool shells** | Installed users lose doubles-roles, equipment-authenticity, racket-balance tool offline | ✅ `ib-v16` precache expansion |
| 5 | **Lighthouse CI gaps on review + guide routes** | Perf regressions on mapped review articles and procedural guides | ✅ CI adds doubles-roles guide + racket-balance tool |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv`; original `public/products/` photography; YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Product/profile → catalog helpers | `src/lib/catalog-url.ts`, `catalog-url.test.ts` |
| Review/PDP catalog exit | `src/components/ReviewProductPanel.tsx` |
| Results catalog CTA | `src/app/results/ResultsClient.tsx` |
| FAQ catalog CTA | `src/app/faq/page.tsx` |
| PWA offline expansion | `public/sw.js` (`ib-v16`), `pwa-precache.test.ts` |
| Lighthouse CI | `lighthouserc.json` |
| E2E regression | `e2e/hub-shelf-smoke.spec.ts`, `e2e/pwa-offline-smoke.spec.ts` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 25 deferred list + competitive audit | ✅ |
| 2 | `catalogHrefFromProduct` reuses `catalogUrlFromState` with brand + category | ✅ |
| 3 | `catalogHrefFromProfile` maps quiz category + budget to price band | ✅ |
| 4 | ReviewProductPanel used on both review articles and PDP — single CTA surface | ✅ |
| 5 | PWA cache version bumped (`ib-v15` → `ib-v16`) | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: `catalog-url.test.ts`, `pwa-precache.test.ts` | ✅ |
| 8 | `npm test` + `npm run build` + postbuild SEO audit | ✅ |
| 9 | E2E: FAQ catalog CTA + review panel catalog link + PWA ib-v16 | ✅ |
| 10 | Lighthouse CI URL set includes doubles-roles + racket-balance tool | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npx playwright test e2e/hub-shelf-smoke.spec.ts e2e/pwa-offline-smoke.spec.ts
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Review→product map (mappable slugs) | 100% (140/140) |
| Pages per session | 2.5+ |
| Review/results → catalog CTR | Measurable in GA4 `select_content` |
