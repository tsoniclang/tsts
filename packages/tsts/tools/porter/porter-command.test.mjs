import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import test from "node:test";

import { resolveRepo } from "./core/runtime.mjs";

test("root Porter test command executes every Node test exactly once", () => {
  const rootPackage = JSON.parse(readFileSync(resolveRepo("package.json"), "utf8"));
  assert.equal(rootPackage.scripts["porter:test:node"], "node --test packages/tsts/tools/porter/*.test.mjs");

  const aggregate = readFileSync(resolveRepo("packages/tsts/tools/porter/porter.test.mjs"), "utf8");
  const imported = [...aggregate.matchAll(/^import "\.\/test\/([^"]+\.test\.mjs)";$/gm)]
    .map((match) => match[1])
    .sort();
  const nested = readdirSync(resolveRepo("packages/tsts/tools/porter/test"))
    .filter((name) => name.endsWith(".test.mjs"))
    .sort();
  assert.deepEqual(imported, nested);
  assert.equal(new Set(imported).size, imported.length);
});
