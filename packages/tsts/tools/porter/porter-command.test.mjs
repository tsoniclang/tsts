import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { goExtractorTestCommand, porterNodeTestFiles } from "./coverage-gate.mjs";
import { resolveRepo } from "./core/runtime.mjs";

test("root Porter aggregate executes every nested Node test exactly once", () => {
  const aggregate = readFileSync(resolveRepo("packages/tsts/tools/porter/porter.test.mjs"), "utf8");
  assert.match(aggregate, /await importPorterNodeTests\(\)/);
  const porterRoot = resolveRepo("packages/tsts/tools/porter");
  const discovered = porterNodeTestFiles(porterRoot)
    .map((file) => path.relative(porterRoot, file).split(path.sep).join("/"))
    .sort();
  const nested = ["test", "ts-extractor"]
    .flatMap((directory) => collectTestFilesIndependently(path.join(porterRoot, directory)))
    .map((file) => path.relative(porterRoot, file).split(path.sep).join("/"))
    .sort();
  assert.deepEqual(discovered, nested);
  assert.equal(new Set(discovered).size, discovered.length);
});

test("Porter Node test discovery is recursive", (t) => {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-porter-gate-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(path.join(root, "test", "nested", "deeper"), { recursive: true });
  mkdirSync(path.join(root, "ts-extractor"), { recursive: true });
  for (const relative of ["test/top.test.mjs", "test/nested/deeper/nested.test.mjs", "ts-extractor/parser.test.mjs"]) {
    writeFileSync(path.join(root, relative), "", "utf8");
  }
  writeFileSync(path.join(root, "test", "nested", "ignored.mjs"), "", "utf8");
  assert.deepEqual(
    porterNodeTestFiles(root).map((file) => path.relative(root, file).split(path.sep).join("/")),
    ["test/nested/deeper/nested.test.mjs", "test/top.test.mjs", "ts-extractor/parser.test.mjs"],
  );
});

test("authoritative Porter gate includes Go extractor tests", () => {
  const goGate = readFileSync(resolveRepo("packages/tsts/tools/porter/go-extractor-gate.test.mjs"), "utf8");
  const rootPackage = JSON.parse(readFileSync(resolveRepo("package.json"), "utf8"));
  assert.match(rootPackage.scripts["porter:test"], /packages\/tsts\/tools\/porter\/\*\.test\.mjs/);
  assert.match(goGate, /runGoExtractorTests\(\)/);
  assert.deepEqual(goExtractorTestCommand(), {
    executable: "go",
    args: ["test", "./..."],
    cwd: resolveRepo("packages/tsts/tools/porter/go-extractor"),
  });
});

function collectTestFilesIndependently(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...collectTestFilesIndependently(absolute));
    else if (entry.isFile() && entry.name.endsWith(".test.mjs")) files.push(absolute);
  }
  return files;
}
