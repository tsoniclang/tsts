import assert from "node:assert/strict";
import test from "node:test";

import { porterCommandNames } from "../core/command-options.mjs";
import { parseArgs } from "../core/runtime.mjs";

test("Porter command option schemas accept only their typed options", () => {
  const cases = [
    ["delta", ["--from", "old", "--to", "new", "--out", "evidence"], { from: "old", to: "new", out: "evidence" }],
    ["delta-verify", ["--dir", "evidence"], { dir: "evidence" }],
    ["generated-source-coverage", ["--force"], { force: true }],
    ["bundled", ["--write"], { write: true }],
    ["unicode", ["--write"], { write: true }],
    ["scan", [], {}],
    ["status", [], {}],
    ["verify", [], {}],
    ["sig-check", ["--id", "internal/**", "--json", "--no-gate"], { id: "internal/**", json: true, "no-gate": true }],
    [
      "scaffold",
      ["--write", "--append", "--limit", "5", "--go-path", "internal/**", "--kind", "func"],
      { write: true, append: true, limit: "5", "go-path": "internal/**", kind: "func" },
    ],
    ["facades", ["--out", "packages/tsts/src", "--force"], { out: "packages/tsts/src", force: true }],
    ["large-files", ["--write-draft", "--force"], { "write-draft": true, force: true }],
    ["ast", ["--write", "--force"], { write: true, force: true }],
    ["diagnostics", ["--write", "--force"], { write: true, force: true }],
    ["skeleton-check", ["--no-emit-temp", "--no-compile"], { "no-emit-temp": true, "no-compile": true }],
  ];

  assert.deepEqual(porterCommandNames, cases.map(([command]) => command));
  for (const [command, args, expected] of cases) {
    assert.deepEqual(parseArgs(command, args), expected, command);
  }
  assert.deepEqual(parseArgs("scaffold", ["--all"]), { all: true });
  assert.deepEqual(parseArgs("facades", ["--check"]), { check: true });
  assert.deepEqual(parseArgs("large-files", ["--check"]), { check: true });
});

test("Porter command option schemas reject malformed arguments", () => {
  assert.throws(() => parseArgs("unknown", []), /unknown Porter command/);
  assert.throws(() => parseArgs("verify", ["--strict-port"]), /unknown option '--strict-port'/);
  assert.throws(() => parseArgs("status", ["positional"]), /unexpected positional argument/);
  assert.throws(() => parseArgs("status", ["--"]), /unexpected positional argument/);
  assert.throws(() => parseArgs("sig-check", ["--id", "one", "--id", "two"]), /duplicate option '--id'/);
  assert.throws(() => parseArgs("scaffold", ["--limit"]), /option '--limit' requires a non-empty value/);
  assert.throws(() => parseArgs("scaffold", ["--limit", "--write"]), /option '--limit' requires a non-empty value/);
  assert.throws(() => parseArgs("scaffold", ["--kind", " "]), /option '--kind' requires a non-empty value/);
  assert.throws(() => parseArgs("ast", ["--write", "true"]), /boolean option '--write' does not take a value/);
  assert.throws(() => parseArgs("skeleton-check", ["--no-compile", "false"]), /boolean option '--no-compile' does not take a value/);
  assert.throws(() => parseArgs("skeleton-check", ["--compile", "false"]), /unknown option '--compile'/);
  assert.throws(() => parseArgs("skeleton-check", ["--emit-temp", "false"]), /unknown option '--emit-temp'/);
  assert.throws(() => parseArgs("skeleton-check", ["--out", "elsewhere"]), /unknown option '--out'/);
  assert.throws(() => parseArgs("delta", []), /required option '--from' is missing/);
});

test("Porter command option schemas reject ignored combinations", () => {
  assert.throws(() => parseArgs("scaffold", ["--all", "--limit", "5"]), /options '--all' and '--limit' cannot be used together/);
  assert.throws(() => parseArgs("scaffold", ["--append"]), /option '--append' requires '--write'/);
  assert.throws(() => parseArgs("facades", ["--check", "--out", "generated"]), /options '--check' and '--out' cannot be used together/);
  assert.throws(() => parseArgs("large-files", ["--check", "--write-draft"]), /options '--check' and '--write-draft' cannot be used together/);
  assert.throws(() => parseArgs("large-files", ["--force"]), /option '--force' requires '--write-draft'/);
  assert.throws(() => parseArgs("ast", ["--force"]), /option '--force' requires '--write'/);
  assert.throws(() => parseArgs("diagnostics", ["--force"]), /option '--force' requires '--write'/);
});
