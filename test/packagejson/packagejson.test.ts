import { describe, it } from "node:test";
import { strict as assert } from "node:assert";

import {
  forEachDependency,
  getValue,
  hasDependency,
  isPresent,
  isValid,
  parsePackageJSON,
} from "../../src/packagejson/index.js";

describe("packagejson — parse basics", () => {
  it("parses well-formed package.json", () => {
    const text = JSON.stringify({
      name: "foo",
      version: "1.0.0",
      type: "module",
      main: "./dist/index.js",
      types: "./dist/index.d.ts",
    });
    const pkg = parsePackageJSON(text);
    assert.equal(isValid(pkg.name), true);
    assert.deepEqual(getValue(pkg.name), { ok: true, value: "foo" });
    assert.equal(isValid(pkg.version), true);
    assert.equal(isValid(pkg.main), true);
  });

  it("handles absent fields", () => {
    const text = JSON.stringify({ name: "foo" });
    const pkg = parsePackageJSON(text);
    assert.equal(isPresent(pkg.version), false);
    assert.equal(pkg.version.state, "absent");
  });

  it("handles null fields", () => {
    const text = JSON.stringify({ name: null });
    const pkg = parsePackageJSON(text);
    assert.equal(pkg.name.state, "null");
  });

  it("handles wrong-type fields", () => {
    const text = JSON.stringify({ name: 42 });
    const pkg = parsePackageJSON(text);
    assert.equal(pkg.name.state, "wrong-type");
    if (pkg.name.state === "wrong-type") {
      assert.equal(pkg.name.actualJSONType, "number");
    }
  });
});

describe("packagejson — dependencies", () => {
  it("reads dependency map", () => {
    const text = JSON.stringify({
      dependencies: { react: "^18.0.0", typescript: "^5.4.0" },
    });
    const pkg = parsePackageJSON(text);
    assert.equal(isValid(pkg.dependencies), true);
    if (pkg.dependencies.state === "ok") {
      assert.equal(pkg.dependencies.value.get("react"), "^18.0.0");
      assert.equal(pkg.dependencies.value.get("typescript"), "^5.4.0");
    }
  });

  it("hasDependency searches all dependency fields", () => {
    const text = JSON.stringify({
      dependencies: { react: "*" },
      devDependencies: { typescript: "*" },
      peerDependencies: { eslint: "*" },
      optionalDependencies: { foo: "*" },
    });
    const pkg = parsePackageJSON(text);
    assert.equal(hasDependency(pkg, "react"), true);
    assert.equal(hasDependency(pkg, "typescript"), true);
    assert.equal(hasDependency(pkg, "eslint"), true);
    assert.equal(hasDependency(pkg, "foo"), true);
    assert.equal(hasDependency(pkg, "missing"), false);
  });

  it("forEachDependency iterates across all fields", () => {
    const text = JSON.stringify({
      dependencies: { a: "1" },
      devDependencies: { b: "2" },
    });
    const pkg = parsePackageJSON(text);
    const seen: string[] = [];
    forEachDependency(pkg, (name, version, field) => {
      seen.push(`${field}/${name}@${version}`);
    });
    assert.equal(seen.length, 2);
    assert.ok(seen.includes("dependencies/a@1"));
    assert.ok(seen.includes("devDependencies/b@2"));
  });

  it("forEachDependency stops on false return", () => {
    const text = JSON.stringify({
      dependencies: { a: "1", b: "2", c: "3" },
    });
    const pkg = parsePackageJSON(text);
    let count = 0;
    forEachDependency(pkg, () => {
      count += 1;
      return count < 2;
    });
    assert.equal(count, 2);
  });
});

describe("packagejson — exports / imports / typesVersions", () => {
  it("reads exports field as JSONValue tree", () => {
    const text = JSON.stringify({
      exports: { ".": "./index.js", "./sub": "./sub.js" },
    });
    const pkg = parsePackageJSON(text);
    assert.equal(pkg.exports.type, "object");
  });

  it("absent exports has not-present type", () => {
    const pkg = parsePackageJSON("{}");
    assert.equal(pkg.exports.type, "not-present");
  });
});
