# IntoBadminton — Improvement Plan, 2026 Q2

**Drafted:** 2026-05-17
**Scope:** UI/UX maturity + reader retention, SEO for first-page Google rankings, and AdSense approval/RPM optimization.
**Audience:** Editorial + engineering.

This plan is grounded in (a) a code + content audit of the current site, and (b) external research on the March 2026 Google Core Update, the 2026 Product Reviews Update, AdSense 2026 eligibility patterns, and contemporary UX-engagement research. Sources are listed at the end of the document.

---

## Revisions

**v2 — 2026-05-17 (post-review).** Updated based on stakeholder review:

- **Dark mode dropped.** Not a Google ranking signal; only marginal indirect lift via dwell time, dominated by every other item in §2 and §3. Removed from §2.1 and Sprint 2.
- **General newsletter dropped; replaced with a feature-scoped "notify me" alternative.** A general weekly digest is a content-brand asset, not a toolkit asset. Replaced in §2.2 and Sprint 3 with a per-product "notify me when this racket is re-tested or price-drops" opt-in, available only after the reader saves a product. Same return-visit benefit, lower friction, brand-correct for a finder.
- **First-person voice clarified as a blend, not a wholesale rewrite.** §3.2 now explicitly describes the model: objective analysis as the spine, with 3–5 first-person evidence moments embedded inline per article. Existing blogs don't need to be discarded — they need a ~5–10 minute editorial pass each.
- **YouTube channel split into two items.** §3.5 now distinguishes between (a) claiming a channel as a `sameAs` proof for the author entity — a 10-minute task with real E-E-A-T benefit, no videos required — and (b) shipping `VideoObject` schema on review pages, which requires actually recording video and is gated on a separate "do we want to commit to video" decision.

---

## 0. Executive summary

IntoBadminton has an unusually strong **editorial spine** for a 6-month-old site: 60+ original deep-dives, a transparent fit-score model with a 5-factor breakdown, a `claims.json` registry with freshness gating in CI, source-authority labels, GDPR Consent Mode v2, and AdSense scaffolding that already passes verification crawls.

The site's weaknesses are not in the back-end or the writing — they are in **visual maturity, engagement loops, and structured-data depth**. In plain English:

1. The site is **textually rich but visually thin**. There is no product imagery on the homepage, no comparison tables on "best of" pages, no scoring badges or radar charts, no video, no charts/illustrations. Modern review readers expect this.
2. There are **no return-visit hooks**. No saved favorites, no email digest (even optional), no PWA install, no comments/reactions, no "where you left off". The site is a one-shot tool, not a habit.
3. The site does the **hardest 80% of E-E-A-T already** (author bylines with credentials, methodology, source links, dated reviews) but is missing the **last-mile signals** Google's March 2026 update specifically rewards: original photography, first-person outcome moments embedded inline, video evidence, and dense schema (Product + Review + AggregateRating, VideoObject, HowTo on guides).
4. For **AdSense**, the technical scaffolding is sound (consent-gated, CMP-ready, `ads.txt` placeholder). The risk to approval is the same risk to ranking: thin visual proof of first-hand experience. Both reviewers and Googlebot read the same signals.

The roadmap below is sized in T-shirt effort (XS/S/M/L) and ordered by impact × effort. **P0** items unblock AdSense approval and clear the worst SEO leakage; **P1** items are the engagement and ranking accelerators; **P2** items are moat builders for 12+ months out.

---

## 1. Audit findings (current state)

### 1.1 What's strong (keep / reinforce)

- **Static export on Next.js 16 + Tailwind v4.** Fast first paint; no SSR cost.
- **Postbuild SEO gate** in [`scripts/postbuild-seo-audit.mjs`](scripts/postbuild-seo-audit.mjs) catches broken links, missing Article schema, sponsored-without-disclosure, sitemap drift, malformed JSON-LD, legacy redirect mismatches. Few small sites have this.
- **`content/claims.json` registry** with `accessedAt` freshness gating (>365d fails build, 180–365d warns). This is a real E-E-A-T moat once it's filled out.
- **5-factor fit score** in [`src/lib/scoring.ts`](src/lib/scoring.ts) with named reason codes — that explainability is the product story.
- **Consent Mode v2 done correctly.** `ad_storage` / `ad_user_data` / `ad_personalization` default to `denied`; `<AdSlot/>` gates render on `canRenderAdSlot()` (see [`src/components/AdSlot.tsx`](src/components/AdSlot.tsx)); AdSense loader is a literal `<script>` so the verification crawler sees it (see [`src/components/AdSenseScript.tsx`](src/components/AdSenseScript.tsx)).
- **Author entity** (`/authors/rui-su/`) with named credentials ("Div 4 Ireland, trained under former Malaysia national coaches"). This is exactly what Google's E-E-A-T raters look for.
- **Schema:** FAQPage, CollectionPage, BreadcrumbList, ItemList, Review, Organization are all emitted (see [`src/lib/structured-data.ts`](src/lib/structured-data.ts) and per-route `JsonLd` blocks). Solid baseline.
- **Localized routes** (`/en/`, `/zh/`) — multi-language is ahead of most competitors.

### 1.2 What's weak (this plan addresses)

