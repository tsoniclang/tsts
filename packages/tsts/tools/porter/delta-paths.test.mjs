import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { requireSafeDeltaOutputRoot } from "./core/delta-paths.mjs";

test("delta output is outside both source checkouts and has one real parent", (t) => {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-delta-paths-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const from = path.join(root, "from");
  const to = path.join(root, "to");
  const evidence = path.join(root, "evidence");
  mkdirSync(from);
  mkdirSync(to);
  assert.equal(requireSafeDeltaOutputRoot(evidence, [from, to]), evidence);
  assert.throws(() => requireSafeDeltaOutputRoot(path.join(from, "evidence"), [from, to]), /outside source checkout/);
  assert.throws(() => requireSafeDeltaOutputRoot(to, [from, to]), /outside source checkout/);

  const realParent = path.join(root, "real-parent");
  const linkedParent = path.join(root, "linked-parent");
  mkdirSync(realParent);
  symlinkSync(realParent, linkedParent);
  assert.throws(() => requireSafeDeltaOutputRoot(path.join(linkedParent, "evidence"), [from, to]), /real directory/);
});
