# IntoBadminton

Evidence-led badminton equipment finder and review site. Live at
[intobadminton.com](https://intobadminton.com).

## What this is

- **Finder** at `/quiz/` — a five-step funnel that captures skill level,
  discipline, play style, equipment category, and body/budget signals, then
  returns a ranked shortlist with transparent fit-score reasoning. Logic in
  [`src/lib/scoring.ts`](src/lib/scoring.ts); product catalog in
  [`src/data/products.json`](src/data/products.json).
- **Reviews** at `/review/` — a flat personal-blog style archive of equipment
  notes. Legacy `/blog/` and `/comparisons/` URLs redirect here.
- **Decision pages** at `/compare-guides/`, `/best/`, and `/brands/` — structured
  finder support with explicit source-authority labels (manufacturer official
  page vs independent measurement vs editor interpretation).
- **Guides** at `/guides/` — long-form evergreen pieces on tension, balance,
  shoe fit, doubles roles, equipment authenticity, and so on.

Every product row in the finder carries a `verificationStatus`,
`lastVerifiedAt`, and `officialSourceUrl`. Rows without a manufacturer
product-specific URL are downgraded in `confidence` rather than hidden. See
[`docs/FACT_CHECK_AUDIT.md`](docs/FACT_CHECK_AUDIT.md) for the source-authority
methodology.

## Stack

- Next.js 16 (App Router, static export — `output: "export"` in
  [`next.config.ts`](next.config.ts))
- React 19, TypeScript (strict)
- Tailwind CSS v4 via `@tailwindcss/postcss`
- Vitest for unit tests
- Deployed to GitHub Pages on the apex domain via
  [`.github/workflows/pages.yml`](.github/workflows/pages.yml). CI gates in
  [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

**Read this before you edit any Next.js code:** the project's
[`AGENTS.md`](AGENTS.md) flags that this version has breaking changes.
Consult `node_modules/next/dist/docs/` for the canonical 16.x API before
applying training-data Next patterns.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

## CI scripts

```bash
npm run lint        # eslint
npm run typecheck   # tsc --noEmit
npm run test        # vitest run
npm run build       # next build → static export to out/
npm run postbuild   # legacy redirects + SEO audit gate (runs after build)
```

### Review ingestion (private `blogs/` drop)

Source markdown lives in a **gitignored** `blogs/` folder on the editor machine (not committed).
After adding or updating `## English Translation` sections:

```bash
npm run blog:check    # fail if unmapped *.md exist
npm run blog:import   # merge into src/data/blog-articles.json
npm run blog:validate # 20-pass structural/voice gate
```

See [`docs/BLOG_INGESTION_PLAN.md`](docs/BLOG_INGESTION_PLAN.md) and
[`docs/AUTOMATION_RUNLOG.md`](docs/AUTOMATION_RUNLOG.md).

The postbuild SEO audit at
[`scripts/postbuild-seo-audit.mjs`](scripts/postbuild-seo-audit.mjs) blocks the
build on broken internal links, missing Article schema on key routes,
sponsored-without-disclosure, sitemap drift, malformed JSON-LD, and legacy
redirect mismatches.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin used for metadata and sitemap. Defaults to `https://intobadminton.com`. |
| `NEXT_PUBLIC_BASE_PATH` | Optional path prefix for non-apex preview deploys (e.g. `/intobadminton`). |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Google AdSense client ID. Injected only when set. |
| `NEXT_PUBLIC_AMAZON_ASSOCIATES_TAG` | Amazon US affiliate tag. Affiliate links emit `rel="sponsored nofollow noopener"`. |
| `NEXT_PUBLIC_AMAZON_UK_ASSOCIATES_TAG` | Amazon UK affiliate tag. |

See [`.env.example`](.env.example) for the full list.

## Editorial

- [`docs/FACT_CHECK_AUDIT.md`](docs/FACT_CHECK_AUDIT.md) — verified specs with
  exact source wording.
- [`docs/SEO_ROI_REVIEW_STRATEGY.md`](docs/SEO_ROI_REVIEW_STRATEGY.md) — SEO
  clusters, review-reference policy.
- [`docs/SOURCE_RIGHTS.md`](docs/SOURCE_RIGHTS.md) — what can and cannot be
  quoted from external review sources.
- [`docs/baselines/`](docs/baselines/) — GSC and Core Web Vitals baselines
  captured before structural site changes.

## Deployment

`main` is auto-deployed to GitHub Pages via Actions. The workflow runs
`npm run build && npm run postbuild`, then publishes `out/`. CNAME for the apex
domain lives in [`public/CNAME`](public/CNAME).
