/**
 * Cloudflare Worker — anonymous helpful-reaction counts (KV-backed).
 *
 * GET  /health           → { ok: true, service: "reactions" }
 * GET  /?contentId=<id>  → { up, down, more }
 * POST /                 → body { contentId, reaction: "up"|"down"|"more" }
 *
 * Bind KV namespace as REACTIONS in wrangler.toml.
 * No PII stored — only per-article aggregate counters.
 */

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

function emptyCounts() {
  return { up: 0, down: 0, more: 0 };
}

function parseCounts(raw) {
  if (!raw) return emptyCounts();
  try {
    const data = JSON.parse(raw);
    return {
      up: Number(data.up) || 0,
      down: Number(data.down) || 0,
      more: Number(data.more) || 0,
    };
  } catch {
    return emptyCounts();
  }
}

const worker = {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS });
    }

    const url = new URL(request.url);

    if (request.method === "GET") {
      if (url.pathname === "/health" || url.pathname.endsWith("/health")) {
        return json({ ok: true, service: "reactions" });
      }
      const contentId = url.searchParams.get("contentId");
      if (!contentId || contentId.length > 200) {
        return json({ error: "contentId required" }, 400);
      }
      const raw = await env.REACTIONS.get(contentId);
      return json(parseCounts(raw));
    }

    if (request.method === "POST") {
      let body;
      try {
        body = await request.json();
      } catch {
        return json({ error: "invalid json" }, 400);
      }
      const { contentId, reaction } = body ?? {};
      if (
        typeof contentId !== "string" ||
        contentId.length === 0 ||
        contentId.length > 200 ||
        !["up", "down", "more"].includes(reaction)
      ) {
        return json({ error: "invalid payload" }, 400);
      }
      const counts = parseCounts(await env.REACTIONS.get(contentId));
      counts[reaction] += 1;
      await env.REACTIONS.put(contentId, JSON.stringify(counts));
      return json(counts);
    }

    return new Response("Method not allowed", { status: 405, headers: CORS });
  },
};

export default worker;
