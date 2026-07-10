import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const driver = fileURLToPath(new URL("./attribute.mjs", import.meta.url));

test("profile attribution emits explicit heuristic evidence from complete samples", (context) => {
  const root = mkdtempSync(join(tmpdir(), "tsts-profile-attribution-"));
  context.after(() => rmSync(root, { recursive: true, force: true }));
  const cpu = join(root, "cpu.cpuprofile");
  writeFileSync(cpu, JSON.stringify({
    startTime: 1,
    endTime: 101,
    nodes: [{ hitCount: 2, callFrame: { functionName: "getUtf8ByteInfo", url: "file:///utf8.js" } }],
  }));
  const result = spawnSync(process.execPath, [driver, "--cpu", cpu, "--json"], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  const report = JSON.parse(result.stdout);
  assert.equal(report.classification, "heuristic-profile-attribution");
  assert.equal(report.cpu.totalHits, 2);
  assert.equal(report.cpu.byCat["utf8-conv"], 2);
});

test("profile attribution rejects empty metrics and invalid controls", (context) => {
  const root = mkdtempSync(join(tmpdir(), "tsts-profile-attribution-invalid-"));
  context.after(() => rmSync(root, { recursive: true, force: true }));
  const cpu = join(root, "cpu.cpuprofile");
  writeFileSync(cpu, JSON.stringify({ startTime: 1, endTime: 2, nodes: [{ hitCount: 0, callFrame: { functionName: "", url: "" } }] }));
  const empty = spawnSync(process.execPath, [driver, "--cpu", cpu, "--json"], { encoding: "utf8" });
  assert.notEqual(empty.status, 0);
  assert.match(empty.stderr, /no sampled hits/);
  const invalidTop = spawnSync(process.execPath, [driver, "--cpu", cpu, "--top", "0"], { encoding: "utf8" });
  assert.notEqual(invalidTop.status, 0);
  assert.match(invalidTop.stderr, /--top must be an integer/);
});
