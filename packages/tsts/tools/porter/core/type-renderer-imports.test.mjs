import assert from "node:assert/strict";
import test from "node:test";

import { importTypeName, importValueName, uniqueImportAlias } from "./type-renderer.mjs";

test("import aliases cannot collide with authored or previously allocated names", () => {
  const unit = { id: "example::unit" };
  const targetPath = "packages/tsts/src/internal/target.ts";
  const firstAlias = uniqueImportAlias("Value", unit, targetPath);
  const context = {
    imports: new Map(),
    localTopLevelNames: new Set(["Value", firstAlias, `${firstAlias}_1`]),
    relativeTargetPath: "packages/tsts/src/internal/source.ts",
    valueImports: new Map(),
  };

  assert.equal(importTypeName(context, targetPath, "Value", unit), `${firstAlias}_2`);
  assert.equal(importValueName(context, targetPath, "Value", unit), `${firstAlias}_2`);
});
