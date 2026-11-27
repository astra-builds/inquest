import { describe, expect, it } from "vitest";
import {
  availableRouteItems,
  navGroups,
  routeMeta,
} from "./navigation";

const allItems = navGroups.flatMap((group) => group.items);

describe("navigation", () => {
  it("uses unique keys for every item", () => {
    const keys = allItems.map((item) => item.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("only exposes routes that are actually implemented", () => {
    expect(availableRouteItems.map((item) => item.key)).toEqual(["overview"]);
    expect(availableRouteItems.every((item) => item.href.startsWith("/"))).toBe(true);
  });

  it("provides route metadata for every navigation key", () => {
    for (const item of allItems) {
      const meta = routeMeta[item.key];
      expect(meta, `missing route meta for ${item.key}`).toBeDefined();
      expect(meta.sheet).toMatch(/^S-\d{3}$/);
    }
  });

  it("does not mark unimplemented destinations as links", () => {
    for (const item of allItems) {
      if (item.key !== "overview") {
        expect(item.href, `${item.key} should not link yet`).toBeNull();
      }
    }
  });
});
