import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { runScan } from "./core/scan-runner.mjs";
import { loadConfig } from "./core/runtime.mjs";

test("runScan executes end to end with a scrubbed child environment", () => {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-porter-scan-"));
  mkdirSync(path.join(root, "sample"));
  writeFileSync(path.join(root, "go.mod"), "module example.test/scan\n\ngo 1.26\n");
  writeFileSync(path.join(root, "sample", "sample.go"), "package sample\n\nfunc Parse(value int) string { panic(value) }\n");
  git(root, ["init", "--quiet"]);
  git(root, ["add", "."]);
  git(root, ["-c", "user.name=TSTS", "-c", "user.email=tsts@example.invalid", "commit", "--quiet", "-m", "fixture"]);
  const revision = git(root, ["rev-parse", "HEAD"]).trim();

  const snapshot = runScan({
    ...loadConfig(),
    sourceRoot: root,
    goModulePath: "example.test/scan",
    externalPackageSurfaceSelections: [{ objectId: "errors::func::New", tsModule: "go/errors.ts", tsName: "New" }],
  });
  assert.equal(snapshot.gitRevision, revision);
  assert.equal(snapshot.modulePath, "example.test/scan");
  assert.equal(snapshot.files[0].path, "sample/sample.go");
  assert.equal(snapshot.files[0].units[0].semantic[0].signature.parameters.variables[0].type.basic.name, "int");
  assert.deepEqual(snapshot.semantic.externalPackageSurface.selections, ["errors::func::New"]);
  assert.equal(snapshot.semantic.externalPackageSurface.declarations.length, 1);
  assert.equal(snapshot.semantic.externalPackageSurface.declarations[0].object.id, "errors::func::New");
  assert.equal(snapshot.semantic.externalPackageSurface.declarations[0].signature.results.variables[0].type.kind, "named");
  assert.equal(snapshot.semantic.externalPackageSurface.declarations[0].signature.results.variables[0].type.reference.objectId, "builtin::type::error");
});

function git(root, args) {
  const result = spawnSync("git", ["-C", root, ...args], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return result.stdout;
}
