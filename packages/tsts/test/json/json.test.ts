import { describe, it } from "node:test";
import { strict as assert } from "node:assert";

import { isJsonArray, isJsonObject, marshal, marshalIndent, unmarshal } from "../../src/json/index.js";

describe("json — marshal/unmarshal", () => {
  it("round-trips simple values", () => {
    assert.equal(marshal(null), "null");
    assert.equal(marshal(true), "true");
    assert.equal(marshal(42), "42");
    assert.equal(marshal("hello"), '"hello"');
  });

  it("round-trips objects", () => {
    const obj = { a: 1, b: "two", c: [1, 2, 3] };
    const json = marshal(obj);
    const parsed = unmarshal<typeof obj>(json);
    assert.deepEqual(parsed, obj);
  });

  it("marshalIndent without prefix uses JSON.stringify indent", () => {
    const result = marshalIndent({ a: 1 }, "", "  ");
    assert.equal(result, '{\n  "a": 1\n}');
  });

  it("marshalIndent with empty prefix and indent equals marshal", () => {
    assert.equal(marshalIndent({ a: 1 }, "", ""), marshal({ a: 1 }));
  });

  it("marshalIndent with prefix adds prefix to subsequent lines", () => {
    const result = marshalIndent({ a: 1 }, "> ", "  ");
    assert.equal(result, '{\n>   "a": 1\n> }');
  });
});

describe("json — type guards", () => {
  it("isJsonObject", () => {
    assert.equal(isJsonObject({}), true);
    assert.equal(isJsonObject([]), false);
    assert.equal(isJsonObject(null), false);
    assert.equal(isJsonObject("foo"), false);
  });

  it("isJsonArray", () => {
    assert.equal(isJsonArray([]), true);
    assert.equal(isJsonArray({}), false);
    assert.equal(isJsonArray(null), false);
  });
});
