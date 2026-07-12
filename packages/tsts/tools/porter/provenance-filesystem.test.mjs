import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { readStableFlatDirectory } from "./core/provenance-filesystem.mjs";

test("stable flat-directory evidence rejects links and nested entries", (t) => {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-flat-evidence-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  writeFileSync(path.join(root, "a.json"), "a\n");
  writeFileSync(path.join(root, "b.json"), "b\n");
  assert.deepEqual(
    [...readStableFlatDirectory(root, "fixture evidence")].map(([name, bytes]) => [name, bytes.toString("utf8")]),
    [["a.json", "a\n"], ["b.json", "b\n"]],
  );

  symlinkSync("a.json", path.join(root, "link.json"));
  assert.throws(() => readStableFlatDirectory(root, "fixture evidence"), /regular non-symlink file/);
  rmSync(path.join(root, "link.json"));
  mkdirSync(path.join(root, "nested"));
  assert.throws(() => readStableFlatDirectory(root, "fixture evidence"), /regular non-symlink file/);
});
