import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const scriptRoot = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(scriptRoot, "../../../..");
const script = join(scriptRoot, "capture-tsgo-accepted.mjs");

test("accepted-overlay production rejects arbitrary binaries and one-step activation", () => {
  for (const args of [["--tsgo", "/tmp/untrusted"], ["capture", "--activate"], ["capture", "--unknown"]]) {
    const result = spawnSync(process.execPath, [script, ...args], { cwd: repoRoot, encoding: "utf8" });
    assert.equal(result.status, 1);
    assert.match(`${result.stdout}${result.stderr}`, /Usage: capture-tsgo-accepted\.mjs verify \| capture/);
  }
});
