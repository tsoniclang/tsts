import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { assertDistFresh } from "./parser-runtime.mjs";

test("parser freshness fails closed when configured source evidence is unavailable", (t) => {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-parser-freshness-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const distRoot = path.join(root, "dist");
  const entry = path.join(distRoot, "parser", "parser", "statements-declarations.js");
  mkdirSync(path.dirname(entry), { recursive: true });
  writeFileSync(entry, "export {};\n", "utf8");

  assert.throws(
    () => assertDistFresh(distRoot, [path.join(root, "missing-source")]),
    /cannot inspect parser freshness source directory/,
  );

  const emptySource = path.join(root, "empty-source");
  mkdirSync(emptySource);
  assert.throws(
    () => assertDistFresh(distRoot, [emptySource]),
    /contains no TypeScript files/,
  );
  assert.throws(() => assertDistFresh(distRoot, []), /must be a non-empty array/);
});
