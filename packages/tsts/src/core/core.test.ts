import test from "node:test";
import assert from "node:assert/strict";

import {
  boolToTristate,
  compareTextRanges,
  coalesce,
  filter,
  find,
  findLast,
  findLastIndex,
  flatMap,
  ifElse,
  lastOrUndefined,
  map,
  mapNonNil,
  newTextRange,
  orElse,
  same,
  sameMap,
  singleOrUndefined,
  Stack,
  Tristate,
  tristateDefaultIfUnknown,
  tristateIsFalse,
  tristateIsTrue,
  tristateIsUnknown,
  tristateFromJSON,
  tristateToJSON,
  undefinedTextRange,
  version,
  versionMajorMinor,
} from "./index.js";

test("predicates", () => {
  assert.ok(tristateIsTrue(Tristate.True));
  assert.ok(tristateIsFalse(Tristate.False));
  assert.ok(tristateIsUnknown(Tristate.Unknown));
});

test("bool to tristate", () => {
  assert.strictEqual(boolToTristate(true), Tristate.True);
  assert.strictEqual(boolToTristate(false), Tristate.False);
});

test("default if unknown", () => {
  assert.strictEqual(tristateDefaultIfUnknown(Tristate.Unknown, Tristate.True), Tristate.True);
  assert.strictEqual(tristateDefaultIfUnknown(Tristate.False, Tristate.True), Tristate.False);
});

test("json conversion", () => {
  assert.strictEqual(tristateFromJSON(true), Tristate.True);
  assert.strictEqual(tristateFromJSON(false), Tristate.False);
  assert.strictEqual(tristateFromJSON(null), Tristate.Unknown);
  assert.strictEqual(tristateToJSON(Tristate.True), true);
  assert.strictEqual(tristateToJSON(Tristate.Unknown), null);
});

test("basic constructor and accessors", () => {
  const r = newTextRange(5, 10);
  assert.strictEqual(r.pos, 5);
  assert.strictEqual(r.end, 10);
  assert.strictEqual(r.len(), 5);
  assert.ok(r.isValid());
});

test("undefined range", () => {
  const r = undefinedTextRange();
  assert.ok(!r.isValid());
});

test("contains semantics", () => {
  const r = newTextRange(5, 10);
  assert.ok(r.contains(5));
  assert.ok(r.contains(9));
  assert.ok(!r.contains(10));
  assert.ok(r.containsInclusive(10));
  assert.ok(!r.containsExclusive(5));
  assert.ok(r.containsExclusive(7));
});

test("overlap vs intersect", () => {
  const a = newTextRange(0, 5);
  const b = newTextRange(5, 10);
  assert.ok(!a.overlaps(b));
  assert.ok(a.intersects(b));
});

test("compare text ranges", () => {
  assert.strictEqual(compareTextRanges(newTextRange(0, 5), newTextRange(0, 5)), 0);
  assert.ok(compareTextRanges(newTextRange(0, 5), newTextRange(1, 5)) < 0);
});

test("push pop peek size", () => {
  const s = new Stack<number>();
  s.push(1);
  s.push(2);
  s.push(3);
  assert.strictEqual(s.size, 3);
  assert.strictEqual(s.peek(), 3);
  assert.strictEqual(s.pop(), 3);
  assert.strictEqual(s.pop(), 2);
  assert.strictEqual(s.size, 1);
});

test("pop on empty throws", () => {
  const s = new Stack<number>();
  assert.throws(() => { s.pop(); });
});

test("version returns semver string", () => {
  assert.match(version(), /^[0-9]+\.[0-9]+\.[0-9]+/);
});

test("version major minor returns major dot minor", () => {
  assert.match(versionMajorMinor(), /^[0-9]+\.[0-9]+$/);
});

test("filter keeps matching elements", () => {
  assert.deepStrictEqual(filter([1, 2, 3, 4], (n) => n % 2 === 0), [2, 4]);
});

test("map applies transform", () => {
  assert.deepStrictEqual(map([1, 2, 3], (n) => n * 2), [2, 4, 6]);
});

test("map non nil drops undefined", () => {
  assert.deepStrictEqual(mapNonNil([1, 2, 3], (n) => (n % 2 === 0 ? n : undefined)), [2]);
});

test("map non nil drops zero values", () => {
  assert.deepStrictEqual(mapNonNil([0, 1, 2], (n) => n), [1, 2]);
  assert.deepStrictEqual(mapNonNil(["", "value"], (value) => value), ["value"]);
  assert.deepStrictEqual(mapNonNil([false, true], (value) => value), [true]);
});

test("flat map", () => {
  assert.deepStrictEqual(flatMap([1, 2], (n) => [n, n * 10]), [1, 10, 2, 20]);
});

test("same map returns original when no change", () => {
  const arr = [1, 2, 3];
  const result = sameMap(arr, (n) => n);
  assert.strictEqual(result, arr);
});

test("same map returns new array when changed", () => {
  const arr = [1, 2, 3];
  const result = sameMap(arr, (n) => n * 2);
  assert.notStrictEqual(result, arr);
  assert.deepStrictEqual([...result], [2, 4, 6]);
});

test("same is reference equal by element", () => {
  const obj = { x: 1 };
  assert.ok(same([obj], [obj]));
  assert.ok(!same([obj], [{ x: 1 }]));
});

test("find last and find last index", () => {
  assert.strictEqual(findLast([1, 2, 3, 4], (n) => n % 2 === 0), 4);
  assert.strictEqual(findLastIndex([1, 2, 3, 4], (n) => n % 2 === 0), 3);
});

test("find", () => {
  assert.strictEqual(find([1, 2, 3], (n) => n > 1), 2);
});

test("if else coalesce single last", () => {
  assert.strictEqual(ifElse(true, "a", "b"), "a");
  assert.strictEqual(orElse("", "fallback"), "fallback");
  assert.strictEqual(orElse(0, 10), 10);
  assert.strictEqual(orElse(false, true), true);
  assert.strictEqual(coalesce(undefined, "x", "y"), "x");
  assert.strictEqual(singleOrUndefined([42]), 42);
  assert.strictEqual(singleOrUndefined([1, 2]), undefined);
  assert.strictEqual(lastOrUndefined([1, 2, 3]), 3);
  assert.strictEqual(lastOrUndefined([]), undefined);
});
