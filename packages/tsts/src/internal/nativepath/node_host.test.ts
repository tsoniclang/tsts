import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, realpathSync, rmSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { nodeIsSymlinkOrReparsePoint, nodeRealpath } from "./node_host.js";

test("nativepath Node host preserves canonical-path and symlink contracts", () => {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-nativepath-"));
  try {
    const target = path.join(root, "target");
    const link = path.join(root, "link");
    mkdirSync(target);
    symlinkSync(target, link, process.platform === "win32" ? "junction" : "dir");

    assert.deepEqual(nodeRealpath(link), [realpathSync.native(target), undefined]);
    assert.equal(nodeIsSymlinkOrReparsePoint(link), true);
    assert.equal(nodeIsSymlinkOrReparsePoint(target), false);

    const [missingPath, missingError] = nodeRealpath(path.join(root, "missing"));
    assert.equal(missingPath, "");
    assert.ok(missingError instanceof Error);
    assert.equal(nodeIsSymlinkOrReparsePoint(path.join(root, "missing")), false);
  } finally {
    rmSync(root, { force: true, recursive: true });
  }
});
