import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { sealEvidenceDirectory } from "../sealed-evidence.mjs";
import { canonicalJson, fingerprint, hashInputRoots } from "../test-provenance.mjs";
import { assertTstsBuildRequestStable, preparedTstsBuildEvidence, tstsBuildRequest, verifyTstsBuild } from "../tsts-build.mjs";

test("corpus build requests are relocation-safe and contain no absolute command paths", () => {
  const first = fixture();
  const second = fixture();
  const left = tstsBuildRequest(first);
  const right = tstsBuildRequest(second);
  assert.equal(canonicalJson(left), canonicalJson(right));
  assert.deepEqual(left.command.slice(0, 2), ["<node>", "node_modules/typescript/bin/tsc"]);
  assert.equal(JSON.stringify(left).includes(first.repoRoot), false);
});

test("prepared builds reject source mutation during compilation", () => {
  const paths = fixture();
  const before = tstsBuildRequest(paths);
  writeFileSync(join(paths.packageRoot, "src/index.ts"), "export const changed = true;\n");
  const after = tstsBuildRequest(paths);
  assert.throws(() => assertTstsBuildRequestStable(before, after), /inputs changed during compilation/);
});

test("corpus build cache verification closes provenance, seal, and output bytes", async () => {
  const paths = fixture();
  const request = tstsBuildRequest(paths);
  const buildId = fingerprint(request, "tsts-prepared-build-v1");
  const cache = mkdtempSync(join(tmpdir(), "tsts-corpus-build-cache-"));
  const dist = join(cache, "dist");
  mkdirSync(dist);
  writeFileSync(join(dist, "index.js"), "export const value = 1;\n");
  const output = hashInputRoots([{ label: "tsts-dist", path: dist }]).roots[0];
  writeFileSync(join(cache, "provenance.json"), `${JSON.stringify({ schemaVersion: 3, buildId, request, output }, null, 2)}\n`);
  await sealEvidenceDirectory(cache, { kind: "tsts-prepared-build", buildId });
  const verified = verifyTstsBuild(cache, request, buildId);
  assert.equal(verified?.buildId, buildId);
  assert.deepEqual(verified?.evidence, preparedTstsBuildEvidence(verified));
  assert.deepEqual(verified?.evidence.request.command.slice(0, 2), ["<node>", "node_modules/typescript/bin/tsc"]);
  assert.equal(JSON.stringify(verified?.evidence).includes(cache), false);
  writeFileSync(join(dist, "index.js"), "export const value = 2;\n");
  assert.throws(() => verifyTstsBuild(cache, request, buildId), /inventory mismatch|output digest mismatch/);
});

function fixture() {
  const repoRoot = mkdtempSync(join(tmpdir(), "tsts-corpus-build-request-"));
  const packageRoot = join(repoRoot, "packages/tsts");
  for (const directory of [
    join(packageRoot, "src"),
    join(repoRoot, "node_modules/typescript/bin"),
    join(repoRoot, "node_modules/typescript/lib"),
    join(repoRoot, "node_modules/@types/node"),
    join(repoRoot, "node_modules/undici-types"),
  ]) mkdirSync(directory, { recursive: true });
  for (const [path, text] of [
    [join(packageRoot, "src/index.ts"), "export const value = 1;\n"],
    [join(packageRoot, "tsconfig.json"), "{}\n"],
    [join(packageRoot, "package.json"), "{}\n"],
    [join(repoRoot, "package.json"), "{}\n"],
    [join(repoRoot, "package-lock.json"), "{}\n"],
    [join(repoRoot, "node_modules/typescript/package.json"), "{}\n"],
    [join(repoRoot, "node_modules/typescript/bin/tsc"), "#!/usr/bin/env node\n"],
    [join(repoRoot, "node_modules/typescript/lib/typescript.js"), "export {};\n"],
    [join(repoRoot, "node_modules/@types/node/index.d.ts"), "export {};\n"],
    [join(repoRoot, "node_modules/undici-types/index.d.ts"), "export {};\n"],
  ]) writeFileSync(path, text);
  return { repoRoot, packageRoot, tscPath: join(repoRoot, "node_modules/typescript/bin/tsc") };
}
