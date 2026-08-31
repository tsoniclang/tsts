import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("generated compiler artifacts remain ignored transient evidence", async () => {
  const tracked = git(["ls-files", "-z", "--", "generated"]);
  assert.equal(tracked, "");
  assert.equal(
    gitStatus(["check-ignore", "generated/source/program.ts"]),
    0,
  );

  const packageDocument = JSON.parse(await readFile("package.json", "utf8"));
  assert.equal(packageDocument.scripts["check:generated"], undefined);
  assert.equal(packageDocument.scripts.generate, packageDocument.scripts.check);
});

function git(arguments_) {
  const result = spawnSync("git", arguments_, { encoding: "utf8" });
  if (result.error !== undefined) {
    throw result.error;
  }
  assert.equal(result.status, 0, result.stderr);
  return result.stdout;
}

function gitStatus(arguments_) {
  const result = spawnSync("git", arguments_, { encoding: "utf8" });
  if (result.error !== undefined) {
    throw result.error;
  }
  return result.status;
}
