# AdSense recovery QA — 14 Aug 2026

**Target:** local static export at `http://127.0.0.1:4173` (`out/`, `NEXT_PUBLIC_BASE_PATH=""`, `NEXT_PUBLIC_ADSENSE_MODE` unset/`disabled`).

**Verdict: ship the branch for the quality deploy. Do not resubmit AdSense.** Cooldown is still 17 Aug 2026 **and** ~14 days after this deploy is live. Auto ads stays a dashboard switch; do not set `NEXT_PUBLIC_ADSENSE_MODE=cmp_tcf` as part of this QA.

Wave 6 had no policy misses. Waves 0–4 and LHCI assertions are green. One local Lighthouse **baseline** miss remains on a tool page (not a noindex cheat).

## Scorecard

| Wave | Result | Notes |
|------|--------|--------|
| 0 Harness | **PASS** | `ib-v45`, home heading, PDP dropped from LHCI |
| 1 Unit / goldens | **PASS** | 705 tests, `tsc`, home/reviews/best/compare/pdp baselines |
| 2 Production build | **PASS** | postbuild SEO audit 1063 HTML / 108 sitemap URLs |
| 3 HTML inventory | **PASS** | zero `adsbygoogle.js`; sitemap/robots/redirects/copy |
| 4 Playwright | **PASS** | 587 tests after one harness fix (see below) |
| 5 Lighthouse | **PASS** (assert) / **FAIL** (baseline, 1 URL) | SEO 1.00 on all audited URLs; see follow-up |
| 6 Reviewer crawl | **PASS** | 43/43 checks; screenshots below |
| 7 Finder regression | **PASS** | quiz → save → compare; catalog; brand; search |

## Harness fixes made during this QA

These would have failed CI even if the product was correct:

1. `e2e/pwa-offline-smoke.spec.ts` — cache key `ib-v44` → `ib-v45`.
2. `e2e/home-baseline-smoke.spec.ts` — heading `/latest reviews/i` → `/founder-tested/i`.
3. Removed `http://localhost:4173/product/yy-grpht-thrttl/index.html` from `lighthouserc.json`, `lighthouserc-baseline.json`, and `docs/baselines/lighthouse-scores.json`. PDP remains in Playwright (`e2e/pdp-smoke.spec.ts`) and is lab-exempt for CrUX.
4. `e2e/review-product-map-baseline-smoke.spec.ts` — Comfort Z3 / Eclipsion Z3 H1s no longer contain the word “review”. Assert article `h1` instead. First full run: **585 passed, 2 failed**; after the fix that spec is **57/57**.
5. `lighthouserc.json` — added seven compare-guide URLs that already lived in `lighthouserc-baseline.json` / `lighthouse-scores.json`. Without them, `lint:lighthouse:baseline` reports “missing from current run” after a full LHCI collect. Also fixed two TypeScript holes found in Wave 1: `Link` import in `LocalizedHome.tsx`, `scoreOneProduct` import in `ReviewProductPanel.tsx`.

## Wave notes

### 1 — Unit

`npm test` 705 passed. `npx tsc --noEmit` 0 after the two import fixes. Golden lints: home, reviews, best, compare-guides, pdp.

### 2 — Build

`NEXT_PUBLIC_BASE_PATH="" npm run build` exit 0. Featured six unchanged (how-to-choose, string-selector, 1000 Z, Comfort Z3, 88D vs 88S, Arcsaber 7 Pro), 4–6 min. `[seo-audit] passed (1063 HTML files, 108 sitemap URLs, 17 claims tracked)`. Next.js warns that `export const config` on `/best/rackets-under-150/` and `/under-200/` looks like deprecated route config; pages still build.

### 3 — `out/` inventory

- `adsbygoogle.js`: **zero** HTML files (mode stays disabled).
- `out/ads.txt` exists.
- `google-adsense-account` **absent** on `out/index.html` — `NEXT_PUBLIC_ADSENSE_CLIENT` was not in this build env. CI is the same unless the secret is injected. Not a product bug.
- Sitemap: no `/product/`; has `/`, string-tension, under-150/200, how-to-choose, 1000 Z; omits Beimo and Kumpoo fourth-major profile.
- `noindex` on PDPs (`yy-nanoflare-1000z`, `yy-grpht-thrttl`), `kumpoo-beimo-racket-review`, `/setup/`. Not on home, string-tension, under-150, 1000 Z review, how-to-choose.
- Retired 301s: Star Cross second perspective → Star Cross; DriveX 12 vs 10 → DriveX 12 vs 88D Pro; 99 Pro gen-1 → `/review/yonex-astrox-99-pro-3-deep-dive/`.
- Homepage HTML: no `209 review` / `Read 209`; no `1 min` / `2 min` featured cards.

### 4 — Playwright

Full suite against `out` on :4173. Recovery-critical specs (home, reviews hub, reviews baseline, PDP, best, compare-guides, PWA `ib-v45`, consolidation, quiz/catalog) passed. The only failures were the two shoe-review H1 assertions, fixed as harness.

### 5 — Lighthouse

Full `@lhci/cli` autorun (filesystem upload locally): **exit 0**. SEO **1.00** on every collected URL. No PDP in the collect list. Accessibility **warnings** at 0.93 (warn floor 0.95) on several best-of / review shells — not errors.

`lint:lighthouse:baseline` after merging the seven missing compare-guides: **one** regression:

