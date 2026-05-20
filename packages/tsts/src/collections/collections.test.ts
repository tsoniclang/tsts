/**
 * Tests for collections.
 *
 * MultiMap and CopyOnWriteMap/Set.
 */

import { describe, it } from "node:test";
import { strict as assert } from "node:assert";

import { CopyOnWriteMap, CopyOnWriteSet, MultiMap } from "../../src/collections/index.js";

describe("collections — MultiMap", () => {
  it("add + get + has", () => {
    const m = new MultiMap<string, number>();
    m.add("a", 1);
    m.add("a", 2);
    m.add("b", 3);
    assert.deepEqual([...m.get("a")], [1, 2]);
    assert.deepEqual([...m.get("b")], [3]);
    assert.deepEqual([...m.get("c")], []);
    assert.equal(m.has("a"), true);
    assert.equal(m.has("c"), false);
    assert.equal(m.size, 2);
  });

  it("remove one occurrence; key gone when last value removed", () => {
    const m = new MultiMap<string, number>();
    m.add("a", 1);
    m.add("a", 2);
    m.remove("a", 1);
    assert.deepEqual([...m.get("a")], [2]);
    m.remove("a", 2);
    assert.equal(m.has("a"), false);
  });

  it("removeAll", () => {
    const m = new MultiMap<string, number>();
    m.add("a", 1);
    m.add("a", 2);
    m.removeAll("a");
    assert.equal(m.has("a"), false);
  });

  it("groupBy factory", () => {
    const items = [1, 2, 3, 4, 5, 6];
    const m = MultiMap.groupBy(items, (n) => n % 2 === 0 ? "even" : "odd");
    assert.deepEqual([...m.get("even")], [2, 4, 6]);
    assert.deepEqual([...m.get("odd")], [1, 3, 5]);
  });

  it("clear", () => {
    const m = new MultiMap<string, number>();
    m.add("a", 1);
    m.clear();
    assert.equal(m.size, 0);
  });
});

describe("collections — CopyOnWriteMap", () => {
  it("basic get/set/has", () => {
    const m = new CopyOnWriteMap<string, number>();
    m.set("a", 1);
    assert.equal(m.get("a"), 1);
    assert.equal(m.has("a"), true);
    assert.equal(m.has("b"), false);
  });

  it("nested scope isolates writes", () => {
    const m = new CopyOnWriteMap<string, number>();
    m.set("a", 1);

    const restore = m.enterScope();
    m.set("a", 99);     // shadows parent
    m.set("b", 2);      // new in child
    assert.equal(m.get("a"), 99);
    assert.equal(m.get("b"), 2);

    restore();
    assert.equal(m.get("a"), 1);
    assert.equal(m.has("b"), false);
  });

  it("nested scope: read-only reuse if no writes", () => {
    const m = new CopyOnWriteMap<string, number>();
    m.set("a", 1);

    const restore = m.enterScope();
    assert.equal(m.get("a"), 1);    // read-only access, no clone needed
    restore();

    assert.equal(m.get("a"), 1);
  });
});

describe("collections — CopyOnWriteSet", () => {
  it("basic", () => {
    const s = new CopyOnWriteSet<string>();
    s.add("x");
    assert.equal(s.has("x"), true);
    assert.equal(s.has("y"), false);
  });

  it("nested scope isolation", () => {
    const s = new CopyOnWriteSet<string>();
    s.add("a");

    const restore = s.enterScope();
    s.add("b");
    assert.equal(s.has("b"), true);

    restore();
    assert.equal(s.has("a"), true);
    assert.equal(s.has("b"), false);
  });
});
