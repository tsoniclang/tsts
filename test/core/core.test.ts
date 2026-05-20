import { describe, it } from "node:test";
import { strict as assert } from "node:assert";

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
  same,
  sameMap,
  singleOrUndefined,
  Stack,
  TextRange,
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
} from "../../src/core/index.js";

describe("core — Tristate", () => {
  it("predicates", () => {
    assert.equal(tristateIsTrue(Tristate.True), true);
    assert.equal(tristateIsFalse(Tristate.False), true);
    assert.equal(tristateIsUnknown(Tristate.Unknown), true);
  });

  it("boolToTristate", () => {
    assert.equal(boolToTristate(true), Tristate.True);
    assert.equal(boolToTristate(false), Tristate.False);
  });

  it("defaultIfUnknown", () => {
    assert.equal(tristateDefaultIfUnknown(Tristate.Unknown, Tristate.True), Tristate.True);
    assert.equal(tristateDefaultIfUnknown(Tristate.False, Tristate.True), Tristate.False);
  });

  it("JSON conversion", () => {
    assert.equal(tristateFromJSON(true), Tristate.True);
    assert.equal(tristateFromJSON(false), Tristate.False);
    assert.equal(tristateFromJSON(null), Tristate.Unknown);
    assert.equal(tristateToJSON(Tristate.True), true);
    assert.equal(tristateToJSON(Tristate.Unknown), null);
  });
});

describe("core — TextRange", () => {
  it("basic constructor + accessors", () => {
    const r = newTextRange(5, 10);
    assert.equal(r.pos, 5);
    assert.equal(r.end, 10);
    assert.equal(r.len(), 5);
    assert.equal(r.isValid(), true);
  });

  it("undefined range", () => {
    const r = undefinedTextRange();
    assert.equal(r.isValid(), false);
  });

  it("contains semantics", () => {
    const r = newTextRange(5, 10);
    assert.equal(r.contains(5), true);
    assert.equal(r.contains(9), true);
    assert.equal(r.contains(10), false);  // half-open
    assert.equal(r.containsInclusive(10), true);
    assert.equal(r.containsExclusive(5), false);
    assert.equal(r.containsExclusive(7), true);
  });

  it("overlap vs intersect", () => {
    const a = newTextRange(0, 5);
    const b = newTextRange(5, 10);
    assert.equal(a.overlaps(b), false);     // touching doesn't overlap
    assert.equal(a.intersects(b), true);    // touching does intersect
  });

  it("compareTextRanges", () => {
    assert.equal(compareTextRanges(newTextRange(0, 5), newTextRange(0, 5)), 0);
    assert.equal(compareTextRanges(newTextRange(0, 5), newTextRange(1, 5)) < 0, true);
  });
});

describe("core — Stack", () => {
  it("push/pop/peek/size", () => {
    const s = new Stack<number>();
    s.push(1);
    s.push(2);
    s.push(3);
    assert.equal(s.size, 3);
    assert.equal(s.peek(), 3);
    assert.equal(s.pop(), 3);
    assert.equal(s.pop(), 2);
    assert.equal(s.size, 1);
  });

  it("pop on empty throws", () => {
    const s = new Stack<number>();
    assert.throws(() => s.pop());
  });
});

describe("core — version", () => {
  it("version", () => {
    assert.match(version(), /^\d+\.\d+\.\d+/);
  });

  it("versionMajorMinor", () => {
    assert.match(versionMajorMinor(), /^\d+\.\d+$/);
  });
});

describe("core — array utilities", () => {
  it("filter", () => {
    assert.deepEqual(filter([1, 2, 3, 4], (n) => n % 2 === 0), [2, 4]);
  });

  it("map", () => {
    assert.deepEqual(map([1, 2, 3], (n) => n * 2), [2, 4, 6]);
  });

  it("mapNonNil", () => {
    assert.deepEqual(
      mapNonNil([1, 2, 3], (n) => n % 2 === 0 ? n : undefined),
      [2]
    );
  });

  it("flatMap", () => {
    assert.deepEqual(flatMap([1, 2], (n) => [n, n * 10]), [1, 10, 2, 20]);
  });

  it("sameMap returns original if no change", () => {
    const arr = [1, 2, 3];
    const result = sameMap(arr, (n) => n);
    assert.equal(result, arr);
  });

  it("sameMap returns new array if changed", () => {
    const arr = [1, 2, 3];
    const result = sameMap(arr, (n) => n * 2);
    assert.notEqual(result, arr);
    assert.deepEqual([...result], [2, 4, 6]);
  });

  it("same is reference-equal by element", () => {
    const obj = { x: 1 };
    assert.equal(same([obj], [obj]), true);
    assert.equal(same([obj], [{ x: 1 }]), false);
  });

  it("findLast / findLastIndex", () => {
    assert.equal(findLast([1, 2, 3, 4], (n) => n % 2 === 0), 4);
    assert.equal(findLastIndex([1, 2, 3, 4], (n) => n % 2 === 0), 3);
  });

  it("find", () => {
    assert.equal(find([1, 2, 3], (n) => n > 1), 2);
  });

  it("ifElse / coalesce / singleOrUndefined / lastOrUndefined", () => {
    assert.equal(ifElse(true, "a", "b"), "a");
    assert.equal(coalesce(undefined, "x", "y"), "x");
    assert.equal(singleOrUndefined([42]), 42);
    assert.equal(singleOrUndefined([1, 2]), undefined);
    assert.equal(lastOrUndefined([1, 2, 3]), 3);
    assert.equal(lastOrUndefined([]), undefined);
  });
});
