# Ingestion pipelines (staged)

This directory holds **future** jobs for Tier A–B ingestion. The MVP ships a static JSON catalog (`src/data/products.json`).

## Planned layout

| Path | Purpose |
|------|---------|
| `connectors/manufacturer.ts` | Fetch or parse official spec tables (robots.txt + ToS respected). |
| `connectors/affiliate_feed.ts` | Normalize merchant feeds when you run affiliates. |
| `normalize/product.ts` | Map external rows to `RacketProduct` in `src/lib/types/product.ts`. |
| `sentiment/themes.ts` | Optional: theme labels from licensed review text (post-MVP). |
| `rag/` | Optional: index only corpora you own or have permission to host. |

## Running

Wire `npm run ingest` (not added in MVP) to your CI or a scheduled worker **after** legal review of each connector.

## Environment

Store API keys in your host’s secret manager—never commit secrets to this repo.
