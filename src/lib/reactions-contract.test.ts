import { describe, expect, it } from "vitest";
import worker from "../../workers/reactions/index.js";
import {
  isReaction,
  parseReactionCounts,
  parseReactionPostPayload,
  reactionCountsGetUrl,
} from "@/lib/reactions-contract";

function mockKv(initial = new Map<string, string>()) {
  return {
    async get(key: string) {
      return initial.get(key) ?? null;
    },
    async put(key: string, value: string) {
      initial.set(key, value);
    },
  };
}

describe("reactions-contract", () => {
  it("parses counts the same way as the worker GET response", async () => {
    const kv = mockKv();
    const env = { REACTIONS: kv };

    const post = await worker.fetch(
      new Request("https://example.com/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentId: "guide:test", reaction: "up" }),
      }),
      env
    );
    const workerBody = await post.json();
    expect(parseReactionCounts(workerBody)).toEqual({ up: 1, down: 0, more: 0 });
  });

  it("rejects invalid POST payloads", () => {
    expect(parseReactionPostPayload({ contentId: "a", reaction: "maybe" })).toBeNull();
    expect(parseReactionPostPayload({ contentId: "", reaction: "up" })).toBeNull();
    expect(parseReactionPostPayload(null)).toBeNull();
  });

  it("accepts valid POST payloads", () => {
    expect(parseReactionPostPayload({ contentId: "guide:test", reaction: "up" })).toEqual({
      contentId: "guide:test",
      reaction: "up",
    });
  });

  it("builds GET URLs the client uses", () => {
    expect(reactionCountsGetUrl("https://reactions.example.com/", "guide:test")).toBe(
      "https://reactions.example.com?contentId=guide%3Atest"
    );
  });

  it("recognizes reaction enum values", () => {
    expect(isReaction("up")).toBe(true);
    expect(isReaction("down")).toBe(true);
    expect(isReaction("more")).toBe(true);
    expect(isReaction("nope")).toBe(false);
  });

  it("worker rejects payloads the contract rejects", async () => {
    const res = await worker.fetch(
      new Request("https://example.com/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentId: "guide:test", reaction: "maybe" }),
      }),
      { REACTIONS: mockKv() }
    );
    expect(res.status).toBe(400);
    expect(parseReactionPostPayload({ contentId: "guide:test", reaction: "maybe" })).toBeNull();
  });
});
