import { describe, expect, it } from "vitest";
import worker from "./index.js";

function mockKv(initial = new Map()) {
  return {
    async get(key) {
      return initial.get(key) ?? null;
    },
    async put(key, value) {
      initial.set(key, value);
    },
  };
}

describe("reactions worker contract", () => {
  it("GET returns empty counts for unknown contentId", async () => {
    const res = await worker.fetch(
      new Request("https://example.com/?contentId=guide:test"),
      { REACTIONS: mockKv() }
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ up: 0, down: 0, more: 0 });
  });

  it("GET rejects missing contentId", async () => {
    const res = await worker.fetch(new Request("https://example.com/"), {
      REACTIONS: mockKv(),
    });
    expect(res.status).toBe(400);
  });

  it("POST increments reaction counts", async () => {
    const kv = mockKv();
    const env = { REACTIONS: kv };

    const post = await worker.fetch(
      new Request("https://example.com/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentId: "guide:racket-balance", reaction: "up" }),
      }),
      env
    );
    expect(post.status).toBe(200);
    expect(await post.json()).toEqual({ up: 1, down: 0, more: 0 });

    const get = await worker.fetch(
      new Request("https://example.com/?contentId=guide:racket-balance"),
      env
    );
    expect(await get.json()).toEqual({ up: 1, down: 0, more: 0 });
  });

  it("POST rejects invalid payload", async () => {
    const res = await worker.fetch(
      new Request("https://example.com/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentId: "guide:test", reaction: "maybe" }),
      }),
      { REACTIONS: mockKv() }
    );
    expect(res.status).toBe(400);
  });

  it("OPTIONS returns CORS headers", async () => {
    const res = await worker.fetch(
      new Request("https://example.com/", { method: "OPTIONS" }),
      { REACTIONS: mockKv() }
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("*");
  });
});
