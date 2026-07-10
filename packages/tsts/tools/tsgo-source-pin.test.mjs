import assert from "node:assert/strict";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import { loadAndVerifyTsgoSourcePin } from "./tsgo-source-pin.mjs";

const toolsRoot = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(toolsRoot, "..");
const repoRoot = join(packageRoot, "../..");
const vendorRoot = join(packageRoot, "_vendor/typescript-go");

test("source pin closes primary, nested, schema, and source-file identities", () => {
  const evidence = loadAndVerifyTsgoSourcePin({ repoRoot, packageRoot, vendorRoot });
  assert.equal(evidence.primary.revision, evidence.pin.revision);
  assert.equal(evidence.nestedSources.length, evidence.pin.nestedSources.length);
  assert.equal(evidence.schemaFiles.length, evidence.pin.schemaFiles.length);
  assert.equal(evidence.sourceFiles.length, evidence.pin.sourceFiles.length);
  assert.match(evidence.sha256, /^[0-9a-f]{64}$/);
});
