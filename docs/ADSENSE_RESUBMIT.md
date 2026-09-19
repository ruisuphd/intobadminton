# AdSense resubmit checklist

Operator: Rui Su / Intonation Labs Pte. Ltd.  
Site: `https://intobadminton.com`  
Rejection reason: **Low value content** (ownership already verified).  
Full diagnosis and plan: [AdSense Root Cause & Remediation Plan](https://claude.ai/code/artifact/1c4111f4-0cb4-4643-a6b1-7d8272df9f0b).

## What was wrong

196 of 209 review articles were English translations of Chinese forum posts (85 from `bbs.badmintoncn.com` threads), including every "founder firsthand" review. The August fix `noindex`ed most of them and turned ads off, but `noindex` is a Search directive: the pages stayed live, `robots.txt` allows AdsBot on `/`, and brand hubs linked into them. The reviewer still saw the site as a translation republisher.

## What changed (Sept 2026, branch `fix/adsense-unpublish-translated`)

- **Only original editorial is published.** `src/data/blog-articles.json` holds the 13 articles whose `scripts/blog-slug-source-map.json` entry is `null`. The other 196 are out of the build; their URLs (and `/blog/` + `/comparisons/` aliases) 404. The list is in `docs/qa-adsense-recovery/removed-review-slugs.json`.
- **The translated text no longer ships in client JS.** `ReviewsIndexClient` imports the article JSON, so filtering at runtime was not enough; the data file itself was cut.
- **Build gate inverted.** `scripts/check-source-attribution.mjs` (which failed the build if an article credited BadmintonCN) is gone. `scripts/check-published-provenance.mjs` now fails the build if any published article has a non-null source entry.
- **Import pipeline retired.** `blog:import`, `blog:sync`, `blog:check` and their scripts are removed, so the next markdown drop cannot recreate the problem.
- **Founder reviews come back one at a time**, each rewritten from scratch from Rui's own play, with borrowed measurements removed and its source-map entry cleared. The 1000 Z review stays down until its measurements are his.
- **About, Methodology and Source policy** describe what the site now does: articles are original, community reports are credited by name in a sentence or two, and the planned-pipeline and "unless rights allow it" wording is gone.
- **Copy pass on the kept articles.** The provenance gate only checks the source map, not prose, so the 13 were read by hand. `how-to-read-badminton-reviews` no longer describes noindexed court notes; `victor-drivex-12-vs-astrox-88d-pro` credits BadmintonCN reviewers for measurements and on-court findings instead of "the forum I report" / "I' measured", and now matches Victor's head-heavy spec; the Thunder 100 II comparison no longer implies a side-by-side test; the glossary's broken Axelsen sentence is repaired. `npm run blog:validate` now fails on that normalizer debris.
- **No dead links.** `reviewPath()` falls back to the product spec page instead of the old `/review/<id>/` stub; brand hubs, compare guides, the homepage shelf, popular searches and the offline page link only to published articles.
- PWA cache bumped to `ib-v46`.

## When to click Request review

**Not this week.** In order:

1. Deploy this branch to GitHub Pages.
2. Run `node docs/qa-adsense-recovery/verify-removal-live.mjs` against production until it passes: removed URLs 404, sitemap lists the 13 articles, no sitemap page links into removed URLs, no article or trust page matches the stale-copy patterns, client JS carries no removed slugs, and `ib-v46` is served.
3. Regenerate and resubmit `sitemap.xml` in Search Console. The Removals tool is optional; the 404s do the permanent job.
4. Pull Search Console clicks for the removed URLs so the traffic cost is measured, not guessed.
5. Wait about **14 days** after the deploy so AdsBot and Googlebot recrawl.
6. Request review **once**. Do not send a second request the same week.

Keep **Auto ads off** in the dashboard and `NEXT_PUBLIC_ADSENSE_MODE=disabled` until approval and a certified CMP flow are live. `disabled` does not stop dashboard Auto ads.

If Google asks what changed: every translated forum article was removed; the site publishes only original guides, best-of pages, compare guides and tools, and credits community sources as citations.

## Related

- `docs/COMPLIANCE.md` — consent, loader, Auto ads kill switch
- `docs/NOINDEX_INVENTORY.md` — intentional `noindex` URLs
- `src/data/source-rights.json` — per-source rights; BadmintonCN is `permission_required`