- `/tools/authenticity-checker/` performance **0.94** vs baseline **1.00** (tol 0.05). LCP 1.6 s (still under the 2.5 s error cap). LHCI also flagged a **200 ms redirect** from `serve` (`…/index.html` → directory URL). Home re-audit in isolation scored **0.99**. Do not “fix” this by auditing a `noindex` URL or lowering the SEO floor.

### 6 — Reviewer crawl (Chromium, cleared site data)

Reproduced with `docs/qa-adsense-recovery/crawl.mjs` (43/43). First-time visitor; cookie banner present, not the only content.

1. `/` — Rui Su, primary **Read guides** → `/guides/`, publication shelf (string tension, how-to-choose, Astrox vs Nanoflare, 1000 Z, beginner rackets, shoes vs running). No “209 reviews”. No 1–2 min featured cards. No PWA install toast. Hero still shows **202 items ranked** (catalog SKUs, not review-count CTA).
2. Inner clicks: string-tension guide and Nanoflare 1000 Z review — long original/founder prose, skip/who-should-not on 1000 Z, **no** `adsbygoogle.js` in DOM or resource log.
3. `/product/yy-nanoflare-1000z/` — specs + finder, `noindex`, no ads, no 5/100 “Weak match” without a quiz profile.
4. `/review/` — default **Showing 26 of 26**; checkbox **Include short court notes (not indexed)** jumps to **209 of 209**. Astrox search hits founder pages on the default list.
5. `/best/rackets-under-150/` and `/under-200/` — hand-written why/tradeoff copy (~1400+ words). `/best/bags/` essay-length.
6. Popular-search chips include string-tension and `/brands/kumpoo/`; not the Kumpoo forum profile or stringing-holes import.
7. `/about/` — indexed pages = original or founder-firsthand; imported notes noindex and ad-free. No “I don’t scrape” claim.

### 7 — Finder

Quiz (Club / Doubles / Balanced / Racket) → results → save (1 item) → compare tray. Catalog Yonex string BG65 → `/review/badminton-string-selector/`. Unmapped Super Grap AC102EX → PDP. `/brands/yonex/` lists Comfort Z3. Search `defensive doubles racket` finds the defensive rackets best-of.

## Screenshots

| File | What |
|------|------|
| [screenshots/01-home.png](screenshots/01-home.png) | First screen: author, Read guides, cookie banner |
| [screenshots/01-home-full.png](screenshots/01-home-full.png) | Full homepage including publication shelf |
| [screenshots/02-string-tension.png](screenshots/02-string-tension.png) | Inner guide |
| [screenshots/03-nanoflare-1000z.png](screenshots/03-nanoflare-1000z.png) | Founder 1000 Z review (6 min) |
| [screenshots/04-pdp-nanoflare-1000z.png](screenshots/04-pdp-nanoflare-1000z.png) | Spec PDP, no ads, no Weak match |
| [screenshots/05-reviews-hub-default.png](screenshots/05-reviews-hub-default.png) | Hub default 26 of 26 |
| [screenshots/06-under-150.png](screenshots/06-under-150.png) | Price band |
| [screenshots/07-under-200.png](screenshots/07-under-200.png) | Price band |
| [screenshots/08-bags.png](screenshots/08-bags.png) | Bags best-of |
| [screenshots/09-about.png](screenshots/09-about.png) | About / editorial split |
| [screenshots/10-results.png](screenshots/10-results.png) | Finder results |
| [screenshots/11-brands-yonex.png](screenshots/11-brands-yonex.png) | Yonex brand hub |
| [screenshots/12-search-defensive.png](screenshots/12-search-defensive.png) | Search → defensive rackets |

Raw check log: [crawl-log.json](crawl-log.json). Re-run: serve `out` on 4173, then `node docs/qa-adsense-recovery/crawl.mjs`.

## Follow-ups (not blockers for this deploy)

1. **Do not resubmit AdSense** from this QA. Operator checklist stays in `docs/ADSENSE_RESUBMIT.md`.
2. Inject `NEXT_PUBLIC_ADSENSE_CLIENT` on the production build if the `google-adsense-account` meta and `ads.txt` pairing must be present for the crawler (ads.txt is already in `out/`).
3. Authenticity-checker lab performance 0.94 vs committed 1.00 — re-check on CI; likely `serve` redirect + LCP, not recovery content.
4. Accessibility 0.93 warnings on several best-of shells (LHCI warn, not error).
5. Rename `export const config` on the hand-written price-band pages to silence the Next.js route-config warning.
6. Repeat Waves 3 and 6 against `https://intobadminton.com` after deploy. Do not request GSC indexing for `/product/[id]/` or noindexed court notes.

## Production re-check (after GitHub Pages deploy)

Wait until `https://intobadminton.com/` HTML matches this branch (hard-refresh; PWA cache is `ib-v45`). Then:

```bash
# Wave 3 — live HTML inventory
node docs/qa-adsense-recovery/wave3-live.mjs

# Wave 6 + 7 — Chromium reviewer crawl (writes a separate screenshot folder)
QA_BASE=https://intobadminton.com \
  QA_SHOT_DIR=docs/qa-adsense-recovery/screenshots-live \
  node docs/qa-adsense-recovery/crawl.mjs
```

Do not resubmit AdSense from a green live re-check.

## Out of scope (unchanged)

AdSense dashboard Auto ads, GSC recrawl/resubmit, `cmp_tcf`, BrowserStack, padding imported SKU notes.
