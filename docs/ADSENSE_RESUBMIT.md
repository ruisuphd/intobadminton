# AdSense resubmit checklist

Operator: Rui Su / Intonation Labs Pte. Ltd.  
Site: `https://intobadminton.com`  
Rejection reason: **Low value content** (ownership already verified).  
Cooldown: **do not send a new review request before 17 August 2026.**

This is one request, not a drip of partial fixes. Do **not** resubmit on 17 August with only ads-off / noindex changes. Submit once when **both** dates below are satisfied.

## When to click Request review

Submit **once**, on the later of:

1. **17 August 2026** (AdSense cooldown), **and**
2. **~14 days after the quality deploy** that ships this branch (so Search and AdsBot have recrawled the publication URLs).

If you deploy on 14 August 2026, the 14-day window ends around 28 August 2026. Wait for that date, not the 17th.

Until approval: keep **Auto ads off** in the dashboard, and keep `NEXT_PUBLIC_ADSENSE_MODE` at `disabled` in hosting env. `disabled` only gates `<AdSlot/>` and the publication loader; it does **not** turn off dashboard Auto ads.

## Dashboard (do this before the crawl, keep it through review)

In AdSense → Ads → per-site settings for intobadminton.com:

- Auto ads **off**
- Do not enable Auto ads, anchor ads, or vignette ads to “test inventory”
- Leave `public/ads.txt` and the `google-adsense-account` meta tag in place so verification still works

Repo behaviour that matches that setting:

- Root layout does **not** load `adsbygoogle.js`
- Publication layouts (`/guides/`, `/best/`, `/compare-guides/`, homepage, indexable reviews) mount the loader only when mode is `cmp_tcf`
- Spec PDPs, quiz/results/saved/compare, catalog, search, and noindexed court notes never load the script and never render `<AdSlot/>`

## What changed for the crawler

### Noindex + no ads (still live for users)

- Every `/product/[id]/` spec PDP: `noindex, follow`; omitted from `sitemap.xml`; no ads. Finder, compare, and catalog still link to them.
- Review URLs that fail the internal gate in `src/lib/thin-content.ts`: under ~800 body words **or** not original editorial / founder-firsthand. Same URLs are omitted from the sitemap and have ads off. `noindex` does not hide a URL from AdsBot; ads-off is the second half.
- Weaker overlapping SKU siblings: `noindex` plus 301 in `src/data/blog-url-migrations.json` `retiredRedirects` (static export).

Imported 中羽 / forum translations are **not** padded to pass the word gate. Length does not make replicated copy original.

### Indexable publication (ads only after approval + `cmp_tcf`)

- 13 original editorials (`source: null` in `scripts/blog-slug-source-map.json`), each ≥800 body words
- Founder-firsthand product reviews (editor note “Founder firsthand” / “Founder current”), each ≥800 body words
- Hand-written `/best/rackets-under-150/` and `/best/rackets-under-200/` (catalog generator removed)
- `/best/bags/` plus existing `/guides/` and `/compare-guides/` pages
- Homepage leads with those pieces. It does not advertise a 209-review count or a 1–2 minute SKU shelf.
- `/review/` defaults to the indexable list. Short court notes stay behind “Include short court notes (not indexed)”

## Google Search Console

After the quality deploy:

1. Submit `https://intobadminton.com/sitemap.xml` if it is not already.
2. Request indexing for `/` and the publication URLs (guides, best-of, compare-guides, the indexable `/review/<slug>/` pages, `/about/`, `/authors/rui-su/`).
3. Do **not** request indexing for `/product/[id]/` or for noindexed court notes.
4. Wait for coverage to show the homepage and cornerstone URLs as Indexed, or at least crawled, before the AdSense click.

## One AdSense request

In the AdSense app, when both dates in “When to click” are met:

- Request a site review for intobadminton.com
- Do not send a second request the same week
- Leave Auto ads off until the site is approved **and** a Google-certified CMP / IAB TCF flow is actually live (`NEXT_PUBLIC_ADSENSE_MODE=cmp_tcf` only then)

If Google asks what changed: ads are off on spec PDPs and short/unoriginal court notes; Search is pointed at original guides, founder-tested reviews, and hand-written best-of / compare pages.

## Related

- `docs/COMPLIANCE.md` — consent, loader, Auto ads kill switch
- `docs/NOINDEX_INVENTORY.md` — intentional `noindex` URLs for GSC triage
- `/setup/` — operator checklist (this page is itself `noindex`)