- **Visual starvation.** No product photography on the homepage; product cards show 96×96 brand thumbnails at most ([`src/components/ResultCard.tsx`](src/components/ResultCard.tsx)); "best of" pages show small brand images with no action shots, no close-ups, no scale/context, and no charts.
- **No comparison tables** on `/best/*` pages. Specs sit inside cards, forcing readers to scroll-and-compare mentally. This is the #1 reason an authority site ranks below a flimsy retailer on commercial queries.
- **No scoring visualization.** No star ratings, no radar charts, no progress-bar fit-score visual. The score *exists* in the data; the reader cannot scan it.
- **Quiz lacks delight.** [`src/app/quiz/QuizFunnel.tsx`](src/app/quiz/QuizFunnel.tsx) is functionally correct and has a progress bar, but is visually flat: no per-question imagery, no micro-animation on selection, no "why this matters" tooltips, no live preview of how the answer narrows results, no celebratory completion moment.
- **No engagement loops:**
  - No newsletter / optional email digest.
  - No "save this result" / favorites / shortlist persistence beyond the in-session compare tray.
  - No comments, reactions, or upvotes on articles.
  - No social share buttons on blog articles.
  - No PWA install prompt or web push.
  - No "you last looked at X" / continue-where-you-left-off pattern on return.
- **Dark mode is declared but not delivered.** Layout sets `colorScheme: "light"` and only a light theme is implemented in [`src/app/globals.css`](src/app/globals.css). Researched UX trend data shows ~45% of recent SaaS launches default to dark.
- **Blog article UX gaps.** Most articles lack: hero image, sticky table of contents, reading-progress bar, jump-to-section anchors, related-posts shelf at the foot, social share, save-for-later, "was this helpful?" reaction.
- **Limited internal linking density.** Articles link to the finder and to 2–3 related pieces but don't surface the canonical *concept* links (e.g. "head-heavy balance" should always link to `/guides/racket-balance/`). The glossary is present but not autolinked.
- **No video.** No embedded YouTube reviews, no on-court footage. Google's 2026 update explicitly rewards original visual evidence.
- **No first-party interactive tools.** No string-tension calculator, no skill-level converter (the data is in `src/lib/skill-levels.ts` but only used in the quiz), no court diagram, no warranty/authenticity checker. These are the "Information Gain" assets that 2026 AdSense and ranking both reward.
- **Missing schema:** no `Product` + `Review` + `AggregateRating` on the per-product `/review/[slug]/` pages (only on the results page, which is `noindex`). No `VideoObject`. No `HowTo` on the guides. No `WebSite` + `SearchAction` for site-links search box.
- **Image weight.** [`public/intobadminton-logo.png`](public/intobadminton-logo.png) is 1.4 MB; the OG image is 380 KB — large for what they are. Hurts LCP on slow connections.
- **`output: "export"` constraint.** Static export means no `next/image` optimization in production (no on-the-fly WebP/AVIF), no server-side image responsive sets, and no Next.js Route Handlers — which limits some engagement features. Plan accounts for this.

---

## 2. UI/UX maturity & "addictive" engagement plan

**Principle.** Per UX-research literature, gamification meaningfully lifts dwell time (interactive content gets ~4.6× the dwell of static) and conversion (gamified flows ~30% higher), but **more than one gamified interaction per page drives users away**. So we add deliberate, restrained engagement primitives — not a casino UI.

### 2.1 P0 — Visual maturity (M effort, large impact)

1. **Product imagery system.**
   - Capture or commission 3 hero shots per top-50 product (catalogue + scale + context). Store under `public/products/<slug>/{hero,scale,context}.webp`.
   - Extend [`ProductImage`](src/components/ProductImage.tsx) to a `ProductImageSet` component that lazy-loads at multiple sizes (since `next/image` optimization is disabled for `output: "export"`, generate `*-400.webp`, `*-800.webp`, `*-1200.webp` at build time via a Sharp script).
   - Add inline product photos to `ResultCard` (currently 96px brand mark only) and to every `/best/*` row.
2. **Comparison table on every `/best/*` page.** Above the per-product write-ups, render a sortable table with: Name · Weight · Balance · Flex · Tension range · Fit-score badge · Price band · Source confidence. Keep it client-rendered with progressive enhancement; the underlying `<table>` is server HTML for SEO.
3. **Scoring visualization.**
   - Add a **fit-score badge** chip on every result card: `94 · Strong match` with a coloured ring. The number exists in `r.fitScore`; just render it.
   - Add a **radar chart** (style/discipline/level/budget/comfort) on the per-product review pages. Use a single tiny dependency-free SVG component (~80 LOC) to stay zero-runtime.
4. **(Removed in v2 — dark mode.)** Dark mode is a UX trend, not a Google ranking signal. The marginal dwell-time lift is dominated by every other item on this list. See §8 for full rationale.
5. **Compress hero assets.** Re-export `intobadminton-logo.png` and `intobadminton-og.png` to ~80 KB WebP/PNG-optimized. Logo above-the-fold is currently 1.4 MB.

### 2.2 P1 — Engagement loops (M effort, large compounding impact)

