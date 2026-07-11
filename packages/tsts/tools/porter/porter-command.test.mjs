import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import test from "node:test";

import { resolveRepo } from "./core/runtime.mjs";

test("root Porter aggregate executes every nested Node test exactly once", () => {
  const aggregate = readFileSync(resolveRepo("packages/tsts/tools/porter/porter.test.mjs"), "utf8");
  const imported = [...aggregate.matchAll(/^import "\.\/(test|ts-extractor)\/([^"]+\.test\.mjs)";$/gm)]
    .map((match) => `${match[1]}/${match[2]}`)
    .sort();
  const nested = ["test", "ts-extractor"].flatMap((directory) => readdirSync(resolveRepo(`packages/tsts/tools/porter/${directory}`))
    .filter((name) => name.endsWith(".test.mjs"))
    .map((name) => `${directory}/${name}`))
    .sort();
  assert.deepEqual(imported, nested);
  assert.equal(new Set(imported).size, imported.length);
});
