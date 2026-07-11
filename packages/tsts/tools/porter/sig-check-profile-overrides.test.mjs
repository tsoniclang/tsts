import assert from "node:assert/strict";
import { test } from "node:test";
import { compareSignatures } from "./sig-check/comparison.mjs";
import {
  resolveOverride,
  unitInitializerSnapshot,
  unitValueOrderSnapshot,
} from "./sig-check/overrides.mjs";

const numberType = { t: "kw", kw: "number" };
const value = (name, numericValue) => ({
  name,
  declarationKind: "const",
  type: numberType,
  missing: false,
  definite: false,
  modifiers: ["export"],
  initializerStatus: "known",
  value: { kind: "number", value: numericValue },
  valueIssue: undefined,
});

test("profile-aware initializer overrides snapshot every exact Go variant", () => {
  const expected = {
    kind: "profileVariants",
    variants: [
      { profiles: ["linux/386"], descriptor: { kind: "value", decls: [value("Limit", "2147483647")] } },
      { profiles: ["linux/amd64", "darwin/arm64"], descriptor: { kind: "value", decls: [value("Limit", "9223372036854775807")] } },
    ],
  };
  const actual = { kind: "value", decls: [value("Limit", "9007199254740991")] };
  assert.equal(
    unitInitializerSnapshot(expected),
    '["linux/386"]=>Limit={"kind":"number","value":"2147483647"}|["linux/amd64","darwin/arm64"]=>Limit={"kind":"number","value":"9223372036854775807"}',
  );

  const issues = [];
  const override = resolveOverride({
    category: "runtime-numeric-representation",
    allow: ["initializer"],
    reason: "The host number carrier cannot represent either Go word-size maximum exactly.",
    goInitializer: unitInitializerSnapshot(expected),
    tsInitializer: unitInitializerSnapshot(actual),
  }, "id", expected, actual, (identity) => identity, issues);
  assert.deepEqual(issues, []);
  assert.equal(
    compareSignatures(expected, actual).filter((mismatch) => !override.ignore.has(mismatch.kind)).length,
    0,
  );
});

test("profile-aware snapshots fail closed on drift and preserve value order", () => {
  const expected = {
    kind: "profileVariants",
    variants: [
      {
        profiles: [0],
        descriptor: { kind: "value", decls: [value("First", "1"), value("Second", "2")] },
      },
      {
        profiles: [1],
        descriptor: { kind: "value", decls: [value("Second", "2"), value("First", "1")] },
      },
    ],
  };
  assert.equal(unitValueOrderSnapshot(expected), "[0]=>First,Second|[1]=>Second,First");

  const actual = { kind: "value", decls: [value("First", "1"), value("Second", "3")] };
  const issues = [];
  const override = resolveOverride({
    category: "runtime-numeric-representation",
    allow: ["initializer"],
    reason: "The host value is deliberately snapshotted.",
    goInitializer: `${unitInitializerSnapshot(expected)}-stale`,
    tsInitializer: unitInitializerSnapshot(actual),
  }, "id", expected, actual, (identity) => identity, issues);
  assert.equal(override.ignore.size, 0);
  assert.equal(issues.length, 1);
  assert.match(issues[0].reason, /goInitializer snapshot drifted/);
});

test("profile-aware value snapshots reject malformed profile evidence", () => {
  assert.throws(
    () => unitInitializerSnapshot({ kind: "profileVariants", variants: [] }),
    /requires at least one semantic variant/,
  );
  assert.throws(
    () => unitValueOrderSnapshot({
      kind: "profileVariants",
      variants: [{ profiles: [], descriptor: { kind: "value", decls: [] } }],
    }),
    /requires a non-empty profile identity list/,
  );
});