6. **Save / shortlist persistence.** Extend `ProfileContext` so the in-session compare tray writes to `localStorage` with a 30-day TTL. Add a "Saved" tab in the header (visible only when count>0) showing the shortlist and last-visited articles. This is the single highest-leverage retention move.
7. **Reading progress bar + sticky ToC on long-form.**
   - Reading progress: 2px bar at the top of the viewport, driven by `IntersectionObserver` on `<h2>` waypoints. ~30 LOC.
   - Sticky ToC: auto-generated from `<h2>`/`<h3>` in `BlogArticlePage`; collapses on mobile to a "Jump to" drawer.
8. **"Was this helpful?" inline reaction.** A 👍 / 👎 / 💬 stripe at the bottom of every article. Writes anonymized counts to a Cloudflare Workers KV / Firestore endpoint (the only justified backend; see §5). Show running counts to the next reader (social proof). Zero-PII.
9. **Quiz delight pass.** Per-question:
   - Subtle entrance animation (fade+translate 16px, 200ms, respect `prefers-reduced-motion`).
   - Per-option illustration (small SVG glyph — racket, shoes, shuttle, court).
   - Live "we have N rackets that fit so far" counter under the progress bar, derived from a partial-profile pre-score. This is the dopamine moment.
   - On completion: a 1.2s confetti-light celebration (single canvas, ~3 KB), then auto-route to results.
