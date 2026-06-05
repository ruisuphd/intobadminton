# Web App Improvement Plan — Sprint 7 (June 2026)

**Branches:** `cursor/web-app-improvement-plan-00c0` (PR #141), plus merged `main` work (#135 review search excerpts, #138 PDP-lite + budget landings).  
**Baseline:** Sprint 6 on `main` (PR #127–#129, #134).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / Sprint 7 response |
|------------|---------------------------|------------------------|
| **Tennis Warehouse** | PDP per SKU + search | ✅ `/product/[id]/` on main (#138) |
| **Wirecutter / RTINGS** | Product + Review schema coverage | ✅ Product map ~80%+ on main; PR #141 lint-safe HelpfulReaction |
| **RacketGuide** | Role / budget long-tail landings | ✅ All-round, wide-feet, budget shoes on main |
| **Retailer finders** | CI performance gates | ✅ PR #141: HelpfulReaction lint fix + deferred PWA register |
| **Editorial ops** | Lighthouse regression snapshots | ✅ `lint:lighthouse:baseline` npm scripts |

**Moat:** transparent fit score, postbuild SEO gate, static export, 146+ signed reviews, claims CI.

**Deferred (Sprint 8+):** first-party `public/products/` photography, GSC/CrUX CSV capture, claimed YouTube `Person.sameAs`, `VideoObject`, HelpfulReaction Workers/KV deploy.

---

## 2. Top 5 gaps (closed in PR #141)

| # | Gap | Impact | Status |
|---|-----|--------|--------|
| 1 | **CI lint failure** on HelpfulReaction (`set-state-in-effect`) from PR #129 | Blocks green `lint-and-build` on `main` | ✅ `useSyncExternalStore` client detection |
| 2 | **HelpfulReaction stale vote** on client navigation | Wrong feedback state | ✅ `key={contentId}` on parents |
| 3 | **Homepage Lighthouse perf** (CI TBT on `/`) | CWV gate failure | ✅ Idle `requestIdleCallback` SW register in `PwaRegistration` |
| 4 | **Lighthouse baseline friction** | Hard to compare regressions | ✅ npm `lint:lighthouse:baseline` / `capture:lighthouse:baseline` |
| 5 | **Product map / PDP / search** (Sprint 7a) | Discovery + schema | ✅ Already on `main` via #135, #138 |

---

## 3. Execution summary (PR #141)

| Item | Files |
|------|-------|
| HelpfulReaction lint + hydration | `HelpfulReaction.tsx`, engagement footers |
| Homepage TBT | `PwaRegistration.tsx` (idle SW register) |
| Lighthouse baseline npm scripts | `package.json` |
| Enrichment regression test | `review-article-enrichment.test.ts` |

**Already on `main` (not repeated in #141):** review body search excerpts (#135), `/product/[id]/` PDP-lite, budget shoe + head-heavy under-$150 landings (#138), expanded `blog-review-product-map.json`.

**PR #139:**
1. `ShareResultsLink` on `/results/` — copy deep-linked finder profile URLs.
2. RSS discovery via `alternates.types` → `/feed.xml` in root layout.

### Follow-up (PR #142)

5. **`blog-review-product-map.json`** — 15 additional high-confidence slug mappings (62% → 72% coverage).

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 6 CI failure + main Sprint 7a | ✅ |
| 2 | HelpfulReaction avoids `setState` in `useEffect` for localStorage | ✅ |
| 3 | No duplicate `/best/balanced-rackets/` vs main all-round | ✅ |
| 4 | Product map canonical slug rules preserved | ✅ (main map) |
| 5 | PWA registration deferred off critical path | ✅ |
| 6 | npm scripts documented in plan | ✅ |
| 7 | Unit tests pass including enrichment case | ✅ |
| 8 | `npm run lint` + `npm run build` | ✅ |
| 9 | Static export safe | ✅ |
| 10 | Merged with latest `main` before ship | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint
npm run build
node scripts/audit-review-product-map.mjs
node scripts/lighthouse-baseline.mjs --help
```

---

## 6. Metrics (Q2)

| Goal | Target |
|------|--------|
| `lint-and-build` green on `main` | ✅ after #141 |
| Review product map coverage | ≥75% (main ~80%) |
| CWV p75 LCP | <2.5s |
| GSC clicks | 4× baseline |
