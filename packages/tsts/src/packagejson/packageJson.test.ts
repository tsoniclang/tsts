import test from "node:test";
import assert from "node:assert/strict";
import type { int } from "@tsonic/core/types.js";

import {
  forEachDependency,
  hasDependency,
  isPresent,
  isValid,
  parsePackageJSON,
} from "./index.js";

test("parses well formed", () => {
  const text =
    "{\"name\":\"foo\",\"version\":\"1.0.0\",\"type\":\"module\"," +
    "\"main\":\"./dist/index.js\",\"types\":\"./dist/index.d.ts\"}";
  const pkg = parsePackageJSON(text);
  assert.ok(isValid(pkg.name));
  if (pkg.name.state === "ok") {
    assert.strictEqual(pkg.name.value, "foo");
  }
  assert.ok(isValid(pkg.version));
  assert.ok(isValid(pkg.main));
});

test("handles absent fields", () => {
  const pkg = parsePackageJSON("{\"name\":\"foo\"}");
  assert.ok(!isPresent(pkg.version));
  assert.strictEqual(pkg.version.state, "absent");
});

test("handles null fields", () => {
  const pkg = parsePackageJSON("{\"name\":null}");
  assert.strictEqual(pkg.name.state, "null");
});

test("handles wrong type fields", () => {
  const pkg = parsePackageJSON("{\"name\":42}");
  assert.strictEqual(pkg.name.state, "wrong-type");
  if (pkg.name.state === "wrong-type") {
    assert.strictEqual(pkg.name.actualJSONType, "number");
  }
});

test("reads dependency map", () => {
  const text = "{\"dependencies\":{\"react\":\"^18.0.0\",\"typescript\":\"^5.4.0\"}}";
  const pkg = parsePackageJSON(text);
  assert.ok(isValid(pkg.dependencies));
  if (pkg.dependencies.state === "ok") {
    assert.strictEqual(pkg.dependencies.value.get("react"), "^18.0.0");
    assert.strictEqual(pkg.dependencies.value.get("typescript"), "^5.4.0");
  }
});

test("hasDependency searches all fields", () => {
  const text =
    "{\"dependencies\":{\"react\":\"*\"},\"devDependencies\":{\"typescript\":\"*\"}," +
    "\"peerDependencies\":{\"eslint\":\"*\"},\"optionalDependencies\":{\"foo\":\"*\"}}";
  const pkg = parsePackageJSON(text);
  assert.ok(hasDependency(pkg, "react"));
  assert.ok(hasDependency(pkg, "typescript"));
  assert.ok(hasDependency(pkg, "eslint"));
  assert.ok(hasDependency(pkg, "foo"));
  assert.ok(!hasDependency(pkg, "missing"));
});

test("forEachDependency iterates", () => {
  const text = "{\"dependencies\":{\"a\":\"1\"},\"devDependencies\":{\"b\":\"2\"}}";
  const pkg = parsePackageJSON(text);
  const seen: string[] = [];
  forEachDependency(pkg, (name, version, field) => {
    seen.push(`${field}/${name}@${version}`);
    return true;
  });
  assert.strictEqual(seen.length, 2);
  assert.ok(seen.includes("dependencies/a@1"));
  assert.ok(seen.includes("devDependencies/b@2"));
});

test("forEachDependency stops on false", () => {
  const text = "{\"dependencies\":{\"a\":\"1\",\"b\":\"2\",\"c\":\"3\"}}";
  const pkg = parsePackageJSON(text);
  let count: int = 0;
  forEachDependency(pkg, () => {
    count = count + 1;
    return count < 2;
  });
  assert.strictEqual(count, 2);
});

test("reads exports field", () => {
  const text = "{\"exports\":{\".\":\"./index.js\",\"./sub\":\"./sub.js\"}}";
  const pkg = parsePackageJSON(text);
  assert.strictEqual(pkg.exports.type, "object");
});

test("absent exports has not present type", () => {
  const pkg = parsePackageJSON("{}");
  assert.strictEqual(pkg.exports.type, "not-present");
});