10. **Per-product "notify me" subscription** (replaces v1's general newsletter). Inside each saved-product row in the user's shortlist, add a single checkbox: *"Email me when this racket is re-tested, re-verified, or drops in price."* Double-opt-in via Buttondown. Critical differences from a general newsletter: (i) zero promotion before the reader has saved a product — preserves the homepage's "no signup gate" promise; (ii) the user is opting into a *specific* signal, not a marketing channel — fits the toolkit positioning; (iii) every email is content-justified (price drop or re-test), so unsubscribes stay low. The return-visit benefit is the same as a general newsletter; the user-friction cost is lower; the brand-fit is correct for a finder.
11. **Social share on every article.** Native `navigator.share` on mobile, X / Reddit / WhatsApp / copy-link buttons on desktop. ~40 LOC, zero deps.
12. **Related-posts shelf.** Already exists in some articles (per [`relatedArticles`](src/lib/blog.ts)) — make it universal at the foot of `BlogArticlePage`, with a 3-card grid pulled by tag overlap + brand overlap.

### 2.3 P2 — Habit & community (L effort, long-term moat)

13. **PWA shell.**
   - `manifest.webmanifest` with app icon and themed colors.
   - Service worker caching the catalogue, the quiz, and the last-viewed article for offline.
   - "Install IntoBadminton" prompt after the second session (not first — respect the user).
   - Optional web push for *new verified review of a racket you saved*. This is the single most powerful retention tool documented in the PWA research (Lancome: 8% purchase rate on push-tap, 12% cart recovery).
14. **First-party interactive tools — Information Gain bets:**
    - **Skill-level converter** (BWF rating ↔ US ↔ UK ↔ China amateur tier ↔ internal): data already lives in [`src/lib/skill-levels.ts`](src/lib/skill-levels.ts). Surface it as a standalone `/tools/skill-level-converter/` page.
    - **String tension calculator** (player level + arm comfort flag + frame max → recommended starting tension + ±2 lb window).
    - **Racket weight/balance explainer** (interactive: drag a slider, see which playing style it suits).
    - **Court diagram tool** (singles vs doubles dimensions, with hover hotspots).
    - **Authenticity checker walkthrough** (already exists at `/guides/equipment-authenticity/` — turn into an interactive 5-step flow with photos at each step).
   These are the "original tools / proprietary data" that AdSense's 2026 low-value-content reviewer and Google's Information Gain signal both reward.
15. **Comments / consented community.** A lightweight `Disqus` alternative (or self-hosted Cusdis) under articles, moderated. Behind consent and only enabled for English routes initially. Keep it optional per article.
16. **User-submitted review pipeline.** The `/review/submit/` page exists; finish the moderation queue + display surface, so consented player reviews can feed `AggregateRating` (the highest-CTR rich result).

---

## 3. SEO plan — first-page Google rankings

**Critical context.** Google's March 2026 Core Update has made **first-hand experience** the dominant ranking signal on contested commercial queries. 71% of monitored affiliate sites lost rankings (often 30–50%), and the recovery path is: original photos/screenshots, first-person voice, embedded outcome moments, dense per-product schema, author-credential anchoring. IntoBadminton is well-positioned to *gain* in this environment because its editorial spine is honest and dated — but only if the **last-mile visual + schema work** is done.

### 3.1 P0 — Crawl, index, technical (S effort, blocking)

1. **Add `Product` + `Review` + `AggregateRating` to every `/review/[slug]/` page.** Currently only `/results/` (which is `noindex`) emits product schema. The public review pages are the ones that need it. The data already exists; just emit the JSON-LD.
2. **Add `WebSite` + `SearchAction` site-wide** so Google can render a sitelinks search box.
3. **Add `BreadcrumbList` on every non-home page** (not just the homepage). Currently only some routes emit it.
4. **Add `Article`/`NewsArticle` `dateModified` + `author.url` + `publisher.logo`** on every blog article. Postbuild audit already checks for Article schema; verify all required fields are present.
5. **Remove the keyword stuffing in the homepage `metadata.keywords`** (15 keywords in `src/app/page.tsx`). Google ignores `meta keywords`, and stuffing reads as low-effort to humans.
6. **Compress the OG image (currently 380 KB → target <100 KB).** It's preloaded.
7. **Add `<link rel="alternate" hreflang>`** on `/en/` and `/zh/` pairs. Localized routes exist but hreflang pairing in `<head>` does not.
8. **Add `noindex` to `/setup/`, `/results/` (already there per code), `/review/submit/`, and any thank-you pages.** Make sure no thin-content URL leaks into the sitemap.
9. **Set `Cache-Control: public, max-age=31536000, immutable`** on `public/_next/static/*` via `public/_headers`. Already partially set — verify it covers all hashed assets.
10. **Fix the apex-to-www canonical** at the host layer (GitHub Pages handles it via CNAME, but check the 301 path is clean).

### 3.2 P0 — Content quality for the March 2026 / Product Reviews update (M effort, blocking)

11. **Embed first-person evidence moments alongside objective analysis** (clarified in v2). This is a *blend*, not a wholesale rewrite. The 2026 Product Reviews update penalizes both extremes: pure spec recitation reads as generic/AI and is demoted; pure "I love this" subjectivity reads as influencer fluff and is also demoted. The model that wins is **objective analysis as the spine, with 3–5 first-person outcome moments per article anchoring the judgments to lived experience**.

    Example transform — *instead of*:
    > The Astrox 88D Pro has a stiff shaft and head-heavy balance, giving it strong smash performance.

    *Write*:
    > The Astrox 88D Pro has a stiff shaft and head-heavy balance. I strung mine at 26 lb BG80 and played it across 4 club doubles sessions; the smash carried noticeably more weight than my Nanoflare 800, but in the third game my forearm felt the head weight on flat drives.

    Same fact, with experiential evidence anchoring it. The existing 60+ articles do **not** need to be discarded or rewritten end-to-end — each needs a ~5–10 minute editorial pass to insert 3–5 evidence moments at the points where judgments are made (smash response, control feel, comfort, durability). Per the search research, this single change is associated with +15–25% visibility on review queries.
12. **Add original photos to every commercial-intent page.** `/best/*`, `/review/[slug]/`, and `/compare-guides/*` need at least one *photo we took ourselves* — not the brand product shot. Even an iPhone photo of the racket on a court mat counts. This is the visual proof Google's reviewers look for.
13. **Add a "What we tested" methodology box at the top of every review.** Conditions, sessions, opponents, strings, shuttle speed. Standardize as a `ReviewMethodologyBox` component.
14. **Add a `dateAccessed` callout** under any quoted manufacturer spec (the claims registry already tracks this; surface it inline next to the cited number).
15. **Run an Information Gain pass on the top 10 traffic pages.** For each, ask: "What does this page contain that the first 9 SERP results don't?" If the answer is nothing, add a chart, a calculator, a personal observation, a price-history note, or pull-quote evidence.

### 3.3 P1 — Topical authority & cluster expansion (M effort, compounding)

16. **Build out the SEO clusters in [`docs/SEO_ROI_REVIEW_STRATEGY.md`](docs/SEO_ROI_REVIEW_STRATEGY.md):**
    - **Beginner cluster**: hub `/best/beginner-rackets/` + spokes (`/guides/racket-balance/`, `/guides/string-tension/`, `/guides/glossary/`, `/blog/beginner-racket-mistakes/`, `/blog/how-to-choose-a-badminton-racket/`). Hub→spoke and spoke→hub linking must be 100%.
    - **Doubles / speed cluster**: hub `/best/doubles-rackets/` + `/best/smash-heavy-rackets/` + a new `/guides/doubles-positioning-and-rackets/` pillar.
    - **Shoe-fit cluster**: hub `/best/shoes/` + `/guides/shoes-footwork/` + `/guides/wide-feet-badminton-shoes/` + a new `/guides/badminton-shoes-vs-running-shoes/`.
    - **Brand decoded cluster**: `/brands/yonex/`, `/brands/victor/`, `/brands/li-ning/` + a new `/compare-guides/yonex-vs-victor-vs-li-ning-doubles/` and `/compare-guides/yonex-astrox-vs-arcsaber/`.
    - **Stringing cluster**: `/guides/string-tension/` + a new `/tools/string-tension-calculator/` + `/guides/string-feel-vs-durability/`.
17. **Programmatic landing pages, *only* with substantive original content per page.** Examples: `/best/rackets-under-100/`, `/best/lightweight-rackets-5u/`, `/best/rackets-for-shoulder-comfort/`. Each must have an editor pass that adds at least 200 words of original analysis above the auto-ranked list — otherwise this is the "templated affiliate roundups" pattern that the 2026 update penalized hardest.
18. **Internal-linking autopass.** Build a `glossary-autolink.mjs` script that finds first occurrence of glossary terms ("4U", "head-heavy", "T-throat", "G5") in blog articles and links them to `/guides/glossary/#<anchor>`. Run in CI; fail the build if an article uses a glossary term 3+ times without a link.
19. **Internal `/compare/` slot expansion.** Currently has 3 brand-decoded compare guides. Add 12 more high-intent comparisons (`AX-99-pro-vs-NF-1000Z`, `Comfort-Z3-vs-Aerus-X`, `BG80-vs-Aerobite`, etc.).
20. **A `/news/` or `/updates/` lane** for product-launch coverage and price drops. Fresh dated content with `Article` schema lifts the whole domain's freshness signal.

### 3.4 P1 — Core Web Vitals (S effort, ranking + UX)

21. **LCP target <2.5s p75.** Hero text is fine; the LCP candidate is the hero region of `/quiz/` and `/blog/[slug]/`. Inline the critical CSS for the hero band; defer non-critical Tailwind utilities.
22. **INP target <200ms p75.** The two heaviest interaction paths are quiz step transitions and the results filter. Audit `ResultsClient` for unnecessary `useMemo` invalidations and avoid full re-scoring on filter changes (memoize on `(profile)` hash, not `(profile, filters)`).
23. **CLS target <0.1.** Reserve image dimensions on every `<img>` and every `<Image>` (most are already set; audit `BlogArticlePage` story blocks).
24. **Visual Stability Index (the new CWV 2.0 metric).** Don't change image dimensions on hover/load; avoid late-loading skeleton-to-content swaps.
25. **Run Lighthouse CI** on `main` against the top 10 landing pages; fail the build if any of LCP/INP/CLS regresses by >10% off the baselines in [`docs/baselines/`](docs/baselines/).

### 3.5 P2 — Off-page authority (L effort, slow burn)

26. **Author entity strengthening.** Expand `/authors/rui-su/` into a fuller bio: photo, club affiliations, tournament history, training links, social profiles, *which products the author owns and tests*. Add `Person` + `sameAs` schema. Link this author URL from every article byline.
27. **External author profiles as `sameAs` proofs** (clarified in v2). The `/authors/rui-su/` page emits a `Person` JSON-LD block; Google reads its `sameAs` array as a verification signal — "the same author has a presence on these other platforms." Claim and list, in the `sameAs` array: a YouTube channel URL (**profile-only is fine — no videos required for the entity benefit**), a Twitter/X account, a LinkedIn page for Intonation Labs Pte. Ltd., and a Reddit account that *only* posts in r/badminton with genuine commentary. Each of these is a ~10-minute claim-and-link task. The `VideoObject` rich-result work (item #30b in Sprint 5+) is a separate decision gated on whether we commit to recording video.
28. **Two-way relationships.** Be the source other badminton sites cite. The `claims.json` registry is genuinely useful infrastructure; publish a `/data/` page that lists every cited claim with source + date + quote, so other writers can link back to your verification work.
29. **Wikipedia / Wikidata for the author entity** *only if eligible* (do not write a vanity entry; the verifiability bar is real).

---

## 4. AdSense approval & RPM plan

**Current AdSense posture.** Loader is wired correctly. `<AdSlot/>` renders only when client/slot/consent/operational-mode all align. CMP-aware (`NEXT_PUBLIC_ADSENSE_MODE=cmp_tcf` gate documented in `docs/COMPLIANCE.md`). `ads.txt` is a placeholder. No live slots configured. Approval has not been pursued yet (per env defaults).

**Risk read.** The site **exceeds** all hard AdSense thresholds (HTTPS ✓, mobile ✓, trust pages ✓, 60+ original posts ≫ 15–20 minimum, domain age ≫ 3 months, no shady ad networks). The single risk is the "Low Value Content" rejection class, which in 2026 maps to: thin first-person voice, no original visual evidence, templated content. The plan above directly addresses this.

### 4.1 P0 — Pre-application closes (S effort, blocking)

1. **First-person voice audit.** Per the AdSense rejection research, 82% of rejected sites had zero first-person language in their top 10 posts. Sweep the top 10 traffic pages and ensure each has at least one `I tested / I strung / I played / in my experience` moment. The author is real; surface it.
2. **Affiliate disclosure surface check.** `AffiliateDisclosure` exists in the footer ([`src/components/AffiliateDisclosure.tsx`](src/components/AffiliateDisclosure.tsx)). Add a one-line in-article disclosure at the top of every article that contains an affiliate link (not just footer). This is the post-2024 FTC + AdSense expectation.
3. **`ads.txt` finalization.** Currently a placeholder (`public/ads.txt`). Replace with the exact `google.com, pub-XXXXXXXXXX, DIRECT, f08c47fec0942fa0` line once the publisher ID is known. Postbuild SEO audit should verify it exists.
4. **Privacy policy alignment.** [`/privacy/`](src/app/privacy/page.tsx) must enumerate AdSense + GA4 + Funding Choices cookies; the existing cookie scan tooling should be re-run after a production deploy.
5. **No popups, no auto-playing audio, no interstitials.** Audit any modal/drawer for accidental interstitial behaviour. Currently clean — keep it that way.
6. **Confirm no other ad networks load.** Currently only AdSense + GA4 + Funding Choices. Keep this strict; a single network like Mediavine or Ezoic at the same time will spike rejection risk.
7. **Domain registration / WHOIS hygiene.** Whois the apex; confirm it's not on a privacy proxy that obscures the publisher (some AdSense reviewers reject opaque WHOIS for new accounts).

### 4.2 P0 — Apply (single shot, do not waste it)

8. **Apply only after all P0 items in §2.1, §3.1, §3.2, §4.1 are shipped.** The single hardest thing in AdSense approval is *not the first application* — it is the *second* one after a rejection, because the reviewer has anchored on "low value content" and the bar effectively raises.
9. **Apply with `NEXT_PUBLIC_ADSENSE_MODE` left at `disabled`** so live ad units don't render to the reviewer. The reviewer needs to see the loader script (they do) and a site that looks like *content first*. Ad placeholders look like a polished pre-monetization site.
10. **Submit the EEA/UK/CH CMP plan in parallel.** Per `docs/COMPLIANCE.md`, personalized ads in EEA/UK/CH require a Google-certified CMP + IAB TCF. Choose one (Funding Choices is already wired) and verify before flipping `cmp_tcf` mode.

### 4.3 P1 — Post-approval RPM optimization (M effort)

11. **Slot taxonomy.** Per the existing `docs/SEO_ROI_REVIEW_STRATEGY.md` note, segment AdSense channels by page type: `quiz`, `results`, `guide`, `best`, `compare`, `blog-article`, `brand`. RPM by intent is wildly different; you cannot optimize what you cannot measure.
12. **Slot placement rules** (high RPM without harming UX):
    - **Blog/Guide articles:** in-article slot after the first H2; in-article slot after the last H2; nothing in the hero.
    - **`/best/*` pages:** one slot above the comparison table is allowed *only if* the table is visually heavy enough that the ad doesn't feel like the lede. Otherwise, post-table only.
    - **`/quiz/` and `/results/`:** zero ads on the quiz steps; one slot below the result list on `/results/`. Per the SEO/ROI strategy doc, keep quiz/results low-ad and high-trust.
    - **Homepage:** one mid-page slot (already wired as `${locale}-home-mid`). Do not add more.
13. **Auto ads off; manual placement only.** Auto ads frequently injects above-the-fold and tanks LCP + Cumulative Layout Shift. Manual placement preserves CWV.
14. **Sticky / anchor / vignette ads off.** They lift RPM ~15% short-term but tank dwell, return-visit, and AdSense's own "page experience" score within a quarter.
15. **Lazy-load slots below the fold.** AdSense's own lazy-load flag (`data-loading-strategy`) is fine; combine with `IntersectionObserver` rootMargin.
16. **Ads-vs-content ratio.** Stay well under the 30% ads-to-content threshold AdSense flags. With one mid-article slot and one footer slot per long article, you'll be well clear.

### 4.4 P2 — Diversify (only after 3 months of stable RPM)

17. Layer Amazon Associates (already scaffolded via `NEXT_PUBLIC_AMAZON_ASSOCIATES_TAG`) with deep product links per region (US + UK already wired; add CA/AU/DE).
18. Affiliate-only experiments: PrinceTennis-style brand partnerships, direct stringer/local-pro-shop referrals. Track separately from AdSense.
19. Consider an Ezoic / Mediavine A/B vs raw AdSense **only after** GSC + GA4 say you have >10k sessions/day. Below that, vendor floors hurt RPM.

---

## 5. Architecture & infra changes the plan implies

The plan above is mostly **frontend + content**, which fits the current static-export shape. Three items need lightweight backend:

1. **Inline "Was this helpful?" reactions** (§2.2 #8) — Cloudflare Workers + KV is the cheapest fit; sub-millisecond reads, no PII.
2. **Per-product "notify me" subscription** (§2.2 #10) — Buttondown or Beehiiv handle the SaaS side; we just need an opt-in checkbox on saved-product rows + double-opt-in confirmation, plus a tiny Workers endpoint that fans out re-test / price-drop events to subscribers. No first-party PII storage; the email list lives in Buttondown.
3. **Web push for saved-product updates** (§2.3 #13) — Web Push API + a Workers endpoint for subscription persistence.

**Constraint guard:** Do **not** migrate off `output: "export"` for these. The static export is a real performance + cost moat. Add a thin Workers layer alongside it.

---

## 6. Roadmap & sequencing

Tagged by **priority** (P0 blocking / P1 high-leverage / P2 long-tail moat), **effort** (XS<2h, S half-day, M 2–5 days, L 1–3 weeks), and **primary goal** (`UX`, `SEO`, `ADS`).

### Sprint 1 — "Unblock AdSense + close worst SEO leaks" (2 weeks)

| # | Item | Effort | P | Goal |
|---|------|-------|---|------|
| 1 | Add `Product`+`Review`+`AggregateRating` JSON-LD to `/review/[slug]/` | S | P0 | SEO+ADS |
| 2 | Add `WebSite` + `SearchAction` and `BreadcrumbList` everywhere | S | P0 | SEO |
| 3 | Compress `intobadminton-logo.png` and `intobadminton-og.png` | XS | P0 | SEO (LCP) |
| 4 | Strip keyword-stuffing from `src/app/page.tsx` metadata | XS | P0 | SEO |
| 5 | First-person voice sweep on top 10 articles | S | P0 | SEO+ADS |
| 6 | Top-of-article affiliate disclosure component | XS | P0 | ADS |
| 7 | Original photos on top 10 commercial pages (1 per page minimum) | M | P0 | SEO+ADS |
| 8 | Hreflang pairs on `/en/`+`/zh/` | XS | P0 | SEO |
| 9 | Replace `public/ads.txt` placeholder once publisher ID is known | XS | P0 | ADS |
| 10 | Apply for AdSense (only after 1–9 ship) | XS | P0 | ADS |

### Sprint 2 — "Visual maturity" (2 weeks)

| # | Item | Effort | P | Goal |
|---|------|-------|---|------|
| 11 | Build `ProductImageSet` with build-time responsive WebP generation | M | P0 | UX+SEO |
| 12 | Comparison table component on `/best/*` (sortable, server-rendered baseline) | M | P0 | UX+SEO |
| 13 | Fit-score badge + radar chart components | S | P0 | UX |
| 14 | ~~Dark mode tokens + footer toggle~~ *(removed in v2 — not a ranking signal)* | — | — | — |
| 15 | Sticky ToC + reading progress on `BlogArticlePage` | S | P1 | UX |
| 16 | Related-posts shelf universal on every article | S | P1 | UX+SEO |

### Sprint 3 — "Engagement loops" (3 weeks)

| # | Item | Effort | P | Goal |
|---|------|-------|---|------|
| 17 | Save / shortlist persistence (`localStorage` 30d TTL) + "Saved" header tab | M | P1 | UX |
| 18 | Quiz delight pass (per-q animation, glyphs, live counter, completion celebration) | M | P1 | UX |
| 19 | "Was this helpful?" reaction stripe + Workers/KV backend | M | P1 | UX |
| 20 | Social share + native `navigator.share` | S | P1 | UX+SEO |
| 21 | Per-product "notify me on re-test / price-drop" (Buttondown, gated on saved shortlist) | S | P1 | UX |
| 22 | Glossary autolink CI pass | S | P1 | SEO |

### Sprint 4 — "Information Gain tools" (3 weeks)

| # | Item | Effort | P | Goal |
|---|------|-------|---|------|
| 23 | `/tools/skill-level-converter/` interactive page | S | P1 | SEO+UX |
| 24 | `/tools/string-tension-calculator/` | M | P1 | SEO+UX |
| 25 | `/tools/racket-balance-explainer/` | M | P1 | SEO+UX |
| 26 | `/tools/court-diagram/` | S | P2 | SEO |
| 27 | Interactive authenticity-checker (rebuild of `/guides/equipment-authenticity/`) | M | P1 | SEO+UX |

### Sprint 5+ — "Moat" (rolling)

| # | Item | Effort | P | Goal |
|---|------|-------|---|------|
| 28 | PWA shell + install prompt + offline catalogue | L | P2 | UX |
| 29 | Web push for saved-product updates | M | P2 | UX |
| 30a | Claim YouTube channel + add URL to `Person.sameAs` on `/authors/rui-su/` (profile-only, **no videos required**) | XS | P2 | SEO |
| 30b | `VideoObject` schema on review pages — **gated on a separate "commit to video" decision**; only proceed if we choose to record on-court video | L | P2 | SEO |
| 31 | User-submitted review pipeline + display + `AggregateRating` | L | P2 | SEO+UX |
| 32 | Comments (Cusdis self-hosted) on a curated subset of articles | M | P2 | UX |
| 33 | Programmatic landing pages (`/best/rackets-under-100/`, etc.) with editor pass | M | P2 | SEO |
| 34 | Lighthouse CI gate on `main` against `docs/baselines/` | S | P1 | SEO |
| 35 | Author entity expansion + `Person` schema + `sameAs` | S | P2 | SEO |

---

## 7. Metrics & guardrails

Pick one metric per goal and track it weekly. Do not over-instrument.

| Goal | North-star metric | Target by 2026-Q4 |
|------|-------------------|--------------------|
| AdSense approval | Account status = Approved | Yes |
| AdSense RPM | $ per 1000 page views | $4+ (US/UK traffic) |
| SEO — discovery | GSC clicks (weekly) | 4× baseline in [`docs/baselines/`](docs/baselines/) |
| SEO — quality | % of indexed pages in positions 1–10 | 30% |
| SEO — Core Web Vitals | LCP p75 / INP p75 / CLS p75 | <2.5s / <200ms / <0.1 |
| UX — engagement | Pages per session | 2.5+ (was ~1.4) |
| UX — return rate | 7-day return % | 15%+ |
| UX — finder completion | Quiz `quiz_complete` / `quiz_start` | 60%+ |

**Guardrails:**
- Do not optimize RPM at the cost of CWV — they trade off, and 2026 page-experience ranking is downstream of CWV.
- Do not introduce gamification beyond one element per page; the UX research is unambiguous that more harms.
- Do not break the no-signup-gate promise on the homepage; newsletter remains strictly post-value-delivery and opt-in.
- Do not move off `output: "export"` to chase a feature. The static export is a real moat.

---

## 8. What I did not include (and why)

- **AI-generated content at scale.** The 2026 Product Reviews Update penalizes this category most heavily. Stay with human-written, signed analysis.
- **A "rewards / points / leaderboard" system.** This crosses from healthy engagement into dark-pattern territory and is not aligned with the editorial brand.
- **Sticky / vignette / interstitial ads.** Short-term RPM, long-term damage. Forbidden in this plan.
- **A SPA rewrite.** No benefit over the current static export for this content shape.
- **A full CMS migration.** Markdown + TypeScript content modules are fine at the current scale.
- **Aggressive backlink campaigns.** Off-page link-building is excluded from this plan as a deliberate brand choice; rank on E-E-A-T and the moat compounds.
- **Dark mode** (removed in v2). Not a Google ranking signal. The indirect lift via dwell time is real but dominated by every other item in §2 and §3. Revisit only if a future audit shows we're losing a measurable engagement segment to it (e.g. mobile bounce skewing strongly on bright-light vs dark-OS users).
- **General newsletter / weekly digest** (removed in v2). General newsletters are a content-brand asset; IntoBadminton positions as a toolkit for badminton lovers to find their equipment. The per-product "notify me" subscription in §2.2 #10 achieves the same return-visit benefit with toolkit-aligned framing — the user opts into a *signal about a product they care about*, not a *marketing channel about us*.

---

## 9. Sources

**Google E-E-A-T & 2026 Core / Product Reviews Updates**
- [E-E-A-T in March 2026: Google Experience Content Guide — DigitalApplied](https://www.digitalapplied.com/blog/e-e-a-t-march-2026-google-rewards-experience-content-guide)
- [Affiliate content SEO in 2026 — automattic.com](https://affiliateshelp.automattic.com/2026/05/13/affiliate-content-seo-2026/)
- [Google's March 2026 Core Update Hit Affiliate Sites Harder — Affiverse](https://www.affiversemedia.com/googles-march-2026-core-update-hit-affiliate-sites-harder-than-any-other-category/)
- [How Affiliates Address Google's Product Review Updates — Practical Ecommerce](https://www.practicalecommerce.com/how-affiliates-address-googles-product-review-updates)
- [Google Helpful Content Update relevance in 2026 — Hobo-web](https://www.hobo-web.co.uk/the-google-helpful-content-update-and-its-relevance-in-2026/)
- [Google 2026 Helpful Content Update Guide — Orbit Infotech](https://orbitinfotech.com/blog/google-2026-helpful-content-update/)

**Core Web Vitals 2026**
- [What Are the Core Web Vitals (2026) — corewebvitals.io](https://www.corewebvitals.io/core-web-vitals)
- [Core Web Vitals 2026: INP, LCP & CLS — DigitalApplied](https://www.digitalapplied.com/blog/core-web-vitals-2026-inp-lcp-cls-optimization-guide)
- [How thresholds were defined — web.dev](https://web.dev/articles/defining-core-web-vitals-thresholds)

**Schema markup**
- [Schema Markup Types 2026 — W3Era](https://www.w3era.com/blog/seo/schema-markup-types-complete-guide/)
- [Schema Markup Guide for FAQ, HowTo & Review 2026 — DataEnriche](https://www.dataenriche.com/schema-markup-guide-faq-howto-review/)
- [Schema After March 2026: Structured Data Update — DigitalApplied](https://www.digitalapplied.com/blog/schema-markup-after-march-2026-structured-data-strategies)

**AdSense 2026**
- [Eligibility requirements for AdSense — Google AdSense Help](https://support.google.com/adsense/answer/9724?hl=en)
- [How to Get Google AdSense Approval (2026) — theguidex](https://theguidex.com/google-adsense-approval/)
- [Google AdSense Approval Requirements 2026 — Webtimize](https://webtimizesolutions.com/blog/google-adsense-approval-guide-2026-complete-genuine-updated-information/)
- [AdSense Rejection Fixes 2026 — Illumination on Medium](https://medium.com/illumination/google-adsense-rejection-fixes-2026-get-approved-after-multiple-rejections-aab43931f654)
- [How to Fix AdSense Low Value Content Rejection — Adstimate](https://adstimate.com/blog/low-value-content-fix.html)
- [AdSense Program Policies 2026 — WPThemeLabs](https://www.wpthemelabs.com/adsense-program-policies-compliance-checklist/)

**UI/UX engagement & gamification**
- [Combating addictive design is the UX challenge — LogRocket](https://blog.logrocket.com/ux-design/combating-addictive-design/)
- [Gamification in UX: How to Boost User Engagement — Excited.Agency](https://excited.agency/blog/gamification-ux)
- [Design Psychology 2025: The Science Behind Addictive UX — Levitation](https://levitation.in/posts/design-psychology-2025-the-science-behind-addictive-ux)
- [UX Pattern Designs for 2026 — DesignRush](https://www.designrush.com/agency/ui-ux-design/trends/ux-patterns)
- [10 UI Patterns Users Still Love in 2026 — Design Shack](https://designshack.net/articles/ux-design/best-ui-patterns/)
- [UI Trends 2026 — Mediaplus](https://mediaplus.com.sg/ui-trends/)
- [Designing for Dopamine — UX Magazine](https://uxmag.com/articles/designing-for-dopamine)

**PWA engagement**
- [Progressive Web App Examples (2026) — MobiLoud](https://www.mobiloud.com/blog/progressive-web-app-examples)
- [Progressive Web App Benefits: Real Data from 10 Companies — Adeocode](https://adeocode.com/blog/progressive-web-app-benefits)
- [Leveraging PWAs for Enhanced User Engagement — Superdomains](https://blog.superdomains.com/2026/03/25/leveraging-progressive-web-apps-for-enhanced-user-engagement-73/)

**Domain competitive landscape**
- [badmintoncentral.com competitors — Similarweb](https://www.similarweb.com/website/badmintoncentral.com/competitors/)
- [badmintoncn.com competitors — Similarweb](https://www.similarweb.com/website/badmintoncn.com/competitors/)
