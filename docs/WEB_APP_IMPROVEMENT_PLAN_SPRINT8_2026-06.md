# Web App Improvement Plan — Sprint 8 (June 2026)

**Branches:** `cursor/web-app-improvement-plan-9a0c` (merged #130 — claims registry), `cursor/web-app-improvement-plan-766f` (PR #146 — PDP e2e + mobile search, merged or ready)  
**Baseline:** Sprint 7 on `main` (PR #138 PDP-lite; PR #135 search excerpts; Phase D map 80%).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / Sprint 8 response |
|------------|---------------------------|-------------------------|
| **Tennis Warehouse** | PDP per SKU, filter browse, hero imagery | ✅ PDP-lite (#138); imagery still manufacturer-sourced |
| **Badminton Warehouse** | Shoe/racket finder + email alerts | ✅ Finder + notify-me; ⏳ HelpfulReaction public counts |
| **Wirecutter / RTINGS** | Social proof + methodology transparency | ✅ `/data/` claims registry (#130); ⏳ Workers/KV counts |
| **RacketGuide / affiliate roundups** | Long-tail budget landings | ✅ 18 `/best/*` pages |
| **YouTube reviewers** | Video evidence + personality | ⏳ `VideoObject` gated on editorial video commitment |

**Moat:** transparent fit score, claims CI, static export, 146+ reviews, postbuild SEO gate, public claims registry.

---

## 2. Top 5 gaps (Sprint 8)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **No public claims transparency** (Q2 §3.5 #28) | Trust / E-E-A-T | ✅ `/data/` registry (#130) |
| 2 | **E2E does not cover PDP or catalog→PDP** | Regressions on Sprint 7 flagship | ✅ `e2e/pdp-smoke.spec.ts` (#146) |
| 3 | **Mobile nav search requires client hydration** | Discovery friction below 1200px | ✅ `SiteSearchFormStatic` in mobile drawer (#146) |
| 4 | **Review→catalog map still ~80%** | Product rich results | ✅ +2 mappings → **82%** (#146) |
| 5 | HelpfulReaction aggregate counts | Social proof | ⏳ Deploy `workers/reactions` + env |

**Deferred:** original product photography; YouTube `sameAs`; E2E for `/saved/`, `/compare/`.

---

## 3. Execution summary

| Deliverable | PR / files |
|-------------|------------|
| `/data/` claims registry | #130 — `src/app/data/page.tsx`, `content/claims.json` |
| PDP + catalog e2e | #146 — `e2e/pdp-smoke.spec.ts` |
| Progressive mobile search | #146 — `src/components/SiteHeader.tsx` |
| Map expansion (+2) | #146 — `src/data/blog-review-product-map.json` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 7 deferred list + competitive audit | ✅ |
| 2 | PDP e2e uses catalogue id without review slug | ✅ `yy-nanoray-light-70i` |
| 3 | Catalog e2e follows `catalogProductHref` to PDP | ✅ |
| 4 | New mappings reference valid `products.json` ids | ✅ |
| 5 | Mobile search works without JS (native form submit) | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | `npm test` | ✅ |
| 8 | `npm run build` + postbuild SEO audit | ✅ |
| 9 | `audit-review-product-map.mjs` coverage ≥80% | ✅ (119/146) |
| 10 | Lighthouse PDP URL in `lighthouserc.json` | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npm run test:e2e
node scripts/audit-review-product-map.mjs
```

---

## 6. Deferred (Sprint 9+)

- Deploy Cloudflare reactions worker; set `NEXT_PUBLIC_REACTIONS_API_URL`
- GSC/CrUX baseline CSV capture (`docs/baselines/README.md`)
- Original photos on top commercial URLs
- YouTube `sameAs` on author entity (after channel claim)
