# HelpfulReaction counts worker

Anonymous aggregate counts for the `HelpfulReaction` component. Stores `{ up, down, more }` per `contentId` in Cloudflare KV — no user ids, no cookies.

## Deploy

1. Create a KV namespace: `npx wrangler kv namespace create REACTIONS`
2. Copy the namespace id into `wrangler.toml`.
3. `npx wrangler deploy` (or run the **Deploy reactions worker** GitHub Action on `main` after setting `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets).
4. Add repository secret **`REACTIONS_API_URL`** with the worker URL (e.g. `https://intobadminton-reactions.<account>.workers.dev`). The Pages workflow passes it as `NEXT_PUBLIC_REACTIONS_API_URL` at build time.

## API

- `GET ?contentId=guide:racket-balance` → `{ "up": 12, "down": 1, "more": 3 }`
- `POST` `{ "contentId": "guide:racket-balance", "reaction": "up" }` → updated counts

CORS allows browser calls from the static site origin.
