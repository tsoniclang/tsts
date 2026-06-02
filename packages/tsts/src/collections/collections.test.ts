import test from "node:test";
import assert from "node:assert/strict";

import { CopyOnWriteMap, CopyOnWriteSet, MultiMap } from "./index.js";

test("add get has", () => {
  const m = new MultiMap<string, number>();
  m.add("a", 1);
  m.add("a", 2);
  m.add("b", 3);
  assert.deepStrictEqual([...m.get("a")], [1, 2]);
  assert.deepStrictEqual([...m.get("b")], [3]);
  assert.deepStrictEqual([...m.get("c")], []);
  assert.ok(m.has("a"));
  assert.ok(!m.has("c"));
  assert.strictEqual(m.size, 2);
});

test("remove one occurrence then key gone", () => {
  const m = new MultiMap<string, number>();
  m.add("a", 1);
  m.add("a", 2);
  m.remove("a", 1);
  assert.deepStrictEqual([...m.get("a")], [2]);
  m.remove("a", 2);
  assert.ok(!m.has("a"));
});

test("remove all", () => {
  const m = new MultiMap<string, number>();
  m.add("a", 1);
  m.add("a", 2);
  m.removeAll("a");
  assert.ok(!m.has("a"));
});

test("group by factory", () => {
  const items = [1, 2, 3, 4, 5, 6];
  const m = MultiMap.groupBy(items, (n) => (n % 2 === 0 ? "even" : "odd"));
  assert.deepStrictEqual([...m.get("even")], [2, 4, 6]);
  assert.deepStrictEqual([...m.get("odd")], [1, 3, 5]);
});

test("clear", () => {
  const m = new MultiMap<string, number>();
  m.add("a", 1);
  m.clear();
  assert.strictEqual(m.size, 0);
});

test("basic get set has", () => {
  const m = new CopyOnWriteMap<string, number>();
  m.set("a", 1);
  assert.strictEqual(m.get("a"), 1);
  assert.ok(m.has("a"));
  assert.ok(!m.has("b"));
});

test("nested scope isolates writes", () => {
  const m = new CopyOnWriteMap<string, number>();
  m.set("a", 1);

  const restore = m.enterScope();
  m.set("a", 99);
  m.set("b", 2);
  assert.strictEqual(m.get("a"), 99);
  assert.strictEqual(m.get("b"), 2);

  restore();
  assert.strictEqual(m.get("a"), 1);
  assert.ok(!m.has("b"));
});

test("nested scope read only reuse if no writes", () => {
  const m = new CopyOnWriteMap<string, number>();
  m.set("a", 1);

  const restore = m.enterScope();
  assert.strictEqual(m.get("a"), 1);
  restore();

  assert.strictEqual(m.get("a"), 1);
});

test("basic", () => {
  const s = new CopyOnWriteSet<string>();
  s.add("x");
  assert.ok(s.has("x"));
  assert.ok(!s.has("y"));
});

test("nested scope isolation", () => {
  const s = new CopyOnWriteSet<string>();
  s.add("a");

  const restore = s.enterScope();
  s.add("b");
  assert.ok(s.has("b"));

  restore();
  assert.ok(s.has("a"));
  assert.ok(!s.has("b"));
});
